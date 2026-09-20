# 初始化 AGIOne ClusterD

AGIOne ClusterD是管理多个Kubernetes集群的工具服务，可支持快速安装kubernetes集群及完成相关组件的激活，AGIOne ClusterD支持的操作系统环境包括：
1. linux: x86_64和arm64，常见的ubuntu22.04/ubuntu20.04/CentOS7皆可支持
2. macos: i386，Intel芯片

## 安装

### 1. 下载安装包

- [macos-i386](https://wanm.oss-cn-beijing.aliyuncs.com/agione-clusterd/agione-clusterd-macos.tar.gz)
- [linux-x86_64](https://wanm.oss-cn-beijing.aliyuncs.com/agione-clusterd/agione-clusterd-linux-x86_64.tar.gz)
- [linux-arm64](https://wanm.oss-cn-beijing.aliyuncs.com/agione-clusterd/agione-clusterd-linux-arm64.tar.gz)

### 2. 解压并启动 AGIOne ClusterD

解压安装包，进入解压目录后执行 ``bash start.sh``。如需后台运行，执行 ``nohup bash start.sh > clusterd.log 2>&1 &``。

**备注: 默认启用8080端口，如果需要使用其他端口，更改config/config.yaml 的``addr``项，更改监听端口**

## 算力集群纳管
### 算力节点纳管
### 集群添加
1. 默认登陆账号是admin，使用admin账号登陆
2. 登陆后，点击添加集群按钮
   ![add-cluster01.png](./clusterd-images/add-cluster01.png)

#### Maintenance节点配置
**注：Maintenance节点用于管理集群的代理节点，可以是算力集群节点中的一个节点，主要用于接收界面请求指令，在该节点上执行**

1. 按要求填写集群名称、ssh连接认证信息及配置Network mode（备注：只有当待纳管的节点无法访问互联网时，选择“Offline maintenance”）
![add-cluster01-maintenance.png](./clusterd-images/add-cluster01-maintenance.png)
2. 配置好后，保存即可，若是online模式会自动下载集群配置安装包并解压

#### 集群初始化
如下图，配置集群网络信息，默认情况下，直接提交保存即可，除非Service CIDR、Cluster CIDR与实际环境有冲突
![init-cluster.png](./clusterd-images/init-cluster.png)

#### 节点添加及初始化
1. 如下图，在Add nodes步骤中，点击添加节点
![add-node-init.png](./clusterd-images/add-node-init.png)
2. 填写节点的ip（该ip通常是内网ip，Maintenance需要可通过ssh访问到该ip，后续的ssh认证信息也是Maintenance访问这个ip对应节点需要的相关信息）
** 通常纳管节点数量 < 3时，需要有一个节点勾选master/etcd服务；纳管节点数量 >= 3时，需要有3个节点勾选master/etcd服务；**
3. 根据实际情况，配置该节点的显卡型号，如下图
![config-xpu-mode.png](./clusterd-images/config-xpu-mode.png)
![config-xpu-type.png](./clusterd-images/config-xpu-type.png)
4. 添加后，点击“Check”，检查添加节点是否满足部署条件（包括芯片、操作系统、存储、软件等检查）
![node-check.png](./clusterd-images/node-check.png)
![node-report.png](./clusterd-images/node-report.png)
5. 检查满足后，再点击init进行安装部署，等待任务完成即可
![node-init.png](./clusterd-images/node-init.png)

### 中间件激活
1. 如下图，节点初始化后，进入Active components环节，required标识的组件必须完成激活
![cluster-activate.png](./clusterd-images/cluster-activate.png)
2. Device Plugin激活：如下图，必须根据芯片类型进行选择
![device-plugin-activate.png](./clusterd-images/device-plugin-activate.png)
3. InfluxDB service激活：如下图，直接点击激活即可
![influx-db-activate.png](./clusterd-images/influx-db-activate.png)
4. Monitor service激活：如下图，必须根据实际情况，配置“AI Card mode”，其他选项可默认
![monitoring-activate.png](./clusterd-images/monitoring-activate.png)
5. JupyterLab Proxy激活：直接点击激活即可
![proxy-activate.png](./clusterd-images/proxy-activate.png)
6. Tool images激活：直接点击激活即可
![tool-activate.png](./clusterd-images/tool-activate.png)

所有步骤完成后，会显示，如下图，说明正确完成部署
![full-installed.png](./clusterd-images/full-installed.png)

## 镜像服务安装
### 镜像服务部署配置
1. 集群需要配置镜像服务，可以是多个集群共享，也可以是每个集群配置一个，通常看网络连接情况决定，all in one场景，通常将镜像服务安装在Maintenance节点上
![install-harbor.png](./clusterd-images/install-harbor.png)
2. 如下图，通过“Get Disk”，获取节点磁盘，规划一个空间较大的盘（通常>=500G），用来存放镜像数据
![get-av-disk.png](./clusterd-images/get-av-disk.png)
3. 随后，点击“Install Harbor”即可，完成后，点击“View Images”可以查看，目前镜像库为空库
![view-images.png](./clusterd-images/view-images.png)

### 复制镜像
镜像库完成后，可复制镜像到harbor库中（OneProHuaweiMP华为云账号的香港和贵州地域），如下图
![copy-image.png](./clusterd-images/copy-image.png)
远程的库中，保存了常用的推理框架，可复制临时用户名、密码及仓库信息
![config-registry.png](./clusterd-images/config-registry.png)
提交等待完成复制即可

### 注意事项

1. OneProHuaweiMP华为云账号下，agione-powerone组织下为可生产用镜像，其中vllm-ascend镜像用于华为NPU卡，vllm-openai、sglang用户NVIDIA GPU卡
![swr-registry.png](./clusterd-images/swr-registry.png)
2. 下图表示，如何获取OneProHuaweiMP华为云账号的相关认证信息
![swr-auth.png](./clusterd-images/swr-auth.png)
3. 下图中，红色框内容去掉"docker pull"，即为源镜像的地址信息
![swr-image-registry.png](./clusterd-images/swr-image-registry.png)
