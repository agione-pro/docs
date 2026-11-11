---
prev: false
next: true
---

# Scenario Overview - Model Usage and Earnings

This scenario shows callers how to review usage and providers how to reconcile customer calls and revenue over the same billing period.

## Applicable Roles

- End User and Model Provider

The caller supplies the reconciliation scope and model/request identifiers from logs; the provider adds the effective revision, billing unit, and price basis. Hand unexplained differences to the operator without exchanging real keys or full request bodies.

## Goals

The billing cycle is the accounting period; dates narrow the viewing range. Tokens are model text-processing units, not monetary amounts.

- Read usage by billing cycle and date; verify model route, caller attribution, and source in logs.
- Trace revenue back to valid calls and pricing rules.
- Locate discrepancies by Model ID, attribution scope, caller, billing period, or configuration.

## Scenario Flow

**Main path:** Align the reconciliation scope → Check call logs → Check model usage → Reconcile charges and revenue

| Stage | Key Result |
| --- | --- |
| 1. Align scope | User, model, Model ID, provider, currency, and time range are consistent |
| 2. Check calls | Model ID, Attribution, success, failure, token, or duration records are traceable |
| 3. Check usage | Read overview and details by cycle and dates without assuming additional filters |
| 4. Reconcile settlement | Read caller consumption, provider income, and active prices separately rather than equating them |

## Before You Start

- Define the model, Model ID, time range, billing period, and unit.
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

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | Successful and failed calls can be located over one consistent time range. |
| 2 | Review Model Usage by cycle and date, and inspect route and caller attribution separately in logs. |
| 3 | Read consumption and provider income separately, handing differences over with aligned scope and effective prices. |
