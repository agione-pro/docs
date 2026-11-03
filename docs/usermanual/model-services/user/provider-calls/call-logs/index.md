# Call Logs

> This page appears as **Call Logs** in the second **Customer Calls** group; the page title is **Customer Calls - Call Logs**.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider |
| Navigation | **Model Services** > **Customer Calls** (second group) > **Call Logs** |
| Route | `/modelone/model-observation/provider/calls` |
| Managed objects | Individual customer calls, customer, client source, status, and latency |

**New to this page**: This log lists each customer request from the publisher perspective. Check performance distribution first, filter or sort by outcome, then verify the customer, source, tokens, and latency of each call.

## 2. Prerequisites

1. Your account has the publisher-side **Customer Calls > Call Logs** permission.
2. Customer call records exist in the current period.
3. The month, model, and customer filters are confirmed.

## 3. Page Description

The title is `Customer Calls - Call Logs`. The page contains:

- Filters: month, `By Date`, `Model`, `Customer` (`All`), **Expand**, and a `Name or ID` search box.
- `Performance Distribution & Extremes`: shows `E2E P99`, `TTFT P99`, and `TPOT P95`, with **See More**.
- `Performance & Extremes`: entries for P99/P95 sorting, minimum latency, and longest call.
- Category and sorting: `Result Category` (`All`, `Failed`, `Platform Rate Limited`, `Timed Out`, `Other Rejected`) and `Sort By` (default `Call Time (Newest First)`).
- Table: `Call Time`, `Model & Platform Route`, `Customer`, `Client Source`, `Usage`, `Status & E2E`, `Actions`.

![Customer Calls logs (publisher)](./images/provider-calls-logs.png)

**Figure note**: Filters include month, `By Date`, `Model`, `Customer`, **Expand**, and `Name or ID`; the page shows `Performance Distribution & Extremes`; `Result Category` provides `All`, `Failed`, `Platform Rate Limited`, `Timed Out`, and `Other Rejected`; columns are `Call Time`, `Model & Platform Route`, `Customer`, `Client Source`, `Usage`, `Status & E2E`, and `Actions`.

## 4. Main Operations

### 4.1 Filter records

1. Select a month.
2. Use `By Date` to change granularity.
3. Limit scope with `Model` and `Customer`.
4. Search by `Name or ID`.

### 4.2 Review performance

1. Read `E2E P99`, `TTFT P99`, and `TPOT P95`.
2. Click **See More** to expand `Performance & Extremes` sorting entries.

### 4.3 Filter and sort by outcome

1. Choose a value in `Result Category`.
2. Choose a rule in `Sort By`; the default is `Call Time (Newest First)`.

### 4.4 Inspect a call

1. Locate the target record.
2. Check `Model & Platform Route`, `Customer`, `Client Source`, `Usage`, and `Status & E2E`.
3. Use `Actions` to open details.

## 5. Parameter Quick Reference

| Field | Required | Type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Customer | No | Selector | `All` | Filter by customer |
| E2E P99 / TTFT P99 | System | Duration | `--` | End-to-end and first-token latency P99 |
| TPOT P95 | System | Duration | `-- ms` | Time per output token P95 |
| Result Category | No | Single select | `All` | Filter by call result |
| Sort By | No | Dropdown | `Call Time (Newest First)` | Control record order |
| Call Time | System | Time | `2026-11-03 10:00:00` | When the call occurred |
| Model & Platform Route | System | Text | `openai/gpt-6.1-sol` | Requested model and route |
| Customer | System | Text | `Customer A` | Calling customer |
| Client Source | System | Text | `App A` | Call source |
| Usage | System | Number | Input/output tokens | Token usage of the call |
| Status & E2E | System | Status | `Succeeded`, `Failed` | Result and latency |

## 6. Pitfalls

- This is the publisher view; the other **Customer Calls** group has a different scope.
- `Performance Distribution & Extremes` shows `--` without data; it does not mean latency is zero.
- `Result Category` filters records only and does not change the month or customer scope.
- `Customer` and `Client Source` are different dimensions.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Filters applied | Records follow month, model, and customer |
| Performance metrics | `E2E P99`, `TTFT P99`, `TPOT P95` are shown |
| Category applied | Selecting an outcome narrows records |
| Sort applied | Table order follows `Sort By` |
| Empty state | `No Data Available` when no records exist |

## 8. FAQ

#### Call logs are empty

**Symptom**: The table shows `No Data Available`.

**Resolution**: Confirm customer calls exist in the month and clear model, customer, and category filters.

#### Performance metrics show `--`

**Symptom**: `E2E P99`, `TTFT P99`, and `TPOT P95` are all `--`.

**Resolution**: There are not enough samples in scope; widen the period or clear filters.

## 9. Notes

- Logs contain customer names and call data; do not share screenshots externally.
- Record only necessary fields during troubleshooting to avoid exposing request content and keys.
- Statistics refresh hourly; new calls may be delayed.

## 10. Next Steps

- Review totals in [Overview](../overview/).
- Aggregate by [Models](../models/), [Customers](../customers/), or [Client Sources](../client-sources/).
- Review revenue in [Model Earnings](../../usage-earnings/model-earnings/).
