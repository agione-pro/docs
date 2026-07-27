# Frameworks

::: info Document Information
Version: v1.0
Updated: 2026-07-20
:::

## Feature Overview

`Frameworks` is used to maintain runtime frameworks that can be selected during model deployment. Operators can add frameworks by cloud platform and region, and configure framework version, image, port, master node startup command, worker node startup command, environment variables, and extended parameters.

| Item | Content |
| --- | --- |
| Applicable role | Operator |
| Navigation path | AI Infrastructure > On-Cloud > Deploy Assets > Frameworks |
| Page route | `/infrahub/op/model/framework` |
| Managed objects | Cloud platform, cloud account, region, framework type, framework name, version, image, and startup commands |
| Typical use | Add or maintain inference frameworks that can be selected when adding models in the model library |

#### Beginner Explanation

A framework works like the runtime instruction for model deployment. It tells the platform which cloud platform and region to use, which image to run, which port to listen on, and how master and worker nodes should start.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Cloud Platform | Cloud platform to which the framework belongs. |
| Cloud Account | Account under the selected cloud platform used to manage framework resources. |
| Region | Cloud platform region where the framework is available. |
| Framework Type | Capability or runtime type of the framework, such as LLM or vLLM. |
| Image | Container image required to run the framework. |
| Master Node Startup Command | Command executed by the master node container to start the framework service. |
| Worker Node Startup Command | Command executed by the worker node container to start the framework service. |

## Prerequisites

1. The target cloud platform, cloud account, and region have been connected and are available.
2. The inference image to be used is ready and can be selected on the page.
3. The framework type, version, port, and startup commands have been confirmed.
4. Environment variables and extended parameters have been sanitized and do not contain real credentials or internal sensitive parameters.

## Page Description

This page is used to view and add frameworks. The list supports filtering by cloud platform tab, `Framework Name`, and `Framework Type`, and provides `Search`, `Reset`, `Export`, `Import`, and `Add Framework`. Framework cards display framework name, description, version, framework type, cloud platform, region, update time, and action entries such as `Details`, `Edit`, and more actions.

Page screenshot:

![Frameworks List](./images/frameworks-list.png)

## Main Operations

### Add Framework

1. Go to `AI Infrastructure > On-Cloud > Deploy Assets > Frameworks`.
2. Click `Add Framework` to open the add framework dialog.
3. Select `Cloud Platform`, and then select `Cloud Account` and `Region` as required by the page.
4. Fill in `Framework Type`, `Framework Name`, `Framework Description`, `Framework Version`, and `Default API Suffix`.
5. Select `Image`, and fill in `Port`, `Master Node Startup Command`, and `Worker Node Startup Command`.
6. If required by the page, click `Add Environment Variable` or `Add Extended Parameter` to add runtime parameters.
7. Before clicking the final `Confirm`, verify the cloud platform, region, framework version, image, port, and startup commands again.
8. For learning or page validation only, click `Cancel` or close the dialog without submitting real framework configuration.

Key step screenshot:

![Add Framework](./images/add-framework.png)

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Cloud Platform | Yes | Tab/Single select | `Alibaba Cloud` | Selects the cloud platform to which the framework belongs. |
| Cloud Account | Yes | Dropdown | `Sample Cloud Account` | Selects the cloud account under the current cloud platform. |
| Region | Yes | Dropdown | `East China-Shanghai 1` | Selects the region where the framework is available. |
| Framework Type | Yes | Text | `LLM` | Framework type. The page example includes `LLM`. |
| Framework Name | Yes | Text | `Sample Framework` | Framework display name in the list and model configuration. |
| Framework Description | No | Multiline text | `Sample description` | Describes the framework purpose or compatible scenario. Do not write internal sensitive information. |
| Framework Version | Yes | Text | `v1.0` | Framework version. |
| Default API Suffix | No | Text | `/v1/chat/completions` | Default API path suffix for the model service. |
| Image | Yes | Dropdown | `Sample Image` | Runtime image used by the framework. |
| Port | Yes | Number/Text | `8000` | Port listened on by the framework service. |
| Master Node Startup Command | Yes | Multiline text | `python3 /opt/start.py` | Startup command for the master node. Examples must be sanitized. |
| Worker Node Startup Command | No | Multiline text | `python3 /opt/worker.py` | Startup command for worker nodes, filled in when required by the framework. |
| Environment Variables | No | Key-value configuration | `ENV_NAME=value` | Added through `Add Environment Variable`. Do not write real secrets. |
| Extended Parameters | No | Key-value configuration | `PARAM=value` | Added through `Add Extended Parameter`. Do not write internal sensitive parameters. |
| Export | No | Button | `Export` | Exports framework configuration and may contain sensitive operational information. |
| Import | No | Button | `Import` | Imports framework configuration in bulk and may change multiple records. |
| Cancel | No | Button | `Cancel` | Closes the dialog without saving the current configuration. |
| Confirm | Yes | Button | `Confirm` | Submits the framework configuration. Review carefully before clicking. |

