# Reconcile and Settle a Billing Cycle

::: info Document Information
Version: v1.0
Updated: 2026-07-23
:::

## Workflow Overview

This page describes the main workflow for billing operators to complete one billing-cycle reconciliation and settlement: review the billing-cycle summary and today's tasks, check financial accounts and reconciliation exceptions, generate or view settlement statements after blocking issues are cleared, and use account adjustment only when a verified difference still exists.

| Item | Content |
| --- | --- |
| Applicable role | Billing operator, finance reviewer, platform operator |
| Navigation path | Billing > Reconcile and Settle a Billing Cycle |
| Page route | `/usermanual/billing/end-to-end/reconcile-billing-cycle/` |
| Managed objects | Billing cycle, organization, financial accounts, reconciliation exceptions, settlement statements, and account adjustments |
| Typical use | Complete a billing-cycle reconciliation path from monthly overview to settlement statements and exception closure |

#### Beginner Explanation

Billing-cycle reconciliation is like month-end closing. First check whether the monthly totals look reasonable, then check pending tasks and exceptions, then reconcile account transactions, and finally generate or confirm settlement statements. Account adjustment is not a routine step; use it only after the difference is located and approval basis is sufficient.

#### Terms Quick Reference

| Term | Meaning | Related page |
| --- | --- | --- |
| Billing Cycle | The month or financial period being reconciled and settled. | [Monthly Overview](../../operator/finance-operations/monthly-overview/) |
| Today Tasks | Billing tasks or exception reminders that currently require handling. | [Today Tasks](../../operator/finance-operations/today-tasks/) |
| Financial Accounts | Accounts used to check balance, income, expense, and transactions. | [Financial Accounts](../../operator/finance-operations/financial-accounts/) |
| Reconciliation Exception | Exception clues such as unmatched transfers, missing revenue details, or compensation queue items. | [Reconciliation Center](../../operator/finance-operations/reconciliation-center/) |
| Settlement Statement | Settlement record for an organization and billing cycle. | [Settlement List](../../operator/finance-operations/settlement-list/) |
| Account Adjustment | Approved correction for billing differences. | [Account Adjustment](../../operator/finance-operations/account-adjustment/) |

## Prerequisites

1. The current account has permission to view finance operations.
2. The target billing cycle has been confirmed.
3. The target organization, customer, or business-unit scope has been confirmed.
4. Settlement statements, account transactions, top-up orders, or business records required for reconciliation are available.
5. Before settlement generation, rebuild, compensation, or account adjustment, impact scope and approval requirements have been confirmed.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Billing Cycle | Yes | Month / financial period | `2026-07` | The unified time scope for this reconciliation and settlement workflow. |
| Organization | Conditionally required | Text | `Desensitized organization` | Limits the settlement statement generation or reconciliation scope. |
| Account Type | Conditionally required | Enum | `Platform Clearing Account` | Distinguishes clearing, revenue, or other accounts during transaction checks. |
| Exception Type | Conditionally required | Enum | `Unmatched Transfer` | Determines the next step in Reconciliation Center. |
| Settlement Statement No. | Conditionally required | Text | `Desensitized statement number` | Tracks settlement details, status, and posting confirmation. |

## Workflow Steps

#### View Monthly Overview

1. Open [Monthly Overview](../../operator/finance-operations/monthly-overview/).
2. Select the target billing cycle.
3. Review billing-cycle status, income, expense, net change, exception count, and update time.
4. If billing-cycle statistics are not complete, do not make a settlement conclusion yet.

#### Check Today Tasks

1. Open [Today Tasks](../../operator/finance-operations/today-tasks/).
2. Check whether timeout tasks, amount-related tasks, or high-priority tasks exist.
3. Prioritize tasks that may affect monthly closing, settlement statement generation, posting confirmation, or reconciliation results.
4. After handling tasks, return to Monthly Overview and confirm whether billing-cycle status changed.

#### Check Financial Accounts

1. Open [Financial Accounts](../../operator/finance-operations/financial-accounts/).
2. Review Platform Clearing Account, Platform Revenue Account, and other accounts for balance, income, expense, and update time.
3. Open transactions and reconcile by billing cycle, transaction type, organization, or transaction number.
4. If account amounts and Monthly Overview do not match, first confirm that billing cycle, organization, and transaction type are consistent.

#### Open Reconciliation Center for Exceptions

1. Open [Reconciliation Center](../../operator/finance-operations/reconciliation-center/).
2. Select the target billing cycle and click `Refresh`.
3. Check unmatched transfers, missing revenue details, and compensation queue.
4. Run bilateral ledger checks or revenue detail rebuild only when needed and after confirming the impact scope.
5. Record only desensitized exception type, count, billing cycle, and related clues.

#### Generate or View Settlement Statements

1. Open [Settlement List](../../operator/finance-operations/settlement-list/).
2. Search for the target settlement statement by billing cycle, status, and organization.
3. If the settlement statement already exists, open details and verify amount, status, and posting confirmation information.
4. If settlement generation is required, confirm that Monthly Overview, Financial Accounts, and Reconciliation Center have no blocking exception.
5. After generation, return to the list, search by billing cycle and organization, and open details to confirm status.

#### Use Account Adjustment if Needed

