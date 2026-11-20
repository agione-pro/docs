---
prev: false
next: true
---

# Scenario Overview - Project, Key, and Budget Governance

This scenario helps platform operators configure the display currency and default Credit exchange rate, then helps provider accounts and end users create projects, set budgets and model allowlists, and create controlled, purpose-specific keys that can be rotated. Credit is the account’s accounting unit; a key is a program’s calling credential. A budget limits spending rather than replacing credential authorization.

## Applicable Roles

- Platform Operators, Model Providers, end users, and provider administrators

## Scenario Goals

- Give each project a clear purpose, budget cycle, and over-budget policy.
- Keep the model allowlist aligned with the project's business scope.
- Make each key's purpose, expiry, limit, and owner clear.
- Validate controlled calls and trace project and key activity in logs.
- Review the existing platform currency and default Credit exchange rate; only an authorized operator performs a required approved change.

## Scenario Flow

**Main path:** Verify existing billing settings (change only if required) -> Create project -> Configure budget and model scope -> Create key -> Set limits -> Validate calls and audit records

| Stage | Key Result |
| --- | --- |
| 1. Set the billing foundation | Existing currency and exchange rate are verified; any required change is approved |
| 2. Define the project | Purpose, owner, and member scope are clear |
| 3. Govern the budget | Cycle budget, alert threshold, and over-budget policy are saved |
| 4. Restrict access | Model allowlist and key scope match the project |
| 5. Validate and audit | Calls follow the limits and changes can be traced |

## Before You Start

- Confirm permission to manage projects and keys.
- If you are the platform operator, confirm permission to manage platform settings and the target currency and exchange rate.
- Identify the project owner, budget cycle, model scope, and over-budget policy.
- Decide whether the workload needs a Model API Key or System API AK/SK pair.

## Operator Prerequisite

Only initial setup or an approved change requires an operator to review the platform currency and default Credit exchange rate. If existing settings are correct, proceed to project configuration without resaving global settings. The [Project and Key Configuration Workflow](./project-key-workflow) contains the operating steps and Credit-conversion explanation; this overview does not duplicate them.

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

Before production use, verify project costs, credential boundaries, and ownership.

| Check | Pass Criteria |
| --- | --- |
| 1 | Currency code, currency name, symbol, and default Credit exchange rate are correct for the deployment. |
| 2 | Project name, owner, budget cycle, and purpose are clear. |
| 3 | Budget, alerts, over-budget policy, and model allowlist are correct. |
| 4 | Key purpose, validity period, limit, and owner are traceable. |
| 5 | Test calls comply with the budget, allowlist, key limits, and model billing rules. |
