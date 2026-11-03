# Overview

> This page is labeled **Overview** in the left menu. The page heading is **Platform Calls - Overview**.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applicable role | Operator Admin |
| Navigation path | **Model Services** > **Platform Call Analytics** > **Overview** |
| Page route | `/modelone/model-observation/operator/overview` |
| Managed objects | Total requests, platform health, tokens, latency, Peak RPM/TPM, active customers, active meta models, source coverage, client coverage, dimension breakdown, and call distribution |

**Beginner explanation**: This is the dashboard for platform calls. Start with the top-line totals and health, then switch the dimension among model sources, meta models, customers, and client sources to find which object produced the traffic or errors.

## 2. Prerequisites

1. The current account can view **Platform Call Analytics > Overview**.
2. The platform has call data. The current test environment shows `--` for KPI values and `No Data Available` / data-unavailable messages in the charts.
3. The month and the model/source filters are confirmed before reading the metrics.

## 3. Page Description

The page has four areas:

- **Filters**: month `2026-11 (All Month)`, `By Date`, `Model: name or ID`, `Source: All`, and `Expand`.
- **KPI cards**: `Total Requests`, `PLATFORM HEALTH`, `Input Tokens`, `Output Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, `Peak RPM`, `Peak TPM`, `Active Customers`, `Active Meta Models`, `Source Coverage`, and `Client Coverage`.
- **Platform Telemetry Overview**: marked `Daily`; when there is no data it shows `No Data Available` or a data-unavailable message.
- **Dimension Breakdown**: tabs `Model Sources`, `Meta Models`, `Customers`, and `Client Sources`, followed by the dimension table and `Model Source & Meta Model Distribution`.

![Platform calls overview](./images/platform-calls-overview.png)

**Caption**: The heading is marked `Updated hourly`. The filters contain the month, `By Date`, `Model`, `Source`, and `Expand`. KPI cards show `--`; `Platform Telemetry Overview` shows `No Data Available`; the dimension table columns include `Model Sources`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg E2E`, and `Actions`.

## 4. Main Operations

### 4.1 Choose the statistics range

1. Select the month, for example `2026-11 (All Month)`.
2. Use `By Date` to switch the time granularity.
3. Enter a name or ID in `Model`.
4. Select a source in `Source`, or keep `All`.
5. Click `Expand` to show additional filters.

### 4.2 Read the KPI cards

1. Start with `Total Requests` and `PLATFORM HEALTH` to see whether the range has traffic.
2. Check `Input Tokens`, `Output Tokens`, and the total token value.
3. Check `Avg TTFT`, `Avg TPOT`, and `Avg E2E` for latency.
4. Check `Peak RPM`, `Peak TPM`, `Active Customers`, `Active Meta Models`, `Source Coverage`, and `Client Coverage`.

### 4.3 Switch dimensions and drill down

1. Switch among `Model Sources`, `Meta Models`, `Customers`, and `Client Sources` under `Dimension Breakdown`.
2. Read requests, share, success rate, failed calls, rate-limited calls, total tokens, and latency for that dimension.
3. Click `View All Model Sources` to open the model source statistics page.
4. Under `Model Source & Meta Model Distribution`, check the source, requested meta model, requests, successful calls, success rate, failed calls, rate-limited calls, and other rejected calls.

## 5. Parameter Quick Reference

### 5.1 Filters

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Required | Month picker | `2026-11 (All Month)` | Statistics month |
| By Date | Optional | Toggle | `By Date` | Time granularity |
| Model | Optional | Text | `DeepSeek-V4-Pro` | Filter by name or ID |
| Source | Optional | Drop-down | `All` | Filter by source |
| Expand | Optional | Button | `Expand` | Shows additional filters |

### 5.2 KPI and table labels

| Metric / field | Type | Page information |
| --- | --- | --- |
| Total Requests | KPI | Total requests in the current range |
| PLATFORM HEALTH | KPI | Success, failed, and rate-limited counts |
| Input Tokens / Output Tokens | KPI | Token usage; the total token value is also shown |
| Avg TTFT / Avg TPOT / Avg E2E | KPI | Latency metrics with a sample count `n=` |
| Peak RPM / Peak TPM | KPI | Peak request and token rates |
| Active Customers / Active Meta Models | KPI | Active objects in the range |
| Source Coverage / Client Coverage | KPI | Coverage metrics |
| Requests / Share / Success Rate / Failed / Rate Limited / Total Tokens | Table columns | Dimension breakdown table |
| Avg TTFT / Avg E2E | Table columns | Dimension breakdown table |

## 6. Pitfalls

- The heading is marked `Updated hourly`; the metrics are not real-time.
- The filters show `Model` and `Source`, but the current test environment has no call data. KPI values show `--` and charts show `No Data Available`.
- `Platform Telemetry Overview` may show a data-unavailable message. This means the chart data is temporarily unavailable; it does not necessarily mean the filter is wrong.
- The dimension breakdown has four tabs. Seeing only `Model Sources` does not mean the other dimensions are unavailable.

## 7. Result Validation

| Check | What the interface shows |
| --- | --- |
| Page loaded | The heading `Platform Calls - Overview`, `Updated hourly`, and the filters are visible |
| Statistics range | The month shows `2026-11 (All Month)`; model and source conditions match the selection |
| KPI has values | Cards show numbers; without data they show `--` |
| Chart has data | `Platform Telemetry Overview` shows a chart; otherwise it shows `No Data Available` or a data-unavailable message |
| Dimension table | Headers include `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, and latency |

## 8. FAQ

#### All KPI values show `--`

**Symptom**: After opening the overview, every KPI card shows `--` and the chart shows `No Data Available`.

**Resolution**:

1. Confirm the selected month has data.
2. Check whether `Model` and `Source` narrow the range too much; clear them or select `All`.
3. If `Platform Telemetry Overview` shows a data-unavailable message, wait and refresh the page.

#### How do I see details for one model source?

**Symptom**: The overview shows only aggregates and you need one source's call data.

**Resolution**:

1. Select `Model Sources` under `Dimension Breakdown`.
2. Click `View All Model Sources` to open **Platform Call Analytics > Model Sources**.
3. Continue filtering by model name or ID on that page.

## 9. Notes

- This is a read-only statistics page. It has no entry for editing models, model sources, or customers.
- The statistics range depends on the month, model, and source filters. Confirm them before reporting numbers.
- Do not judge platform health from a single KPI; read `PLATFORM HEALTH`, failed calls, rate limiting, and latency together.

## 10. Next Steps

- Open [Model Sources](../model-sources/) for call data by model source.
- Open [Meta Models](../meta-models/) for call data by meta model.
- Open [Customers](../customers/) or [Client Sources](../call-sources/) for those dimensions.
- To change a model source, go to **Settings > Model Sources**.
