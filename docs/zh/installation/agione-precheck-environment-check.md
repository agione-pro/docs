# AGIOne 安装前环境预检指南

本文档说明执行 `./agione quick` 或 `./agione install` 前应完成的环境检查。当前预检范围聚焦 `agione-app` 安装：主机资源、运行目录、Docker 与 Compose、SSH 访问、端口、离线资源以及中间件连通性。

预检目标是在安装流程开始前发现阻塞问题。

## 1. 适用场景

| 场景 | 是否建议预检 | 说明 |
| --- | --- | --- |
| 单节点安装 | 是 | 安装前确认 CPU、内存、磁盘、端口、Docker、Compose 和基础命令 |
| host-mode 多节点安装 | 是 | 检查 SSH 访问、私网节点地址、远端资源、远端命令、Docker 状态和必要端口 |
| 离线或弱网交付 | 是 | 确认发布包、离线镜像、离线 Python 和运行目录可用 |
| 已有历史环境重装 | 是 | 确认旧数据、旧容器、旧端口和旧目录是否会影响安装 |
| 外部托管中间件 | 是 | 安装前确认连接地址、凭据和访问策略 |

## 2. 推荐命令

正式安装前执行 `doctor`：

```bash
cd /opt/hyperone/agione-release-v1.0-20260527
chmod +x ./agione
./agione doctor
```

传输完成后校验发布包：

```bash
./agione verify-bundle
```

host-mode 多节点安装时，预检应使用与正式安装一致的配置文件：

```bash
./agione doctor --file /root/agione-install.yml
```

## 3. 检查结果级别

| 结果 | 含义 | 处理建议 |
| --- | --- | --- |
| `PASS` | 满足安装要求 | 可进入安装流程 |
| `WARN` | 存在风险但不一定阻塞 | 需交付负责人和客户负责人确认是否接受 |
| `FAIL` | 不满足关键前置条件 | 暂停安装，完成整改后重新检查 |

## 4. 检查项总览

| 类别 | 阻塞级别 | 说明 |
| --- | --- | --- |
| 操作系统与权限 | 高 | 确认 Linux 发行版、root 或等效权限、基础命令可用 |
| CPU 与内存 | 高 | 确认主机满足所选部署模式 |
| 磁盘空间 | 高 | 默认 `runtime_root` 时，安装器优先选择合适的数据盘，必要时才回落到系统盘 `/opt/hyperone`；约 160 GiB 以上可通过 |
| 运行目录 | 高 | 确认最终选择的运行根目录可创建、可写入，重装时可按要求清理 |
| 端口占用 | 高 | 确认必要端口未被非受控进程占用 |
| Docker 与 Compose | 高 | 已安装则检查版本与状态；缺失时确认可通过离线资源安装 |
| SSH 访问 | host-mode 场景为高 | 确认发起安装的主机可访问所有 host-mode 节点 |
| host-mode 节点地址 | 高 | 确认运行节点地址均为私网 IPv4 地址 |
| 离线资源包 | 高 | 确认发布包校验值与离线资源可用 |
| 外部托管中间件 | 选中时为高 | 确认连接地址、用户名、密码、协议和网络策略 |

## 5. 资源检查

重点检查 `/opt/hyperone` 所在分区。

```bash
df -h /opt/hyperone 2>/dev/null || df -h /opt
df -ih /opt/hyperone 2>/dev/null || df -ih /opt
mkdir -p /opt/hyperone
touch /opt/hyperone/.agione-precheck-write-test
rm -f /opt/hyperone/.agione-precheck-write-test
```

| 检查项 | 通过标准 | 处理建议 |
| --- | --- | --- |
| 可用空间 | 推荐 200 GiB，最低约 160 GiB 以上 | 低于阈值时扩容或更换运行目录 |
| 写权限 | root 或等效权限可写入 `/opt/hyperone` | 修复目录权限或使用具备权限的账号 |
| inode | inode 使用率未接近 100% | 清理小文件或调整文件系统 |
| 历史数据 | 已确认是否保留、备份或清理 | 重装前必须完成数据确认 |

## 6. 端口检查

### 6.1 关键端口

