# Computing Resources and Scheduling

## Chips and Cluster Scale

### Q: What management and scheduling capabilities does the platform provide for Ascend chips? Which models are supported? What is the largest deployed project scale? Is there a clear adaptation roadmap?

**Answer:** AGIOne supports Huawei Ascend 910 series chips, including 910B and 910C, and is compatible with vLLM-Ascend and MindIE. Support for Ascend 950 and SuperPod is also planned.

### Q: Are there any SuperPod-related plans? What SuperPod management and scheduling capabilities are supported?

**Answer:** Yes. This requires resource coordination.

### Q: What is the maximum supported cluster size in terms of cards? How does the platform ensure stable month-level scheduling?

**Answer:** A single cluster currently supports 120 cards. This is not the technical upper limit. The platform can scale by adding nodes within a cluster or by creating and managing new clusters. AGIOne is mainly designed for inference scenarios. It provides high availability with at least three management nodes, fault self-healing, automatic model startup on new nodes when resources are available, automatic resource rollback after failures, health checks, hardware monitoring at 30-second granularity, scheduling-layer monitoring at 1-minute granularity, and end-to-end call-chain observability.

## Resource Specifications and Resource Pools

### Q: Does the platform support heterogeneous resource types such as CPU, GPU, and NPU? Can AI developers work without managing the underlying physical resources?

**Answer:** Yes. AGIOne supports unified management of heterogeneous GPU / NPU resources. Administrators can centrally configure resource specifications, including NVIDIA Hopper / Ada / Ampere and Ascend 910B / 910C. AI developers do not need to manage the underlying physical resources.

### Q: Does the platform support logical partitions? What is the minimum resource allocation unit?

**Answer:** Yes. The platform supports logical resource partitions and permission isolation. The minimum resource allocation unit is one independent card. Dynamic MIG or GPU slicing is not supported.

### Q: Does the platform provide dedicated resource pools so users can run training jobs on exclusive compute resources?

**Answer:** Yes. Dedicated resource pools can be provided for specific tenants.

## Multi-Tenant and Scheduling

### Q: Does the platform support multi-tenant resource isolation? What is the architecture? How does it protect data privacy and security and prevent unauthorized access or resource contention?

**Answer:** Yes. The platform supports multi-tenant resource isolation. Each tenant has an independent namespace, and network isolation is implemented through NetworkPolicy. User resources are logically isolated by tenant.

### Q: Does the platform provide intelligent job scheduling policies designed for AI workloads? What scheduling methods are supported? Can the platform monitor and handle abnormal or failed jobs in real time?

**Answer:** Supported policies include resource matching, such as GPU model matching and RDMA network matching, as well as affinity matching, balanced allocation, and compact allocation. The platform can monitor abnormal and failed jobs. For inference tasks, automatic recovery can be configured when resources are available.

### Q: How are GPU management and scheduling handled?

**Answer:** GPU/NPU nodes are managed by Kubernetes with the Kubernetes device plugin. Different GPU/NPU card types can be tagged and scheduled based on tags and resource quota requirements.

### Q: During self-service deployment, who manages resource governance and how?

**Answer:** Resource governance is managed by the operator, who allocates resource quotas to customers.
