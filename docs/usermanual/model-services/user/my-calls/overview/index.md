# Overview

> This page appears as **Overview** in the left menu; the page title is **My Calls - Overview**.

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **My Calls** > **Overview** |
| Route | `/modelone/model-observation/eu/overview` |
| Managed objects | Your call volume, token consumption, success rate, latency, call composition, and member/project rankings |

**New to this page**: Overview is the dashboard for your own calls. Select a month and filters, read volume, tokens, success rate, and latency, then use trends and rankings to see where calls concentrate.

## 2. Prerequisites

1. Your account can open **My Calls > Overview**.
2. Calls exist in the current period; without data, metrics show `--` or `0`.
3. The month, model, and client source filters are confirmed.

## 3. Page Description

The title is `My Calls - Overview`, marked `Updated hourly`. The page is organized into filters, KPI cards, a trend area, and composition/ranking areas:

- Filters: month `2026-11 (All Month)`, `By Date`, `Model` (`Name or ID`), `Client Source` (`All`), and **Expand**.
- KPI cards: `Total Requests`, `Input Tokens`, `Cached Tokens`, `Output Tokens`, `Peak RPM`, `Peak TPM`, `Success Rate`, `Failed Calls`, `Rate-limited Calls`, `Avg TTFT`, `Avg TPOT`, and `Avg E2E`.
- Trend: `Call & Token Trend`, switchable between `Requests`, `Tokens`, and `Outcomes`.
- Composition: `Call Composition & Sources`, switchable between `Composition` and `Ranking`; shows `Personal Key`, `Project Key`, `Key Attribution Coverage`, `App Coverage`, and `Call Source Distribution (App)`.
- Models: `Model Contributions`, with **View All Models**.
- Ranking: `Member & Project Usage Ranking`, switchable between `Member Top 10` and `Project Top 10`.

![My Calls overview](./images/my-calls-overview.png)

**Figure note**: Filters include month, `By Date`, `Model`, `Client Source`, and **Expand**; KPI cards show `Total Requests`, `Input Tokens`, `Cached Tokens`, `Output Tokens`, `Peak RPM`, `Peak TPM`, `Success Rate`, `Failed Calls`, `Rate-limited Calls`, `Avg TTFT`, `Avg TPOT`, and `Avg E2E`; below are `Call & Token Trend` and `Call Composition & Sources`.

## 4. Main Operations

### 4.1 Set the statistics scope

1. Select a month, such as `2026-11 (All Month)`.
2. Use `By Date` to change the aggregation granularity.
3. Enter a `Name or ID` in `Model` and choose a `Client Source`.
4. Click **Expand** to view extended filters.

### 4.2 Read metrics

1. Read `Total Requests` and the succeeded count below it.
2. Read `Input Tokens`, `Cached Tokens`, `Output Tokens`, `Peak RPM`, and `Peak TPM`.
3. Read `Success Rate`, `Failed Calls`, and `Rate-limited Calls`.
4. Read `Avg TTFT`, `Avg TPOT`, and `Avg E2E`.

### 4.3 Locate anomalies and sources

1. Use **View Failed** and **View Limited** under the corresponding cards.
2. Use **View Slow TTFT**, **View Slow TPOT**, and **View Slow E2E**.
3. In `Call Composition & Sources`, compare `Personal Key` and `Project Key` shares.
4. Use **View All Client Sources**, **View All Models**, and **View All Members** to drill down.

## 5. Parameter Quick Reference

| Field | Required | Type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11 (All Month)` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Client Source | No | Selector | `All` | Filter by client source |
| Total Requests | System | Number | `--` | Total calls in scope |
| Input Tokens | System | Number | `--` | Total input tokens |
| Cached Tokens | System | Number | `--` | Cached tokens and share of input |
| Output Tokens | System | Number | `--` | Total output tokens |
| Peak RPM | System | Number | `0` | Peak requests per minute |
| Peak TPM | System | Number | `--` | Peak tokens per minute |
| Success Rate | System | Percentage | `--` | Share of successful calls |
| Failed Calls | System | Number | `--` | Failed calls and share |
| Rate-limited Calls | System | Number | `--` | Rate-limited calls and share |
| Avg TTFT | System | Duration | `--` | Average time to first token |
| Avg TPOT | System | Duration | `--` | Average time per output token |
| Avg E2E | System | Duration | `--` | Average end-to-end latency |
| Personal Key | System | Share | `0.0%` | Calls attributable to members |
| Project Key | System | Share | `0.0%` | Project key calls, not attributed to members |
| Key Attribution Coverage | System | Percentage | `--` | Share of attributable key calls |
| App Coverage | System | Percentage | `--` | Share of identified client sources |

## 6. Pitfalls

- `Updated hourly` means data refreshes hourly; new calls may not appear immediately.
- `Personal Key` calls are attributable to members; `Project Key` calls are not. Member rankings cover only the attributable part.
- When filters are too narrow, `Member & Project Usage Ranking` shows `No Ranking Data in Current Scope`.
- A `--` metric means there is no calculable data in scope, not that calls failed.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Filters applied | KPI cards and charts follow month, model, and source |
| Trend switchable | `Requests`, `Tokens`, and `Outcomes` switch |
| Composition switchable | `Composition` and `Ranking` switch |
| Ranking switchable | `Member Top 10` and `Project Top 10` switch |
| Drill-down entries | `View Failed`, `View Limited`, `View Slow TTFT`, `View Slow TPOT`, `View Slow E2E` are visible |

## 8. FAQ

#### All metrics show `--`

**Symptom**: Volume, token, and latency metrics are all `--`.

**Resolution**: Confirm calls exist in the current month and filter scope; wait for the next hourly refresh for new calls.

#### Ranking area is empty

**Symptom**: Member or project ranking shows `No Ranking Data in Current Scope`.

**Resolution**: Widen the period or clear model and source filters, then retry.

## 9. Notes

- The page shows calls within your account scope, not platform-wide traffic.
- Volume, token, and latency metrics change with filters; fix the scope before comparing.
- Do not screenshot or share member names, project names, or call details.

## 10. Next Steps

- Review calls by member in [Members](../members/).
- Review calls by project in [Projects](../projects/).
- Review source distribution in [Client Sources](../client-sources/).
- Review individual calls in [Call Logs](../call-logs/).
