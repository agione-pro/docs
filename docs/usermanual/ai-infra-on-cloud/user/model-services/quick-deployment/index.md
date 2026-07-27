# Quick Deployment

::: info Document Information
Version: v1.0
Updated: 2026-07-21
:::

## Feature Overview

`Quick Deployment` is used to select deployable models in Model Library, choose an inference engine, business strategy, and compute matching plan through Smart Deployment Recommendation, and finally launch a cloud model service deployment task.

| Item | Content |
| --- | --- |
| Applicable role | User |
| Navigation path | AI Infrastructure > On-Cloud > Model Services > Quick Deployment |
| Page route | `/infrahub/user/model/store` |
| Managed objects | Deployable scope, matched models, deployment mode, inference engine, business strategy, compute matching plan, cloud account, and deployment task |
| Typical use | Quickly select a model and launch deployment based on authorized cloud accounts and regions |

#### Beginner Explanation

Quick Deployment works like choosing a deployable model from Model Library and letting the platform recommend a deployment plan based on the current cloud account, region, strategy, and resource inventory. Before submission, verify the model, compute resources, cost, and cloud account to avoid launching a real deployment task by mistake.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Deployable Scope | Cloud platforms and regions available to the current account. |
| Matched Models | Models that can be deployed under the current deployable scope and filter conditions. |
| Deployment Mode | Deployment form. The screenshots show `Single Node`, `Validation, low traffic, cost`, and `High Availability`. |
| Inference Engine | Inference framework used to run the model service. The screenshots show `vLLM` and `SGLang`. |
| Business Strategy | Sorting preference for recommended deployment plans. The screenshots show `Economy`, `Performance`, `Fast stock`, and `GPU quantity`. |
| Compute Matching Plan | Cloud platform, region, specification, and cost combination recommended by the platform based on model, region, engine, and strategy. |

## Prerequisites

1. The current account has `Quick Deployment` and model deployment permissions.
2. Available cloud accounts, cloud platforms, regions, resource pools, and model authorization already exist.
3. The target model, inference engine, deployment mode, and compute plan have been evaluated for business use.
4. Before deployment, confirm that cost, resource usage, task name, and cloud account information are sanitized.

## Page Description

This page is used to launch quick deployment from Model Library. Users can select cloud platforms and regions in `Deployable Scope`, filter models in `Matched Models` by model type, series, scenario, keyword, and sort order, and click `Deploy Model` in a model row to enter Smart Deployment Recommendation.

Page screenshot:

![Deployable Scope](./images/deployable-scope.png)

The Smart Deployment Recommendation page displays the selected model, deployment mode, inference engine, business strategy, and model compute matching plans. After confirming a recommended plan, users can open the `Publish Deployment` dialog and fill in cloud account, task name, and task description.

## Main Operations

### Deploy Model

1. Go to `AI Infrastructure > On-Cloud > Model Services > Quick Deployment`.
2. In `Deployable Scope`, select an available cloud platform and region. Use `All Clouds`, `All Regions`, or the actual page filters to narrow the scope.
3. In `Matched Models`, filter models by `All Models`, `All Series`, `All Scenarios`, the search box, or `Default Sort`.
4. After finding the target model, click `Details` first if you need to view model information, and then click `Deploy Model`.

![Deployable Scope](./images/deployable-scope.png)

5. On the `Smart Deployment Recommendation` page, verify `Selected Model` and `Deployment Mode`.
6. Select an `Inference Engine`. The screenshots show `vLLM` and `SGLang`.
7. Select a `Business Strategy`. The screenshots show `Economy`, `Performance`, `Fast stock`, and `GPU quantity`.
8. In `Model Compute Matching Plans`, review the recommended cloud platform, region, GPU, CPU/Memory, and cost estimate.
9. After confirming the plan, click `Confirm Deployment` to open the `Publish Deployment` dialog.

![Smart Deployment Recommendation](./images/smart-deployment-recommendation.png)

