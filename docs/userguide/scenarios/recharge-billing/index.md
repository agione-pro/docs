---
prev: false
next: true
---

# Scenario Overview - Recharge and Billing

This scenario distinguishes account top-ups, billing balance, resource quotas, resource usage, and model billing, then uses account overview, transactions, and monthly bills to explain balance changes and consumption.

## Applicable Roles

- Platform User, Model Provider, and Platform Operator

## Goals

- Verify top-up and account-credit changes.
- Distinguish insufficient quota from insufficient credit.
- Map deductions to an instance, workload, or model call.
- Reconcile transactions and monthly-bill totals for the same billing cycle.

## Scenario Flow

**Main path:** Review account overview → Reconcile top-ups and transactions → Confirm resource quota → Trace resource or model usage → Review the monthly bill

| Stage | Key Result |
| --- | --- |
| 1. Confirm account | Available balance, alerts, and billing-cycle scope are clear |
| 2. Reconcile changes | Top-up orders and transactions explain balance changes |
| 3. Confirm quota and usage | Resource or model usage has explicit limits and traceable details |
| 4. Reconcile bills | Balance, usage, price, transactions, and monthly bill agree |

Top-up record screenshot:

![Top-up records](./images/top-up-records.png)

## Before You Start

- Decide whether the investigation concerns model calls or On-Prem resources.
- Define tenant, account, time range, billing period, and unit.

## Recommended Reading Order

1. Review Billing Overview and top-up orders.
2. Reconcile transactions for the same time range.
3. Review resource quota, model credits, and actual usage.
4. Review the monthly bill; use the operator reconciliation scenario for exceptions.

## Document Index

| Document | Description |
| --- | --- |
| [Recharge and Billing Workflow](./billing-workflow) | Concepts, steps, failure branches, and feature screenshots |

## Related Scenarios

- [Model Usage and Revenue](../model-usage-revenue/): reconcile Platform User spending and Model Provider revenue from call records.
- [On-Prem Resource Metering and Monitoring](../on-prem-resource-metering-monitoring/): reconcile local compute quota, monthly metering, and resource use.
- [Billing-Cycle Reconciliation and Settlement](../billing-cycle-reconciliation-settlement/): resolve operator-side billing-cycle exceptions and settlement.

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | The top-up or credit-allocation record takes effect and spendable balance changes as expected. |
| 2 | Tenant quota supports the target workload and an instance, job, or model call produces traceable usage. |
| 3 | Balance, credits, usage, pricing, transactions, and monthly bills agree over the same billing cycle. |
