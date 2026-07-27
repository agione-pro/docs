# Configure Accounts and Permissions

::: info Document Information
Version: v1.0
Updated: 2026-07-13
:::

## Workflow Overview

This end-to-end workflow connects the account and permission pages in Settings. Confirm the tenant and account first, prepare roles, add or check members, create access credentials when needed, and then use operation logs to verify that the change was recorded. For API callers, also confirm Key type, validity period, quota, and API rate-control impact.

| Item | Content |
| --- | --- |
| Applicable role | Operator admin, system admin, and security admin |
| Navigation path | Settings > End-to-End > Configure Accounts and Permissions |
| Page route | /settings/end-to-end/configure-account-and-permissions |
| Managed objects | Tenants, members, roles, Keys, login policies, and operation logs |
| Typical use | Configure a complete account and permission path, then verify login, access, credentials, and audit records |

#### Beginner Explanation

Configuring accounts and permissions is like issuing access badges. Confirm which tenant the member belongs to, decide which role permissions the member needs, check whether the target page is visible, and finally verify the record in operation logs.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Tenant | Business subject that owns members and permissions. | Confirm tenant and administrator first. |
| Member | Account that needs platform access. | Confirm email, phone, and identity before adding. |
| Role | Collection of menus and actions a member can access. | Create or review roles before assigning members. |
| Key | Credential used for API calls. | Separate by purpose and set an expiration time. |
| Operation log | Audit trail for member, role, and configuration changes. | Use it to verify changes after completion. |

## Prerequisites

1. The current account has Settings operator-admin permission.
2. The target tenant, target member, required role, and business purpose are clear.
3. For API access, the credential type is confirmed: Model API Key or System API AK/SK Pair.
4. For member creation, role authorization, Key creation, login-policy changes, deletion, reset, or Key rotation, the approval basis and rollback path are confirmed.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Target Tenant | Yes | Text | `<tenant_name>` | Ownership scope for members, roles, and permissions. |
| Target Member | Yes | Text | `<member_account>` | Account to add, check, or authorize. |
| Role | Yes | Enum | `<role_name>` | Menu and operation permissions assigned to the member. |
| Key Type | Conditionally required | Enum | `Model API Key` | Required when API access is involved. |
| Login Policy | Conditionally required | Configuration item | `Verification code` | Checked when login, registration, or recovery is abnormal. |
| Operation Log Time | Conditionally required | Time range | `Change window` | Used to filter audit records after the change. |

## Workflow Steps

#### Confirm Tenant

1. Go to `Settings > Operator > Tenants`.
2. Locate the target tenant by tenant name, administrator information, or available page filters.
3. Confirm tenant status, administrator, role scope, and business ownership.
4. If the tenant is missing or ownership is unclear, stop before assigning permissions.

#### Prepare Roles

1. Go to `Settings > Operator > Members & Roles > Roles`.
2. Check whether existing roles meet the business need.
3. Before adding or editing a role, confirm menu permissions, operation permissions, and applicable member scope.
4. Before deleting, expanding, or narrowing a role, confirm whether any members still depend on it.

#### Check Members

1. Go to `Settings > Operator > Members & Roles > Members`.
2. Search for the target member and confirm status, email, phone, role, and tenant ownership.
3. If the member does not exist, add the member from the page entry.
4. If the member cannot sign in, check status, role, and login properties before resetting the password.

#### Configure Personal Access Credentials

1. When the member needs API access, go to `Settings > Personal > My Keys`.
2. Select `Model API Key` or `System API AK/SK Pair` according to the call type.
3. Configure purpose, expiration time, permission scope, and quota limits.
4. After creating or rotating credentials, confirm that the caller updates the configuration through a controlled channel.

#### Review Login Policies

1. If sign-in, verification code, or account recovery is abnormal, go to `Settings > System Settings > Login Properties`.
2. Check login security, registration verification codes, account recovery, and third-party login settings.
3. Before changing login policies, confirm affected users, verification method, and rollback plan.

#### View Operation Logs

1. Go to `Settings > Activity & Notifications > Operation Logs`.
2. Filter by time, operator, object, request method, and result.
3. Confirm that member creation, role authorization, Key creation, or login-policy changes are recorded.
4. If logs are missing, expand the time range and confirm the current account's log permissions.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Tenant is clear | Target tenant and administrator can be located. | Continue with role configuration. |
| Role is usable | Role permissions cover the target menus and actions. | Assign the role to the member. |
| Member can sign in | Member status is normal and the role is bound. | Verify access from the target business page. |
| Key is usable | Key type, validity period, permission scope, and quota match the call requirement. | Notify the caller to update configuration. |
| Logs are traceable | Operation logs contain this configuration record. | Archive the desensitized change record. |

## Failure Branches and Troubleshooting Paths

| Symptom | Check first | Next step |
| --- | --- | --- |
| Member cannot see a menu | [Roles](../../operator/members-roles/roles/) | Check role permissions and member binding. |
| Member cannot sign in | [Members](../../operator/members-roles/members/) | Check status, password, and login properties. |
| Verification code is not received | [Login Properties](../../operator/system-settings/login-properties/) | Check verification-code and notification settings. |
| Key call fails | [My Keys](../../user/personal/my-keys/) | Check Key status, quota, and expiration time. |
| Change cannot be traced | [Operation Logs](../../operator/activity-notifications/operation-logs/) | Expand the time range and confirm log permissions. |

## Pitfalls

- Confirm the tenant before assigning roles. Permissions in the wrong tenant will not fix target-page visibility.
- Member creation, role authorization, Key creation, and login-policy changes are all high-risk configuration paths. Confirm approval basis and impact scope first.
- Do not keep high-privilege roles on temporary members. Review permissions by least privilege after authorization.
- Key creation only means the credential was generated. The caller must still update configuration and verify quota, expiration time, and API permission.
- When operation logs are missing, do not repeat the operation immediately. Expand the time range and confirm log permissions first.

## FAQ

#### What if a member is added but still cannot see menus?

The member can sign in, but the target menu is not visible.

**How to check:**

1. Confirm the member's tenant and role binding.
2. Open Roles and verify menu permissions.
3. Ask the member to sign in again or refresh permissions after role changes.

#### What if API calls still fail after Key creation?

The caller has received a Key, but the API still returns authentication or quota errors.

**How to check:**

1. Confirm Key type, status, expiration time, permission scope, and quota limits.
2. Confirm that the caller replaced old credentials through a controlled channel.
3. Continue troubleshooting with operation logs and desensitized business API errors.

## Next Steps

1. To continue member management, open [Members](../../operator/members-roles/members/).
2. To adjust permission templates, open [Roles](../../operator/members-roles/roles/).
3. To review configuration changes, open [Operation Logs](../../operator/activity-notifications/operation-logs/).
4. To troubleshoot API rate control, open [API Rate Control Overview](../../operator/api-rate-control/overview/).

## Notes

- Configure high-privilege roles by least privilege. Do not keep administrator permissions on temporary members.
- Before member creation, role authorization, Key creation, login-policy changes, member deletion, password reset, or Key rotation, confirm notification, change window, and rollback method.
- Do not expose full emails, phone numbers, Keys, AK/SK, tokens, internal addresses, tenant IDs, or member IDs in tickets or screenshots.
