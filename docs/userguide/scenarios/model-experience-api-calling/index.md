---
prev: false
next: true
---

# Scenario Overview - Model Experience and API Calling

This scenario helps users discover models, try them in the playground, call them through APIs, and review call records.

## Applicable Roles

- Platform User
- Provider reviewing customer calls

## Goals

- Find the target model and claim or confirm quota.
- Complete one request in the text, image, video, or audio playground that matches the model modality.
- Call the API with a personal key and review the call record.

## Scenario Flow

**Main path:** Discover a model and obtain quota → Try it online → Call the API → Review call records

| Stage | Key Result |
| --- | --- |
| 1. Discover a model | A suitable model, provider, and available quota are identified |
| 2. Try it online | A harmless input verifies the model capability and output modality |
| 3. Call the API | A personal authorization key completes one controlled request |
| 4. Review records | User call logs and provider customer statistics identify the same request |

## Before You Start

- Sign in with access to the target model.
- Prepare a personal key and confirm account credit and model quota.

## Recommended Reading Order

1. Review this overview and prerequisites
2. Follow the quick guide to discover the model and select the matching playground
3. Complete an API request
4. Review the call record and troubleshoot failures

## Document Index

| Document | Description |
| --- | --- |
| [User Quick Guide](./user-quick-guide) | Sign-in, model discovery, quota, text/image/video/audio playgrounds, API calling, call records, and screenshots |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | The user can find the model and review capabilities, providers, and call guidance. |
| 2 | A Playground request succeeds with input and output matching the model modality. |
| 3 | An API request uses a personal authorization key and succeeds. |
| 4 | My Calls contains the request for the same time and model. |
| 5 | The provider can see corresponding redacted customer-call statistics. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Model is missing | Model state, public/private scope, tenant authorization, and filters |
| Playground fails | Input modality, parameters, model state, and account credits |
| API authentication fails | Personal key, header format, and model grant |
| API succeeds but call record is empty | Time range, processing delay, model, and account filters |
