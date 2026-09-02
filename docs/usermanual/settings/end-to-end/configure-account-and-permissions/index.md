# Configure Accounts and Permissions

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator |
| Navigation path | Settings > Operator administration |
| Page route | Current page entry |
| Managed objects | Configure Accounts and Permissions |

#### Beginner Explanation

Configuring accounts and permissions is like issuing access badges. Confirm which tenant the member belongs to, decide which role permissions the member needs, check whether the target page is visible, and finally verify the record in operation logs.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Tenant | Business subject that owns members and permissions.; Confirm tenant and administrator first. |
| Member | Account that needs platform access.; Confirm email, phone, and identity before adding. |
| Role | Collection of menus and actions a member can access.; Create or review roles before assigning members. |
| Key | Credential used for API calls.; Separate by purpose and set an expiration time. |
| Operation log | Audit trail for member, role, and configuration changes.; Use it to verify changes after completion. |

## Prerequisites

1. The current account has Settings operator-admin permission.
2. The target tenant, target member, required role, and business purpose are clear.
3. For API access, the credential type is confirmed: Model API Key or System API AK/SK Pair.
4. For member creation, role authorization, Key creation, login-policy changes, deletion, reset, or Key rotation, the approval basis and rollback path are confirmed.

## Page Description

This page is used to view and process Configure Accounts and Permissions-related objects. The entry, filters, list, and settings area depend on what the current role can actually see.

