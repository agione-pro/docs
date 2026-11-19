# 纳管算力

本文把 GPU / NPU 节点纳管为 Kubernetes 算力集群，并激活设备插件、监控和镜像服务。开始前先完成 [纳管前准备](./deployment-requirements-for-managing-compute-nodes)。

ClusterD 是纳管时使用的网页程序，安装在控制端。网页通过 SSH 在算力节点上添加集群、初始化节点并激活组件。说明见 [ClusterD 是什么](./clusterd-overview)。

## 快捷安装 ClusterD

控制端使用 Ubuntu 22.04，架构为 x86_64 或 ARM64。ClusterD 安装在控制端。

1. 打开 [发布包下载页]({{DOCS_RELEASE_PAGE_URL_ZH}})，复制与控制端 `uname -m` 匹配的全量包 URL 和该包自己的 SHA-256。
2. 在控制端执行：

```bash
sudo -i
bash
set -e
mkdir -p /opt/clusterd-packages
cd /opt/clusterd-packages

CLUSTERD_PACKAGE_URL="<CLUSTERD_PACKAGE_URL>"
CLUSTERD_PACKAGE_NAME="agione-clusterd-full-release-XXX-linux-x86_64.tar.gz"
CLUSTERD_PACKAGE_SHA256="<TRUSTED_OUTER_ARCHIVE_SHA256>"

curl --fail --location --output "$CLUSTERD_PACKAGE_NAME" "$CLUSTERD_PACKAGE_URL"
printf '%s  %s\n' "$CLUSTERD_PACKAGE_SHA256" "$CLUSTERD_PACKAGE_NAME" | sha256sum -c -
tar -xzf "$CLUSTERD_PACKAGE_NAME"
cd "${CLUSTERD_PACKAGE_NAME%.tar.gz}"
bash verify.sh

CLUSTERD_INSTALL_LOG=/var/log/agione-clusterd-install.log
if bash install.sh install > "$CLUSTERD_INSTALL_LOG" 2>&1; then
  tail -n 20 "$CLUSTERD_INSTALL_LOG"
else
  tail -n 100 "$CLUSTERD_INSTALL_LOG"
  false
fi
systemctl is-active agione-clusterd
```

ARM64 控制端把文件名中的 `x86_64` 改成 `arm64`，并换上该包自己的 URL 和 SHA-256。看到 `agione-clusterd-install-ok`、服务为 `active` 后，浏览器打开 `http://<控制端 IP>:18093/`，并按安装说明创建账户。

主机检查、离线拷贝、轻量包、升级和卸载见 [安装、升级与卸载](./clusterd/)。同一套命令也写在该页的 [快捷安装](./clusterd/#quick-install)。

## 算力集群纳管

### 算力节点纳管

### 集群添加

1. 使用安装 ClusterD 时创建的账户登录。首次打开网页时的创建步骤见 [安装并打开 ClusterD](./clusterd/#_4-安装并打开-clusterd)。
2. 访问界面，第一次进入cluster需初始化用户，为operator账号配置密码。
   ![init-user01.png](./clusterd-images/prod01.png)
3. 配置密码后，直接进入clusterd界面，点击“算力纳管”，并添加集群
   ![add-cluster01.png](./clusterd-images/prod02.png)

#### Maintenance节点配置
**注：Maintenance节点用于管理集群的代理节点，可以是算力集群节点中的一个节点，主要用于接收界面请求指令，在该节点上执行**

1. 按要求填写集群名称、ssh连接认证信息及配置Network mode（备注：只有当待纳管的节点无法访问互联网时，选择“Offline maintenance”）
![add-cluster01-maintenance.png](./clusterd-images/prod03.png)
1. 配置好后，保存即可，若是online模式会自动下载集群配置安装包并解压

#### 集群初始化
如下图，配置集群网络信息，默认情况下，直接提交保存即可，除非Service CIDR、Cluster CIDR与实际环境有冲突
![init-cluster.png](./clusterd-images/prod04.png)

#### 节点添加及初始化
1. 如下图，在Add nodes步骤中，点击添加节点
![add-node-init.png](./clusterd-images/prod05.png)
2. 填写节点的ip（该ip通常是内网ip，Maintenance需要可通过ssh访问到该ip，后续的ssh认证信息也是Maintenance访问这个ip对应节点需要的相关信息）
** 通常纳管节点数量 < 3时，需要有一个节点勾选master/etcd服务；纳管节点数量 >= 3时，需要有3个节点勾选master/etcd服务；**
3. 添加后，点击“Check”，检查添加节点是否满足部署条件（包括芯片、操作系统、存储、软件等检查）
![node-check.png](./clusterd-images/prod06.png)
![node-report.png](./clusterd-images/prod07.png)
若存在异常，则进行修复
![node-report.png](./clusterd-images/prod08.png)
修复后，再次执行检查
![node-init.png](./clusterd-images/prod09.png)
4. 检查满足后，再点击init进行安装部署，等待任务完成即可
![node-init.png](./clusterd-images/prod10.png)

### 组件激活
1. 如下图，节点初始化后，进入Active components环节，
![cluster-activate.png](./clusterd-images/prod11.png)
根据实际加速卡类型选择，点击“一键激活”

## 镜像服务安装
### 镜像服务部署配置
1. 集群需要配置镜像服务，可以是多个集群共享，也可以是每个集群配置一个，通常看网络连接情况决定，all in one场景，通常将镜像服务安装在Maintenance节点上
![install-harbor.png](./clusterd-images/install-harbor.png)
2. 如下图，通过“Get Disk”，获取节点磁盘，规划一个空间较大的盘（通常>=500G），用来存放镜像数据
![get-av-disk.png](./clusterd-images/get-av-disk.png)
3. 随后，点击“Install Harbor”即可，完成后，点击“View Images”可以查看，目前镜像库为空库
![view-images.png](./clusterd-images/view-images.png)
4. 配置insecure镜像库，进入"镜像激活向导"，按流程激活新增的本地镜像
![insecure-images.png](./clusterd-images/prod14.png)

### 复制镜像
镜像库完成后，可复制镜像到harbor库中（OneProHuaweiMP华为云账号的香港和贵州地域），如下图
![copy-image.png](./clusterd-images/copy-image.png)
远程的库中，保存了常用的推理框架，可复制临时用户名、密码及仓库信息
![config-registry.png](./clusterd-images/config-registry.png)
提交等待完成复制即可

**注意事项**

1. OneProHuaweiMP华为云账号下，agione-powerone组织下为可生产用镜像，其中vllm-ascend镜像用于华为NPU卡，vllm-openai、sglang用户NVIDIA GPU卡
![swr-registry.png](./clusterd-images/swr-registry.png)
1. 下图表示，如何获取OneProHuaweiMP华为云账号的相关认证信息
![swr-auth.png](./clusterd-images/swr-auth.png)
1. 下图中，红色框内容去掉"docker pull"，即为源镜像的地址信息
![swr-image-registry.png](./clusterd-images/swr-image-registry.png)

## 节点扩容
1. 进入“节点扩容”，选择要扩容的集群
![choose-cluster.png](./clusterd-images/prod12.png)
2. 第二步，新增节点，配置ssh认证信息，及新增节点角色
![add-node.png](./clusterd-images/prod13.png)
3. 新增节点后，与部署时类似操作，对节点进行检查、修复，检查无问题后，批量初始化即可