# Monthly Bill

::: info Document Information
Version: v2.1
Updated: 2026-11-05
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Provider & User |
| Navigation path | Billing > Monthly Bill |
| Page route | `/billing/my/account/transactions/monthly-summary` |
| Managed objects | Cross-month billing-cycle spend trends, the selected cycle's summary, deduction records, and consumption distributions |

Monthly Bill selects a billing cycle, summarizes spend and top-ups, and groups distributions by consumed service or cost attribution. Use the billing-cycle transaction entries to continue checking records.

#### Beginner Explanation

Monthly Bill works like a monthly account summary: the trend compares multiple cycles, while the content below concerns the selected cycle. No statistics does not mean the entire month's amount is zero.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Billing cycle | The month being viewed; the current month and preceding 12 months are selectable. |
| Billing Cycle Spend Trend | A bar chart spanning billing cycles, not a daily trend within one month. |
| BILLING CYCLE SPEND | The selected cycle's consumption summary in credits. |
| NET CHANGE | The selected cycle's net balance change, displayed separately from spend and top-ups. |
| DEDUCTION RECORDS | The deduction-record count displayed separately in the summary. |
| Grouping view | Select consumed service or cost attribution first, then a dimension within that group. |

## Prerequisites

1. The current account can open `Billing > Monthly Bill` in the Billing subsystem.
2. Identify the billing cycle to check, distinguishing the current cycle from historical months.
3. Use [Transactions](../transactions/) to continue checking individual source records when needed.

## Page Description

In the Billing subsystem, the left-menu group is `Billing`. The page provides `Billing cycle`, while the `Refresh data` entry is shown according to the current data state. `Billing Cycle Spend Trend` is a cross-month bar chart with the instruction `Click a bar to view that billing cycle's bill.`

The current-cycle notice states that the bill is still accumulating and final settlement items will be generated on the 1st of the following month. This describes the billing cycle; it is not a result confirming generation or settlement has completed.

| Area | Description |
| --- | --- |
| Billing cycle | Selects the current month or one of the preceding 12 months. |
| Refresh data and update status | Shows a refresh entry or update time according to the current state; `Calculating data` means statistics are not yet ready. |
| Billing Cycle Spend Trend | Displays spend across billing cycles in credits; click a bar as instructed to view its cycle. |
| Current-cycle notice | Describes ongoing accumulation and the generation date for final settlement items. |
| Cycle summary | BILLING CYCLE SPEND, TOP-UP, NET CHANGE, DEDUCTION RECORDS. |
| Transaction entries | `Transactions` and `View Billing Cycle Transactions` continue the record check. |
| By Consumed Service | First-level group containing `Model` and `AI Infra`. |
| By Cost Attribution | First-level group containing `Project` and `Member`. |
| Distribution area | Displays the current grouping view; its empty state is `No distribution data`. |
| Statistics empty state | Displays `No statistics yet` when the selected cycle has no statistics; do not reinterpret it as an amount of `0`. |

![Monthly Bill statistics empty state](./images/monthly-bill-empty.png)

The figure shows only the `No statistics yet` empty component in the lower statistics area of Monthly Bill.

## Main Operations

### Select a Billing Cycle and Read the Summary

1. Open `Billing > Monthly Bill` in the Billing subsystem.
2. Select the target month in `Billing cycle`; the current month and preceding 12 months are available.
3. Read the page's update status and use `Refresh data` when that entry is shown. `Calculating data` indicates that statistics are still being calculated; do not fill in missing summary values as amounts of `0`.
4. Review the cross-month `Billing Cycle Spend Trend`; follow `Click a bar to view that billing cycle's bill.` and check the cycle selection after choosing a bar.
5. When a summary is present, read `BILLING CYCLE SPEND`, `TOP-UP`, `NET CHANGE`, and `DEDUCTION RECORDS` separately. Treat `No statistics yet` as an empty state, not an entire month's amount of `0`.

### View Distributions Through Two-Level Groups

1. Confirm the selected cycle matches the month being checked.
2. Select the first-level `By Consumed Service` group, then `Model` or `AI Infra` within it.
3. Read the distribution for the selected consumed-service dimension; treat `No distribution data` as the current view's empty state.
4. Select the first-level `By Cost Attribution` group, then `Project` or `Member` within it.
5. Read the updated distribution area; an empty state means the current view has no distribution to display, not that the dimension is absent from the system.

### Continue Checking Billing-Cycle Transactions

