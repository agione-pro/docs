# Members

::: info Document Information
Version: v1.0
Updated: 2026-07-10
:::

## Feature Overview

`Members` is used to view, filter, and maintain members information. It helps operator admin work with members records and related status from a consistent page entry.

| Item | Content |
| --- | --- |
| Applicable role | Operator admin |
| Navigation path | Settings > Members & Roles > Members |
| Page route | `/user/user-space/team-members` |
| Managed objects | Members records and related status |
| Typical use | View, filter, and maintain members information |

#### Beginner Explanation

Members is part of the settings and access-control workspace. Treat it as a place to confirm identities, permissions, organization rules, audit records, or rate-control status before changing configuration.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Member | A user account that belongs to an organization or team. | Check role and status before troubleshooting access. |
| Role | A permission set assigned to members. | Use least privilege and review scope before changes. |
| Operation log | An audit record of user or platform actions. | Use it to trace risky or abnormal operations. |
| API rate control rule | A policy that limits API request patterns. | Publish and verify rules carefully. |

## Prerequisites

1. The current account can access `Members & Roles > Members`.
2. The target organization, member, customer, billing cycle, rule, or record scope has been confirmed.
3. Required upstream data is already available and the page has finished loading.
4. For high-risk changes, confirm the impact scope and rollback path before continuing.

## Page Description

The page usually includes filters, summary cards, data tables, detail entries, status fields, and related operation buttons for members records and related status.

| Area | Description |
| --- | --- |
| Filters | Narrow records by keyword, status, time range, organization, customer, member, or billing cycle. |
| Summary area | Displays key balances, counts, trends, warnings, or processing progress when available. |
| List or table | Shows records, statuses, timestamps, owners, amounts, and row-level actions. |
| Details or dialog | Provides more context before follow-up operations. |

The following screenshot shows members.

![Members](./images/members-list.png)

## Main Operations

Use the following operations to work with members records and related status. Complete view-only checks before opening dialogs that may create, save, submit, activate, transfer, settle, publish, or delete data.

### Manage Members

1. Go to `Settings > Members & Roles > Members`.
2. Use filters or tabs to locate the target record.
3. Select the target row or entry related to members records and related status.
4. Click the visible `Manage Members` entry when it is available.
5. Before confirming any high-risk dialog, review the affected scope, amount, permission, or configuration and cancel if the impact is unclear.

### Add Member

1. Go to `Settings > Members & Roles > Members`.
2. Click `Add Member` in the upper-right corner of the page.
3. In the `Add Member` dialog, review the member creation fields.

![Add Member](./images/add-member.png)

4. Fill in `Username`, `Full name`, `Email`, `Password`, and `Confirm Password`.
5. Fill in `Contact number` as needed, including the country or region code and phone number.
6. Select a member role from `Role`.
7. Select `Enable` or `Disable` in `Status`.
8. Before clicking the final `Confirm`, verify the member identity, role permissions, and enabled status.
9. For learning or screenshots only, view the fields and click `Cancel` to close the dialog without submitting real member configuration.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Username | Yes | Text | `ops-user` | The username used by the operator member to sign in. |
| Full name | Yes | Text | `Example Member` | The display name of the member on the page. |
| Contact number | No | Text | `188****8888` | The member contact number, including country or region code when required. |
| Email | Yes | Text | `user@example.com` | The member email address. |
| Password | Yes | Password | `******` | The initial login password of the member. |
| Confirm Password | Yes | Password | `******` | Re-entered password used to confirm both password entries match. |
| Role | Yes | Dropdown | `Audit Admin` | Controls the member permission scope on the operator side. |
| Status | Yes | Enum | `Enable` | Determines whether the member can sign in and operate. |
| Actions | System generated | Button / link | `Edit / Reset Password / Delete` | Provides row-level entry points for member management. |

## Pitfalls

- Do not change roles, members, login policies, Keys, or API rate-control rules without confirming the affected users and systems.
- UI entries can differ by role and organization scope; verify the current account context before troubleshooting.
- Never copy complete Keys, AK/SK, tokens, or secrets into documentation, tickets, or screenshots.
- Adding a member creates a real operator-side account and may affect platform management permissions.
- `Confirm` is the final submit action. For learning or screenshots, only view fields and use `Cancel` to exit.
- Selecting the wrong role may grant excessive permissions or prevent the member from completing operator tasks.
- Do not write real phone numbers, emails, usernames, user IDs, passwords, customer names, or internal test data in documentation.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page access | The `Members & Roles > Members` page opens and data loads normally. | Check role permissions and refresh the page. |
| Filter result | The list changes according to the selected filters. | Reset filters and search again. |
| Record detail | Details, status, amount, permission, or configuration values are visible. | Confirm the record scope and permissions. |
| Follow-up path | Related pages or dialogs can be opened from visible entries. | Return to the sidebar and enter the downstream page directly. |
| Add dialog | Clicking `Add Member` opens the same-name dialog. | Check whether the current account has member creation permission. |
| Cancel exit | Clicking `Cancel` closes the dialog without submitting member configuration. | Refresh the page and confirm no test member was added. |

## FAQ

#### Target settings entry is not visible in Members

The expected account, project, member, role, organization, key, operation log, system configuration, or API rate-control entry does not appear on this page.

**How to check:**

1. Confirm the current tenant, organization, project, role, and account permission scope.
2. Check page filters such as keyword, status, project, member, role, organization, time range, and configuration type.
3. Verify that prerequisite objects, such as projects, members, roles, keys, or system configurations, have been created and enabled.
4. If the entry was just changed, refresh the page and compare it with operation logs or related settings pages.

#### Configuration change does not take effect in Members

A permission, project, role, key, notification, system setting, or rate-control change was submitted, but the page or downstream behavior still shows the old result.

**How to check:**

1. Confirm that the save operation completed and the target object status is enabled or active.
2. Check whether the change applies to the correct organization, project, member, role, API key, or policy scope.
3. Compare downstream behavior with operation logs and related settings pages to rule out cache, permission, or synchronization delay.
4. For security-sensitive settings, verify impact scope before repeating the operation or escalating with desensitized page paths and timestamps.

#### Why is the operator member list empty?

Check the current tenant, organization, project, role permissions, object status, feature switch, and operation logs. Do not repeat save, submit, publish, rollback, disable, or delete actions until the scope and impact are confirmed.

## Next Steps

1. Recheck the affected users, organizations, projects, roles, keys, policies, or configuration objects.
2. Verify operation logs and downstream behavior after the configuration is saved or refreshed.
3. Keep only desensitized page paths, timestamps, object names, and status values when escalating.

## Notes

- Permission, Key, login, organization, and rate-control changes can affect real users. Confirm scope before changes.
- Keep page routes, API fields, Key, AK/SK, License, and other product terms in their UI form.
- Keep credentials, private operational details, and sensitive customer data out of the manual.
- `Confirm` is the final submit action. Before adding a member, verify the member identity, role permissions, and enabled status.
- For learning or screenshots only, open the dialog to view fields and use `Cancel` to exit.
- Do not write real phone numbers, emails, usernames, user IDs, passwords, customer names, or internal test data in documentation.
