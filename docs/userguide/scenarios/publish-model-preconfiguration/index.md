---
prev: false
next: true
---

# Scenario Overview - Publish Models Preconfiguration

This scenario helps operators prepare the required settings before providers publish public models. A meta model defines capabilities, a model source identifies an upstream source, an Endpoint is an access point under it, and a template combines settings into a publishing preset.

## Applicable Roles

- Platform Operator

Hand the selectable meta model, source Code, Endpoint, and template source/region to the provider. Verify that the provider can select the intended settings before publication; do not include real credentials in shared handoff material.

## Scenario Goals

- Confirm an existing model author and prepare meta models, sources, Endpoints, and templates.
- Prepare tags, currencies, and model-review capabilities.
- Let providers publish models from standardized settings.

## Scenario Flow

**Main path:** Define the canonical model → Connect the model source → Build a publication template → Verify provider availability

| Stage | Key Result |
| --- | --- |
| 1. Define the model | Author, meta-model, modalities, capabilities, and protocols use one standard |
| 2. Connect the source | Source Code, Endpoint, Base URL, and protocols are maintained |
| 3. Build the template | Author, provider, region, and meta model are combined correctly |
| 4. Verify availability | Model Providers see the correct options and the review entry is ready |

## Before You Start

- Define model type, modalities, and protocol.
- Prepare upstream endpoints, regions, and header rules.
- Define billing currency and review ownership.

## Recommended Reading Order

1. Meta Models
2. Model sources
3. Model templates
4. Tags, currencies, and reviews

## Document Index

| Document | Description |
| --- | --- |
| [Model Publishing Preconfiguration](./model-publishing-preconfiguration) | End-to-end preconfiguration workflow |
| [Meta Models](./Meta-models/) | Model types, modalities, capabilities, token limits, and protocols under existing authors |
| [Model Sources](./Model-Source/) | Sources and Endpoints with Base URL, region tags, and protocols |
| [Model Templates](./Model-Templates/) | Reusable combinations of meta-models, sources, modalities, and protocols |

## Related Scenarios

- **[Publish Models](../publish-model/)**: Model Providers use the prepared base data to publish models from My Models
- **[Model Publishing Approval](../model-publishing-approval/)**: describes the approval workflow after a Model Provider submits a publication request
- **[Publish an Aggregation Model](../publish-aggregation-model/)**: builds aggregation routing on top of published models and depends on the outputs of the model-publication scenario

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | Providers can select the intended meta model, source, and Endpoint; the template preset is traceable in its list. |
| 2 | Modality, protocol, token limits, and advanced capabilities are consistent. |
| 3 | Tags and currency support publication and billing. |
| 4 | Model review entry and reviewer role are available. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Provider cannot see a template | Template state, publication scope, meta-model, and source association |
| Source configuration is incomplete | Separate source/Endpoint saves, address, and protocol compatibility |
| Billing cannot be configured | Currency, billing unit, model type, and pricing rule |
