# Publish and Call a Model

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

This document connects the Model Services operations of Operator Admins, Model Providers, and Model Consumers into one end-to-end path: Operator Admins first maintain meta-models, Model Sources, Model Templates, and tags; Model Providers publish single models or aggregation models and submit them for review; after review processing, Model Consumers view, try, and call models in **"Models"** and **"Playground"**; finally, each role views call, usage, and revenue data.

| Item | Content |
| --- | --- |
| Applicable Roles | Operator Admins, Model Providers, Model Consumers |
| Recommended prerequisites | [Getting Started](../../getting-started/), [Meta Models](../../operator/settings/meta-models/), [My Models](../../user/studio/my-models/), [My Deployments](../../user/studio/my-deployments/) |
| Output | A configured, reviewed model that is visible in the model marketplace and can be tried and called |
| Typical use | New model listing, third-party Endpoint access, aggregation model publishing, review acceptance, and call troubleshooting |

#### Beginner Explanation

Publishing and calling a model is like placing a model on a shelf and then completing a trial purchase: the operator prepares meta-models, sources, and templates; the provider publishes the model; the Model Consumer validates it in the marketplace, Playground, and API.

## Prerequisites

1. The Operator Admin has permissions for model service settings, app list, model reviews, and app reviews.
2. The Model Provider has permissions for Studio, model publishing, aggregation model creation, and review submission.
3. The Model Consumer has permissions for **"Models"**, **"Playground"**, and My Calls.
4. The Endpoint, API Key, model source ID, protocol, and default parameters required for publishing are prepared and reachable.
5. If the flow starts from On-Cloud Quick Deployment, the current account has permissions for `AI Infra > On-Cloud > Model Services > Quick Deployment` and `Model Services > Studio > My Deployments`.
6. Billing, rate limits, publishing region, and review workflow are clear.
7. All keys, internal Endpoint addresses, request IDs, and sensitive call parameters in documentation and screenshots are redacted.

## Page Description

### End-to-End Flow

| Stage | Operator | Goal |
| --- | --- | --- |
| Base data preparation | Operator Admin | Maintain meta-models, model sources, templates, and tags. |
| Single-Model Publishing | Model Provider | Configure meta-model, source, Endpoint, protocol, billing, and rate limits. |
| On-Cloud Quick Deployment Branch | Model Provider | Create a deployment record through On-Cloud Quick Deployment first, then select a publish region from My Deployments and enter the publish model page. |
| Aggregation Model Publishing | Model Provider | Select member models and configure routing policy, billing, and publishing method. |
| Review processing | Operator Admin | Review model or app publishing requests. |
| Marketplace display | Model Consumer | View details, providers, quick start, and performance in **"Models"**. |
| Playground call | Model Consumer | Select a model in **"Playground"** and complete text, image, video, or audio trials. |
| Data viewing | All Roles | View My Calls, call logs, usage details, model revenue, and customer calls. |
| Troubleshooting loop | All Roles | Check base configuration, review status, Endpoint, billing, rate limits, and call logs based on the failure path. |

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Meta-model | Capability abstraction that defines protocol, modalities, Token limits, and default parameters. |
| Model source | Endpoint, authentication, and request header configuration used to access the actual model capability. |
| My Deployments | Entry for viewing deployment records after On-Cloud Quick Deployment and entering the publish model flow. |
| Review record | The review record and handling comments created before a model or app is published. |
| Call log | Request record used to troubleshoot 401, 429, 5xx, timeout, and abnormal output issues. |

## Main Operations

### Step 1: Operator Admin Maintains Meta Models

1. Go to `Settings > Meta Models`.
2. If the model author is missing, add the model author first.
3. Click **"Add"** and configure the model name, model type, input modalities, output modalities, advanced capabilities, Token limits, protocol, and meta-model details.
4. After submission, confirm that the meta-model is visible in the list.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target meta-model is visible in Meta Models | The target meta-model appears in [Meta Models](../../operator/settings/meta-models/). | Check the list filters, target status, and Operator Admin permission. |
| Model type, input/output modalities, protocol, and context limit | Model type, input/output modalities, protocol, and context limit meet publishing requirements. | Check the page message first. Then check the target status, region, and account permission. |
| Publishing form shows this meta-model | Reopen the publishing form and check the meta-model selection control. | Compare the meta-model status and publishing region, then ask the Operator Admin to check permissions. |

