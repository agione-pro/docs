# Inference Templates

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator |
| Navigation Path | On-Prem > Templates > Inference Templates |
| Page Route | `/powerone/fast-build-v2/inference-templates` |
| Managed Object | Configuration, status, and relationships on Inference Templates |

#### Beginner Explanation

An inference template is like an assembly list for a model service. It combines frameworks, specifications, default parameters, and visibility scope so users can quickly create services from the template during deployment.

#### Terms

| Term | Description |
| --- | --- |
| Template | Deployment plan selected when users create model instances. |
| Factor Form | Parameter set filled in by users when creating instances. |
| Dynamic Expression | Dynamically calculates field values or display conditions based on user input, model, precision, or resource conditions. |

#### Recommended Operation Order

Confirm prerequisites for Inference templates, model scope, framework scope, specification recommendations, form parameters, and publication status, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Inference Templates, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. Model configuration, framework configuration, and VRAM estimation have been completed.
2. Available resource specifications have been created and associated with target clusters.
3. Image services and required storage capabilities have been connected.
4. The parameters that users need to fill in when creating instances have been clarified.

## Page Description

Use this page to manage inference templates, model and framework scopes, recommended specifications, form parameters, and publishing state.

![Inference Templates](./images/manual-inference-templates.png)

The list shows one card per template, with the model name, the author, a context chip such as `262K`, the `Capabilities` chips, the accelerator chip, and the `Deployable` or `Undeployable` state at the right end. The page header provides author filter chips, a `Search model / author / tag / accelerator` box, a `Default` sort control, a `Clear filters` button, the import/export icon, and the `Create Inference Template` button. The `Updated` time is shown on the details page rather than in the list.

## Main Operations

### Create Inference Template

#### Applicable Scenarios

Use **"Create Inference Template"** when a model version must be offered as a deployable inference service through a specific framework version. One model version can be linked to different framework versions, but the same combination cannot be created twice.

#### Steps

1. Go to `On-Prem > Templates > Inference Templates`.
2. In the top right, click **"+ Create Inference Template"**. The dialog subtitle reads `Select a model version and a framework version to create an inference template.`
3. In the `Model configuration` group, select the target model in `Model`, for example `qwen3.5-0.8b`.
4. In the same group, select a version in `* Model Version`. It is the only required field in the dialog and stays unavailable until a model is selected.
5. Read the hint under the group: `A model version can use different framework versions. The same combination cannot be created twice.`
6. In the `Template configuration` group, select an adapted inference framework in `Framework Version`, for example `vLLM:v0.21.0`. The example is taken from the `Framework Relations` tabs on the details page, not from the dialog itself.
7. In `Template Name`, verify or customize the name. The `Use model name by default` hint means the name is filled from the model automatically.
8. Click **"Save"** to submit, or click **"Cancel"** and `×` to leave without creating a template. `Save` stays disabled while the required selection is incomplete.

The following figure shows the `Create Inference Template` dialog in its empty state: `Model` and `* Model Version` are grouped under `Model configuration`, and `Framework Version` and `Template Name` under `Template configuration`.

![Create inference template](./images/manual-create-inference-template.png)

#### Result Validation

- The template appears in the Inference Templates list, and its row shows `Deployable` or `Undeployable`.
- Opening the template shows the combination as a tab under `Framework Relations`, and the tab carries its own state, for example `Available`.
- `Model Version Switch` shows the model version, the framework relation count, and the overall state, for example `3 framework relations` and `All available`.

#### Notes

- Prepare the model configuration, framework, and runtime image before you create a template; a template does not resolve a missing dependency.
- Do not expose internal image addresses, storage locations, startup configuration, or credentials in template parameters.
- **"Save"** in this dialog is a high-risk final action. Verify the model, model version, and framework version combination before clicking it.
- The same model version and framework version combination cannot be created twice, as the hint line in the dialog states.

### Manage Framework Relations

#### Applicable Scenarios

Use the details page of a template to maintain which framework versions a model version can run on, and to check the runtime image, extra parameters, and bound accelerators of each relation.

#### Steps

1. On the Inference Templates list, click the expander icon at the right end of the target row to open the details page.
2. Check the `Model Summary` card, which shows the model name, tags such as `Public models` and `All available`, and the `Updated` time.
3. In `Model Version Switch`, select the target model version, for example `bf16`.
4. In `Framework Relations`, switch between the framework version tabs to review each relation.
5. Click `+` at the right end of the tab bar to add a framework relation.
6. On the opened tab, click `Edit` to change the relation or `Delete` to remove it. The state control beside the framework version name shows the current relation state, for example `Available`.
7. Review `Runtime image` under `LINKED FRAMEWORK INFO`, the entries under `TEMPLATE EXTRA PARAMETERS` where an empty relation shows `No extra parameters`, and the vendor and accelerator cards under `BOUND ACCELERATORS`.
8. To change the linked factor form, use the pencil icon on the `Linked VRAM Factor Form` card.

