# 安装算力集群

::: tip 默认使用安装文档
纳管算力默认使用 [安装算力](./quick-install-with-agione-clusterd)。ClusterD 是其中的网页程序，安装在控制端。说明见 [ClusterD 是什么](./clusterd-overview)，安装、升级和卸载见 [安装、升级与卸载](./clusterd/)。本文是命令行安装。
:::

## 前言

| 项目 | 内容 |
| --- | --- |
| 适用角色 | 算力集群实施工程师、GPU / NPU 节点运维工程师、客户平台管理员 |
| 导航路径 | 部署 > 纳管算力 > 命令行安装 |
| 功能定位 | 指导用户完成纳管算力节点环境准备、安装包初始化、Kubernetes 集群安装、组件安装和基础验证 |

本文适用于已经完成资源规划和环境调研的算力节点部署场景。如果加速卡、操作系统、端口或网络要求尚未确认，请先阅读 [纳管算力节点部署配置要求](./deployment-requirements-for-managing-compute-nodes)。

### 新手理解

这篇文档要在算力节点通过规划和调研后使用。它会把已准备好的机器安装成 Kubernetes 算力集群，再用 `plugincli` 安装加速卡、监控和镜像仓库组件。

## 部署时间线

| 阶段 | 你要做什么 | 完成标志 |
| --- | --- | --- |
| 第 1 步：准备节点环境 | 初始化 OS、安装驱动、配置 SSH 免密并验证网络 | 每台节点可从部署节点访问 |
| 第 2 步：准备安装包 | 下载并初始化匹配 CPU 架构的资源包 | 生成 `installer/kubemore` 工具 |
| 第 3 步：安装集群 | 使用 Master、etcd、Worker 参数执行 `morecli install` | Kubernetes 集群安装完成 |
| 第 4 步：安装组件 | 用 `plugincli` 安装加速卡组件和监控，并按需安装镜像仓库 | 节点上出现本次安装对应的加速卡资源 |

## 1 文档概述

### 1.1 术语速查

| 术语 | 含义 |
| --- | --- |
| Master 节点 | Kubernetes 集群控制平面节点 |
| Worker 节点 | 承载推理实例的算力节点（搭载 GPU/NPU） |
| etcd 节点 | Kubernetes 元数据存储节点 |
| device-plugin | Kubernetes 显卡设备插件，负责将 GPU/NPU 资源注册给调度器 |
| OFED | Mellanox InfiniBand/RoCE 网卡驱动套件 |
| SR-IOV | 单根 I/O 虚拟化，用于 RDMA 网卡虚拟功能切分 |
| Harbor | 企业级容器镜像仓库 |
| plugincli | `installer/kube-plugin` 中的组件安装命令 |

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
- 将第 48 行 <span v-pre>`line: "{{ ansible_env.SSH_CLIENT.split(' ')[0] }}    easzlab.io.local"`</span> 修改为：
  ```yaml
  line: "<本机IP>    easzlab.io.local"
  ```
- 拷贝非 root 配置：`cp ansible.cfg.not_root ansible.cfg`

使用 root 执行安装时，保持这个文件原样。

### 4.3 集群安装命令

#### 4.3.1 标准安装示例

集群安装不处理显卡类型。显卡厂商和型号在组件安装阶段通过 `plugincli` 处理。

`./morecli install --help` 的示例写成 `--etcd`。传入 `--etcd` 时安装脚本报 `Bad command`。命令接受 `--etcds` 和 `-e`。

```bash
./morecli install \
    --masters 192.168.1.3,192.168.1.4 \
    --etcds 192.168.1.3,192.168.1.4 \
    --workers 192.168.1.5,192.168.1.6
```

非 root 用户执行时，加上 `--ssh-user`、`--password` 和 `--ssh-port`，并执行 `cp ansible.cfg.not_root ansible.cfg`。`ssh-user` 不是 root 时，安装脚本也会做这一次复制。

#### 4.3.2 关键参数说明

