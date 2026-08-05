# My Keys

::: info Document Information
Version: v1.0
Updated: 2026-07-13
:::

## Feature Overview

`My Keys` manages personal Model API Keys and System API AK/SK Pairs. You can create credentials, review their information, set Key quotas, rotate credentials, and disable them.

| Item | Content |
| --- | --- |
| Applicable Role | Provider Account |
| Navigation path | Settings > Personal > My Keys |
| Page route | `/user/user-space/my-keys` |
| Managed objects | Model API Keys, System API AK/SK Pairs, quota, and status |
| Typical use | Create, review, and disable credentials, and verify quota and credential status |

#### Beginner Explanation

My Keys is your personal credential cabinet for model API Keys and system API AK/SK Pairs. Give each credential a clear purpose, expiration, and quota limit instead of sharing one credential across all use cases.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Model API Key | A credential used to call model APIs. | Use separate Keys for applications or projects. |
| System API AK/SK | A credential pair used to call system APIs. | Never expose it in frontend code or documentation. |
| Expiration | The time after which a credential can no longer be used. | Notify callers before rotation. |
| Quota limit | The maximum quota that a Key can consume. | Check it when a call fails. |

## Prerequisites

1. The current account has Key-management permission.
2. Before creating a credential, you have defined its purpose, expiration, and quota policy.
3. Before viewing, copying, rotating, or disabling a credential, you have confirmed its business dependencies.

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
| Credential created | The new credential appears on the current tab. | Refresh the list and confirm the selected tab. |
| Status | Only an enabled, unexpired credential can be used. | Check status, expiration, and project authorization. |
| Quota updated | Used / limit changes after the limit is saved. | Open the quota dialog again and verify the saved values. |

## FAQ

#### A Key call fails

**Symptom:**

The API returns an authentication or insufficient-quota error.

**Possible cause:**

- The Key is disabled, expired, or rotated.
- The Key reached its cycle limit.
- Member or project quota is insufficient.

**Resolution:**

1. Check Key status and expiration.
2. Review the Key limit and member quota.
3. Before rotating a Key, notify all callers that depend on it.

#### Why is a target Key missing from My Keys?

**Symptom:**

A newly created or active Key is absent.

**Possible cause:**

The current tab shows another credential type, the Key is disabled or deleted, or it belongs to another project.

**Resolution:**

Switch between personal and project Key tabs and clear filters. Verify the Key's project and status. If it is still missing, check Operation Logs for deletion.

#### Why are Create Key or Disable unavailable?

**Symptom:**

The list is visible, but Create, Disable, or Quota cannot be selected.

**Possible cause:**

The tenant disables self-service personal Key creation, the Key is already disabled or expired, or a project administrator must maintain the project Key.

**Resolution:**

Confirm the credential type and tenant security policy. Ask an administrator to enable personal Key management, or ask the project administrator to manage a project Key.

## Next Steps

1. Disable credentials that are no longer used.
2. Use separate credentials for production, test, and temporary work.
3. Review rotation, disable, and other high-risk actions in Operation Logs.

## Notes

- Never expose a complete Key, AK/SK pair, token, or private key in documentation, screenshots, or chat.
- `Rotate` and `Disable` affect existing calls. Confirm the business impact first.
