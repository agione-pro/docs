---
prev: false
next: true
---

# Scenario Overview - Model Experience and API Calling

This scenario helps users discover models, try them in Playground (the online testing console), call them through application programming interfaces (APIs), and review call records. A personal key authenticates calls under the current account.

## Applicable Roles

- End User
- Provider reviewing customer calls

The provider supplies an accessible model/provider identifier, protocol, price, and scope. The caller prepares their own authorized key and checks personal logs by time and model after testing. If the provider helps investigate, share only necessary request times and identifiers, not real keys.

## Goals

- Find the target model and provider, and confirm price, credit, and access.
- Complete one request in the text, image, video, or audio playground that matches the model modality.
- Call the API with a personal key and review the call record.

## Scenario Flow

**Main path:** Discover a model and confirm access → Try it online → Call the API → Review call records

| Stage | Key Result |
| --- | --- |
| 1. Discover a model | A suitable model, provider, and authorized call conditions are identified |
| 2. Try it online | A harmless input verifies the model capability and output modality |
| 3. Call the API | A personal authorization key completes one controlled request |
| 4. Review records | The user locates personal call logs; providers inspect customer calls within their permissions |

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
| [User Quick Guide](./user-quick-guide) | Sign-in prerequisites, model/provider selection, four Playground entries, API calls, and log checks |

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | The user can find the model and review capabilities, providers, and call guidance. |
| 2 | A Playground request succeeds with input and output matching the model modality. |
| 3 | An API request uses a personal authorization key and succeeds. |
| 4 | My Calls contains the request for the same time and model. |
| 5 | When the provider assists, customer-call statistics are checked within its permission scope for the same model and period. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Model is missing | Model state, public/private scope, tenant authorization, and filters |
| Playground fails | Input modality, parameters, model state, and account credits |
| API authentication fails | Personal key, header format, and model grant |
| API succeeds but call record is empty | Month, model, client source, name/ID, and result category |
