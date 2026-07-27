# My Keys

::: info Document Information
Version: v1.0
Updated: 2026-07-13
:::

## Feature Overview

`My Keys` is used to view, filter, and maintain my keys information. It helps provider admin or provider account work with my keys records and related status from a consistent page entry.

| Item | Content |
| --- | --- |
| Applicable role | Provider Admin or Provider Account |
| Navigation path | Settings > Personal > My Keys |
| Page route | `/user/user-space/my-keys` |
| Managed objects | My Keys records and related status |
| Typical use | View, filter, and maintain my keys information |

#### Beginner Explanation

My Keys is part of the settings and access-control workspace. Treat it as a place to confirm identities, permissions, tenant rules, audit records, or rate-control status before changing configuration.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Member | A user account that belongs to an tenant or team. | Check role and status before troubleshooting access. |
| Role | A permission set assigned to members. | Use least privilege and review scope before changes. |
| Operation log | An audit record of user or platform actions. | Use it to trace risky or abnormal operations. |
| API rate control rule | A policy that limits API request patterns. | Publish and verify rules carefully. |

## Prerequisites

1. The current account can access `Personal > My Keys`.
2. The target tenant, member, customer, billing cycle, rule, or record scope has been confirmed.
3. Required upstream data is already available and the page has finished loading.
4. For high-risk changes, confirm the impact scope and rollback path before continuing.

## Page Description

| Area | Description |
| --- | --- |
| Top button | `Create Key` |
| Tabs | Model API Keys and System API AK/SK Pairs |
| Summary | Member quota, used amount, remaining amount, and allocated quota for the current cycle |
| Table columns | Key name/description, prefix, state, used/limit, created time, and operation |
| Row actions | View, Quota, Rotate, and Disable |

## Main Operations

### Manage My Keys

1. Go to `Settings > Personal > My Keys`.
2. Select `Model API Keys` or `System API AK/SK Pairs`.
3. Review Key name, prefix, state, used/limit, and creation time.

The following screenshot shows the My Keys list.

![My Keys list](./images/my-keys-list.png)

4. Click `Create Key` to open the creation form.
5. Select an expiration time and enter the Key name and description.
6. Enable a quota when needed, then set the reset cycle, cycle limit, alert threshold, and limit action.
7. Confirm the purpose and permission scope before creating the Key.

The following screenshot shows the Model API Key creation form.

![Create Key](./images/create-key.png)

8. Click `Quota` in the target Key row to view or adjust quota rules.
9. Confirm that online calls will not be disrupted before saving the quota.

The following screenshot shows the Key quota dialog.

![Key quota](./images/key-quota.png)

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
| Page access | The `Personal > My Keys` page opens and data loads normally. | Check role permissions and refresh the page. |
| Filter result | The list changes according to the selected filters. | Reset filters and search again. |
| Record detail | Details, status, amount, permission, or configuration values are visible. | Confirm the record scope and permissions. |
| Follow-up path | Related pages or dialogs can be opened from visible entries. | Return to the sidebar and enter the downstream page directly. |

## FAQ

#### Target settings entry is not visible in My Keys

The expected account, project, member, role, tenant, key, operation log, system configuration, or API rate-control entry does not appear on this page.

**How to check:**

1. Confirm the current tenant, tenant, project, role, and account permission scope.
2. Check page filters such as keyword, status, project, member, role, tenant, time range, and configuration type.
3. Verify that prerequisite objects, such as projects, members, roles, keys, or system configurations, have been created and enabled.
4. If the entry was just changed, refresh the page and compare it with operation logs or related settings pages.

#### Configuration change does not take effect in My Keys

A permission, project, role, key, notification, system setting, or rate-control change was submitted, but the page or downstream behavior still shows the old result.

**How to check:**

1. Confirm that the save operation completed and the target object status is enabled or active.
2. Check whether the change applies to the correct tenant, project, member, role, API key, or policy scope.
3. Compare downstream behavior with operation logs and related settings pages to rule out cache, permission, or synchronization delay.
4. For security-sensitive settings, verify impact scope before repeating the operation or escalating with desensitized page paths and timestamps.

#### Why are Key creation or disable buttons unavailable?

Check the current tenant, tenant, project, role permissions, object status, feature switch, and operation logs. Do not repeat save, submit, publish, rollback, disable, or delete actions until the scope and impact are confirmed.

## Next Steps

1. Recheck the affected users, tenants, projects, roles, keys, policies, or configuration objects.
2. Verify operation logs and downstream behavior after the configuration is saved or refreshed.
3. Keep only desensitized page paths, timestamps, object names, and status values when escalating.

## Notes

- Permission, Key, login, tenant, and rate-control changes can affect real users. Confirm scope before changes.
- Keep page routes, API fields, Key, AK/SK, License, and other product terms in their UI form.
- Keep credentials, private operational details, and sensitive customer data out of the manual.
