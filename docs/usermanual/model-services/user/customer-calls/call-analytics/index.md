# Call Analytics

::: info Document Information
Version: v2.0
Updated: 2026-11-04
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **Customer Calls** > **Call Analytics** |
| Route | `/modelone/monitoring/monitor/list` |
| Managed objects | Successful, failed, and rate-limited calls by model or customer |

#### Beginner Explanation

Call Analytics groups customer traffic by model list or customer list. Choose the list type, filter by model type, name, or customer, then verify successful, failed, and rate-limited calls.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Models List | Groups metrics by published model as the primary key, showing breakdown by calling customer. |
| Customers List | Groups metrics by calling tenant/customer as the primary key, aggregating call volume and distribution across models. |
| Rate Limit Triggers | The frequency with which requests were rejected by the gateway for exceeding QPS, concurrency, or token rate limits. |
| Model ID | The globally unique routing identifier registered in the gateway (e.g., `openai/gpt-6.1-sol`). |

## Prerequisites

1. Your account can open **Customer Calls > Call Analytics**.
2. Customer calls exist in the current period.
3. The list type and filters are confirmed.

## Page Description

The title is `Customer Calls - Call Analytics`, with two tabs: `Models` and `Customers`.

The top of the filter area provides a month and date range; below are `All Model type`, `Model name`, `Model ID`, **Search**, and **Reset**.

In `Models`, columns are `Model name`, `Model type`, `Customer name`, `Successful calls`, `Failed calls`, `Rate limit triggers`, `Usage`, and `Actions`.

In `Customers`, columns are `Customer name`, `Models`, `Successful calls`, `Failed calls`, `Rate limit triggers`, and `Actions`. Without data, both tabs show `No Data` and `Total 0` with pagination.

![Customer Calls analytics](./images/customer-calls-analytics.png)

The figure shows the page provides `Models` and `Customers` tabs; filters include `All Model type`, `Model name`, and `Model ID`; columns are `Model name`, `Model type`, `Customer name`, `Successful calls`, `Failed calls`, `Rate limit triggers`, `Usage`, and `Actions`.

| Area | Description |
| --- | --- |
| Top Tabs | Switches aggregation perspectives between `Models` and `Customers`. |
| Search & Filters | Filters by statistics month, date range, model type, model name, or model ID. |
| Metrics Table | Displays model/customer, successful calls, failed calls, rate limit triggers, and usage overview. |
| Pagination & Stats | Displays total matching records with options to change page size and jump between pages. |

## Main Operations

### Choose the list type

1. Click the `Models` or `Customers` tab.
2. The headers and grouping change with the tab.

### Filter records

1. Choose a model type in `All Model type`.
2. Enter a model name or model ID.
3. Click **"Search"** or **"Reset"**.

### Read statistics

1. Check `Successful calls`, `Failed calls`, and `Rate limit triggers` per row.
2. Read `Usage` for call or token summary.
3. Use `Actions` to open the record.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Month / date range | Yes | Selector / date range | `2026-11`; `2026-11-01` to `2026-11-03` | Statistics period |
| Model type | No | Selector | `All Model type` | Filter by model type |
| Model name | No | Text | `GPT-6.1 Sol` | Filter by model name |
| Model ID | No | Text | `openai/gpt-6.1-sol` | Filter by model ID |
| Model name (column) | System | Text | `GPT-6.1 Sol` | Model in the list |
| Customer name (column) | System | Text | `Customer A` | Customer in the Customers tab |
| Models (column) | System | Number | `1` | Number of models called by the customer |
| Model type (column) | System | Tag | `Text` | Model category |
| Customer name | System | Text | `Customer A` | Calling customer |
| Successful calls | System | Number | `0` | Successful calls |
| Failed calls | System | Number | `0` | Failed calls |
| Rate limit triggers | System | Number | `0` | Times limits were triggered |
| Usage | System | Text | — | Call or token summary |

## Pitfalls

- Headers and dimensions differ between `Models` and `Customers`; do not check old columns after switching.
- When the scope has no data, the table shows `No Data` and `Total 0`.
- Model name and model ID are separate search fields; model ID is more precise.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Tab switching | Freely switches between `Models` and `Customers`, with table headers adjusting accordingly. | If the table does not refresh, re-click the target tab or refresh the browser. |
| Filters applied | Entering a model name or ID and clicking **"Search"** redraws the table with matching rows. | If no records match, check case sensitivity or click **"Reset"** to clear type restrictions. |
| Metric columns | Each row clearly displays numeric counts for success, failure, and rate limits rather than dashes. | If unexpected values appear, check corresponding gateway rejection logs in Call Logs. |
| Pagination controls | Total count and pagination buttons display properly, responding to page clicks. | If unresponsive, check network stability or refresh the page to rerun the query. |

## FAQ

#### The table is empty

**Symptom:**

The table shows `No Data` and the pagination bar displays `Total 0`.

**Possible Causes:**

No external customer calls occurred during the selected month and date range, or overly strict filter criteria were applied.

**Resolution:**

1. Confirm that external customers actually made calls during the specified time period.
2. Click **"Reset"** to clear all search inputs and restore the model type filter to `All Model type`.

#### Search results differ from expectations

**Symptom:**

Searching by model name does not return the expected call records.

**Possible Causes:**

The entered model name has typos or spaces, matching was ambiguous, or the model only received internal testing calls rather than customer calls.

**Resolution:**

1. Use the globally unique Model ID (such as `openai/gpt-6.1-sol`) for an exact query.
2. Confirm the model type dropdown above has not been erroneously set to an incompatible type.

## Notes

- The page contains customer names and call data; do not share screenshots externally.
- Results follow the current filters; fix the scope before comparing.

## Next Steps

1. Analyze aggregate customer call volumes and top consumer rankings in [Overview](../overview/).
2. Drill down into specific root causes of call failures or rate limits in [Call Logs](../call-logs/).
3. Reconcile customer-generated revenue and settlement figures in [Model Earnings](../../usage-earnings/model-earnings/).

Related pages:
- [Overview](../overview/)
- [Call Logs](../call-logs/)
- [Model Earnings](../../usage-earnings/model-earnings/)
