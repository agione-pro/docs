---
prev: false
next: true
---

# Scenario Overview - Project, Key, and Budget Governance

This scenario helps provider accounts create projects, set budgets and model allowlists, and create controlled, purpose-specific keys that can be rotated.

## Applicable Roles

- Model Providers, platform users, and provider administrators

## Scenario Goals

- Give each project a clear purpose, budget cycle, and over-budget policy.
- Keep the model allowlist aligned with the project's business scope.
- Make each key's purpose, expiry, limit, and owner clear.
- Validate controlled calls and trace project and key activity in logs.

## Scenario Flow

**Main path:** Create project -> Configure budget and model scope -> Create key -> Set limits -> Validate calls and audit records

| Stage | Key Result |
| --- | --- |
| 1. Define the project | Purpose, owner, and member scope are clear |
| 2. Govern the budget | Cycle budget, alert threshold, and over-budget policy are saved |
| 3. Restrict access | Model allowlist and key scope match the project |
| 4. Validate and audit | Calls follow the limits and changes can be traced |

## Before You Start

- Confirm permission to manage projects and keys.
- Identify the project owner, budget cycle, model scope, and over-budget policy.
- Decide whether the workload needs a Model API Key or System API AK/SK pair.

## Recommended Reading Order

1. Create and review the project.
2. Configure budget, members, and the model allowlist.
3. Create a key for one explicit purpose.
4. Configure key limits and validate a call.

## Document Index

| Document | Description |
| --- | --- |
| [Project and Key Configuration Workflow](./project-key-workflow) | Project, budget, model-scope, and key-lifecycle operations |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to confirm that project spending and API credentials have enforceable boundaries and a traceable owner before production use.

| Check | Pass Criteria |
| --- | --- |
| 1 | Project name, owner, budget cycle, and purpose are clear. |
| 2 | Budget, alerts, over-budget policy, and model allowlist are correct. |
| 3 | Key purpose, validity period, limit, and owner are traceable. |
| 4 | Test calls comply with the budget, allowlist, and key limits. |
