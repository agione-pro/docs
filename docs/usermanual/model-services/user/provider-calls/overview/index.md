# Customer Calls (Provider) - Overview

> This page appears as **Overview** in the **Customer Calls (Provider)** group.

> Statistics scope: the month and date range define the period; `By Date` switches the aggregation to daily, and the date range is the start and end shown in the control.

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider |
| Navigation | **Model Services** > **Customer Calls** (second group) > **Overview** |
| Route | `/modelone/model-observation/provider/overview` |
| Managed objects | Publisher-side customer requests, tokens, latency, top customers, client sources, and model distribution |

**New to this page**: This is the publisher-side dashboard for customer traffic. Select a month and model, read requests, success/failure, latency, and tokens, then use top customers, client sources, and model distribution to see where traffic comes from.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Customer Calls Overview (Provider) | The service quality and compute load dashboard from the model provider's perspective, tracking external customer traffic to hosted models. |
| Peak RPM / TPM | Peak Requests Per Minute and peak Tokens Per Minute, reflecting maximum instantaneous concurrency pressure. |
| Cached Tokens | Tokens served directly from the platform's Prompt Cache, significantly slashing compute latency and inference costs. |
| Client Source Coverage | The percentage of inbound requests carrying explicit App/Client source headers, measuring client-side integration maturity. |

## Prerequisites

1. Your account has the publisher-side **Customer Calls > Overview** permission.
2. Customer calls exist in the current period.
3. The month, model, and customer filters are confirmed.

## Page Description

The left menu contains two **Customer Calls** groups. This page is in the second group with the `/modelone/model-observation/provider` route prefix; the other group uses `/modelone/monitoring/monitor`.

The title is `Customer Calls - Overview`, marked `Updated hourly`.

| Area | Description |
| --- | --- |
| Top time & customer filter bar | Month selector, By Date toggle, Model/Customer dropdowns, Expand button, and Name/ID search box |
| Core KPI metrics cards | Aggregates total requests (external success, failed, rate-limited), Peak RPM/TPM, Avg TTFT/TPOT/E2E, total tokens, and cached tokens |
| Call & token trend charts | Line chart switchable across Requests, Token Usage, and Call Outcomes (success vs. failure) perspectives |
| Customers & sources distribution | Displays top customer rankings and client source distribution pie charts with View All navigation links |
| Model usage & distribution matrix | Multi-dimensional matrix switchable by requests, success rate, and tokens across ranking and field views, with active model/customer counters |

- Filters: month, `By Date`, `Model`, `Customer` (`All`), **Expand**, and a `Name or ID` search box.
- KPI cards: `Total Requests` (with `External Success`, `Failed Calls`, `Rate-limited Calls`), `Peak RPM`, `Peak TPM`, `Avg TTFT`, `Avg TPOT` (`Streaming calls only`), `Avg E2E`, `Total Tokens` (with `Cached Tokens`), and `Client Source Coverage`.
- `Call & Token Trend`: switchable between `Requests`, `Tokens`, and `Outcomes`.
- `Top Customers`: with **View All Customers**.
- `Call Sources`: `Call Sources` composition with **View All Client Sources**.
- `Model Usage & Distribution`: switchable between `By Requests`, `By Success Rate`, `By Tokens` and `Ranking`, `Field View`; shows `Active Models`, `Active Customers`, and **View All Models**.

![Customer Calls overview (publisher)](./images/provider-calls-overview.png)

The figure shows filters include month, model, and customer; KPI cards show requests, failures/limits, peaks, latency, tokens, and source coverage; below are customers, sources, and model distribution.

## Main Operations

### Set the statistics scope

1. Select a month.
2. Use `By Date` to change granularity.
3. Limit scope with `Model` and `Customer`.
4. Click **"Expand"** to view extended filters.

### Read metrics

1. Read `Total Requests`, `External Success`, `Failed Calls`, and `Rate-limited Calls`.
2. Read `Peak RPM` and `Peak TPM`.
3. Read `Avg TTFT`, `Avg TPOT`, and `Avg E2E`.
4. Read `Total Tokens`, `Cached Tokens`, and `Client Source Coverage`.

### Locate customers and models