| 参数 | 必选 | 说明 |
| --- | --- | --- |
| `--masters / -m` | ✔ | Master 节点 IP 列表，逗号分隔 |
| `--etcds / -e` | ✔ | etcd 节点 IP 列表，逗号分隔 |
| `--workers / -w` | ✔ | Worker 节点 IP 列表，逗号分隔 |
| `--service-cidr` |   | Service 网段，默认 `10.68.0.0/16` |
| `--cluster-cidr` |   | Pod 网段，默认 `172.20.0.0/16` |
| `--password` |   | 所有节点的统一密码。非 root 用户需要填写 |
| `--ssh-user` |   | SSH 登录用户，默认 `root` |
| `--ssh-port` |   | SSH 端口，默认 `22` |
| `--ntp-server` |   | 集群 NTP 服务器 |
| `--port-range / -p` |   | NodePort 区间，默认 `30000-32767` |
| `--max-pods` |   | 单节点最大 Pod 数，默认 `110` |
| `--exter-eip` |   | 集群外部 EIP |
| `--dns-domain / -d` |   | 集群 DNS 域名，默认 `cluster.local` |
| `--kubelet-root-data` |   | kubelet 数据目录，默认 `/var/lib/kubelet` |
| `--containerd-root-data` |   | containerd 数据目录，默认 `/var/lib/containerd` |

### 4.4 集群运维操作

新增和移除节点使用 `--etcds` 或 `-e`。帮助示例写成 `--etcd`，传入后安装脚本报 `Bad command`。

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

## 5 组件安装

组件安装与集群安装分开。在安装包的 `installer/kube-plugin` 目录执行 `plugincli`。`morecli` 仍在 `/etc/kubemore`。

```bash
cd installer/kube-plugin
```

执行 `plugincli` 的机器需要已经安装并启动 Docker。Docker 不可用时命令退出。

### 5.1 给节点打加速卡标签

这一步可选。`--mode` 和 `--type` 都要填写。安装说明中的示例：

```bash
./plugincli label-xpu --mode nvidia --type nvidia-a10080g
```

`--mode` 取值为 `nvidia`、`ascend910`、`ascend950`、`amd-gpu`、`google-tpu`、`biren`、`enflame`、`cambricon`、`hygon`、`iluvatar`、`kunlunxin`、`metax`、`moore-threads`。`--nodes node1,node2` 指定节点。不写 `--nodes` 时，命令给还没有 `kubemore_xpu_device_mode` 标签的节点打标签。

标签写入 `kubemore_xpu_device_mode` 和 `kubemore_xpu_type`。NVIDIA 节点同时写入 `gpu=on`，昇腾节点同时写入 `ascend=on`。其余 `--mode` 同时写入 `kubemore_accelerator_scheduling=volcano-direct`。

### 5.2 安装 Volcano

`--backend` 必填，取值为 `none`、`hami`、`mindcluster`、`direct`。

整卡调度，同时安装对应的原生 Device Plugin：

```bash
./plugincli component install volcano --backend none nvidia
./plugincli component install volcano --backend none ascend
./plugincli component install volcano --backend none ascend950
```

`ascend` 与 `ascend910` 相同。一次只接受一种设备。昇腾 910 整卡资源名是 `huawei.com/Ascend910`，950 是 `huawei.com/npu`。

NVIDIA 使用 HAMi vGPU。`--gpu-split` 和 `--mem-split` 的示例值是 `4` 和 `1`：

```bash
./plugincli component install volcano --backend hami nvidia
./plugincli component install volcano --backend hami nvidia --gpu-split 4 --mem-split 1
```

昇腾可在 HAMi vNPU 与 MindCluster 之间选择。HAMi 不接受 `ascend950`：

```bash
./plugincli component install volcano --backend hami ascend
./plugincli component install volcano --backend mindcluster ascend
./plugincli component install volcano --backend mindcluster ascend950
```

MindCluster 的两种模式：

```bash
# 软切分。节点需要先准备 vCANN-RT
./plugincli component install volcano --backend mindcluster ascend --mindcluster-mode soft-share

# 整卡
./plugincli component install volcano --backend mindcluster ascend --mindcluster-mode whole-card
```

不写 `--mindcluster-mode` 时，`plugincli` 使用 `whole-card`。Kubernetes 1.36 超出已验证范围，安装会拒绝。验收环境可以传入 `--allow-unvalidated-k8s`。

