# Customer Calls (Monitoring) - Overview

> The system menu currently shows both customer-call groups as **Customer Calls**; this manual labels this group **Customer Calls (Monitoring)**. The left-menu item is **Overview**.

> Statistics scope: the month and date range define the period; `By Date` switches the aggregation to daily, and the date range is the start and end shown in the control.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **Customer Calls** > **Overview** |
| Route | `/modelone/monitoring/monitor/overview` |
| Managed objects | Customer call volume, success rate, token consumption, trends, and Top 5 rankings |

**New to this page**: Customer Calls Overview summarizes traffic from the customer perspective. Read customer count, total calls, and success rate, then review trends and consumption, and use Top 5 to find customers with the highest volume or rate-limit triggers.

## 2. Prerequisites

1. Your account can open **Customer Calls > Overview**.
2. Customer calls exist in the current period.
3. The time range and dimension are confirmed.

## 3. Page Description

The title is `Customer Calls - Overview`, with two tabs: `Customer Analytics` and `Model Analytics`.

`Customer Analytics` contains:

- Time and scope: a time range selector, an `All` filter, and **More**.
- KPI cards: `Customers`, `Total calls`, `Successful calls`, `Failed calls`, `Rate limit triggers`, and `Total Consumed Tokens`.
- `Call Trend`: shows the time range and an `All` filter, with **More**.
- `Consumption Statistics`: `Total Token Consumption` (`Total`, `Input`, `Output`), `Avg Tokens Per Minute` (`Input Tokens`, `Output Tokens`), and `Peak` (`Peak Input Tokens`, `Peak Output Tokens`).
- `Top 5 Customers by Call Volume`: columns `No.`, `Username`, `Total calls`, `Successful calls`, `Failed calls`, `Actions`.
- `Top 5 Rate Limit Triggers`: columns `No.`, `Username`, `Model rate limit triggers`, `Rate limit triggers`, `Actions`.

![Customer Calls overview](./images/customer-calls-overview.png)

**Figure note**: The page provides `Customer Analytics` and `Model Analytics` tabs; KPI cards show `Customers`, `Total calls`, `Successful calls`, `Failed calls`, `Rate limit triggers`, and `Total Consumed Tokens`; below are `Call Trend`, `Consumption Statistics`, `Top 5 Customers by Call Volume`, and `Top 5 Rate Limit Triggers`.

## 4. Main Operations

### 4.1 Review customer analytics

1. Open **Customer Calls > Overview**; `Customer Analytics` is selected by default.
2. Choose the time range and `All` filter.
3. Read `Customers`, `Total calls`, successful/failed calls, `Rate limit triggers`, and `Total Consumed Tokens`.
4. Review `Call Trend` and `Consumption Statistics`.
5. Use `Top 5 Customers by Call Volume` and `Top 5 Rate Limit Triggers` to locate key customers.

### 4.2 Switch to model analytics

1. Click the `Model Analytics` tab.
2. Review the model-dimension statistics.

### 4.3 Open more details

1. Click **More** in the KPI or trend area.
2. Use the expanded options to view additional information or details.

## 5. Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Time range | Yes | Date range | `2026-11-01` to `2026-11-03` | Statistics period |
| Customers | System | Number | `0` | Customers that made calls |
| Total calls | System | Number | `0` | Total customer calls |
| Successful calls | System | Number | `0` | Successful calls |
| Failed calls | System | Number | `0` | Failed calls |
| Rate limit triggers | System | Number | `0` | Times rate limits were triggered |
| Total Consumed Tokens | System | Number | `0` | Customer token consumption |
| Total Token Consumption | System | Number | `0 Tokens` | Total, input, and output |
| Avg Tokens Per Minute | System | Number | `0 Tokens` | Input and output averages |
| Peak | System | Number | `0 Tokens` | Input and output peaks |
| Username | System | Text | `Customer A` | Customer in the Top 5 |
| Model rate limit triggers | System | Number | `0` | Models that triggered limits |
| Rate limit triggers | System | Number | `0` | Times limits were triggered |

## 6. Pitfalls

- `Customer Analytics` and `Model Analytics` use different aggregation scopes; do not compare same-named metrics directly.
- `Total Consumed Tokens` is a token count, not an amount; revenue is on Model Earnings.
- When the scope has no data, Top 5 tables show `No Data` and charts may be empty.
- The time range is based on the current date; confirm it when crossing days.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Tabs switch | `Customer Analytics` and `Model Analytics` switch normally |
| Metrics complete | Customers, total calls, success/failure, rate limits, and tokens are shown |
| Trend readable | `Call Trend` shows the current time range |
| Rankings readable | Both Top 5 tables show headers and data or `No Data` |

## 8. FAQ

#### Metrics and rankings are 0 or empty

**Symptom**: Customer count and total calls are `0`; Top 5 shows `No Data`.

**Resolution**: Confirm customer calls exist in the time range; widen the range and retry.

#### Customer and model analytics differ

**Symptom**: Total calls differ between the two tabs.

**Resolution**: The tabs aggregate by different dimensions; use Customer Analytics for totals and keep the time range consistent.

## 9. Notes

- The page contains customer names and call data; do not share screenshots externally.
- Statistics are aggregated by time range; fix the range before comparing.

## 10. Next Steps

- Review details in [Call Analytics](../call-analytics/).
- Review individual calls in [Call Logs](../call-logs/).
- Review revenue in [Model Earnings](../../usage-earnings/model-earnings/).
