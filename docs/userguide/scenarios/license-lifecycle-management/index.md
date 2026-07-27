---
prev: false
next: true
---

# Scenario Overview - License Lifecycle Management

This scenario helps operators start from initial activation, continuously review License state, validity, authorized quota, and managed objects, and prepare impact assessments before expiry, expansion, or reauthorization.

## Applicable Roles

- Platform Operators, License administrators, and resource operators

## Scenario Goals

- Match the License to the target environment, instance, and authorization type.
- Verify state, validity, total, used, and remaining quota after activation.
- Explain quota usage through authorization composition and managed objects.
- Prepare renewal, expansion, and business-handling plans before expiry or capacity shortage.

## Scenario Flow

**Main path:** Confirm environment and current state -> Choose activation method -> Activate -> Review authorization composition -> Monitor validity and quota -> Renew or expand

| Stage | Key Result |
| --- | --- |
| 1. Identify current state | Environment, registration code, authorization type, and state are clear |
| 2. Activate | Activation method and result match the target instance |
| 3. Review usage | Authorization composition, managed objects, and quota usage can be explained |
| 4. Govern continuously | Expiry, remaining quota, and expansion plans stay visible |

## Before You Start

- Obtain access to `Billing > License > License`.
- Confirm that the page belongs to the target environment and instance.
- Choose online-payment activation or registration-code/activation-code activation.
- Confirm authorization scope and business impact before activation, renewal, or expansion.

## Recommended Reading Order

1. Review current state, validity, and quota in License Management.
2. Choose online payment or activation-code flow according to the environment.
3. After activation, review details, authorization composition, and managed objects.
4. Monitor expiry and remaining quota and arrange renewal or expansion in advance.

## Document Index

| Document | Description |
| --- | --- |
| [License Lifecycle Review Workflow](./license-lifecycle-workflow) | Complete steps from state review and activation through quota monitoring and renewal preparation |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. They confirm that the License works on the correct instance and supports the intended resource scale. A successful activation response alone is not completion.

| Check | Pass Criteria |
| --- | --- |
| 1 | Environment, instance, authorization type, and activation materials match. |
| 2 | License state is valid and effective and expiry times are correct. |
| 3 | Total, used, and remaining quota and authorization composition can be explained. |
| 4 | Managed objects match actual resources with no unexplained usage. |
| 5 | Owners and plans for expiry, expansion, and remaining-quota alerts are clear. |