10. In the `Publish Deployment` dialog, select `Cloud Account`, fill in `Task Name`, and fill in `Task Description`.
11. Before clicking the final `Launch Deployment`, verify the model, cloud account, region, resource specification, and cost impact again.
12. For learning or page validation only, click `Back to Recommendation` or close the dialog without submitting a real deployment task.
13. If a real submission is performed, the new deployment and its status will be displayed in the `My Deployments` list and in the `On-Cloud` list under `Model Services > Studio > My Deployments`.

![Publish Deployment](./images/publish-deployment.png)

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Current Scope | No | Status tag | `Sample Cloud / Sample Region` | Displays the currently selected deployable cloud platform and region. |
| All Clouds | No | Dropdown filter | `All Clouds` | Filters deployable scope by cloud platform. |
| All Regions | No | Dropdown filter | `All Regions` | Filters deployable scope by region. |
| All Models | No | Dropdown filter | `All Models` | Filters matched models by model type. |
| All Series | No | Dropdown filter | `All Series` | Filters matched models by model series. |
| All Scenarios | No | Dropdown filter | `All Scenarios` | Filters matched models by model scenario. |
| Search | No | Input/Button | `Search` | Searches by model name, author, series, or source. |
| Default Sort | No | Button | `Default Sort` | Sorts the model list by the page default rule. |
| Details | No | Action entry | `Details` | Opens model details. |
| Deploy Model | Yes | Action entry | `Deploy Model` | Enters the Smart Deployment Recommendation flow. |
| Selected Model | Yes | Display field | `Sample Model` | Displays the model and tags prepared for deployment. |
| Deployment Mode | Yes | Segmented control | `Single Node` | Selects deployment mode. The screenshots show single node, validation/low traffic/cost, and high availability options. |
| Inference Engine | Yes | Radio card | `vLLM` | Selects the inference engine used to deploy the model. |
| Business Strategy | Yes | Radio card | `Economy` | Selects the sorting preference for recommended deployment plans. |
| Model Compute Matching Plans | Yes | Recommendation card | `Sample Cloud / Sample Region` | Displays the recommended cloud platform, region, specification, and cost combination. |
| GPU | No | Display field | `Sample GPU x 1` | GPU resources in the recommended plan. |
| CPU / Memory | No | Display field | `Sample CPU / Sample Memory` | CPU and memory specification in the recommended plan. |
| Cost Estimate | No | Display field | `Sample cost` | Displays hourly, daily, monthly, and yearly cost estimates. Real amount details are not recorded in documentation. |
| Confirm Deployment | No | Button | `Confirm Deployment` | Opens the publish deployment confirmation dialog. |
| Cloud Account | Yes | Dropdown | `example-cloud-account` | Selects the cloud account used to launch deployment. Use placeholder examples only in documentation. |
| Task Name | Yes | Text | `demo_deploy_task` | Deployment task name. Avoid real business or customer information. |
| Task Description | No | Multiline text | `Sample task description` | Adds deployment notes. Do not write accounts, secrets, internal addresses, or internal parameters. |
| Back to Recommendation | No | Button | `Back to Recommendation` | Returns to the recommendation page without submitting the deployment task. |
| Launch Deployment | Yes | Button | `Launch Deployment` | Final action that launches the deployment task. Review carefully before clicking. |

## Pitfalls

