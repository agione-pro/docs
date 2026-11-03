# Meta Models

> This page is labeled **Meta Models** in the left menu. The page heading is **Platform Calls - Meta Models**.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applicable role | Operator Admin |
| Navigation path | **Model Services** > **Platform Call Analytics** > **Meta Models** |
| Page route | `/modelone/model-observation/operator/meta-models` |
| Managed objects | Requests, share, success rate, failed calls, rate-limited calls, tokens, and latency by meta model |

**Beginner explanation**: This page breaks call statistics down by meta model. It answers which meta model receives the most calls and how its success rate and latency look. The meta model itself is maintained in **Settings > Meta Models**; this page is read-only.

## 2. Prerequisites

1. The current account can view **Platform Call Analytics > Meta Models**.
2. The platform has call data. The current test environment shows `No Data Available`.
3. The month, model, and source filters are confirmed before reading the data.

## 3. Page Description

- Filters: month `2026-11 (All Month)`, `By Date`, `Model: name or ID`, `Source: All`, a search icon, a reset icon, and `Expand`.
- Table columns: `Meta Model`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, `Actions`.
- When there is no data, the table shows `No Data Available`.

![Platform Calls - Meta Models](./images/platform-calls-meta-models.png)

**Caption**: The heading is marked `Updated hourly`. The filters contain the month, `By Date`, `Model`, `Source`, and `Expand`. The table starts with `Meta Model` and shows requests, share, success rate, failed, rate-limited, and latency columns; it currently shows `No Data Available`.

## 4. Main Operations

1. Select the month, for example `2026-11 (All Month)`.
2. Use `By Date` to switch the granularity.
3. Enter a name or ID in `Model`, and select a source in `Source` or keep `All`.
4. Click the search icon to query, the reset icon to clear, or `Expand` for more conditions.
5. Read requests, share, success rate, failed calls, rate limiting, tokens, and latency for each `Meta Model`.

## 5. Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Required | Month picker | `2026-11 (All Month)` | Statistics month |
| By Date | Optional | Toggle | `By Date` | Time granularity |
| Model | Optional | Text | `DeepSeek-V4-Pro` | Filter by name or ID |
| Source | Optional | Drop-down | `All` | Filter by source |
| Meta Model | System-maintained | Text | `DeepSeek-V4-Pro` | Meta model that received calls |
| Requests / Share / Success Rate | System-maintained | Number / percentage | `1,024` / `32%` / `99.5%` | Volume and quality metrics |
| Failed / Rate Limited | System-maintained | Number | `5` / `2` | Failed and rate-limited calls |
| Total Tokens | System-maintained | Number | `1,200,000` | Total tokens |
| Avg TTFT / TPOT / E2E | System-maintained | Duration | `320 ms` | Latency metrics |

## 6. Pitfalls

- This page is read-only and has no meta model edit entry; use **Settings > Meta Models** to change capabilities.
- The heading is marked `Updated hourly`; the data is not real-time.
- The `Source` and `Model` filters combine. Clear them when the result is empty.
- The current test environment shows `No Data Available`, meaning the selected range has no call records.

## 7. Result Validation

| Check | What the interface shows |
| --- | --- |
| Page loaded | The heading `Platform Calls - Meta Models`, `Updated hourly`, and the filters are visible |
| Table structure | Headers include `Meta Model`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions` |
| Filters | The month, `Model`, and `Source` conditions match the selection |
| Empty state | The table shows `No Data Available` |

## 8. FAQ

#### The page has no data

**Symptom**: The meta model statistics table shows `No Data Available`.

**Resolution**:

1. Switch to a month with call records.
2. Clear the `Model` and `Source` conditions and search again.
3. Check [Overview](../overview/) to confirm whether total requests are empty.

#### What is the difference from Meta Models under Settings?

**Symptom**: Two pages are named “Meta Models”; it is unclear which one to use.

**Resolution**:

- **Platform Call Analytics > Meta Models** shows call data and is read-only.
- **Settings > Meta Models** maintains names, capabilities, modalities, token limits, and protocols.

## 9. Notes

- This page is read-only and has no edit or delete entry.
- Results depend on the month, model, and source filters.
- Read latency together with the sample size.

## 10. Next Steps

- Open [Customers](../customers/) or [Client Sources](../call-sources/) for other dimensions.
- To change a meta model, go to **Settings > Meta Models**.
