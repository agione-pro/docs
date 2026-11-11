---
prev: false
next: true
---

# Scenario Overview - On Cloud Resource Access

This scenario guides Platform Operators through connecting external cloud platforms, accounts, and regions to {{DOCS_PRODUCT_NAME_EN}} and authorizing them for business and tenant use.

A resource pool here is a regional cloud-resource scope available for authorization. Tenant grants define who may use a cloud platform; business grants define which regions the business may use.

## Applicable Roles

- Platform Operator


**Role handoff:** The Platform Operator completes onboarding and grants and hands over the cloud platform, regions, and approved scope. The Model Provider then checks availability in their own access-account and quick-deployment pages. Callers do not perform operator configuration, and real credentials are not included in handoff records.

## Scenario Goals

- The cloud platform, cloud account, and target regions are available.
- Business types and tenants receive the correct cloud-resource authorization.
- Authorized Model Providers can see their permitted cloud platforms and regions.

## Scenario Flow

**Main path:** Connect the cloud platform -> Validate the account and regions -> Grant business and tenant access -> Verify with the authorized Model Provider account

| Stage | Key Result |
| --- | --- |
| 1. Connect the platform | A public- or private-cloud type becomes a managed resource source |
| 2. Connect resources | Account validation passes and target regions and pools are available |
| 3. Grant access | Business types and target tenants receive the correct cloud scope |
| 4. Verify as a user | Authorized Model Providers see and use only their permitted platforms and regions |


> Availability prerequisite: use only entries opened in the current environment. If Quick Access or Runtime Images displays an unavailable-feature notice, do not continue from historical screenshots. Ask the operator to confirm dependencies before proceeding with available configuration pages.

## Before You Start

- The cloud-platform type, cloud account, and a redacted access-credential example are prepared.
- Target regions, business types, and tenant scope are defined.

## Recommended Reading Order

1. Start with Quick Access and Access Overview to understand global progress.
2. Connect the cloud platform, account, and resource pools.
3. Grant business-region access.
4. Grant tenant-cloud access and validate with an authorized Model Provider.

## Document Index

| Document | Description |
| --- | --- |
| [Quick Access and Access Overview](./quick-access-overview/) | Review onboarding order, global state, and next-step entries |
| [Cloud Platforms](./Access-CloudType/) | Add public- or private-cloud platforms |
| [Cloud Accounts](./Cloud-Accounts/) | Add a cloud account under a platform |
| [Resource Pools](./Resource-Pools/) | Enable regions and maintain display data |
| [Business-Region Authorization](./Business-Region-Auth/) | Grant access by business type, platform, and region |
| [Tenant-Cloud Authorization](./Tenant-Cloud-Auth/) | Grant access by tenant and platform |
| [Access Overview](../../../usermanual/ai-infra-on-cloud/operator/access-workbench/access-overview/) | Review the operator entry for cloud resource onboarding and status checks |

## Related Scenarios

- **[On Cloud Model Asset Publishing](../on-cloud-model-asset-publishing/)**: configures runtime images, inference frameworks, and model assets on top of the cloud platform, account, resource pool, and authorization prepared here
- **[On Cloud Model Deployment and Calling](../on-cloud-model-deployment-calling/)**: deploys and calls models after assets are published
- **[My Deployments User Manual](../../../usermanual/ai-infra-on-cloud/user/model-services/my-deployments/)**: reviews state, events, and monitoring for deployed cloud instances
- **[Platform Governance and Access Control](../platform-governance-access-control/)**: complements cloud-resource authorization with tenant- and tenant-level access control

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | The cloud platform, account, and target regions are available. |
| 2 | The business type has the intended regional access. |
| 3 | The target tenant has cloud-platform access. |
| 4 | An authorized Model Provider sees only the permitted platforms, regions, and access-account entries. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Cloud account validation fails | Platform type, account permission, network, and credential validity |
| User cannot see a region | Resource-pool state, business-region grant, and tenant-cloud grant |
| Authorization appears ineffective | Tenant, business type, role, and a fresh session |