- The screenshots do not show environment variables, startup parameters, replicas, runtime image, or runtime framework fields, so this page does not document them as confirmed UI fields.
- The current deployable scope is determined by cloud account, region authorization, resource pools, and model authorization. Empty options do not necessarily mean the page is faulty.
- Cost estimates may change with cloud platform, region, resource specification, and billing policy. Review them before submission.
- `Launch Deployment` creates a real deployment task and may occupy resource pool capacity and incur costs.
- Do not write real accounts, secrets, tokens, AK/SK, internal addresses, image registry credentials, model storage paths, cloud resource IDs, or internal test parameters in documentation, screenshots, or tickets.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page is accessible | The `Quick Deployment` page and Model Library are displayed. | Check menu permissions, route, and login status. |
| Quick deployment entry is visible | `Deploy Model` is displayed for the target model in the model list. | Check model authorization, deployable scope, and filters. |
| Smart Deployment Recommendation opens | Clicking `Deploy Model` opens the `Smart Deployment Recommendation` page. | Refresh the page and retry. If the issue persists, contact the administrator. |
| Required fields are displayed | Selected model, deployment mode, inference engine, business strategy, and compute matching plan are displayed. | Check whether the model, cloud account, region, and resource pool are available. |
| Publish Deployment dialog opens | Clicking `Confirm Deployment` displays cloud account, task name, task description, back to recommendation, and launch deployment. | Check whether a recommended plan has been selected. |
| Validation prompts work | Missing required fields trigger page validation prompts, and the flow can continue after they are completed. | Complete cloud account and task name as prompted. |
| No real submission during learning | The final `Launch Deployment` is not clicked and no real deployment task is created. | If submitted by mistake, immediately go to My Deployments to check task status and contact the operator. |
| Real submission can be tracked | The deployment task appears in the `My Deployments` list and in the `On-Cloud` list under `Model Services > Studio > My Deployments`; status, cloud account, region, model, and specification match the submitted configuration. | Go to `My Deployments` or `Model Services > Studio > My Deployments` to view events, status, and error prompts. |

## Troubleshooting

| Issue Type | Check First | Next Step |
| --- | --- | --- |
| No deployable scope | Cloud account authorization, region authorization, and current scope filters. | Click `Refresh Resources` and retry. If it is still empty, contact the operator. |
| Model is not visible | Model type, series, scenario, keyword, and model authorization. | Click `Default Sort` or clear filters and search again. |
| No recommended compute plan | Resource pool capacity, cloud platform region, inference engine, and business strategy. | Change region, engine, or strategy and retry. |
| Publish deployment cannot be submitted | Whether cloud account, task name, and recommended plan are selected. | Complete required fields according to page validation prompts. |
| Deployment fails | My Deployments events, model, resource specification, cloud account, and cost configuration. | Adjust the plan and retry, then contact the operator with sanitized task name, time, and error summary. |

## FAQ

#### Model or Specification Cannot Be Selected

**Issue Symptom:**

After entering Quick Deployment, the model list is empty, the deployment entry is unavailable, or no recommendation plan is generated.

**Possible Causes:**

- The current cloud account or region is not authorized.
- The model asset is not authorized to the current user.
- Filters are too narrow.
- Resource pool capacity is insufficient, so no matching plan can be generated.

**Handling:**

1. Click `Refresh Resources` and clear filters.
2. Switch cloud platform, region, model type, series, or scenario and check again.
3. Contact the operator to verify model assets, cloud account authorization, resource pools, and quotas.

#### Deployment Creation Fails

**Issue Symptom:**

Deployment fails after clicking `Launch Deployment`, or My Deployments shows creation failed.

**Possible Causes:**

- Recommended resource capacity is insufficient or has changed.
- The model, inference engine, or compute plan does not match.
- The cloud account is unavailable or has insufficient authorization scope.
- Cost, quota, or scheduling policy does not meet deployment requirements.

**Handling:**

1. Go to My Deployments to view events and error information.
2. Return to Quick Deployment, adjust cloud platform, region, inference engine, or business strategy, and retry.
3. Contact the operator with sanitized task name, time, region, model, and error summary.

## Next Steps

1. Go to `My Deployments` to view deployment status, events, and monitoring.
2. After deployment succeeds, obtain redacted invocation information and perform a test call according to permission.
3. Continue to monitor cost estimates, resource usage, service status, and business access results.

## Notes

- Deploying a model may create a real inference service, occupy resource pool capacity, and incur costs.
- Incorrect model, inference engine, cloud account, region, resource specification, or task configuration may cause deployment failure or service exceptions.
- `Launch Deployment`, `Deploy`, `Submit`, and `OK` are high-risk final actions. This document only describes field review and pre-submission checks, and does not guide users to submit during testing or learning.
- Screenshots or documentation must not expose real accounts, secrets, tokens, AK/SK, internal addresses, image registry credentials, model storage paths, cloud resource IDs, Endpoint, API Key, or internal test parameters.
