---
prev: false
next: true
---

# 部署与配置

本章节包含 AGIOne 产品的部署、配置和验收相关文档。

## 文档目录

先完成 [部署综述](./agione-deployment-requirements)，再按下面两条主线阅读。安装 AGIOne 和纳管算力都默认使用安装文档。

| 文档 | 说明 |
| --- | --- |
| [部署综述](./agione-deployment-requirements) | 部署形态、资源和网络规划 |

### 安装 AGIOne

| 文档 | 说明 |
| --- | --- |
| [安装 AGIOne](./clusterd-agione-best-practices) | 用网页向导完成 AGIOne 安装、预检和验收 |

命令行安装将停用。仍使用 `./agione` 的环境见下面四篇：

| 文档 | 说明 |
| --- | --- |
| [安装前预检](./agione-precheck-environment-check) | 执行 `./agione quick` 或 `./agione install` 前的环境检查 |
| [单节点安装](./agione-quick-install) | 单台主机上的命令行安装与交付交接 |
| [多节点安装](./agione-multi-node-install) | host-mode 多节点命令行安装 |
| [配置字段](./agione-install-config-reference) | `/root/agione-install.yml` 字段说明 |

### 纳管算力

| 文档 | 说明 |
| --- | --- |
| [纳管前准备](./deployment-requirements-for-managing-compute-nodes) | 加速卡、操作系统、资源和网络是否具备纳管条件 |
| [安装算力](./quick-install-with-agione-clusterd) | 用网页纳管 GPU / NPU 节点并激活组件 |
| [命令行安装](./quick-install-for-managing-compute-nodes) | 用命令行安装算力集群并完成基础验证 |

### 部署后配置

| 文档 | 说明 |
| --- | --- |
| [运营版](./post-deployment/operation-edition) | 运营版上线前的业务配置和验收检查 |
| [企业自用版](./post-deployment/enterprise-internal-edition) | 企业自用场景的初始化、配置确认和上线验收 |

### ClusterD

ClusterD 是安装时使用的网页程序，安装在控制端。控制端还没有 ClusterD 时，先看快捷安装。

| 文档 | 说明 |
| --- | --- |
| [ClusterD 是什么](./clusterd-overview) | ClusterD 的作用，以及它和 AGIOne 的关系 |
| [安装、升级与卸载](./clusterd/) | 快捷安装、完整安装、升级和卸载 |
