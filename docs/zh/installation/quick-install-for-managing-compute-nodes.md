# 纳管节点快速部署

## 1 文档概述

### 1.1 关键术语

| 术语 | 含义 |
| --- | --- |
| Master 节点 | Kubernetes 集群控制平面节点 |
| Worker 节点 | 承载推理实例的算力节点（搭载 GPU/NPU） |
| etcd 节点 | Kubernetes 元数据存储节点 |
| device-plugin | Kubernetes 显卡设备插件，负责将 GPU/NPU 资源注册给调度器 |
| OFED | Mellanox InfiniBand/RoCE 网卡驱动套件 |
| SR-IOV | 单根 I/O 虚拟化，用于 RDMA 网卡虚拟功能切分 |
| Harbor | 企业级容器镜像仓库 |
| MinIO | 兼容 S3 协议的对象存储服务 |

## 2 节点环境准备

### 2.1 操作系统初始化

#### 2.1.1 通用初始化

每台节点（含 Master 与 Worker）须完成以下初始化：

- 关闭 SELinux（CentOS 系）：`setenforce 0` 并修改 `/etc/selinux/config` 持久化
- 关闭防火墙或开放上述端口列表：`systemctl disable --now firewalld`（按客户安全策略权衡）
- 关闭 swap：`swapoff -a` 并注释 `/etc/fstab` 中的 swap 行
- 配置时间同步（NTP）：所有节点统一时区与时间，建议指向客户内网 NTP 服务器
- 配置 DNS：确保节点能解析内部域名（含 `easzlab.io.local`）
- 内核参数：开启 `net.bridge.bridge-nf-call-iptables=1`、`net.ipv4.ip_forward=1`

#### 2.1.2 已有环境清理

若节点已部署 Docker、Kubernetes 或其他容器运行时，须在客户书面授权后执行清理：

```bash
# 停止并卸载 Docker
systemctl stop docker && systemctl disable docker
yum remove -y docker docker-* containerd  # 或 apt remove

# 清理 Kubernetes
kubeadm reset -f
rm -rf /etc/kubernetes /var/lib/etcd /var/lib/kubelet
rm -rf $HOME/.kube
```

清理完成后建议重启节点。

### 2.2 加速卡驱动安装

#### 2.2.1 NVIDIA 驱动

- 下载与显卡型号匹配的官方驱动（推荐 570 及以上）：`NVIDIA-Linux-x86_64-570.xx.run`
- 安装命令：`bash NVIDIA-Linux-x86_64-570.xx.run --silent --no-questions`
- 验证：`nvidia-smi`，应显示所有显卡及驱动版本

#### 2.2.2 华为昇腾驱动

- 安装 CANN 工具链与昇腾 NPU 驱动（版本需与 Ascend 910B/910C 匹配）
- 验证：`npu-smi info`，应显示所有 NPU 及温度、功耗

#### 2.2.3 燧原 / 壁仞驱动

- 联系厂商技术支持获取适配的驱动包
- 安装后通过厂商工具验证（如燧原 `efsmi`、壁仞 `birsmi`）

### 2.3 RDMA 网卡驱动安装（可选）

仅当节点具备 RDMA 网络（RoCE 或 InfiniBand）且需启用多机张量并行时配置：

- 下载 Mellanox OFED 驱动（推荐 MLNX_OFED-23.07-0.5.1.2 及以上）
- 安装命令：`./mlnxofedinstall --add-kernel-support`
- 验证：`ibstat` 应输出端口状态为 `Active`，`ibv_devinfo` 应显示设备列表

### 2.4 SSH 免密互信配置

在执行集群安装的节点（部署节点）上，需要建立到所有集群节点的 SSH 免密登录。

#### 2.4.1 已知 root 密码场景

```bash
# 在部署节点执行
ssh-keygen -t rsa -b 4096 -N '' -f ~/.ssh/id_rsa

# 对每个集群节点 IP 执行
ssh-copy-id root@192.168.1.3
ssh-copy-id root@192.168.1.4
ssh-copy-id root@192.168.1.5
ssh-copy-id root@192.168.1.6
```