### Step 2: Operator Admin Maintains Model Sources

1. Go to `Settings > Model Sources`.
2. Click **"Add"**.
3. Fill in provider, region, request URL, request headers, authentication information, and source description.
4. After submission, confirm that the model source is visible in the list.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target source is visible in Model Sources | The target source is visible in [Model Sources](../../operator/settings/model-source/). | Check the page message first. Then check the target status, region, and account permission. |
| Source region, request URL, and request header configuration | Source region, request URL, and request header configuration are accurate. | Check the page message first. Then check the target status, region, and account permission. |
| Publishing form shows this Model Source | Reopen the publishing form and check the Model Source selection control. | Compare the source region with the publishing region, then ask the Operator Admin to check status and permissions. |

### Step 3: Operator Admin Maintains Templates and Tags

1. Go to `Settings > Model Templates`.
2. Add a template and select Model Provider, author, meta-model, protocol, capabilities, and default parameters.
3. Go to `Settings > Tags` and maintain classification tags required in the model marketplace and publishing flow.
4. Confirm that the expected template and tag entries appear in their lists.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target template is visible in Model Templates | The target template appears in [Model Templates](../../operator/settings/model-templates/). | Check the template status, associated meta-model, and Operator Admin permission. |
| Target tag is visible in Tags | The target tag is visible in [Tags](../../operator/settings/tags/). | Check the page message first. Then check the target status, region, and account permission. |
| Publishing form shows the template and tag | Reopen the publishing form and check the corresponding selection controls. | Compare the object status and publishing region, then ask the Operator Admin to check permissions. |

### Step 4: Model Provider Publishes a Single Model

1. Go to `Studio > My Models`.
2. Switch to `My Published` and click **"Publish Model"**.
3. Select a publishing region, such as publishing to a private region or public region.
4. In basic information, select meta-model and model source, then fill in request URL, API Key, model source ID, request headers, input/output modalities, advanced capabilities, and Token limits.
5. Select the supported protocol. If the page provides a connectivity control, run it and record the visible result. If it does not, use the approved representative-call path before submission.
6. Fill in personalized identifier, description, and publishing method.
7. Go to billing configuration, select free or Token-based billing, and configure tier prices, cache-hit pricing, WebSearch, and free quota.
8. Go to rate-limit configuration and set RPM, TPM, or no limit.
9. Click **"Save Only"** or **"Submit for Review"** after checking the target, visibility, billing, rate limits, and recovery plan.

On-Cloud Quick Deployment branch:

1. Go to `AI Infra > On-Cloud > Model Services > Quick Deployment`.
2. Select the model, model version, resource pool, region, instance specification, and replicas according to the page flow, and verify resource usage, cost, and service exposure before submission.
3. After submission, the deployment record is displayed in the `On-Cloud` list under `Model Services > Studio > My Deployments`.
4. In [My Deployments](../../user/studio/my-deployments/), find the target deployment, click the publish entry, and select a publish region.
5. After the publish region is selected, the page redirects to the publish model page in [My Models](../../user/studio/my-models/), where you continue checking basic information, billing configuration, call configuration, and visibility.
6. Before the final **"Publish"**, **"Submit"**, or **"Save"**, confirm the target, visibility, cost, permission, and recovery plan.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target model is visible in My Models | The target model is visible in [My Models](../../user/studio/my-models/). | Check the page message first. Then check the target status, region, and account permission. |
| On-Cloud record is visible in My Deployments | After Quick Deployment submission, the target deployment record is visible in the `On-Cloud` list in [My Deployments](../../user/studio/my-deployments/). | Check Quick Deployment task status, account permissions, and deployment filters. |
| Connectivity result is visible, when provided | The connectivity control shows its actual success or error message. A saved record alone is not a connectivity result. | Check Endpoint, request headers, protocol, and the exact page message; otherwise use the approved representative-call path. |
| Model record shows the submitted state | My Models or the review page shows the actual record and status after the action. | Check the page message, selected publish region, permissions, and review status before retrying. |

