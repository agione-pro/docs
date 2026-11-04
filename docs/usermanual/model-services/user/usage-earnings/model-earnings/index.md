# Model Earnings

::: info Document Information
Version: v2.0
Updated: 2026-11-04
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider |
| Navigation | **Model Services** > **Usage & Earnings** > **Model Earnings** |
| Route | `/modelone/accounting/useage/overview/model` |
| Managed objects | Model earnings, tenants, models, income tokens, and earned credits |

**New to this page**: Model Earnings is the revenue dashboard for publishers. Select a billing cycle, read tenant and model counts plus income tokens and credits, then use trends and rankings to find revenue sources.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Credits Earned | Total revenue amount credited to your account according to billing rules after external tenant customers invoke your published models. |
| Income Tokens | Total billable inference token volume (combining input Prompt Tokens and output Completion Tokens). |
| Tenant Activity | Distribution and call frequency of paying customer tenants generating active API requests and commercial deductions during the period. |
| Top 10 Tenant Credit Consumption | Ranking of the top 10 key enterprise customer tenants sorted in descending order of revenue contribution to your organization. |

## Prerequisites

1. Your account can open **Usage & Earnings > Model Earnings**.
2. Published models have customer calls or billing records.
3. The billing cycle and date range are confirmed.

## Page Description

The page shows the `Model Earnings` title and two tabs, `Overview` and `Earning Details`; below the tabs, `Model Earnings` and `Model Usage` provide quick switching, and the left menu also lists both.

| Area | Description |
| --- | --- |
| Top tab & navigation bar | Switches between Overview and Earning Details tabs, plus horizontal quick-links between Model Earnings and Model Usage |
| Billing cycle & settlement filter | Dropdown selector for billing cycle (month) and date range picker for daily granularity settlement filtering |
| Core revenue KPI cards | Displays Number of Tenants, Number of Models, Income Tokens, Credits Earned, and period-over-period changes |
| Revenue analysis chart matrix | Shows Model Revenue Trend, Proportion of Model Revenue pie chart, Tenant Activity distribution, and Top 10 rankings |

`Overview` contains:

- Filters: `Billing cycle` and `Date`.
- KPI cards: `Number of Tenants`, `Number of Models`, `Income Tokens`, and `Credits Earned`; each card shows `Compared to Last Period`.
- Charts: `Model Revenue Trend`, `Proportion of Model Revenue` (`Total`), `Tenant Activity`, `Tenant Credit Consumption Ranking (Top 10)`, `Trend of Model Call Frequency`, and `Distribution of Model Call Times`.

![Model earnings overview](./images/earnings-overview.png)

The figure shows the page provides `Overview` and `Earning Details` tabs; KPI cards show `Number of Tenants`, `Number of Models`, `Income Tokens`, and `Credits Earned`, each with `Compared to Last Period`; the chart area includes `Model Revenue Trend`, `Proportion of Model Revenue`, `Tenant Activity`, and `Tenant Credit Consumption Ranking (Top 10)`.

## Main Operations

### Read the earnings overview

1. Open **Usage & Earnings > Model Earnings**; `Overview` is selected by default.
2. Choose `Billing cycle` and `Date`.
3. Read `Number of Tenants`, `Number of Models`, `Income Tokens`, `Credits Earned`, and their `Compared to Last Period` values.
4. Review revenue trends, revenue share, and tenant consumption rankings.

### Open earning details

1. Click the `Earning Details` tab.
2. Review the details for the selected billing cycle and date.

### Switch to usage details

1. In the left `Usage & Earnings` group, click `Model Usage`.
2. Or continue from the usage overview after switching.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Billing cycle | Yes | Selector | `2026-11` | Billing period |
| Date | No | Date range | `2026-11-01` to `2026-11-03` | Statistics date range |
| Number of Tenants | System | Number | `0` | Tenants that generated revenue |
| Number of Models | System | Number | `0` | Models that generated revenue |
| Income Tokens | System | Number | `0` | Billed token total |
| Credits Earned | System | Amount | `0.00` | Earned credits |
| Compared to Last Period | System | Percentage | `0%` | Change versus the previous period |
| Model Revenue Trend | System | Chart | — | Revenue over time |
| Proportion of Model Revenue | System | Chart | — | Revenue share by model |
| Tenant Activity | System | Chart | — | Tenant activity |
| Tenant Credit Consumption Ranking (Top 10) | System | Ranking | — | Tenants with the highest credit consumption |

## Pitfalls

- KPI cards show both the current value and `Compared to Last Period`; confirm the billing cycle and date range before reading trends.
- When the current scope has no revenue data, metrics show `0` or `0.00` and charts are empty; this does not mean the page is unavailable.
- `Model Earnings` and `Model Usage` are separate menu pages with different scopes; do not mix their figures.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Period synchronization | Switching billing cycles or date ranges synchronously refreshes all four KPI cards, revenue trends, and ranking charts | If data disappears, click reset or switch to a historical month with active billed calls |
| Period-over-period calculation | "Compared to Last Period" displays exact positive/negative percentages or flat markers | If there is no previous baseline period, `--` is normally displayed |
| Chart tooltip interactivity | Hovering cursor over revenue trends or pie slices clearly shows exact amounts and revenue percentages per model | If charts overlap, adjust browser window width or refresh to trigger reflow |
| Top 10 tenant ranking | Accurately lists the top 10 enterprise customer tenants by revenue contribution and consumed credits | If tenant names display masked placeholders, verify whether the account has sensitive customer naming permissions |
| Earnings detail drill-down | Clicking "Earning Details" enters the itemized settlement stream table by order or billing batch | Verify whether the account possesses financial reconciliation permissions |

## FAQ

#### All metrics are 0

**Symptom:** Number of Tenants, Number of Models, Income Tokens, and Credits Earned all display 0 or 0.00.

**Possible Causes:** No external customers invoked your published models during the billing cycle, or models are in a free trial period without configured pricing rules.

**Resolution:**

1. Check whether commercial pricing strategies in [My Models](../../studio/my-models/) are active and configured.
2. Switch to a previous billing cycle with actual paying customer traffic.
3. Check whether external customer invocations were fully offset by promotional free quotas.

#### Charts are empty

**Symptom:** KPI cards display non-zero amounts, but revenue trends and distribution charts render empty.

**Possible Causes:** The selected date range is too narrow to compute time-series intervals, or only a single transaction occurred.

**Resolution:**

1. Widen the date range to the entire month or select full date intervals.
2. Check whether browser ad-blockers blocked Chart Canvas/SVG execution scripts.

## Notes

- Revenue is aggregated by billing cycle; align periods before comparing.
- The page shows summaries and trends, not reconciliation; use the billing and settlement pages for reconciliation.
- Do not screenshot or share customer names, amounts, or contract information.

## Next Steps

1. Check your own internal token consumption and balance deductions in [Model Usage](../model-usage/).
2. Analyze customer traffic sources and growth curves for high-earning models in [Customer Calls (Provider) Overview](../../provider-calls/overview/).
3. Adjust pricing tiers or concurrency rate limits for high-demand models in [My Models](../../studio/my-models/).

Related pages:
- [Model Usage](../model-usage/)
- [Customer Calls (Provider) Overview](../../provider-calls/overview/)
- [Customer Calls Overview](../../customer-calls/overview/)
- [My Models](../../studio/my-models/)
