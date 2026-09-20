---
prev: false
next: true
---

# Scenario Overview - On-Prem New Model Template Preparation & Deployment

This scenario guides users through the end-to-end process of downloading new open-source models from ModelScope, configuring Ascend 910B NPU inference templates with vLLM VRAM factors, and having model providers deploy, publish, and test the model using Playground and cURL.

## Applicable Roles

- Platform Operator (Model download and inference template creation)
- Model Provider (Instance deployment, model publishing, and calling validation)

## Goals

- Configure ModelScope model weight download and bind to target On-Prem clusters.
- Create an inference template with Ascend 910B accelerator and vLLM VRAM parameters, setting it to Available.
- Deploy a model instance using the template as a provider and verify Running state and ports.
- Publish the model with protocol testing, custom tags, and billing/rate-limit configuration.
- Validate model responses via Playground chat and terminal cURL commands.

## Scenario Flow

**Main path:** Operator prepares model and template (ModelScope download → Ascend 910B template) → Provider deploys instance (select template & flavor → running) → Publish model (protocol test → billing & rate limit) → Call validation (Playground → cURL)

| Stage | Key Result |
| --- | --- |
| 1. Prepare Model Weights | Configure ModelScope source and Model ID in On-Prem, enabling auto-activation after download |
| 2. Build Inference Template | Associate model version, vLLM VRAM table, and Ascend 910B card, setting status to Available |
| 3. Create Model Instance | Provider configures concurrency and context length, launching instance into Running status |
| 4. Publish Model Service | Pass OpenAI protocol test, set tag, free billing, rate limit, and submit for publishing |
| 5. Validate E2E Calling | Chat in Playground and run shell cURL commands for streaming response verification |

## Before You Start

- An Ascend 910B cluster onboarded with both Operator and Provider role accounts available.
- Network connectivity from the cluster to the ModelScope repository.
- Identified Model ID (e.g., DeepSeek-R1-Distill-Qwen-7B) and required concurrency/context parameters.
- A provider-side account with permission to create an instance, and a publication scope (public or private) approved for the scenario.

## Recommended Reading Order

1. Review this scenario overview to understand operator and provider division of responsibilities.
2. Follow the [New Model Template Preparation & Deployment Guide](./template-deployment-guide) for the step-by-step 23-step procedure.
3. Reference [On-Prem Inference Template Building](../on-prem-inference-template/) and [On-Prem Model Deployment & Status Check](../on-prem-model-deployment-status/) for deeper configuration details.

## User Manual References

- [On-Prem Models](/usermanual/ai-infra-on-prem/operator/templates/models/)
- [Inference Templates](/usermanual/ai-infra-on-prem/operator/templates/inference-templates/)
- [My Models](/usermanual/model-services/user/studio/my-models/)
- [My Deployments](/usermanual/model-services/user/studio/my-deployments/)

## Document Index

| Document | Description |
| --- | --- |
| [New Model Template Preparation & Deployment Guide](./template-deployment-guide) | Full 23-step walkthrough covering ModelScope download, Ascend 910B template creation, deployment, publishing, and cURL execution |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable.

| Check | Pass Criteria |
| --- | --- |
| 1 | Target model is downloaded and enabled in On-Prem Models. |
| 2 | Inference template is created with Ascend 910B card and vLLM VRAM factor in Available status. |
| 3 | Model instance is created by provider, reaching Running status with service port available. |
| 4 | Model is publicly published with protocol testing passed. |
| 5 | Playground chat responds properly and cURL command returns streaming output. |
