# 纳管芯片

:::: info 文档信息
版本：v1.0
更新日期：2026-07-13
::::

## 如何理解本清单

下列型号属于当前 AGIOne 加速卡纳管范围。进入清单表示该加速卡型号可以进入 On-Prem 纳管评估，**不代表**任意驱动、运行环境、镜像、推理引擎、模型、量化方式或多节点拓扑都能兼容。

交付前应冻结并验证完整组合：

**加速卡 -> 操作系统 -> 驱动与运行时 -> 容器镜像 -> 推理引擎 -> 模型 -> 部署拓扑**

## 加速卡清单

| 厂商 | 架构 / 系列 | 型号 |
| --- | --- | --- |
| NVIDIA | Hopper | H800、H200、H100、H20 |
| NVIDIA | Ampere | A100、A800、A40、A30、A10、RTX A6000、RTX A5000、RTX A4000、RTX A2000、RTX 3090、RTX 3060 |
| NVIDIA | Ada | L40、L40S、L20、L20S、L4、L2、RTX 6000、RTX 5000、RTX 4500、RTX 4000、RTX 2000、RTX 4090、RTX 4090D |
| Huawei Ascend | Ascend 910 | Ascend 910B、Ascend 910C |
| Enflame | Enflame | 106 |
| Biren | Biren | S60 |
| Hygon | BW | BW200 |

## 项目必查项

| 检查项 | 需要确认的内容 |
| --- | --- |
| 硬件盘点 | 准确型号、卡数、显存、服务器架构和设备拓扑 |
| 软件栈 | 操作系统、内核、驱动、CUDA/CANN/厂商运行时和设备插件 |
| 运行资产 | 容器运行时、镜像、推理引擎、模型权重和存储路径 |
| 模型适配 | 所需显存、精度或量化方式、并行策略、上下文长度和目标吞吐 |
| 集群就绪 | 节点状态、设备注册、调度标签、存储、镜像仓库、网络和时间同步 |
| 验收 | 部署成功、模型调用正确、监控可见、稳定性和目标性能 |

使用清单之外的加速卡时，应在承诺纳管或模型部署前完成适配评估。

::: warning 区分云平台与加速卡支持
华为昇腾加速卡纳管属于 AI Infra On-Prem 兼容性问题，不代表支持接入华为云。华为云接入当前暂不支持。
:::

## 相关文档

- [支持矩阵](./support-matrix)
- [其他限制](./limitations)
- [纳管算力节点部署需求](../../installation/deployment-requirements-for-managing-compute-nodes)
- [场景操作指南：加速卡管理](../../userguide/scenarios/on-prem-compute-onboarding/accelerator-management/)