#### 2.4.2 未知 root 密码场景

在每台集群节点上新建带 sudo 权限的非 root 用户：

```bash
# 在每台集群节点执行
adduser powerone
passwd powerone

# 编辑 /etc/sudoers，新增免密 sudo 条目
echo 'powerone   ALL=(ALL)  NOPASSWD:ALL' >> /etc/sudoers
```

然后在部署节点执行：

```bash
ssh-keygen -t rsa -b 4096 -N '' -f ~/.ssh/id_rsa
ssh-copy-id powerone@192.168.1.3
ssh-copy-id powerone@192.168.1.4
# ... 其余节点同理
```

### 2.5 网络连通性验证

部署节点完成 SSH 免密配置后，须再做一次端到端网络验证：

```bash
# 验证 SSH 免密登录
for ip in 192.168.1.3 192.168.1.4 192.168.1.5 192.168.1.6; do
    ssh root@$ip "hostname && uname -a"
done

# 验证 NTP 时间同步
for ip in 192.168.1.3 192.168.1.4 192.168.1.5 192.168.1.6; do
    ssh root@$ip "date"
done

# 验证管理网带宽（任选一对节点）
# 节点 A: iperf3 -s
# 节点 B: iperf3 -c <A-IP> -t 30
```

---

## 3 安装包准备

### 3.1 下载与解压

```bash
# 1. 下载最新安装包（由 AGIOne 团队提供下载链接）
wget <install.tar.gz 链接>

# 2. 解压
tar -xzf install.tar.gz
cd install/installer
```

### 3.2 资源包准备

请先在 `installer` 目录下下载对应架构的 `resource` 资源包（资源位于阿里云账号 `wanm` 桶 `resources` 目录下，由 AGIOne 团队提供具体路径与凭证）。

### 3.3 初始化安装包

根据节点 CPU 架构选择对应初始化命令：

```bash
# x86_64 架构
bash init-package x86_64

# arm64 架构
bash init-package arm64
```

初始化过程会自动展开镜像、配置文件、二进制工具链，完成后将在 `installer/kubemore` 目录生成完整的部署工具集。

---

## 4 Kubernetes 集群安装

### 4.1 部署工具准备

```bash
# 1. 拷贝 kubemore 工具到系统目录
cp -r installer/kubemore /etc/kubemore

# 2. 进入工作目录
cd /etc/kubemore

# 3. 查看安装命令帮助
./morecli install --help
```

### 4.2 非 root 用户特殊处理

若使用非 root 用户（如 `powerone`）执行安装，需对 prepare 角色进行小幅修改：

```bash
# 编辑文件
vim /etc/kubemore/roles/prepare/tasks/main.yml
```

- 将第 41 行 `when: "inventory_hostname == ansible_env.SSH_CLIENT.split(' ')[0]"` 修改为：
  ```yaml
  when: 'inventory_hostname in ["<本机IP>"]'
  ```
- 将第 48 行 `line: " ansible_env.SSH_CLIENT.split(' ')[0]    easzlab.io.local"` 修改为：
  ```yaml
  line: "<本机IP>    easzlab.io.local"
  ```
- 拷贝非 root 配置：`cp ansible.cfg.not_root ansible.cfg`

### 4.3 集群安装命令

#### 4.3.1 标准安装示例

```bash
./morecli install \
    --masters 192.168.1.3,192.168.1.4 \
    --etcd 192.168.1.3,192.168.1.4 \
    --workers 192.168.1.5,192.168.1.6 \
    --xpu-mode nvidia \
    --xpu-type nvidia-a10080g \
    --kubelet-root-data /data/kubelet \
    --containerd-root-data /data/containerd
```

#### 4.3.2 关键参数说明

