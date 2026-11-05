# Model Usage

::: info Document Information
Version: v2.0
Updated: 2026-11-04
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider |
| Navigation | **Model Services** > **Usage & Earnings** > **Model Usage** |
| Route | `/modelone/accounting/deduction/overview/model` |
| Managed objects | Model consumption, used model count, total credits, and tokens |

**New to this page**: Model Usage is the consumption ledger for publishers. Select a billing cycle, read how many models were used and how many credits and tokens were consumed, then use trends and distribution to find where consumption concentrates.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Billing Cycle | The calendar month interval during which usage is aggregated and credit balances are deducted (e.g., `2026-11`). |
| Total Consumption (Credits) | Cumulative platform credits or quota deducted during the statistical period for model invocation. |
| Total Token Consumption | Sum of input Prompt Tokens and output Completion Tokens consumed by model inference during the period. |
| Compared to Last Period | The percentage increase or decrease of the current metric compared to an identical time window in the immediately preceding period. |

## Prerequisites

1. Your account can open **Usage & Earnings > Model Usage**.
2. Model calls or billing records exist.
3. The billing cycle and date range are confirmed.

## Page Description

The page shows the `Model Usage` title and two tabs, `Overview` and `Usage Details`; below the tabs, `Model Earnings` and `Model Usage` provide quick switching, and the left menu also lists both.

| Area | Description |
| --- | --- |
| Top tab & quick navigation bar | Switches between Overview and Usage Details tabs, plus horizontal quick-links between Model Earnings and Model Usage |
| Billing cycle & date filters | Dropdown selector for billing cycle (month) and date range picker for daily granularity filtering |
| Core consumption KPI cards | Displays Number of Models Used, Total Consumption (Credits), Total Token Consumption, and period-over-period changes |
| Trend & distribution chart grid | Shows Model Consumption Trend, Model Usage Distribution pie chart, Call Frequency Trend, and Call Times Distribution |

`Overview` contains:

- Filters: `Billing cycle` and `Date`.
- KPI cards: `Number of Models Used`, `Total Consumption (Credits)`, and `Total Token Consumption`; each card shows `Compared to Last Period`.
- Charts: `Model Consumption Trend`, `Model Usage Distribution` (`Total`), `Trend of Model Call Frequency`, and `Distribution of Model Call Times`.

![Model usage overview](./images/usage-overview.png)

The figure shows the page provides `Overview` and `Usage Details` tabs; KPI cards show `Number of Models Used`, `Total Consumption (Credits)`, and `Total Token Consumption`, each with `Compared to Last Period`; the chart area includes `Model Consumption Trend`, `Model Usage Distribution`, `Trend of Model Call Frequency`, and `Distribution of Model Call Times`.

## Main Operations

### Read the consumption overview

1. Open **Usage & Earnings > Model Usage**; `Overview` is selected by default.
2. Choose `Billing cycle` and `Date`.
3. Read `Number of Models Used`, `Total Consumption (Credits)`, `Total Token Consumption`, and their `Compared to Last Period` values.
4. Review consumption trends and model usage distribution.

### Open usage details

1. Click the `Usage Details` tab.
2. Review details for the selected billing cycle and date.

### Switch to model earnings

1. In the left `Usage & Earnings` group, click `Model Earnings`.
2. Or continue from the earnings overview after switching.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Billing cycle | Yes | Selector | `2026-11` | Billing period |
| Date | No | Date range | `2026-11-01` to `2026-11-03` | Statistics date range |
| Number of Models Used | System | Number | `0` | Models that generated consumption |
| Total Consumption (Credits) | System | Amount | `0.00` | Total credits consumed |
| Total Token Consumption | System | Number | `0` | Combined input and output tokens |
| Compared to Last Period | System | Percentage | `0%` | Change versus the previous period |
| Model Consumption Trend | System | Chart | — | Consumption over time |
| Model Usage Distribution | System | Chart | — | Consumption share by model |
| Trend of Model Call Frequency | System | Chart | — | Call count over time |
| Distribution of Model Call Times | System | Chart | — | Call share by model |

## Pitfalls

- KPI cards show both the current value and `Compared to Last Period`; confirm the billing cycle and date range before reading trends.
- When the current scope has no consumption data, metrics show `0` or `0.00` and charts are empty; this does not mean the page is unavailable.
- `Model Usage` and `Model Earnings` are separate menu pages for consumption and revenue; do not mix their figures.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Period synchronization | Switching billing cycles or date ranges smoothly reloads KPI numbers and the four charts without flicker | If data disappears, click reset or switch to a historical month with billed calls |
| Period-over-period calculation | "Compared to Last Period" displays exact positive/negative percentages or flat markers | If there is no previous baseline period, `--` is normally displayed |
| Chart tooltip interactivity | Hovering cursor over trend lines or pie slices presents model names, consumed amounts, and percentage shares | If charts overlap, adjust browser window width or refresh to trigger reflow |
| Dual tab navigation | Clicking "Usage Details" enters the daily or request-level transaction table | Verify whether the account possesses itemized financial audit permissions |
| Cross-module quick link | Clicking "Model Earnings" smoothly transitions to the corresponding earnings settlement dashboard | Ensure unsaved filter changes on the current page are handled |

## FAQ

#### All metrics are 0

**Symptom:** Number of Models Used, Total Consumption (Credits), and Total Token Consumption all display 0 or 0.00.

**Possible Causes:** No billable model calls were triggered in the billing cycle, or monthly financial settlement batch processing has not finished.

**Resolution:**

1. Switch to a previous billing cycle with actual billed traffic to verify display logic.
2. Verify whether the tenant account has free promotional quota or privileged waivers.
3. Check billing account status and balance deduction rules in the Billing module.

#### Charts are empty

**Symptom:** KPI cards display non-zero values, but trend and distribution charts render empty.

**Possible Causes:** The selected date range is too short (e.g., a single day) to compute time-series intervals, or a single model consumes 100% leaving no breakdown pie slices.

**Resolution:**

1. Widen the date range to the entire month or at least 7 consecutive days.
2. Check whether browser ad-blockers blocked Chart Canvas/SVG execution scripts.

## Notes

- Consumption is aggregated by billing cycle; align periods before comparing.
- The page shows summaries and trends, not reconciliation; use the billing and settlement pages for reconciliation.
- Do not screenshot or share customer names, amounts, or call details.

## Next Steps

1. Review publisher earnings and external tenant recharge revenue sharing in [Model Earnings](../model-earnings/).
2. Verify internal team consumption breakdown by member and project in [My Calls](../../my-calls/overview/).
3. Optimize unit pricing and free quotas for each model service in [My Models](../../studio/my-models/).

Related pages:
- [Model Earnings](../model-earnings/)
- [My Calls Overview](../../my-calls/overview/)
- [Customer Calls Overview](../../provider-calls/overview/)
- [My Models](../../studio/my-models/)
