# Getting Started

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

### 30-Second Quick Reference

| Who Am I | Read First | Next Step |
| --- | --- | --- |
| New to Model Services | First understand the relationship between meta-models, model sources, templates, model publishing, review, the model marketplace, and calls. | Read [Publish and Call a Model](../end-to-end/publish-and-call-model/). |
| Model Provider | First confirm that the Operator Admin has maintained meta-models, Model Sources, Model Templates, and tags. | Publish a model or create an aggregation model in [My Models](../user/studio/my-models/). If submitted through On-Cloud Quick Deployment, view it in [My Deployments](../user/studio/my-deployments/) and continue publishing. |
| Model Consumer | First view models, providers, pricing, performance, and quick-start information in **"Models"**. | Try models in **"Playground"**, then view call statistics and logs. |
| Operator Admin | First maintain meta-models, Model Sources, Model Templates, and tags, then process model and app reviews. | Use the settings, publishing, and approval pages to govern model services. |

`Model Services` is the platform's capability set for model publishing, discovery, experimentation, calling, review, and revenue management. It connects meta-models, Model Sources, Model Templates, tags, **"Models"**, **"Studio"**, **"Playground"**, call logs, revenue details, and review workflows into one path: Operator Admins maintain base data and review rules, Model Providers publish models, Model Consumers use models, and the platform records calls, revenue, and customer call data.

| Item | Content |
| --- | --- |
| Applicable Roles | Model Providers, Model Consumers, Operator Admins |
| Recommended entry | This document, [Model Services Overview](../), [Publish and Call a Model](../end-to-end/publish-and-call-model/) |
| Key objects | Meta-models, Model Sources, Model Templates, tags, BYOK, aggregation models, **"Models"**, **"Playground"**, call logs, revenue, reviews |
| Typical use | Build a mental model for model services and clarify operational boundaries for publishing, review, calling, billing, and revenue |

#### Beginner Explanation

Model Services is an operating map from model listing to model calling: the Operator Admin prepares meta-models and sources, the Model Provider publishes models, and the Model Consumer checks results in **"Models"** and **"Playground"**.

## Prerequisites

1. Confirm whether the current account is a Model Provider, Model Consumer, or Operator Admin.
2. Before publishing a model, prepare the model source, protocol, pricing, and security notes.
3. Before calling a model, confirm the Personal Key, Endpoint, quota, and model visibility scope.
4. After submitting through On-Cloud Quick Deployment, view the deployment record in the `On-Cloud` list under `Model Services > Studio > My Deployments`.

## Page Description

### Applicable Roles

| Role | Reading Focus | Recommended Entry |
| --- | --- | --- |
| Model Provider | Publish models, view deployments, view reviews, and track revenue and customer calls. | [My Models](../user/studio/my-models/), [My Deployments](../user/studio/my-deployments/), [Model Earnings](../user/usage-earnings/model-earnings/) |
| Model Consumer | Browse **"Models"**, try models, integrate APIs, and troubleshoot calls. | [Models](../user/discover/models/), [Playground](../user/playground/text/), [My Calls](../user/my-calls/overview/) |
| Operator Admin | Maintain meta-models, Model Sources, Model Templates, tags, and review workflows. | [Meta Models](../operator/settings/meta-models/), [Model Sources](../operator/settings/model-source/), [Model Reviews](../operator/approvals/model-reviews/) |

### What Is Model Services

Model Services is an integrated service layer for model assets from configuration, publishing, review, listing, experimentation, and calling to statistics and settlement. It does not directly replace upstream model services or third-party Endpoints. Instead, it standardizes meta-models, sources, protocols, request headers, billing, and rate-limit configuration so models from different sources can be managed uniformly in the model marketplace and calling system.

In Model Services scenarios, the platform is responsible for:

1. Maintaining model base information, such as model authors, meta-models, model types, modalities, protocols, and capability tags.
2. Managing model access settings, such as Model Sources, Endpoints, request headers, and BYOK. A saved configuration is not proof of a successful upstream call.
3. Hosting model deployment, publishing, and review, such as My Deployments, My Models, aggregation models, model reviews, and app reviews.
4. Providing model experimentation and calling through **"Models"**, **"Playground"**, Quick Start, call statistics, and call logs.
5. Recording usage, revenue, and customer call data.

