# Access Accounts

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Roles | Model Providers |
| Navigation Path | AI Infra(On-Cloud) > Access Management > Access Accounts |
| Page Route | `/infrahub/user/access/account` |
| Managed Objects | Cloud accounts and access credentials available to Model Providers |

#### Beginner Explanation

Access Accounts is the Model Provider entry for cloud accounts. After an account is added, the platform can discover authorized resources for Quick Deployment.

#### Terminology

| Term | Description |
| --- | --- |
| Access Account | A Model Provider account used to access cloud resources. |
| Access Key ID | A credential identifier. Documentation uses `<ACCESS_KEY_ID>`. |
| Access Key Secret | A sensitive credential. Documentation uses `<ACCESS_KEY_SECRET>`. |

#### Recommended Operation Order

Review existing accounts and authorization scope, add the account, wait for synchronization, and confirm platform and region availability in Quick Deployment.

#### Beginner Checklist

| Scenario | Do First | Do Not Do Directly |
| --- | --- | --- |
| First visit | Review existing objects, states, and available actions | Change an unknown object |
| Before a change | Verify upstream dependencies, impact scope, and target object | Skip dependency and impact checks |
| After completion | Validate the current and downstream pages with Result Validation | Rely only on a success message |
| Page error | Record the redacted object, time, and page message | Submit repeatedly or record real credentials |

## Prerequisites

1. The current account has the permission required for Access Accounts.
2. The Operator has completed cloud-platform, pool, and authorization configuration.
3. Before adding an account, obtain least-privilege credentials through a secure channel and confirm cost boundaries.

## Page Description

The page lists access accounts and provides Add Cloud Account. The current Operator account does not expose this user entry, so this page is partially verified from existing page evidence and the cross-role workflow.

Page screenshots:

![Access account list](./images/access-accounts-list.png)

The image shows Access account list. Verify the target object, current state, fields, and actions.

## Main Operations

### View Access Accounts

1. Open Access Accounts.
2. Locate the target record by platform or account name.
3. Verify platform, creation time, and availability.

### Add Access Account

1. Click **"Add Cloud Account"**.
2. Enter the account name and select the cloud platform.
3. Enter real values corresponding to `<ACCESS_KEY_ID>` and `<ACCESS_KEY_SECRET>` in secure fields.
4. Click **"Confirm"**, wait for synchronization, and verify resource availability in Quick Deployment.

![Add access account](./images/add-cloud-account.png)

The image shows Add access account. Verify the target object, current state, fields, and actions.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Cloud platform tabs | No | Tabs | `All` | Filters the account list by cloud platform. |
| Name | No | Input | `demo-cloud-account` | Searches records by account name. Use sanitized examples only in documentation. |
| Search | No | Button | `Search` | Queries account records with the current filters. |
| Reset | No | Button | `Reset` | Clears filters and restores the list display. |
| Add Cloud Account | Yes | Button | `Add Cloud Account` | Opens the add cloud account dialog. |
| Account Name | Yes | Text | `demo-cloud-account` | Display name of the cloud account in the platform. Avoid real customer, business, or internal environment information. |
| Select Cloud Platform | Yes | Dropdown | `Sample Cloud Platform` | Selects the cloud platform to which the account belongs. |
| Access Key ID | Yes | Text | `<ACCESS_KEY_ID>` | Cloud-side access credential identifier. Use placeholder examples only in documentation. |
| Access Key Secret | Yes | Secret text | `<ACCESS_KEY_SECRET>` | Cloud-side access secret. Real values must not be written. |
| Edit | No | Action entry | `Edit` | Modifies an existing cloud account configuration. Confirm the impact scope before editing. |
| More actions | No | Action entry | `...` | Opens more action entries provided by the page. |
| Cancel | No | Button | `Cancel` | Closes the dialog without saving the current configuration. |
| Confirm | Yes | Button | `Confirm` | Final action that submits the new cloud account configuration. Review carefully before clicking. |

## Pitfalls

- Do not skip the upstream dependency check: The Operator has completed cloud-platform, pool, and authorization configuration.
- Confirm impact before a configuration change: Before adding an account, obtain least-privilege credentials through a secure channel and confirm cost boundaries.
- A success message does not prove downstream synchronization. Use Result Validation afterward.
- Use only `<API_KEY>`, `<PERSONAL_KEY>`, `<ACCESS_KEY_ID>`, `<ACCESS_KEY_SECRET>`, `<BASE_URL>`, and `<ENDPOINT_PATH>` for credential and endpoint examples.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page is accessible | Title, navigation, and main content display correctly | Check role permission and navigation path |
| Managed objects are visible | Cloud accounts and access credentials available to Model Providers display as expected | Clear filters and verify upstream dependencies |
| Operation result is saved | The expected state or new record appears | Review page messages, required fields, and dependencies |
| Downstream result is consistent | Associated pages show the change | Wait for synchronization, refresh, and return to the responsible object |

## FAQ

#### Target Object Is Missing in Access Accounts

**Symptom:**

The expected object is missing from the list or selector.

**Possible Causes:**

- Active query criteria filter out the target object.
- An upstream object is disabled, or the current role lacks visibility.

**Resolution:**

1. Clear filters and refresh the page.
2. Verify the prerequisite object: The Operator has completed cloud-platform, pool, and authorization configuration.
3. Confirm the current role and data scope, then locate the object again.

#### Access Accounts Action Is Unavailable

**Symptom:**

An expected button, menu, or state switch is unavailable.

**Possible Causes:**

- The current account lacks the required action permission.
- Object state, references, or prerequisites block the action.

**Resolution:**

1. Verify the permission for the action and the current object state.
2. Check references and prerequisites identified by the page message.
3. Remove the blocker, refresh the page, and perform the action once.

#### Access Accounts Change Does Not Reach Downstream

**Symptom:**

The page reports success, but a downstream page still shows the old state.

**Possible Causes:**

- An associated page has stale cache or synchronization delay.
- The current and downstream pages use different roles, tenants, or data scopes.

**Resolution:**

1. Wait for synchronization and refresh both pages.
2. Confirm that both pages use the same role, tenant, and object scope.
3. If they still differ, return to the responsible object and verify the saved result.

#### Access Accounts Data Differs from Another Page

**Symptom:**

Counts or states differ from an associated page.

**Possible Causes:**

- The pages use different filters, aggregation rules, or update times.
- The change is still synchronizing, or role-based data scopes differ.

**Resolution:**

1. Align filters and aggregation rules on both pages.
2. Check update times and wait for synchronization.
3. Compare object details instead of summary counts only.

#### How to Troubleshoot a Access Accounts Failure

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

- Before adding an account, obtain least-privilege credentials through a secure channel and confirm cost boundaries.
- Do not put real accounts, credentials, internal locations, or customer data in documentation, screenshots, tickets, or chat records.
- Authorization, deployment, deletion, publication, state, or billing changes require an auditable record and recovery plan.

## Next Steps

1. Return to `Quick Deployment` to confirm whether the corresponding cloud platform and region resources are visible.
2. Go to `My Deployments` to check whether later deployment tasks can use this account.
3. Regularly check cloud account permissions, credential validity, and resource visibility.
