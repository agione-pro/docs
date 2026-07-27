---
prev: false
next: true
---

# Scenario Overview - Publish an Aggregation Model

This scenario combines multiple published models behind one endpoint and configures routing, billing, and publication scope.

## Applicable Roles

- Model Provider

## Goals

- Select compatible base models.
- Configure success-rate, cost, balanced, random, or round-robin routing.
- Submit the aggregation model for review or publication.

## Scenario Flow

**Main path:** Select member models → Configure routing → Configure billing and publish → Verify routing and failover

| Stage | Key Result |
| --- | --- |
| 1. Select members | At least two models have compatible protocols and modalities |
| 2. Configure routing | Cost, success-rate, balanced, random, or round-robin policy matches the goal |
| 3. Publish aggregation | Billing and scope are complete and the model enters review or the model list |
| 4. Verify operation | Normal calls succeed and remaining members handle traffic after one member fails |

## Before You Start

- Prepare at least two available models with compatible protocols.
- Define the routing policy, billing mode, and publication scope.

## Recommended Reading Order

1. Verify base models and protocols
2. Configure routing
3. Configure billing and submit

## Document Index

| Document | Description |
| --- | --- |
| [Create an Aggregation Model](./create-aggregation-model) | Configuration steps, parameters, and screenshots |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | The aggregation contains at least two enabled members with compatible protocols and modalities. |
| 2 | Routing, member thresholds, billing, and publication scope are complete and the status is traceable in review or the model list. |
| 3 | A controlled call succeeds and remaining members handle traffic after one member is disabled. |