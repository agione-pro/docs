---
prev: false
next: true
---

# Scenario Overview - API Rate-Control Release and Audit

This scenario helps operators start from a traffic baseline, design, release, and validate API rate-control rules, and use node cache, release records, and audit details to confirm that rules work as intended.

## Applicable Roles

- Platform Operators, API gateway administrators, and security or audit staff

## Scenario Goals

- Make rule matching scope, count key, window, quota, mode, and priority clear.
- Prepare an impact assessment, observation window, and rollback plan before release.
- Ensure that target nodes load the same rule version.
- Explain statistics or blocks through overview and audit records.

## Scenario Flow

**Main path:** Observe traffic baseline -> Design and review rules -> Release rule version -> Check node cache -> Observe hits and audit -> Adjust or roll back

| Stage | Key Result |
| --- | --- |
| 1. Establish baseline | Normal requests, peaks, and existing blocks are known |
| 2. Design rules | API scope, threshold, mode, and rollback plan are clear |
| 3. Validate release | Version is released and target-node cache is consistent |
| 4. Observe and audit | Rule hits and business impact can be explained |

## Before You Start

- Obtain API rate-control viewing, rule-management, and release permissions.
- Identify the target API, tenant or model scope, and normal traffic baseline.
- Prepare an observation period, validation requests, and rollback plan.
- Confirm impact scope and approval requirements before releasing, enabling, disabling, or rolling back rules.

## Recommended Reading Order

1. Establish a baseline from API Rate Control Overview.
2. Create or edit the rule and review its matching scope.
3. After release, check Release Center and Node Cache.
4. Confirm rule hits and business impact in Observability and Audit.

## Document Index

| Document | Description |
| --- | --- |
| [API Rate-Control Release and Audit Workflow](./rate-control-workflow) | Complete steps from baseline and rule release through node and audit validation |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. They confirm that the rule version is active on the correct nodes and that statistics or blocks match expectations. A successful release click alone is not completion.

| Check | Pass Criteria |
| --- | --- |
| 1 | Rule scope, window, quota, mode, priority, and rollback plan are reviewed. |
| 2 | Release Center shows the expected version and node scope. |
| 3 | Target-node cache versions match, with no unexplained failed node. |
| 4 | Overview trends, rule hits, and audit details correspond. |
| 5 | Business false positives and over-limit behavior are acceptable or rollback is complete. |
