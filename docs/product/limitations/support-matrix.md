# Support Matrix

:::: info Document Information
Version: v1.0
Updated: 2026-07-13
Functional baseline: User Manual updated on 2026-07-10
::::

## Status Definitions

| Status | Meaning |
| --- | --- |
| **Supported** | The current user manual or installation guide documents the capability. Account permission and prerequisites still apply. |
| **Conditionally supported** | Availability depends on version, platform configuration, delivery package, infrastructure combination, or project validation. |
| **Planned** | The capability is on the roadmap but is not currently available for production delivery. |
| **Temporarily unsupported** | The current version must not be planned around this capability. |

This matrix is the product-level status entry. Release notes, the delivered package, the live environment, and project validation take precedence for a specific delivery.

## Subsystem Capability Matrix

| Subsystem | Capability | Status | Main Conditions | Manual Entry |
| --- | --- | --- | --- | --- |
| AI Infra On-Prem | Regions, availability zones, clusters, nodes, and accelerator management | Supported | Compatible infrastructure is prepared and authorized | [On-Prem Getting Started](../../usermanual/ai-infra-on-prem/getting-started/) |
| AI Infra On-Prem | Specifications, images, storage, and templates | Supported | Required backend resources and templates are configured | [On-Prem User Manual](../../usermanual/ai-infra-on-prem/) |
| AI Infra On-Prem | Development environments, training jobs, and online inference | Supported | Quota, image, storage, accelerator, and template requirements are met | [Deploy a Model Service](../../usermanual/ai-infra-on-prem/end-to-end/deploy-model-service/) |
| AI Infra On-Prem | Quotas, credits, metering, usage, and monitoring | Supported | Data visibility depends on role, tenant, and collection status | [On-Prem User Manual](../../usermanual/ai-infra-on-prem/) |
| AI Infra On-Cloud | Cloud platform, account, resource-pool, and authorization management | Supported | Only configured and validated platform types are usable | [On-Cloud Getting Started](../../usermanual/ai-infra-on-cloud/getting-started/) |
| AI Infra On-Cloud | Frameworks, models, runtime images, and scheduling policies | Supported | Assets and policies must match the target cloud platform and region | [Deploy a Cloud Model Service](../../usermanual/ai-infra-on-cloud/end-to-end/deploy-cloud-model-service/) |
| AI Infra On-Cloud | Quick deployment and deployment tracking | Supported | Account, platform, region, assets, compute plan, and authorization are available | [Quick Deployment](../../usermanual/ai-infra-on-cloud/user/model-services/quick-deployment/) |
| Model Services | Meta-models, sources, templates, tags, and currency settings | Supported | Operator permission and valid base configuration are required | [Model Services Getting Started](../../usermanual/model-services/getting-started/) |
| Model Services | Single-model and BYOK publishing | Supported | Valid endpoint or deployment information, pricing, visibility, and review requirements | [My Models](../../usermanual/model-services/user/studio/my-models/) |
| Model Services | Aggregate-model publishing and routing | Supported | Performed by a model provider using eligible member models and available strategies | [Publish and Call a Model](../../usermanual/model-services/end-to-end/publish-and-call-model/) |
| Model Services | Model and app review | Supported | Performed by an operator; publication state affects user visibility | [Publish and Call a Model](../../usermanual/model-services/end-to-end/publish-and-call-model/) |
| Model Services | Model discovery and Playground | Supported | A visible, reviewed, and usable model is required; modality depends on the model | [Model Services User Manual](../../usermanual/model-services/) |
| Model Services | Model-specific API access and call records | Supported | Valid access, endpoint, credentials, quota, and model availability are required | [Publish and Call a Model](../../usermanual/model-services/end-to-end/publish-and-call-model/) |
| Model Services | Usage, customer calls, and model revenue | Supported | Scope and freshness depend on role, metering, and synchronization | [Model Services User Manual](../../usermanual/model-services/) |
| Billing | User billing, transactions, top-up orders, monthly bills, and quota governance | Supported | Scope depends on account, organization, billing cycle, and synchronization status | [Billing User Manual](../../usermanual/billing/) |
| Billing | Customer finance, finance operations, settlement, reconciliation, and account adjustment | Supported | Operator permission, billing-cycle consistency, and source-record synchronization are required | [Billing Getting Started](../../usermanual/billing/getting-started/) |
| Billing | License quota, validity, activation status, and module authorization | Supported | License status depends on the delivered package, activation state, and configured quota | [License](../../usermanual/billing/operator/license/license/) |
| Settings | Personal Keys, profile, projects, members, roles, and organizations | Supported | Visibility depends on role, organization scope, and menu authorization | [Settings User Manual](../../usermanual/settings/) |
| Settings | Platform settings, login properties, operation logs, and audit records | Supported | Platform or security administration permission is required for high-risk changes | [Settings Getting Started](../../usermanual/settings/getting-started/) |
| Settings | API rate-control rules, observability audit, node cache, and publish center | Supported | Rule effects depend on published state, node synchronization, and current traffic scope | [API Rate Control Overview](../../usermanual/settings/operator/api-rate-control/overview/) |

