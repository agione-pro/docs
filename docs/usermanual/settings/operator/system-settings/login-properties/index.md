# Login Properties

::: info Document Information
Version: v1.0
Updated: 2026-07-29
:::

## Feature Overview

`Login Properties` is used to review login security, registration entrances, default roles, registration codes, account recovery, Google Login, and external registration sources.

| Item | Content |
| --- | --- |
| Applicable Role | Operator Admin |
| Navigation path | Settings > System Settings > Login Properties |
| Page route | `/user/system/login-properties` |
| Managed objects | Login security, registration settings, registration codes, account recovery, Google Login, and external system integration |
| Typical use | Review sign-in, registration, recovery, and external-source configuration |

#### Beginner Explanation

Login Properties is part of the settings and access-control workspace. Treat it as a place to confirm identities, permissions, tenant rules, audit records, or rate-control status before changing configuration.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Member | A user account that belongs to an tenant or team. | Check role and status before troubleshooting access. |
| Role | A permission set assigned to members. | Use least privilege and review scope before changes. |
| Operation log | An audit record of user or platform actions. | Use it to trace risky or abnormal operations. |
| API rate control rule | A policy that limits API request patterns. | Publish and verify rules carefully. |

## Prerequisites

1. The current account can access `System Settings > Login Properties`.
2. The target tenant, member, customer, billing cycle, rule, or record scope has been confirmed.
3. Required upstream data is already available and the page has finished loading.
4. For high-risk changes, confirm the impact scope and rollback path before continuing.

## Page Description

The page includes `Login security`, `Registration Settings`, `Registration Codes`, `Account Recovery`, and `Google Login`. `Registration Settings` contains registration entrances, default roles, the `Platform Source Catalog`, and `External System Integration`.

| Area | Description |
| --- | --- |
| Login security | Shows email-code login, password lockout, and send-code limits. |
| Registration Settings | Shows registration entrances, default roles, platform sources, and external integrations. |
| Registration Codes | Shows verification-code configuration for registration. |
| Account Recovery | Shows account-recovery configuration. |
| Google Login | Shows third-party sign-in configuration. |

The following screenshot shows login properties.

![Login Properties](./images/login-properties-list.png)

## Main Operations

Use the following operations to work with login properties records and related status. Complete view-only checks before opening dialogs that may create, save, submit, activate, transfer, settle, publish, or delete data.

### Login Security Configuration

1. Go to `Settings > System Settings > Login Properties`.
2. Click or locate `Login Security`.
3. Review password policy, login restrictions, session validity, MFA, or security verification settings.

![Login Security Configuration](./images/login-security.png)

### Registration Settings

1. Go to `Settings > System Settings > Login Properties`.
2. Select `Registration Settings`.
3. Review each registration entrance and its default roles.
4. Confirm that each default role belongs to the `DEFAULT` application before you edit the configuration.
5. Review the `Platform Source Catalog` and the controlled recharge channel for each enabled source.
6. Review the source and note in `External System Integration`.
7. A disabled master switch also disables its dependent registration path.
8. If the configuration does not load, refresh the page before you open an edit action.
9. Do not save an endpoint or credential until you confirm its owner and rollback plan.

![Registration Settings](./images/registration-properties.png)

### Registration Verification Code Configuration

1. Go to `Settings > System Settings > Login Properties`.
2. Locate `Registration Verification Code`.
3. Review verification code type, sending method, validity period, rate limits, and enabled status.

![Registration Verification Code Configuration](./images/registration-codes.png)

### Account Recovery Configuration

1. Go to `Settings > System Settings > Login Properties`.
2. Locate `Account Recovery`.
3. Review email, phone, verification code, identity verification, and recovery flow settings.

![Account Recovery Configuration](./images/account-recovery.png)

### Google Login Configuration

1. Go to `Settings > System Settings > Login Properties`.
2. Locate `Google Login`.
3. Review Client ID, callback URL, enabled status, and login entry settings.