### Role Relationships

| Role | Main Responsibilities | Common Sections |
| --- | --- | --- |
| Model Provider | Publish models, view on-cloud deployment records, create aggregation models, configure billing and rate limits, submit reviews, and view revenue and customer calls. | [My Models](../user/studio/my-models/), [My Deployments](../user/studio/my-deployments/), [Model Earnings](../user/usage-earnings/model-earnings/), [Customer Calls](../user/customer-calls/overview/) |
| Model Consumer | Browse **"Models"**, view details, try models in **"Playground"**, integrate APIs, and view own call statistics and logs. | [Models](../user/discover/models/), [Text Chat](../user/playground/text/), [My Calls](../user/my-calls/overview/) |
| Operator Admin | Maintain meta-models, Model Sources, Model Templates, and tags; view app lists; process model and app reviews. | [Meta Models](../operator/settings/meta-models/), [Model Sources](../operator/settings/model-source/), [Model Reviews](../operator/approvals/model-reviews/) |

Operator Admins define the basic standards and review criteria for model services. Model Providers decide which models to publish and how to publish them. Model Consumers decide which models to try and call. If options are missing during publishing, check meta-models, Model Sources, Model Templates, tags, and permissions.

### Model Publishing and Calling Layers

| Layer | Description | Impact |
| --- | --- | --- |
| Meta-model | Describes base model capabilities, modalities, protocols, context, and advanced capabilities. | Affects selectable base model information during publishing. |
| Model Source | Describes the Model Provider, region, request URL, authentication request headers, and source channel. | Affects BYOK or third-party Endpoint access. |
| Template | Combines provider, meta-model, protocol, capabilities, and default parameters into reusable configuration. | Affects presets and consistency in the publishing flow. |
| Tag | Used for model categorization, scenario filtering, and model marketplace display. | Affects user discovery and filtering. |
| Published Model | Single-model service configuration created by a Model Provider. | Affects the model marketplace, Playground, and API calls. |
| Aggregation model | Combines multiple published models into one entry and routes by policy. | Affects cost, success rate, experience, and whether calls reach a member model. |
| Review | Operator Admin review for model or app publishing. | Affects whether a model can be listed and called. |
| Calls and revenue | Logs, statistics, usage, and revenue generated after Model Consumers use models. | Affects billing, settlement, operations analysis, and troubleshooting. |

The recommended configuration order is: Operator Admins maintain meta-models, Model Sources, Model Templates, and tags first; Model Providers then publish models or aggregation models; after review submission and listing, Model Consumers use them in **"Models"** and **"Playground"**.

### Boundaries Between Customer Pages and the Operator Console

| Capability | Operator Admin | Model Provider / Model Consumer |
| --- | --- | --- |
| Meta-models | Create model authors and meta-models, and maintain protocols, modalities, context, and capabilities. | Select the meta-models shown in the publishing form. |
| Model sources | Maintain source channels, regions, request URLs, and authentication request headers. | Select or fill in model source information when publishing models. |
| Templates and tags | Maintain publishing templates and classification tags. | Reuse templates and tags when publishing models and aggregation models. |
| Model publishing | Review and govern published models. | Publish single models, view On-Cloud deployment records, connect existing Endpoints through BYOK, and create aggregation models. |
| Models | Govern the quality and visibility of listed models. | Browse models, view details, and obtain quick-start and performance information. |
| Playground | Confirm that **"Playground"** is visible. | Select models and try text, image, video, or audio capabilities. |
| Calls and revenue | View operator-side app and review data. | View My Calls, customer calls, usage details, and model revenue. |

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Meta-model | Base model capability definition, including model type, modalities, protocol, context, and advanced capabilities. |
| Model Source | Model Provider or upstream service source, including region, request URL, authentication, and source ID. |
| Template | Reusable publishing configuration combination maintained by operators. |
| My Deployments | Entry for viewing deployment records after On-Cloud Quick Deployment. Users can select a publish region and redirect to the publish model page in My Models. |
| BYOK | Bring Your Own Key. Use your own API Key or Endpoint to connect an upstream model service. |
| Endpoint | The call Endpoint address of the model service, usually configured together with protocol and request headers. |
| Aggregation model | Combines multiple published models into one entry and routes by cost, success rate, round robin, or other policies. |
| Models | UI entry point to discover, filter, and view models. |
| Playground | Entry point for users to select models and directly try text, image, video, or audio capabilities. |
| Call log | Record of request, response, status, and elapsed time for each model call. |
| Model revenue | Revenue statistics generated by model calls according to billing rules. |

