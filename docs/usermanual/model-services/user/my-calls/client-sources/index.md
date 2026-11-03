# Client Sources

> This page appears as **Client Sources** in the left menu; the page title is **My Calls - Client Sources**.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **My Calls** > **Client Sources** |
| Route | `/modelone/model-observation/eu/apps` |
| Managed objects | Call count, share, success rate, tokens, and latency aggregated by client source |

**New to this page**: Client Sources answers "which application or source sent the calls". Select a month and model, then compare sources by volume, success rate, and latency.

## 2. Prerequisites

1. Your account can open **My Calls > Client Sources**.
2. Calls with a source identifier exist in the current period.
3. The month and filters are confirmed.

## 3. Page Description

The title is `My Calls - Client Sources`, marked `Updated hourly`. Filters include month, `By Date`, `Model`, **Expand**, and a `Name or ID` search box.

Columns are `Client Source`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`. Without data, the table shows `No Data Available`.

![My Calls client sources](./images/my-calls-client-sources.png)

**Figure note**: Filters are month, `By Date`, `Model`, **Expand**, and `Name or ID`; headers are `Client Source`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`.

## 4. Main Operations

1. Select a month.
2. Use `By Date` to change granularity.
3. Limit the model scope and use **Expand** for extended filters.
4. Search by source name or ID.
5. Compare volume, share, success rate, and latency.

## 5. Parameter Quick Reference

| Field | Required | Type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Client Source | System | Text | `App A` | Client source name |
| Requests | System | Number | `0` | Source call total |
| Share | System | Percentage | `0%` | Share of total calls |
| Success Rate | System | Percentage | `--` | Successful call share |
| Failed / Rate Limited | System | Number | `0` | Failed and rate-limited calls |
| Total Tokens | System | Number | `0` | Source token total |
| Avg TTFT / TPOT / E2E | System | Duration | `--` | Source average latency |

## 6. Pitfalls

- Calls without a source identifier do not appear here; the Overview total may exceed the source sum.
- `No Data Available` does not mean the source is unavailable.
- `By Date` changes granularity; fix it before comparing.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Filters applied | Rows follow month and model |
| Metrics complete | Each row shows requests, share, success rate, and tokens |
| Latency shown | Avg TTFT, TPOT, and E2E are visible |
| Empty state | `No Data Available` when no data exists |

## 8. FAQ

#### The source list is empty

**Symptom**: The table shows `No Data Available`.

**Resolution**: Confirm calls with source identifiers exist in the month, clear model filters, and retry.

#### Source total differs from Overview

**Symptom**: The source sum is lower than the Overview total.

**Resolution**: Overview includes calls without a source identifier; this page covers identified sources only.

## 9. Notes

- Source names may contain internal application information; do not share screenshots externally.
- Statistics refresh hourly; new calls may be delayed.

## 10. Next Steps

- Review calls by member in [Members](../members/).
- Review calls by project in [Projects](../projects/).
- Review individual calls in [Call Logs](../call-logs/).
