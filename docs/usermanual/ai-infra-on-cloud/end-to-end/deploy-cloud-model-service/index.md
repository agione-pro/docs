# Deploy a Cloud Model Service from Scratch

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

This document connects operator and user On-Cloud operations into an end-to-end path: the operator first connects the cloud platform, cloud account, resource pool, authorization relationships, model assets, and scheduling policies; then the user selects a cloud account and model, initiates deployment through intelligent recommendation, and views API invocation, monitoring, and event records after deployment.

| Item | Content |
| --- | --- |
| Applicable roles | Operator, User |
| Recommended prerequisites | [Getting Started](../../getting-started/), [Quick Access](../../operator/access-workbench/quick-start/), [Quick Deployment](../../user/model-services/quick-deployment/) |
| Output | A cloud model service deployment task with visible status, API, monitoring, and events |
| Typical use | First integration for a new cloud platform, model asset onboarding validation, deployment workflow demo, pre-launch acceptance, and issue localization |

#### Beginner Explanation

Deploying a cloud model service from scratch is like arranging a cloud resource relay: the operator prepares cloud accounts, resource pools, authorization, models, and scheduling policies; the user selects resources and initiates deployment.

## End-to-End Flow

| Stage | Actor | Goal |
| --- | --- | --- |
| Cloud platform access | Operator | Create or enable an accessible cloud platform. |
| Cloud account access | Operator | Add a cloud account and ensure the platform can synchronize cloud resources. |
| Resource pool preparation | Operator | Enable regional resource pools and confirm available scope. |
| Authorization opening | Operator | Configure tenant-cloud platform authorization and business-resource pool authorization. |
| Deployment asset preparation | Operator | Maintain model libraries, inference frameworks, inference images, and deployment configurations. |
| Policy governance | Operator | Configure business policies that affect recommendation ranking. |
| Quick deployment | User | Select a cloud account, region, model, inference engine, and business policy, then initiate deployment. |
| Status validation | User | View deployment status, API invocation, monitoring information, and event records. |
| Troubleshooting closure | Both | Check accounts, authorization, resource pools, model assets, and policies based on the failure path. |

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Cloud account validation | Verifies whether cloud account keys, permissions, and resource synchronization are available. |
| Resource pool enablement | Brings resources in a cloud account into the authorizable and schedulable scope. |
| Business region authorization | Controls which regions a specific business can deploy to. |
| My Deployments | The entry where users view deployment status, Endpoint, events, and monitoring. |

## Prerequisites

1. The operator has permissions for cloud platform access, cloud accounts, resource pools, authorization, deployment assets, and policy management.
2. The user has menu permissions for access accounts, Quick Deployment, and My Deployments.
3. The target cloud platform account has cloud resource permissions required to create or manage deployments.
4. The tenant and business have obtained authorization for the target cloud platform and resource pool.
5. The target model, inference framework, inference image, and deployment configuration are ready.
6. The accounts and credentials used for this validation have been recorded in redacted form, and real AK/SK is not stored in the documentation.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Cloud Platform Type | Yes | Enum | Sample cloud platform | Used to determine the source of account access, asset synchronization, and deployment capabilities. |
| Cloud Account | Yes | Text | CLOUD-ACCOUNT-001 | Used for resource synchronization, authorization, and deployment submission. Only placeholders should be recorded in documentation. |
| Resource Pool | Yes | Text | Sample resource pool A | The actual cloud resource scope scheduled during user deployment. |
| Business Region | Yes | Enum | Sample east region | Controls visible regions and deployment entries on the user side. |
| Model Asset | Yes | Text | Sample model A | The model, framework, and image combination selected during Quick Deployment. |
| Deployment Task | System generated | Text | DEPLOY-202607130001 | Used to track status, events, and invocation information in My Deployments. |

## Pitfalls

