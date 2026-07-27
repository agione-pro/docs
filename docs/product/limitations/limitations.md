# Other Limitations

:::: info Document Information
Version: v1.0
Updated: 2026-07-13
::::

## Purpose

The [Support Matrix](./support-matrix) answers whether a product area is supported, conditional, planned, or temporarily unsupported. This page explains the practical conditions that can still block a supported workflow.

## “Supported” Does Not Mean “Ready Without Prerequisites”

| Area | Common Limitation | Required Action |
| --- | --- | --- |
| Account and access | The correct menu may be hidden by role, tenant, or authorization scope | Confirm role ownership and resource authorization before troubleshooting the function |
| Cloud resources | A platform type can exist while credentials, APIs, regions, accounts, or resource pools are unavailable | Validate the exact cloud access method, account permission, network, and resource inventory |
| Accelerators | A listed accelerator may still be incompatible with a driver, runtime, image, inference engine, or model | Validate the complete accelerator-software-model combination |
| Models | A model entry or endpoint does not guarantee the required modality, context, usage fields, availability, or performance | Test the exact model, endpoint, request, response, quota, and target load |
| Deployment | Installation method support does not guarantee that the current hosts, ports, storage, and offline assets are ready | Run the documented precheck and resolve every blocking item |
| Operations data | Monitoring, calls, usage, metering, and revenue may have different scopes or synchronization delays | Confirm role scope, time range, collection status, and source records |
| Billing and License | Balance, settlement, reconciliation, revenue, and License status may use different cycles, organizations, accounts, or synchronization states | Confirm billing cycle, organization, customer, account, License scope, and source records before making financial conclusions |
| Settings and rate control | Member, role, login, Key, audit, platform setting, or API rate-control changes can affect real users and traffic | Confirm role scope, organization scope, approval basis, publish state, and rollback method before changing settings |

## Access and Workflow Limitations

- Menus and data vary by role, tenant, and authorization scope.
- Operators must prepare resources and base settings before providers or end users can complete downstream tasks.
- A model provider publishes single or aggregate models; an end user consumes authorized models and does not create aggregate models.
- Review state, visibility, quota, credits, and resource state can block publication, deployment, or calling even when the page itself is accessible.
- Credential, deployment, publishing, review, top-up, and paid-call operations require an approved scope and appropriate security handling.
- Billing and License pages require consistent billing cycles, organizations, customers, and accounts. Do not compare balances, settlements, revenue, or License quotas across different scopes without reconciliation.
- Settings, login policies, Keys, roles, audit records, and API rate-control rules can affect active users or traffic. Treat edits, deletes, publishes, resets, and exports as high-risk operations.

## Cloud Limitations

- Huawei Cloud access is temporarily unsupported.
- Cloud platform management does not guarantee support for every provider API, region, service type, instance specification, or account policy.
- Cloud account permissions, network routes, API availability, credentials, region inventory, resource pools, and authorization must be verified together.
- Disabling or changing a cloud platform can affect referenced accounts, resource pools, deployment assets, and user deployments.

## Accelerator and Model Limitations

- Accelerator onboarding and model compatibility are separate validations.
- Mixed CPU architectures, mixed accelerator types, or unvalidated driver stacks can affect scheduling and runtime stability.
- Device memory, card count, parallelism, quantization, context length, storage bandwidth, and network topology determine whether a model fits and performs as expected.
- Multimodal model behavior depends on the exact model, preprocessing, endpoint, request format, and runtime assets.
- Aggregate models require eligible member models and a routing strategy available in the deployed version; member-model differences must be considered during acceptance.
- RAG and Function Calling are planned and are not current production capabilities.

## Installation and Infrastructure Limitations

- Single-node installation is not equivalent to a high-availability production architecture.
- Multi-node and compute-node installations require the node count, roles, private IPs, SSH access, time synchronization, ports, storage, and runtime prerequisites stated in the installation guide.
- Existing Docker, Kubernetes, runtime data, or occupied ports can block installation. Do not remove existing environments without authorization and a rollback plan.
- Offline delivery depends on complete bundles, images, runtime packages, manifests, and checksums.
- Network ports and directions must follow [Network Planning](../technical/network) and the installation guide; opening a port to an unrestricted source is not a substitute for network design.
- Capacity, high availability, backup, restore, recovery objectives, and performance targets require project-specific design and testing.

## Pre-delivery Checklist

- [ ] The target function is **Supported** or explicitly accepted as **Conditionally supported** in the [Support Matrix](./support-matrix).
- [ ] The target role, tenant, menu, and resource authorization are confirmed.
- [ ] The target cloud platform or accelerator combination has been validated.
- [ ] The exact model, endpoint, image, driver, runtime, storage, and network combination has been tested.
- [ ] Quota, credits, pricing, metering, and data visibility have been confirmed.
- [ ] Billing cycle, customer/organization scope, settlement source records, License status, and settings/rate-control impact have been confirmed when the workflow involves Billing or Settings.
- [ ] Installation prechecks and required network tests pass.
- [ ] Capacity, stability, failure handling, backup, and recovery acceptance criteria are recorded.
- [ ] Unsupported and planned capabilities are excluded from the delivery commitment.

## Related Documentation

- [Support Matrix](./support-matrix)
- [Supported Accelerators](./chips)
- [Network Planning](../technical/network)
- [Installation Guide](../../installation/)
- [Quick Requirement Survey](../investigation/quick-requirement-investigation)
- [Quick Environment Survey](../investigation/quick-env-investigation)