| 参数 | 必选 | 说明 |
| --- | --- | --- |
| `--masters / -m` | ✔ | Master 节点 IP 列表，逗号分隔 |
| `--etcds / -e` | ✔ | etcd 节点 IP 列表，建议与 Master 重合（生产 ≥ 3 节点） |
| `--workers / -w` | ✔ | Worker 节点 IP 列表 |
| `--service-cidr` |   | Service 网段，默认 `10.68.0.0/16` |
| `--cluster-cidr` |   | Pod 网段，默认 `172.20.0.0/16` |
| `--password` |   | 所有节点的统一密码（非 root 用户必填） |
| `--ssh-user` |   | SSH 登录用户，默认 root |
| `--ssh-port` |   | SSH 端口，默认 22 |
| `--ntp-server` |   | NTP 服务器地址 |
| `--port-range / -p` |   | NodePort 区间，默认 `30000-32767` |
| `--max-pods` |   | 单节点 Pod 上限，默认 110 |
| `--exter-eip` |   | 集群外部弹性 IP（如有） |
| `--dns-domain / -d` |   | 集群 DNS 域名，默认 `cluster.local` |
| `--xpu-mode` |   | 显卡模式：`nvidia` / `ascend910` / `enflame`，仅设置给 Worker 节点 |
| `--xpu-type` |   | 显卡型号，详见下表 |
| `--kubelet-root-data` |   | kubelet 数据目录，默认 `/var/lib/kubelet`，**生产建议指向数据盘** |
| `--containerd-root-data` |   | containerd 数据目录，默认 `/var/lib/containerd`，**生产建议指向数据盘** |

#### 4.3.3 显卡型号对照表（`--xpu-type`）

| 厂商（`--xpu-mode`）| 可选型号 |
| --- | --- |
| nvidia | `nvidia-v10032g`、`nvidia-v10016g`、`nvidia-t4`、`nvidia-a10040g`、`nvidia-a10080g` |
| ascend910 | `ascend-910a`、`ascend-910b` |
| enflame | `enflame-s60` |

> 实际部署时如遇清单外型号（如 H20、L20、H200），请联系 AGIOne 团队获取最新参数清单。

### 4.4 集群运维操作

#### 4.4.1 新增节点

集群上线后，可平滑加入新节点：

```bash
./morecli add \
    --masters 192.168.1.3,192.168.1.4 \
    --etcds 192.168.1.3,192.168.1.4 \
    --workers 192.168.1.7,192.168.1.8
```

#### 4.4.2 移除节点

下线问题节点或缩容时使用：

```bash
./morecli del \
    --masters 192.168.1.5,192.168.1.6 \
    --etcds 192.168.1.3,192.168.1.4 \
    --workers 192.168.1.7,192.168.1.8
```

#### 4.4.3 销毁集群

测试环境或重做集群时使用：

```bash
./morecli destroy
```

> ⚠️ 销毁操作不可逆，会清理所有 Kubernetes 数据。生产环境严禁直接执行。

### 4.5 集群安装验证

安装完成后验证 Kubernetes 集群健康状态：

```bash
# 1. 节点状态
kubectl get nodes -o wide

# 2. 系统组件 Pod
kubectl get pods -A

# 3. 集群版本
kubectl version

# 4. 检查 etcd 健康
kubectl -n kube-system get pod | grep etcd
```

所有节点应处于 `Ready` 状态，所有系统 Pod 应处于 `Running` 状态。

---

## 5 核心组件激活

集群基础设施就绪后，按以下顺序激活 AGIOne 所需核心组件。

### 5.1 显卡 device-plugin 组件

根据 Worker 节点的显卡厂商激活对应 device-plugin：

```bash
# NVIDIA 显卡
./morecli activate-kdp nvidia

# 华为昇腾 910 系列
./morecli activate-kdp ascend910

# 燧原显卡
./morecli activate-kdp enflame

# NVIDIA 显卡 HAMI 显存超分（多模型共卡场景）
./morecli activate-kdp hami
```

