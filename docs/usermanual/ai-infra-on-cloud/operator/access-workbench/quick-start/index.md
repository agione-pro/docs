# Quick Access

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Roles | Operators |
| Navigation Path | AI Infra(On-Cloud) > Access Workbench > Quick Access |
| Page Route | `/infrahub/op/workbanch/quick` |
| Managed Objects | Completion progress for cloud platforms, platform authorization, accounts, resource pools, and pool authorization |

#### Beginner Explanation

Quick Access is a five-step checklist. It does not replace configuration pages; it shows current progress and the next responsible page.

#### Terminology

| Term | Description |
| --- | --- |
| Access Status | The overall state of the access workflow. |
| Completion Progress | The number of completed steps against all steps. |
| Access Step | A workflow stage such as platform, authorization, account, or pool. |

#### Recommended Operation Order

Start with the first incomplete step, return and refresh after completion, and open Access Overview when all steps are complete.

#### Beginner Checklist

| Scenario | Do First | Do Not Do Directly |
| --- | --- | --- |
| First visit | Review existing objects, states, and available actions | Change an unknown object |
| Before a change | Verify upstream dependencies, impact scope, and target object | Skip dependency and impact checks |
| After completion | Validate the current and downstream pages with Result Validation | Rely only on a success message |
| Page error | Record the redacted object, time, and page message | Submit repeatedly or record real credentials |

## Prerequisites

1. The current account has the permission required for Quick Access.
2. The current account can access the object pages for all five steps.
3. Before completing a step, confirm the target platform, tenant, business, and resource scope.

## Page Description

The page shows overall access status, completion progress, five access steps, and the Access Overview entry.

Page screenshots:

![Quick Access page](./images/manual-quick-access.png)

The image shows Quick Access page. Verify the target object, current state, fields, and actions.

## Main Operations

### View Access Progress

1. Go to `AI Infra(On-Cloud) > Access Workbench > Quick Access`.
2. Review the overall status and completion progress.
3. Check each step from cloud platform to resource-pool authorization.

![Quick Access progress](./images/quick-start-list.png)

The image shows Quick Access progress. Verify the target object, current state, fields, and actions.

### Complete Access Steps

1. Locate the first incomplete step.
2. Open the corresponding platform, account, pool, or authorization page.
3. Return to Quick Access, refresh, and confirm completion.

### Open Access Overview

1. Confirm that all five steps are complete.
2. Click **"View Access Overview"**.
3. Continue with deployment-asset and authorization checks.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Page title | System-generated | Text | `Quick Start` | Page title displayed for Quick Access. |
| Access status | System-generated | Status | `Access Ready` | Overall status of the current access flow. |
| Completion progress | System-generated | Number | `5/5` | Number of completed access steps and total steps. |
| Next | System-generated | Text / entry | `Access Ready` | Next prompt provided by the page based on current access status. |
| Cloud | System-generated | Step status | `Done` | Completion status of the cloud platform access step. |
| Authorization | System-generated | Step status | `Done` | Completion status of the authorization step. |
| Account | System-generated | Step status | `Done` | Completion status of the access account step. |
| Pool | System-generated | Step status | `Done` | Completion status of the resource pool access step. |
| Pool Authorization | System-generated | Step status | `Done` | Completion status of the pool authorization step. |
| View Access Overview | No | Action button | `View Access Overview` | Opens Access Overview to continue checking the access foundation, operator resources, and grant status. |

## Pitfalls

- Do not skip the upstream dependency check: The current account can access the object pages for all five steps.
- Confirm impact before a configuration change: Before completing a step, confirm the target platform, tenant, business, and resource scope.
- A success message does not prove downstream synchronization. Use Result Validation afterward.
- Use only `<API_KEY>`, `<PERSONAL_KEY>`, `<ACCESS_KEY_ID>`, `<ACCESS_KEY_SECRET>`, `<BASE_URL>`, and `<ENDPOINT_PATH>` for credential and endpoint examples.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page is accessible | Title, navigation, and main content display correctly | Check role permission and navigation path |
| Managed objects are visible | Completion progress for cloud platforms, platform authorization, accounts, resource pools, and pool authorization display as expected | Clear filters and verify upstream dependencies |
| Operation result is saved | The expected state or new record appears | Review page messages, required fields, and dependencies |
| Downstream result is consistent | Associated pages show the change | Wait for synchronization, refresh, and return to the responsible object |

## FAQ

#### Target Object Is Missing in Quick Access

**Symptom:**

The expected object is missing from the list or selector.

**Possible Causes:**

- Active query criteria filter out the target object.
- An upstream object is disabled, or the current role lacks visibility.

**Resolution:**

1. Clear filters and refresh the page.
2. Verify the prerequisite object: The current account can access the object pages for all five steps.
3. Confirm the current role and data scope, then locate the object again.

#### Quick Access Action Is Unavailable

**Symptom:**

An expected button, menu, or state switch is unavailable.

**Possible Causes:**

- The current account lacks the required action permission.
- Object state, references, or prerequisites block the action.

**Resolution:**

1. Verify the permission for the action and the current object state.
2. Check references and prerequisites identified by the page message.
3. Remove the blocker, refresh the page, and perform the action once.

#### Quick Access Change Does Not Reach Downstream

**Symptom:**

The page reports success, but a downstream page still shows the old state.

**Possible Causes:**

- An associated page has stale cache or synchronization delay.
- The current and downstream pages use different roles, tenants, or data scopes.

**Resolution:**

1. Wait for synchronization and refresh both pages.
2. Confirm that both pages use the same role, tenant, and object scope.
3. If they still differ, return to the responsible object and verify the saved result.

#### Quick Access Data Differs from Another Page

**Symptom:**

Counts or states differ from an associated page.

**Possible Causes:**

- The pages use different filters, aggregation rules, or update times.
- The change is still synchronizing, or role-based data scopes differ.

**Resolution:**

1. Align filters and aggregation rules on both pages.
2. Check update times and wait for synchronization.
3. Compare object details instead of summary counts only.

#### How to Troubleshoot a Quick Access Failure

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

- Before completing a step, confirm the target platform, tenant, business, and resource scope.
- Do not put real accounts, credentials, internal locations, or customer data in documentation, screenshots, tickets, or chat records.
- Authorization, deployment, deletion, publication, state, or billing changes require an auditable record and recovery plan.

## Next Steps

1. Go to Access Overview to view the access foundation, operator resource checklist, and grant status.
2. For incomplete steps, go to the cloud platform, resource pool, account, or authorization page to complete configuration.
3. After confirming the access flow, go to Models, Frameworks, Runtime Images, or Policies to check deployment assets.
