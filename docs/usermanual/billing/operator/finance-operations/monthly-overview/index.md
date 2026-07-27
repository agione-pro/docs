# Monthly Overview

::: info Document Information
Version: v1.0
Updated: 2026-07-10
:::

## Feature Overview

`Monthly Overview` is used to review monthly billing cycles, organization settlement status, monthly gross flow, payable amounts, platform retained fee, revenue mix, and pending settlement tasks. Operators use this page to decide whether settlement statements can be generated or whether exceptions need follow-up first.

| Item | Content |
| --- | --- |
| Applicable role | Platform operator, billing operator |
| Navigation path | Billing > Finance Operations > Monthly Overview |
| Page route | `/billing/admin/provider-settlements/monthly-overview` |
| Managed objects | Billing cycle, organization settlement status, monthly revenue mix, and pending tasks |
| Typical use | Review monthly settlement progress, identify settlement statements to generate, and verify revenue mix |

#### Beginner Explanation

Monthly Overview is like the billing-cycle monthly report. Select a billing cycle first, then check how many organizations are settled, how many still need follow-up, and how platform revenue is composed. If To generate or To advance is not zero, continue with settlement list or reconciliation pages before final actions.

#### Terms Quick Reference

| Term | Meaning | Handling tip |
| --- | --- | --- |
| Billing Cycle | The month or settlement period used for billing, revenue, and reconciliation. | Keep the cycle consistent across Monthly Overview, Settlement List, and Financial Accounts. |
| Organization settlement status | Settlement progress for organizations in the selected billing cycle. | Check Pending Organizations and Failed before generating statements. |
| Revenue Mix | Platform retained fee, self-operated revenue, and total statistical revenue. | Treat it as a summary and reconcile abnormal amounts with details. |
| Task List | To generate, To advance, and Long unresolved task counts. | Use it to decide the next downstream page. |
| Generate Settlement | Button for generating settlement statements for eligible organizations. | Use only after confirming billing cycle, organization scope, and exceptions. |

## Prerequisites

1. The current account can access `Finance Operations > Monthly Overview`.
2. The target billing cycle and operation scope have been confirmed.
3. If `Generate Settlement` may be used, the organization scope, failed tasks, reconciliation status, and approval basis have been prepared.

## Page Description

The page includes billing-cycle selection, refresh and settlement generation entries, billing-cycle statistic cards, revenue mix, and task lists.

| Area | Description |
| --- | --- |
| Billing Cycle | Select the monthly billing cycle to review. |
| Refresh | Reload statistics for the selected billing cycle. |
| Generate Settlement | Generate settlement statements for eligible organizations. |
| Organization Total | Number of organizations included in the selected billing cycle. |
| Settled | Number of organizations already settled. |
| Pending Organizations | Organizations that still require follow-up. |
| Failed | Failed settlement generation or processing count. |
| Revenue Mix | Platform retained fee, self-operated revenue, and total statistical revenue. |
| Task List | To generate, To advance, and long unresolved tasks. |

The following screenshot shows monthly overview list.

![Monthly Overview list](./images/monthly-overview-list.png)

## Main Operations

Use the following operations to work with monthly overview records and related status. Complete view-only checks before opening dialogs that may create, save, submit, activate, transfer, settle, publish, or delete data.

### View Monthly Overview

1. Go to `Billing > Finance Operations > Monthly Overview`.
2. Select the target month in `Billing Cycle` and confirm the billing-cycle scope.
3. Click `Refresh` and wait for statistics and task lists to update.
4. Review billing-cycle statistic cards, especially `Organization Total`, `Settled`, `Pending Organizations`, and `Failed`.
5. Review the revenue mix area, including `Platform Retained Fee`, `Self-operated Revenue`, and total statistical revenue.
6. Review task counts such as `To generate`, `To advance`, and `Long unresolved`.
7. For learning or screenshots only, view the billing cycle, statistic cards, and task list without clicking `Generate Settlement`.

### Generate Settlement