> **HAMI 适用场景**：当多个小模型需共享同一张 NVIDIA 卡时，通过 HAMI 实现显存逻辑切分与配额管控，提升 GPU 利用率。**HAMI 与原生 nvidia device-plugin 互斥，二选一即可。**

激活后验证：

```bash
kubectl get pods -n kube-system | grep -E 'nvidia|ascend|enflame|hami'
kubectl describe node <worker-node> | grep -A 5 'Allocatable'
# 应能看到 nvidia.com/gpu 或 huawei.com/Ascend910 等资源
```

### 5.2 监控组件

#### 5.2.1 部署监控数据库（KubeDB）

```bash
# 1. 设置监控数据库存储路径，建议放在管理节点的共享 NAS 存储上
export DB_DATA=/opt/kubedb

# 2. 安装 KubeDB
./morecli install-kubedb

# 3. 查看 KubeDB 密码（用于后续监控组件配置）
cat ./kubedb/kubedb.yaml
```

#### 5.2.2 部署基础监控组件

按 Worker 节点的显卡厂商选择监控模式：

```bash
# 选项任选其一，与 device-plugin 模式对应
./morecli activate-monitor --xpu-mode ascend910
./morecli activate-monitor --xpu-mode hami
./morecli activate-monitor --xpu-mode nvidia
./morecli activate-monitor --xpu-mode enflame
./morecli activate-monitor --xpu-mode biren
```

监控组件会自动采集 GPU/NPU 利用率、显存、温度、功耗等指标，并提供 Prometheus 指标接口。

#### 5.2.3 [可选] Kubernetes 集群监控

仅在客户明确要求集群级监控大盘时安装：

```bash
./morecli activate-k8s-monitor
# 默认 Grafana 端口为 32765
# 访问 http://<任一节点IP>:32765
```

### 5.3 Jupyter 转发组件

为研发用户提供 Jupyter Notebook 远程访问能力：

```bash
./morecli activate-jupy-proxy test
```

### 5.4 工具集激活

激活以下三类常用工具：

```bash
./morecli activate-tools
```

包含：

1. **nerdctl**：镜像打包工具，用于 containerd 环境下的镜像构建
2. **model-downloader**：模型自动下载工具，支持 HuggingFace、ModelScope 等仓库
3. **s3fs**：将对象存储桶动态挂载为 POSIX 文件系统

### 5.5 [可选] 存储 CSI 组件

仅在集群配置了对象存储服务时安装：

```bash
./morecli activate-osc
```

---

## 6 [可选] RDMA / SR-IOV 部署

仅在 NVIDIA 节点具备 RDMA 网络（RoCE 或 InfiniBand）时配置，用于多机张量并行场景。

### 6.1 SR-IOV 前置条件

- BIOS 中已开启 SR-IOV 功能（不同主板品牌设置位置不同，常见于 `Advanced > PCIe Configuration`）
- 部署节点已安装 ansible（`yum install -y ansible` 或 `apt install -y ansible`）

### 6.2 SR-IOV 配置步骤

#### 10.2.1 进入配置目录

```bash
cd install/kubemore/sriov
```

#### 6.2.2 编辑节点列表 `hosts`

为每个节点指定虚拟网卡 MAC 地址起始段（**注意每节点 mac_start 必须唯一**）：

```ini
[nodes]
10.190.31.1 mac_start=00:50:56:00:01
10.190.31.2 mac_start=00:50:56:00:02
10.190.31.3 mac_start=00:50:56:00:03
```

#### 6.2.3 编辑 `sriov.yml`

```yaml
---
- hosts: nodes
  serial: 50
  remote_user: root
  vars:
    # 需开启 SR-IOV 的物理网卡 PCI ID
    devices: "0000:81:00.0 0000:82:00.0"
    # 每张网卡创建的虚拟功能（VF）数量
    vf_number: 8
```

#### 6.2.4 执行配置

```bash
bash run
```

配置完成后，登录任意节点验证：

