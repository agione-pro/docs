---
prev: false
next: true
---

# Scenario Overview - On Cloud Model Asset Publishing

This scenario guides Platform Operators through preparing runtime assets after cloud-resource onboarding, then assembling them into deployable model assets for downstream deployment and calling.

A runtime image supplies the container environment required by an inference framework; a framework version combines that image and startup configuration for a model asset to reference.

## Applicable Roles

- Platform Operator


**Role handoff:** The Platform Operator prepares images, published framework versions, and model deployment targets. The Model Provider receives the available model/version, regions, and plan scope and checks them in Quick Deployment. Saving an asset or publishing a framework is not a running service.

## Scenario Goals

- Runtime images can be pulled in the target cloud environment.
- Inference frameworks contain the correct service ports and startup commands.
- Authorized Model Providers can select the model assets during quick deployment.

## Scenario Flow

**Main path:** Register a runtime image -> Build an inference framework -> Create a model asset -> Verify user deployment availability

| Stage | Key Result |
| --- | --- |
| 1. Register the image | The target cloud environment can pull a controlled runtime-image version |
| 2. Build the framework | Image, startup command, port, and framework type are compatible |
| 3. Create the model asset | Meta-model, deployment point, cloud model, compute plan, and output protocol are linked |
| 4. Verify availability | Authorized Model Providers see the model and available plan in quick deployment |


> Availability prerequisite: use only entries opened in the current environment. If Quick Access or Runtime Images displays an unavailable-feature notice, do not continue from historical screenshots. Ask the operator to confirm dependencies before proceeding with available configuration pages.

## Before You Start

- Cloud resources and authorization are ready.
- The image address, framework type, model information, and output API rules are prepared.

## Recommended Reading Order

1. Maintain runtime images.
2. Maintain inference frameworks.
3. Assemble a deployable model asset in the model library.

## Document Index

| Document | Description |
| --- | --- |
| [Runtime Images](./Runtime-Images/) | Maintain repository address, tag, framework type, and built-in state |
| [Inference Frameworks](./Frameworks/) | Bind images, ports, and startup commands |
| [Model Assets](./Models/) | Combine meta-model, deployment point, compute plan, and output configuration |

## Related Scenarios

- **[On Cloud Resource Access](../on-cloud-resource-access/)** (upstream): provides the cloud platform, account, resource pool, and authorization required here; meta-model data comes from [Publish Models Preconfiguration](../publish-model-preconfiguration/)
- **[On Cloud Model Deployment and Calling](../on-cloud-model-deployment-calling/)** (downstream): creates deployment instances from the model-library assets prepared here
- **[My Deployments User Manual](../../../usermanual/ai-infra-on-cloud/user/model-services/my-deployments/)** (downstream): reviews state, events, and monitoring for deployed models
- **[Platform Governance and Access Control](../platform-governance-access-control/)** (cross-cutting): constrains model-asset visibility and calling scope by tenant and tenant

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | The runtime image can be pulled in the target cloud environment, with the correct framework type and version. |
| 2 | Framework startup command, port, and output protocol match the model. |
| 3 | The model asset links its meta-model, cloud deployment point, compute plan, and output configuration. |
| 4 | An authorized Model Provider can see the model and available plan in quick deployment. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Image or framework cannot be selected | Asset state, framework type, region, and association |
| Model is missing in user deployment | Publication state, deployment scope, authorization, and tenant visibility |
| Deployed API is unavailable | Startup command, port, output configuration, and health state |
