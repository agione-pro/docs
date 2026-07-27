# Settings

::: info Document Information
Version: v1.0
Updated: 2026-07-10
:::

## Subsystem Positioning

`Settings` is used to manage platform accounts, members, roles, tenants, operation logs, login policies, platform settings, and API rate-control capabilities. Operator admins use it to maintain access subjects, permission boundaries, login security policies, and global system parameters. Regular users use it, within their permission scope, to maintain personal details, Keys, projects, member collaboration, and tenant settings.

| Item | Content |
| --- | --- |
| Applicable role | Operator admin, system admin, security admin, and regular user |
| Navigation path | Settings |
| Page route | /settings |
| Managed objects | Personal Keys, profile information, members, roles, tenants, operation logs, system settings, and API rate control |
| Typical use | Manage members and roles, review operation logs, configure login security, maintain platform settings, and manage API rate-control rules |

#### Beginner Explanation

Settings is the platform control area for accounts, members, roles, tenants, login security, operation logs, and API rate control. Start by deciding whether the task is about personal access, member permissions, tenant information, system policies, or API rate control.

## Core Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Settings subsystem | Unified entry for platform configuration, permissions, and security policies. | Locate the entry by role and target object first. |
| Operator admin | Role that maintains platform-level members, tenants, system settings, and rate-control policies. | Confirm impact scope before high-risk changes. |
| User-side settings | Entry for regular users to maintain personal accounts, projects, Keys, quota requests, and tenant settings. | Operate only within the current account or visible tenant scope. |
| API rate control | Capability for API request statistics, blocking, rules, node cache, and publishing. | Review observability, node cache, and publish status before changing rules. |

## Role Entry Points

| Role | Recommended entry | Typical task |
| --- | --- | --- |
| Operator admin | [Members](./operator/members-roles/members/), [Roles](./operator/members-roles/roles/) | Manage members, roles, tenants, and system settings. |
| System admin | [Platform Settings](./operator/system-settings/platform-settings/), [Login Properties](./operator/system-settings/login-properties/) | Maintain platform parameters, login security, and global policies. |
| Security admin | [Operation Logs](./operator/activity-notifications/operation-logs/), [API Rate Control Overview](./operator/api-rate-control/overview/) | Review audit logs, rate-control rules, and publish status. |
| Regular user | [My Keys](./user/personal/my-keys/), [Members](./user/members-roles/team-members/) | Manage personal credentials, projects, members, roles, and quota requests. |

The visible Settings menus are organized as follows:

| Primary menu | Secondary menu | Third-level menu |
| --- | --- | --- |
| Personal | My Keys, Profile | - |
| Members & Roles | Members, Roles, Member Quotas, Quota Requests | - |
| Tenants | Tenants, Tenant Settings | - |
| Activity & Notifications | Operation Logs | - |
| System Settings | Platform Settings, Login Properties | - |
| API Rate Control | Overview, Rule Management, Observability Audit, Node Cache, Publish Center | - |

## Where to Start

| Goal | Start here | Next step |
| --- | --- | --- |
| Manage personal credentials or profile information | Personal | Review My Keys, Profile, and Projects. |
| Manage member permissions | Members & Roles | Start from Members, then review Roles, Member Quotas, and Quota Requests. |
| Manage tenant configuration | Tenants | Review tenant details, tenant administrator, and Tenant Settings. |
| Troubleshoot configuration changes | Activity & Notifications | Filter operation logs by time, user, object, and result. |
| Maintain system policies or rate control | System Settings / API Rate Control | Review Platform Settings or Login Properties, then open API Rate Control pages as needed. |

When entering Settings, select the target group from the left menu first, then review filters, table columns, and top-level operation buttons. For delete, publish, rollback, reset, export, or similar high-risk entries, continue only after confirming the impact scope and rollback path.

## Recommended Reading Path

1. First-time Settings users should read this page to understand roles, objects, and high-risk operation boundaries.
2. For personal access credentials, open [My Keys](./operator/personal/my-keys/) or [user-side My Keys](./user/personal/my-keys/).
3. For members and permissions, open Members, Roles, Member Quotas, and Quota Requests.
4. For tenant, audit, or system policies, open Tenants, Tenant Settings, Operation Logs, Platform Settings, Login Properties, or API Rate Control pages.
5. For a complete account and permission workflow, read [Configure Accounts and Permissions](./end-to-end/configure-account-and-permissions/).

## Usage Prerequisites

1. The current account can access `Settings`.
2. The target object has been confirmed, such as a member, role, tenant, login policy, or API rate-control rule.
3. Before enabling, disabling, authorizing, resetting, deleting, publishing, rolling back, or editing configuration, the impact scope and rollback path have been confirmed.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Menu group | No | Navigation item | `Members & Roles` | Used to select Personal, Members, Tenants, logs, System Settings, or API Rate Control pages. |
| Target object | Yes | Text | `Member` | Object to view or maintain in the current task. |
| Permission scope | Yes | Role permission | `Admin` | Determines which menus and actions the current account can see and use. |
| High-risk action | No | Button | `Delete` / `Publish` | Actions that change accounts, permissions, system policies, or rate-control rules. |

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Menu visibility | The left menu displays Settings pages by group. | Check the current account permission and tenant scope. |
| Page loading | Page title, filters, tables, or configuration cards are displayed normally. | Refresh the page and re-enter the target menu. |
| Operation entry | Top buttons, row actions, or detail entries are visible. | Confirm whether the role should have the entry. |

## Pitfalls

- Do not judge whether a configuration is correct from the entry page alone. Open the specific feature page and check fields and status.
- Members, roles, tenants, and system settings can affect one another. Keep the object scope consistent during troubleshooting.
- Delete, publish, rollback, reset, and export actions require impact scope, approval basis, and rollback confirmation.

## FAQ

#### Target settings entry is not visible

The target menu is not shown after opening Settings.

**How to check:**

1. Confirm the current account role and tenant scope.
2. Ask an administrator to verify menu permissions and role scope.
3. Re-login or refresh the page after permission changes.

#### What should be prepared before configuration changes?

The page provides edit, delete, publish, rollback, authorize, or reset buttons.

**How to check:**

1. Confirm affected users, tenants, APIs, or system policies.
2. Confirm the change window, approval basis, and rollback path.
3. Keep only desensitized object names, timestamps, and page paths in tickets.

#### Why are the Settings entry or module cards not visible?

The Settings entry, operator-side pages, user-side pages, or API Rate Control pages are not visible.

**How to check:**

1. Confirm the current login identity and tenant scope.
2. Ask an administrator to check menu permissions, role scope, and module switches.
3. Compare with operation logs if permissions were changed recently.

## Next Steps

1. To manage personal access credentials, read [My Keys](./operator/personal/my-keys/).
2. To manage members and roles, read [Members](./operator/members-roles/members/) and [Roles](./operator/members-roles/roles/).
3. To manage platform security and rate control, read [Login Properties](./operator/system-settings/login-properties/) and [API Rate Control Overview](./operator/api-rate-control/overview/).

## Notes

- Do not expose passwords, tokens, AK/SK, private keys, complete Keys, phone numbers, emails, or internal IP addresses in documents, screenshots, or tickets.
- Delete, authorize, reset, enable, disable, publish, rollback, clean, and export actions require impact confirmation.
- Settings can affect platform-wide users. Perform important changes during a planned low-traffic window when possible.
