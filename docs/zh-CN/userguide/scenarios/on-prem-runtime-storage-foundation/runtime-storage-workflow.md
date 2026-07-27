---
prev: false
next: true
---

# 配置本地运行镜像与存储底座

本任务用于为一个已接入的本地集群准备运行镜像和所需存储能力。

## 适用角色

- 平台运营方、本地算力资源管理员、存储管理员

## 开始前准备

1. 确认目标地域和集群已接入且节点健康。
2. 确认集群节点可以访问镜像仓库和存储服务。
3. 准备最小权限的仓库、存储认证材料及证书策略。
4. 明确测试工作负载、镜像版本、容量和读写要求。

## 操作流程

### 1. 注册并验证镜像组件

进入[镜像组件](../../../usermanual/ai-infra-on-prem/operator/resource-pools/image-services/)，填写仓库 Endpoint、认证信息和关联地域。注册后检查组件和同步状态；只在浏览器能打开仓库不代表集群节点能够拉取镜像。

![检查镜像组件及其同步状态](../../../usermanual/ai-infra-on-prem/operator/resource-pools/image-services/images/image-services-list.png)

### 2. 同步或上传运行镜像

进入[镜像管理](../../../usermanual/ai-infra-on-prem/operator/resource-pools/images/)，同步仓库或上传镜像条目。使用包含框架、版本、硬件环境和用途的稳定标签，生产环境不要只使用 `latest`。

![在镜像管理中确认运行镜像可见](../../../usermanual/ai-infra-on-prem/operator/resource-pools/images/images/images-list.png)

### 3. 按工作负载选择存储组件

- 需要独立持久卷时，注册[块存储组件](../../../usermanual/ai-infra-on-prem/operator/resource-pools/block-storage/)。
- 多个作业需要共享目录时，注册[文件存储组件](../../../usermanual/ai-infra-on-prem/operator/resource-pools/file-storage/)。
- 需要数据集、模型包或产物对象管理时，注册[对象存储组件](../../../usermanual/ai-infra-on-prem/operator/resource-pools/object-storage/)。

填写连接信息、容量、访问策略和关联地域后，返回列表确认状态。

![注册文件存储组件并确认共享路径](../../../usermanual/ai-infra-on-prem/operator/resource-pools/file-storage/images/new-file-storage.png)

### 4. 绑定地域并运行联合验证

确认镜像和存储组件已经关联目标地域或集群。创建一个最小测试工作负载，验证镜像拉取、启动、卷挂载或对象访问；结束后检查数据保留和资源回收是否符合策略。

## 完成检查

> **用途：** 以下检查确认当前底座能支撑真实工作负载。任一项失败时，不要继续批量创建 IDE、训练或推理实例。

| 检查项 | 通过标准 |
| --- | --- |
| 镜像仓库 | 集群节点可访问，认证和同步状态正常。 |
| 运行镜像 | 测试实例能拉取明确版本的目标镜像。 |
| 存储能力 | 目标存储可创建、挂载、读写或访问，并按策略回收。 |
| 地域绑定 | 镜像和存储在正确地域、集群和租户范围可用。 |
| 运维责任 | 容量、备份、删除和凭据轮换责任人清晰。 |

## 常见失败分支

| 现象 | 优先检查 |
| --- | --- |
| 实例出现镜像拉取失败 | 完整镜像地址、标签、仓库认证、证书和节点网络 |
| 平台有镜像但用户侧不可选 | 镜像同步、地域绑定、租户权限和标签状态 |
| 卷创建或挂载失败 | CSI/存储驱动、访问模式、容量、网络和认证信息 |
| 对象或共享目录不可访问 | Endpoint、路径/Bucket、权限策略和租户隔离 |
