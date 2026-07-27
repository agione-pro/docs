# Publish and Call a Model

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

This document connects the Model Services operations of operator admins, model providers, and model callers into one end-to-end path: operator admins first maintain meta-models, model sources, templates, and tags; model providers publish single models or aggregation models and submit them for review; after operator admins complete review, model callers view, try, and call models in the model marketplace and Playground; finally, each role views call, usage, and revenue data.

| Item | Content |
| --- | --- |
| Applicable roles | Operator admins, model providers, model callers |
| Recommended prerequisites | [Getting Started](../../getting-started/), [Meta-models](../../operator/settings/meta-models/), [My Models](../../user/studio/my-models/), [My Deployments](../../user/studio/my-deployments/) |
| Output | A configured, reviewed model that is visible in the model marketplace and can be tried and called |
| Typical use | New model listing, third-party Endpoint access, aggregation model publishing, review acceptance, and call troubleshooting |

#### Beginner Explanation

Publishing and calling a model is like placing a model on a shelf and then completing a trial purchase: the operator prepares meta-models, sources, and templates; the provider publishes the model; the caller validates it in the marketplace, Playground, and API.

## End-to-End Flow

| Stage | Operator | Goal |
| --- | --- | --- |
| Base data preparation | Operator admin | Maintain meta-models, model sources, templates, and tags. |
| Single-model publishing | Model provider | Configure meta-model, source, Endpoint, protocol, billing, and rate limits. |
| On-Cloud Quick Deployment branch | Model provider | Create a deployment record through On-Cloud Quick Deployment first, then select a publish region from My Deployments and enter the publish model page. |
| Aggregation model publishing | Model provider | Select member models and configure routing policy, billing, and publishing method. |
| Review processing | Operator admin | Review model or app publishing requests. |
| Marketplace display | Model caller | View details, providers, quick start, and performance in the model marketplace. |
| Playground call | Model caller | Select a model in Playground and complete text, image, video, or audio trials. |
| Data viewing | All roles | View My Calls, call logs, usage details, model revenue, and customer calls. |
| Troubleshooting loop | All roles | Check base configuration, review status, Endpoint, billing, rate limits, and call logs based on the failure path. |

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Meta-model | Capability abstraction that defines protocol, modalities, Token limits, and default parameters. |
| Model source | Endpoint, authentication, and request header configuration used to access the actual model capability. |
| My Deployments | Entry for viewing deployment records after On-Cloud Quick Deployment and entering the publish model flow. |
| Review record | The review record and handling comments created before a model or app is published. |
| Call log | Request record used to troubleshoot 401, 429, 5xx, timeout, and abnormal output issues. |

## Prerequisites

1. The operator admin has permissions for model service settings, app list, model reviews, and app reviews.
2. The model provider has permissions for Studio, model publishing, aggregation model creation, and review submission.
3. The model caller has permissions for the model marketplace, Playground, and My Calls.
4. The Endpoint, API Key, model source ID, protocol, and default parameters required for publishing are prepared and reachable.
5. If the flow starts from On-Cloud Quick Deployment, the current account has permissions for `AI Infra > On-Cloud > Model Services > Quick Deployment` and `Model Services > Studio > My Deployments`.
6. Billing, rate limits, publishing region, and review workflow are clear.
7. All keys, internal Endpoint addresses, request IDs, and sensitive call parameters in documentation and screenshots are redacted.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Meta-model | Yes | Text | Example Meta-model A | Defines model protocol, modalities, context, and capability boundaries. |
| Model Source | Yes | Text | Example Source A | Records Endpoint, authentication, request headers, and connectivity configuration. |
| Published Model | Yes | Text | Example Model A | Target model that the model provider submits for review and listing. |
| Review Record | System-generated | Text | REVIEW-202607130001 | Records model or app review status, comments, and processing result. |
| Call Credential | Yes | Text | PERSONAL-KEY-001 | Credential used by callers for Playground and API integration. Placeholder examples are not real secrets. |
| Call Log | System-generated | Text | REQ-202607130001 | Key clue for troubleshooting 401, 429, 5xx, timeout, and output exceptions. |

## Pitfalls

