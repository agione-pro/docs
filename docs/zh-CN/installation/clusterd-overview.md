---
prev: false
next: true
---

# 什么是 ClusterD？

ClusterD 是用于部署和管理 AGIOne 环境的图形化控制与编排工具。它通过网页提供部署参数填写、目标节点探测、存储选择、安装前预检、启动安装和任务结果查看等能力。

ClusterD 不是 AGIOne 业务平台本身，而是帮助安装人员把 AGIOne 交付到一台或多台目标节点上的控制层。

## ClusterD 的定位

| 问题 | 通俗说明 |
| --- | --- |
| 它是什么 | 一个基于网页的安装和部署控制工具 |
| 安装在哪里 | 只需安装在 ClusterD 控制端一次 |
| 管理什么 | 部署方案、目标节点连接、存储选择、预检结果、安装任务和运行状态核验 |
| 服务运行在哪里 | 运行在选定的 AGIOne 目标节点上，不运行在安装人员的浏览器中 |
| 如何访问 | 默认访问 `http://<ClusterD 主机 IP>:18093/` |
| 是否替代 AGIOne | 不是。它负责部署并辅助维护 AGIOne 环境，不替代业务平台 |

## ClusterD 与 AGIOne 的关系

两者的职责不同：

```text
安装人员浏览器
        |
        v
ClusterD 控制端
  网页、任务、预检、部署编排
        |
        | SSH / 部署连接
        v
AGIOne 目标节点
  Kubernetes、中间件和 AGIOne 服务
```

ClusterD 控制端可以与 AGIOne 目标节点使用同一台物理机或云主机。即使是同机部署，向导仍需要通过节点真实可达的地址连接目标节点，不能用安装人员浏览器地址或 `127.0.0.1` 代替。

## ClusterD 可以帮助完成什么

1. 选择单节点、主备或企业级高可用拓扑。
2. 选择在线或离线部署资源，以及目标 CPU 架构。
3. 配置 Kubernetes 网段、控制台访问方式、证书和日志存储。
4. 添加目标节点，测试 SSH 连接和磁盘适用性。
5. 选择独立空盘，或复用符合条件的已有文件系统。
6. 在执行破坏性安装前运行预检。
7. 在确认弹窗中核对实际节点和磁盘，再开始安装。
8. 查看安装任务、节点健康、服务健康、存储路径和 Web 访问地址。

## ClusterD 不会自动完成什么

- 安装 ClusterD 不等于安装 AGIOne。只有完成网页向导配置并确认安装后，才会开始部署 AGIOne。
- 主机上存在数据盘，不代表 ClusterD 程序或缓存会自动迁移到该盘；AGIOne 的存储模式必须在向导中单独选择和核验。
- ClusterD 网页能够打开，或安装器成功退出，都不能单独证明 AGIOne 所有服务健康；还要检查部署任务、节点、服务、持久化存储和访问地址。
- 升级 ClusterD 不会自动升级已经部署的 AGIOne 业务服务。
- 卸载 ClusterD 不会自动删除远端 AGIOne 环境或业务数据。

## 推荐阅读顺序

| 你的目标 | 下一步阅读 |
| --- | --- |
| 在新主机上安装 ClusterD | [ClusterD 安装、升级与卸载](./clusterd/) |
| 使用向导部署 AGIOne | [ClusterD 部署 AGIOne 最佳实践](./clusterd-agione-best-practices) |
| 准备容量和网络要求 | [部署综述](./agione-deployment-requirements) |
| 改用命令行安装 | [环境安装部署指南](./agione-quick-install) |

::: warning 先分清职责边界
ClusterD 是部署控制层，AGIOne 是被部署的环境。交付时请分别管理 ClusterD 账户、目标节点 SSH 凭据和 AGIOne 账户信息。
:::
