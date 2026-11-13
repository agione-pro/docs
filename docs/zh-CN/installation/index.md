---
prev: false
next: true
---

# 部署与配置

本章节包含 AGIOne 产品的部署、配置和验收相关文档。

## 文档目录

| 文档 | 说明 |
| --- | --- |
| [部署综述](./agione-deployment-requirements) | 部署概述及要求 |

### 命令行部署 AGIOne

| 文档 | 说明 |
| --- | --- |
| [安装前环境预检指南](./agione-precheck-environment-check) | 安装前通过预检 / doctor 检查驱动、CUDA、磁盘和端口 |
| [环境安装部署指南](./agione-quick-install) | AGIOne 离线或弱网环境安装流程与交付交接 |
| [多节点环境安装部署文档](./agione-multi-node-install) | AGIOne host-mode 多节点安装部署流程 |
| [安装配置文件字段说明](./agione-install-config-reference) | `/root/agione-install.yml` 配置字段说明 |

### 图形化部署 AGIOne

| 文档 | 说明 |
| --- | --- |
| [ClusterD 安装、升级与卸载](./clusterd/) | 全新环境安装、双架构与在线/离线部署，以及 ClusterD 升级和卸载 |
| [ClusterD 部署 AGIOne 最佳实践](./clusterd-agione-best-practices) | 预留页面，正文待补充 |

### 节点纳管

| 文档 | 说明 |
| --- | --- |
| [节点纳管-部署配置要求](./deployment-requirements-for-managing-compute-nodes) | 纳管算力节点的环境调研、资源规划和部署配置要求 |
| [节点纳管-快速安装指南](./quick-install-for-managing-compute-nodes) | 纳管算力节点的 Kubernetes 集群、组件和验证流程 |
| [节点纳管-ClusterD快速安装](./quick-install-with-agione-clusterd) | 使用 ClusterD 安装和纳管算力节点 |

### 部署后配置

| 文档 | 说明 |
| --- | --- |
| [运营版部署后配置](./post-deployment/operation-edition) | 运营版新部署上线前的业务配置、直达入口和验收检查模板 |
| [企业自用版部署后配置](./post-deployment/enterprise-internal-edition) | 企业内部自用场景的新部署初始化、配置确认和上线验收模板 |