MindCluster 使用独立调度器，作业写 `schedulerName: mindcluster-volcano`。官方 Device Plugin 上报 `huawei.com/Ascend910`。训练任务使用 `mindxdl.gitee.com/v1` 的 `AscendJob`。集群容器后端是 containerd。昇腾节点需要 Ascend 容器运行时，chart 只修改 containerd 的 runc `BinaryName`。

不做设备切分、由外部提供厂商 Device Plugin 时：

```bash
./plugincli component install volcano \
    --backend direct \
    --direct-backends amd-gpu,google-tpu,biren,enflame,cambricon,hygon,iluvatar,kunlunxin,metax,moore-threads
```

安装会按所选后端更新 Volcano，并卸掉另一套昇腾插件，避免两个 Device Plugin 同时占用节点。

卸载：

```bash
./plugincli component uninstall hami
./plugincli component uninstall mindcluster
./plugincli component uninstall volcano
```

### 5.3 原生 Kubernetes 调度器

原生 Kubernetes default-scheduler 使用下面的命令：

```bash
./plugincli component install device-plugin nvidia
./plugincli component install device-plugin ascend910
./plugincli component install device-plugin ascend950
```

`device-plugin ascend` 与 `ascend910` 相同。910 上报 `huawei.com/Ascend910`，950 上报 `huawei.com/npu`。

### 5.4 作业申请的资源名

Volcano（非 MindCluster）作业写 `schedulerName: volcano`。

NVIDIA HAMi：

```yaml
resources:
  limits:
    volcano.sh/vgpu-number: 1
    volcano.sh/vgpu-memory: 4096
    volcano.sh/vgpu-cores: 50
```

昇腾 HAMi。910B3 使用 `huawei.com/Ascend910B`，910B2 和 910B2C 使用 `huawei.com/Ascend910B2`。显存单位是 MiB：

```yaml
resources:
  limits:
    huawei.com/Ascend910B2: "1"
    huawei.com/Ascend910B2-memory: "4096"
```

安装后查看节点资源：

```bash
kubectl get pods -A
kubectl describe node <worker-node>
```

`Allocatable` 中应出现本次安装对应的资源名。

### 5.5 监控组件

监控数据库路径按现场修改。安装说明建议放在管理节点的共享 NAS 上。

```bash
./plugincli component install influxdb --data-path /opt/kubedb
./plugincli component install monitor --xpu-mode ascend910 --server-port 32761
./plugincli component install monitor --xpu-mode ascend950 --server-port 32761
```

不写 `--xpu-mode` 时，命令读取节点标签 `kubemore_xpu_device_mode`。标签为 `nvidia` 时，当前命令退出，提示 NVIDIA exporter 归档未包含，需要先加入已验证的 dcgm-exporter 镜像。`plugincli` 帮助文本中的对应示例是 `--xpu-mode nvidia`。

集群自身的监控按需安装。它提供 Grafana 看板，命令不带端口：

```bash
./plugincli component install k8s-monitor
```

### 5.6 Jupyter 转发组件

```bash
./plugincli component install jupyterlab-proxy --proxy-port 32762
```

### 5.7 工具

下面的命令安装 `nerdctl`、`model-downloader` 和 `s3fs`：

```bash
./plugincli images push-tools
```

---

## 6 [可选] RDMA / SR-IOV 部署

仅在 NVIDIA 节点具备 RDMA 网络（RoCE 或 InfiniBand）时配置，用于多机张量并行场景。

### 6.1 SR-IOV 前置条件

- BIOS 中已开启 SR-IOV 功能（不同主板品牌设置位置不同，常见于 `Advanced > PCIe Configuration`）
- 部署节点已安装 ansible（`yum install -y ansible` 或 `apt install -y ansible`）

### 6.2 SR-IOV 配置步骤

#### 6.2.1 进入配置目录

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
# RDMA 网络为 RoCE
bash /etc/kubemore/utils/activate-rdma roce

# RDMA 网络为 IB
bash /etc/kubemore/utils/activate-rdma ib
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
| 端口要求 | 集群可访问 8090 | 8090 |
| 操作系统 | Ubuntu 20.04 / 22.04 / CentOS 7 / OpenEuler 22.03 | 同前 |