1. Review `Top Customers` or click **"View All Customers"**.
2. Review `Call Sources` or click **"View All Client Sources"**.
3. In `Model Usage & Distribution`, switch `By Requests`, `By Success Rate`, `By Tokens` and `Ranking`, `Field View`.
4. Click **"View All Models"** to drill down.

## Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Customer | No | Selector | `All` | Filter by customer |
| Total Requests | System | Number | `--` | Customer request total |
| External Success | System | Number | `--` | Successful external calls |
| Failed / Rate-limited Calls | System | Number | `--` | Failed and rate-limited calls |
| Peak RPM / TPM | System | Number | `--` | Peak requests and tokens per minute |
| Avg TTFT / TPOT / E2E | System | Duration | `--` | Average latency; TPOT covers streaming calls only |
| Total Tokens | System | Number | `--` | Customer token total |
| Cached Tokens | System | Number | `--` | Cached tokens |
| Client Source Coverage | System | Percentage | `--` | Share of calls with a source ID |
| Top Customers | System | List | — | Customers with the highest volume |
| Call Sources | System | Chart | — | Call share by source |
| Active Models / Active Customers | System | Number | `0` | Models and customers with calls |

## Pitfalls

- Two **Customer Calls** groups exist. This page is the publisher view and differs from the customer-dimension monitoring group.
- `Avg TPOT` covers streaming calls only; non-streaming calls are excluded.
- Without data, model distribution shows `Data is unavailable. Please retry later.` and active counts are `0`.
- `Client Source Coverage` reports source-ID coverage; it does not imply the number of customers.

## Result Validation

| Check Item | Success Signal | Handling on Failure |
| --- | --- | --- |
| Filter synchronization | Switching months or selecting a model/customer redraws all KPI cards and charts in unison | If cards turn blank, click reset to clear filters and check whether external calls occurred |
| Peak & latency metrics | Peak RPM/TPM display integer numbers, and Avg TTFT/TPOT/E2E show millisecond or second durations | If `--` appears, the sample count in scope is insufficient; wait for hourly aggregation or widen the date range |
| Trend chart interactivity | Clicking `Requests`, `Tokens`, and `Outcomes` dynamically re-indexes chart axes and line plots | Verify network stability or refresh the page to reload aggregated datasets |
| Active counters accurate | `Active Models` and `Active Customers` display positive integers, and View All links navigate properly | If counts are 0, verify whether hosted models are released and actively utilized by external tenants |
| Availability messaging | Empty state displays `Data is unavailable. Please retry later.` instead of rendering broken chart canvases | Confirm whether traffic was just generated; hourly aggregation requires background batch job completion |

## FAQ

#### Metrics show `--`

**Symptom:** Total requests, tokens, and latency cards all display `--`.

**Possible Causes:** No external customers called the provider's hosted models during the month; or data was just generated and hourly offline aggregation has not finished.

**Resolution:**

1. Switch to a previous month with verified customer traffic to inspect baseline health.
2. The page refreshes hourly; wait until 5 minutes past the next hour to refresh.
3. Clear granular model and customer filters to reset the scope.

#### Active models and customers are 0

**Symptom:** The model usage and distribution card displays `Active Models: 0` and `Active Customers: 0`.

**Possible Causes:** Overly strict filter combinations excluded all active customers; or the provider's hosted models are currently private or unlisted.

**Resolution:**

1. Check top filters and reset model and customer dropdowns to `All`.
2. Open [My Models](../../studio/my-models/) to verify publication status and tenant visibility grants.

## Notes

- The page contains customer names, volumes, and sources; do not share screenshots externally.
- The two **Customer Calls** groups use different routes; confirm the current route when troubleshooting.
- Metrics follow filters; fix the scope before comparing.

## Next Steps

1. Review enterprise customer rankings and conversion volume in the customer list.
2. Switch to the model view to identify throughput bottlenecks and failure rates across hosted instances.
3. Drill down into call logs to inspect request payloads for rate-limited or timed-out requests.

Related pages:
- [Customer Call Logs](../call-logs/)
- [Customer Calls - Customers](../customers/)
- [Customer Calls - Models](../models/)
- [Customer Calls - Client Sources](../client-sources/)
- [My Models](../../studio/my-models/)