- Passing cloud account validation does not mean users can deploy. Resource pool synchronization, tenant authorization, and business region authorization must also be completed.
- When Quick Deployment has no selectable specifications, do not only change model parameters. Check resource pool inventory and scheduling policies first.
- When a deployment stays in creating status or fails, check My Deployments events before returning to resource pools, images, or cloud accounts for troubleshooting.
- `Confirm Deployment`, `Start Deployment`, `Publish`, `Submit`, `Save`, `Delete`, deployment start/stop, and authorization adjustment are high-risk actions. Confirm the impact scope and rollback plan before performing them.
- For learning or screenshots only, view deployment recommendations, popup fields, task statuses, events, monitoring, and navigation without submitting real deployments.
- Documentation and tickets should record only redacted accounts, resource pools, deployment IDs, and error summaries. Do not write real cloud accounts, AK/SK, API Keys, tokens, Endpoints, account IDs, cost details, customer information, or internal error logs.

## Step 1: Operator Connects the Cloud Platform

1. Go to `Access Management > Access Cloud Platform`.
2. Click `Add Platform`, and fill in the cloud platform name, platform type, identifier, and description.
3. After submission, confirm that the cloud platform appears in the list and is available.
4. If you need guided operations, open [Quick Access](../../operator/access-workbench/quick-start/) first to view the overall access progress.

**Result validation:**

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target cloud platform is visible in the cloud platform list | The target cloud platform is visible in the cloud platform list. | Return to this step and check prerequisites, permissions, and configuration status. |
| Cloud platform status, name, and identifier match expectations | The cloud platform status, name, and identifier match expectations. | Return to this step and check prerequisites, permissions, and configuration status. |
| Cloud platform is selectable later | The cloud platform can be selected in subsequent cloud account and resource pool configurations. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 2: Operator Connects the Cloud Account

1. Go to `Access Management > Access Accounts`.
2. Select the target cloud platform and click `Add Cloud Account`.
3. Fill in the account name, account identifier, AK/SK, or authentication information required by the platform.
4. After submission, confirm that the account appears in the list and can be used for resource synchronization or deployment.

**Result validation:**

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target cloud account is visible in Access Accounts | The target cloud account is visible in the [Access Accounts](../../operator/access-management/cloud-accounts/) list. | Return to this step and check prerequisites, permissions, and configuration status. |
| Account status is normal | The account status is normal and the cloud platform ownership is correct. | Return to this step and check prerequisites, permissions, and configuration status. |
| Account credentials are not exposed | Account credentials are not exposed in documentation, screenshots, or tickets. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 3: Operator Enables Resource Pools

1. Go to `Access Management > Resource Pools`.
2. Select the target cloud platform and view the region card grid.
3. Enable the target regional resource pool and edit the region display name if necessary.
4. Confirm that the target resource pool can be used for subsequent authorization and deployment.

