# Authentication and signing

Platform API endpoints authenticate requests using symmetric **AK/SK (Access Key / Secret Key)** credentials. The client sends the Access Key and a request signature computed using the Secret Key. The gateway verifies the signature and establishes the caller identity context for downstream services.

::: warning Security Guidelines
- **Never Transmit the Secret Key (SK)**: The Secret Key is used strictly on the client side to compute the HMAC-SHA256 signature. **Never include it in HTTP request headers or query parameters**.
- **Protect Credentials**: Do not hardcode real AK/SK pairs in frontend code, commit them to public repositories, or leak them in logs and ticket screenshots.
:::

## Request Headers

Platform API signed requests use the following headers. The four `x-request-*` headers are required; set the remaining headers according to the request type and your needs:

| Header | Type | Required | Example | Description |
| --- | --- | --- | --- | --- |
| `x-request-verify-type` | String | Yes | `HmacSHA256` | Signature algorithm used by this page's examples |
| `x-request-access-key` | String | Yes | `ak_live_xxxxxxxxxxxx` | The System API Access Key (AK) identifying the credential |
| `x-request-timestamp` | String | Yes | `1731312345678` | Current Unix time in milliseconds; the gateway validates it against its allowed time window |
| `x-request-sign` | String | Yes | `a1b2c3d4e5f6...` | 64-character lowercase hexadecimal HMAC-SHA256 signature digest |
| `Accept` | String | Recommended | `application/json` | Requested response media type |
| `Content-Type` | String | Conditional | `application/json` | Required for JSON POST/PUT requests; optional for GET without a body, but retained in this page's GET example |
| `Accept-Language` | String | No | `zh-CN` / `en-US` | Selects the error-message language; not included in the signature |

Once signature verification succeeds, the gateway establishes downstream authorization context. You do **not** need to include an additional `Authorization: Bearer <token>` header.

## Signature Calculation Rules

This page uses HMAC-SHA256 to calculate request signatures. The general rules below cover **GET and JSON POST/PUT**. Refer to each endpoint for its supported method, parameters, and body; do not apply the JSON rules to form, multipart, or PATCH requests.

### 1. Constructing the StringToSign

Concatenate the following elements directly in order, without adding spaces, newlines, or other separators between elements:

```text
StringToSign = HTTPMethod + RequestContent + Timestamp + AccessKey + SecretKey
```

| Element | Concatenation Rule | Example |
| --- | --- | --- |
| `HTTPMethod` | The actual request method, in uppercase | `GET`, `POST`, `PUT` |
| `RequestContent` | Request content constructed as described below; not the full URL or a content digest | `""` for GET without parameters |
| `Timestamp` | Millisecond Unix timestamp matching `x-request-timestamp` exactly | `1731312345678` |
| `AccessKey` | Access Key string matching `x-request-access-key` | `ak_live_xxxxxxxxxxxx` |
| `SecretKey` | The client-held Secret Key string (the server signing rule appends the SK to the end of the text to sign) | `sk_live_yyyyyyyyyyyy` |

Construct `RequestContent` according to the request type:

| Request type | `RequestContent` |
| --- | --- |
| GET with no query parameters or body | Empty string |
| GET with query parameters and no body | Concatenated query string |
| JSON POST/PUT with no query parameters | The exact JSON body text that will be sent |
| JSON POST/PUT with query parameters | Exact JSON body text + concatenated query string, with no separator between them |

Construct the concatenated query string as follows:

1. URL-decode parameter names and values from the actual URL once using UTF-8, then sort by **decoded parameter name in ascending order**, case-sensitively, matching Java `TreeMap<String, String>` string ordering.
2. Concatenate each `key=value` pair **without `&` or any other separator** between pairs. Do not include the URL's `?`.
3. To avoid ambiguity, send each parameter name only once. Write empty values explicitly as `key=` rather than using a name-only parameter.
4. Encode spaces as `%20` in the URL where possible. A raw `+` decodes to a space; encode a literal plus as `%2B`. For example, `name=Alice%20Lee&tag=A%2BB` becomes `name=Alice Leetag=A+B`. Do not sign the encoded text such as `%20` or `%40`, and do not decode twice.

For example, URL query parameters `current=1&size=20&email=alice%40example.com` produce this `RequestContent`:

```text
current=1email=alice@example.comsize=20
```

For a JSON POST/PUT with body `{"name":"示例"}` and URL query parameters `source=portal&dryRun=true`, `RequestContent` is:

