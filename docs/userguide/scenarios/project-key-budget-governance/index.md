---
prev: false
next: true
---

# Scenario Overview - Project, Key, and Budget Governance

This scenario helps platform operators configure the display currency and default Credit exchange rate, then helps provider accounts and end users create projects, set budgets and model allowlists, and create controlled, purpose-specific keys that can be rotated.

## Applicable Roles

- Platform Operators, Model Providers, end users, and provider administrators

## Scenario Goals

- Give each project a clear purpose, budget cycle, and over-budget policy.
- Keep the model allowlist aligned with the project's business scope.
- Make each key's purpose, expiry, limit, and owner clear.
- Validate controlled calls and trace project and key activity in logs.
- Configure the platform currency and default Credit exchange rate before recharge and usage validation.

## Scenario Flow

**Main path:** Set platform currency and Credit exchange rate -> Create project -> Configure budget and model scope -> Create key -> Set limits -> Validate calls and audit records

| Stage | Key Result |
| --- | --- |
| 1. Set the billing foundation | Display currency and default Credit exchange rate are saved |
| 2. Define the project | Purpose, owner, and member scope are clear |
| 3. Govern the budget | Cycle budget, alert threshold, and over-budget policy are saved |
| 4. Restrict access | Model allowlist and key scope match the project |
| 5. Validate and audit | Calls follow the limits and changes can be traced |

## Before You Start

- Confirm permission to manage projects and keys.
- If you are the platform operator, confirm permission to manage platform settings and the target currency and exchange rate.
- Identify the project owner, budget cycle, model scope, and over-budget policy.
- Decide whether the workload needs a Model API Key or System API AK/SK pair.

## Operator Setup: Currency and Default Credit Exchange Rate

Complete this setup before validating recharge, project budgets, or model consumption. It requires an operator account with platform-settings permission.

1. Open [Platform Settings](../../../usermanual/settings/operator/system-settings/platform-settings/) from `Settings > Platform Settings`, then select `Currency Settings`.
2. Click `Edit` and set `Currency Code`, `Currency Name`, and `Currency Symbol`. Click `Save` after confirming the platform-wide display and settlement impact.
3. In the same Platform Settings page, select `Account & Settlement` and click `Edit`.
4. Set `Default Credit exchange rate` in the form `1 <currency code> = <N> credits`, then click `Save`. Use the currency and rate displayed in the current environment.

The exchange rate is used to convert a recharge amount in the configured currency into account Credits. It does not replace the billing price configured for a model.

## How Credits Are Used

1. An end user completes an authorized recharge and receives Credits according to the configured currency and default Credit exchange rate.
2. The end user calls a model that the account, project, member, and Key are authorized to use.
3. The platform applies the model's billing mode and price to billable tokens, images, characters, duration, or other units, converting the usage to Credits.
4. The platform deducts the calculated Credits from the account balance and records the change in usage, transaction, or billing details.

## Recommended Reading Order

1. If required, complete the operator currency and Credit exchange-rate setup.
2. Create and review the project.
3. Configure budget, members, and the model allowlist.
4. Create a key for one explicit purpose.
5. Configure key limits and validate a call.

## Document Index

| Document | Description |
| --- | --- |
| [Project and Key Configuration Workflow](./project-key-workflow) | Currency and Credit exchange-rate setup, project, budget, model-scope, and key-lifecycle operations |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to confirm that project spending and API credentials have enforceable boundaries and a traceable owner before production use.

| Check | Pass Criteria |
| --- | --- |
| 1 | Currency code, currency name, symbol, and default Credit exchange rate are correct for the deployment. |
| 2 | Project name, owner, budget cycle, and purpose are clear. |
| 3 | Budget, alerts, over-budget policy, and model allowlist are correct. |
| 4 | Key purpose, validity period, limit, and owner are traceable. |
| 5 | Test calls comply with the budget, allowlist, key limits, and model billing rules. |
