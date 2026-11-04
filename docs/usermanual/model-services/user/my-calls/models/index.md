# My Calls - Models

::: info Document Information
Version: v2.0
Updated: 2026-11-04
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **My Calls** > **Models** |
| Route | `/modelone/model-observation/eu/models` |
| Managed objects | Call count, share, success rate, tokens, and latency aggregated by requested model ID |

**New to this page**: Models answers "which models were called". Select a month, filter by source, then compare models by volume, success rate, and latency.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Requested Model | The exact model identifier string passed by the client in the request body (e.g., `openai/gpt-6.1-sol`). |
| Call Share | The percentage of requests for a specific model ID relative to the tenant's total model requests during the period. |
| Avg TTFT | Average Time to First Token across streaming requests for this model, measuring interactive responsiveness. |
| Avg TPOT | Average Time Per Output Token during streaming generation, measuring token generation throughput and smoothness. |

## Prerequisites

1. Your account can open **My Calls > Models**.
2. Model calls exist in the current period.
3. The month and filters are confirmed.

## Page Description

The title is `My Calls - Models`, marked `Updated hourly`.

| Area | Description |
| --- | --- |
| Top time & filter bar | Month selector, By Date granularity toggle, Model/Client Source dropdowns, Expand button, and Name/ID search box |
| Update interval badge | Displays "Updated hourly" indicating statistical metrics are quasi-realtime aggregated hourly results |
| Model dimension summary table | Presents requested model ID, requests, share, success rate, failed/rate-limited counts, total tokens, and TTFT/TPOT/E2E latency |
| Actions & drill-down column | Provides direct navigation to inspect detailed call logs associated with each model ID |

- Filters include month, `By Date`, `Model`, `Client Source`, **Expand**, and a `Name or ID` search box.
- The first column is `Requested Model`; the remaining columns are `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`. Without data, the table shows `No Data Available`.

![My Calls models](./images/my-calls-models.png)

The figure shows filters are month, `By Date`, `Model`, `Client Source`, **Expand**, and `Name or ID`; the first column is `Requested Model`, followed by `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`.

## Main Operations

1. Select a month.
2. Use `By Date` to change granularity.
3. Limit scope with `Model` and `Client Source`; use **"Expand"** as needed.
4. Search by model name or ID.
5. Compare volume, share, success rate, and latency.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Client Source | No | Selector | `All` | Filter by source |
| Requested Model | System | Text | `openai/gpt-6.1-sol` | Model ID carried by requests |
| Requests | System | Number | `0` | Model call total |
| Share | System | Percentage | `0%` | Share of total calls |
| Success Rate | System | Percentage | `--` | Successful call share |
| Failed / Rate Limited | System | Number | `0` | Failed and rate-limited calls |
| Total Tokens | System | Number | `0` | Model token total |
| Avg TTFT / TPOT / E2E | System | Duration | `--` | Model average latency |

## Pitfalls

- `Requested Model` is the ID in the request and may differ from the display name in your application.
- One model can be called under multiple IDs; this page counts each ID separately.
- `No Data Available` does not mean the model is unavailable.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Model rows complete | All models called during the period are listed in the table, sorted by request volume descending | If the table shows `No Data Available`, verify whether calls occurred and clear other filter inputs |
| Metrics precision | Request counts, share percentages, success rates, and total tokens display concrete values | If success rate is `--` or low, inspect failed and rate-limited calls to diagnose endpoint issues |
| Latency indicators | Average TTFT, TPOT, and E2E display millisecond or second duration values | If `--` appears, the model has no streaming requests or sample count is too low |
| Targeted search | Typing a model keyword or vendor prefix isolates the corresponding model row | Confirm that the search query matches the exact `model` string in the request payload |
| Drill-down navigation | Clicking details in Actions navigates to [Call Logs](../call-logs/) with the model filter pre-applied | If logs are empty, verify the retention window and time range for the model |

## FAQ

#### The model list is empty

**Symptom:** The table displays `No Data Available` when switching to the current month.

**Possible Causes:** No model calls were made in the selected month; or the search box contains a non-existent model ID.

**Resolution:**

1. Switch to a month with established production traffic.
2. Clear model and client source dropdowns, and reset the search query.
3. Open [My Calls Overview](../overview/) to check baseline request volume.

#### Requested model differs from the application name

**Symptom:** The model name configured in your application differs from `Requested Model` in the table.

**Possible Causes:** The client application uses an alias or wrapper, whereas platform metrics aggregate by the exact underlying model route ID or endpoint identifier received at the gateway.

**Resolution:**

1. Check the client SDK or HTTP body to identify the literal `model` field transmitted.
2. Visit [Models Marketplace](../../discover/models/) to inspect alias definitions and routing mappings.

## Notes

- Model IDs may contain internal routing information; do not share screenshots externally.
- Statistics refresh hourly; new calls may be delayed.

## Next Steps

1. Drill down into call logs to inspect failed requests or extreme latencies for specific models.
2. Switch to client sources or projects to analyze which business units consume the model.
3. Compare model pricing and latency in the catalog to evaluate alternative models.

Related pages:
- [My Calls Overview](../overview/)
- [Call Logs](../call-logs/)
- [Calls by Client Source](../client-sources/)
- [Calls by Project](../projects/)
- [Models Marketplace](../../discover/models/)
