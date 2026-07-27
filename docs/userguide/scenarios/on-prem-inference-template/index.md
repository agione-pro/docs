---
prev: false
next: true
---

# Scenario Overview - On-Prem Inference Template Building

This scenario combines a model, inference framework, startup parameters, and resource specification into a reusable deployment template. For four NPU cards, the template constrains the card model, card count, and startup mode.

## Applicable Roles

- Platform Operator
- Inference platform administrator

## Goals

- Prepare model configuration, inference framework, and VRAM estimation, then create an inference template that uses an NPU resource specification.
- Make the template explicitly use one, two, or four cards.
- Allow users to deploy a model from the template.

## Scenario Flow

**Main path:** Maintain model configuration → Confirm inference framework → Validate VRAM estimation → Build the template → Validate one-, two-, or four-card settings → Publish to users

| Stage | Key Result |
| --- | --- |
| 1. Prepare dependencies | Model configuration, framework, VRAM factors, image, storage, and resource plan are available |
| 2. Build the template | Commands, environment variables, and health checks form reusable configuration |
| 3. Validate card count | The selected plan matches one-, two-, or four-card parallel settings |
| 4. Publish for use | A test deployment passes and intended users can select the template |

## Before You Start

- Complete accelerator, cluster, metric, and resource-specification setup.
- Prepare the model configuration, framework, VRAM estimation, and runtime image.
- Confirm multi-card parallel parameters and driver compatibility.

## Recommended Reading Order

1. [On-Prem Compute Onboarding](../on-prem-compute-onboarding/)
2. [Build an NPU Inference Template](./build-inference-template/)
3. [Deploy and Check a Model](../on-prem-model-deployment-status/)

## Document Index

| Document | Description |
| --- | --- |
| [Build an NPU Inference Template](./build-inference-template/) | Prepare model, framework, and VRAM estimation, then select resource specification and startup parameters |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | Model configuration, framework, VRAM estimation, and template are available. |
| 2 | It selects the expected NPU flavor. |
| 3 | A deployment uses the intended card count and parallel parameters. |
