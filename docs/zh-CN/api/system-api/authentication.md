# 认证与签名

系统 API 使用 **AK/SK（Access Key / Secret Key）** 对称密钥进行身份认证。调用方在请求中传递 AK 和基于 SK 计算出的请求签名，网关验证签名后建立调用方的上下文身份。

::: warning 安全准则
- **Secret Key (SK) 严禁网络传输**：SK 仅在调用方本地参与 HMAC-SHA256 签名计算，**绝对不要作为 HTTP 请求头或 URL 参数发送**。
- **保护凭据安全**：切勿将真实 AK/SK 硬编码在前端代码、提交至公开仓库，或记录在明文日志与截图工单中。
:::

## 请求头规范

系统 API 签名请求使用以下请求头；其中四个 `x-request-*` 字段为必填，其他字段按请求类型和需要设置：

| 请求头 | 类型 | 必选 | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| `x-request-verify-type` | String | 是 | `HmacSHA256` | 本页示例使用的签名算法 |
| `x-request-access-key` | String | 是 | `ak_live_xxxxxxxxxxxx` | 调用的 System API Access Key (AK) |
| `x-request-timestamp` | String | 是 | `1731312345678` | 当前 Unix 毫秒时间戳，网关会校验其有效时间窗口 |
| `x-request-sign` | String | 是 | `a1b2c3d4e5f6...` | 64 个小写十六进制字符组成的 HMAC-SHA256 签名值 |
| `Accept` | String | 建议 | `application/json` | 指定客户端接收的数据格式 |
| `Content-Type` | String | 条件必填 | `application/json` | JSON POST／PUT 请求必须设置；GET 无请求体时可不传，本页 GET 示例保留此头 |
| `Accept-Language` | String | 否 | `zh-CN` / `en-US` | 选择错误消息语言；不参与签名计算 |

签名验证通过后，网关会自动为下游建立认证上下文，请求头中**无需**额外附加 `Authorization: Bearer <token>`。

## 签名算法与计算规则

本页使用 HMAC-SHA256 算法生成摘要签名，以下通用规则覆盖 **GET 与 JSON POST／PUT**。具体接口支持的方法、参数和请求体以对应接口说明为准；不要将 JSON 规则直接套用于表单、multipart 或 PATCH 请求。

### 1. 待签名字符串（StringToSign）构造

待签名字符串由以下字段按顺序直接拼接而成，字段之间不添加空格、换行或其他分隔符：

```text
StringToSign = HTTPMethod + RequestContent + Timestamp + AccessKey + SecretKey
```

| 字段 | 拼接规则 | 示例值 |
| --- | --- | --- |
| `HTTPMethod` | 实际请求方法，使用大写 | `GET`、`POST`、`PUT` |
| `RequestContent` | 按下述规则构造的请求内容，不是完整 URL，也不是内容摘要 | 无参数 GET 为 `""` |
| `Timestamp` | 与请求头 `x-request-timestamp` 一致的毫秒时间戳字符串 | `1731312345678` |
| `AccessKey` | 与请求头 `x-request-access-key` 一致的 AK 字符串 | `ak_live_xxxxxxxxxxxx` |
| `SecretKey` | 本地持有的 SK 字符串（服务端签名验证规则要求将 SK 原文拼入待签文本尾部） | `sk_live_yyyyyyyyyyyy` |

`RequestContent` 按请求类型构造：

| 请求类型 | `RequestContent` |
| --- | --- |
| GET，无查询参数、无请求体 | 空字符串 |
| GET，有查询参数、无请求体 | 查询参数拼接串 |
| JSON POST／PUT，无查询参数 | 最终实际发送的 JSON 请求体原文 |
| JSON POST／PUT，有查询参数 | JSON 请求体原文 + 查询参数拼接串，两者之间不添加分隔符 |

查询参数拼接串的构造规则：

