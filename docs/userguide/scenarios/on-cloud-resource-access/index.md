---
prev: false
next: true
---

# Scenario Overview - On Cloud Resource Access

This scenario guides Platform Operators through connecting external cloud platforms, accounts, and regions to AGIOne and authorizing them for business and tenant use.

## Applicable Roles

- Platform Operator

## Scenario Goals

- The cloud platform, cloud account, and target regions are available.
- Business types and tenants receive the correct cloud-resource authorization.
- Platform Users can see the authorized cloud platforms and regions.

## Scenario Flow

**Main path:** Connect the cloud platform -> Validate the account and regions -> Grant business and tenant access -> Verify with a user account

| Stage | Key Result |
| --- | --- |
| 1. Connect the platform | A public- or private-cloud type becomes a managed resource source |
| 2. Connect resources | Account validation passes and target regions and pools are available |
| 3. Grant access | Business types and target tenants receive the correct cloud scope |
| 4. Verify as a user | Platform Users see and use only authorized platforms and regions |

## Before You Start

- The cloud-platform type, cloud account, and a redacted access-credential example are prepared.
- Target regions, business types, and tenant scope are defined.

## Recommended Reading Order

1. Start with Quick Access and Access Overview to understand global progress.
2. Connect the cloud platform, account, and resource pools.
3. Grant business-region access.
4. Grant tenant-cloud access and validate with a regular user.

## Document Index

| Document | Description |
| --- | --- |
| [Quick Access and Access Overview](./quick-access-overview/) | Review onboarding order, global state, and next-step entries |
| [Cloud Platforms](./Access-CloudType/) | Add public- or private-cloud platforms |
| [Cloud Accounts](./Cloud-Accounts/) | Add a cloud account under a platform |
| [Resource Pools](./Resource-Pools/) | Enable regions and maintain display data |
| [Business-Region Authorization](./Business-Region-Auth/) | Grant access by business type, platform, and region |
| [Tenant-Cloud Authorization](./Tenant-Cloud-Auth/) | Grant access by tenant and platform |

## Related Scenarios

- **[On Cloud Model Asset Publishing](../on-cloud-model-asset-publishing/)**: configures runtime images, inference frameworks, and model assets on top of the cloud platform, account, resource pool, and authorization prepared here
- **[On Cloud Model Deployment and Calling](../on-cloud-model-deployment-calling/)**: deploys and calls models after assets are published
- **[My Deployments User Manual](../../../usermanual/ai-infra-on-cloud/user/model-services/my-deployments/)**: reviews state, events, and monitoring for deployed cloud instances
- **[Platform Governance and Access Control](../platform-governance-access-control/)**: complements cloud-resource authorization with tenant- and organization-level access control

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to confirm that the result is observable and reviewable before continuing. If any check fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | The cloud platform, account, and target regions are available. |
| 2 | The business type has the intended regional access. |
| 3 | The target tenant has cloud-platform access. |
| 4 | A regular user sees only the authorized platforms, regions, and access-account entries. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Cloud account validation fails | Platform type, account permission, network, and credential validity |
| User cannot see a region | Resource-pool state, business-region grant, and tenant-cloud grant |
| Authorization appears ineffective | Tenant, business type, role, and a fresh session |
