# Customer Calls (Monitoring) - Call Logs

> The system menu currently shows both customer-call groups as **Customer Calls**; this manual labels this group **Customer Calls (Monitoring)**. The left-menu item is **Call Logs**.

> Statistics scope: the month and date range define the period; `By Date` switches the aggregation to daily, and the date range is the start and end shown in the control.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **Customer Calls** > **Call Logs** |
| Route | `/modelone/monitoring/monitor/log` |
| Managed objects | Individual customer calls, customer, usage, and execution status |

**New to this page**: Customer Calls logs list each customer request. Filter by model type and call status, then verify the customer, token usage, and latency in the table.

## 2. Prerequisites

1. Your account can open **Customer Calls > Call Logs**.
2. Customer call records exist in the current period.
3. Model type and call status filters are confirmed.

## 3. Page Description

The title is `Customer Calls - Call Logs`, with a `Model Logs` tab.

The top of the filter area provides a month and date range; below are `All Model type`, `All Call status`, a model name search box, **Search**, **Reset**, and **Expand**.

Columns are `Call time`, `Model & Platform Route`, `Customer`, `Usage`, `Status & E2E`, and `Actions`. Without data, the table shows `No Data` and `Total 0` with pagination.

![Customer Calls logs](./images/customer-calls-logs.png)

**Figure note**: Filters include `All Model type`, `All Call status`, a `Model name` box with the hint `e.g. qwen/happyhorse-1.1-i2v/70233`, and **Expand**; columns are `Call time`, `Model & Platform Route`, `Customer`, `Usage`, `Status & E2E`, and `Actions`.

## 4. Main Operations

### 4.1 Filter records

1. Choose a model type in `All Model type`.
2. Choose a status in `All Call status`.
3. Enter a model name or route ID.
4. Click **Search** or **Reset**.

### 4.2 Review a record

1. Locate the target call in the table.
2. Check `Call time`, `Model & Platform Route`, and `Customer`.
3. Review `Usage` and `Status & E2E`.
4. Use `Actions` to open details.

## 5. Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month / date range | Yes | Selector / date range | `2026-11`; `2026-11-01` to `2026-11-03` | Statistics period |
| Model type | No | Selector | `All Model type` | Filter by model type |
| Call status | No | Selector | `All Call status` | Filter by execution status |
| Model name | No | Text | `qwen/happyhorse-1.1-i2v/70233` | Filter by model name or route |
| Call time | System | Time | `2026-11-03 10:00:00` | When the call occurred |
| Model & Platform Route | System | Text | `openai/gpt-6.1-sol` | Requested model and route |
| Customer | System | Text | `Customer A` | Calling customer |
| Usage | System | Number | Input/output tokens | Token usage of the call |
| Status & E2E | System | Status | `Succeeded`, `Failed` | Result and latency |

## 6. Pitfalls

- `All Call status` filters status only; model type still applies.
- When the scope has no records, the table shows `No Data` and `Total 0`.
- The model search box accepts route IDs such as `qwen/happyhorse-1.1-i2v/70233`; use that format for precision.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Filters applied | Records follow model type and call status |
| Records complete | Each row shows time, route, customer, usage, and status |
| Empty state | `No Data` and `Total 0` when no records exist |
| Pagination | Total count and page size are shown |

## 8. FAQ

#### Call logs are empty

**Symptom**: The table shows `No Data`.

**Resolution**: Confirm customer calls exist in the period and clear model type, status, and name filters.

#### A call cannot be found

**Symptom**: Searching by model name returns no record.

**Resolution**: Search by model route ID or widen the model type and status scope.

## 9. Notes

- Logs contain customer names and call data; do not share screenshots externally.
- Record only necessary fields during troubleshooting to avoid exposing request content and keys.

## 10. Next Steps

- Review totals in [Overview](../overview/).
- Aggregate by model or customer in [Call Analytics](../call-analytics/).
- Review revenue in [Model Earnings](../../usage-earnings/model-earnings/).
