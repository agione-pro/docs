# Overview

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

Model Services covers model publishing, review, experimentation, calling, logs, and revenue analysis. It helps Model Providers publish models, Model Consumers discover and use models, and Operator Admins govern model capabilities and review workflows.

#### Beginner Explanation

Model Services has two sides: the customer-facing model service pages and the operator console. Model Providers publish models, Model Consumers try them in **"Models"** and **"Playground"**, and Operator Admins maintain meta-models, sources, templates, and review rules.

### Core Terms Quick Reference

| Term | Description |
| --- | --- |
| Meta-model | A capability abstraction that describes model protocol, modalities, Token limits, and default parameters. |
| Model Source | The Endpoint, authentication method, and request header configuration used to call the actual model. |
| My Deployments | View model deployment records after on-cloud quick deployment, and enter the publish model flow from the `On-Cloud` list. |
| Provider | The entity that provides model capabilities, pricing, and service quality. |
| Personal Key | The personal access credential used by a user to call model services. |
| Review record | A review record created before a model or app is published. |
| Playground | A page for trying model outputs for text, image, audio, or video scenarios. |
| Call log | A troubleshooting entry that records request ID, error code, latency, Token usage, and redacted summary. |
| Revenue statistics | Revenue statistics by model, customer, and time. |

## Prerequisites

1. Confirm whether the current account is a Model Provider, Model Consumer, or Operator Admin.
2. Before publishing a model, prepare the model source, protocol, pricing, rate limits, and security notes.
3. Before calling a model, confirm the Personal Key, Endpoint, quota, and model visibility scope.
4. Before viewing revenue or customer calls, confirm that the current account has the required data permissions.

## Page Description

### Role Entry Points

| Role | Recommended Entry | Typical Tasks |
| --- | --- | --- |
| Model Provider | [My Models](./user/studio/my-models/), [My Deployments](./user/studio/my-deployments/), [Model Earnings](./user/usage-earnings/model-earnings/) | Publish models, maintain versions, and view calls and earnings. Models submitted through on-cloud quick deployment can be viewed in `Studio > My Deployments` and then published. |
| Model Consumer | [Models](./user/discover/models/), [Playground](./user/playground/text/), [My Calls](./user/my-calls/overview/) | Discover models, try outputs, integrate APIs, and troubleshoot calls. |
| Operator Admin | [Meta Models](./operator/settings/meta-models/), [Model Sources](./operator/settings/model-source/), [Model Reviews](./operator/approvals/model-reviews/) | Maintain base configuration, review models, and govern visibility. |

## Main Operations

### Choose a Role-Based Entry

| User or Goal | Start Here | Next Step |
| --- | --- | --- |
| New User | [Getting Started](./getting-started/) | Understand the relationship among meta-models, model sources, templates, publishing, review, marketplace, and calls. |
| Full workflow | [Publish and Call a Model](./end-to-end/publish-and-call-model/) | Follow the end-to-end path for publishing, review, Playground trials, calls, revenue, and troubleshooting. |
| Operator Admin | [Meta Models](./operator/settings/meta-models/), [Model Sources](./operator/settings/model-source/), [Model Reviews](./operator/approvals/model-reviews/) | Maintain base configuration, review models, and govern visibility. |
| Model Provider | [My Models](./user/studio/my-models/), [My Deployments](./user/studio/my-deployments/), [Model Earnings](./user/usage-earnings/model-earnings/) | Publish models, track deployment records, and view earnings and customer calls. |
| Model Consumer | [Models](./user/discover/models/), [Playground](./user/playground/text/), [My Calls](./user/my-calls/overview/) | Browse models, try outputs, integrate APIs, and view call logs. |

### Locate a Page by Goal

| Goal | Recommended Entry | Next Step |
| --- | --- | --- |
| Learn Model Services for the first time | [Getting Started](./getting-started/) | Decide whether you are a Model Provider, Model Consumer, or Operator Admin. |
| Find and try a model | [Models](./user/discover/models/) | Open Playground and verify inputs, outputs, and the calling method. |
| Publish or maintain a model | [My Models](./user/studio/my-models/) | Prepare the model source, deployment configuration, review materials, and API information. |
| Troubleshoot calls or earnings | [My Calls](./user/my-calls/overview/) | Cross-check call logs, analytics, and earnings data. |

### Follow the Recommended Reading Path

1. New users should first read [Getting Started](./getting-started/) to choose a role and reach a first visible result.
2. Operator Admins should first maintain meta-models, sources, templates, and tags.
3. Model Providers publish models in [My Models](./user/studio/my-models/). If a model is submitted through On-Cloud Quick Deployment first, view the deployment record in the `On-Cloud` list in [My Deployments](./user/studio/my-deployments/) and continue publishing.
4. Model Consumers enter **"Playground"** from **"Models"**, then use call logs and usage data to troubleshoot and measure calls.
5. For the full workflow, read [Publish and Call a Model](./end-to-end/publish-and-call-model/).

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role Type | Yes | Enum | Model Provider | Used to decide whether to enter user-side or operator-side pages first. |
| Model Object | No | Text | Example Model A | Used to locate the target model in **"Models"**, My Models, reviews, or call records. |
| Call Credential | No | Text | `<PERSONAL_KEY>` | Used to confirm whether the Model Consumer has a valid credential for accessing the model. Use placeholders only in documentation. |
| Review Status | No | Enum | Pending review | Used to determine whether a model or app can continue to listing and calling. |
| Statistical Scope | No | Time range | 2026-07-01 to 2026-07-31 | Used to view call, revenue, and customer-call data. |

