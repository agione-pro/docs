# Customer Calls (Provider) - Models

> This page appears as **Models** in the **Customer Calls (Provider)** group.

> Statistics scope: the month and date range define the period; `By Date` switches the aggregation to daily, and the date range is the start and end shown in the control.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider |
| Navigation | **Model Services** > **Customer Calls** (second group) > **Models** |
| Route | `/modelone/model-observation/provider/models` |
| Managed objects | Customer call count, success rate, tokens, and latency aggregated by requested model |

**New to this page**: Models answers "which models are customers calling". Select a month and customer, then compare models by volume, success rate, and latency.

## 2. Prerequisites

1. Your account has the publisher-side **Customer Calls > Models** permission.
2. Customer calls exist in the current period.
3. The month, model, and customer filters are confirmed.

## 3. Page Description

The title is `Customer Calls - Models`, marked `Updated hourly`. Filters include month, `By Date`, `Model`, `Customer` (`All`), **Expand**, and a `Name or ID` search box.

The first column is `Requested Model`; the remaining columns are `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`. Without data, the table shows `No Data Available`.

![Customer Calls models](./images/provider-calls-models.png)

**Figure note**: Filters include month, `By Date`, `Model`, `Customer`, **Expand**, and `Name or ID`; the first column is `Requested Model`, followed by `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`.

## 4. Main Operations

1. Select a month.
2. Use `By Date` to change granularity.
3. Limit scope with `Model` and `Customer`.
4. Search by model name or ID.
5. Compare volume, share, success rate, and latency.

## 5. Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Customer | No | Selector | `All` | Filter by customer |
| Requested Model | System | Text | `openai/gpt-6.1-sol` | Model ID carried by requests |
| Requests | System | Number | `0` | Customer call total |
| Share | System | Percentage | `0%` | Share of total calls |
| Success Rate | System | Percentage | `--` | Successful call share |
| Failed / Rate Limited | System | Number | `0` | Failed and rate-limited calls |
| Total Tokens | System | Number | `0` | Model token total |
| Avg TTFT / TPOT / E2E | System | Duration | `--` | Model average latency |

## 6. Pitfalls

- This is the publisher view; the other **Customer Calls** group has a different scope.
- `Requested Model` may differ from the display name in an application; use the ID for verification.
- `No Data Available` does not mean the model is unavailable.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Filters applied | Rows follow month, model, and customer |
| Metrics complete | Each row shows requests, share, success rate, and tokens |
| Latency shown | Avg TTFT, TPOT, and E2E are visible |
| Empty state | `No Data Available` when no data exists |

## 8. FAQ

#### The model list is empty

**Symptom**: The table shows `No Data Available`.

**Resolution**: Confirm customer calls exist in the month and clear model and customer filters.

#### Totals differ from Overview

**Symptom**: The model total is lower than the Overview total.

**Resolution**: Overview includes calls without a recognized model ID; this page covers identified models only.

## 9. Notes

- Model IDs and customer data are sensitive; do not share screenshots externally.
- Statistics refresh hourly; new calls may be delayed.

## 10. Next Steps

- Review calls by customer in [Customers](../customers/).
- Review source distribution in [Client Sources](../client-sources/).
- Review individual calls in [Call Logs](../call-logs/).
