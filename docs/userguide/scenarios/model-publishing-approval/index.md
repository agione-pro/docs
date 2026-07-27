---
prev: false
next: true
---

# Scenario Overview - Model Publishing Approval

This scenario shows operators how to review a provider's model publication request, including model data, protocol, billing, throttling, and scope.

## Applicable Roles

- Platform Operator
- Provider waiting for the review result

## Goals

- Trace every review item to the publication configuration.
- Record a clear approval or rejection reason.
- Preserve the intended model visibility after approval.

## Scenario Flow

**Main path:** Locate the pending request → Review publication settings → Make a decision → Verify the result and visibility

| Stage | Key Result |
| --- | --- |
| 1. Locate the request | The target model, provider, and pending version are identified |
| 2. Review settings | Model information, protocol test, billing, rate limits, and scope are compliant |
| 3. Process review | Approval or rejection and specific comments are saved |
| 4. Verify results | The provider sees the result and an approved model has the intended visibility |

## Before You Start

- Prepare a pending publication request.
- Define publication, billing, and visibility rules.

## Recommended Reading Order

1. Locate the request
2. Review model and protocol data
3. Review billing, throttling, and scope
4. Approve or provide an actionable rejection reason

## Document Index

| Document | Description |
| --- | --- |
| [Model Review Workflow](./review-workflow) | Review steps, completion checks, and a review-list screenshot |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | The approval or rejection result and specific review comments are saved. |
| 2 | The Model Provider sees the status and comments in My Models. |
| 3 | An approved model has the intended visibility; a rejected model stays out of the target marketplace and can be corrected and resubmitted. |