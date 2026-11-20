# Settings Overview

::: info Document Information
Version: v2.1
Updated: 2026-11-12
:::

Settings covers accounts, members and roles, tenants, notifications, system configuration, and API rate control. Operators and users see different menus and page scopes. Confirm the current role before opening a page.

## Applicable Roles

| Role | Visible scope |
| --- | --- |
| Operator | Personal, Members & Roles, Tenants, Activity & Notifications, System Settings, API Rate Control |
| Provider & User | Personal, Members & Roles, Tenants, Activity & Notifications |

## Operator Pages

| Group | Pages |
| --- | --- |
| Personal | [My Keys](./operator/personal/my-keys/), [Profile](./operator/personal/profile/) |
| Members & Roles | [Members](./operator/members-roles/members/), [Roles](./operator/members-roles/roles/) |
| Tenants | [Tenants](./operator/tenants/tenants/), [Tenant Settings](./operator/tenants/tenant-settings/) |
| Activity & Notifications | [Operation Logs](./operator/activity-notifications/operation-logs/), [Notification Preferences](./operator/activity-notifications/notification-settings/), [Contacts](./operator/activity-notifications/contacts/), [My Notifications](./operator/activity-notifications/inbox/) |
| System Settings | [Platform Settings](./operator/system-settings/platform-settings/), [Login Properties](./operator/system-settings/login-properties/), [Notification Audit](./operator/system-settings/notification-center/), [Notification Governance](./operator/system-settings/notification-config/) |
| API Rate Control | [Overview](./operator/api-rate-control/overview/), [Rule Management](./operator/api-rate-control/rule-management/), [Observability Audit](./operator/api-rate-control/observability-audit/), [Node Cache](./operator/api-rate-control/node-cache/), [Publish Center](./operator/api-rate-control/publish-center/) |

## User Pages

| Group | Pages |
| --- | --- |
| Personal | [Dashboard](./user/personal/dashboard/), [My Quota](./user/personal/my-quota/), [Projects](./user/personal/projects/), [My Keys](./user/personal/my-keys/), [Profile](./user/personal/profile/) |
| Members & Roles | [Members](./user/members-roles/team-members/), [Roles](./user/members-roles/roles/), [Member Quotas](./user/members-roles/member-quotas/), [Quota Approvals](./user/members-roles/quota-requests/) |
| Tenants | [Usage Log](./user/organizations/usage-log/), [Tenant Settings](./user/organizations/org-settings/) |
| Activity & Notifications | [Operation Logs](./user/activity-notifications/operation-logs/) |

## Common Tasks

| Goal | Suggested entry |
| --- | --- |
| Change profile or password | [Profile](./user/personal/profile/) |
| Create or manage credentials | [My Keys](./user/personal/my-keys/) |
| View quota or request more | [My Quota](./user/personal/my-quota/) |
| Manage members and roles | [Members](./user/members-roles/team-members/), [Roles](./user/members-roles/roles/) |
| View or configure notifications | [Notification Preferences](./operator/activity-notifications/notification-settings/), [Notification Governance](./operator/system-settings/notification-config/) |
| Troubleshoot activity | [Operation Logs](./operator/activity-notifications/operation-logs/), [Notification Audit](./operator/system-settings/notification-center/) |
| Configure API rate control | [Rule Management](./operator/api-rate-control/rule-management/), [Publish Center](./operator/api-rate-control/publish-center/) |

## Naming Notes

Sidebars and navigation paths use the menu label; page H1 titles use the current page title. If they differ, note both in the page description.

| Menu label | Page title |
| --- | --- |
| Platform Settings | Platform Settings |
| Overview | Global API Rate Control |

The Quota Approvals page may be opened from the **Request Quota** shortcut. The shortcut is an action name; the left menu and page title use Quota Approvals.

## Terminology and Display Conventions

| Case | Convention |
| --- | --- |
| English UI terms | Keep `Overview`, `Model API Keys`, `System API AK/SK Pairs`, `STOP`, `UNPUBLISHED`, `PENDING`, `Credits`, and similar labels as shown; add a Chinese explanation on first use in Chinese pages |
| Status terms | Documentation uses Enabled/Disabled; `Active` or `Enabled` in the UI refers to the same state |
| Dates | Documentation examples use `YYYY-MM-DD`; the UI may show `YYYY/MM/DD` or ISO time, interpreted in local time |
| Quota | Use `Credits` and “quota” according to the page context; do not substitute field names |

## Maintenance Information

| Item | Content |
| --- | --- |
| Last updated | 2026-10-30 |
| Coverage | 31 pages per language: operator 19, user 12 |
| Out of scope | Online payment channel configuration (Stripe / Alipay); online payment is not enabled in the current environment |
| Maintenance | Before a release, verify affected pages, sections, images, and bilingual consistency |

## Usage Notes

1. Confirm the current role, then use the matching left-menu group.
2. Before changing permissions, notification scope, quota, or API rate control, confirm the impact.
3. When a menu label and page title differ, use the current UI and the Naming Notes above.
4. To review historical changes, combine Operation Logs, Notification Audit, and the relevant configuration page.