The following figure shows the details page of a template: `Model Summary`, `Linked VRAM Factor Form`, `Model Version Switch`, and `Framework Relations` together with its `LINKED FRAMEWORK INFO`, `TEMPLATE EXTRA PARAMETERS`, and `BOUND ACCELERATORS` blocks.

![Inference template details](./images/inference-template-detail.png)

#### Result Validation

- The tab bar matches the framework versions you maintain, and each tab shows its own state.
- `Runtime image` under `LINKED FRAMEWORK INFO` corresponds to the framework version that is currently selected.
- `BOUND ACCELERATORS` lists the accelerator models the relation can run on, with a managed count such as `1 Managed`.

#### Notes

- `Delete` removes the deployment option that the relation provides for this model version. Confirm the downstream impact before deleting it.
- A runtime image must be pullable by the target cluster. Do not write internal registry addresses into the template.
- The dialogs opened by `+`, `Edit`, `Delete`, and the pencil icon are not covered by the screenshots on this page, so their fields are not described here.

### Import or Export Inference Templates

#### Applicable Scenarios

Use the import/export entry to batch-maintain inference templates, or to export template configurations for audit, reconciliation, and controlled migration.

#### Steps

1. Go to `On-Prem > Templates > Inference Templates`.
2. Click the import/export icon in the top right, then choose to import or export according to the business purpose.
3. For import, upload the file as required by the page and verify template, model, framework, resource specification, factor form, and visibility scope.
4. For export, confirm the template filter scope, then generate and download the template configuration as prompted by the page.
5. Before importing, verify that dependencies are available in the target environment. Save export files in a controlled directory.

#### Result Validation

- After import, the Inference Templates list shows the added or updated template and state.
- The template scope in the export file matches the current filter conditions.
- Model, framework, specification, and parameter references in template details can be resolved correctly.

#### Notes

- Template import depends on model, framework, image, and specification objects. Do not submit it when dependencies are missing in the target environment.
- Import may update a template with the same identifier. Verify release scope, default parameter values, and downstream deployment impact first.
## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Template Name | Yes | Text | `llm-inference-template` | Template name users see when creating inference services. Use a maintainable name instead of temporary test naming. |
| Description | No | Multi-line text | `<description>` | Template purpose, adapted model, and usage boundary. Write non-sensitive notes only. Do not include internal addresses or test parameters. |
| Applicable Scenario | Conditionally required | Dropdown / enum | `Model inference` | Business scenario or model service type for the template. Keep it consistent with model type, framework capability, and user entry. |
| Publication Scope | Conditionally required | Dropdown / enum | `<option>` | Scope where the template is published to the user side. Confirm affected tenants, regions, and entries before publishing. |
| Visibility Scope | Yes | Dropdown / enum | `Tenant A` | Controls which users or tenants can use the template. Incorrect scope may make the template invisible or visible to non-target tenants. |
| Model | Conditionally required | Dropdown / enum | `Qwen3.5-0.8B` | Model or model set applicable to the template. Dependent objects must be available and match the framework. |
| Model Version | Conditionally required | Dropdown / enum | `bf16` | Model version referenced by the template. Keep it consistent with model path, quantization method, and VRAM estimation rules. |
| Model Source | Conditionally required | Address / path | `Object Storage` | Model file source, repository source, or object storage source. Do not write real model repository addresses, endpoints, or internal paths. |
| Framework | Yes | Text | `vLLM` | Runtime framework configuration called by the template. The framework must support the selected model type and runtime mode. |
| Framework Version | Conditionally required | Text | `v0.21.0` | Framework version referenced by the template. Confirm impact on existing templates and instances before modification. |
| Runtime Image | Conditionally required | Text | `<BASE_URL>/<PROJECT>/<IMAGE>:<TAG>` | Container image used by the framework runtime. Confirm image region, registry permissions, and target cluster pull access. |
| Resource Specification | Yes | Number / capacity | `gpu-a100-1card` | Default recommended or selectable compute specification for the template. Match model VRAM, concurrency, context length, and deployment mode. |
| Deployment Mode | Yes | Dropdown / enum | `Single instance` | Determines service replicas, scaling, and scheduling mode. Keep it consistent with framework startup commands and resource specifications. |
| VRAM Estimation Rule | Conditionally required | Number / capacity | `80` | VRAM rule used to recommend or validate specifications. Keep it consistent with model parameter count, quantization method, and context length. |
| Service Port | Conditionally required | Port / number | `8000` | Actual listening or exposed port of the model service. Must match the actual framework listening port. |
| Port Exposure Policy | Conditionally required | Port / number | `<option>` | Port exposure method and authentication mechanism. Incorrect configuration may expand service exposure scope. |
| Port Tag | No | Port / number | `OpenAI API Port` | Identifies port protocol type or purpose. Keep it consistent with OpenAI API, Ollama API, or custom protocol. |
| Health Check | Conditionally required | Address / path | `/health` | Path or command used to determine whether the service starts successfully. Match the actual service path, port, and startup delay. |
| Factor Form | Conditionally required | Configuration text | `Context length` | Parameter form that users fill in when creating instances. Verify fields, default values, and validation rules one by one. |
| Default Parameters | No | Dropdown / enum | `--max-model-len 8192` | Model or runtime parameters prefilled when creating services. Do not write real tokens, AK/SK, private keys, endpoints, or test values. |
| Dynamic Expression | Conditionally required | Dropdown / enum | `${gpuCount} >= 1` | Dynamically calculates fields or visibility based on model, framework, specification, or user input. Expression errors can cause missing fields or abnormal startup commands. |
| Trigger Condition | Conditionally required | Dropdown / enum | `Model type = LLM` | Controls fields displayed under specific models, frameworks, or options. Validate with actual model, framework, and specification combinations. |
| Actions | System-generated | Action entry | `Edit` | Create, save, publish, edit, and delete operations on this page. `Save` (the template create dialog) and `Publish` are high-risk final actions. |