### Step 5: Model Provider Creates an Aggregation Model

1. Go to `Studio > My Models`.
2. Switch to `My Aggregations` and click **"Create Aggregation Model"**.
3. Select a publishing region.
4. Select model type and model subtype.
5. Add two or more published member models.
6. Configure enabled status, minimum success rate, maximum concurrency rate, maximum context length, input Token cost, and output Token cost for member models.
7. Fill in personalized identifier, select matching strategy, tags, description, and publishing method.
8. Configure billing method, billing mode, and price.
9. Click **"Save Only"** or **"Submit for Review"** after checking the target, billing, visibility, and recovery plan.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target aggregation model is visible | The target aggregation model is visible in the My Aggregations list in [My Models](../../user/studio/my-models/). | Check the page message first. Then check the target status, region, and account permission. |
| Member model count is at least two | The member model count is at least two. | Check the page message first. Then check the target status, region, and account permission. |
| Matching strategy, billing configuration, and publishing method | Matching strategy, billing configuration, and publishing method match expectations. | Check the page message first. Then check the target status, region, and account permission. |

### Step 6: Operator Admin Processes Model Review

1. Go to `Approvals > Model Reviews`.
2. View the pending model list and filter by model name, status, or submission information.
3. Open target model details and check meta-model, source, Endpoint, protocol, billing, rate limits, tags, and publishing region.
4. Approve or reject based on the review result.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target review record status is updated | The target record in [Model Reviews](../../operator/approvals/model-reviews/) shows the actual status after processing. | Check the page message, review comment, and current permission before retrying. |
| Approved record is visible to the next role | The review record shows **"Approved"**; check **"Models"** or the publishing page separately for visibility. | Compare visibility scope, publishing status, and selected region. Do not treat approval alone as listing proof. |
| Rejection reason is clear | The rejected record shows a review comment that the Model Provider can act on. | Reopen the detail and check whether the comment is present; ask the Operator Admin if it is missing. |

### Step 7: Model Consumer Views the Model in Models

1. Go to `Discover > Models`.
2. Filter models by model name, model type, provider, tag, or search box.
3. Open target model details and view provider, quick start, performance, and overview.
4. Record the protocol, price, context, capability, and limits that must be confirmed before calling.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target model is visible in Models | The target model appears in [Models](../../user/discover/models/). | Check review status, visibility scope, publishing status, tags, and the current account permission. |
| Provider, quick start, performance, and overview information is complete | Provider, quick start, performance, and overview information is complete on the model details page. | Check the page message first. Then check the target status, region, and account permission. |
| Consumer can view quick-start information | The model details page shows the protocol, request information, and quick-start content. | Refresh the detail page, check model visibility, and ask the Model Provider or Operator Admin to update missing content. |

### Step 8: Model Consumer Tries the Model in Playground

1. Go to `Playground > Text Chat`, or enter image generation, video generation, or audio generation according to model type.
2. Click model selection and choose the target model.
3. Configure parameters such as Temperature, Top-P, Max Tokens, and Stream.
4. Enter test content and start generation.
5. Check response content, elapsed time, error information, and model effect.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Target model appears in Text Chat | The target model appears in the model selector in [Text Chat](../../user/playground/text/). | Check model visibility, modality, Personal Key, and account permission. |
| Response or error is visible | The response area shows generated content, or the page shows an error message. | Record the visible message and request ID, then check **"Call Logs"** and the Model Source configuration. |
| Call record is traceable | A related request ID or log entry appears in **"Call Logs"**, when the page provides one. | Check the selected model, time range, and log permissions; do not infer success from the page loading alone. |

### Step 9: View Calls, Usage, and Revenue