## Cloud and Accelerator Status

| Item | Status | Product Position |
| --- | --- | --- |
| Cloud platform type and account management | Supported | AI Infra On-Cloud can manage configured platform types, accounts, resource pools, and authorization. The exact provider and access method require environment validation. |
| Huawei Cloud access | Temporarily unsupported | Do not use Huawei Cloud as a current On-Cloud delivery target. |
| Listed NVIDIA, Huawei Ascend, Enflame, Biren, and Hygon accelerator models | Conditionally supported | The listed models can enter On-Prem onboarding; the full software and model combination still requires validation. See [Supported Accelerators](./chips). |
| Unlisted accelerators | Conditionally supported | An adaptation assessment and PoC are required before a delivery commitment. |

## Model Capability Status

| Capability | Status | Product Position |
| --- | --- | --- |
| Text model discovery, experience, publishing, and calling | Supported | Actual results depend on the selected model, endpoint, quota, and inference resources. |
| Image, audio, and video Playground entries | Supported | A compatible and visible model must be configured for the corresponding modality. |
| Single-model, BYOK, and aggregate-model publication | Supported | Provider publishing and operator review responsibilities must be separated. |
| Call logs, analytics, usage, metering, billing, settlement, and revenue views | Supported | Data scope and synchronization depend on role, module, billing cycle, and source records. |
| RAG | Planned | Not currently available as a production delivery capability. |
| Function Calling | Planned | Not currently available as a production delivery capability. |

The matrix does not claim support for a specific API protocol, model family, context length, quantization method, or performance target unless that item is separately confirmed in the delivered version.

## Deployment Status

| Deployment Area | Status | Source and Boundary |
| --- | --- | --- |
| AGIOne application single-node quick installation | Supported | Intended for the scope described in the [Quick Installation Guide](../../installation/agione-quick-install); suitability for production must be assessed separately. |
| AGIOne application host-mode multi-node installation | Supported | Node roles, SSH, private IPs, offline assets, ports, and data safety requirements apply. See [Multi-node Installation](../../installation/agione-multi-node-install). |
| Compute-node Kubernetes onboarding | Supported | OS, CPU architecture, Kubernetes, driver, device plugin, network, and storage requirements apply. See [Compute Node Requirements](../../installation/deployment-requirements-for-managing-compute-nodes). |
| Offline delivery | Conditionally supported | Delivery bundle completeness and image, runtime, and checksum availability must be verified. |

## Required Confirmation Before Commitment

1. Confirm the deployed AGIOne version and delivery package.
2. Confirm the target role, tenant, and authorization scope.
3. Confirm cloud platform or accelerator compatibility.
4. Confirm the model, endpoint, image, driver, runtime, quota, storage, and network combination.
5. Confirm expected capacity, performance, availability, recovery, metering, and acceptance evidence.

## Related Documentation

- [Features and Capabilities](../technical/features)
- [Supported Accelerators](./chips)
- [Other Limitations](./limitations)
- [Installation Guide](../../installation/)
- [User Manual](../../usermanual/)
