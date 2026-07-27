# Technical Highlights

:::: info Document Information
Version: v1.0
Updated: 2026-07-13
::::

## Core Highlights

### 1) Unified Management of Heterogeneous Platforms and Compute

- **Multi-platform compute management**: Manages configured and validated cloud resources together with listed local accelerators from NVIDIA, Huawei Ascend, Enflame, Biren, Hygon, and others. Huawei Cloud access is currently temporarily unsupported.
- **Resource-aware scheduling**: Selects available compute based on regions, resource pools, specifications, templates, quotas, and authorization. Actual scheduling depends on the deployed version and underlying resources.
- **Unified operations entry points**: Cluster, node, device, job, and monitoring pages expose the state of authorized resources.

### 2) Unified Management of Heterogeneous Models

- **Multi-source model management**: Supports documented publication paths for single models, BYOK endpoints, and aggregate models. Exact sources and fields depend on the model page and deployed version.
- **Aggregate-model routing**: Model providers can create aggregate models from eligible member models and select routing strategies available in the current version.
- **Publishing and review workflow**: Model providers maintain models and submit reviews; operators process model and app reviews; end users consume authorized models.
- **Model calling entry points**: Users can start from Model Marketplace, Playground, and the call example shown for a model. Protocol and model capability support must be confirmed by version.

### 3) Enterprise-grade Security and Isolation

- Tenants, roles, and resource authorization scopes separate visible menus, operations, and data.
- Review records, call logs, usage, and metering pages provide evidence for governance and troubleshooting.
- Private and intranet deployment paths are available; data boundaries still depend on the actual network, storage, endpoint, and operations design.

### 4) Observability and Operability

- Deployment status, monitoring, call logs, and call analytics pages expose runtime information.
- Role scope, time range, resource state, and source logs can be combined to investigate deployment or call issues.

### 5) A Delivery System Built for Production Adoption

- Requirement surveys, environment surveys, installation prechecks, scenario guides, and user manuals provide delivery entry points.
- PoC-to-production delivery can confirm resources, permissions, compatibility, capacity, and acceptance results in stages.
- Reuse of existing enterprise infrastructure requires validation against the installation requirements and project environment.

## Differentiated Value

| Dimension | AGIOne | Typical DIY Stack |
|------|--------|-------------|
| Delivery efficiency | Standard path across surveys, installation, scenarios, and manuals | Multi-component workflows and documentation must be organized independently |
| Operational complexity | Resource, model, billing, settings, and operations entry points across five product modules | Multiple systems and ownership boundaries are maintained separately |
| Access governance | Tenants, roles, and authorization scopes control visible content | A permission system must be designed and integrated separately |
| Compute management | Manages validated cloud resources and heterogeneous accelerators | Resources are commonly managed in separate systems |
| Model aggregation | Providers can configure aggregate models and available routing strategies | Endpoints and routing logic are maintained model by model |

> Current status: Huawei Cloud access is temporarily unsupported; RAG and Function Calling are planned. Review the [Support Matrix](../limitations/support-matrix) for other boundaries and the [User Manual](../../usermanual/) for operations.