| 端口 | 用途 | 预检重点 |
| --- | --- | --- |
| `22/TCP` | SSH 运维 | 运维端可登录目标主机 |
| `18090/TCP` | AGIOne Web 入口 | 未被占用，客户端可访问 |
| `80/TCP` | Nginx / OpenResty 入口 | 未被非受控进程占用 |
| `443/TCP` | HTTPS 入口，可选 | 如启用 HTTPS，需提前规划 |
| `8089/TCP` | 作业访问代理 | 未被非受控进程占用 |
| `3306/TCP` | MariaDB | 未被旧数据库或其他服务占用 |
| `6379/TCP` | Redis | 未被旧 Redis 或其他服务占用 |
| `8848/8849/TCP` | Nacos | 未被旧 Nacos 或其他服务占用 |
| `9848/9849/TCP` | Nacos 内部通信 | 未被旧 Nacos 或其他服务占用 |
| `9000/9001/TCP` | MinIO API 与控制台 | 未被旧 MinIO 或其他服务占用 |
| `9092/TCP` | Kafka | 未被旧 Kafka 或其他服务占用 |

### 6.2 推荐检查命令

```bash
ss -lntup | grep -E ':(22|80|443|3306|6379|8089|8848|8849|9000|9001|9092|9848|9849|18090)\b'
lsof -iTCP -sTCP:LISTEN -P -n | grep -E ':(22|80|443|3306|6379|8089|8848|8849|9000|9001|9092|9848|9849|18090)\b'
nc -vz <target-host-ip> 18090
nc -vz <target-host-ip> 22
```

## 7. host-mode 远端检查

host-mode 多节点安装时，需要检查 `agione-install.yml` 中定义的每台节点。

| 检查项 | 通过标准 | 失败表现 |
| --- | --- | --- |
| SSH 连通性 | 可通过配置的用户和端口连接目标节点 | 认证失败或连接超时 |
| 私网 IPv4 地址 | 节点地址为 RFC1918 私网 IPv4 地址 | 使用公网 IP、公网域名或占位主机名 |
| 远端命令 | `bash`、`tar`、Python 可用，或可通过内置资源修复 | 必要命令缺失且无法修复 |
| 远端资源 | CPU、内存和最终选择的安装磁盘满足所选角色 | 节点资源低于阈值 |
| 已有数据 | 旧运行数据不存在，或已通过 `-f` 明确覆盖 | 存在旧运行数据且未确认覆盖 |
| Docker 状态 | Docker 与 Compose 正常，或可通过离线资源安装 | Docker 修复失败 |
| 端口 | 节点需要绑定的端口均未被占用 | 已有进程占用必要端口 |

## 8. 外部托管中间件检查

当 `agione-install.yml` 选择外部托管中间件时，安装前需确认连通性。

| 组件 | 必要检查 |
| --- | --- |
| 数据库 | 地址、端口、root 用户、root 密码、SSL 模式、初始化库表权限 |
| Redis | 地址、端口、密码、网络策略 |
| Nacos | 地址、API 端口、命名空间、用户名、密码、健康接口 |
| Kafka | bootstrap servers、协议、认证配置、topic 创建权限 |
| 对象存储 | endpoint、access key、secret key、bucket 访问、上传和下载权限 |

## 9. 报告输出建议

precheck 或 doctor 报告建议至少包含：

| 模块 | 输出内容 |
| --- | --- |
| 主机信息 | hostname、IP、操作系统、内核、CPU 架构 |
| 资源信息 | CPU 核数、内存、磁盘、inode、运行目录权限 |
| 端口 | 端口占用进程、监听地址、冲突端口列表 |
| Docker / Compose | 版本、服务状态、是否可用离线安装 |
| host-mode 节点 | SSH 结果、私网地址校验、远端资源、远端命令、旧数据、Docker 和端口 |
| 离线包 | bundle manifest、checksum、镜像包、离线 Python |
| 外部中间件 | 连接地址可达性与凭据校验结果 |
| 结论 | PASS / WARN / FAIL、阻塞项、整改建议 |

## 10. 安装准入建议

满足以下条件后再进入正式安装：

1. `./agione doctor` 或 precheck 脚本执行完成，并已归档报告。
2. CPU、内存、磁盘、端口、权限、Docker 等基础项均为 `PASS`。
3. 配置 host-mode 节点时，远端预检结果为 `PASS`。
4. 选择外部托管中间件时，中间件连通性检查为 `PASS`。
5. 所有 `FAIL` 项已整改并复检通过。
6. 所有 `WARN` 项已由交付负责人和客户负责人确认接受。
7. 离线交付场景已执行 `./agione verify-bundle` 并通过。

## 11. 与安装流程的关系

推荐执行顺序：

```bash
cd /opt/hyperone/agione-release-v1.0-20260527
chmod +x ./agione
./agione doctor --file /root/agione-install.yml
./agione verify-bundle
./agione quick --file /root/agione-install.yml
./agione health
./agione ps
```

`doctor` 用于提前发现风险，不能替代安装过程中的系统检查。正式安装时，`quick` 仍会再次执行安装检查，并在检查通过后继续解包、配置、加载镜像和启动服务。
