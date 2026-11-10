---
prev: false
next: true
---

# Scenario Overview - Publish an Aggregation Model

This scenario combines multiple published models behind one endpoint and configures routing, billing, and publication scope. An endpoint is a service access address; a Meta Model is a capability profile, and routing determines how requests are assigned among members.

## Applicable Roles

- Model Provider

The provider hands over the aggregate identifier, protocol, price, and authorized scope. The intended user verifies the result with their own account; the operator processes the corresponding revision first when review is required.

## Goals

- Select compatible base models.
- Configure a routing strategy offered by the page that matches the business objective.
- Submit the aggregation model for review or publication.

## Scenario Flow

**Main path:** Select member models → Configure routing → Configure billing and publish → Verify call results

| Stage | Key Result |
| --- | --- |
| 1. Select members | At least two published members share the same Meta Model; protocols and modalities are checked |
| 2. Configure routing | The available routing policy matches the goal |
| 3. Publish aggregation | Billing and scope are complete and the model enters review or the model list |
| 4. Verify operation | A controlled call succeeds and its result matches the intended model capability |

## Before You Start

- Prepare at least two published models sharing the same Meta Model, with permission to select them; verify availability, protocols, and modalities.
- Define the routing policy, billing mode, and publication scope.

## Recommended Reading Order

1. Verify base models and protocols
2. Configure routing
3. Configure billing and submit

## Document Index

| Document | Description |
| --- | --- |
| [Create an Aggregation Model](./create-aggregation-model) | Configuration flow, validation, and screenshots |

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | The aggregation contains at least two available published members sharing the same Meta Model, with protocols and modalities checked. |
| 2 | Routing, billing, rate limits, and publication scope are reviewed and the status is traceable in review or the model list. |
| 3 | A controlled call succeeds and its result matches the intended model capability. |