1. 对实际 URL 中的参数名和值按 UTF-8 URL 解码一次，再按**解码后的参数名升序**排列，区分大小写，与 Java `TreeMap<String, String>` 的字符排序一致。
2. 依次拼接为 `key=value`，参数之间**不添加 `&` 或其他分隔符**。签名时不包含 URL 中的 `?`。
3. 为避免歧义，每个参数名只传一次；空值明确写为 `key=`，不要使用只有参数名的空参数。
4. 空格建议在 URL 中编码为 `%20`；原始 `+` 会解码为空格，字面加号应编码为 `%2B`。例如 `name=Alice%20Lee&tag=A%2BB` 的拼接串为 `name=Alice Leetag=A+B`。不要将 `%20`、`%40` 等编码文本直接用于签名，也不要二次解码。

例如，URL 查询参数为 `current=1&size=20&email=alice%40example.com` 时，`RequestContent` 为：

```text
current=1email=alice@example.comsize=20
```

JSON POST／PUT 若发送请求体 `{"name":"示例"}`，且 URL 查询参数为 `source=portal&dryRun=true`，则 `RequestContent` 为：

```text
{"name":"示例"}dryRun=truesource=portal
```

JSON 原文不做 URL 解码、不排序字段、不压缩、不预先计算哈希。应先确定最终发送的 UTF-8 JSON 文本，再计算签名，并原样发送；签名后不要再次序列化或改变字段顺序、空格、换行。

### 2. 计算签名摘要

```text
Signature = HexEncode(HMAC-SHA256(Key = SecretKey, Message = StringToSign))
```

- **字符编码**：所有参与计算的字符串均采用 UTF-8 编码。
- **密钥（Key）**：使用 Secret Key (SK) 的 UTF-8 字节作为 HMAC 密钥。
- **输出格式**：计算生成的 256 位二进制哈希摘要必须转换为 **64 个小写十六进制字符**，不要使用大写、Base64 或 `0x` 前缀。
- **签名范围**：URL 的协议、域名和路径不参与上述待签文本拼接；SK 既作为 HMAC 密钥，也要拼在 `StringToSign` 末尾，不能省略。
- **时间窗口**：使用当前 Unix 毫秒时间戳字符串，并保持客户端时钟同步。网关默认启用时间校验，客户端与服务端时间差的绝对值**达到 600000 毫秒（10 分钟）即拒绝**；具体窗口可由部署配置调整。
- **重试**：每次重试重新生成时间戳并计算签名，不复用旧签名。重新签名不等于业务幂等，接口是否允许重试应遵循其业务规则。

## 调用示例

### 1. 标准 HTTP / cURL 请求语法

以下展示 `GET /hyperone/admin/user/roles` 的请求格式；尖括号内容为占位值，不能原样执行。`API_BASE_URL` 应包含 `https://` 等协议部分，不包含 `/hyperone` 根路径。完整的签名生成与调用步骤见下一节：

此模板的 `--fail-with-body` 需要 curl 7.76.0 或更高版本，可在 HTTP 错误时保留响应体并返回非零退出码。较旧版本可使用下一节的 Python 脚本。

```bash
curl --fail-with-body --silent --show-error -X GET "<API_BASE_URL>/hyperone/admin/user/roles" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "x-request-verify-type: HmacSHA256" \
  -H "x-request-access-key: <YOUR_SYSTEM_API_AK>" \
  -H "x-request-timestamp: <CURRENT_UNIX_MILLIS>" \
  -H "x-request-sign: <CALCULATED_HMAC_SHA256_HEX>"
```

### 2. 交互式签名与调用脚本 (Python)

以下示例需要 Python 3、`curl` 和可交互输入的终端。脚本通过 `python3 -c` 加载程序，保留标准输入用于读取实例地址与凭据，再自动计算时间戳与签名并调用 `curl`。AK/SK 在运行时读取，签名后的请求头通过标准输入（stdin）交给 `curl`；SK 不作为请求头发送，也不会写入命令行参数或 Shell 历史：

此脚本只调用无查询参数、无请求体的角色列表 GET 接口，因此 `request_content` 为空。调用其他接口时，不能只替换 URL；必须同时按上文规则匹配实际方法、查询参数和请求体。

