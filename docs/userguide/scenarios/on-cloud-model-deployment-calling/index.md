---
prev: false
next: true
---

# Scenario Overview - On Cloud Model Deployment and Calling

This scenario guides tenant users through quickly deploying a model from the cloud marketplace and obtaining API calling capability.

An API (application programming interface) is the entry for calling the deployed service. Deployment allocates runtime resources; model publication determines how downstream users discover and call the service. They are separate steps.

## Applicable Roles

- Model Provider


**Role handoff:** The Platform Operator first provides authorized resources and available model assets. The Model Provider connects an account, deploys, and publishes as required within their permissions. End Users try or call the published service only after authorization; they do not submit deployments for the provider.

## Scenario Goals

- Add or confirm an available cloud account.
- Select a target model, inference engine, and compute plan to complete deployment.
- Obtain deployment state, monitoring, and API access from My Deployments.

## Scenario Flow

**Main path:** Prepare a user access account -> Select a model and compute plan -> Check deployment state -> Call and manage the lifecycle

| Stage | Key Result |
| --- | --- |
| 1. Prepare the account | The user cloud account passes validation and authorized regions are visible |
| 2. Create deployment | Model, engine, strategy, specification, and estimated cost are confirmed and submitted |
| 3. Check runtime | The deployment reaches Running without repeated event or monitoring errors |
| 4. Call and manage | The API request succeeds and cloud resources can be stopped or released as needed |

## Before You Start

- The Platform Operator has completed cloud-resource, business-region, and tenant authorization.
- The target model asset is published.
- The model provider has obtained valid least-privilege cloud credentials through a secure channel; shared materials contain placeholders only.

## Recommended Reading Order

1. Add an access account.
2. Create a quick deployment.
3. Review state, events, monitoring, and API access in My Deployments.

## Document Index

| Document | Description |
| --- | --- |
| [Access Accounts](./Access-Accounts/) | Add and validate the user's own cloud account |
| [Quick Deployment](./Quick-Deployment/) | Select an account and model and use the recommended deployment plan |
| [My Deployments](./My-Deployments/) | Review state, details, API access, monitoring, events, and lifecycle actions |

## Related Scenarios

### Platform Side - Upstream

- **[On Cloud Resource Access](../on-cloud-resource-access/)**: confirms that the Platform Operator has connected the target cloud platform and completed business-region and tenant-cloud authorization
- **[On Cloud Model Asset Publishing](../on-cloud-model-asset-publishing/)**: supplies the model assets selectable in Quick Deployment step 1

### Platform Side - Downstream and Cross-Scenario

- **[Publish Models](../publish-model/)**: after selecting Publish in My Deployments, complete basic information, billing, and rate limits to publish the deployment as a callable service
- **[My Deployments User Manual](../../../usermanual/ai-infra-on-cloud/user/model-services/my-deployments/)**: reviews state, events, and monitoring for deployed instances

### User Side - Downstream

- **[Model Experience and API Calling](../model-experience-api-calling/)**: explains how end users discover, try, and call the model after publication

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | The access account passes validation and authorized regions are visible. |
| 2 | Quick deployment can select the target model, inference engine, and compute plan. |
| 3 | Deployment reaches Running without repeated errors in events or monitoring. |
| 4 | A controlled request succeeds with a valid endpoint and credentials, with no real secrets stored in documentation. |
| 5 | Before stopping or deleting a test deployment, assess impact; afterward check instance state, cloud resources, and cost separately. Stopping does not itself prove full release or zero cost. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| No account or region is available | Account validation, resource grants, and tenant scope |
| Recommendation has no plan | Model asset, framework, compute plans, and regional capacity |
| Deployment remains creating or fails | Events, account permission, image, quota, and cloud resource state |
| Deployment runs but calls fail | Endpoint, authentication, port, protocol, and service health |
