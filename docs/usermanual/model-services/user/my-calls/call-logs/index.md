# My Calls - Call Logs

> This page appears as **Call Logs** in the left menu.

> Statistics scope: the month selector defines the period; `By Date` switches the aggregation to daily, and the date range is the start and end shown in the selector.

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **My Calls** > **Call Logs** |
| Route | `/modelone/model-observation/eu/calls` |
| Managed objects | Individual calls, caller, client source, status, and latency |

**New to this page**: Call Logs is the record of individual calls. Check performance distribution and extremes first, filter or sort by outcome, then verify the model, source, tokens, and latency of each call in the table.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Call Logs | Comprehensive audit stream recording the end-to-end lifecycle of every individual API call initiated by members and apps. |
| E2E P99 | The 99th percentile of end-to-end request duration, reflecting worst-case round-trip latency for long-tail calls. |
| TTFT P99 | The 99th percentile of time to first token across streaming responses, measuring cold start and scheduling overhead. |
| TPOT P95 | The 95th percentile of time per output token, measuring stable token throughput and decoding speed during streaming. |

## Prerequisites

1. Your account can open **My Calls > Call Logs**.
2. Calls exist in the current period.
3. The month, model, and client source filters are confirmed.

## Page Description

The title is `My Calls - Call Logs`. The page contains:

| Area | Description |
| --- | --- |
| Top time & filter bar | Month selector, By Date granularity toggle, Model/Client Source dropdowns, and Name/ID search box |
| Performance & extremes cards | Aggregates E2E P99, TTFT P99, and TPOT P95 metrics, with See More links for extreme latency cases |
| Result category & sort toolbar | Filters by All, Failed, Platform Rate Limited, Timed Out, Other Rejected, with customizable ascending/descending order |
| Call records audit table | Displays call timestamp, model & route, caller attribution, client source, token usage, status, and latency timeline |

- Filters: month, `By Date`, `Model`, `Client Source`, **Expand**, and a `Name or ID` search box.
- `Performance Distribution & Extremes`: shows `E2E P99`, `TTFT P99`, and `TPOT P95`, with **See More**.
- `Performance & Extremes`: entries for P99/P95 sorting, minimum latency, and longest call.
- Category and sorting: `Result Category` (`All`, `Failed`, `Platform Rate Limited`, `Timed Out`, `Other Rejected`) and `Sort By` (default `Call Time (Newest First)`).
- Table: `Call Time`, `Model & Platform Route`, `Caller`, `Client Source`, `Usage`, `Status & E2E`, `Actions`.

![My Calls call logs](./images/my-calls-call-logs.png)

The figure shows the page shows `Performance Distribution & Extremes` with `E2E P99`, `TTFT P99`, and `TPOT P95`; `Result Category` provides `All`, `Failed`, `Platform Rate Limited`, `Timed Out`, and `Other Rejected`; columns are `Call Time`, `Model & Platform Route`, `Caller`, `Client Source`, `Usage`, `Status & E2E`, and `Actions`.

## Main Operations

### Filter calls

1. Select a month.
2. Use `By Date` to change granularity.
3. Limit scope with `Model` and `Client Source`.
4. Search by `Name or ID`.

### Review performance

1. Read `E2E P99`, `TTFT P99`, and `TPOT P95` under `Performance Distribution & Extremes`.
2. Click **"See More"** to expand `Performance & Extremes` sorting entries.

### Filter and sort by outcome

1. Choose `All`, `Failed`, `Platform Rate Limited`, `Timed Out`, or `Other Rejected` in `Result Category`.
2. Choose a rule in `Sort By`; the default is `Call Time (Newest First)`.

### Inspect a call

1. Locate the target record in the table.
2. Check `Model & Platform Route`, `Caller`, `Client Source`, `Usage`, and `Status & E2E`.
3. Use `Actions` to open the record details.

## Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Client Source | No | Selector | `All` | Filter by source |
| E2E P99 / TTFT P99 | System | Duration | `--` | End-to-end and first-token latency P99 |
| TPOT P95 | System | Duration | `-- ms` | Time per output token P95 |
| Result Category | No | Single select | `All` | Filter by call result |
| Sort By | No | Dropdown | `Call Time (Newest First)` | Control record order |
| Call Time | System | Time | `2026-11-03 10:00:00` | When the call occurred |
| Model & Platform Route | System | Text | `openai/gpt-6.1-sol` | Requested model and route |
| Caller | System | Text | Member or project | Call attribution |
| Client Source | System | Text | App name | Call source |
| Usage | System | Number | Input/output tokens | Token usage of the call |
| Status & E2E | System | Status | `Succeeded`, `Failed` | Result and latency |

## Pitfalls

- `Performance Distribution & Extremes` shows `--` when there is no data; it does not mean latency is zero.
- `Result Category` filters records only and does not change the month.
- `Caller` and `Client Source` are different dimensions: member/project versus application source.
- The table is sorted by `Call Time (Newest First)` by default; verify the order after changing `Sort By`.

## Result Validation

| Check Item | Success Signal | Handling on Failure |
| --- | --- | --- |
| Filters applied | Changing month, model, or source dynamically refreshes the table records and top percentile metrics | If the table is empty, click reset to clear filters and verify whether calls were generated in the selected month |
| Percentile cards populated | Metric cards display millisecond (ms) or second (s) P99/P95 latencies | If `--` appears, the sample count in the filtered range is insufficient to compute statistical percentiles |
| Category filtering | Selecting `Failed` or `Platform Rate Limited` isolates and displays only records matching that abnormal status | If no records appear, no incidents of that category occurred in the current scope |
| Details drawer accessible | Clicking the action button opens a drawer revealing request headers, response payload metadata, and phase timings | If details cannot be opened, verify that your account has audit inspection permissions |
| Sorting rules applied | Changing sort order re-indexes the table immediately according to duration, timestamp, or token usage | Confirm whether table column headers have locked default sorting active |

## FAQ

#### Call logs are empty

**Symptom:** The table displays `No Data Available`, and top performance metrics all show `--`.

**Possible Causes:** No model calls were made in the selected month; or active filter parameters are overly restrictive.

**Resolution:**

1. Switch to a month with confirmed production or testing traffic.
2. Clear model, source, and search inputs, and set the result category back to `All`.
3. Open [My Calls Overview](../overview/) to verify the baseline call volume for the period.

#### Performance metrics show `--`

**Symptom:** The table displays several calls, but E2E P99, TTFT P99, and TPOT P95 cards remain `--`.

**Possible Causes:** The statistical algorithm requires a minimum sample threshold (e.g., dozens of requests) to compute percentiles; or hourly aggregation has not finished.

**Resolution:**

1. Expand the date range or clear granular model filters.
2. Hourly aggregation jobs run periodically; wait for the next hourly update cycle and refresh.

## Notes

- Logs contain member, project, and source information; do not share screenshots externally.
- Record only the necessary fields during troubleshooting to avoid exposing request content.
- Statistics refresh hourly; new calls may be delayed.

## Next Steps

1. Examine high-level volume trends, success rates, and model shares in the overview dashboard.
2. Switch to member or project views to identify top consumers or abnormal token consumption.
3. If rate-limiting or failure spikes appear, inspect routing limits or contact model providers to evaluate capacity expansion.

Related pages:
- [My Calls Overview](../overview/)
- [Calls by Member](../members/)
- [Calls by Project](../projects/)
- [Calls by Model](../models/)
- [Calls by Client Source](../client-sources/)