脚本分别检查 HTTP 状态与业务状态。对于 JSON 对象形式的失败响应，仅输出 HTTP 状态及响应中的 `status`、`message`、`requestId`，并遮盖其中与本次 AK、SK、签名完全匹配的字符串片段；连接失败或非 JSON 响应只输出简短诊断。所有失败分支均返回非零退出码。

```bash
python3 -c "$(cat <<'PY'
import getpass
import hashlib
import hmac
import json
import subprocess
import time

base_url = input("AGIOne API Base URL: ").strip().rstrip("/")
ak = getpass.getpass("System API Access Key: ")
sk = getpass.getpass("System API Secret Key: ")
if not base_url.startswith(("https://", "http://")) or not ak or not sk:
    raise SystemExit("Base URL, AK, and SK are required")

path = "/hyperone/admin/user/roles"
method = "GET"
request_content = ""
timestamp = str(int(time.time() * 1000))
message = method + request_content + timestamp + ak + sk
signature = hmac.new(sk.encode("utf-8"), message.encode("utf-8"), hashlib.sha256).hexdigest()
headers = (
    "Accept: application/json",
    "Content-Type: application/json",
    "x-request-verify-type: HmacSHA256",
    "x-request-access-key: " + ak,
    "x-request-timestamp: " + timestamp,
    "x-request-sign: " + signature,
)
config = "\n".join(
    ['url = ' + json.dumps(base_url + path), 'request = ' + json.dumps(method)]
    + ['header = ' + json.dumps(header) for header in headers]
) + "\n"
response = subprocess.run(
    ["curl", "--silent", "--show-error", "--write-out", "\n%{http_code}", "--config", "-"],
    input=config, text=True, capture_output=True,
)
if response.returncode != 0:
    raise SystemExit("Request failed: " + path + " (curl exit=" + str(response.returncode) + "; check connectivity)")
body, _, http_status = response.stdout.rpartition("\n")
http_status = int(http_status)
try:
    payload = json.loads(body)
except json.JSONDecodeError:
    raise SystemExit("Request failed: " + path + " (HTTP " + str(http_status) + "; response is not JSON)")
if not isinstance(payload, dict):
    raise SystemExit("Request failed: " + path + " (HTTP " + str(http_status) + "; expected a JSON object)")
if http_status != 200 or payload.get("status") != 200 or not isinstance(payload.get("result"), list):
    details = {"httpStatus": http_status}
    for field in ("status", "message", "requestId"):
        value = payload.get(field)
        if isinstance(value, str):
            for sensitive in (ak, sk, signature):
                value = value.replace(sensitive, "[REDACTED]")
        elif value is not None and not isinstance(value, (int, bool)):
            value = "[unexpected field type]"
        details[field] = value
    raise SystemExit("Request failed: " + path + " " + json.dumps(details, ensure_ascii=False))
print(path, "status=200", "items=" + str(len(payload["result"])))
PY
)"
```

## 响应状态与校验约定

::: tip 业务状态校验说明
应分别检查 HTTP 状态与响应体的业务状态；仅有 HTTP 200 不足以判断调用成功。响应体为本栏目说明的 JSON 结构时：
- **`status === 200`**：业务处理成功，可读取 `result` 节点中的返回数据。
- **`status !== 200`**：业务处理失败，结合实际返回的 `message` 排查；响应包含 `requestId` 时一并记录。

网关路由、代理或连接异常可能返回其他格式，不能假定所有错误都包含上述 JSON 字段。
:::

### 常见认证排障

若响应消息指向凭据、签名或时间戳错误，请依序排查；其他业务错误应按实际消息处理，不要一律归为认证失败：
1. **签名一致性**：确认拼接顺序、方法大小写、查询参数解码与排序、JSON 原文均与实际请求一致，SK 未混入多余换行符或首尾空格，并且既用于 HMAC 密钥又拼在待签文本末尾。
2. **时间戳偏差**：确认 `x-request-timestamp` 为当前毫秒时间戳且与签名使用的字符串完全一致；默认时间差达到 10 分钟即被拒绝，重试时重新签名。
3. **凭据有效性**：确认 AK/SK 处于启用状态且所属身份具备调用目标系统的基础权限。
