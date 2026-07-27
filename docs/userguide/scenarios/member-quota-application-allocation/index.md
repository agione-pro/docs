---
prev: false
next: true
---

# Scenario Overview - Member Quota Request and Allocation

This scenario helps provider administrators request, adjust, and limit quota according to member needs while reconciling member, project, and key constraints.

## Applicable Roles

- Provider administrators, Model Providers, and platform users who request quota

## Scenario Goals

- Give each request an amount, reason, and unique pending record.
- Adjust the correct member in the correct direction with a recorded reason.
- Keep member limits, model allowlists, project budgets, and key limits consistent.
- Verify changes in member details and through an actual controlled call.

## Scenario Flow

**Main path:** Locate member -> Submit quota request -> Track status -> Adjust member quota -> Set limits -> Validate calls

| Stage | Key Result |
| --- | --- |
| 1. Establish the baseline | Current authorization, usage, balance, and model scope are known |
| 2. Request quota | Amount, reason, and approval state are traceable |
| 3. Allocate and limit | Member quota and reset policy match project and key boundaries |
| 4. Validate | Member details and controlled calls show the expected result |

## Before You Start

- Identify the target member, additional quota, and business reason.
- Confirm that no duplicate request is pending.
- Define the reset cycle, limit-reached policy, and model scope before setting limits.

## Recommended Reading Order

1. Review the member's quota and existing usage.
2. Submit and track the quota request.
3. Adjust member quota and limits after approval.
4. Validate with the member account or key.

## Document Index

| Document | Description |
| --- | --- |
| [Member Quota Request and Allocation Workflow](./quota-workflow) | Steps from request through adjustment, limits, and call validation |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to confirm that the approved quota reached the intended member and remains consistent with project and key limits.

| Check | Pass Criteria |
| --- | --- |
| 1 | Request member, quota amount, and business reason are correct. |
| 2 | Request status, approval result, and adjustment record are traceable. |
| 3 | Member quota, model scope, project budget, and key limit are consistent. |
| 4 | Remaining quota and actual call behavior match expectations after adjustment. |