1. The Model Consumer goes to `My Calls > Overview` to view overall call trends.
2. The Model Consumer goes to `My Calls > Call Analytics` and `Call Logs` to view model-level and single-request details.
3. The Model Provider goes to `Usage & Earnings > Model Earnings` to view earnings overview and earning details.
4. The Model Provider goes to `Usage & Earnings > Model Usage` to view consumption details.
5. The Model Provider goes to `Customer Calls` to view customer-level overview, analytics, and logs.

Result checks:

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Call data appears in My Call Overview | [My Call Overview](../../user/my-calls/overview/) shows a call record or the page's empty-state message. | Check the time range, selected model, call status, and log permission. |
| Single request can be located in Call Logs | [Call Logs](../../user/my-calls/call-logs/) shows the request ID or a matching log entry. | Check the request time range and model filter, then ask the Operator Admin about log retention. |
| Earnings and consumption pages show data | [Model Earnings](../../user/usage-earnings/model-earnings/) and [Model Usage](../../user/usage-earnings/model-usage/) show records or the page's empty-state message. | Align the date range, model version, and account scope before contacting the Model Provider. |

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Meta-model | Yes | Text | Example Meta-model A | Defines model protocol, modalities, context, and capability boundaries. |
| Model Source | Yes | Text | Example Source A | Records Endpoint, authentication, request headers, and connectivity configuration. |
| Published Model | Yes | Text | Example Model A | Target model that the Model Provider submits for review and listing. |
| Review Record | System-generated | Text | REVIEW-202607130001 | Records model or app review status, comments, and processing result. |
| Call Credential | Yes | Text | `<PERSONAL_KEY>` | Credential used by Model Consumers for Playground and API integration. Placeholder examples are not real secrets. |
| Call Log | System-generated | Text | REQ-202607130001 | Key clue for troubleshooting 401, 429, 5xx, timeout, and output exceptions. |

## Pitfalls

- Meta-models, model sources, and model templates are prerequisite configurations for publishing. Missing any one of them may make the publishing form unavailable.
- Review approval only means listing is allowed. It does not mean the Model Consumer definitely has quota, visibility scope, and a valid Key.
- A successful Playground test does not mean production integration is complete. Before formal calls, verify rate limits, billing, error logs, and call credentials.
- Endpoint, API Key, request headers, and internal error logs are sensitive information and must be redacted before being written into documentation.
- On-Cloud Quick Deployment, publish region selection, and model publishing may change real service exposure. Before final **"Publish"**, **"Submit for Review"**, **"Save Only"**, or **"Create Aggregation Model"**, confirm the target, cost, visibility, permission, and recovery plan.
- **"Publish"**, **"Submit for Review"**, **"Approve"**, **"Reject"**, **"Create Aggregation Model"**, and **"Delete"** are high-risk actions. Confirm impact scope and rollback options before performing them.
- Do not record real model IDs, API Keys, Endpoints, model source credentials, tenant information, user information, call logs, or test parameters.

### Failure Branches and Troubleshooting Paths

#### Failure Branch: Model Review Is Rejected

Next hop: [Model Reviews](../../operator/approvals/model-reviews/)

**Symptom:** The Model Provider cannot publish after submission, and the review record shows rejection.

**Troubleshooting Path:**

1. Read the review comments and complete model description, pricing, samples, usage boundaries, and authorization materials.
2. Check whether model source, protocol, request headers, and security policy meet requirements.
3. Before resubmitting, validate source connectivity and output quality in a controlled environment.

#### Failure Branch: Model Source Connectivity Fails

Next hop: [Model Sources](../../operator/settings/model-source/)

**Symptom:** A Model Source or publishing-page connectivity control shows an error, or **"Playground"** cannot call the model after publishing.

**Troubleshooting Path:**

1. Check Endpoint, authentication request headers, API Key, and return format.
2. Confirm that the upstream service has no rate limits, allowlist restrictions, or network access restrictions.
3. After the visible error is resolved, use the approved representative-call path before associating the source with a template or publishing the model.

#### Failure Branch: Call Returns 401/429/5xx

Next hop: [My Call Logs](../../user/my-calls/call-logs/)

**Symptom:** The Model Consumer fails through API or Playground and receives authentication, rate-limit, or upstream errors.

