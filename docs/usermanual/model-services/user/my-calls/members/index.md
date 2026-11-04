# My Calls - Members

> This page appears as **Members** in the left menu.

> Statistics scope: the month selector defines the period; `By Date` switches the aggregation to daily, and the date range is the start and end shown in the selector.

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **My Calls** > **Members** |
| Route | `/modelone/model-observation/eu/members` |
| Managed objects | Call count, share, success rate, tokens, and latency aggregated by member |

**New to this page**: Members answers "who is using the models". Select a month, filter by model or source, then compare members by volume, success rate, and latency.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Member Calls | API requests initiated by designated organization members or sub-accounts using personal User Keys. |
| Call Share | The percentage of requests initiated by a specific member relative to all attributable member calls during the period. |
| Project Key Calls | Shared, project-level automated requests that are not attributable to a specific individual account and are excluded from member stats. |
| Avg TTFT | Average Time to First Token for streaming requests initiated by a member, measuring responsiveness. |

## Prerequisites

1. Your account can open **My Calls > Members**.
2. Calls attributable to members exist in the current period.
3. The month and filters are confirmed.

## Page Description

The title is `My Calls - Members`, marked `Updated hourly`.

| Area | Description |
| --- | --- |
| Top time & filter bar | Month selector, By Date granularity toggle, Model/Client Source dropdowns, and Name/ID search box |
| Update interval badge | Displays "Updated hourly" indicating statistical metrics are quasi-realtime aggregated hourly results |
| Member calls summary table | Presents member username, requests, share, success rate, failed/rate-limited counts, total tokens, and TTFT/TPOT/E2E latency |
| Actions & drill-down column | Provides direct navigation to inspect detailed call logs associated with each member |

- Filters include month, `By Date`, `Model`, `Client Source`, and a `Name or ID` search box.
- Columns are `Member`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`. Without data, the table shows `No Data Available`.

![My Calls members](./images/my-calls-members.png)

The figure shows filters are month, `By Date`, `Model`, `Client Source`, and `Name or ID`; headers are `Member`, `Requests`, `Share`, `Success Rate`, `Failed`, `Rate Limited`, `Total Tokens`, `Avg TTFT`, `Avg TPOT`, `Avg E2E`, and `Actions`.

## Main Operations

1. Select a month.
2. Use `By Date` to change granularity.
3. Limit scope with `Model` and `Client Source`.
4. Search by member name or ID.
5. Compare volume, share, success rate, and latency.

## Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Month | Yes | Selector | `2026-11` | Statistics month |
| By Date | No | Toggle | On | Aggregation granularity |
| Model | No | Text | `Name or ID` | Filter by model |
| Client Source | No | Selector | `All` | Filter by source |
| Member | System | Text | `provider_admin` | Calling member |
| Requests | System | Number | `0` | Member call total |
| Share | System | Percentage | `0%` | Share of total calls |
| Success Rate | System | Percentage | `--` | Successful call share |
| Failed / Rate Limited | System | Number | `0` | Failed and rate-limited calls |
| Total Tokens | System | Number | `0` | Member token total |
| Avg TTFT / TPOT / E2E | System | Duration | `--` | Member average latency |

## Pitfalls

- Member rankings cover attributable calls only; `Project Key` calls are excluded.
- `No Data Available` does not mean the member lacks permission.
- `By Date` changes granularity; fix it before comparing.

## Result Validation

| Check Item | Success Signal | Handling on Failure |
| --- | --- | --- |
| Member rows displayed | All members with attributable calls in the month are listed in the table, sorted by requests descending | If the table shows `No Data Available`, verify whether members used personal User Keys or shared Project Keys |
| Metrics precision | Request counts, share percentages, success rates, and token totals show concrete numbers | If success rate is low, inspect failed calls to diagnose key permission expirations or billing locks |
| Latency indicators | Table displays millisecond or second values for Avg TTFT, TPOT, and E2E | If `--` appears, the member's calls did not use streaming or sample volume was too small |
| Member search | Typing a username or member ID in the search box accurately filters down to the target member row | Clear extra characters in the search box and retry |
| Drill-down navigation | Clicking details in Actions navigates to [Call Logs](../call-logs/) with the member filter pre-applied | Confirm whether your account has authorization to inspect member-level audit logs |

## FAQ

#### The member list is empty

**Symptom:** The table shows `No Data Available`.

**Possible Causes:** Organization members routed calls through shared Project Keys or anonymous scripts rather than personal User Keys; or no calls occurred in the month.

**Resolution:**

1. Check [My Calls Overview](../overview/) or [Projects](../projects/) to confirm whether total requests exist.
2. Instruct members to generate dedicated User Keys in user settings for accurate attribution.
3. Clear model and client source filters, then retry.

#### Member total differs from Overview

**Symptom:** The member total differs from the Overview total.

**Possible Causes:** Overview accounts for all tenant-level requests, including background daemons, CI/CD pipelines, and Project Key calls, while this page lists attributable members only.

**Resolution:**

1. Use Overview totals for financial accounting, budget tracking, and invoice validation.
2. Use the Members page for internal team auditing, workload evaluation, and department chargebacks.

## Notes

- Member names are account information; do not share screenshots externally.
- Statistics refresh hourly; new calls may be delayed.

## Next Steps

1. Drill down into call logs to examine prompt contents and error codes for abnormally high-volume members.
2. Switch to the Projects view to inspect compute consumption across departmental initiatives.
3. Review member consumption rankings to determine whether individual rate limits or quota caps are necessary.

Related pages:
- [My Calls Overview](../overview/)
- [Call Logs](../call-logs/)
- [Calls by Project](../projects/)
- [Calls by Model](../models/)
- [Calls by Client Source](../client-sources/)