```bash
lspci -nn | grep Virtual
# 应输出每张网卡对应的 VF 列表
```

### 6.3 RDMA 组件激活

```bash
# RoCE 网络
./morecli activate-rdma roce

# InfiniBand 网络
./morecli activate-ib roce
```

---

## 7 [可选] 镜像仓库Harbor部署

镜像仓库为 AGIOne 平台分发推理引擎、模型服务镜像的核心基础设施，强烈建议独立部署，不与 K8s 节点共用。

### 7.1 节点规格

| 项目 | 最低要求 | 生产推荐 |
| --- | --- | --- |
| CPU 核数 | ≥ 4 核 | ≥ 8 核 |
| 内存 | ≥ 8 GB | ≥ 16 GB |
| 系统盘 | ≥ 100 GB | ≥ 200 GB |
| 数据盘 | 可选 ≥ 500 GB（推荐 NAS） | ≥ 2 TB（推荐 NAS） |
| 端口要求 | 集群可访问 8090 | 8090 + 8443（如启用 HTTPS） |
| 操作系统 | Ubuntu 20.04 / 22.04 / CentOS 7 / OpenEuler 22.03 | 同前 |

### 7.2 Harbor 安装

#### 11.2.1 进入工作目录

```bash
cd install/kubeimg
vim harbor.yml
```

#### 7.2.2 修改关键配置

- **主机名与端口**

  ```yaml
  hostname: 10.8.104.12
  http:
    port: 8090
  ```

- **管理员初始密码**（首次安装后请立即从 UI 修改）

  ```yaml
  harbor_admin_password: Harbor12345
  ```

- **数据存储路径**（建议指向大容量 NAS 存储）

  ```yaml
  data_volume: /data
  ```

#### 7.2.3 执行安装

```bash
bash install.sh
```

安装完成后访问 `http://<harbor-ip>:8090`，使用 `admin / <harbor_admin_password>` 登录。

### 7.3 集群对接 Harbor

集群所有节点的 containerd 配置中需添加 Harbor 仓库地址（在 `morecli` 安装阶段已自动注入，如有变更需手动更新）：

```toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors."10.8.104.12:8090"]
  endpoint = ["http://10.8.104.12:8090"]
```

随后将 AGIOne 提供的推理引擎镜像（vLLM、MindIE、SGLang 等）推送至 Harbor，供 Worker 节点拉取。

---

## 8 [可选] 对象存储部署

仅在客户场景中需要 S3 兼容对象存储（用于模型仓库、日志归档、训练数据等）时部署。

### 8.1 节点规格

| 项目 | 最低要求 | 生产推荐 |
| --- | --- | --- |
| CPU 核数 | ≥ 4 核 | ≥ 8 核 |
| 内存 | ≥ 8 GB | ≥ 16 GB |
| 系统盘 | ≥ 100 GB | ≥ 200 GB |
| 数据盘 | 可选 ≥ 500 GB（推荐 NAS） | ≥ 4 TB（多副本部署需更大）|
| 端口要求 | 集群可访问 9000、9001 | 同前 |

### 8.2 单节点 MinIO 安装

适用于研发或小规模场景：

```bash
export MINIO_HOME=/opt/kubestore
export MINIO_ROOT_USER=kubestoreadmin
export MINIO_ROOT_PASSWORD=kubestoreadmin

bash storecli install-minio
```

### 8.3 多节点集群化安装

适用于生产环境，需 ≥ 4 节点保证 EC 纠删码可用：

```bash
export MINIO_SIZE=1024
export MINIO_PATH=/data

./morecli install-kubestore \
    192.168.1.21 \
    192.168.1.22 \
    192.168.1.23 \
    192.168.1.24
```

### 8.4 集群挂载对象存储

完成对象存储部署后，需在 K8s 集群侧激活存储 CSI 组件，实现 PVC 动态挂载：

```bash
./morecli activate-osc
```

随后即可在工作负载中通过 PVC 申请对象存储卷。