**Result validation:**

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target region is enabled in Resource Pools | The target region is enabled in [Resource Pools](../../operator/access-management/resource-pools/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Region information is accurate | The region name, cloud platform ownership, and resource pool information are accurate. | Return to this step and check prerequisites, permissions, and configuration status. |
| User deployment region is consistent | The target region used during user deployment is consistent with the resource pool configuration. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 4: Operator Configures Authorization

1. Go to `Authorization Management > Tenant-Cloud Platform Authorization` and add cloud platform authorization for the target tenant.
2. Go to `Authorization Management > Business-Resource Pool Authorization` and authorize the target resource pool region for the target business or user scope.
3. Confirm that the authorization scope covers the tenant, business, cloud platform, and resource pool used in this validation.

**Result validation:**

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Tenant-cloud authorization record exists | The target authorization record exists in [Tenant-Cloud Platform Authorization](../../operator/auth-management/tenant-cloud-auth/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Business-resource pool authorization record exists | The target resource pool authorization record exists in [Business-Resource Pool Authorization](../../operator/auth-management/business-region-auth/). | Return to this step and check prerequisites, permissions, and configuration status. |
| User can see cloud platform and region scope | After login, the user can see the corresponding cloud platform and region scope. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 5: Operator Prepares Deployment Assets

1. Go to `Deployment Assets > Models` and add or confirm the target model.
2. Configure the meta-model, onboarded version, cloud deployment point, output configuration, and compute plan in the model library.
3. Go to `Deployment Assets > Inference Frameworks` and confirm that the target inference framework is available.
4. Go to `Deployment Assets > Inference Images` and confirm that the target runtime image is available.

**Result validation:**

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target model is visible in Model Assets | The target model is visible in [Model Assets](../../operator/deploy-assets/models/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Model deployment configuration is complete | The cloud platform, region, inference framework, image, and compute plan associated with the model are complete. | Return to this step and check prerequisites, permissions, and configuration status. |
| Target model is visible on Quick Deployment | The target model can be filtered on the user's Quick Deployment page. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 6: Operator Configures Scheduling Policies

1. Go to `Scheduling Governance > Policy Management`.
2. Add or confirm the business policy used for deployment recommendation.
3. Check the policy name, applicable scope, sorting logic, and status.

**Result validation:**

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target policy is visible in Policy Management | The target policy is visible in [Policy Management](../../operator/scheduling-governance/policies/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Business policy options match | The business policy options in Quick Deployment match the policy configuration. | Return to this step and check prerequisites, permissions, and configuration status. |
| Policy keeps resources available | The policy does not exclude all available resources. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 7: User Adds or Confirms Access Accounts

1. Go to `Access Management > Access Management`.
2. Click `Add Cloud Account` or confirm that an existing cloud account is available.
3. Fill in the account name, cloud platform, authentication information, and required notes.
4. Return to the list and confirm that the account is visible.

**Result validation:**

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target account is visible in Access Accounts | The target account is visible in [Access Accounts](../../user/access-management/access-accounts/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Account cloud platform is consistent | The account cloud platform is consistent with the cloud platform authorized by the operator. | Return to this step and check prerequisites, permissions, and configuration status. |
| Account credentials are redacted | Account credentials are stored in redacted form. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 8: User Initiates Quick Deployment

1. Go to `Model Services > Quick Deployment`.
2. Select the target cloud platform, region, and model on the model library page.
3. Click `Deploy Model` for the target model.
4. On the intelligent recommendation deployment page, select deployment mode, inference engine, and business policy.
5. Confirm the model compute matching plan. Before clicking the final `Confirm Deployment`, verify model, specification, region, cost, and resource impact again.
6. In the publish deployment popup, select the cloud account and fill in task name and task description.
7. In real deployment scenarios, click `Start Deployment` to submit the deployment task. For learning or screenshots only, view popup fields without clicking the final button.

**Result validation:**

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Quick Deployment shows target resources | [Quick Deployment](../../user/model-services/quick-deployment/) can show the target cloud account, region, and model. | Return to this step and check prerequisites, permissions, and configuration status. |
| Intelligent recommendation returns a plan | The intelligent recommendation page can generate at least one deployable plan. | Return to this step and check prerequisites, permissions, and configuration status. |
| Publish deployment popup can be submitted | The publish deployment popup can be submitted after required fields are filled. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 9: User Validates Deployment Status

1. Go to `AI Infra > On-Cloud > Model Services > My Deployments`.
2. Find the Quick Deployment task just submitted in the deployment task list, and verify task status, model, region, and resource specification.
3. Open the details page and view basic information, API invocation, monitoring information, and event records.
4. Also go to the `On-Cloud` list under `Model Services > Studio > My Deployments` and confirm that the same deployment record is visible.
5. To continue publishing the model, select the target deployment in the `On-Cloud` list and select a publish region.
6. After the publish region is selected, the page redirects to the publish model page under `Model Services > Studio > My Models`. During learning or screenshot capture, do not perform the final `Publish`, `Submit`, or `Save`.

**Result validation:**

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target task is visible in AI Infra My Deployments | The target Quick Deployment task is visible in [My Deployments](../../user/model-services/my-deployments/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Task status meets expectations | The task status meets expectations. If it fails, event records are visible. | Return to this step and check prerequisites, permissions, and configuration status. |
| Invocation and monitoring information are visible | API invocation information, monitoring information, and basic information can be viewed. | Return to this step and check prerequisites, permissions, and configuration status. |
| Model Services My Deployments record is visible | The same deployment record is visible in the `On-Cloud` list under `Model Services > Studio > My Deployments`. | Check Model Services permissions, deployment filters, and task synchronization status. |
| Publish page redirect is correct | After selecting a publish region, the page redirects to the publish model page under `Model Services > Studio > My Models`. | Check the publish entry, publish region, and target deployment status. |

## Failure Branches and Troubleshooting Paths

#### Failure Branch: Cloud Account Validation Fails

Next hop: [Cloud Accounts](../../operator/access-management/cloud-accounts/)

**Issue Symptom:** The operator adds a cloud account, but validation fails or resources cannot be synchronized.

**Troubleshooting Path:**

1. Check AK/SK, authorization policies, account status, and cloud provider API permissions.
2. Confirm that keys have not expired and that least privilege covers resource query and deployment operations.
3. After validation passes, enable resource pools and configure tenant authorization.

#### Failure Branch: Resource Pool Unavailable

Next hop: [Resource Pools](../../operator/access-management/resource-pools/)

**Issue Symptom:** The user is authorized, but Quick Deployment has no available regions, specifications, or resource pools.

**Troubleshooting Path:**

1. Check whether the resource pool is enabled, capacity is synchronized, and the region is authorized.
2. Verify that tenant authorization and business region authorization both cover the current user.
3. Confirm that model deployment assets and scheduling policies are not limited to other resource pools.

#### Failure Branch: Deployment Creation Fails

Next hop: [My Deployments](../../user/model-services/my-deployments/)

**Issue Symptom:** Quick Deployment fails after submission, or My Deployments stays in creation for a long time.

**Troubleshooting Path:**

1. Check My Deployments events to distinguish insufficient resources, image failure, framework exception, or authentication error.
2. Verify that the model, inference framework, runtime image, specification, and scheduling policy match.
3. Provide the operator with a redacted deployment ID, region, model name, and error summary for review.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Resources visible | The Quick Deployment page can select the target model, region, account, and specification | Continue submitting the cloud deployment |
| Status normal | My Deployments shows running or available status and generates invocation information | Enter API access or monitoring |
| Troubleshooting entry available | Events, status, and monitoring can locate deployment errors | Continue troubleshooting by failure branch |

## FAQ

#### Why is quick deployment still unavailable after the cloud account is connected?

**Symptom:**

The user cannot see the target cloud account, resource pool, or model service specification on the quick deployment page.

**Possible Causes:**

The cloud account is abnormal, the resource pool is not enabled, tenant or business-region authorization does not include the current user, or deployment assets and scheduling policies are incomplete.

**How to Handle:**

Check cloud account and resource pool status first. Then verify tenant-cloud authorization, business-region authorization, and scheduling policies. Ask the user to refresh quick deployment and select again.

#### What if deployment is created but the service is unavailable?

**Symptom:**

A deployment record exists, but the status stays creating, abnormal, or inaccessible.

**Possible Causes:**

Runtime image, model asset, resource pool capacity, network access, or scheduling policy does not meet the requirement.

**How to Handle:**

Open My Deployments and check status and error messages. Verify runtime image, model library, resource pool capacity, and scheduling policies, then continue troubleshooting in deployment assets or resource pools.

#### What if resource, cost, or permission information does not match?

**Symptom:**

Deployment, authorization, and resource pool pages show inconsistent available scope.

**Possible Causes:**

Account, tenant, business region, cloud platform, or resource pool scope is different, or page data synchronization is delayed.

**How to Handle:**

Use the same account, tenant, business region, and resource pool scope before comparing. Keep desensitized page path, time, and resource pool name when asking platform operators for help.


## Next Steps

1. Users should enter My Deployments and continuously view service status, Endpoint, events, and monitoring.
2. To publish the model, go to the `On-Cloud` list under `Model Services > Studio > My Deployments`, select a publish region, and redirect to the publish model page in [My Models](../../../model-services/user/studio/my-models/).
3. Use redacted invocation examples to verify model output, latency, and error codes.
4. Operators should regularly review cloud account authorization, resource pool capacity, scheduling policies, and deployment asset versions.
5. If cost or capacity anomalies are found, cross-check On-Cloud usage, Model Services invocation records, and cloud provider bills.
