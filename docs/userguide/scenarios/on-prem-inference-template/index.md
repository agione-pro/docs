---
prev: false
next: true
---

# Scenario Overview - On-Prem Inference Template Building

This scenario combines a model, inference framework, startup parameters, and resource specification into a reusable deployment template. The template defines the model/framework combination and adapted accelerator models; the actual card count and plan are confirmed from workload needs during deployment.

An inference template links a model version with an adapted framework version. VRAM is accelerator memory, used to check the memory requirements of the model and runtime plan.

**Example scope:** The linked guides retain a four-NPU example. Use the actual hardware inventory, compatibility, and approved workload to determine model, count, and resource tiers; four cards or all one-/two-/four-card plans are not prerequisites for every environment.

## Applicable Roles

- Platform Operator
- Inference platform administrator


**Role handoff:** The Platform Operator maintains model, framework, and template relations. A Model Provider or another authorized deployment user receives the deployable combination and confirms the actual plan and card count when creating an instance, then validates the service. Template preparation does not bypass deployment quota or cost checks.

## Goals

- Prepare model configuration, inference framework, and VRAM estimation, then create an inference template that uses an NPU resource specification.
- Plan the card count required at deployment time and check the accelerator models bound to the template.
- Allow users to deploy a model from the template.

## Scenario Flow

**Main path:** Maintain model configuration → Confirm inference framework → Validate VRAM estimation → Build the template → Validate the required card count and deployment settings → Publish to users

| Stage | Key Result |
| --- | --- |
| 1. Prepare dependencies | Model configuration, framework, VRAM factors, image, storage, and resource plan are available |
| 2. Build the template | Commands, environment variables, and health checks form reusable configuration |
| 3. Validate card count | The deployment plan matches the actual card count and parallel settings |
| 4. Publish for use | A test deployment passes and intended users can select the template |

## Before You Start

- Complete accelerator, cluster, and resource-specification setup, including metrics in the left panel of Resource Specs.
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

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | Model configuration, framework, VRAM estimation, and template are available. |
| 2 | It selects the expected NPU flavor. |
| 3 | A deployment uses the intended card count and parallel parameters. |