## Main Operations

### Follow the Recommended Reading Path

#### Model Provider

1. Read this document and confirm the publishing path and review boundary.
2. Understand how listed models are displayed in [Models](../user/discover/models/).
3. Publish a model or create an aggregation model in [My Models](../user/studio/my-models/).
4. If the model is first submitted through `AI Infra > On-Cloud > Model Services > Quick Deployment`, view the deployment record in the `On-Cloud` list in [My Deployments](../user/studio/my-deployments/), select a publish region, and redirect to the publish model page in [My Models](../user/studio/my-models/).
5. Track review status after submitting for review.
6. After listing, use [Playground](../user/playground/text/) to validate model output.
7. View [Model Earnings](../user/usage-earnings/model-earnings/) and [Customer Calls](../user/customer-calls/overview/).

#### Model Consumer

1. Read this document and confirm model discovery and calling entry points.
2. Filter models and view details in [Models](../user/discover/models/).
3. Try the target model in [Playground](../user/playground/text/).
4. Integrate the API using the quick-start information in model details.
5. View [My Call Overview](../user/my-calls/overview/), [Call Analytics](../user/my-calls/call-analytics/), and [Call Logs](../user/my-calls/call-logs/).

#### Operator Admin

1. Read this document and confirm base configuration and review responsibilities.
2. Maintain [Meta Models](../operator/settings/meta-models/).
3. Maintain [Model Sources](../operator/settings/model-source/).
4. Maintain [Templates](../operator/settings/model-templates/) and [Tags](../operator/settings/tags/).
5. View the [App List](../operator/publishing/apps/).
6. Process [Model Reviews](../operator/approvals/model-reviews/) and [App Reviews](../operator/approvals/app-reviews/).

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role | Yes | Enum | Operator Admin | Determines the feature entry to read and operate first. |
| Meta-model | No | Text | Example Meta-model A | Capability definition that must be maintained by operators before model publishing. |
| Model Source | No | Text | Example Source A | Used to connect third-party Endpoint, protocol, and authentication information. |
| Publishing Object | No | Text | Example Model A | Model that the Model Provider prepares to submit for review or listing. |
| Call Entry | No | Text | Playground | Entry where Model Consumers try, test, or integrate models. |

## Pitfalls

- Before submitting for review, use the Model Source or publishing-page connectivity control when your version provides one. Record its visible result; a saved record alone does not prove that the upstream service can be called.
- Do not confuse Model Consumer Keys, provider API Keys, and model source request headers. They belong to different authentication layers.
- Review approval only means publishing is allowed. It does not mean the Model Consumer definitely has quota, visibility scope, and production integration readiness.
- Publishing, review submission, listing, deletion, and disablement change platform data or service visibility. Before a final action, confirm the target, permission, cost, and recovery plan.
- Do not write real model IDs, API Keys, Endpoints, tenant information, user information, model repository addresses, or test parameters in the document.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Role is clear | You can tell whether you are a Model Provider, Model Consumer, or Operator Admin. | Return to the 30-second quick reference and choose the path again. |
| Prerequisite objects are complete | Before publishing, you can see the required meta-model, Model Source, Model Template, and tag entries in their lists. | Ask the Operator Admin to check the object status, region, and account permission. |
| Review path is clear | You understand the order of saving, submitting for review, listing, and calling a model. | Read the end-to-end workflow and check review status. |
| Troubleshooting entry is clear | When a call fails, you know to check call logs, Key, Endpoint, and rate limits first. | Go to the corresponding feature page based on the error type. |

#### Understanding Self-Check

- You can distinguish meta-models, model sources, model templates, and concrete models.
- You know model publishing requires review, and calling requires valid credentials and visibility scope.
- You know that when a call fails, you should first check request ID, error code, rate limits, and source health.

## FAQ

#### Cannot Find the Target Meta-model or Model Source When Publishing

**Symptom:**

