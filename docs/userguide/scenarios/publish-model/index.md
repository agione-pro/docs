---
prev: false
next: true
---

# Scenario Overview - Publish Models

This scenario helps model providers publish models as services that can be tried and called. A meta model is a capability profile, a model source identifies the upstream service source, and an Endpoint is an access point under that source.

## Applicable Roles

- Model Provider
- Operator when preconfiguration or review is required

The operator prepares selectable base settings. After publishing, the provider hands the model identifier, protocol, price, and authorized scope to the intended user for verification. If review is required, hand the model and revision to the operator first; submission alone does not replace review or call verification.

## Scenario Goals

- Publish a model service that users can discover, try, and call.
- Configure protocol, billing, rate limits, publication scope, and review data.

## Scenario Flow

**Main path:** Prepare publication → Configure and test the model → Submit for review → Publish and verify calls

| Stage | Key Result |
| --- | --- |
| 1. Prepare publication | Meta models, sources, Endpoints, and credentials are confirmed |
| 2. Configure and test | Model information, protocol, billing, and rate limits pass validation |
| 3. Submit for review | Requests requiring review have traceable status and revisions |
| 4. Verify publication | Intended users can discover, try, and call the model |

## Before You Start

- Complete model-publishing preconfiguration.
- Confirm whether compute deployment is needed first. This publication scenario uses an existing upstream service; prepare the request URL, credential, protocol, and upstream model name.
- Define billing and rate-limit policies.

## Recommended Reading Order

1. [Publish Models Preconfiguration](../publish-model-preconfiguration/)
2. Choose the guide for the target model type
3. [Model Publishing Approval](../model-publishing-approval/)
4. [Model Experience and API Calling](../model-experience-api-calling/)

## Document Index

| Document | Description |
| --- | --- |
| [Publish Public Models](./provider-quick-guide) | Connect an existing upstream service, complete the three-step publication wizard, and verify revisions |
| [Publish Text Models](./Text/) | Publish a text model through the text model publishing flow |
| [Publish Multimodal Models](./Multimodal/) | Publish a multimodal conversation model and configure compatible protocols and billing |
| [Publish Embedding Models](./Embedding/) | Publish an embedding model through an embeddings-compatible protocol |
| [Publish Image Models](./Image/) | Publish an image service and verify modalities, billing unit, and output |
| [Publish Speech Models](./Speech/) | Publish a speech service and verify the intended audio capability |
| [Publish Video Models](./Video/) | Publish a video service and verify its task and output without assuming fixed callback or parsing settings |
| [My Models](../../../usermanual/model-services/user/studio/my-models/) | Review the model publishing entry, fields, and operations |

## Related Scenarios

- **[Publish Models Preconfiguration](../publish-model-preconfiguration/)**: Platform Operators prepare Meta Models, model sources, templates, tags, currency, and review settings before publication
- **[Model Publishing Approval](../model-publishing-approval/)**: administrators process the publication request after submission
- **[Publish an Aggregation Model](../publish-aggregation-model/)**: defines aggregation routing on top of published models
- **[Model Experience and API Calling](../model-experience-api-calling/)**: explains how end users discover, try, and call the model after publication

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | Protocol testing passes and model source and request parameters work. |
| 2 | Billing, rate limits, publication area, and publication time match the plan. |
| 3 | When review is required, its status and revision can be checked after submission. |
| 4 | Intended users can find, try, and call the published model. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Meta-model or source cannot be selected | Operator preconfiguration, state, and account visibility |
| Protocol test fails | Endpoint, headers, source model ID, protocol, and response parsing |
| Review cannot be submitted | Required fields, billing, rate limits, publication area, and test state |
| Published model is not visible | Review state, publication time, public/private scope, and tenant permission |