```text
{"name":"示例"}dryRun=truesource=portal
```

Do not URL-decode, sort fields, minify, or pre-hash the JSON text. Finalize the UTF-8 JSON text before signing and send it unchanged; do not reserialize it or change field order, spaces, or newlines after signing.

### 2. Computing the Signature Digest

```text
Signature = HexEncode(HMAC-SHA256(Key = SecretKey, Message = StringToSign))
```

- **Encoding**: All strings must be UTF-8 encoded.
- **Key**: The raw UTF-8 bytes of your Secret Key (SK).
- **Output Format**: Encode the resulting 256-bit binary hash digest as a **64-character lowercase hexadecimal string**, not uppercase, Base64, or a value with a `0x` prefix.
- **Signed Components**: The URL scheme, host, and path are not included in the StringToSign above. The SK is both the HMAC key and the final element of `StringToSign`; do not omit either use.
- **Time Window**: Use the current Unix timestamp in milliseconds as a string and keep the client clock synchronized. Timestamp validation is enabled by default: an absolute client/server clock difference **of 600000 milliseconds (10 minutes) or more is rejected**. Deployment configuration can change the window.
- **Retries**: Generate a fresh timestamp and signature for every retry; do not reuse an old signature. Re-signing does not make an operation idempotent; follow the endpoint's business rules when deciding whether to retry.

## Request Examples

### 1. Standard HTTP / cURL Syntax

The following shows the request format for `GET /hyperone/admin/user/roles`. Values in angle brackets are placeholders, so this template cannot be run unchanged. `API_BASE_URL` includes the scheme, such as `https://`, but excludes the `/hyperone` root path. The next section provides the complete signing and calling steps:

The template's `--fail-with-body` option requires curl 7.76.0 or later. It preserves the response body on HTTP errors while returning a nonzero exit code. For older versions, use the Python script in the next section.

```bash
curl --fail-with-body --silent --show-error -X GET "<API_BASE_URL>/hyperone/admin/user/roles" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "x-request-verify-type: HmacSHA256" \
  -H "x-request-access-key: <YOUR_SYSTEM_API_AK>" \
  -H "x-request-timestamp: <CURRENT_UNIX_MILLIS>" \
  -H "x-request-sign: <CALCULATED_HMAC_SHA256_HEX>"
```

### 2. Interactive Signing and Calling Script (Python)

The following example requires Python 3, `curl`, and an interactive terminal. It loads the program with `python3 -c`, leaving standard input available for deployment details and credentials, then computes the timestamp and signature and invokes `curl`. AK/SK values are read at runtime, and signed request headers are passed to `curl` on standard input (stdin). The SK is not sent as a request header or placed in command line arguments or shell history:

This script calls only the role-list GET endpoint with no query parameters or body, so `request_content` is empty. Changing the URL alone is not enough to call another endpoint: the actual method, query parameters, and body must also match the signing rules above.

The script checks HTTP and application statuses separately. For failed JSON-object responses, it outputs only the HTTP status and the response fields `status`, `message`, and `requestId`, redacting string fragments that exactly match this request's AK, SK, or signature. Connection failures and non-JSON responses produce a short diagnostic instead. Every failure exits with a nonzero status.

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

## Response Status and Validation

::: tip Response Validation Notice
Check the HTTP status and the application status separately; HTTP 200 alone does not establish application success. When the body uses the JSON structure documented in this section:
- **`status === 200`**: Application processing succeeded; read the data in `result`.
- **`status !== 200`**: Application processing failed; use the returned `message` for troubleshooting and record `requestId` when present.

Routing, proxy, or connection errors can return a different format. Do not assume every error includes these JSON fields.
:::

### Troubleshooting Authentication Failures

If the response message identifies a credential, signature, or timestamp error, verify the following. Handle other application errors according to their actual messages rather than treating every failure as an authentication problem:
1. **Signature Consistency**: Check concatenation order, method casing, query decoding and sorting, and the exact JSON body against the actual request. Ensure the SK has no extra whitespace or trailing newlines and is used both as the HMAC key and at the end of the StringToSign.
2. **Clock Drift**: Ensure `x-request-timestamp` is the current millisecond timestamp and exactly matches the string used for signing. The default window rejects a difference of 10 minutes or more; re-sign each retry.
3. **Credential Validity**: Ensure the AK/SK is active and enabled for the intended environment.
