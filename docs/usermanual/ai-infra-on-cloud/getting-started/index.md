# Getting Started

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## 30-Second Quick Reference

| Who I Am | Read First | Next Step |
| --- | --- | --- |
| New to On-Cloud | First understand the relationship between cloud platforms, cloud accounts, resource pools, authorization, deployment assets, and deployment tasks. | Read [Deploy a Cloud Model Service from Scratch](../end-to-end/deploy-cloud-model-service/). |
| Operator | Complete cloud platform access, cloud account access, resource pool enablement, and authorization first. | Continue maintaining the model library, inference frameworks, inference images, and scheduling policies. |
| User | Confirm your available access accounts, cloud platforms, regions, and deployable models first. | Use [Quick Deployment](../user/model-services/quick-deployment/) to initiate model deployment. To continue publishing, go to the `On-Cloud` list under `Model Services > Studio > My Deployments`. |
| Troubleshooter | First determine whether the issue is with accounts, authorization, resource pools, model assets, scheduling policies, or deployment tasks. | Check deployment details, API calls, monitoring information, and event records. |

## Feature Overview

`AI Infra On-Cloud` is AGIOne's capability for multi-cloud resource access, authorization, scheduling, and model deployment. It connects cloud platforms, cloud accounts, resource pools, business authorization, model libraries, inference frameworks, inference images, and scheduling policies into one complete workflow: operators first connect and govern multi-cloud resources, and users then quickly deploy model services based on opened cloud resources and view APIs, monitoring, and events after deployment.

| Item | Content |
| --- | --- |
| Applicable roles | Operator, User |
| Recommended entry | This document, [Multi-Cloud Scheduling Platform Overview](../), [Deploy a Cloud Model Service from Scratch](../end-to-end/deploy-cloud-model-service/) |
| Key objects | Cloud platform, cloud account, resource pool, tenant authorization, business authorization, model library, inference framework, inference image, scheduling policy, deployment task |
| Typical use | Build an On-Cloud resource understanding framework, clarify operator and user boundaries, and choose the correct reading path |

#### Beginner Explanation

AI Infra On-Cloud is like a multi-cloud resource access manual: first clarify cloud accounts, resource pools, and authorization relationships, then let users deploy model services based on authorized resources.

## Applicable Roles

1. You have confirmed whether the current account is an operator or a user.
2. Operators should prepare cloud account authorization, resource pool planning, deployment assets, and scheduling policies.
3. Users should confirm that they have access account, regional resource, and model service deployment permissions.
4. All screenshots, examples, and tickets must not expose AK/SK, API Key, Endpoint, account IDs, or internal resource IDs.

## What Are AGIOne and On-Cloud

AGIOne is an integrated platform for model services, compute resources, and operations governance. On-Cloud refers to the scenario where the platform manages public cloud or third-party cloud resources and provides cross-cloud resource selection, intelligent recommendation, deployment task management, and invocation observability for model deployment.

In On-Cloud scenarios, the platform is responsible for:

1. Recording accessible cloud platforms and resource boundaries, such as cloud providers, regions, and resource pools.
2. Maintaining deployable capabilities, such as cloud accounts, inference frameworks, inference images, model libraries, and scheduling policies.
3. Managing user-side deployment entries, such as Quick Deployment, My Deployments, API invocation, and monitoring events.
4. Controlling which cloud platforms and resource pools tenants, businesses, and users can use through authorization relationships.

## Role Relationships

| Role | Main Responsibilities | Common Sections |
| --- | --- | --- |
| Operator | Connect cloud platforms, cloud accounts, and resource pools; configure tenant and business authorization; maintain model libraries, frameworks, images, and scheduling policies. | [Quick Access](../operator/access-workbench/quick-start/), [Access Cloud Platforms](../operator/access-management/cloud-platforms/), [Model Assets](../operator/deploy-assets/models/) |
| User | Add or use authorized cloud accounts; select models from the model library; initiate deployments based on intelligent recommendations; view deployment details, APIs, monitoring, and events. | [Access Accounts](../user/access-management/access-accounts/), [Quick Deployment](../user/model-services/quick-deployment/), [My Deployments](../user/model-services/my-deployments/) |

Operators decide "which cloud resources and model assets can be deployed". Users decide "which model to deploy to which authorized cloud resource". If users cannot see a model, cloud account, or region, troubleshoot from account access, tenant authorization, business authorization, resource pool status, and deployment assets.

## Resource and Authorization Hierarchy

