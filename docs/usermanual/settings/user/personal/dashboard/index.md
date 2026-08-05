# Dashboard

::: info Document Information
Version: v1.0
Updated: 2026-07-13
:::

## Feature Overview

`Dashboard` summarizes the personal workspace, including Personal Keys quota, active projects, members, API Keys, remaining quota, and common shortcuts.

| Item | Content |
| --- | --- |
| Applicable Role | Provider Account |
| Navigation path | Settings > Personal > Dashboard |
| Page route | `/user/user-space/workspace/overview` |
| Managed objects | Personal Keys quota, active projects, members, API calls, and shortcuts |
| Typical use | Review the personal workspace summary and common entry points |

#### Beginner Explanation

Dashboard is the Settings control panel. Use it to determine whether the current provider account has available quota, projects, and Keys, then open Projects, My Keys, or Quota Requests from the shortcuts.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Provider account | The account currently signed in to Settings. | Confirm that it is in the correct tenant. |
| Available quota | Quota that the current account or tenant can still consume. | Open Quota Requests when it is insufficient. |
| Shortcut | An entry to Projects, My Keys, or Quota Requests. | Select one according to the issue. |
| Project count | The number of projects visible to the current account. | Open Projects when the count is unexpected. |

## Prerequisites

1. The current account is in provider-side Settings.
2. The page language is English.
3. Before requesting quota, you have prepared the amount and reason.

## Page Description

| Area | Description |
| --- | --- |
| Top action | `Request Quota` |
| Summary cards | Active projects, members, API Keys, and remaining quota |
| Shortcuts | Projects, My Keys, and Quota Requests |
| Dialog entry | Request Quota dialog |

## Main Operations

Use the following operations to work with dashboard records and related status. Complete view-only checks before opening dialogs that may create, save, submit, activate, transfer, settle, publish, or delete data.

### View Dashboard

1. Go to `Settings > Personal > Dashboard`.
2. Use filters or tabs to locate the target record.
3. Select the target row or entry related to dashboard records and related status.
4. Click the visible `View Dashboard` entry when it is available.
5. Check the displayed details, status, and related fields before moving to the next page.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Keyword or name | No | Text | `Example name` | Used to locate a specific record. |
| Status | No | Enum | `Enabled` | Used to determine the current processing or availability state. |
| Time range or billing cycle | No | Date / Month | `2026-07` | Used to narrow statistics, logs, bills, or settlements. |
| Tenant / customer / member | No | Text | `Example tenant` | Used to identify the business ownership scope. |
| Operation | System generated | Button / link | `View Details` | Provides row-level entry points for follow-up checks. |

## Pitfalls

- Do not change roles, members, login policies, Keys, or API rate-control rules without confirming the affected users and systems.
- UI entries can differ by role and tenant scope; verify the current account context before troubleshooting.
- Never copy complete Keys, AK/SK, tokens, or secrets into documentation, tickets, or screenshots.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Request visible | The submitted request appears on Quota Requests. | Check the submission message and request filters. |
| Quota updated | Remaining or authorized quota changes according to policy after approval. | Compare the request record with Member Quotas. |
| Shortcuts | Each shortcut opens the corresponding page. | Check menu permission and target-page access. |

## FAQ

#### Request Quota is unavailable

**Symptom:**

A quota request cannot be started.

**Possible cause:**

- The current account lacks quota-request permission.
- A request is already pending.
- The tenant disabled self-service quota requests.

**Resolution:**

1. Check Quota Requests for a pending record.
2. Ask the tenant administrator to confirm the quota-request policy.
3. Complete the request reason and submit again.

#### Why are quota and shortcut data missing?

**Symptom:**

Dashboard does not show quota, project, Key, or request data.

**Possible cause:**

The account has not joined a project, member quota is not allocated, or the tenant disabled user-side shortcuts.

**Resolution:**

Check Members and Member Quotas, then confirm that the account has joined a project. Ask the tenant administrator to allocate quota or project permission when required.

#### Why are dashboard shortcuts unavailable?

**Symptom:**

Shortcuts are visible, but Request Quota, Create Key, or Projects cannot be selected.

**Possible cause:**

The member lacks the required permission, self-service requests are disabled, or the required project or Key object is not initialized.

**Resolution:**

Check member quota, project permission, and Key-management permission for the corresponding shortcut. Ask the tenant administrator to grant missing permission.

## Next Steps

1. Open My Keys to review Key usage.
2. Open Projects to manage project budgets.
3. Open Quota Requests to review request status.

## Notes

- A quota request enters an approval flow. Do not submit duplicate requests for the same reason.
- Do not include passwords, Keys, tokens, or customer-sensitive information in the request reason.
