# Customers

> This page appears as **Customers** in the second **Customer Calls** group; the page title is **Customer Calls - Customers**.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider |
| Navigation | **Model Services** > **Customer Calls** (second group) > **Customers** |
| Route | `/modelone/model-observation/provider/customers` |
| Managed objects | Call count, share, success rate, tokens, and latency aggregated by customer |

**New to this page**: Customers answers "which customers are calling my models". Select a month and model, then compare customers by volume, success rate, and token consumption.

## 2. Prerequisites

1. Your account has the publisher-side **Customer Calls > Customers** permission.
2. Customer calls exist in the current period.
3. The month and filters are confirmed.

## 3. Page Description

The title is `Customer Calls - Customers`, marked `Updated hourly`. Filters include month, `By Date`, `Model`, **Expand**, and a `Name or ID` search box.

The first column is `Customer`; the remaining columns are `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`. Without data, the table shows `No Data Available`.

![Customer Calls customers](./images/provider-calls-customers.png)

**Figure note**: Filters include month, `By Date`, `Model`, **Expand**, and `Name or ID`; the first column is `Customer`, followed by `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`.

## 4. Main Operations

1. Select a month.
2. Use `By Date` to change granularity.
3. Limit the model scope and use **Expand** as needed.
4. Search by customer name or ID.
5. Compare volume, share, success rate, and latency.

## 5. Parameter Quick Reference

| Field | Required | Type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Customer | System | Text | `Customer A` | Calling customer |
| Requests | System | Number | `0` | Customer call total |
| Share | System | Percentage | `0%` | Share of total calls |
| Success Rate | System | Percentage | `--` | Successful call share |
| Failed / Rate Limited | System | Number | `0` | Failed and rate-limited calls |
| Total Tokens | System | Number | `0` | Customer token total |
| Avg TTFT / TPOT / E2E | System | Duration | `--` | Customer average latency |

## 6. Pitfalls

- Only calls with an identified customer appear here; unattributed calls are excluded.
- `No Data Available` does not mean the customer made no calls.
- `By Date` changes granularity; fix it before comparing.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Filters applied | Rows follow month and model |
| Metrics complete | Each row shows requests, share, success rate, and tokens |
| Latency shown | Avg TTFT, TPOT, and E2E are visible |
| Empty state | `No Data Available` when no data exists |

## 8. FAQ

#### The customer list is empty

**Symptom**: The table shows `No Data Available`.

**Resolution**: Confirm customer calls exist in the month and clear model filters.

#### Customer total differs from Overview

**Symptom**: The customer sum is lower than the Overview total.

**Resolution**: Overview includes unattributed calls; this page covers identified customers only.

## 9. Notes

- Customer names and call data are sensitive; do not share screenshots externally.
- Statistics refresh hourly; new calls may be delayed.

## 10. Next Steps

- Review calls by model in [Models](../models/).
- Review source distribution in [Client Sources](../client-sources/).
- Review individual calls in [Call Logs](../call-logs/).
