# Model Services

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Subsystem Positioning

Model Services covers model publishing, review, experimentation, calling, logs, and revenue analysis. It helps model providers publish models, callers discover and use models, and operators govern model capabilities and review workflows.

#### Beginner Explanation

Model Services works like a model capability marketplace plus an operations console: model providers package and list models, callers try them in the model marketplace and Playground, and operators maintain meta-models, sources, templates, and review rules.

## Core Terms Quick Reference

| Term | Description |
| --- | --- |
| Meta-model | A capability abstraction that describes model protocol, modalities, Token limits, and default parameters. |
| Model source | The Endpoint, authentication method, and request header configuration used to call the actual model. |
| My Deployments | View model deployment records after on-cloud quick deployment, and enter the publish model flow from the `On-Cloud` list. |
| Provider | The entity that provides model capabilities, pricing, and service quality. |
| Personal Key | The personal access credential used by a user to call model services. |
| Review record | A review record created before a model or app is published. |
| Playground | A page for trying model outputs for text, image, audio, or video scenarios. |
| Call log | A troubleshooting entry that records request ID, error code, latency, Token usage, and redacted summary. |
| Revenue statistics | Revenue statistics by model, customer, and time. |

## Role Entry Points

| Role | Recommended Entry | Typical Tasks |
| --- | --- | --- |
| Model provider | [My Models](./user/studio/my-models/), [My Deployments](./user/studio/my-deployments/), [Model Revenue](./user/usage-earnings/model-earnings/) | Publish models, maintain versions, and view calls and revenue. Models submitted through on-cloud quick deployment can be viewed in `Studio > My Deployments` and then published. |
| Model caller | [Model Marketplace](./user/discover/models/), [Playground](./user/playground/text/), [My Calls](./user/my-calls/overview/) | Discover models, try outputs, integrate APIs, and troubleshoot calls. |
| Operator admin | [Meta-models](./operator/settings/meta-models/), [Model Sources](./operator/settings/model-source/), [Model Reviews](./operator/approvals/model-reviews/) | Maintain base configuration, review models, and govern visibility. |

## Where Should I Start

| User or Goal | Start Here | Next Step |
| --- | --- | --- |
| New user | [Getting Started](./getting-started/) | Understand the relationship among meta-models, model sources, templates, publishing, review, marketplace, and calls. |
| Full workflow | [Publish and Call a Model](./end-to-end/publish-and-call-model/) | Follow the end-to-end path for publishing, review, Playground trials, calls, revenue, and troubleshooting. |
| Operator admin | [Meta-models](./operator/settings/meta-models/), [Model Sources](./operator/settings/model-source/), [Model Reviews](./operator/approvals/model-reviews/) | Maintain base configuration, review models, and govern visibility. |
| Model provider | [My Models](./user/studio/my-models/), [My Deployments](./user/studio/my-deployments/), [Model Revenue](./user/usage-earnings/model-earnings/) | Publish models, track deployment records, and view revenue and customer calls. |
| Model caller | [Model Marketplace](./user/discover/models/), [Playground](./user/playground/text/), [My Calls](./user/my-calls/overview/) | Browse models, try outputs, integrate APIs, and view call logs. |

## Recommended Reading Path

1. New users should first read [Getting Started](./getting-started/) to understand the relationship between model publishing, review, and calling.
2. Operator admins should first maintain meta-models, sources, templates, and tags.
3. Model providers publish models in [My Models](./user/studio/my-models/). If a model is submitted through On-Cloud Quick Deployment first, view the deployment record in the `On-Cloud` list in [My Deployments](./user/studio/my-deployments/) and continue publishing.
4. Callers enter Playground from the model marketplace, then continuously optimize with call logs, usage, and revenue data.
5. For the full workflow, read [Publish and Call a Model](./end-to-end/publish-and-call-model/).

## Prerequisites

1. Confirm whether the current account is a model provider, caller, or operator admin.
2. Before publishing a model, prepare the model source, protocol, pricing, rate limits, and security notes.
3. Before calling a model, confirm the Personal Key, Endpoint, quota, and model visibility scope.
4. Before viewing revenue or customer calls, confirm that the current account has the required data permissions.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role Type | Yes | Enum | Model provider | Used to decide whether to enter user-side or operator-side pages first. |
| Model Object | No | Text | Example Model A | Used to locate the target model in Model Marketplace, My Models, reviews, or call records. |
| Call Credential | No | Text | PERSONAL-KEY-001 | Used to confirm whether the caller has a valid credential for accessing the model. Use placeholders only in documentation. |
| Review Status | No | Enum | Pending review | Used to determine whether a model or app can continue to listing and calling. |
| Statistical Scope | No | Time range | 2026-07-01 to 2026-07-31 | Used to view call, revenue, and customer-call data. |

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Correct entry selected | You can distinguish entries for model providers, callers, and operator admins. | Return to the role entry table and locate the entry again. |
| Workflow is clear | You understand the relationship among meta-models, model sources, templates, reviews, and the marketplace. | Read Getting Started and the end-to-end workflow first. |
| Calls can be troubleshot | When a call fails, you can locate Key, Endpoint, rate limit, or log issues. | Go to call logs, My Keys, or model sources for troubleshooting. |
| Revenue can be reconciled | You can find Model Revenue, Model Usage, and Customer Calls entries. | Align the statistical scope before comparing data. |

## Pitfalls

- Do not confuse meta-models, model sources, and published models. Meta-models define capabilities, model sources define access, and published models face the marketplace and callers.
- A successful Playground test does not mean production integration is complete. Before formal calls, verify Personal Key, rate limits, billing, and error logs.
- When a model is invisible in Model Marketplace, do not only refresh the page. Check review status, visibility scope, tags, and publishing index together.

## FAQ

#### Model Is Not Visible After Publishing

**Symptom:**

After submission, the model cannot be found in the model marketplace or My Models list.

**Possible Causes:**

- The model is still under review or the publishing task has not completed.
- Visibility scope, provider, or tag configuration is incorrect.
- Model source, template, or meta-model configuration is incomplete.

**Handling:**

1. Check the review record and publishing status in My Models.
2. Verify visibility scope, source, and template configuration.
3. If the review passed but the model is still invisible, contact the operator to check the publishing index.

#### Model Call Fails

**Symptom:**

Playground or API calls return authentication failure, rate limit, timeout, or upstream errors.

**Possible Causes:**

- Personal Key, API Key, or request headers are invalid.
- The model source Endpoint is unavailable.
- Rate limits, Token limits, or billing quota limits are triggered.

**Handling:**

1. Confirm that placeholders in call examples have been replaced with valid credentials.
2. Check request ID, error code, and latency in call logs.
3. Contact the provider or operator to verify source health, rate limits, and quota.

## Next Steps

1. Operator admins should periodically check consistency across meta-models, sources, and templates.
2. Model providers should track call quality, revenue, and customer feedback after publishing.
3. Callers should complete validation in Playground and call logs before production integration.

## Notes

- This page is used to select a reading path for Model Services. Specific fields, buttons, and statuses are subject to the corresponding feature pages.
- Publishing, review, delisting, rate limits, billing configuration, and publish regions affect model visibility, call methods, and real service exposure. Confirm the impact scope before making changes.
- Do not expose real accounts, Personal Keys, API Keys, tokens, request IDs, internal addresses, test parameters, customer names, or complete call content in documentation, screenshots, or tickets.
