---
prev: false
next: true
---

# Scenario Overview - Model Usage and Earnings

This scenario shows callers how to review usage and providers how to reconcile customer calls and revenue over the same billing period.

## Applicable Roles

- Platform User and Model Provider

## Goals

- Match usage data with call logs.
- Trace revenue back to valid calls and pricing rules.
- Locate discrepancies by model, caller, billing period, or configuration.

## Scenario Flow

**Main path:** Align the reconciliation scope → Check call logs → Check model usage → Reconcile charges and revenue

| Stage | Key Result |
| --- | --- |
| 1. Align scope | User, model, provider, currency, and time range are consistent |
| 2. Check calls | Success, failure, token, or duration records are traceable |
| 3. Check usage | Aggregated usage maps to valid calls in the same scope |
| 4. Reconcile settlement | User charges, provider revenue, and publication pricing explain each other |

## Before You Start

- Define the model, time range, billing period, and unit.
- Prepare a redacted request time or call identifier.

## Recommended Reading Order

1. Review call logs
2. Review model usage
3. Review model revenue
4. Reconcile against billing configuration

## Document Index

| Document | Description |
| --- | --- |
| [Usage and Earnings Workflow](./usage-revenue-workflow) | Caller/provider reconciliation steps and usage/earnings screenshots |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | Successful and failed calls can be located over one consistent time range. |
| 2 | Tokens, requests, or duration in Model Usage map to valid call records. |
| 3 | User charges, provider revenue, billing units, currency, and publication pricing explain each other. |