### 7.2 Harbor 安装

#### 7.2.1 进入工作目录

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

## 8 部署验收清单

所有组件激活完成后，须按以下清单逐项验证，签字归档。

### 8.1 集群基础验收

| # | 验证项 | 验证方法 | 预期结果 |
| --- | --- | --- | --- |
| 1 | 节点状态 | `kubectl get nodes` | 所有节点 `Ready` |
| 2 | 系统 Pod | `kubectl get pods -A` | 全部 `Running` 或 `Completed` |
| 3 | etcd 健康 | `kubectl -n kube-system exec etcd-<master> -- etcdctl endpoint health` | 所有 endpoint `is healthy` |
| 4 | DNS 解析 | `kubectl run -it --rm test --image=busybox -- nslookup kubernetes` | 解析成功 |
| 5 | 监控组件 | `kubectl get pods -n kube-system \| grep monitor` | 监控 Pod 为 `Running`。安装命令中的端口是 `32761` |

### 8.2 显卡资源验收

| # | 验证项 | 验证方法 | 预期结果 |
| --- | --- | --- | --- |
| 1 | 加速卡资源注册 | `kubectl describe node <worker>` | `Allocatable` 出现本次安装对应的资源名 |
| 2 | 测试 Pod 调度 | 按第 5.4 节的资源名提交一个申请加速卡的 Pod | Pod 被调度到 Worker |

NVIDIA HAMi 的资源名是 `volcano.sh/vgpu-number`、`volcano.sh/vgpu-memory`、`volcano.sh/vgpu-cores`。昇腾 HAMi 的 910B3 是 `huawei.com/Ascend910B`，910B2 和 910B2C 是 `huawei.com/Ascend910B2`。整卡或原生 Device Plugin 的 910 是 `huawei.com/Ascend910`，950 是 `huawei.com/npu`。

### 8.3 镜像仓库验收

| # | 验证项 | 验证方法 | 预期结果 |
| --- | --- | --- | --- |
| 1 | Harbor 登录 | 浏览器访问 `http://<harbor>:8090` | 登录成功 |
| 2 | 镜像推送 | `nerdctl push <harbor>/library/test:v1` | 推送成功 |
| 3 | 节点拉取 | Worker 节点上 `crictl pull <harbor>/library/test:v1` | 拉取成功 |

### 8.4 RDMA 验收（如启用）

| # | 验证项 | 验证方法 | 预期结果 |
| --- | --- | --- | --- |
| 1 | SR-IOV VF | `lspci -nn \| grep Virtual` | 显示已配置数量的 VF |
| 2 | RDMA 端口 | `ibstat` | Port `Active`，speed 符合规格 |
| 3 | 跨节点带宽 | `ib_send_bw` 跨节点测试 | 接近物理带宽 |

---

## 9 常见问题与故障排查

### 9.1 SSH 互信失败

**现象**：`./morecli install` 报错 `Permission denied (publickey,password)`

**排查**：

1. 确认部署节点 `~/.ssh/id_rsa.pub` 已写入目标节点的 `~/.ssh/authorized_keys`
2. 检查目标节点 `/etc/ssh/sshd_config` 中 `PubkeyAuthentication yes`
3. 检查权限：`~/.ssh` 应为 700，`authorized_keys` 应为 600
4. 非 root 用户场景，须确认已拷贝 `ansible.cfg.not_root` 为 `ansible.cfg`

### 9.2 加速卡资源未注册到 Kubernetes

**现象**：`kubectl describe node` 看不到本次安装对应的资源名，例如 `volcano.sh/vgpu-number`、`huawei.com/Ascend910B2`、`huawei.com/Ascend910` 或 `huawei.com/npu`。

**排查**：

1. 确认节点上对应厂商的驱动命令可用，例如 NVIDIA 的 `nvidia-smi`、昇腾的 `npu-smi info`
2. 确认已经在 `installer/kube-plugin` 执行了对应的 `plugincli component install`
3. 查看组件 Pod：`kubectl get pods -A`
4. 查看对应 Pod 日志：`kubectl logs -n <namespace> <pod>`

### 9.3 节点功耗超出机柜配电

**现象**：服务器节点调用人数多时，机房机柜跳闸或告警

