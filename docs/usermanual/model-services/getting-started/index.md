# Model Services Getting Started

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## 30-Second Quick Reference

| Who Am I | Read First | Next Step |
| --- | --- | --- |
| New to Model Services | First understand the relationship between meta-models, model sources, templates, model publishing, review, the model marketplace, and calls. | Read [Publish and Call a Model](../end-to-end/publish-and-call-model/). |
| Model provider | First confirm that the operator has maintained meta-models, model sources, templates, and tags. | Publish a model or create an aggregation model in [My Models](../user/studio/my-models/). If submitted through On-Cloud Quick Deployment, view it in [My Deployments](../user/studio/my-deployments/) and continue publishing. |
| Model caller | First view available models, providers, pricing, performance, and quick-start information in the model marketplace. | Try models in Playground, then view call statistics and logs. |
| Operator admin | First maintain meta-models, sources, templates, and tags, then process model and app reviews. | Use settings, publishing, and approval modules to govern model services. |

## Feature Overview

`Model Services` is AGIOne's capability set for model publishing, discovery, experimentation, calling, review, and revenue management. It connects meta-models, model sources, templates, tags, the model marketplace, Studio, Playground, call logs, revenue details, and review workflows into a complete path: operator admins first maintain base data and review rules, model providers publish models, model callers use models in the marketplace and Playground, and the platform records calls, revenue, and customer call data.

| Item | Content |
| --- | --- |
| Applicable roles | Model providers, regular users, operator admins |
| Recommended entry | This document, [Model Services Overview](../), [Publish and Call a Model](../end-to-end/publish-and-call-model/) |
| Key objects | Meta-models, model sources, templates, tags, BYOK, aggregation models, model marketplace, Playground, call logs, revenue, reviews |
| Typical use | Build a mental model for model services and clarify operational boundaries for publishing, review, calling, billing, and revenue |

#### Beginner Explanation

Model Services is like an operating map from model listing to model calling: the operator prepares meta-models and sources, the provider publishes models, and callers validate results in the marketplace and Playground.

## Applicable Roles

| Role | Reading Focus | Recommended Entry |
| --- | --- | --- |
| Model provider | Publish models, view deployments, view reviews, and track revenue and customer calls. | [My Models](../user/studio/my-models/), [My Deployments](../user/studio/my-deployments/), [Model Revenue](../user/usage-earnings/model-earnings/) |
| Model caller | Browse Model Marketplace, try models, integrate APIs, and troubleshoot calls. | [Model Marketplace](../user/discover/models/), [Playground](../user/playground/text/), [My Calls](../user/my-calls/overview/) |
| Operator admin | Maintain meta-models, model sources, templates, tags, and review workflows. | [Meta-models](../operator/settings/meta-models/), [Model Sources](../operator/settings/model-source/), [Model Reviews](../operator/approvals/model-reviews/) |

## What Is Model Services

Model Services is an integrated service layer for model assets from configuration, publishing, review, listing, experimentation, and calling to statistics and settlement. It does not directly replace upstream model services or third-party Endpoints. Instead, it standardizes meta-models, sources, protocols, request headers, billing, and rate-limit configuration so models from different sources can be managed uniformly in the model marketplace and calling system.

In Model Services scenarios, the platform is responsible for:

1. Maintaining model base information, such as model authors, meta-models, model types, modalities, protocols, and capability tags.
2. Managing model access methods, such as model sources, Endpoints, request headers, BYOK, and protocol connectivity tests.
3. Hosting model deployment, publishing, and review, such as My Deployments, My Models, aggregation models, model reviews, and app reviews.
4. Providing model experimentation and calling, such as the model marketplace, Playground, quick start, call statistics, and call logs.
5. Recording usage, revenue, and customer call data.

## Role Relationships

| Role | Main Responsibilities | Common Sections |
| --- | --- | --- |
| Model provider | Publish models, view on-cloud deployment records, create aggregation models, configure billing and rate limits, submit reviews, and view revenue and customer calls. | [My Models](../user/studio/my-models/), [My Deployments](../user/studio/my-deployments/), [Model Revenue](../user/usage-earnings/model-earnings/), [Customer Calls](../user/customer-calls/overview/) |
| Model caller | Browse the model marketplace, view details, try models in Playground, integrate APIs, and view own call statistics and logs. | [Model Marketplace](../user/discover/models/), [Text Chat](../user/playground/text/), [My Calls](../user/my-calls/overview/) |
| Operator admin | Maintain meta-models, model sources, templates, and tags; view app lists; process model and app reviews. | [Meta-models](../operator/settings/meta-models/), [Model Sources](../operator/settings/model-source/), [Model Reviews](../operator/approvals/model-reviews/) |

Operator admins define the basic standards and review criteria for model services. Model providers decide which models to publish and how to publish them. Model callers decide which models to try and call. If options are missing during publishing, usually check meta-models, model sources, templates, tags, and permissions.

