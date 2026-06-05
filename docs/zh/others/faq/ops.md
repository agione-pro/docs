# 运维、安全与交付

## 开发工具

### 问：是否可以通过这些工具使用 GPU？

答：可以。用户可以创建开发 IDE，并选择所需的 CPU/NPU 资源规格。

## 分布式能力

### 问：分布式模型训练 / 推理

答：支持。

### 问：RAY 框架支持

答：支持。

## 监控

### 问：如何采集监控指标？

答：NPU/GPU 卡指标通过 NPU exporter 或 DCGM exporter 采集。CPU、内存和临时磁盘指标通过 Kubernetes Metrics Server 采集。

### 问：NVIDIA 有 DCGM 指标和 Nsight 等调试工具。HCS 上对应方案是什么？

答：当 GPU 节点被纳管时，会部署 DCGM exporter。

### 问：如何观察卡级指标？

答：卡级指标通过 NPU exporter 或 DCGM exporter 采集。

## AI 安全

### 问：是否有 HCS 平台专用的 AI 安全方案？

答：默认不提供。平台可以集成第三方 AI 安全解决方案。

可集成的安全能力包括：

- 模型扫描
- Guardrail
- LLM 防火墙
- 数据脱敏
- 合规