![Configure Accounts and Permissions](../../operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Configure Accounts and Permissions page.

## Main Operations

### Confirm the Target Tenant

1. Open `Settings > Operator administration`.
2. Locate the target Configure Accounts and Permissions by using the visible filters.
3. Review the list, details, or status fields and confirm the target object in context.
4. If the result is unexpected, clear the filters and reopen the page to verify it.

![Confirm the Target Tenant](../../operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Configure Accounts and Permissions page.

**Result validation:** The list, details, and status fields show the target object and remain consistent.

**Note:** Use only the fields and entries visible on the current page. Do not infer behavior from another role's page.

**FAQ:** If the entry is hidden, the button is disabled, or the result is not updated, check the current account permission, filters, object status, and page refresh time.

### Configure Roles and Members

1. Open `Settings > Operator administration`.
2. Locate the target Configure Accounts and Permissions by using the visible filters.
3. Review the list, details, or status fields and confirm the target object in context.
4. If the result is unexpected, clear the filters and reopen the page to verify it.

![Configure Roles and Members](../../operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Configure Accounts and Permissions page.

**Result validation:** Follow the page success message, then return to the list or details page to verify the object status, update time, and affected scope.

**Note:** Recheck the target object and impact before submission. For changes to permissions, status, data, or external settings, confirm approval and rollback information first.

**FAQ:** If the entry is hidden, the button is disabled, or the result is not updated, check the current account permission, filters, object status, and page refresh time.

### Configure an Access Key

1. Open `Settings > Operator administration`.
2. Locate the target Configure Accounts and Permissions by using the visible filters.
3. Review the list, details, or status fields and confirm the target object in context.
4. If the result is unexpected, clear the filters and reopen the page to verify it.

![Configure an Access Key](../../operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Configure Accounts and Permissions page.

**Result validation:** Follow the page success message, then return to the list or details page to verify the object status, update time, and affected scope.

**Note:** Recheck the target object and impact before submission. For changes to permissions, status, data, or external settings, confirm approval and rollback information first.

**FAQ:** If the entry is hidden, the button is disabled, or the result is not updated, check the current account permission, filters, object status, and page refresh time.

### Verify Operation Logs

1. Open `Settings > Operator administration`.
2. Locate the target Configure Accounts and Permissions by using the visible filters.
3. Review the list, details, or status fields and confirm the target object in context.
4. If the result is unexpected, clear the filters and reopen the page to verify it.

![Verify Operation Logs](../../operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Configure Accounts and Permissions page.

**Result validation:** The list, details, and status fields show the target object and remain consistent.

**Note:** Use only the fields and entries visible on the current page. Do not infer behavior from another role's page.

**FAQ:** If the entry is hidden, the button is disabled, or the result is not updated, check the current account permission, filters, object status, and page refresh time.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Target Tenant | Yes | Text | `<tenant_name>` | Ownership scope for members, roles, and permissions. |
| Target Member | Yes | Text | `<member_account>` | Account to add, check, or authorize. |
| Role | Yes | Enum | `<role_name>` | Menu and operation permissions assigned to the member. |
| Key Type | Conditionally required | Enum | `Model API Key` | Required when API access is involved. |
| Login Policy | Conditionally required | Configuration item | `Verification code` | Checked when login, registration, or recovery is abnormal. |
| Operation Log Time | Conditionally required | Time range | `Change window` | Used to filter audit records after the change. |

## Pitfalls

- Confirm the tenant before assigning roles. Permissions in the wrong tenant will not fix target-page visibility.
- Member creation, role authorization, Key creation, and login-policy changes are all high-risk configuration paths. Confirm approval basis and impact scope first.
- Do not keep high-privilege roles on temporary members. Review permissions by least privilege after authorization.
- Key creation only means the credential was generated. The caller must still update configuration and verify quota, expiration time, and API permission.
- When operation logs are missing, do not repeat the operation immediately. Expand the time range and confirm log permissions first.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Tenant is clear | Target tenant and administrator can be located. | Continue with role configuration. |
| Role is usable | Role permissions cover the target menus and actions. | Assign the role to the member. |
| Member can sign in | Member status is normal and the role is bound. | Verify access from the target business page. |
| Key is usable | Key type, validity period, permission scope, and quota match the call requirement. | Notify the caller to update configuration. |
| Logs are traceable | Operation logs contain this configuration record. | Archive the desensitized change record. |

## FAQ

#### What if a member is added but still cannot see menus?

The member can sign in, but the target menu is not visible.

**Possible cause:**

The member has the wrong role, the role does not include the target menu, or the member is using the wrong tenant context.

**Resolution:**

Confirm the member's tenant and role binding. Open Roles and verify menu permissions. Ask the member to sign in again after a role change.

#### What if API calls still fail after Key creation?

The caller has received a Key, but the API still returns authentication or quota errors.

**Possible cause:**

The Key type is incorrect, its permission scope or quota is insufficient, it has expired, or the caller still uses an old credential.

**Resolution:**

Check the Key type, status, expiration time, permission scope, and quota. Confirm that the caller replaced the old credential. If the call still fails, use operation logs and sanitized API errors to continue troubleshooting.

#### Why does the Configure Accounts and Permissions change not appear?

**Symptom:**

The list or details page still shows the previous value after an action.

**Possible causes:**

Synchronization or cache is delayed, the action was not submitted, or a different object was opened.

**Resolution:**

Check the success message, object identifier, and update time. Refresh the list and reopen details. Review Operation Logs when needed.

#### How should the Configure Accounts and Permissions page be exported or captured safely?

**Symptom:**

Page information is needed for troubleshooting, audit, or delivery.

**Possible causes:**

The page may contain accounts, email addresses, IP addresses, internal paths, tenant identifiers, Keys, or amounts.

**Resolution:**

Keep only the necessary fields and action context. Use opaque light-gray pixel mosaics for sensitive text and never share complete credentials or internal addresses.

#### What should I do when the Configure Accounts and Permissions page shows unexpected data?

**Symptom:**

A field, status, metric, or related object differs from the expectation.

**Possible causes:**

The page scope, time condition, role permission, or upstream setting does not match.

**Resolution:**

Record the redacted object, time, and result. Verify the entry and filters first, then check related pages and Operation Logs.

## Notes

- Configure high-privilege roles by least privilege. Do not keep administrator permissions on temporary members.
- Before member creation, role authorization, Key creation, login-policy changes, member deletion, password reset, or Key rotation, confirm notification, change window, and rollback method.
- Do not expose full emails, phone numbers, Keys, AK/SK, tokens, internal addresses, tenant IDs, or member IDs in tickets or screenshots.

## Next Steps

1. To continue member management, open [Members](../../operator/members-roles/members/).
2. To adjust permission templates, open [Roles](../../operator/members-roles/roles/).
3. To review configuration changes, open [Operation Logs](../../operator/activity-notifications/operation-logs/).
4. To troubleshoot API rate control, open [API Rate Control Overview](../../operator/api-rate-control/overview/).