**Troubleshooting Path:**

1. For 401, first check Personal Key, API Key, request headers, and model visibility scope.
2. For 429, first check QPM, Token limits, customer quota, and provider rate limits.
3. For 5xx, first check request ID, latency, and model source health in call logs.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Model visible | The target model appears in **"Models"** search results. | Check review status, visibility scope, publishing status, tags, and account permission. |
| Observable call result | **"Playground"** shows generated content or an error message. | Record the visible message and request ID, then check **"Call Logs"** and the Model Source configuration. |
| Troubleshooting entry | Review records, call logs, or a page-provided source test exposes a visible status or error message. | Open the matching review or call-log page, record the exact message and request ID, then follow the relevant failure branch. |

## FAQ

#### What should I do after model review is rejected?

**Symptom:**

The model submission is rejected, and Model Consumers cannot use it from the model marketplace.

**Possible Causes:**

Model description, tags, source, template, billing configuration, test results, or security materials are incomplete.

**How to Handle:**

Read the review comments. Complete model description, examples, source, template, and supporting materials. Before resubmission, confirm that sensitive information is sanitized. The record should then show the updated review status or the next page message.

#### What if the model is published but calls fail?

**Symptom:**

The model is visible, but Playground or API calls return 401, 429, 5xx, or timeout.

**Possible Causes:**

API Key, Token, Endpoint, rate-limit policy, model service status, or upstream model source is abnormal.

**How to Handle:**

Check credentials, Endpoint, and request parameters first. Then open [My Call Logs](../../user/my-calls/call-logs/) and review the visible request ID and error code. Ask the Model Provider or Operator Admin to check rate limits and Model Source configuration; retry after the error signal changes.

#### Why do usage and revenue numbers not match?

**Symptom:**

Call logs, model usage, model revenue, or customer-call statistics show inconsistent counts, time ranges, or amounts.

**Possible Causes:**

The statistical time range, model version, customer scope, billing rule, or synchronization time is different.

**How to Handle:**

Use the same time range, model version, and customer scope. Check call logs first, then model usage and revenue statistics. The pages should show the same filter scope before you compare values. If they still differ, keep redacted clues and contact the Operator Admin.

#### The Model Source Is Listed but Is Missing From the Publishing Form

**Symptom:**

The Model Source list contains the target record, but the publishing form does not show it.

**Possible causes:**

- The source region does not match the selected publishing region.
- The source status or account permission prevents selection.

**How to Handle:**

1. Open [Model Sources](../../operator/settings/model-source/) and check the source status, region, and identifier.
2. Compare those values with the publishing form's region and provider controls.
3. Reopen the form and check the Model Source selector.
4. Ask the Operator Admin to correct the mismatch; the source should then appear in the selector.

#### The Call Log Does Not Show the Recent Request

**Symptom:**

The Playground or API page shows a result or error, but no matching entry appears in **"Call Logs"**.

**Possible causes:**

- The time range or model filter excludes the request.
- The current role cannot view that log, or the record is outside the retention period.

**How to Handle:**

1. Record the call time, selected model, and any request ID shown on the calling page.
2. Clear the log filters and search again.
3. Ask the Operator Admin to check log permission and retention using the redacted request ID.
4. Continue only when the matching log entry or an explicit page error is visible.

## Notes

- This page follows the Meta Models manual structure. Use the linked feature pages for field-level operations.
- Do not expose real accounts, API Keys, tokens, Endpoint addresses, request IDs, customer names, or call payloads in documentation or screenshots.

## Next Steps

1. Convert verified meta-models, sources, templates, Endpoints, protocols, and default parameters into team standards.
2. Build stable tags, billing, rate limits, and quick-start instructions for high-frequency models.
3. For models that enter publishing through On-Cloud Quick Deployment, keep checking status consistency across [My Deployments](../../user/studio/my-deployments/), [My Models](../../user/studio/my-models/), and the model marketplace.
4. Periodically check call logs, revenue, customer calls, and failure rates.
5. Before delisting or deleting deprecated models, confirm Model Consumer impact scope and alternatives.