## Pitfalls

- Do not confuse meta-models, model sources, and published models. Meta-models define capabilities, model sources define access, and published models are the records shown to Model Consumers.
- A successful Playground test does not mean production integration is complete. Before formal calls, verify Personal Key, rate limits, billing, and error logs.
- When a model is missing from **"Models"**, do not only refresh the page. Check review status, visibility scope, tags, and the publishing record together.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Role entry | The selected link opens a page whose title and menu match the chosen role. | Return to the role entry table, then ask the Operator Admin to check missing menu permissions. |
| First task path | The selected Getting Started or end-to-end page shows the next linked feature page. | Reopen the task path and use the first link for the chosen role. |
| Call troubleshooting entry | **"Call Logs"** or **"My Calls"** shows filters, records, or an empty-state message. | Check the time range, selected model, and log permission. |
| Earnings entry | Model Earnings, Model Usage, or Customer Calls shows the expected page title and filter controls. | Check the role, account scope, and selected time range. |

## FAQ

#### Model Is Not Visible After Publishing

**Symptom:**

After submission, the model cannot be found in **"Models"** or the My Models list.

**Possible Causes:**

- The model is still under review or the publishing task has not completed.
- Visibility scope, provider, or tag configuration is incorrect.
- Model source, template, or meta-model configuration is incomplete.

**Handling:**

1. Check the review record and publishing status in My Models.
2. Verify visibility scope, source, and template configuration.
3. If the review passed but the model is still invisible, ask the Operator Admin to check the publishing record.
4. Confirm that the model appears in **"Models"** after the visibility and status checks are complete.

#### Model Call Fails

**Symptom:**

Playground or API calls return an authentication failure, rate-limit error, timeout, or upstream error.

**Possible Causes:**

- Personal Key, API Key, or request headers are invalid.
- The Model Source Endpoint returns an error.
- Rate limits, Token limits, or billing quota limits are triggered.

**Handling:**

1. Confirm that placeholders in call examples have been replaced with valid credentials.
2. Check the request ID, error code, and latency in **"Call Logs"**.
3. Ask the Model Provider or Operator Admin to verify source configuration, rate limits, and quota.
4. Retry only after the error signal or configuration value has changed.

#### I do not know which page to open first

**Symptom:**

After opening Model Services, you are not sure whether to configure, publish, review, or call a model.

**Possible cause:**

The account role and the task have not been matched to an entry page.

**Handling:**

1. Open **"Meta Models"**, **"Model Sources"**, or **"Model Reviews"** when you maintain configuration or review models.
2. Open **"Studio"** and **"My Models"** when you publish a model.
3. Open **"Models"** and then **"Playground"** when you call a model.
4. If the menu is missing, ask the Operator Admin to confirm the account role; the correct entry should then be visible.

#### A required object is missing from the publishing form

**Symptom:**

The publishing form does not list the target meta-model, Model Source, or template.

**Possible causes:**

- The object has not been created or enabled.
- The object does not match the publishing region.
- The account cannot view the object.

**Handling:**

1. Ask the Operator Admin to check [Meta Models](./operator/settings/meta-models/), [Model Sources](./operator/settings/model-source/), and [Model Templates](./operator/settings/model-templates/).
2. Compare the publishing region with the Model Source region.
3. Reopen the publishing form and check the selection control again.
4. If the object is still missing, provide the page name and selected filters to the Operator Admin.

#### A Playground result is not enough for production integration

**Symptom:**

Playground returns a result, but a production API call has not been verified.

**Possible causes:**

- Playground and production use different credentials or parameters.
- Quota, rate limits, or visibility scope differ.

**Handling:**

1. Read the protocol, pricing, and quick-start information on the model details page.
2. Use a controlled test credential for one representative call.
3. Check the request ID and error code in **"Call Logs"**.
4. Move to production only after the call result and the related log entry match expectations.

## Notes

- This page is used to select a reading path for Model Services. Specific fields, buttons, and statuses are subject to the corresponding feature pages.
- Publishing, review, delisting, rate limits, billing configuration, and publish regions affect model visibility, call methods, and real service exposure. Confirm the impact scope before making changes.
- Do not expose real accounts, Personal Keys, API Keys, tokens, request IDs, internal addresses, test parameters, customer names, or complete call content in documentation, screenshots, or tickets.

## Next Steps

1. Operator Admins should periodically check consistency across meta-models, sources, and templates.
2. Model Providers should track call quality, revenue, and customer feedback after publishing.
3. Model Consumers should complete validation in Playground and call logs before production integration.
