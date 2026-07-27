# AI Infra On-Cloud

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Subsystem Positioning

AI Infra On-Cloud is designed for cloud resource access, authorization, resource pool governance, and cloud model service deployment. It connects cloud provider accounts, resource pools, business authorization, deployment assets, and scheduling policies.

#### Beginner Explanation

On-Cloud is like a multi-cloud resource scheduling hub: operators connect accounts and resources from different cloud providers to the platform, authorize them by tenant and business region, and then users quickly deploy model services based on the authorized resources.

## Core Terms

| Term | Description |
| --- | --- |
| Cloud account | An account or authorization subject used to access cloud provider resources. |
| Resource pool | A resource collection abstracted from a cloud account that can be authorized and scheduled. |
| Tenant authorization | Controls which cloud accounts, resource pools, and regions a tenant can use. |
| Business region authorization | Controls which regions or resource scopes a business scenario can deploy to. |
| Deployment assets | Model library, inference frameworks, runtime images, and deployment configurations. |
| Scheduling policy | Determines how cloud deployments select resources, fallback options, and priorities. |

## Role Entries

| Role | Recommended Entry | Typical Tasks |
| --- | --- | --- |
| Operator | [Quick Access](./operator/access-workbench/quick-start/), [Cloud Accounts](./operator/access-management/cloud-accounts/), [Authorization Management](./operator/auth-management/tenant-cloud-auth/) | Connect clouds, enable resource pools, configure authorization, and maintain deployment assets and scheduling policies. |
| User | [My Access Accounts](./user/access-management/access-accounts/), [Quick Deployment](./user/model-services/quick-deployment/), [My Deployments](./user/model-services/my-deployments/) | View available cloud resources, submit deployments, copy invocation information, and check status. |

## Where Should I Start

| Your Goal | Start Here | Next Step |
| --- | --- | --- |
| New user | [Getting Started](./getting-started/) | First understand the relationship between cloud platforms, cloud accounts, resource pools, authorization, deployment assets, and deployment tasks. |
| Operator | [Quick Access](./operator/access-workbench/quick-start/), [Cloud Accounts](./operator/access-management/cloud-accounts/), [Resource Pools](./operator/access-management/resource-pools/), [Authorization Management](./operator/auth-management/tenant-cloud-auth/) | Continue maintaining deployment assets and scheduling policies, and open the deployable resource scope. |
| User | [My Access Accounts](./user/access-management/access-accounts/), [Quick Deployment](./user/model-services/quick-deployment/), [My Deployments](./user/model-services/my-deployments/) | Confirm available resources and view deployment tasks, events, APIs, and monitoring. |
| Troubleshooter | [My Deployments](./user/model-services/my-deployments/), [Resource Pools](./operator/access-management/resource-pools/), [Authorization Management](./operator/auth-management/tenant-cloud-auth/), [Model Assets](./operator/deploy-assets/models/) | Locate failures from deployment events, resource pools, authorization, and deployment assets. |
| Full workflow | [Deploy a Cloud Model Service from Scratch](./end-to-end/deploy-cloud-model-service/) | Follow the end-to-end path to check access, authorization, deployment, publishing, and troubleshooting entries. |

## Recommended Reading Path

1. Beginners should read [Getting Started](./getting-started/) first to understand cloud accounts, resource pools, and authorization relationships.
2. Operators should configure cloud platforms, cloud accounts, resource pools, authorization, deployment assets, and scheduling policies in sequence.
3. Users should start from access accounts to confirm available resources, then initiate Quick Deployment. After submission, view the deployment record in the `On-Cloud` list under `Model Services > Studio > My Deployments` and continue publishing.
4. For the complete workflow, read [Deploy a Cloud Model Service from Scratch](./end-to-end/deploy-cloud-model-service/).

## Prerequisites

