# Platform Calls - Model Sources

> This page is labeled **Model Sources** in the left menu. The page heading is **Platform Calls - Model Sources**.

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable role | Operator Admin |
| Navigation path | **Model Services** > **Platform Call Analytics** > **Model Sources** |
| Page route | `/modelone/model-observation/operator/sources` |
| Managed objects | Requests, share, success rate, failed calls, rate-limited calls, tokens, and latency by model source |

**Beginner explanation**: This page breaks call statistics down by model source. It answers which upstream source receives the most calls and how its success rate and latency look. It does not create or edit a source; use **Settings > Model Sources** for configuration.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Model Source | An upstream cloud provider or infrastructure access point offering physical compute and API inference. |
| Call Share | The percentage of requests handled by this model source relative to total platform traffic over the period. |
| Avg TPOT | Time Per Output Token, measuring average token emission throughput from the upstream model. |
| Rate Limited Calls | Requests rejected by platform gateway rate limiting when upstream concurrency or QPS reaches thresholds. |

## Prerequisites

1. The current account can view **Platform Call Analytics > Model Sources**.
2. The platform has call data. If the current scope has no data, the list shows `No Data Available`.
3. The month and model filters are confirmed before reading the data.

## Page Description

The top area contains filters; the model source table sits below:

- Filters: month `2026-11 (All Month)`, `By Date`, `Model: name or ID`, a search icon, a reset icon, and `Expand`.
- Table columns: `Model Source`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, `Actions`.
- When there is no data, the table shows `No Data Available`.

| Area | Description |
| --- | --- |
| Top Time & Filter Bar | Provides month selection, daily granularity toggle, model input, and Expand filter button |
| Status & Cadence Tag | Displays "Updated hourly" next to the title, indicating aggregation and ingestion freshness |
| Model Source Statistics Table | Displays requests, global share, success rate, failed and rate-limited counts, tokens, and latency/throughput metrics |

![Platform Calls - Model Sources](./images/platform-calls-model-sources.png)

The figure shows the heading is marked `Updated hourly`. The filters contain the month, `By Date`, `Model`, and `Expand`. The table lists `Model Source`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`; it currently shows `No Data Available`.

## Main Operations

### Choose the statistics range

1. Select the month, for example `2026-11 (All Month)`.
2. Use `By Date` to switch the granularity.
3. Enter a model name or ID in `Model`.
4. Click the **"Search"** icon to query, the **"Reset"** icon to clear, or **"Expand"** to show more filters.

### Read model source statistics

1. Check the request count for each `Model Source`.
2. Check `Share`, `Success Rate`, `Failed`, and `Rate Limited`.
3. Check `Total Tokens`, `Avg TTFT`, `Avg TPOT`, and `Avg E2E`.
4. Return to [Overview](../overview/) for the aggregate view.

### Distinguish from Settings > Model Sources

- **Platform Call Analytics > Model Sources**: read-only statistics by source.
- **Settings > Model Sources**: maintains the source code, endpoints, Base URL, and protocols.

## Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Required | Month picker | `2026-11 (All Month)` | Statistics month |
| By Date | Optional | Toggle | `By Date` | Time granularity |
| Model | Optional | Text | `DeepSeek-V4-Pro` | Filter by name or ID |
| Expand | Optional | Button | `Expand` | Shows additional filters |
| Model Source | System-maintained | Text | `AGIOne` | Upstream model source |
| Requests | System-maintained | Number | `1,024` | Requests in the range |
| Share | System-maintained | Percentage | `32%` | Share of all requests |
| Success Rate | System-maintained | Percentage | `99.5%` | Share of successful calls |
| Failed | System-maintained | Number | `5` | Failed calls |
| Rate Limited | System-maintained | Number | `2` | Rate-limited calls |
| Total Tokens | System-maintained | Number | `1,200,000` | Input and output tokens |
| Avg TTFT / TPOT / E2E | System-maintained | Duration | `320 ms` | Latency metrics |
| Actions | System-maintained | Column | `--` | No action is shown while the table is empty |

## Pitfalls

- This is a statistics page, not a configuration page. If there is no create button, go to **Settings > Model Sources**.
- The heading is marked `Updated hourly`; the data is not real-time.
- The current scope shows `No Data Available`, meaning the selected range has no call records to display.
- The filter row contains only `Model` and the month; do not confuse it with the `Source` filter on the overview page.

## Result Validation

| Check Item | Success Signal | Handling on Failure |
| --- | --- | --- |
| Page loaded | The heading `Platform Calls - Model Sources`, `Updated hourly`, and filters are visible | Refresh the page or check whether the operator account has platform model source analytics permissions |
| Table structure | Headers include `Model Source`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions` | If table columns are missing or misaligned, clear browser cache and reopen |
| Filter responsiveness | Changing month or model keyword immediately recalculates model source rankings and metrics | Click **"Reset"** to clear conditions and avoid over-filtering |
| Empty state | When no traffic exists for the source in the period, `No Data Available` is displayed | Switch to a month with historical calls to verify table rendering |

## FAQ

#### The page has no data

**Symptom:**

The model source statistics table displays `No Data Available` with no provider rows.

**Possible Causes:**

No invocations targeted this model source across the platform in the chosen month, or search filters excluded all records.

**Resolution:**

1. Switch to a recent month with recorded call activity.
2. Click the **"Reset"** icon to clear model and filter inputs.
3. Open [Overview](../overview/) to confirm whether overall platform traffic exists for the period.

#### Why can I not create a model source here?

**Symptom:**

There is no create or edit button for model sources or endpoints on this page.

**Possible Causes:**

This page is an operational monitoring dashboard and does not possess infrastructure management write permissions.

**Resolution:**

Navigate to **Model Services > Settings > Model Sources** to create sources, configure endpoints, and maintain base URLs or protocols.

## Notes

- This page is read-only and has no source configuration entry.
- The result depends on the month and model filters. Confirm them before reporting.
- Read latency together with the sample size; do not rely on a single average.

## Next Steps

1. Check Meta Models to inspect specific meta model traffic composition under this source.
2. Check Customers to identify top tenants consuming compute from this provider.
3. If provider-level downtime or heavy rate-limiting occurs, go to Settings to check endpoint connectivity or switch routing.

Related pages:
- [Meta Models](../meta-models/)
- [Customers](../customers/)
- [Client Sources](../call-sources/)
- [Model Sources Settings](../../settings/model-source/)

- Open [Meta Models](../meta-models/) for call data by meta model.
- Open [Customers](../customers/) or [Client Sources](../call-sources/) for other dimensions.
- To maintain source configuration, go to **Settings > Model Sources**.