1. On a page with a cycle summary, locate `Transactions` or `View Billing Cycle Transactions`.
2. Use the entry to continue viewing records, or open [Transactions](../transactions/).
3. On the transaction page, check date range, transaction type, and direction rather than presuming the entry has set every filter for you.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Billing cycle | Yes | Month selector | `2025-11` | Selects the current month or one of the preceding 12 months; confirm the selector's range. |
| Refresh data | No | Button | `Refresh data` | Refreshes the selected cycle when the entry is shown; interpret the result using the displayed update status. |
| Billing Cycle Spend Trend | Not applicable | Cross-cycle chart | — | Uses credits; follow the instruction to click a bar for its billing cycle. |
| Current-cycle notice | Not applicable | Notice text | — | States that the cycle is accumulating and final settlement items will be generated on the 1st of the following month. |
| BILLING CYCLE SPEND | Not applicable | Credits summary | `0` | The selected cycle's spend; the example is not an actual bill. |
| TOP-UP | Not applicable | Credits summary | `0` | The selected cycle's top-up figure. |
| NET CHANGE | Not applicable | Credits summary | `0` | The selected cycle's net balance change, not the spend amount. |
| DEDUCTION RECORDS | Not applicable | Count summary | `0` | Deduction-record count displayed for the selected cycle. |
| Transactions | No | Transaction entry | `Transactions` | Continues the check of records related to the selected cycle. |
| View Billing Cycle Transactions | No | Transaction entry | `View Billing Cycle Transactions` | Opens records for further review; check filters after entering. |
| By Consumed Service | No | First-level group | `By Consumed Service` | Provides Model and AI Infra dimensions. |
| Model | No | In-group dimension | `Model` | Belongs to By Consumed Service. |
| AI Infra | No | In-group dimension | `AI Infra` | Belongs to By Consumed Service. |
| By Cost Attribution | No | First-level group | `By Cost Attribution` | Provides Project and Member dimensions. |
| Project | No | In-group dimension | `Project` | Belongs to By Cost Attribution. |
| Member | No | In-group dimension | `Member` | Belongs to By Cost Attribution. |
| Distribution area | Not applicable | Statistics area | `No distribution data` | Displays the current grouping view's distribution or an empty state when there is nothing to display. |
| Statistics empty state | Not applicable | Empty-result notice | `No statistics yet` | The selected cycle has no statistics; this does not establish a zero amount. |

## Pitfalls

- The cross-cycle trend and selected-cycle statistics are different areas. Do not read the monthly bars as daily consumption within one month.
- The accumulation notice does not confirm final settlement. Refreshing data should not be interpreted as generating settlement items.
- The `2025-11` example displays `No statistics yet`, not an entire month's amount of `0`; this empty state also does not establish an absence of historical trend data.
- `No distribution data` describes the current distribution area, not the absence of Model, AI Infra, Project, or Member dimensions.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Cycle scope | The selector shows the intended month and offers the current month plus the preceding 12 months. | Recheck the cycle and use `Refresh data` as needed when the page provides that entry. |
| Cross-cycle trend | `Billing Cycle Spend Trend` and its click-a-bar instruction are displayed. | Locate the bar using the instruction, then check the cycle; do not interpret it as a daily trend. |
| Summary or empty state | Statistics show four summary metrics when available, or `No statistics yet` otherwise. | Distinguish numeric values from missing statistics; do not replace the empty state with `0`. |
| Group hierarchy | By Consumed Service contains Model and AI Infra; By Cost Attribution contains Project and Member. | Check the first-level group before its dimension and current empty state. |
| Transaction entries | A summary view contains `Transactions` and `View Billing Cycle Transactions`. | Distinguish the empty statistics state from the summary area; Transactions is also accessible from the menu. |

## FAQ

#### Why Does the Page Say the Bill Is Still Accumulating?

**Symptom:** The page states that the current-cycle bill is accumulating and final settlement items will be generated on the 1st of the following month.

**Possible Causes:** This is the current-cycle notice describing accumulation and the generation date for final settlement items.

**Resolution:** Read the summary as current-cycle information. Neither the notice itself nor a refresh proves that settlement has completed.

#### Does No Statistics Mean the Entire Month's Spend Is Zero?

**Symptom:** The selected cycle's statistics area displays `No statistics yet`.

**Possible Causes:** This is an empty statistics state, not a spend amount of `0`; the cross-cycle trend is a separate display area.

**Resolution:** Check the cycle first, then use `Refresh data` or Transactions for further review. Do not replace missing statistics with a zero-amount conclusion.

#### Why Are There No Four Parallel Grouping Entries?

**Symptom:** The page first shows `By Consumed Service` and `By Cost Attribution`, rather than four parallel Model, AI Infra, Project, and Member entries.

**Possible Causes:** Grouping has two levels: Model and AI Infra belong to consumed service; Project and Member belong to cost attribution.

**Resolution:** Select the first-level group and then its dimension. Read `No distribution data` as the current view's empty state when it appears.

## Notes

- Do not publish real customer information, account emails, private billing amounts, or historical trend values. Use `0` or placeholders in public examples and empty results in figures.
- Read spend, top-ups, net change, and deduction records separately. Do not infer amount formulas, settlement outcomes, or business causes of high costs from empty states.
- Monthly Bill supports billing-cycle summary checks. Continue to Transactions for individual records; the current-cycle summary is not final settlement evidence.

## Next Steps

1. To trace individual records, open [Transactions](../transactions/).
2. To review the current balance, open [Account Overview](../overview/).
3. To review quota usage, open [Quota Governance](../quota-governance/).