1. Go to `Billing > Finance Operations > Monthly Overview`.
2. Confirm that `Billing Cycle` is correct.
3. Review the To generate count in the task list.
4. Click `Generate Settlement`.
5. Go to [Settlement List](../settlement-list/) to track generated settlement statement records and status.
6. If generation fails or returns an unclear result, do not click repeatedly; check Settlement List or Reconciliation Center first.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Billing Cycle | Yes | Month / billing period | `2026-07` | Switches the monthly settlement cycle being reviewed. |
| Organization Total | System-generated | Number | `0` | Number of organizations included in the selected billing cycle. |
| Settled | System-generated | Number | `0` | Number of organizations already settled. |
| Pending Organizations | System-generated | Number | `0` | Organizations that still require operator follow-up. |
| Failed | System-generated | Number | `0` | Failed settlement generation or processing count. |
| Gross Flow | System-generated | Amount | `0.00 credits` | Gross monthly flow counted in the selected billing cycle. |
| Payable to Organizations | System-generated | Amount | `0.00 credits` | Total amount payable to organizations or providers in the selected billing cycle. |
| Platform Retained Fee | System-generated | Amount | `0.00 credits` | Platform retained fee in the selected billing cycle. |
| Self-operated Revenue | System-generated | Amount | `0.00 credits` | Revenue from platform self-operated business in the selected billing cycle. |
| Total Statistical Revenue | System-generated | Amount | `0.00 credits` | Total revenue statistics from retained fee, self-operated revenue, and related sources. |
| To generate | System-generated | Number | `0` | Tasks that have not generated settlement statements yet. |
| To advance | System-generated | Number | `0` | Generated or in-progress tasks that require follow-up. |
| Long unresolved | System-generated | Number | `0` | Tasks or exceptions that have not been resolved for a long time. |
| Generate Settlement | Operation entry | Button | Generate Settlement | Generates settlement statements for eligible organizations in the selected billing cycle. |

## Pitfalls

- Do not rely on one amount field alone for financial confirmation; cross-check transactions, bills, settlement statements, and reconciliation results.
- Do not repeat high-risk billing operations when the first attempt fails; check status and error details first.
- Remove sensitive customer, bank, contract, token, Key, or internal processing information before sharing screenshots or tickets.
- `Generate Settlement` affects the real billing-cycle settlement flow.
- Before clicking `Generate Settlement`, confirm the billing cycle, organization scope, To generate count, failed tasks, and reconciliation status.
- Do not click generation repeatedly. If it fails, check Settlement List or Reconciliation Center before retrying.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page access | The `Finance Operations > Monthly Overview` page opens and data loads normally. | Check role permissions and refresh the page. |
| Filter result | The list changes according to the selected filters. | Reset filters and search again. |
| Record detail | Details, status, amount, permission, or configuration values are visible. | Confirm the record scope and permissions. |
| Follow-up path | Related pages or dialogs can be opened from visible entries. | Return to the sidebar and enter the downstream page directly. |

## FAQ

#### Target billing data is not visible in Monthly Overview

The expected account, customer, order, bill, settlement, adjustment, or License record does not appear on this page.

**How to check:**

1. Confirm the current tenant, organization, customer, account, and role scope.
2. Check page filters such as billing cycle, time range, customer, account type, status, and keyword.
3. Verify that upstream actions, such as top-up, reconciliation, settlement, adjustment, or License activation, have completed successfully.
4. If the record was just created or updated, refresh the list and compare it with related transaction, bill, settlement, or operation records.

#### Amount, status, or billing cycle does not match in Monthly Overview

The displayed balance, consumption, settlement status, monthly bill, or License status differs from the expected result.

**How to check:**

1. Confirm month-end close cycle, organization, settlement status, and latest aggregation time before comparing totals.
2. Check whether pending top-up orders, adjustments, refunds, settlement reviews, or metering synchronization are still in progress.
3. Compare the summary number with the detail list and operation records on the related billing pages.
4. For financial-impacting differences, pause confirmation actions and escalate with desensitized record IDs, time range, customer scope, and screenshots without credentials.

#### The Generate Settlement button is unavailable

Check the selected billing cycle, customer or project scope, status filters, and related asynchronous task records. Compare the result with transaction details, settlement records, and operation logs before repeating any high-risk billing action.

#### The task count is inconsistent with the settlement statement list

Check the selected billing cycle, customer or project scope, status filters, and related asynchronous task records. Compare the result with transaction details, settlement records, and operation logs before repeating any high-risk billing action.

## Next Steps

1. Review related billing records, transactions, settlement statements, and account balance changes.
2. Keep only desensitized page paths, timestamps, status values, and screenshots when escalating.
3. Continue with the related reconciliation, settlement, top-up, or adjustment flow after the result is confirmed.

## Notes

- Billing amounts, settlements, balances, and customer information are sensitive. Desensitize them before sharing.
- Keep page routes, API fields, Key, AK/SK, License, and other product terms in their UI form.
- Do not record real billing-cycle amounts, tenants, organizations, customer names, settlement statement numbers, internal transaction numbers, or approval information in the manual, screenshots, notes, or tickets.
