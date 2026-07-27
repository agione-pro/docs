---
prev: false
next: true
---

# Scenario Overview - Publish Models

This scenario helps model providers publish models as services that can be tried and called.

## Applicable Roles

- Model Provider
- Operator when preconfiguration or review is required

## Scenario Goals

- Publish a model service that users can discover, try, and call.
- Configure protocol, billing, rate limits, publication scope, and review data.

## Scenario Flow

**Main path:** Prepare publication → Configure and test the model → Submit for review → Publish and verify calls

| Stage | Key Result |
| --- | --- |
| 1. Prepare publication | Meta-models, sources, templates, tags, and currency are available |
| 2. Configure and test | Model information, protocol, billing, and rate limits pass validation |
| 3. Submit for review | The request enters review and comments can be tracked |
| 4. Verify publication | Intended users can discover, try, and call the model |

## Before You Start

- Complete model-publishing preconfiguration.
- Choose platform-hosted deployment or BYOK. For BYOK, prepare the external endpoint, model ID, protocol, headers, and key.
- Define billing and rate-limit policies.

## Recommended Reading Order

1. [Publish Models Preconfiguration](../publish-model-preconfiguration/)
2. Choose the guide for the target model type
3. [Model Publishing Approval](../model-publishing-approval/)
4. [Model Experience and API Calling](../model-experience-api-calling/)

## Document Index

| Document | Description |
| --- | --- |
| [Publish Public Models](./provider-quick-guide) | Choose platform-hosted deployment or BYOK, then complete model information, protocol testing, billing, rate limits, and approval submission |
| [Publish Text Models](./Text/) | Publish a text model through the text model publishing flow |
| [Publish Multimodal Models](./Multimodal/) | Publish a multimodal conversation model and configure compatible protocols and billing |
| [Publish Embedding Models](./Embedding/) | Publish an embedding model through an embeddings-compatible protocol |
| [Publish Image Models](./Image/) | Publish an image model with image-specific billing and response parsing |
| [Publish Speech Models](./Speech/) | Publish a speech model with audio protocol and character-based billing |
| [Publish Video Models](./Video/) | Publish an asynchronous video model with callback and result parsing |

## Related Scenarios

- **[Publish Models Preconfiguration](../publish-model-preconfiguration/)**: Platform Operators prepare meta-models, model sources, templates, tags, currency, and review settings before publication
- **[Model Publishing Approval](../model-publishing-approval/)**: administrators process the publication request after submission
- **[Publish an Aggregation Model](../publish-aggregation-model/)**: defines aggregation routing on top of published models
- **[Model Experience and API Calling](../model-experience-api-calling/)**: explains how end users discover, try, and call the model after publication

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | Protocol testing passes and model source and request parameters work. |
| 2 | Billing, rate limits, publication area, and publication time match the plan. |
| 3 | Review status and comments are visible after submission. |
| 4 | Intended users can find, try, and call the published model. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Meta-model or source cannot be selected | Operator preconfiguration, state, and account visibility |
| Protocol test fails | Endpoint, headers, source model ID, protocol, and response parsing |
| Review cannot be submitted | Required fields, billing, rate limits, publication area, and test state |
| Published model is not visible | Review state, publication time, public/private scope, and tenant permission |