## Model Publishing and Calling Layers

| Layer | Description | Impact |
| --- | --- | --- |
| Meta-model | Describes base model capabilities, modalities, protocols, context, and advanced capabilities. | Affects selectable base model information during publishing. |
| Model source | Describes the model provider, region, request URL, authentication request headers, and source channel. | Affects BYOK or third-party Endpoint access. |
| Template | Combines provider, meta-model, protocol, capabilities, and default parameters into reusable configuration. | Affects presets and consistency in the publishing flow. |
| Tag | Used for model categorization, scenario filtering, and model marketplace display. | Affects user discovery and filtering. |
| Published model | Single-model service configuration created by a model provider. | Affects the model marketplace, Playground, and API calls. |
| Aggregation model | Combines multiple published models into one entry and routes by policy. | Affects cost, success rate, experience, and availability. |
| Review | Operator confirmation for model or app publishing. | Affects whether a model can be listed and called. |
| Calls and revenue | Logs, statistics, usage, and revenue generated after callers use models. | Affects billing, settlement, operations analysis, and troubleshooting. |

The recommended configuration order is: operator admins maintain meta-models, model sources, templates, and tags first; model providers then publish models or aggregation models; after review submission and listing, callers use them in the model marketplace and Playground.

## Boundaries Between User-Side and Operator-Side Features

| Capability | Operator Admin | Model Provider / Regular User |
| --- | --- | --- |
| Meta-models | Create model authors and meta-models, and maintain protocols, modalities, context, and capabilities. | Select available meta-models when publishing models. |
| Model sources | Maintain source channels, regions, request URLs, and authentication request headers. | Select or fill in model source information when publishing models. |
| Templates and tags | Maintain publishing templates and classification tags. | Reuse templates and tags when publishing models and aggregation models. |
| Model publishing | Review and govern published models. | Publish single models, view On-Cloud deployment records, connect existing Endpoints through BYOK, and create aggregation models. |
| Model marketplace | Govern listed model quality. | Browse models, view details, and obtain quick-start and performance information. |
| Playground | Confirm that Playground entries are available. | Select models and try text, image, video, or audio capabilities. |
| Calls and revenue | View operator-side app and review data. | View My Calls, customer calls, usage details, and model revenue. |

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Meta-model | Base model capability definition, including model type, modalities, protocol, context, and advanced capabilities. |
| Model source | Model provider or upstream service source, including region, request URL, authentication, and source ID. |
| Template | Reusable publishing configuration combination maintained by operators. |
| My Deployments | Entry for viewing deployment records after On-Cloud Quick Deployment. Users can select a publish region and redirect to the publish model page in My Models. |
| BYOK | Bring Your Own Key. Use your own API Key or Endpoint to connect an upstream model service. |
| Endpoint | The call Endpoint address of the model service, usually configured together with protocol and request headers. |
| Aggregation model | Combines multiple published models into one entry and routes by cost, success rate, round robin, or other policies. |
| Model marketplace | Entry point for users to discover, filter, and view available models. |
| Playground | Entry point for users to select models and directly try text, image, video, or audio capabilities. |
| Call log | Record of request, response, status, and elapsed time for each model call. |
| Model revenue | Revenue statistics generated by model calls according to billing rules. |

## Prerequisites

1. Confirm whether the current account is a model provider, caller, or operator admin.
2. Before publishing a model, prepare the model source, protocol, pricing, and security notes.
3. Before calling a model, confirm the Personal Key, Endpoint, quota, and model visibility scope.
4. After submitting through On-Cloud Quick Deployment, view the deployment record in the `On-Cloud` list under `Model Services > Studio > My Deployments`.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role | Yes | Enum | Operator admin | Determines the feature entry to read and operate first. |
| Meta-model | No | Text | Example Meta-model A | Capability definition that must be maintained by operators before model publishing. |
| Model Source | No | Text | Example Source A | Used to connect third-party Endpoint, protocol, and authentication information. |
| Publishing Object | No | Text | Example Model A | Model that the model provider prepares to submit for review or listing. |
| Call Entry | No | Text | Playground | Entry where callers try, test, or integrate models. |

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Role is clear | You can tell whether you are a model provider, caller, or operator admin. | Return to the 30-second quick reference and choose the path again. |
| Prerequisite objects are complete | Before publishing, you can confirm whether meta-models, sources, templates, and tags are available. | Contact the operator admin to complete base configuration first. |
| Review path is clear | You understand the order of saving, submitting for review, listing, and calling a model. | Read the end-to-end workflow and check review status. |
| Troubleshooting entry is clear | When a call fails, you know to check call logs, Key, Endpoint, and rate limits first. | Go to the corresponding feature page based on the error type. |

#### Understanding Self-Check

- You can distinguish meta-models, model sources, model templates, and concrete models.
- You know model publishing requires review, and calling requires valid credentials and visibility scope.
- You know that when a call fails, you should first check request ID, error code, rate limits, and source health.