1. The operator has prepared cloud provider authorization and least-privilege policies.
2. Resource pools, tenant authorization, business region authorization, and deployment assets have been configured.
3. The user has obtained permissions for the target account, region, resource pool, and model deployment.
4. Before deployment and invocation, Endpoint, API Key, costs, and resource capacity have been confirmed.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role Type | Yes | Enum | Operator | Used to decide whether to enter the operator access workflow or the user deployment workflow first. |
| Cloud Resource Object | No | Text | Sample cloud account A | Used to locate a cloud platform, cloud account, resource pool, or access account. |
| Authorization Scope | No | Text | Sample tenant / sample business region | Used to check whether tenant authorization and business region authorization cover the target user. |
| Deployment Object | No | Text | Sample model service | Used to locate Quick Deployment, My Deployments, model library, framework, and image configurations. |
| Troubleshooting Scope | No | Time range | 2026-07-01 to 2026-07-31 | Used to check deployment events, resource synchronization, cost, and capacity issues. |

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Correct entry selected | You can distinguish the operator access workflow from the user deployment workflow. | Return to the role entry table and locate the entry again. |
| Authorization workflow clear | You understand the relationship between cloud accounts, resource pools, tenant authorization, and business region authorization. | Continue reading Getting Started for AI Infra On-Cloud. |
| Deployment path clear | Users can enter My Deployments from Quick Deployment to view status and know that they can select a publish region from the `On-Cloud` list under `Model Services > Studio > My Deployments`. | Check account permissions, resource authorization, and publish entry status. |
| Troubleshooting entry reachable | When failures occur, you know to check resource pools, authorization, deployment assets, and event records. | Continue troubleshooting with the end-to-end workflow. |

## Pitfalls

- Successful cloud account access does not mean users can deploy. Resource pool enablement, tenant authorization, and business region authorization must also be completed.
- When Quick Deployment has no available resources, do not only change model parameters. Check authorization scope, resource pool status, and inventory first.
- When My Deployments stays in creating status, check event records and resource recommendation results before deciding whether operator intervention is required.
- Quick Deployment, Start Deployment, starting or stopping deployments, publishing deployments, selecting a publish region, publishing models, Delete, Disable, Unbind, and authorization adjustment are high-risk actions. Confirm the impact scope and rollback plan before performing them.
- For learning or screenshots only, view menus, pages, fields, statuses, and navigation without submitting real deployments or configuration changes.
- Do not record real AK/SK, API Keys, tokens, Endpoints, account IDs, deployment IDs, customer information, cost details, internal addresses, or test parameters.

## FAQ

#### Why Users Cannot See Cloud Resources

**Issue Symptom:**

A user cannot see the target account, region, or resource in Quick Deployment or My Access Accounts.

**Possible Causes:**

- The cloud account has not completed validation or resource synchronization.
- Tenant authorization or business region authorization does not cover the current account.
- The resource pool is not enabled or has insufficient capacity.

**Handling:**

1. First check the authorization status in My Access Accounts.
2. Ask the operator to verify the resource pool, tenant authorization, and business region authorization.
3. If the resource pool is abnormal, wait for synchronization or switch to an available region.

#### Why Deployment Creation Fails

**Issue Symptom:**

A task fails after quick deployment submission, stays in creation for a long time, or cannot generate invocation information.

**Possible Causes:**

- Cloud account authorization has expired or the resource pool is unavailable.
- The model, framework, image, or scheduling policy does not match.
- Cost, quota, or instance capacity is insufficient.

**Handling:**

1. Check events, status, and error information in My Deployments.
2. Verify that the model, specification, region, and authorized account are consistent.
3. Provide a redacted deployment ID, time, and error summary to the operator.

## Next Steps

1. Operators should regularly check cloud account key rotation, resource synchronization, and authorization scope.
2. Users should check Endpoint, API Key, events, and monitoring after deployment. To continue publishing, go to the `On-Cloud` list under `Model Services > Studio > My Deployments`, select a publish region, and redirect to the publish model page in [My Models](../model-services/user/studio/my-models/).
3. If cost or capacity is abnormal, cross-check On-Cloud deployment records, Model Services invocation records, and the cloud provider bill.

## Notes

- This overview page helps identify cloud accounts, authorization, resource pools, and deployment entries. It does not replace detailed cloud resource configuration instructions.
- Cloud account, authorization, and resource pool scopes must stay aligned; otherwise, the deployment options and cost attribution visible to users may differ.
- For cloud account credentials, role authorization, resource pool changes, deployment deletion, disabling, unbinding, deployment start/stop, or authorization adjustment, confirm the affected tenant, region, and business scope first.
- Do not expose real AK/SK, API Keys, tokens, Endpoints, account IDs, deployment IDs, customer information, cost details, internal addresses, or test parameters in screenshots, tickets, or troubleshooting records.