## Pitfalls

- If framework version, image, and startup commands do not match, the service may fail to start after deployment.
- The port should match the image and service listening port. Otherwise, deployment may succeed but access may fail.
- Environment variables, extended parameters, and startup commands must not contain real keys, tokens, internal network addresses, or internal download paths.
- `Import` may update framework configuration in bulk. Do not perform a real import during learning or page validation.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page is accessible | The `Frameworks` page and framework list are displayed. | Check menu permissions, route, and login status. |
| Framework list loads | Framework cards display name, version, framework type, cloud platform, region, and action entries. | Check filters, data permissions, and API status. |
| Add entry is visible | `Add Framework` is displayed in the upper-right corner. | Check operator permissions and page configuration. |
| Add dialog opens | The dialog displays cloud platform, cloud account, region, framework type, framework name, version, image, port, and startup command fields. | Refresh the page and retry. If the issue persists, contact the administrator. |
| Required fields and validation prompts work | Missing required fields trigger page validation prompts, and the flow can continue after they are completed. | Complete the prompted fields and verify cloud platform, cloud account, region, and image status. |
| No real submission during learning | The final `Confirm` is not clicked and no real framework configuration is written. | If submitted by mistake, immediately check the framework list and model library options. |
| Real submission can be tracked | The new framework appears in the list, and version, cloud platform, region, and availability can be viewed. | Return to the list or details page to verify configuration and test with a model. |

## FAQ

#### Framework Startup Fails

**Issue Symptom:**

The deployment instance enters failed status, restarts repeatedly, or the service is inaccessible.

**Possible Causes:**

- Master or worker node startup command parameters are incorrect.
- The image lacks framework dependencies or the version does not match.
- Port, environment variable, or extended parameter configuration is incorrect.

**Handling:**

1. View deployment events and container logs.
2. Verify framework version, image, port, and startup commands.
3. Revalidate framework availability with sanitized test parameters.

#### Framework Is Unavailable in Model Configuration

**Issue Symptom:**

The framework has been added, but it cannot be selected when adding a model or selecting a compute plan in the model library.

**Possible Causes:**

- The framework cloud platform or region does not match the model deployment point.
- Framework type or version does not match model requirements.
- Image, cloud account, or region status is abnormal.

**Handling:**

1. Check the framework cloud platform, cloud account, and region.
2. Verify the model deployment point, model type, and framework type.
3. Confirm that image and related authorization configuration are available.

## Next Steps

1. Select the framework when adding a model in the model library and validate the compute plan.
2. Create a deployment with a test model to confirm service startup and health check results.
3. Regularly review framework images, startup commands, and environment variables to avoid outdated configuration.

## Notes

- Adding a framework may affect available runtime environments and inference task startup behavior for model deployment.
- Incorrect framework version, image, or startup command may cause deployment failure, resource waste, or service exceptions.
- `Confirm`, `Save`, and `Submit` are high-risk final actions. This document only describes field review and pre-submission checks, and does not guide users to submit during testing or learning.
- Do not write real image registry credentials, tokens, AK/SK, internal startup parameters, internal network addresses, cloud resource IDs, or internal test parameters.
