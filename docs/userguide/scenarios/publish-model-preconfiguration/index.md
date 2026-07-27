---
prev: false
next: true
---

# Scenario Overview - Publish Models Preconfiguration

This scenario helps operators prepare the required settings before providers publish public models.

## Applicable Roles

- Platform Operator

## Scenario Goals

- Prepare model authors, meta-models, model sources, and templates.
- Prepare tags, currencies, and model-review capabilities.
- Let providers publish models from standardized settings.

## Scenario Flow

**Main path:** Define the canonical model → Connect the model source → Build a publication template → Verify provider availability

| Stage | Key Result |
| --- | --- |
| 1. Define the model | Author, meta-model, modalities, capabilities, and protocols use one standard |
| 2. Connect the source | Provider, region, endpoint, and authentication template are reusable |
| 3. Build the template | Source, meta-model, tags, currency, and defaults are linked completely |
| 4. Verify availability | Model Providers see the correct options and the review entry is ready |

## Before You Start

- Define model type, modalities, and protocol.
- Prepare upstream endpoints, regions, and header rules.
- Define billing currency and review ownership.

## Recommended Reading Order

1. Meta-models
2. Model sources
3. Model templates
4. Tags, currencies, and reviews

## Document Index

| Document | Description |
| --- | --- |
| [Model Publishing Preconfiguration](./model-publishing-preconfiguration) | End-to-end preconfiguration workflow |
| [Meta-Models](./Meta-models/) | Authors, model types, modalities, capabilities, token limits, and protocols |
| [Model Sources](./Model-Source/) | Endpoints, regions, and request-header rules |
| [Model Templates](./Model-Templates/) | Reusable combinations of meta-models, sources, modalities, and protocols |

## Related Scenarios

- **[Publish Models](../publish-model/)**: Model Providers use the prepared base data to publish models from My Models
- **[Model Publishing Approval](../model-publishing-approval/)**: describes the approval workflow after a Model Provider submits a publication request
- **[Publish an Aggregation Model](../publish-aggregation-model/)**: builds aggregation routing on top of published models and depends on the outputs of the model-publication scenario

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | Providers can select the intended author, meta-model, source, and template. |
| 2 | Modality, protocol, token limits, and advanced capabilities are consistent. |
| 3 | Tags and currency support publication and billing. |
| 4 | Model review entry and reviewer role are available. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Provider cannot see a template | Template state, publication scope, meta-model, and source association |
| Model source test fails | Regional endpoint, request headers, protocol URL, and connectivity |
| Billing cannot be configured | Currency, billing unit, model type, and pricing rule |