---

## 9 部署验收清单

所有组件激活完成后，须按以下清单逐项验证，签字归档。

### 9.1 集群基础验收

| # | 验证项 | 验证方法 | 预期结果 |
| --- | --- | --- | --- |
| 1 | 节点状态 | `kubectl get nodes` | 所有节点 `Ready` |
| 2 | 系统 Pod | `kubectl get pods -A` | 全部 `Running` 或 `Completed` |
| 3 | etcd 健康 | `kubectl -n kube-system exec etcd-<master> -- etcdctl endpoint health` | 所有 endpoint `is healthy` |
| 4 | DNS 解析 | `kubectl run -it --rm test --image=busybox -- nslookup kubernetes` | 解析成功 |
| 5 | NodePort 可达 | `curl http://<node>:32765` | 监控页面可访问 |

### 9.2 显卡资源验收

| # | 验证项 | 验证方法 | 预期结果 |
| --- | --- | --- | --- |
| 1 | GPU 资源注册 | `kubectl describe node <worker> \| grep -A 3 Allocatable` | 出现 `nvidia.com/gpu: <N>` 或对应厂商资源键 |
| 2 | 显卡监控指标 | 访问 Grafana → GPU 监控大盘 | 利用率、显存、温度、功耗均有数据 |
| 3 | 测试 Pod 调度 | 部署一个请求 1 GPU 的 Pod，进入容器执行 `nvidia-smi` | 看到分配的 GPU |

### 9.3 镜像与存储验收

| # | 验证项 | 验证方法 | 预期结果 |
| --- | --- | --- | --- |
| 1 | Harbor 登录 | 浏览器访问 `http://<harbor>:8090` | 登录成功 |
| 2 | 镜像推送 | `nerdctl push <harbor>/library/test:v1` | 推送成功 |
| 3 | 节点拉取 | Worker 节点上 `crictl pull <harbor>/library/test:v1` | 拉取成功 |
| 4 | 对象存储（如启用） | 用 `mc` 客户端连接 MinIO，创建桶并上传文件 | 操作成功 |

### 9.4 RDMA 验收（如启用）

| # | 验证项 | 验证方法 | 预期结果 |
| --- | --- | --- | --- |
| 1 | SR-IOV VF | `lspci -nn \| grep Virtual` | 显示已配置数量的 VF |
| 2 | RDMA 端口 | `ibstat` | Port `Active`，speed 符合规格 |
| 3 | 跨节点带宽 | `ib_send_bw` 跨节点测试 | 接近物理带宽 |

---

## 10 常见问题与故障排查

### 10.1 SSH 互信失败

**现象**：`./morecli install` 报错 `Permission denied (publickey,password)`

**排查**：

1. 确认部署节点 `~/.ssh/id_rsa.pub` 已写入目标节点的 `~/.ssh/authorized_keys`
2. 检查目标节点 `/etc/ssh/sshd_config` 中 `PubkeyAuthentication yes`
3. 检查权限：`~/.ssh` 应为 700，`authorized_keys` 应为 600
4. 非 root 用户场景，须确认已拷贝 `ansible.cfg.not_root` 为 `ansible.cfg`

### 10.2 GPU 资源未注册到 K8s

**现象**：`kubectl describe node` 看不到 `nvidia.com/gpu` 资源

**排查**：

1. 确认 `nvidia-smi` 在节点上正常工作
2. 确认 device-plugin Pod 状态：`kubectl get pods -n kube-system | grep nvidia`
3. 查看插件日志：`kubectl logs -n kube-system <plugin-pod>`
4. 重启节点 kubelet：`systemctl restart kubelet`

### 10.3 节点功耗超出机柜配电

**现象**：服务器节点调用人数多时，机房机柜跳闸或告警

**应对**：

- 在监控大盘设置机柜级功耗阈值告警（70% 黄、85% 橙、95% 红）
- 在 AGIOne 调度策略中启用并发数上限，防止瞬时峰值
- 若长期触顶，考虑分摊到不同机柜的节点上