![Google Login Configuration](./images/google-login.png)

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Configuration Category | System displayed | Text | `Login Security` | The configuration group in login properties. |
| Configuration Item | System displayed | Text | `Verification Code Validity Period` | The login policy parameter to view or maintain. |
| Default Value | System displayed | Text | `5 minutes` | The default or system-provided value of the configuration item. |
| Current Value | System displayed / Editable | Text | `5 minutes` | The currently effective configuration value. |
| Enabled Status | System displayed / Editable | Enum | `Enabled` | Indicates whether the configuration item or login capability is enabled. |
| Registration Entrance | System displayed / Editable | Text | `Email Registration` | Identifies a registration path and its entrance code. |
| Default Roles | System displayed / Editable | Role list | Displayed on page | Lists the roles assigned to new users for an entrance. Roles must belong to `DEFAULT`. |
| Platform Source Catalog | System displayed / Editable | Source list | Displayed on page | Lists external business sources, source status, and controlled recharge channels. |
| External System Integration | System displayed / Editable | Integration settings | Displayed on page | Shows an external registration source, master switch, and note. |
| Save | Operation button | Button | `Save` | Saves the current login configuration change. |
| Reset | Operation button | Button | `Reset` | Restores the configuration to the default value or last saved state. |
| Actions | System generated | Button / link | `Edit / Enable / Disable` | Provides login configuration view or maintenance entries. |

## Pitfalls

- Do not change roles, members, login policies, Keys, or API rate-control rules without confirming the affected users and systems.
- UI entries can differ by role and tenant scope; verify the current account context before troubleshooting.
- Never copy complete Keys, AK/SK, tokens, or secrets into documentation, tickets, or screenshots.
- Login properties affect user sign-in, registration, account recovery, verification code delivery, and third-party login entries.
- `Save`, `Reset`, `Enable`, and `Disable` are high-risk actions.
- Client Secret, callback URLs, internal domains, test accounts, and tokens in Google Login configuration must not be written into documentation or screenshots.
- For learning or screenshots, only view configuration items and do not submit real configuration changes.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page access | The `System Settings > Login Properties` page opens and data loads normally. | Check role permissions and refresh the page. |
| Filter result | The list changes according to the selected filters. | Reset filters and search again. |
| Record detail | Details, status, amount, permission, or configuration values are visible. | Confirm the record scope and permissions. |
| Follow-up path | Related pages or dialogs can be opened from visible entries. | Return to the sidebar and enter the downstream page directly. |
| Screenshots | Login security, Registration Settings, registration verification code, account recovery, and Google Login screenshots render normally. | Check whether image paths exist. |

## FAQ

#### Target settings entry is not visible in Login Properties

The expected account, project, member, role, tenant, key, operation log, system configuration, or API rate-control entry does not appear on this page.

**How to check:**

1. Confirm the current tenant, tenant, project, role, and account permission scope.
2. Check page filters such as keyword, status, project, member, role, tenant, time range, and configuration type.
3. Verify that prerequisite objects, such as projects, members, roles, keys, or system configurations, have been created and enabled.
4. If the entry was just changed, refresh the page and compare it with operation logs or related settings pages.

#### Configuration change does not take effect in Login Properties

A permission, project, role, key, notification, system setting, or rate-control change was submitted, but the page or downstream behavior still shows the old result.

**How to check:**

1. Confirm that the save operation completed and the target object status is enabled or active.
2. Check whether the change applies to the correct tenant, project, member, role, API key, or policy scope.
3. Compare downstream behavior with operation logs and related settings pages to rule out cache, permission, or synchronization delay.
4. For security-sensitive settings, verify impact scope before repeating the operation or escalating with desensitized page paths and timestamps.

#### Why does the login configuration not load?

Check the current tenant, tenant, project, role permissions, object status, feature switch, and operation logs. Do not repeat save, submit, publish, rollback, disable, or delete actions until the scope and impact are confirmed.

## Next Steps

1. Recheck the affected users, tenants, projects, roles, keys, policies, or configuration objects.
2. Verify operation logs and downstream behavior after the configuration is saved or refreshed.
3. Keep only desensitized page paths, timestamps, object names, and status values when escalating.

## Notes

- Permission, Key, login, tenant, and rate-control changes can affect real users. Confirm scope before changes.
- Keep page routes, API fields, Key, AK/SK, License, and other product terms in their UI form.
- Keep credentials, private operational details, and sensitive customer data out of the manual.
- `Save`, `Reset`, `Enable`, and `Disable` are high-risk actions.
- Client Secret, callback URLs, internal domains, test accounts, and tokens in Google Login configuration must not be written into documentation or screenshots.
- For learning or screenshots, only view configuration items and do not submit real configuration changes.