| Level | Description | Impact Scope |
| --- | --- | --- |
| Cloud platform | An accessible cloud provider or cloud service type. | Affects ownership of cloud accounts, resource pools, and model deployment points. |
| Cloud account | Account credentials or account entities used to access target cloud platform resources. | Affects resource synchronization, model deployment, and cost ownership. |
| Resource pool | An enabled region or resource collection under a cloud platform. | Affects deployable regions, specifications, and inventory scope for users. |
| Tenant-cloud platform authorization | Controls whether a tenant can use the target cloud platform. | Affects whether users under the tenant can see or use a cloud platform. |
| Business-resource pool authorization | Controls which resource pools a business or user scope can use. | Affects the deployable scope in Quick Deployment. |
| Deployment assets | Deployable base data such as model libraries, inference frameworks, and inference images. | Affects whether a model can be selected, recommended, and deployed. |
| Deployment task | A cloud model deployment instance submitted by a user. | Produces status, API invocation, monitoring, and event data. |

The recommended configuration order is: connect cloud platforms first, then add cloud accounts and enable resource pools, configure tenant and business authorization, maintain model libraries, frameworks, images, and policies, and finally open Quick Deployment to users.

## User-Side and Operator-Side Boundaries

| Capability | Operator | User |
| --- | --- | --- |
| Cloud platform | Add, edit, enable, and disable cloud platform types. | Select authorized cloud platforms as deployment scope. |
| Cloud account | Connect and manage operator-side cloud accounts. | Add or use personally available access accounts. |
| Resource pool | Enable or disable resource pool regions and maintain display names. | Select authorized resource pools in Quick Deployment. |
| Authorization | Configure tenant-cloud platform authorization and business-resource pool authorization. | Perceive authorization results through visible scope. |
| Deployment assets | Maintain model libraries, inference frameworks, and inference images. | Select target models from deployable models. |
| Scheduling policy | Maintain policy management and candidate ranking rules. | Select business policies in Quick Deployment and view recommendation results. |
| Deployment task | View access and resource governance results. | Initiate deployments, start or stop deployments, publish deployments, and view APIs, monitoring, and events. |

## Global Core Glossary

| Term | Description |
| --- | --- |
| Cloud platform | A cloud provider or cloud resource platform accessed by AGIOne. |
| Access account | An account configuration used to access cloud platform resources. It may contain sensitive credentials such as AK/SK. |
| Resource pool | A collection of region, compute, specification, and inventory capabilities under a cloud platform that can be used for deployment. |
| Tenant authorization | An authorization relationship that opens cloud platform capabilities to specified tenants. |
| Business authorization | An authorization relationship that opens resource pool capabilities to a specified business or user scope. |
| Model library | A collection of deployable model assets maintained by the operator. |
| Inference framework | The inference engine or service framework required to run a model, such as vLLM or SGLang. |
| Inference image | The runtime image used when deploying a model service. |
| Business policy | A policy in Quick Deployment that affects candidate resource ranking, such as cost-effective, high performance, or spot fast delivery. |
| Deployment task | One cloud model deployment record initiated by a user. |

## Prerequisites

1. You have confirmed whether the current account is an operator or a user.
2. The operator has prepared cloud account authorization, resource pool planning, and least-privilege policies.
3. The user has confirmed that they have the target cloud account, region, and deployment permissions.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role Type | Yes | Enum | User | Used to decide whether to read the operator access configuration or the user deployment workflow. |
| Cloud Account | No | Text | Sample cloud account A | Used to locate access accounts, cloud account authorization, and resource synchronization status. |
| Resource Pool | No | Text | Sample resource pool | Used to confirm deployable regions, specifications, and inventory scope. |
| Deployment Asset | No | Text | Sample model / sample image | Used to check whether the model library, inference framework, and inference image match. |

## Result Validation

- You can explain the relationship between cloud accounts, resource pools, tenant authorization, and business region authorization.
- You know that Quick Deployment depends on models, frameworks, images, authorization, and scheduling policies.
- You know that when deployment fails, you should check My Deployments events, resource pool status, and authorization scope.
- You know that after Quick Deployment submission, you can select a publish region from the `On-Cloud` list under `Model Services > Studio > My Deployments` and redirect to the publish model page in [My Models](../../model-services/user/studio/my-models/).

## Pitfalls

- Do not open only the cloud platform type to users. Cloud account validation, resource pool synchronization, and authorization configuration are all required.
- When users cannot see regions or specifications, check tenant authorization, business resource pool authorization, and resource pool enabled status first.
- Models, frameworks, images, and scheduling policies must match at the same time. Maintaining only the model library does not guarantee successful deployment.
- When deployment fails, keep only redacted deployment IDs, regions, models, specifications, and event summaries before entering operator-side troubleshooting.
- Getting-started learning is only for understanding cloud accounts, resource pools, authorization, deployment assets, scheduling policies, and deployment task relationships. It is not for performing real changes.
- Do not perform real `Quick Deployment`, `Start Deployment`, deployment start/stop, deployment publishing, `Delete`, `Disable`, `Unbind`, or authorization adjustment actions.
- Do not write real AK/SK, API Keys, tokens, Endpoints, account IDs, deployment IDs, resource pool IDs, customer information, cost details, or test parameters.