1. Use [Account Adjustment](../../operator/finance-operations/account-adjustment/) only when the difference source has been located and approval basis is sufficient.
2. Verify adjustment type, affected billing cycle, related documents, amount direction, and approval status.
3. Do not treat reconciliation results alone as adjustment basis; compare them with Financial Accounts, Settlement List, and business records.
4. After adjustment, return to Monthly Overview, Financial Accounts, and Settlement List to verify the result.

## Pitfalls

- Do not skip Reconciliation Center before generating settlement statements. Unmatched transfers and missing revenue details can affect later verification.
- Financial Accounts, Monthly Overview, and Settlement List must use the same billing cycle and organization scope.
- Account adjustment is only for located and approved differences. It is not a routine repair entry.
- If settlement generation fails, do not click repeatedly. Review generation checks and failure reasons first.
- `Generate Settlement`, compensation, rebuild, and account adjustment are high-risk actions. Confirm billing cycle, organization, amount, and approval basis before executing them.
- Do not record real organizations, customers, amounts, transaction numbers, account numbers, settlement statement numbers, Token, or Key.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Billing-cycle status clear | Monthly Overview shows the target billing cycle, summary status, and update time. | Continue with tasks and account checks. |
| Blocking tasks handled | Today Tasks has no high-priority task blocking settlement. | Open Financial Accounts. |
| Accounts reconcilable | Financial account transactions explain income, expense, and balance changes. | Open Reconciliation Center. |
| Reconciliation has no blocker | Unmatched transfers, missing revenue details, and compensation queue are handled or have clear conclusions. | Open Settlement List. |
| Settlement statement traceable | The statement can be found by billing cycle and organization, and details can be opened. | Archive or continue posting confirmation. |
| Difference closed | Adjustment cases have approval, related documents, and verification records. | Return to related pages and retest. |

## Failure Branches and Troubleshooting Paths

| Failure symptom | Check first | Next hop |
| --- | --- | --- |
| Monthly Overview data is not updated | [Monthly Overview](../../operator/finance-operations/monthly-overview/) | Check billing cycle, update time, and statistics status. |
| Today Tasks remain unresolved | [Today Tasks](../../operator/finance-operations/today-tasks/) | Handle by priority, task type, and timeout status. |
| Account amount does not match | [Financial Accounts](../../operator/finance-operations/financial-accounts/) | Reconcile transactions and account type. |
| Unmatched transfers exist | [Reconciliation Center](../../operator/finance-operations/reconciliation-center/) | Jump to Financial Accounts and verify transactions. |
| Missing revenue details remain | [Reconciliation Center](../../operator/finance-operations/reconciliation-center/) | Rebuild and refresh again when approved. |
| Settlement generation fails | [Settlement List](../../operator/finance-operations/settlement-list/) | Review generation checks and detail status. |
| Fund correction is required | [Account Adjustment](../../operator/finance-operations/account-adjustment/) | Follow the approval process for adjustment. |

## FAQ

#### Can I skip Reconciliation Center and generate settlement statements directly?

**Symptom:**

Monthly Overview looks normal, but you are not sure whether Reconciliation Center still needs to be checked.

**Possible cause:**

Monthly Overview shows summary numbers, while Reconciliation Center shows exception clues. They serve different purposes.

**How to handle:**

Before generating settlement statements, refresh Reconciliation Center at least once and confirm that unmatched transfers, missing revenue details, and compensation queue items are not blocking settlement.

#### Settlement statement amount and financial account transactions do not match

**Symptom:**

The amount in settlement statement details does not match income, expense, or balance in Financial Accounts.

**Possible cause:**

Billing cycle, organization, transaction type, or account type may be inconsistent. Posting confirmation, refunds, adjustments, or clearing delay may also exist.

**How to handle:**

Align billing cycle and organization first. Then open Financial Account transactions for reconciliation. If the difference is still unexplained, open Reconciliation Center and keep only desensitized clues.

#### When is account adjustment required?

**Symptom:**

After finding a billing difference, you are not sure whether to open Account Adjustment directly.

**Possible cause:**

Account adjustment is a fund-correction action. It requires clear reason, impact scope, and approval basis, and must not be triggered from a single page result alone.

**How to handle:**

Complete checks in Monthly Overview, Financial Accounts, Reconciliation Center, and Settlement List first. Use Account Adjustment only after confirming that the difference is real and requires correction.

## Next Steps

1. After the billing-cycle workflow is closed, archive desensitized billing cycle, organization, settlement status, exception conclusion, and reviewer information.
2. If a settlement statement is in posting confirmation, continue tracking it in [Settlement List](../../operator/finance-operations/settlement-list/).
3. If a new transaction difference appears, return to [Financial Accounts](../../operator/finance-operations/financial-accounts/) and [Reconciliation Center](../../operator/finance-operations/reconciliation-center/) for another check.
4. If account adjustment is involved, verify the result again in Monthly Overview and Financial Accounts.

## Notes

- Do not generate settlement statements before billing-cycle statistics are complete.
- Do not judge amount correctness from one page alone. Compare Monthly Overview, Financial Accounts, Reconciliation Center, and Settlement List.
- Before Generate Settlement, rebuild, compensation, or account adjustment, confirm billing cycle, organization, and impact scope.
- Screenshots, tickets, comments, and delivery records must not expose real organizations, customers, amounts, transaction numbers, account numbers, settlement statement numbers, or internal handling comments.
- Account adjustment is a fund-correction action and must follow approval and review procedures.
