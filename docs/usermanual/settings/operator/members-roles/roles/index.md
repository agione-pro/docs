# Roles

::: info Document Information
Version: v1.0
Updated: 2026-07-10
:::

## Feature Overview

`Roles` is used to view and manage platform roles. You can filter by role name, review role identifiers, descriptions, and creation times, and add, edit, authorize, or delete roles.

| Item | Content |
| --- | --- |
| Applicable Role | Operator Admin |
| Navigation path | Settings > Members & Roles > Roles |
| Page route | `/user/user-space/roles` |
| Managed objects | Role names, role identifiers, permission scopes, and creation times |
| Typical use | Query roles, review role permissions, and maintain role configurations |

#### Beginner Explanation

Operator roles are platform-console permission templates. They define which system modules an administrator can view, which settings the administrator can change, and which approvals the administrator can process. They are different from project collaboration roles.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Platform role | A set of operator-administration permissions. | Separate roles by responsibility. |
| Permission | A menu, button, or API-level control item. | Confirm the impact before changing it. |
| Built-in role | A system-provided role that usually cannot be deleted. | View it or use it as a reference. |
| Member assignment | The operator members assigned to a role. | Remove assignments before deleting the role. |

## Prerequisites

1. The current account has permission to manage roles.
2. You have opened `Members & Roles > Roles`.
3. Before authorizing or deleting a role, you have confirmed which members will be affected.

## Page Description

The following screenshot shows the Roles page. Role details are desensitized.

![Roles](./images/roles-list.png)

| Area | Description |
| --- | --- |
| Role Name | Filters roles by name. |
| Add Role | Opens the role creation flow. |
| Role table | Shows role name, identifier, description, creation time, and actions. |

## Main Operations

Use the following operations to work with roles records and related status. Complete view-only checks before opening dialogs that may create, save, submit, activate, transfer, settle, publish, or delete data.

### Add Role

1. Go to `Settings > Members & Roles > Roles`.
2. Click `Add Role` in the upper-right corner of the page.
3. In the `Add Role` dialog, review the role creation fields.

![Add Role](./images/add-role.png)

4. Fill in `Role name`.
5. Fill in the required `Role code`. Use a stable, readable, lowercase English code that is easy to audit.
6. Fill in `Role description` according to the intended role usage.
7. Before clicking the final `Confirm`, verify that the role name, role code, and later authorization scope follow the least-privilege principle.
8. For learning or screenshots only, view the fields and click `Cancel` to close the dialog without submitting real role configuration.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role name | Yes | Text | `Audit Admin` | The display name of the operator role. |
| Role code | Yes | Text | `audit_admin` | The unique role identifier. Use a stable, readable code that is easy to audit. |
| Role description | No | Text | `View audit logs and basic operator information` | Describes the role purpose and authorization boundary. |
| Permission items | Yes | Multi-select | `View Operation Logs` | Controls menus and operations available to the role. |
| Member count | No | Number | `3` | Shows how many members are bound to the role. |
| Role status | No | Enum | `Enabled` | Controls whether the role can continue to be assigned. |
| Actions | System generated | Button / link | `Edit / Authorize / Delete` | Provides role maintenance entry points. |

## Pitfalls

- Do not change roles, members, login policies, Keys, or API rate-control rules without confirming the affected users and systems.
- UI entries can differ by role and tenant scope; verify the current account context before troubleshooting.
- Never copy complete Keys, AK/SK, tokens, or secrets into documentation, tickets, or screenshots.
- Adding a role creates a new platform permission template. Later authorization and member binding can affect platform management permissions.
- `Confirm` is the final submit action. For learning or screenshots, only view fields and use `Cancel` to exit.
- Once `Role code` is referenced, later changes may affect permission identification, auditing, and automation configuration.
- Do not write real internal role codes, accounts, member IDs, customer names, or internal test data.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Role filter | The list refreshes by role name. | Check that the name is correct. |
| Authorization entry | The target role can open its authorization page. | Check the current account's role-management permission. |
| Delete entry | Delete is displayed according to permission. | Confirm that no critical member depends on the role before deletion. |
| Add dialog | Clicking `Add Role` opens the same-name dialog. | Check whether the current account has role creation permission. |
| Cancel exit | Clicking `Cancel` closes the dialog without submitting role configuration. | Refresh the page and confirm no test role was added. |

## FAQ

#### A member cannot see a menu

**Symptom:**

A member cannot see a menu or button after signing in.

**Possible cause:**

The role assigned to the member does not include the required menu or action permission.

**Resolution:**

Review the permission scope for the role, then confirm that the member is assigned to the correct role.

#### Can a role be deleted directly?

**Symptom:**

The role list provides a Delete action.

**Possible cause:**

The role may still be assigned to members, and deleting it can remove their access.

**Resolution:**

Check the members assigned to the role, then follow the tenant permission-change process.

#### Why is the operator role list empty?

**Symptom:**

The page does not show platform administrator, auditor, or configuration administrator roles.

**Possible cause:**

The current account lacks operator role-management permission, the roles belong to another administration tenant, or system roles cannot be edited in the list.

**Resolution:**

Confirm that you are using operator-side Settings and verify the role-management permission. Ask a super administrator to check abnormal built-in roles.

## Next Steps

1. To view members assigned to roles, go to [Members](../members/).
2. To trace permission changes, go to [Operation Logs](../../activity-notifications/operation-logs/).

## Notes

- Authorization changes affect menu visibility and button availability.
- Before deleting a role, confirm that no critical member depends on it.
- `Confirm` is the final submit action. Before adding a role, verify the role name, role code, and later authorization scope.
- Once `Role code` is referenced, later changes may affect permission identification, auditing, and automation configuration.
- For learning or screenshots only, open the dialog to view fields and use `Cancel` to exit.
- Do not write real internal role codes, accounts, member IDs, customer names, or internal test data.
