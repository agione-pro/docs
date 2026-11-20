---
prev: false
next: true
---

# Scenario Overview - Model Publishing Approval

This scenario shows operators how to review a provider's model publication request, including model data, protocol, billing, throttling, and scope. Protocols define request/response formats; rate limits control call frequency or usage caps, so they require separate checks.

## Applicable Roles

- Platform Operator
- Provider waiting for the review result

The provider hands over the target model, submitted revision, and publication scope. After processing that revision, the operator hands back the review status and verification basis. The provider checks the effective version, and the intended user verifies access.

## Goals

- Trace every review item to the publication configuration.
- Confirm the review object, revision, and decision.
- Preserve the intended model visibility after approval.

## Scenario Flow

**Main path:** Locate the pending request → Review publication settings → Make a decision → Verify the result and visibility

| Stage | Key Result |
| --- | --- |
| 1. Locate the request | The target model, provider, and pending version are identified |
| 2. Review settings | Model information, protocol test, billing, rate limits, and scope are compliant |
| 3. Process review | Review status and time are checked again after approval or rejection |
| 4. Verify results | The provider sees the result and an approved model has the intended visibility |

## Before You Start

- Prepare a pending publication request.
- Define publication, billing, and visibility rules.

## Recommended Reading Order

1. Locate the request
2. Review model and protocol data
3. Review billing, throttling, and scope
4. Confirm the revision, then approve or reject; hand over additional material through the agreed channel

## Document Index

| Document | Description |
| --- | --- |
| [Model Review Workflow](./review-workflow) | Review steps, completion checks, and a review-list screenshot |

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | A new query confirms review status and time after processing. |
| 2 | The provider checks publication status, effective version, and pending version in My Models. |
| 3 | The intended audience verifies published model visibility and call authorization; an unpublished revision is not handed over as available. |