# My Keys

::: info Document Information
Version: v1.1
Updated: 2026-08-27
:::

## Feature Overview

`My Keys` lets an Operator review and create System API AK/SK Pairs for the current account. The current Operator page exposes the system-credential list, status and expiration information, creation records, and row actions.

| Item | Content |
| --- | --- |
| Applicable Role | Operator Account |
| Navigation path | Settings > Personal > My Keys |
| Page route | `/user/user-space/my-keys/system` |
| Managed objects | System API AK/SK Pairs, status, expiration, and creation records |
| Typical use | Review system credential state, open the creation dialog, and hand off the generated credential through the approved security process |

#### Beginner Explanation

An AK/SK pair is a system API credential for controlled administrative or automation calls. Treat it as a high-sensitivity credential: define its purpose, set an appropriate expiration time, store the generated values only through the approved security process, and never place the complete pair in documentation.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| System API AK/SK Pair | A system API access identifier and secret pair. | Use it only for the intended system integration. |
| Prefix | The non-secret identifier shown in the list. | Use it to recognize a credential; it is not the complete secret. |
| Expiration | The time after which the pair is no longer valid. | Replace the pair before an automation reaches this time. |
| Status | The current availability state of the pair. | Check it before troubleshooting a failed call. |

## Prerequisites

1. The current account has permission to view and create System API credentials.
2. You have opened `Settings > Personal > My Keys` from the Operator menu.
3. Before creating a pair, you have confirmed its caller, purpose, expiration plan, and secure handoff method.

## Page Description

The current Operator page exposes the `System API AK/SK Pairs` tab only. It does not expose a `Model API Keys` tab in this role.

![System API AK/SK pairs](./images/system-api-pairs-list.png)

| Area | Description |
| --- | --- |
| Top button | `Create Key` opens the System API AK/SK Pair creation dialog. |
| Type tab | `System API AK/SK Pairs` is the visible Operator tab. |
| Availability | `Available` and `All` switch the list scope. |
| Status | Filters the list by credential status. |
| Credential list | Shows Key name / description, prefix, status, expiration time, creation time, and actions. |
| Empty state | When no pair exists, the page shows `No keys yet` and instructs the operator to click `+ Create Key`. |

## Main Operations

### Check Key Status

1. Go to `Settings > Personal > My Keys` and select the System API AK/SK Pairs tab.
2. Filter keys by availability, status, or name.
3. Check only the name, redacted prefix, status, expiration time, and creation time. Do not view or copy the secret.
4. If no record is returned, check the tab and filters. For an abnormal status, ask the owner to confirm whether the key is disabled or expired.


### Review System API AK/SK Pairs

1. Go to `Settings > Personal > My Keys`.
2. Confirm that the `System API AK/SK Pairs` tab is selected.
3. Use `Available` or `All` and the `Status` selector to review the list.
4. Check the Key name / description, prefix, status, expiration time, creation time, and available actions.

### Open the System API AK/SK Pair Dialog

1. Click `Create Key` in the upper-right corner.
2. In the `Create System API AK/SK Pair` dialog, review the required `Expire Time`, required `Key Name`, and optional `Description` fields.
3. Before clicking the final `Create`, confirm the purpose, expiration, caller, and secure handoff method.
4. During documentation review or screenshot capture, click `Cancel`. Do not create a real credential.

![Create System API AK/SK Pair](./images/create-system-api-pair.png)

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Expire Time | Yes | Date time | `2026-12-31 23:59` | Defines when the System API AK/SK Pair expires. |
| Key Name | Yes | Text | `Backend job credential` | Identifies the purpose of the pair. |
| Description | No | Text | `Model service administration` | Optional usage notes, up to 200 characters. |
| Prefix | System generated | Text | `ak-********` | A masked identifier shown in the list; it is not the complete credential. |
| Status | System generated | Enum | `Enabled` | Indicates whether the pair is currently available. |
| Created at | System generated | Date time | `2026-08-26` | Records when the pair was created. |
| Actions | System generated | Button / menu | `View` | Opens the available read-only or follow-up actions for the row. |

## Pitfalls

- The current Operator page does not expose a `Model API Keys` tab. Do not use this Operator page as evidence for Provider or End User Model API Key behavior.
- The current System API creation dialog exposes only expiration time, Key Name, and optional Description. Do not document permission-scope, quota, reset-cycle, or warning-threshold fields for this dialog unless a later Demo check shows them.
- `Create` is the final high-risk action. Do not click it during learning, screenshots, or page validation.
- Never copy a complete AK/SK pair, token, account, endpoint, or secret into documentation, screenshots, tickets, or examples.
- A prefix is only an identifier; it is not the complete credential.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Operator entry | `Settings > Personal > My Keys` opens the System API AK/SK Pairs page. | Check the current Operator role and menu permission. |
| List filters | `Available`, `All`, and `Status` are visible. | Clear the filter and reopen the page. |
| List columns | Key name / description, prefix, status, expiration, creation time, and actions are visible. | Check page loading and role permission. |
| Create dialog | `Create Key` opens the `Create System API AK/SK Pair` dialog. | Check credential-creation permission. |
| Safe review | `Cancel` closes the dialog without creating a credential. | Do not proceed to `Create`; ask an administrator to verify the environment. |

## FAQ

#### Why is the Model API Keys tab missing?

The Operator role currently exposes the System API AK/SK Pairs page only. Model API Key behavior belongs to the Provider or End User My Keys page and must be documented under those role-specific manuals.

#### Why is a target System API credential missing?

The pair may belong to another account or tenant, may be unavailable in the current filter, or may be expired or disabled. Check the selected availability scope, status, expiration, and creation record.

#### What should be checked before creation or rotation?

Confirm the caller, purpose, expiration window, secure storage path, and replacement plan. Never record the complete AK/SK pair in documentation or screenshots.

## Next Steps

1. To review account details, go to [Profile](../profile/).
2. To adjust member permissions, go to [Members](../../members-roles/members/).
3. Use the approved security process to store or rotate the generated pair.

## Notes

- Never copy, paste, or capture a complete AK/SK pair, token, or secret.
- Do not include real credentials, accounts, endpoints, customer names, IDs, or internal test values in documentation, screenshots, tickets, or examples.
- `Create` is a final high-risk action.
- Before rotating or disabling a credential, confirm that its callers have completed the switch.
