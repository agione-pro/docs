# Quota Governance

::: info Document Information
Version: v1.0
Updated: 2026-07-23
:::

## Feature Overview

`Quota Governance` displays quota usage, available balance, and risk state by project and member in the current billing cycle. Use it to identify projects or members approaching their quota limit and adjust usage plans before business is affected.

| Item | Content |
| --- | --- |
| Applicable Role | User-Side Account, Business Admin, Billing Viewer |
| Navigation path | Billing > User Billing > Quota Governance |
| Page route | `/billing/my/quota-governance` |
| Managed objects | Project quotas, member quotas, billing-cycle usage, and risk action queue |
| Typical use | Review quota levels, identify overage risk, and open project or member details |

#### Beginner Explanation

Quota Governance is the usage dashboard for billing. Account balance shows how many Credits remain, while Quota Governance shows which projects or members use the quota, whether they are close to the limit, and which risks need attention first.

#### Terms Quick Reference

| Term | Meaning | Handling Tip |
| --- | --- | --- |
| Billing-cycle Quota | Quota limit available in the current billing cycle. | Confirm the cycle before troubleshooting. |
| Usage Percentage | Used quota divided by the quota limit. | Prioritize items close to the limit. |
| Risk Queue | Overage, near-limit, or pending items that require attention. | Handle them by business impact. |
| Action | Recommended handling for a risk item. | Confirm permission before changing a rule. |
| Available Quota | Quota still available in the current dimension. | Do not treat it as the account balance. |

## Prerequisites

1. The current account has permission to view user-side billing.
2. Open `My Billing > Quota Governance`.
3. Confirm the current billing-cycle range.
4. To change quota rules, the account must have the corresponding management permission.

::: warning High-risk Operation Boundary
Quota adjustments, per-project reset, project defaults, or alert-threshold changes can affect the real available quota of projects and members. This page explains viewing and confirmation only; it does not guide final submission.
:::

## Page Description

The page contains `Billing-cycle Quota Usage`, `Current Quota Status`, and `Risk & Action Queue`. Current Quota Status switches between `Project` and `Member` and provides `Reset by Project`, `Project Defaults`, and row-level `View` entries.

The following screenshot shows Quota Governance. Sanitize project, member, quota, and usage data before sharing it.

![Quota Governance](./images/quota-governance-list.png)

| Area | Description |
| --- | --- |
| Billing-cycle Quota Usage | Displays quota usage by project and member in the current cycle. |
| Current Quota Status | Displays current cycle, used/limit, handling method, available quota, and state by project or member. |
| Project | Switches to the project dimension. |
| Member | Switches to the member dimension. |
| Reset by Project | Entry for resetting or adjusting quota policy by project. |
| Project Defaults | Entry for default project-quota rules. |
| Risk & Action Queue | Displays quota risks and recommended actions. |
| View | Opens project or member quota details. |

## Main Operations

### View Project Quotas

1. Go to `Billing > User Billing > Quota Governance`.
2. Select `Project` in `Current Quota Status`.
3. Review project, current cycle, used/limit, handling method, available quota, state, and operation.
4. Click row-level `View` to open project details when needed.
5. For learning or screenshots, view only quota levels and details; do not reset projects or change defaults.

### View Member Quotas

1. Go to `Billing > User Billing > Quota Governance`.
2. Select `Member` in `Current Quota Status`.
3. Review the current cycle, used/limit, handling method, available quota, and state for each member.
4. For members close to the limit, adjust workload plans according to business use.
5. Hide real member emails, project names, quota limits, and consumption details in external communication.

### Review Risks and Actions

1. Go to `Billing > User Billing > Quota Governance`.
2. Review `Risk & Action Queue` at the bottom of the page.
3. Prioritize items close to the limit, over quota, or blocking continued use.
4. Before changing a quota rule, confirm the scope, affected objects, and approval basis.
5. For learning or screenshots, view only risk items and recommended actions; do not submit a real quota adjustment.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Billing-cycle Quota Usage | System-generated | Metric | Sanitized amount | Displays quota use in the current cycle. |
| Current Quota Status | System-generated | Area | `Project` | Displays project- or member-level quota state. |
| Project | No | Tab / table column | Sanitized project | Switches to or displays project quota. |
| Member | No | Tab / table column | Sanitized email | Switches to or displays member quota. |
| Current Cycle | System-generated | Time range | Sanitized cycle | Current quota-statistics cycle. |
| Used / Limit | System-generated | Number | Sanitized quota | Used quota and quota limit. |
| Handling Method | System-generated | Text | `Block new workloads` | Handling rule when the quota is near or above the limit. |
| Available Quota | System-generated | Number | Sanitized quota | Remaining quota in the current dimension. |
| State | System-generated | Enum | `Normal`, `At risk` | Current quota state. |
| View | No | Entry | `View` | Opens project or member quota details. |
| Reset by Project | No | High-risk entry | `Reset by Project` | May change project quota policy; confirm impact before submitting. |
| Project Defaults | No | High-risk entry | `Project Defaults` | May change default project-quota rules. |
| Risk & Action Queue | System-generated | List | Sanitized risk item | Displays risks and recommended actions. |

## Pitfalls

- Project and member dimensions are different statistical views; do not add their values together.
- Quota Governance displays limits and levels; it does not mean a top-up, deduction, or settlement occurred.
- Risk items may remain briefly after handling. Return to the current cycle and refresh.
- Confirm affected objects before changing quota rules so running workloads or team members are not disrupted.
- Do not record real accounts, emails, order numbers, transaction numbers, amounts, customer names, tenant names, Tokens, or Keys.
- Sanitize screenshots, exports, tickets, and comments.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page loading | Billing-cycle usage, current quota status, and risk queue are displayed. | Refresh the page or check user-side billing permission. |
| Dimension switching | `Project` and `Member` views can be selected. | Check page permission and loading state. |
| List fields | Current cycle, used/limit, handling method, available quota, and state are visible. | Ask the operator to confirm quota rules. |
| Detail entry | Row-level `View` opens project or member details. | Check account permission or page loading state. |
| No unintended high-risk action | No project reset, default change, or quota adjustment is submitted during learning or screenshot capture. | If triggered, record the time and scope and notify the owner for review. |

## FAQ

#### A Project Is Close to Its Quota Limit

**Symptom:**

The project view shows usage close to or at the quota limit.

**Possible Causes:**

Recent project workload increased or the quota limit is below current business demand.

**Solution:**

Review the project's consumption sources, pause nonessential workloads, and contact the operator through the approved process if the quota must be adjusted.

#### Member and Project Quotas Look Inconsistent

**Symptom:**

Quota levels differ between member and project views.

**Possible Causes:**

The views aggregate different objects: one by project and the other by member.

**Solution:**

Confirm the current dimension and evaluate its used/limit values. Do not add the values from both views together.

#### A Risk Item Does Not Clear Automatically

**Symptom:**

The risk queue still shows an item after it was handled.

**Possible Causes:**

Data refresh is delayed or the action did not cover every affected object.

**Solution:**

Refresh the page and review the current billing cycle again. If the risk remains, open the related project or member details.

## Next Steps

1. To review cost sources, open [Transactions](../transactions/).
2. To review account balance, open [Account Overview](../overview/).
3. To review monthly quota impact, open [Monthly Bill](../monthly-bill/).

## Notes

- Quota Governance is for risk assessment and is not a top-up or deduction page.
- Before changing a quota rule, confirm the affected scope, billing cycle, and business priority.
- Do not expose complete member, project, quota-limit, or consumption details in communication.
- For learning or screenshots, view quota levels, risks, and details only; do not submit real quota changes.
