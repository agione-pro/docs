# Deploy a Cloud Model Service from Scratch

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Roles | Operators and Model Providers |
| Navigation Path | User Manual > AI Infra(On-Cloud) > Deploy a Cloud Model Service from Scratch |
| Page Route | N/A (documentation guide) |
| Managed Objects | The cross-role workflow from cloud access to model deployment validation |

#### Beginner Explanation

This workflow builds a complete deployment runway. The Operator prepares cloud resources, authorization, models, and runtime assets; the Model Provider selects a model and flavor, creates a deployment, and validates it in My Deployments.

#### Terminology

| Term | Description |
| --- | --- |
| Deployment Target | The cloud platform, region, and resource combination where a model service runs. |
| Primary/Backup Route | A routing relationship that uses a backup target when the primary target is unhealthy. |
| Service Status | The state used to determine whether a deployment is ready. |

#### Recommended Operation Order

Follow access, authorization, assets, policies, account access, quick deployment, and validation in order. If a check fails, return to the responsible object page instead of bypassing the dependency.

#### Beginner Checklist

| Scenario | Do First | Do Not Do Directly |
| --- | --- | --- |
| First visit | Review existing objects, states, and available actions | Change an unknown object |
| Before a change | Verify upstream dependencies, impact scope, and target object | Skip dependency and impact checks |
| After completion | Validate the current and downstream pages with Result Validation | Rely only on a success message |
| Page error | Record the redacted object, time, and page message | Submit repeatedly or record real credentials |

## Prerequisites

1. The current account has the permission required for Deploy a Cloud Model Service from Scratch.
2. Confirm the target cloud platform, region, model capability, resource flavor, and owners.
3. Assess deployment resources, call cost, authorization scope, and rollback plan.

## Page Description

This page combines Operator and Model Provider actions into one workflow. The image shows the unified checkpoint for access foundation, operational resources, and authorization.

Page screenshots:

![Pre-deployment access check](../../operator/access-workbench/access-overview/images/manual-access-overview.png)

The image shows Pre-deployment access check. Verify the target object, current state, fields, and actions.

## Main Operations

### Complete Cloud Resource Access

1. The Operator adds a cloud platform and cloud account, maintaining credentials only in secure fields.
2. Enable the target resource pool and confirm that the platform, account, and pool are visible in Access Overview.
3. Use only `<ACCESS_KEY_ID>` and `<ACCESS_KEY_SECRET>` in credential examples.

### Complete Authorization and Asset Preparation

1. Complete Tenant-Cloud Auth and Business-Region Auth.
2. Prepare the model, inference framework, runtime image, and framework version.
3. Create a policy and verify primary/backup routes and health probes.

### Create and Validate the Model Deployment

1. The Model Provider confirms an available cloud account in Access Accounts.
2. In Quick Deployment, select the model, region, and resource flavor; review recommendations and cost; then click **"Deploy"**.
3. In My Deployments, verify status, events, and service information. For failures, return to the account, authorization, asset, or policy page responsible for that stage.

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

- Do not skip the upstream dependency check: Confirm the target cloud platform, region, model capability, resource flavor, and owners.
- Confirm impact before a configuration change: Assess deployment resources, call cost, authorization scope, and rollback plan.
- A success message does not prove downstream synchronization. Use Result Validation afterward.
- Use only `<API_KEY>`, `<PERSONAL_KEY>`, `<ACCESS_KEY_ID>`, `<ACCESS_KEY_SECRET>`, `<BASE_URL>`, and `<ENDPOINT_PATH>` for credential and endpoint examples.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page is accessible | Title, navigation, and main content display correctly | Check role permission and navigation path |
| Managed objects are visible | The cross-role workflow from cloud access to model deployment validation display as expected | Clear filters and verify upstream dependencies |
| Operation result is saved | The expected state or new record appears | Review page messages, required fields, and dependencies |
| Downstream result is consistent | Associated pages show the change | Wait for synchronization, refresh, and return to the responsible object |

## FAQ

#### Target Object Is Missing in Deploy a Cloud Model Service from Scratch

**Symptom:**

The expected object is missing from the list or selector.

**Possible Causes:**

- Active query criteria filter out the target object.
- An upstream object is disabled, or the current role lacks visibility.

**Resolution:**

1. Clear filters and refresh the page.
2. Verify the prerequisite object: Confirm the target cloud platform, region, model capability, resource flavor, and owners.
3. Confirm the current role and data scope, then locate the object again.

#### Deploy a Cloud Model Service from Scratch Action Is Unavailable

**Symptom:**

An expected button, menu, or state switch is unavailable.

**Possible Causes:**

- The current account lacks the required action permission.
- Object state, references, or prerequisites block the action.

**Resolution:**

1. Verify the permission for the action and the current object state.
2. Check references and prerequisites identified by the page message.
3. Remove the blocker, refresh the page, and perform the action once.

#### Deploy a Cloud Model Service from Scratch Change Does Not Reach Downstream

**Symptom:**

The page reports success, but a downstream page still shows the old state.

**Possible Causes:**

- An associated page has stale cache or synchronization delay.
- The current and downstream pages use different roles, tenants, or data scopes.

**Resolution:**

1. Wait for synchronization and refresh both pages.
2. Confirm that both pages use the same role, tenant, and object scope.
3. If they still differ, return to the responsible object and verify the saved result.

#### Deploy a Cloud Model Service from Scratch Data Differs from Another Page

**Symptom:**

Counts or states differ from an associated page.

**Possible Causes:**

- The pages use different filters, aggregation rules, or update times.
- The change is still synchronizing, or role-based data scopes differ.

**Resolution:**

1. Align filters and aggregation rules on both pages.
2. Check update times and wait for synchronization.
3. Compare object details instead of summary counts only.

#### How to Troubleshoot a Deploy a Cloud Model Service from Scratch Failure

**Symptom:**

Submission fails or the state does not change for an extended period.

**Possible Causes:**

- Required fields, field combinations, or object state do not meet submission rules.
- An upstream dependency is invalid, the request failed, or the same action is already processing.

**Resolution:**

1. Record the redacted object, time, and complete page message.
2. Verify required fields, object state, and upstream dependencies.
3. Confirm that no identical job is processing before one retry.

## Notes

- Assess deployment resources, call cost, authorization scope, and rollback plan.
- Do not put real accounts, credentials, internal locations, or customer data in documentation, screenshots, tickets, or chat records.
- Authorization, deployment, deletion, publication, state, or billing changes require an auditable record and recovery plan.

## Next Steps

1. Users should enter My Deployments and continuously view service status, Endpoint, events, and monitoring.
2. To publish the model, go to the `On-Cloud` list under `Model Services > Studio > My Deployments`, select a publish region, and redirect to the publish model page in [My Models](../../../model-services/user/studio/my-models/).
3. Use redacted invocation examples to verify model output, latency, and error codes.
4. Operators should regularly review cloud account authorization, resource pool capacity, scheduling policies, and deployment asset versions.
5. If cost or capacity anomalies are found, cross-check On-Cloud usage, Model Services invocation records, and cloud provider bills.