## Pitfalls

- Do not submit publishing before the model source passes connectivity testing, otherwise review or Playground calls are likely to fail.
- Do not confuse caller Keys, provider API Keys, and model source request headers. They belong to different authentication layers.
- Review approval only means publishing is allowed. It does not mean the caller definitely has quota, visibility scope, and production integration readiness.
- Getting-started learning is only for understanding entries and workflows. Do not perform real publishing, review submission, listing, deletion, disablement, or other high-risk actions.
- Do not write real model IDs, API Keys, Endpoints, tenant information, user information, model repository addresses, or test parameters in the document.

## Recommended Reading Path

#### Model Provider

1. Read this document and confirm the publishing path and review boundary.
2. Understand how listed models are displayed in the [Model Marketplace](../user/discover/models/).
3. Publish a model or create an aggregation model in [My Models](../user/studio/my-models/).
4. If the model is first submitted through `AI Infra > On-Cloud > Model Services > Quick Deployment`, view the deployment record in the `On-Cloud` list in [My Deployments](../user/studio/my-deployments/), select a publish region, and redirect to the publish model page in [My Models](../user/studio/my-models/).
5. Track review status after submitting for review.
6. After listing, use [Playground](../user/playground/text/) to validate model output.
7. View [Model Revenue](../user/usage-earnings/model-earnings/) and [Customer Calls](../user/customer-calls/overview/).

#### Model Caller

1. Read this document and confirm model discovery and calling entry points.
2. Filter models and view details in the [Model Marketplace](../user/discover/models/).
3. Try the target model in [Playground](../user/playground/text/).
4. Integrate the API using the quick-start information in model details.
5. View [My Call Overview](../user/my-calls/overview/), [Call Analytics](../user/my-calls/call-analytics/), and [Call Logs](../user/my-calls/call-logs/).

#### Operator Admin

1. Read this document and confirm base configuration and review responsibilities.
2. Maintain [Meta-models](../operator/settings/meta-models/).
3. Maintain [Model Sources](../operator/settings/model-source/).
4. Maintain [Templates](../operator/settings/model-templates/) and [Tags](../operator/settings/tags/).
5. View the [App List](../operator/publishing/apps/).
6. Process [Model Reviews](../operator/approvals/model-reviews/) and [App Reviews](../operator/approvals/app-reviews/).

## FAQ

#### Cannot Find the Target Meta-model or Model Source When Publishing

**Symptom:**

After a model provider enters the publishing flow, the target meta-model, model source, or template is not in the dropdown list.

**Possible Causes:**

- The operator admin has not created or enabled the corresponding meta-model.
- Model source configuration is incomplete or does not match the current region or provider.
- Templates or tags have not been maintained.
- The current account lacks publishing or viewing permissions.

**Handling:**

1. Ask the operator admin to check [Meta-models](../operator/settings/meta-models/) and [Model Sources](../operator/settings/model-source/).
2. Confirm that template, tag, and provider information has been configured.
3. Refresh the publishing flow or re-enter Studio.
4. Check the current account's menu and publishing permissions.

#### Model Cannot Be Listed or Called After Publishing

**Symptom:**

The model has been saved or submitted for review, but it is not displayed in the model marketplace, or calls fail.

**Possible Causes:**

- The model has not passed review or the listing operation has not been executed.
- The protocol connectivity test did not pass.
- Endpoint, request headers, API Key, or model source ID is configured incorrectly.
- Billing, rate-limit, or publishing region configuration is not as expected.

**Handling:**

1. Check [Model Review](../operator/approvals/model-reviews/) status.
2. Return to [My Models](../user/studio/my-models/) and view publishing, listing, and detail information.
3. Run the protocol connectivity test again.
4. Check Endpoint, request headers, model source ID, billing, and rate-limit configuration.

## Next Steps

1. Model providers should continue reading [My Models](../user/studio/my-models/), [My Deployments](../user/studio/my-deployments/), and [Model Revenue](../user/usage-earnings/model-earnings/).
2. Model callers should continue reading [Model Marketplace](../user/discover/models/), [Playground](../user/playground/text/), and [My Calls](../user/my-calls/overview/).
3. Operator admins should continue reading meta-model, model source, model template, tag, and review pages.

## Notes

- This is a platform-level introduction and does not replace the field descriptions on each feature page.
- API Keys, Endpoints, request headers, and real call parameters are sensitive and must be redacted in screenshots and documentation.
- Publish regions, deployment records, model publishing, deletion, delisting, review rejection, rate limits, and billing adjustments may affect real service exposure and callers. Confirm impact scope and rollback options first.
- For learning or screenshots, only view menus, pages, fields, statuses, and navigation. Do not click final publish, submit for review, list, delete, or disable actions.
- Documentation examples must not include real model IDs, API Keys, Endpoints, tenant information, user information, model repository addresses, or test parameters.
