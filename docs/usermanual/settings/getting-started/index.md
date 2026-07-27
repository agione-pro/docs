# Settings Getting Started

::: info Document Information
Version: v1.0
Updated: 2026-07-13
:::

## 30-second Quick Check

| Who you are | Check first | Next step |
| --- | --- | --- |
| Regular user | Confirm your account, projects, Keys, quotas, and tenant scope. | Open [user-side Settings](../user/personal/dashboard/). |
| Operator admin | Confirm members, roles, tenants, and operation logs. | Open [operator-side Settings](../operator/personal/profile/). |
| Security admin | Confirm login properties, account recovery, and third-party login. | Open [Login Properties](../operator/system-settings/login-properties/). |
| Rate-control admin | Confirm request trends, matched rules, and publish status. | Open [API Rate Control Overview](../operator/api-rate-control/overview/). |

## Feature Overview

Settings Getting Started is an onboarding guide for the Settings subsystem. It helps users choose the correct entry, role, permission scope, target object, and high-risk action boundary. It is not a specific business form and does not replace the field reference for Members, Roles, Tenants, Keys, Login Properties, or API Rate Control pages.

| Item | Content |
| --- | --- |
| Audience | Regular users, operator admins, security admins, and rate-control admins |
| Goal | Understand Settings entries for accounts, members, roles, tenants, login security, operation logs, and API rate control |
| Applicable entry | Settings overview, user-side Settings, operator-side Settings, Login Properties, and API Rate Control Overview |
| Prerequisite | The current account can access Settings and the target configuration object and risk scope are clear |
| Recommended path | Start from Settings overview, then open the specific page for personal accounts, member permissions, tenant rules, login security, or API rate control |

#### Beginner Explanation

Settings is the platform control panel. Confirm who you are first, then confirm which members exist, which roles they have, and whether the task is about tenant rules, login security, or API rate control. Do not change configuration before identifying the object and risk scope.

## Applicable Roles

| Role | Start here | Next step |
| --- | --- | --- |
| Regular user | [User-side Settings](../user/personal/dashboard/) | Review profile, projects, Keys, quotas, and tenant rules. |
| Operator admin | [Operator-side Settings](../operator/personal/profile/) | Check members, roles, tenants, and logs. |
| Security admin | [Login Properties](../operator/system-settings/login-properties/) | Configure verification codes, account recovery, and third-party login. |
| Rate-control admin | [API Rate Control Overview](../operator/api-rate-control/overview/) | Review trends before configuring rules. |

## What Settings Is

Settings is the unified entry for platform accounts, permissions, tenants, security policies, and API rate control. It does not replace business feature pages. It determines whether users can sign in, which menus they can see, which objects they can operate, and how system policies take effect.

## Role Relationships

| Role | Main responsibility | Common entry |
| --- | --- | --- |
| Regular user | Manage personal details, projects, Keys, quota requests, and objects visible within the tenant. | [User-side Settings](../user/personal/dashboard/) |
| Operator admin | Manage members, roles, tenants, and operation logs. | [Members](../operator/members-roles/members/), [Roles](../operator/members-roles/roles/) |
| Security admin | Maintain login properties, account recovery, and third-party login policies. | [Login Properties](../operator/system-settings/login-properties/) |
| Rate-control admin | Review API rate-control trends, rules, audits, and publish status. | [API Rate Control Overview](../operator/api-rate-control/overview/) |

## Settings Object Hierarchy

| Layer | Description | Impact scope |
| --- | --- | --- |
| Account | Current login subject and security contact information. | Affects login, personal Keys, and personal visibility. |
| Project / Tenant | Collaboration and resource ownership scope. | Affects members, quotas, tenant settings, and data visibility. |
| Member | Account that can sign in or collaborate. | Affects team management and operation-log ownership. |
| Role | Collection of menu and operation permissions. | Affects visible menus and buttons. |
| System settings | Platform-level login, security, and base parameters. | Affects global access policies. |
| API rate control | Request statistics, blocking, rules, and publish status. | Affects API access stability and rate-limit results. |

## User-side and Operator-side Boundaries