**应对**：

- 在监控大盘设置机柜级功耗阈值告警（70% 黄、85% 橙、95% 红）
- 在 AGIOne 调度策略中启用并发数上限，防止瞬时峰值
- 若长期触顶，考虑分摊到不同机柜的节点上

### 9.4 OS 重装后节点自动恢复失败

**现象**：昇腾节点 OS 重装后无法自动重新加入集群

**排查**：

1. 确认节点初始化脚本被嵌入到 Base Image
2. 确认数据盘挂载点（`/data/models`、`/etc/kubernetes` 映射）持久化未被破坏
3. 检查管理平面与节点的网络可达性（专线 / VPC）
4. 确认 AGIOne Agent 启动日志中节点注册接口调用成功

### 9.5 Harbor 推送超时

**现象**：大镜像（>10GB）推送 Harbor 时连接中断

**应对**：

- 调大客户端 `daemon.json` 中 `max-concurrent-uploads`
- Harbor 反向代理（Nginx）配置中调大 `client_max_body_size` 与超时时长
- 大镜像优先使用 `nerdctl save | nerdctl load` 离线导入到目标节点

---

## 10 附录

### 10.1 部署节点清单模板

| 序号 | 角色 | 主机名 | 管理 IP | 业务 IP | RDMA IP | CPU/内存 | 数据盘 | 加速卡 | 操作系统 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Master + etcd | mgmt-01 | 192.168.1.3 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 2 | Master + etcd | mgmt-02 | 192.168.1.4 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 3 | Master + etcd | mgmt-03 | 192.168.1.5 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 4 | Worker | gpu-01 | 192.168.1.11 | 10.0.1.11 | 10.10.1.11 | 64C / 512G | 4 TB | 8 × A800-80G | Ubuntu 22.04 |
| 5 | Worker | gpu-02 | 192.168.1.12 | 10.0.1.12 | 10.10.1.12 | 64C / 512G | 4 TB | 8 × H20-96G | Ubuntu 22.04 |

### 10.2 端口规划速查表

| 服务 | 端口 | 说明 |
| --- | --- | --- |
| Kubernetes API Server | 6443 | Master 节点对外 |
| etcd Client | 2379 | Master/etcd 节点内部 |
| etcd Peer | 2380 | etcd 节点之间 |
| kubelet | 10250 | 所有节点 |
| Harbor HTTP | 8090 | Harbor 节点 |
| 监控组件 | 32761 | `plugincli component install monitor --server-port` |
| Jupyter 转发 | 32762 | `plugincli component install jupyterlab-proxy --proxy-port` |
| 默认 NodePort 区间 | 30000 - 32767 | `morecli install --port-range` |

### 10.3 命令速查

| 类别 | 命令 |
| --- | --- |
| 安装集群 | `./morecli install --masters ... --etcds ... --workers ...` |
| 增加节点 | `./morecli add --masters ... --etcds ... --workers ...` |
| 移除节点 | `./morecli del --masters ... --etcds ... --workers ...` |
| 销毁集群 | `./morecli destroy` |
| 加速卡标签 | `./plugincli label-xpu --mode nvidia --type nvidia-a10080g` |
| Volcano 整卡 | `./plugincli component install volcano --backend none nvidia` |
| Volcano + HAMi | `./plugincli component install volcano --backend hami nvidia` |
| 昇腾 HAMi | `./plugincli component install volcano --backend hami ascend` |
| 昇腾 MindCluster | `./plugincli component install volcano --backend mindcluster ascend` |
| 原生 Device Plugin | `./plugincli component install device-plugin nvidia` |
| 监控数据库 | `./plugincli component install influxdb --data-path /opt/kubedb` |
| 监控组件 | `./plugincli component install monitor --xpu-mode ascend910 --server-port 32761` |
| 集群监控 | `./plugincli component install k8s-monitor` |
| Jupyter 转发 | `./plugincli component install jupyterlab-proxy --proxy-port 32762` |
| 工具 | `./plugincli images push-tools` |
| RoCE | `bash /etc/kubemore/utils/activate-rdma roce` |
| IB | `bash /etc/kubemore/utils/activate-rdma ib` |
