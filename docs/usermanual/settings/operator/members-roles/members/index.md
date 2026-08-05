# Members

::: info Document Information
Version: v1.0
Updated: 2026-07-10
:::

## Feature Overview

`Members` is used to view and manage operator members. You can filter by username or phone number, review each member's role and status, and add, edit, reset the password for, or delete a member.

| Item | Content |
| --- | --- |
| Applicable Role | Operator Admin |
| Navigation path | Settings > Members & Roles > Members |
| Page route | `/user/user-space/team-members` |
| Managed objects | Members, roles, status, and contact information |
| Typical use | Query members, add members, and review member roles and status |

#### Beginner Explanation

Operator members are the platform-console duty roster. They determine who can enter the operator console and manage configuration, approvals, audits, and platform-level tasks. They are different from members of a user-side tenant.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Operator member | A member with access to platform administration functions. | Assign a role based on job responsibilities. |
| Platform role | A role that controls which operator modules a member can manage. | Do not grant more permission than required. |
| Member status | Indicates whether a member is enabled, disabled, or pending activation. | Check status first when login fails. |
| Management scope | The tenants or system settings visible to a member. | Confirm the scope during troubleshooting. |

## Prerequisites

1. The current account has permission to manage members.
2. You have opened `Members & Roles > Members`.
3. Before changing a member, you have confirmed the person's identity, role scope, and reason for the change.

## Page Description

The following screenshot shows the Members page. Phone numbers and email addresses are desensitized.

![Members](./images/members-list.png)

| Area | Description |
| --- | --- |
| Username | Filters members by username. |
| Phone Number | Filters members by phone number. |
| Add Member | Opens the member creation flow. |
| Member table | Shows username, name, phone number, email, role, status, creation time, and actions. |

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
- UI entries can differ by role and tenant scope; verify the current account context before troubleshooting.
- Never copy complete Keys, AK/SK, tokens, or secrets into documentation, tickets, or screenshots.
- Adding a member creates a real operator-side account and may affect platform management permissions.
- `Confirm` is the final submit action. For learning or screenshots, only view fields and use `Cancel` to exit.
- Selecting the wrong role may grant excessive permissions or prevent the member from completing operator tasks.
- Do not write real phone numbers, emails, usernames, user IDs, passwords, customer names, or internal test data in documentation.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Member filter | The list refreshes by username or phone number. | Clear the filters and search again. |
| Status | The member status control is displayed. | Check the current account's permissions. |
| Actions | Edit, Reset Password, and Delete are displayed according to permission. | Ask an administrator to verify the role assignment. |
| Add dialog | Clicking `Add Member` opens the same-name dialog. | Check whether the current account has member creation permission. |
| Cancel exit | Clicking `Cancel` closes the dialog without submitting member configuration. | Refresh the page and confirm no test member was added. |

## FAQ

#### A member cannot sign in

**Symptom:**

The member cannot access the platform.

**Possible cause:**

The member is disabled, a reset password was not communicated, or the assigned role lacks permission.

**Resolution:**

Verify the member status, role, and password-reset record, and then restore access according to your account-management process.

#### What should be checked before deleting a member?

**Symptom:**

The member row provides a `Delete` action.

**Possible cause:**

The member may still own business actions, keys, or approval records.

**Resolution:**

Confirm that the member no longer has active responsibilities before continuing with the deletion.

#### Why is the operator member list empty?

**Symptom:**

No platform administrator or operator member is shown.

**Possible cause:**

The current account is not in the platform administration tenant, the members belong to a user-side tenant, or the current role limits the list scope.

**Resolution:**

Confirm that you are using the operator entry and verify the platform tenant and administrator role. Ask a super administrator to grant operator-member access when required.

## Next Steps

1. To adjust role permissions, go to [Roles](../roles/).
2. To review member actions, go to [Operation Logs](../../activity-notifications/operation-logs/).

## Notes

- Do not expose member phone numbers, email addresses, or account identifiers in documentation or screenshots.
- Reset Password, Delete, and status changes affect member access and require review.
- `Confirm` is the final submit action. Before adding a member, verify the member identity, role permissions, and enabled status.
- For learning or screenshots only, open the dialog to view fields and use `Cancel` to exit.
- Do not write real phone numbers, emails, usernames, user IDs, passwords, customer names, or internal test data in documentation.