- Meta-models, model sources, and model templates are prerequisite configurations for publishing. Missing any one of them may make the publishing form unavailable.
- Review approval only means listing is allowed. It does not mean the caller definitely has quota, visibility scope, and a valid Key.
- A successful Playground test does not mean production integration is complete. Before formal calls, verify rate limits, billing, error logs, and call credentials.
- Endpoint, API Key, request headers, and internal error logs are sensitive information and must be redacted before being written into documentation.
- On-Cloud Quick Deployment, publish region selection, and model publishing may change real service exposure. For learning or page validation only, do not perform final `Publish`, `Submit`, `Save`, or `Create` actions.
- `Publish`, `Submit for Review`, `Approve`, `Reject`, `List`, `Create Aggregation Model`, and `Delete` are high-risk actions. Confirm impact scope and rollback options before performing them.
- For learning or screenshots, only view pages, fields, statuses, and navigation. Do not perform final publish, submit for review, approve, reject, list, create aggregation model, or delete actions.
- Do not record real model IDs, API Keys, Endpoints, model source credentials, tenant information, user information, call logs, or test parameters.

## Step 1: Operator Admin Maintains Meta-models

1. Go to `Settings > Meta-models`.
2. If the model author is missing, add the model author first.
3. Click add meta-model, then configure model name, model type, input modalities, output modalities, advanced capabilities, Token limits, protocol, and meta-model details.
4. After submission, confirm that the meta-model is visible in the list.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target meta-model is visible in Meta-models | The target meta-model is visible in [Meta-models](../../operator/settings/meta-models/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Model type, input/output modalities, protocol, and context limit | Model type, input/output modalities, protocol, and context limit meet publishing requirements. | Return to this step and check prerequisites, permissions, and configuration status. |
| Model provider can select this meta-model | The model provider can select this meta-model during publishing. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 2: Operator Admin Maintains Model Sources

1. Go to `Settings > Model Sources`.
2. Click add model source.
3. Fill in provider, region, request URL, request headers, authentication information, and source description.
4. After submission, confirm that the model source is visible in the list.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target source is visible in Model Sources | The target source is visible in [Model Sources](../../operator/settings/model-source/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Source region, request URL, and request header configuration | Source region, request URL, and request header configuration are accurate. | Return to this step and check prerequisites, permissions, and configuration status. |
| Source can be selected or reused when publishing a model | The source can be selected or reused when publishing a model. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 3: Operator Admin Maintains Templates and Tags

1. Go to `Settings > Templates`.
2. Add a template and select model provider, author, meta-model, protocol, capabilities, and default parameters.
3. Go to `Settings > Tags` and maintain classification tags required in the model marketplace and publishing flow.
4. Confirm that templates and tags are both available.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target template is visible in Templates | The target template is visible in [Templates](../../operator/settings/model-templates/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Target tag is visible in Tags | The target tag is visible in [Tags](../../operator/settings/tags/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Corresponding template and tag can be selected | The corresponding template and tag can be selected when publishing a model or aggregation model. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 4: Model Provider Publishes a Single Model

1. Go to `Studio > My Models`.
2. Switch to `My Published` and click `Publish Model`.
3. Select a publishing region, such as publishing to a private region or public region.
4. In basic information, select meta-model and model source, then fill in request URL, API Key, model source ID, request headers, input/output modalities, advanced capabilities, and Token limits.
5. Select supported protocols and complete the protocol connectivity test.
6. Fill in personalized identifier, description, and publishing method.
7. Go to billing configuration, select free or Token-based billing, and configure tier prices, cache-hit pricing, WebSearch, and free quota.
8. Go to rate-limit configuration and set RPM, TPM, or no limit.
9. Click `Save Only` or `Submit for Review`.

On-Cloud Quick Deployment branch:

1. Go to `AI Infra > On-Cloud > Model Services > Quick Deployment`.
2. Select the model, model version, resource pool, region, instance specification, and replicas according to the page flow, and verify resource usage, cost, and service exposure before submission.
3. After submission, the deployment record is displayed in the `On-Cloud` list under `Model Services > Studio > My Deployments`.
4. In [My Deployments](../../user/studio/my-deployments/), find the target deployment, click the publish entry, and select a publish region.
5. After the publish region is selected, the page redirects to the publish model page in [My Models](../../user/studio/my-models/), where you continue checking basic information, billing configuration, call configuration, and visibility.
6. For learning or page validation only, confirm the deployment record, publish region dialog, and redirect result without performing the final `Publish`, `Submit`, or `Save`.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target model is visible in My Models | The target model is visible in [My Models](../../user/studio/my-models/). | Return to this step and check prerequisites, permissions, and configuration status. |
| On-Cloud record is visible in My Deployments | After Quick Deployment submission, the target deployment record is visible in the `On-Cloud` list in [My Deployments](../../user/studio/my-deployments/). | Check Quick Deployment task status, account permissions, and deployment filters. |
| Protocol connectivity test passes | The protocol connectivity test passes. | Return to this step and check prerequisites, permissions, and configuration status. |
| Model is saved or submitted for review | The model is saved or submitted for review successfully. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 5: Model Provider Creates an Aggregation Model

1. Go to `Studio > My Models`.
2. Switch to `My Aggregations` and click `Create Aggregation Model`.
3. Select a publishing region.
4. Select model type and model subtype.
5. Add two or more published member models.
6. Configure enabled status, minimum success rate, maximum concurrency rate, maximum context length, input Token cost, and output Token cost for member models.
7. Fill in personalized identifier, select matching strategy, tags, description, and publishing method.
8. Configure billing method, billing mode, and price.
9. Click `Save Only` or `Submit for Review`.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target aggregation model is visible | The target aggregation model is visible in the My Aggregations list in [My Models](../../user/studio/my-models/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Member model count is at least two | The member model count is at least two. | Return to this step and check prerequisites, permissions, and configuration status. |
| Matching strategy, billing configuration, and publishing method | Matching strategy, billing configuration, and publishing method match expectations. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 6: Operator Admin Processes Model Review

1. Go to `Approvals > Model Reviews`.
2. View the pending model list and filter by model name, status, or submission information.
3. Open target model details and check meta-model, source, Endpoint, protocol, billing, rate limits, tags, and publishing region.
4. Approve or reject based on the review result.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target review record status is updated | The target review record status is updated in [Model Reviews](../../operator/approvals/model-reviews/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Model can enter listing or display flow after approval | After approval, the model can enter the listing or display flow. | Return to this step and check prerequisites, permissions, and configuration status. |
| Rejection reason is clear | When rejected, the reason is clear and the model provider can revise accordingly. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 7: Model Caller Views the Model in the Marketplace

1. Go to `Discover > Model Marketplace`.
2. Filter models by model name, model type, provider, tag, or search box.
3. Open target model details and view provider, quick start, performance, and overview.
4. Record the protocol, price, context, capability, and limits that must be confirmed before calling.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target model is visible in Model Marketplace | The target model is visible in [Model Marketplace](../../user/discover/models/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Provider, quick start, performance, and overview information is complete | Provider, quick start, performance, and overview information is complete on the model details page. | Return to this step and check prerequisites, permissions, and configuration status. |
| Caller can prepare integration | The caller can prepare integration based on quick-start information. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 8: Model Caller Tries the Model in Playground

1. Go to `Playground > Text Chat`, or enter image generation, video generation, or audio generation according to model type.
2. Click model selection and choose the target model.
3. Configure parameters such as Temperature, Top-P, Max Tokens, and Stream.
4. Enter test content and start generation.
5. Check response content, elapsed time, error information, and model effect.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target model can be selected in Text Chat | The target model can be selected in [Text Chat](../../user/playground/text/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Model returns an expected response | The model returns an expected response. | Return to this step and check prerequisites, permissions, and configuration status. |
| Error information supports troubleshooting | If the call fails, the error information can help locate Endpoint, protocol, rate-limit, or billing issues. | Return to this step and check prerequisites, permissions, and configuration status. |

## Step 9: View Calls, Usage, and Revenue

1. The caller goes to `My Calls > Overview` to view overall call trends.
2. The caller goes to `My Calls > Call Analytics` and `Call Logs` to view model-level and single-request details.
3. The model provider goes to `Usage & Revenue > Model Revenue` to view revenue overview and revenue details.
4. The model provider goes to `Usage & Revenue > Model Usage` to view consumption details.
5. The model provider goes to `Customer Calls` to view customer-level overview, analytics, and logs.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Call data is visible in My Call Overview | Call data is visible in [My Call Overview](../../user/my-calls/overview/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Single request can be located in Call Logs | A single request can be located in [Call Logs](../../user/my-calls/call-logs/). | Return to this step and check prerequisites, permissions, and configuration status. |
| Revenue and consumption can be viewed | Revenue and consumption can be viewed in [Model Revenue](../../user/usage-earnings/model-earnings/) and [Model Usage](../../user/usage-earnings/model-usage/). | Return to this step and check prerequisites, permissions, and configuration status. |

## Failure Branches and Troubleshooting Paths

#### Failure Branch: Model Review Is Rejected

Next hop: [Model Reviews](../../operator/approvals/model-reviews/)

**Symptom:** The model provider cannot publish after submission, and the review record shows rejection.

**Troubleshooting Path:**

1. Read the review comments and complete model description, pricing, samples, usage boundaries, and authorization materials.
2. Check whether model source, protocol, request headers, and security policy meet requirements.
3. Before resubmitting, validate source connectivity and output quality in a controlled environment.

#### Failure Branch: Model Source Connectivity Fails

Next hop: [Model Sources](../../operator/settings/model-source/)

**Symptom:** The model source test fails, or Playground cannot call the model after publishing.

**Troubleshooting Path:**

1. Check Endpoint, authentication request headers, API Key, and return format.
2. Confirm that the upstream service has no rate limits, allowlist restrictions, or network access restrictions.
3. After a redacted request sample passes validation, associate the source with a template or publish the model.

#### Failure Branch: Call Returns 401/429/5xx

Next hop: [My Call Logs](../../user/my-calls/call-logs/)

**Symptom:** The caller fails through API or Playground and receives authentication, rate-limit, or upstream errors.

**Troubleshooting Path:**

1. For 401, first check Personal Key, API Key, request headers, and model visibility scope.
2. For 429, first check QPM, Token limits, customer quota, and provider rate limits.
3. For 5xx, first check request ID, latency, and model source health in call logs.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Model visible | The target model can be searched in the model marketplace | Enter details and quick start |
| Normal status | Model review has passed and Playground can return results | Start production calling or revenue tracking |
| Troubleshooting entry available | Review records, call logs, or source tests can locate the error | Continue troubleshooting by failure branch |

## FAQ

#### What should I do after model review is rejected?

**Symptom:**

The model submission is rejected, and callers cannot use it from the model marketplace.

**Possible Causes:**

Model description, tags, source, template, billing configuration, test results, or security materials are incomplete.

**How to Handle:**

Read the review comments. Complete model description, examples, source, template, and test materials. Before resubmission, confirm that sensitive information is sanitized.

#### What if the model is published but calls fail?

**Symptom:**

The model is visible, but Playground or API calls return 401, 429, 5xx, or timeout.

**Possible Causes:**

API Key, Token, Endpoint, rate-limit policy, model service status, or upstream model source is abnormal.

**How to Handle:**

Check credentials, Endpoint, and request parameters first. Then review call logs, rate-limit configuration, model deployment status, and model source connectivity.

#### Why do usage and revenue numbers not match?

**Symptom:**

Call logs, model usage, model revenue, or customer-call statistics show inconsistent counts, time ranges, or amounts.

**Possible Causes:**

The statistical time range, model version, customer scope, billing rule, or synchronization time is different.

**How to Handle:**

Use the same time range, model version, and customer scope. Check call logs first, then model usage and revenue statistics. If still inconsistent, keep desensitized clues and contact operations.


## Next Steps

1. Convert verified meta-models, sources, templates, Endpoints, protocols, and default parameters into team standards.
2. Build stable tags, billing, rate limits, and quick-start instructions for high-frequency models.
3. For models that enter publishing through On-Cloud Quick Deployment, keep checking status consistency across [My Deployments](../../user/studio/my-deployments/), [My Models](../../user/studio/my-models/), and the model marketplace.
4. Periodically check call logs, revenue, customer calls, and failure rates.
5. Before delisting or deleting deprecated models, confirm caller impact scope and alternatives.