## Recommended Reading Path

#### Operators

1. Read this document to confirm role boundaries and the resource authorization hierarchy.
2. Complete [Quick Access](../operator/access-workbench/quick-start/).
3. Maintain [Access Cloud Platforms](../operator/access-management/cloud-platforms/) and [Access Accounts](../operator/access-management/cloud-accounts/).
4. Enable [Resource Pools](../operator/access-management/resource-pools/).
5. Configure [Tenant-Cloud Platform Authorization](../operator/auth-management/tenant-cloud-auth/) and [Business-Resource Pool Authorization](../operator/auth-management/business-region-auth/).
6. Maintain [Model Assets](../operator/deploy-assets/models/), [Inference Frameworks](../operator/deploy-assets/frameworks/), and [Runtime Images](../operator/deploy-assets/runtime-images/).
7. Configure [Policy Management](../operator/scheduling-governance/policies/).

#### Users

1. Read this document to confirm the cloud platforms, cloud accounts, and model scope you need.
2. Add or confirm cloud accounts in [Access Accounts](../user/access-management/access-accounts/).
3. Use [Quick Deployment](../user/model-services/quick-deployment/) to select cloud accounts, regions, and models.
4. Select an inference engine, business policy, and recommended plan to initiate deployment.
5. View task status, API invocation, monitoring information, and event records in [My Deployments](../user/model-services/my-deployments/).
6. To continue publishing the model, go to the `On-Cloud` list under `Model Services > Studio > My Deployments`, select a publish region, and redirect to the publish model page in [My Models](../../model-services/user/studio/my-models/).

## FAQ

#### Quick Deployment Cannot See the Target Cloud Account or Region

**Issue Symptom:**

After entering Quick Deployment, the target cloud account, cloud platform, or region is not in the deployable scope.

**Possible Causes:**

- The user has not added an access account, or the account status is abnormal.
- The operator has not enabled the corresponding cloud platform or resource pool.
- Tenant-cloud platform authorization or business-resource pool authorization has not been configured.
- Page filters restrict the cloud platform, region, or model scope.

**Handling:**

1. The user should first check whether [Access Accounts](../user/access-management/access-accounts/) exist and are available.
2. Ask the operator to check cloud platform, cloud account, and resource pool status.
3. Check whether tenant authorization and business authorization cover the current user or business.
4. Clear Quick Deployment filters and refresh resources.

#### Deployment Task Has No Result for a Long Time After Submission

**Issue Symptom:**

After a deployment task is submitted, it stays in creating, deploying, or unavailable API status for a long time.

**Possible Causes:**

- Target cloud resource inventory is insufficient or the specification is unavailable.
- Inference framework, image, or model deployment point configuration is incomplete.
- Cloud account permissions are insufficient or cloud platform API calls fail.
- The scheduling policy filter scope is too narrow.

**Handling:**

1. View deployment details, event records, and monitoring information in [My Deployments](../user/model-services/my-deployments/).
2. Try switching inference engine, business policy, or region and redeploy.
3. Ask the operator to check model library, inference framework, inference image, and resource pool configuration.
4. Check cloud account permissions and cloud-side resource status.

## Next Steps

1. Operators should continue reading Access Cloud Platforms, Cloud Accounts, Resource Pools, Authorization Management, and Deployment Assets.
2. Users should continue reading Access Accounts, Quick Deployment, and My Deployments. To publish a model, continue with [Model Services My Deployments](../../model-services/user/studio/my-deployments/) and [My Models](../../model-services/user/studio/my-models/).
3. For the complete workflow, continue reading [Deploy a Cloud Model Service from Scratch](../end-to-end/deploy-cloud-model-service/).

## Notes

- This document is a platform-level introduction and does not replace detailed field descriptions on each function page.
- For operations involving cloud accounts, AK/SK, API Keys, tokens, Endpoints, account IDs, deployment IDs, resource pool IDs, customer information, cost details, private keys, and certificates, use the platform's key management capability for storage. Do not write them into documentation or screenshots.
- Real Quick Deployment, Start Deployment, deployment start/stop, deployment publishing, deletion, disabling, unbinding, and authorization adjustment may affect user tasks. Confirm the impact scope and rollback plan first.