| Capability | User side | Operator side |
| --- | --- | --- |
| Account and Keys | Manage current profile, projects, and personal Keys. | View or maintain platform-level members and roles. |
| Members and Roles | View tenant-visible members, roles, and quota requests. | Manage members, role permissions, and tenant scope. |
| Tenant Settings | View or maintain tenant-visible settings. | Manage platform tenant information and system policies. |
| Operation Logs | View operation records within the authorized scope. | Audit operations by user, method, result, and time. |
| API Rate Control | Observe API access results. | Configure rules, observability audit, node cache, and publish center. |

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Profile | Identity and security contact information for the current account. | Confirm account context before sensitive actions. |
| Key | Credential for model or system API calls. | Separate by purpose and rotate regularly. |
| Member | Account that can sign in or collaborate. | Check member status first when login fails. |
| Role | A set of menu and operation permissions. | Check role binding when menus are missing. |
| Tenant | Business subject in the platform. | Confirm tenant and administrator before actions. |
| API rate control | Capability for request statistics, blocking, and publishing. | Review observability data before changing rules. |

## Usage Prerequisites

1. The current account can access Settings.
2. The target object is clear: personal account, members and roles, tenants, logs, system settings, or API rate control.
3. Before delete, reset, authorize, publish, rollback, export, or login-policy changes, the impact scope and rollback path have been confirmed.
4. Before external communication, confirm that accounts, emails, phone numbers, Keys, AK/SK, tokens, and internal addresses are desensitized.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Entry | Yes | Navigation item | `Members & Roles > Members` | Locates the next Settings page to open. |
| Role | Yes | Enum | `Operator admin` | Determines whether to use the user side or operator side. |
| Permission scope | Yes | Role permission | `Admin` | Determines visible menus and allowed actions. |
| Target object | Conditionally required | Enum | `Role` | Locates members, roles, Keys, login properties, or rate-control configuration. |
| High-risk action | No | Button / action | `Publish` | Indicates whether approval, a change window, and rollback plan are required. |

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Correct entry | You can tell whether the task belongs to Personal, Members and Roles, Tenants, System Settings, or API Rate Control. | Return to the applicable role table and locate the entry again. |
| Clear permission | You know which pages and actions the current account can access. | Check role authorization and tenant context. |
| Clear next step | You can open the specific feature page for the issue. | Follow the recommended reading path. |
| Risk identified | Delete, reset, publish, or export actions have an impact statement. | Prepare approval, change window, and rollback plan first. |

## Pitfalls

- This getting-started page only helps choose the path. It does not replace field references or operation steps on feature pages.
- When a member cannot see a menu, do not check account status alone. Also verify tenant context, role binding, and menu permissions.
- Keys, login properties, role permissions, and API rate control can all affect access. Troubleshoot by object layer.

## Recommended Reading Path

| Goal | Start with | Next step |
| --- | --- | --- |
| Understand Settings boundaries | [Settings overview](../) | Continue with this getting-started page. |
| Manage your own account and Keys | [User-side Settings](../user/personal/dashboard/) | Open Profile, My Keys, or Projects. |
| Configure members and permissions | [Configure Accounts and Permissions](../end-to-end/configure-account-and-permissions/) | Check tenants, roles, members, Keys, and logs in order. |
| Troubleshoot login issues | [Login Properties](../operator/system-settings/login-properties/) | Check verification codes, recovery, and third-party login. |
| Troubleshoot API rate control | [API Rate Control Overview](../operator/api-rate-control/overview/) | Review rules, audit, node cache, and publish center. |

## FAQ

#### Should I start from the user side or operator side?

You are not sure which Settings area to open.

**How to check:**

1. For your own account, Keys, projects, and quotas, start from the user side.
2. For members, roles, tenants, login properties, or rate-control rules, start from the operator side.
3. If the menu is still unclear, confirm the current role and tenant scope.

#### What if a Settings menu is missing?

The left navigation does not show the target menu, or the page has no operation button.

**How to check:**

1. Confirm the current account and tenant.
2. Ask an administrator to check role authorization.
3. Re-login and refresh the menu if permissions were changed recently.

## Next Steps

- To configure the full account and permission workflow, read [Configure Accounts and Permissions](../end-to-end/configure-account-and-permissions/).
- To manage personal access credentials, open [My Keys](../user/personal/my-keys/).
- To troubleshoot member permissions, open [Members](../operator/members-roles/members/) and [Roles](../operator/members-roles/roles/).
- To troubleshoot rate control, open [API Rate Control Overview](../operator/api-rate-control/overview/).

## Notes

- This getting-started page only helps choose a path. It does not replace field references on feature pages.
- Accounts, roles, tenants, and system settings can affect one another. Keep the object scope consistent during troubleshooting.
- Login property changes, rate-control publishing, member deletion, and Key rotation are high-risk actions and require impact confirmation.
