---
prev: false
next: true
---

# Scenario Overview - License Lifecycle Management

This scenario helps operators distinguish Platform License from Managed Objects authorization, complete the correct activation flow, and continuously review subscription state, authorized versions, validity, quota, and managed objects.

## Applicable Roles

- Platform Operators, License administrators, and resource operators

## Scenario Goals

- Distinguish the Platform License subscription from Managed Objects SKU authorization.
- Match the License to the target environment, deployment, registration code, and authorization type.
- Verify state, validity, total, used, and remaining quota after activation.
- Explain quota usage through authorization composition and managed objects.
- Prepare renewal, expansion, and business-handling plans before expiry or capacity shortage.

## Scenario Flow

**Main path:** Confirm deployment and both states -> Select Platform License or Managed Objects -> Validate the License batch -> Activate with approval -> Review records and quota -> Renew or expand

| Stage | Key Result |
| --- | --- |
| 1. Identify current state | Deployment, registration code, Platform License state, and Managed Objects state are clear |
| 2. Select and validate | The target area, License source, batch limits, and validation result are clear |
| 3. Activate | Activation method and result match the target deployment |
| 4. Review usage | Authorized versions, import records, managed objects, and quota usage can be explained |
| 5. Govern continuously | Expiry, remaining quota, and expansion plans stay visible |

## Before You Start

- Obtain access to `Billing > License > License`.
- Confirm that the page belongs to the target environment and deployment.
- Confirm whether the change targets Platform License or a Managed Objects SKU.
- For batch import, prepare no more than 100 items, 64 KiB per item, and a `.lic`, `.license`, or `.txt` file no larger than 1 MiB.
- Confirm authorization scope and business impact before activation, renewal, or expansion.

## Recommended Reading Order

1. Review the Platform License and Managed Objects states in License Management.
2. Select the correct area and verify the registration code and License source.
3. Review the multi-line/file-import limits and atomic batch-validation rule before activation.
4. After activation, review authorized versions, import records, authorization composition, and managed objects.
5. Monitor expiry and remaining quota and arrange renewal or expansion in advance.

## Document Index

| Document | Description |
| --- | --- |
| [License Lifecycle Review Workflow](./license-lifecycle-workflow) | Complete steps from state review and activation through quota monitoring and renewal preparation |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. They confirm that the License works on the correct instance and supports the intended resource scale. A successful activation response alone is not completion.

| Check | Pass Criteria |
| --- | --- |
| 1 | Environment, deployment, registration code, target area, and activation materials match. |
| 2 | Platform License and Managed Objects states are checked independently. |
| 3 | Batch size, item size, file type, and atomic validation meet the page rules. |
| 4 | Authorized versions, validity, quota, import records, and managed objects can be explained. |
| 5 | Owners and plans for expiry, expansion, and remaining-quota alerts are clear. |