After a Model Provider enters the publishing flow, the target meta-model, model source, or template is not in the dropdown list.

**Possible Causes:**

- The Operator Admin has not created or enabled the corresponding meta-model.
- Model source configuration is incomplete or does not match the current region or provider.
- Templates or tags have not been maintained.
- The current account lacks publishing or viewing permissions.

**Handling:**

1. Ask the Operator Admin to check [Meta Models](../operator/settings/meta-models/) and [Model Sources](../operator/settings/model-source/).
2. Confirm that template, tag, and provider information has been configured.
3. Refresh the publishing flow or re-enter Studio.
4. Check the current account's menu and publishing permissions.

#### Model Cannot Be Listed or Called After Publishing

**Symptom:**

The model has been saved or submitted for review, but it is not displayed in the model marketplace, or calls fail.

**Possible Causes:**

- The model has not passed review or the listing operation has not been executed.
- A connectivity control, when provided, reported an error.
- Endpoint, request headers, API Key, or model source ID is configured incorrectly.
- Billing, rate-limit, or publishing region configuration is not as expected.

**Handling:**

1. Check [Model Review](../operator/approvals/model-reviews/) status.
2. Return to [My Models](../user/studio/my-models/) and view publishing, listing, and detail information.
3. Check whether the page provides a protocol connectivity control. If it does, record the visible result; if it does not, use the approved representative-call path.
4. Check Endpoint, request headers, model source ID, billing, and rate-limit configuration.
5. Retry only after the status, configuration, or error signal changes.

#### The Correct Role Entry Is Not Visible

**Symptom:**

The account cannot see the page needed to configure, publish, review, or call a model.

**Possible causes:**

- The account role does not include the required page permission.
- The user is viewing a different product area or tenant.

**Handling:**

1. Compare the task with the role table at the top of this page.
2. Ask the Operator Admin to confirm the account role and required menu permission.
3. Reopen Model Services and check for the matching page title.
4. If the page is still missing, provide the account role, page name, and tenant context to the platform administrator.

#### A Model Source Is Listed but Is Missing From the Publishing Form

**Symptom:**

The Model Source list contains the expected record, but the publishing form does not show it.

**Possible causes:**

- The source region does not match the selected publishing region.
- The source status or account permission prevents selection.

**Handling:**

1. Open [Model Sources](../operator/settings/model-source/) and check the source status, region, and identifier.
2. Compare those values with the publishing form's selected region and provider.
3. Reopen the publishing form and check the source selection control.
4. Ask the Operator Admin to resolve the mismatch if the record remains absent.

#### The Page Shows a Record but the Call Result Is Missing

**Symptom:**

The model appears in a list, but **"Playground"** or the API does not show a response.

**Possible causes:**

- List visibility does not confirm upstream connectivity.
- The credential, request header, protocol, or quota is incorrect.

**Handling:**

1. Check the model details page for the protocol, Endpoint, and required credential type.
2. Check the request ID and error code in **"Call Logs"**.
3. Ask the Model Provider or Operator Admin to verify the Model Source and quota.
4. Treat the call as verified only when the response area and the related log entry are both present.

## Notes

- This is a platform-level introduction and does not replace the field descriptions on each feature page.
- API Keys, Endpoints, request headers, and real call parameters are sensitive and must be redacted in screenshots and documentation.
- Publish regions, deployment records, model publishing, deletion, delisting, review rejection, rate limits, and billing adjustments may affect real service exposure and Model Consumers. Confirm impact scope and rollback options first.
- Before final publish, review submission, listing, deletion, or disablement, confirm the target, cost, visibility, permissions, and recovery plan.
- Documentation examples must not include real model IDs, API Keys, Endpoints, tenant information, user information, model repository addresses, or test parameters.

## Next Steps

1. Model providers should continue reading [My Models](../user/studio/my-models/), [My Deployments](../user/studio/my-deployments/), and [Model Earnings](../user/usage-earnings/model-earnings/).
2. Model Consumers should continue reading [Models](../user/discover/models/), [Playground](../user/playground/text/), and [My Calls](../user/my-calls/overview/).
3. Operator Admins should continue reading [Meta Models](../operator/settings/meta-models/), [Model Sources](../operator/settings/model-source/), [Model Templates](../operator/settings/model-templates/), tags, and review pages.
