# My Calls - Projects

> This page appears as **Projects** in the left menu.

> Statistics scope: the month selector defines the period; `By Date` switches the aggregation to daily, and the date range is the start and end shown in the selector.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **My Calls** > **Projects** |
| Route | `/modelone/model-observation/eu/projects` |
| Managed objects | Call count, share, success rate, tokens, and latency aggregated by project |

**New to this page**: Projects answers "which project is calling the models". Select a month and model, then compare projects by volume, success rate, and token consumption.

## 2. Prerequisites

1. Your account can open **My Calls > Projects**.
2. Project-scoped calls exist in the current period.
3. The month and filters are confirmed.

## 3. Page Description

The title is `My Calls - Projects`, marked `Updated hourly`. Filters include month, `By Date`, `Model`, `Client Source`, and a `Name or ID` search box.

Columns are `Project`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`. Without data, the table shows `No Data Available`.

![My Calls projects](./images/my-calls-projects.png)

**Figure note**: Filters are month, `By Date`, `Model`, `Client Source`, and `Name or ID`; headers are `Project`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`.

## 4. Main Operations

1. Select a month.
2. Use `By Date` to change granularity.
3. Limit scope with `Model` and `Client Source`.
4. Search by project name or ID.
5. Compare volume, share, success rate, and latency.

## 5. Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Client Source | No | Selector | `All` | Filter by source |
| Project | System | Text | `Project A` | Calling project |
| Requests | System | Number | `0` | Project call total |
| Share | System | Percentage | `0%` | Share of total calls |
| Success Rate | System | Percentage | `--` | Successful call share |
| Failed / Rate Limited | System | Number | `0` | Failed and rate-limited calls |
| Total Tokens | System | Number | `0` | Project token total |
| Avg TTFT / TPOT / E2E | System | Duration | `--` | Project average latency |

## 6. Pitfalls

- Only calls with a project attribution appear here; unattributed calls are excluded.
- `No Data Available` does not mean the project does not exist.
- `By Date` changes granularity; fix it before comparing.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Filters applied | Rows follow month, model, and source |
| Metrics complete | Each row shows requests, share, success rate, and tokens |
| Latency shown | Avg TTFT, TPOT, and E2E are visible |
| Empty state | `No Data Available` when no data exists |

## 8. FAQ

#### The project list is empty

**Symptom**: The table shows `No Data Available`.

**Resolution**: Confirm project-scoped calls exist in the month, clear model and source filters, and retry.

#### A project is missing

**Symptom**: Searching does not return the target project.

**Resolution**: Check the project name or ID and confirm the project produced calls in the current scope.

## 9. Notes

- Project names and member data are account information; do not share screenshots externally.
- Statistics refresh hourly; new calls may be delayed.

## 10. Next Steps

- Review calls by member in [Members](../members/).
- Review source distribution in [Client Sources](../client-sources/).
- Review individual calls in [Call Logs](../call-logs/).
