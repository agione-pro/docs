# Transactions

::: info Document Information
Version: v1.0
Updated: 2026-07-23
:::

## Feature Overview

The `Transactions` page is titled `Income & Expense Details` in the UI and is used to query billing records for the current account. Filter by transaction type, income/expense direction, and time range, then review transaction number, occurrence time, transaction type, context, credit change, post-change credits, business transaction number, remarks, and details.

| Item | Content |
| --- | --- |
| Applicable role | User-side account, business admin, billing viewer |
| Navigation path | Billing > User Billing > Transactions |
| Page route | `/billing/my/account/transactions/records` |
| Managed objects | Income records, expense records, transaction context, and business transaction numbers |
| Typical use | Trace balance changes, verify top-up posting, and troubleshoot consumption sources |

#### Beginner Explanation

Transactions is the account's receipt list. Every balance increase or decrease should have a corresponding record here. When troubleshooting a balance, do not rely only on Account Overview; use Transactions to filter by time, direction, and transaction type.

#### Terms Quick Reference

| Term | Meaning | Handling Tip |
| --- | --- | --- |
| Income/Expense Type | Indicates whether the record increases or decreases the balance. | Check direction before transaction type. |
| Transaction Type | Business category such as transfer, consumption, refund, or adjustment. | Use it to narrow the search. |
| Credit Change | Credits added or deducted by this record. | Review it with Post-change Credits. |
| Business Transaction Number | Number of the related business transaction. | It is not the payment transaction number. |
| Post-change Credits | Account Credits after this transaction. | Use it to explain a balance change. |

## Prerequisites

1. The current account has permission to view user-side billing.
2. Open `My Billing > Transactions`.
3. Confirm the time range to query.
4. Use sanitized transaction numbers in external communication.

## Page Description

The page contains filters and a transaction list. Filter by `Transaction Type`, `Income/Expense Type`, and time range, then use `Search` or `Reset`. The table shows transaction number, occurrence time, direction, type, context, credit change, post-change credits, business transaction number, remarks, and operation.

The following screenshot shows Transactions. Sanitize transaction numbers, times, context, and amounts before sharing it.

![Transactions](./images/transactions-list.png)

| Area | Description |
| --- | --- |
| Transaction Type | Filters records by business transaction type. |
| Income/Expense Type | Filters records by income or expense direction. |
| Time Range | Filters by occurrence time. |
| Search | Queries the list using current filters. |
| Reset | Clears filters and restores the default list. |
| Transaction List | Displays transaction number, occurrence time, direction, type, context, credit change, post-change credits, business transaction number, remarks, and operation. |
| Details | Opens more information for one transaction. |

## Main Operations

### Query Transactions

1. Go to `Billing > User Billing > Transactions`.
2. Select `Transaction Type` in the filter area.
3. Select `Income/Expense Type`.
4. Select a time range when needed.
5. Click `Search`.
6. Click `Reset` to clear filters before a new query.
7. For learning or screenshots, view only filters and list fields; do not export real transaction data.

### View an Individual Transaction

1. Go to `Billing > User Billing > Transactions`.
2. Locate the target row.
3. Check transaction number, occurrence time, income/expense type, transaction type, and context.
4. Review credit change, post-change credits, business transaction number, and remarks.
5. Click row-level `Details` when it is available.
6. Hide real transaction numbers, business transaction numbers, accounts, amounts, and business context in external communication.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Transaction Type | No | Enum | `Transfer` | Filters by business transaction type. |
| Income/Expense Type | No | Enum | `Income` | Filters income or expense records. |
| Time Range | No | Date range | Sanitized time range | Limits transaction occurrence time. |
| Search | No | Button | `Search` | Refreshes the list using current filters. |
| Reset | No | Button | `Reset` | Clears filters. |
| Transaction Number | System-generated | Text | Sanitized transaction number | Unique identifier for one transaction record. |
| Occurrence Time | System-generated | Time | Sanitized time | Time when the transaction occurred. |
| Income/Expense Type | System-generated | Table column | `Income` | Direction of the transaction. |
| Transaction Type | System-generated | Table column | `Consumption` | Business category of the transaction. |
| Context | System-generated | Text | Sanitized context | Related business context. |
| Credit Change | System-generated | Credits | Sanitized amount | Credits added or deducted by the transaction. |
| Post-change Credits | System-generated | Credits | Sanitized amount | Account Credits after the transaction. |
| Business Transaction Number | System-generated | Text | Sanitized number | Number of the related business transaction. |
| Remarks | System-generated | Text | Sanitized remarks | Additional transaction information. |
| Details | No | Entry | `Details` | Opens more information for one transaction. |

## Pitfalls

- A business transaction number is not a payment transaction number and may not be a top-up order number.
- One transaction explains one credit change; use Monthly Bill for monthly totals.
- Income, expense, refund, and reversal directions are easy to confuse. Check transaction type before interpreting the amount.
- If a transaction is missing, widen the time range before concluding that data was lost.
- Do not record real accounts, emails, order numbers, transaction numbers, amounts, customer names, tenant names, Tokens, or Keys.
- Sanitize screenshots, exports, tickets, and comments.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page loading | Filters and the transaction list are displayed. | Refresh the page or check user-side billing permission. |
| Filtering | Transaction type, direction, and time range locate target records. | Click `Reset` and filter again. |
| List fields | Transaction number, time, direction, type, amount, and business transaction number are visible. | Widen the time range or clear filters. |
| Detail entry | Row-level `Details` opens the individual transaction. | Check permission or contact the operator with a sanitized transaction number. |
| No unintended high-risk action | No real transaction data is exported during learning or screenshot capture. | If triggered, record the time and scope and notify the owner for review. |

## FAQ

#### A Target Transaction Cannot Be Found

**Symptom:**

No target record appears after filtering by transaction type, direction, or time range.

**Possible Causes:**

The time range is too narrow, filters do not match, or the related transaction has not posted yet.

**Solution:**

Clear filters, widen the time range, and contact the operator with a sanitized order number or business record if the transaction is still missing.

#### Transaction Direction Differs from Expectations

**Symptom:**

A record is shown as income or expense, but the direction looks wrong.

**Possible Causes:**

Transaction type, refund, reversal, transfer, or adjustment can change the direction.

**Solution:**

Review transaction type and context, then compare the business transaction number with Monthly Bill and Account Overview.

#### Transaction Totals Differ from Monthly Bill

**Symptom:**

The sum of filtered transactions differs from the Monthly Bill summary.

**Possible Causes:**

The billing cycle, time range, transaction type, or statistical scope differs between pages.

**Solution:**

Align the billing cycle and time range, refresh Monthly Bill, and group the comparison by transaction type when needed.

## Next Steps

1. To verify a top-up transaction, open [Top-up Orders](../top-up-orders/).
2. To reconcile the monthly summary, open [Monthly Bill](../monthly-bill/).
3. To review balance status, open [Account Overview](../overview/).

## Notes

- Transaction numbers, business transaction numbers, context, and amounts are sensitive billing information and must be sanitized before sharing.
- Do not use one transaction to explain an entire month; compare it with Monthly Bill.
- When an anomaly is found, record the filters and a sanitized transaction identifier before contacting the operator.
- For learning or screenshots, view only filters, list fields, and details; do not export real transaction data.
