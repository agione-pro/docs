# Settings

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator Administrators, System Maintainers, Security Roles, and Model Consumers |
| Navigation path | Settings |
| Page route | Current page entry |
| Managed objects | Personal Keys, profile information, members, roles, tenants, operation logs, system settings, and API rate control |

#### Beginner Explanation

Settings is the platform control area for accounts, members, roles, tenants, login security, operation logs, and API rate control. Start by deciding whether the task is about personal access, member permissions, tenant information, system policies, or API rate control.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Settings | The object managed on the Settings page. |
| Status | The current availability or activation state. |
| Action entry | A visible button, row action, or details entry. |

## Prerequisites

1. The current account can access `Settings`.
2. The target object has been confirmed, such as a member, role, tenant, login policy, or API rate-control rule.
3. Before enabling, disabling, authorizing, resetting, deleting, publishing, rolling back, or editing configuration, the impact scope and rollback path have been confirmed.

## Page Description

This page is used to view and process Settings-related objects. The entry, filters, list, and settings area depend on what the current role can actually see.

![Settings](./operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Settings page.

## Main Operations

### View the Settings Module

1. Open `Settings`.
2. Locate the target Settings by using the visible filters.
3. Review the list, details, or status fields and confirm the target object in context.
4. If the result is unexpected, clear the filters and reopen the page to verify it.

![View the Settings Module](./operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Settings page.

**Result validation:** The list, details, and status fields show the target object and remain consistent.

**Note:** Use only the fields and entries visible on the current page. Do not infer behavior from another role's page.

**FAQ:** If the entry is hidden, the button is disabled, or the result is not updated, check the current account permission, filters, object status, and page refresh time.

### Open a Settings Page by Role

1. Open `Settings`.
2. Locate the target Settings by using the visible filters.
3. Review the list, details, or status fields and confirm the target object in context.
4. If the result is unexpected, clear the filters and reopen the page to verify it.

![Open a Settings Page by Role](./operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Settings page.

**Result validation:** The list, details, and status fields show the target object and remain consistent.

**Note:** Use only the fields and entries visible on the current page. Do not infer behavior from another role's page.

**FAQ:** If the entry is hidden, the button is disabled, or the result is not updated, check the current account permission, filters, object status, and page refresh time.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Menu group | No | Navigation item | `Members & Roles` | Used to select Personal, Members, Tenants, logs, System Settings, or API Rate Control pages. |
| Target object | Yes | Text | `Member` | Object to view or maintain in the current task. |
| Permission scope | Yes | Role permission | `Privileged role` | Determines which menus and actions the current account can see and use. |
| High-risk action | No | Button | `Delete` / `Publish` | Actions that change accounts, permissions, system policies, or rate-control rules. |

## Pitfalls

- Do not judge whether a configuration is correct from the entry page alone. Open the specific feature page and check fields and status.
- Members, roles, tenants, and system settings can affect one another. Keep the object scope consistent during troubleshooting.
- Delete, publish, rollback, reset, and export actions require impact scope, approval basis, and rollback confirmation.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Menu visibility | The left menu displays Settings pages by group. | Check the current account permission and tenant scope. |
| Page loading | Page title, filters, tables, or configuration cards are displayed normally. | Refresh the page and re-enter the target menu. |
| Operation entry | Top buttons, row actions, or detail entries are visible. | Confirm whether the role should have the entry. |

## FAQ

#### Target settings entry is not visible

The target menu is not shown after opening Settings.

**Possible cause:**

The current account lacks the required management permission, or the menu is restricted by role authorization and tenant scope.

**Resolution:**

Ask a platform operator to verify role authorization and tenant scope, then sign in again or refresh the page.

#### What should be prepared before configuration changes?

The page provides edit, delete, publish, rollback, authorize, or reset buttons.

**Possible cause:**

These actions can change member permissions, login policies, rate-control rules, or system configuration.

**Resolution:**

Confirm the affected objects, change window, approval basis, and rollback method before continuing.

#### Why are the Settings entry or module cards not visible?

The Settings entry, operator-side pages, user-side pages, or API Rate Control pages are not visible.

**Possible cause:**

The current account does not have the required role, the sidebar is restricted by tenant permissions, or the Settings module is not enabled in the current environment.

**Resolution:**

Confirm the current identity and tenant scope. Ask an authorized operator to check Settings menu permissions, role scope, and module switches.

#### How should the Settings page be exported or captured safely?

**Symptom:**

Page information is needed for troubleshooting, audit, or delivery.

**Possible causes:**

The page may contain accounts, email addresses, IP addresses, internal paths, tenant identifiers, Keys, or amounts.

**Resolution:**

Keep only the necessary fields and action context. Use opaque light-gray pixel mosaics for sensitive text and never share complete credentials or internal addresses.

#### What should I do when the Settings page shows unexpected data?

**Symptom:**

A field, status, metric, or related object differs from the expectation.

**Possible causes:**

The page scope, time condition, role permission, or upstream setting does not match.

**Resolution:**

Record the redacted object, time, and result. Verify the entry and filters first, then check related pages and Operation Logs.

## Notes

- Do not expose passwords, tokens, AK/SK, private keys, complete Keys, phone numbers, emails, or internal IP addresses in documents, screenshots, or tickets.
- Delete, authorize, reset, enable, disable, publish, rollback, clean, and export actions require impact confirmation.
- Settings can affect platform-wide users. Perform important changes during a planned low-traffic window when possible.

## Next Steps

1. To manage personal access credentials, read [My Keys](./operator/personal/my-keys/).
2. To manage members and roles, read [Members](./operator/members-roles/members/) and [Roles](./operator/members-roles/roles/).
3. To manage platform security and rate control, read [Login Properties](./operator/system-settings/login-properties/) and [API Rate Control Overview](./operator/api-rate-control/overview/).