## Pitfalls

- Publishing an inference template affects user-side selectable templates and the real service creation scope.
- Incorrect visibility scope may make the template invisible or visible to non-target tenants.
- Mismatched model, framework, image, specification, or VRAM rules can cause instance creation or startup failures.
- Incorrect default parameters, dynamic expressions, or trigger conditions can cause missing user form fields, wrong parameters, or abnormal startup commands.
- Incorrect port exposure policy may expand the service exposure scope.
- Do not write real tokens, AK/SK, private keys, endpoints, internal addresses, model repository addresses, tenant IDs, cluster IDs, or test parameters.
- `Save` (Create Inference Template dialog) and `Publish` are high-risk final actions. Confirm the model, model version, and framework version combination before executing `Save`, and confirm the publish scope before executing `Publish`.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Inference Templates opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | Configuration, status, and relationships on Inference Templates is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### An Imported Inference Template Cannot Be Published or Deployed

**Symptom:**

The template import completes, but its state is abnormal or the template cannot be used on later publish or deployment pages.

**Possible Causes:**

- The model, framework, image, or specification is missing or unavailable in the target environment.
- Factor fields, default values, or validation rules are incompatible.
- Template visibility or state does not allow downstream use.

**Solution:**

1. Open template details and verify the model, framework, image, and resource specification one by one.
2. Open the corresponding configuration pages to verify dependency state and version compatibility.
3. Check template visibility, release state, and factor-form validation rules.

#### Target Is Missing from Inference Templates

**Symptom:**

The page opens, but the expected Configuration, status, and relationships on Inference Templates is missing.

**Possible Causes:**

- Filters remain active.
- the object belongs to another scope.
- a prerequisite is incomplete.

**Solution:**

1. Reset filters
2. verify region or tenant ownership
3. confirm prerequisite state.

#### The Operation Entry on Inference Templates Is Unavailable

**Symptom:**

The create, register, or maintain entry is hidden or disabled.

**Possible Causes:**

- Role permission is insufficient.
- the page is read-only.
- dependencies are not ready.

**Solution:**

1. Check Operator permission
2. read the page message
3. complete dependency configuration first.

#### Inference Templates Has an Abnormal State After the Operation

**Symptom:**

A record exists after submission, but its state is unexpected.

**Possible Causes:**

- Connectivity or validation failed.
- a dependency is abnormal.
- processing is incomplete.

**Solution:**

1. Check feedback and update time
2. inspect related objects
3. troubleshoot the processing stage.

#### A Downstream Page Cannot Use Inference Templates

**Symptom:**

The current page is normal, but a downstream page cannot select or associate Configuration, status, and relationships on Inference Templates.

**Possible Causes:**

- Visibility differs.
- the object is disabled.
- downstream cache is stale.

**Solution:**

1. Check enabled state and ownership
2. verify role visibility
3. refresh and select again.

## Notes

- Template parameters must not contain real tokens, keys, or internal addresses.
- Before publishing a template, confirm that dependent models, frameworks, images, specifications, and storage are all available.
- Before modifying a published template, confirm the impact on user-side instance creation, template visibility scope, and active deployment entries.
- Before you save a template or edit a framework relation, verify the scope and impact and execute the action only after approval.

## Next Steps

1. Use a test tenant to create a model instance and verify the template.
2. Adjust image, startup command, ports, and parameters based on failure logs.
3. After template publication, periodically review model versions, framework versions, and specification scope.
4. Review failure logs by model, framework, specification, and factor form combination to continuously calibrate the template.
