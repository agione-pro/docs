---
prev: false
next: true
---

# Scenario Overview - Platform Governance and Access Control

This cross-scenario overview combines identity permissions, resource authorization, model visibility, projects and keys, member quotas, API rate control, and License into one governance path. Complete configuration in the linked scenarios.

## Applicable Roles

- Administrator and Operator
- Provider and End User used to verify the result

## Goals

- Define who may access each function, resource, and model.
- Limit calls through keys, projects, model grants, quotas, and rate limits.
- Ensure new requests fail after access is revoked.

## Scenario Flow

**Main path:** Identify governed objects → Configure roles, keys, and quota → Verify allowed and denied paths → Audit and adjust

| Stage | Key Result |
| --- | --- |
| 1. Identify objects | Accounts, organizations, projects, models, resources, and actions are explicit |
| 2. Configure controls | Roles, menus, keys, quota, and approval rules enforce least privilege |
| 3. Verify both paths | Authorized accounts complete the task and unauthorized accounts are clearly blocked |
| 4. Audit and adjust | Access, calls, and quota records are traceable and expired access can be revoked |

## Before You Start

- Define the governed object, owner, tenant, and business scope.
- List allowed actions, forbidden actions, limits, and rate controls.

## Recommended Reading Order

1. Configure identity and roles
2. Configure resource and model scope
3. Configure personal keys, rate limits, and credits
4. Verify with the target account and record the result

## Document Index

| Document | Description |
| --- | --- |
| [Governance Workflow](./governance-workflow) | Identity, resource, model, calling, credit controls, and a key-page screenshot |
| [Identity Authorization](../identity-authorization/) | Organizations, members, roles, menus, and button permissions |
| [Project, Key, and Budget Governance](../project-key-budget-governance/) | Project budgets, model allowlists, and calling credentials |
| [Member Quota Request and Allocation](../member-quota-application-allocation/) | Quota request, allocation, limits, and validation |
| [API Rate-Control Release and Audit](../api-rate-control-release-audit/) | API rules, node versions, hits, and audit |
| [License Lifecycle Management](../license-lifecycle-management/) | Authorization state, validity, quota, and managed objects |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | Roles, keys, project scope, quota, or approval rules are saved and take effect in a new session. |
| 2 | The authorized account completes the intended action without exceeding configured limits. |
| 3 | An unauthorized account is hidden or explicitly denied, and related access or call records are auditable. |
