# Client Sources

> This page is labeled **Client Sources** in the left menu. The page heading is **Platform Calls - Call Sources**.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applicable role | Operator Admin |
| Navigation path | **Model Services** > **Platform Call Analytics** > **Client Sources** |
| Page route | `/modelone/model-observation/operator/apps` |
| Managed objects | Requests, share, success rate, failed calls, rate-limited calls, tokens, and latency by client source |

**Beginner explanation**: This page breaks call statistics down by client source. It answers which client sources call the platform and how their volume and success rate look. The page is read-only and does not configure applications or sources.

## 2. Prerequisites

1. The current account can view **Platform Call Analytics > Client Sources**.
2. The platform has call data. The current test environment shows `No Data Available`.
3. The month, model, and source filters are confirmed before reading the data.

## 3. Page Description

- Filters: month `2026-11 (All Month)`, `By Date`, `Model: name or ID`, `Source: All`, a search icon, a reset icon, and `Expand`.
- Table columns: `Client Source`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg E2E`, `Actions`.
- Unlike Model Sources, Meta Models, and Customers, this page has no `Avg TPOT` column.
- When there is no data, the table shows `No Data Available`.

![Platform Calls - Call Sources](./images/platform-calls-call-sources.png)

**Caption**: The heading is marked `Updated hourly`. The filters contain the month, `By Date`, `Model`, `Source`, and `Expand`. The table starts with `Client Source` and shows requests, share, success rate, failed, rate-limited, total tokens, average TTFT, average E2E, and actions; it currently shows `No Data Available`.

## 4. Main Operations

1. Select the month, for example `2026-11 (All Month)`.
2. Use `By Date` to switch the granularity.
3. Enter a name or ID in `Model`, and select a source in `Source` or keep `All`.
4. Click the search icon to query, the reset icon to clear, or `Expand` for more conditions.
5. Read requests, success rate, failed calls, rate limiting, tokens, and latency for each `Client Source`.

## 5. Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Required | Month picker | `2026-11 (All Month)` | Statistics month |
| By Date | Optional | Toggle | `By Date` | Time granularity |
| Model | Optional | Text | `DeepSeek-V4-Pro` | Filter by name or ID |
| Source | Optional | Drop-down | `All` | Filter by source |
| Client Source | System-maintained | Text | `AGIOne` | Calling client source |
| Requests / Share / Success Rate | System-maintained | Number / percentage | `1,024` / `32%` / `99.5%` | Volume and quality metrics |
| Failed / Rate Limited | System-maintained | Number | `5` / `2` | Failed and rate-limited calls |
| Total Tokens | System-maintained | Number | `1,200,000` | Total tokens |
| Avg TTFT / Avg E2E | System-maintained | Duration | `320 ms` | Latency metrics |

## 6. Pitfalls

- This page has no `Avg TPOT` column. Use [Model Sources](../model-sources/) or [Meta Models](../meta-models/) when you need TPOT.
- The heading is marked `Updated hourly`; the data is not real-time.
- The `Source` and `Model` filters combine. Clear them when the result is empty.
- The current test environment shows `No Data Available`, meaning the selected range has no call records.

## 7. Result Validation

| Check | What the interface shows |
| --- | --- |
| Page loaded | The heading `Platform Calls - Call Sources`, `Updated hourly`, and the filters are visible |
| Table structure | Headers include `Client Source`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg E2E`, and `Actions` |
| Filters | The month, `Model`, and `Source` conditions match the selection |
| Empty state | The table shows `No Data Available` |

## 8. FAQ

#### The page has no data

**Symptom**: The client source table shows `No Data Available`.

**Resolution**:

1. Switch to a month with call records.
2. Clear the `Model` and `Source` conditions and search again.
3. Check [Overview](../overview/) to confirm whether total requests are empty.

#### Why is there no average TPOT column?

**Symptom**: Other statistics pages show `Avg TPOT`, but this page does not.

**Resolution**: This table shows only `Avg TTFT` and `Avg E2E`. Use [Model Sources](../model-sources/) or [Meta Models](../meta-models/) when you need TPOT.

## 9. Notes

- This page is read-only and has no application or source configuration entry.
- Results depend on the month, model, and source filters.
- Read latency together with the sample size.

## 10. Next Steps

- Open [Customers](../customers/) for the customer dimension.
- Open [Overview](../overview/) to return to the dashboard.