### 10.4 OS 重装后节点自动恢复失败

**现象**：昇腾节点 OS 重装后无法自动重新加入集群

**排查**：

1. 确认节点初始化脚本被嵌入到 Base Image
2. 确认数据盘挂载点（`/data/models`、`/etc/kubernetes` 映射）持久化未被破坏
3. 检查管理平面与节点的网络可达性（专线 / VPC）
4. 确认 AGIOne Agent 启动日志中节点注册接口调用成功

### 10.5 Harbor 推送超时

**现象**：大镜像（>10GB）推送 Harbor 时连接中断

**应对**：

- 调大客户端 `daemon.json` 中 `max-concurrent-uploads`
- Harbor 反向代理（Nginx）配置中调大 `client_max_body_size` 与超时时长
- 大镜像优先使用 `nerdctl save | nerdctl load` 离线导入到目标节点

---

## 11 附录

### 11.1 部署节点清单模板

| 序号 | 角色 | 主机名 | 管理 IP | 业务 IP | RDMA IP | CPU/内存 | 数据盘 | 加速卡 | 操作系统 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Master + etcd | mgmt-01 | 192.168.1.3 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 2 | Master + etcd | mgmt-02 | 192.168.1.4 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 3 | Master + etcd | mgmt-03 | 192.168.1.5 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 4 | Worker | gpu-01 | 192.168.1.11 | 10.0.1.11 | 10.10.1.11 | 64C / 512G | 4 TB | 8 × A800-80G | Ubuntu 22.04 |
| 5 | Worker | gpu-02 | 192.168.1.12 | 10.0.1.12 | 10.10.1.12 | 64C / 512G | 4 TB | 8 × H20-96G | Ubuntu 22.04 |

### 11.2 端口规划速查表

| 服务 | 端口 | 说明 |
| --- | --- | --- |
| Kubernetes API Server | 6443 | Master 节点对外 |
| etcd Client | 2379 | Master/etcd 节点内部 |
| etcd Peer | 2380 | etcd 节点之间 |
| kubelet | 10250 | 所有节点 |
| Harbor HTTP | 8090 | Harbor 节点 |
| Harbor HTTPS（可选） | 8443 | Harbor 节点 |
| MinIO API | 9000 | 对象存储节点 |
| MinIO Console | 9001 | 对象存储节点 |
| AGIOne 业务 NodePort | 32761 - 32765 | 所有 Worker |
| Grafana | 32765 | 监控访问入口 |
| 默认 NodePort 区间 | 30000 - 32767 | 业务模型服务 |

### 11.3 morecli 命令速查

| 类别 | 命令 |
| --- | --- |
| 安装集群 | `./morecli install --masters ... --etcd ... --workers ...` |
| 增加节点 | `./morecli add --workers 192.168.1.7,192.168.1.8` |
| 移除节点 | `./morecli del --workers 192.168.1.7,192.168.1.8` |
| 销毁集群 | `./morecli destroy` |
| 激活 NVIDIA 插件 | `./morecli activate-kdp nvidia` |
| 激活 Ascend 插件 | `./morecli activate-kdp ascend910` |
| 激活 HAMI 显存超分 | `./morecli activate-kdp hami` |
| 安装 KubeDB | `./morecli install-kubedb` |
| 激活监控组件 | `./morecli activate-monitor --xpu-mode nvidia` |
| 激活 K8s 监控 | `./morecli activate-k8s-monitor` |
| 激活 Jupyter | `./morecli activate-jupy-proxy test` |
| 激活工具集 | `./morecli activate-tools` |
| 激活对象存储 CSI | `./morecli activate-osc` |
| 激活 RoCE | `./morecli activate-rdma roce` |
| 激活 IB | `./morecli activate-ib roce` |
| 安装多节点 MinIO | `./morecli install-kubestore <ip1> <ip2> ...` |
