# Customers

> This page is labeled **Customers** in the left menu. The page heading is **Platform Calls - Customers**.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applicable role | Operator Admin |
| Navigation path | **Model Services** > **Platform Call Analytics** > **Customers** |
| Page route | `/modelone/model-observation/operator/customers` |
| Managed objects | Requests, share, success rate, failed calls, rate-limited calls, tokens, and latency by customer |

**Beginner explanation**: This page breaks call statistics down by customer. It answers which customers call the platform and how their volume and success rate look. The page is read-only and does not maintain customer records.

## 2. Prerequisites

1. The current account can view **Platform Call Analytics > Customers**.
2. The platform has call data. The current test environment shows `No Data Available`.
3. The month, model, and source filters are confirmed before reading the data.

## 3. Page Description

- Filters: month `2026-11 (All Month)`, `By Date`, `Model: name or ID`, `Source: All`, a search icon, a reset icon, and `Expand`.
- Table columns: `Customer`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, `Actions`.
- When there is no data, the table shows `No Data Available`.

![Platform Calls - Customers](./images/platform-calls-customers.png)

**Caption**: The heading is marked `Updated hourly`. The filters contain the month, `By Date`, `Model`, `Source`, and `Expand`. The table starts with `Customer` and shows requests, share, success rate, failed, rate-limited, and latency columns; it currently shows `No Data Available`.

## 4. Main Operations

1. Select the month, for example `2026-11 (All Month)`.
2. Use `By Date` to switch the granularity.
3. Enter a name or ID in `Model`, and select a source in `Source` or keep `All`.
4. Click the search icon to query, the reset icon to clear, or `Expand` for more conditions.
5. Read requests, success rate, failed calls, rate limiting, tokens, and latency for each `Customer`.

## 5. Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Required | Month picker | `2026-11 (All Month)` | Statistics month |
| By Date | Optional | Toggle | `By Date` | Time granularity |
| Model | Optional | Text | `DeepSeek-V4-Pro` | Filter by name or ID |
| Source | Optional | Drop-down | `All` | Filter by source |
| Customer | System-maintained | Text | `AGIOneSystem` | Calling customer |
| Requests / Share / Success Rate | System-maintained | Number / percentage | `1,024` / `32%` / `99.5%` | Volume and quality metrics |
| Failed / Rate Limited | System-maintained | Number | `5` / `2` | Failed and rate-limited calls |
| Total Tokens | System-maintained | Number | `1,200,000` | Total tokens |
| Avg TTFT / TPOT / E2E | System-maintained | Duration | `320 ms` | Latency metrics |

## 6. Pitfalls

- This page is read-only and has no customer edit entry.
- The heading is marked `Updated hourly`; the data is not real-time.
- The `Source` and `Model` filters combine. Clear them when the result is empty.
- The current test environment shows `No Data Available`, meaning the selected range has no call records.

## 7. Result Validation

| Check | What the interface shows |
| --- | --- |
| Page loaded | The heading `Platform Calls - Customers`, `Updated hourly`, and the filters are visible |
| Table structure | Headers include `Customer`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions` |
| Filters | The month, `Model`, and `Source` conditions match the selection |
| Empty state | The table shows `No Data Available` |

## 8. FAQ

#### The page has no data

**Symptom**: The customer statistics table shows `No Data Available`.

**Resolution**:

1. Switch to a month with call records.
2. Clear the `Model` and `Source` conditions and search again.
3. Check [Overview](../overview/) to confirm whether total requests are empty.

#### What is the difference between Customers and Client Sources?

**Symptom**: Both pages show call statistics; it is unclear which one to use.

**Resolution**:

- `Customers` aggregates by the calling customer.
- `Client Sources` aggregates by the client-side source.
- Use [Model Sources](../model-sources/) for upstream model statistics.

## 9. Notes

- This page is read-only and has no customer maintenance entry.
- Results depend on the month, model, and source filters.
- Read latency together with the sample size.

## 10. Next Steps

- Open [Client Sources](../call-sources/) for the client-source dimension.
- Open [Model Sources](../model-sources/) for the upstream model dimension.
