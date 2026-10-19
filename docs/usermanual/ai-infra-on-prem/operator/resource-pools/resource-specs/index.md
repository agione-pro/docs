# Resource Specs

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator |
| Navigation Path | AI Infra(On-Prem) > Resource Pools > Resource Specs |
| Page Route | `/powerone/resourcepool/flavor/list` |
| Managed Object | Configuration, status, and relationships on Resource Specs |

#### Beginner Explanation

- **Resource specification** is like a resource package. Users select it to request resources when creating jobs or services.
- **Specification metric** is a resource item in the package. CPU, memory, or accelerator metrics must exist before they can be combined into specifications.
- **Associated cluster** determines where the specification is available. After creation, the specification still needs to match actual cluster capacity.

#### Terms

| Term | Description |
| --- | --- |
| Specification ID | Resource package name displayed on the user side or job creation page. |
| CPU | CPU cores or CPU metric quantity included in the specification. |
| Memory | Memory capacity included in the specification. |

#### Recommended Operation Order

Confirm prerequisites for specification metrics, the specification ID, the configuration entries and their units, the credits price, and the status, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Resource Specs, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The current account has operator permissions and can access `AI Infra(On-Prem) > Resource Pools > Resource Specs`.
2. Specification metrics have been configured, and CPU, memory, and accelerator metrics are available.
3. If the specification includes accelerators, accelerator model, k8s-key, selector-key, and resources actually reported by cluster nodes have been confirmed.
4. Specification naming, resource tiers, applicable job types, and later cluster association scope have been planned.

## Page Description

Use this page to maintain specification IDs and their resource configuration entries, the price in credits, the enabled state, and the specification metrics that group the list.

![Resource Specs](./images/manual-resource-specs.png)

The list groups specifications by specification metric, and each group header shows the metric name together with the number of specifications it contains. Each row contains `Spec ID`, `Resource Configuration`, `Pricing (credits)`, `Status`, and `Actions`. CPU, memory, and accelerator entries appear as chips inside the `Resource Configuration` column, and the actual price and the guidance price share the `Pricing (credits)` column as two lines. Use the search box to look up specifications by specification ID or metric name, then click `Search` or `Reset`.

## Main Operations

### Manage Specification Metrics

The `Specification group navigation` panel stays on the left of the page under the `Specification Metrics` heading. Because the list groups specifications by these metrics, a metric is a prerequisite object of a specification.

#### Applicable Scenarios

Add or change a specification metric when a specification must reference a new accelerator or another resource item, or when an existing metric needs a new name, unit, k8s-key, or selector-key.

#### Steps

1. Go to `AI Infra(On-Prem) > Resource Pools > Resource Specs` and look at the `Specification Metrics` list in the `Specification group navigation` panel, which is split into `Basic Metrics Only`, accelerator metrics, and the items under the `Metrics below have no specifications` divider.
2. Click **"Add specification metric"** to open the metric dialog.
3. Choose `AI accelerator metric` or `Other metric` in the `Metric type` segmented control. For an accelerator metric, the read-only `Monitoring metric` card below shows its source.
4. Fill in `Metric name` (1-30 characters), `Unit`, `k8s-key`, and `selector-key`. The `k8s-key` and `selector-key` options come from resources actually reported by cluster nodes.
5. Click **"Confirm"** to submit.

#### Result Validation

- The new metric appears in the `Specification Metrics` panel and is available as a `Category` option in the `Configuration` table of the `Add New Specification` dialog.
- A metric that no specification uses yet is listed under the `Metrics below have no specifications` divider.

#### Notes

- Each item in the panel offers `Edit` and `Disable` in its menu. Confirm the impact on specifications and jobs before disabling a metric that is already in use.
- Once a specification uses the metric, changing its name, unit, k8s-key, or selector-key affects the scheduling basis of those specifications.

### Add Resource Specification

#### Applicable Scenarios

Add a specification when resource tiers are required for training, inference, development, or model services, or when different resource combinations need to be provided by CPU, memory, accelerator model, and card count.

#### Steps

1. Go to `AI Infra(On-Prem) > Resource Pools > Resource Specs`.
2. Click **"Add"**, which opens the `Add New Specification` dialog.
3. Fill in `Specification ID`. Use an ID that reflects the resource tier and the applicable scenario.
4. Maintain the resource entries as rows of the `Configuration` table (`Category`, `Configuration size`, `Unit`, and `Actions`). The dialog starts with a `cpu` row and a `memory` row; click **"Add"** to append a row, and remove a row from its `Actions` cell.
5. The `Category` options come from the metrics listed in the `Specification Metrics` panel, so an accelerator option is available only after that metric exists and is enabled.
6. Before clicking the final **"Confirm"**, verify the resource combination and the naming convention again.

The following figure shows the `Add New Specification` dialog. Clarify the CPU, memory, and accelerator combination during creation.

![Add Resource Specification](./images/add-new-specification.png)

#### Result Validation

- After a successful submit, the specification appears in the list under the group of the metric used by its accelerator row, and its `Resource Configuration` cell shows the `cpu`, `memory`, and accelerator entries as chips.
- The `Pricing (credits)` column shows the actual price and the guidance price as two lines. A specification whose pricing has not been set is counted as unpriced and shows `--` on the actual price line.
- The new specification becomes a `Category`-driven option set only through its metrics; the `Specification Metrics` panel is where that dependency is resolved.

#### Notes

- The dialog has no pricing fields. A specification price comes from the metric target prices multiplied by the configured quantities, so maintain it through `Assisted pricing` or `Adjust prices`.
- An accelerator can be selected only after its metric exists and is enabled in the `Specification Metrics` panel.
- Editing an existing specification is a separate entry: choose `Edit` in the `Actions` menu of the row.

### Edit Resource Specification

#### Applicable Scenarios

Edit a specification when its CPU, memory, or accelerator rows must change. `Specification ID` is read-only, so a specification that needs a different ID must be added again instead.

#### Steps

1. Choose `Edit` in the `Actions` menu of the target row to open the `Edit Specification` dialog.
2. `Specification ID` is shown read-only and cannot be changed.
3. Change only the `Configuration` table: add or remove rows, and adjust `Configuration size` and `Unit`. The `Category` options come from the same `Specification Metrics` panel as in the add dialog.
4. Click **"Confirm"** to submit, or **"Cancel"** to discard.

#### Result Validation

- After a successful submit, the `Resource Configuration` chips of that row reflect the edited configuration, and the group the specification belongs to follows the metrics it now uses.

#### Notes

- When a different ID is required, use `Clone` in the `Actions` menu to derive a new specification from an existing one, then adjust its configuration. What the `Clone` entry opens is not covered here; refer to what the page actually shows.
- Changing a specification changes the resource tier that users select when they create online IDEs, runtime instances, training jobs, or model services. Confirm the business window first.

### Set Metric Target Pricing

`Assisted pricing` sets the unit price of a **specification metric** in credits per hour, not the total price of one specification. The price of a specification is derived from metric prices multiplied by the configured quantities.

#### Applicable Scenarios

Use `Assisted pricing` when you need to move the pricing baseline of a resource type, or when a newly added metric still has no target unit price.

#### Steps

1. Go to `AI Infra(On-Prem) > Resource Pools > Resource Specs` and click **"Assisted pricing"** on the page header to open the `Set metric target pricing` dialog.
2. The dialog lists every metric with the columns `Metric type`, `Unit`, and `credits/hour`, and provides a box to search metric types.
3. Edit the target unit price row by row, then click **"Preview"** to review the impact, or **"Cancel"** to discard it.

#### Result Validation

- The `credits/hour` value of the metric reflects the new target price after you submit it.
- Specifications that use the metric show the recalculated price in the `Pricing (credits)` column.

#### Notes

- A metric price change propagates to every specification that uses the metric. Confirm the affected specifications before you submit.

### Adjust Specification Prices

`Adjust prices` is an **inline editing mode inside the list, not a dialog**. Changes take effect only after you click **"Save"**.

#### Applicable Scenarios

Use `Adjust prices` when you need to change the actual price of specifications in bulk, or when you want to adopt the guidance price for one or all rows.

#### Steps

1. Click **"Adjust prices"** on the page header. The list enters editing mode and the banner shows `Scope <N> specs` and `Changed rows <N> specs`.
2. Edit the actual price row by row, click **"Apply guidance price"** on one row, or click **"Apply all guidance prices"** on the banner for every row.
3. Click **"Save"** to submit. **"Save"** stays disabled while nothing has changed; click **"Cancel"** to leave editing mode without writing anything.

#### Result Validation

- After editing mode closes, the actual price line of the `Pricing (credits)` column shows the new value and the banner disappears.

#### Notes

- Nothing is written until **"Save"** succeeds, so an accidental entry never reaches the price.
- Confirm the guidance price source before applying it in bulk to every specification.

### Import or Export Resource Specs

#### Applicable Scenarios

Use the **"Import/Export"** menu to batch-maintain resource specifications, or to export specification combinations for audit, reconciliation, and controlled migration.

#### Steps

1. Go to `AI Infra(On-Prem) > Resource Pools > Resource Specs`.
2. Click **"Import/Export"** on the page header and choose **"Import"** or **"Export"**.
3. For import, the `Import Configuration Data` drawer asks you to select a ZIP package exported from the backend and run a precheck before anything is written. The drawer footer only offers **"Cancel"**.
4. For export, the `Export Configuration Package` drawer lists modules under `Select Modules` (**"Select All"** and **"Clear"** are provided), and its footer shows how many modules are selected before you click **"Export"**.
5. Before importing, verify that the package does not overwrite a specification already used by cluster associations or jobs; store exported packages in a controlled directory.

#### Result Validation

- After import, the Resource Specs list shows the added or updated combinations.
- The exported package contains the modules you selected, and its module list matches what you chose in the drawer.
- Cluster specification association or job creation can correctly identify the imported specifications.

#### Notes

- Specification ID, metric quantities, and accelerator model must match actual cluster capacity; otherwise specification matching or scheduling may fail.
- Import may update fields on a specification with the same identifier. Check cluster associations, job dependencies, and file scope first.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Specification ID | Yes | Dropdown / enum | `Example value` | Specification name selected when users create online IDEs, runtime instances, training jobs, or model services. Use an ID that reflects CPU, memory, accelerator model, card count, and applicable scenario. The value can only consist of lowercase letters, numbers, dots (.) and hyphens (-), and must start and end with lowercase letters or numbers. |
| Configuration Category | Yes | Dropdown / enum | `cpu` | One resource entry of the `Configuration` table. Options come from the metrics in the `Specification Metrics` panel, so the metric must exist and be enabled first. |
| Configuration Size | Yes | Number / capacity | `16` | Quantity of that entry. Match the resources required by the job and the capacity actually reported by cluster nodes. |
| Unit | Yes | Dropdown / enum | `core` | Unit shown for the entry, such as `core`, `GiB`, or the unit defined by the metric. Keep units consistent to avoid display and scheduling mismatch. |
| Specification Metric | System-generated | Grouping item | `<METRIC_NAME>` | The metric the list is grouped by, maintained in the `Specification Metrics` panel. Its k8s-key, selector-key, and unit must match resources actually reported by cluster nodes. |
| Resource Configuration | System-generated | Chip group | `cpu 16 · memory 32GiB` | List column that aggregates all configuration entries of the specification. Accelerator types are not separate columns. |
| Pricing (credits) | No | Number / price | `<PRICE>` | List column that holds the actual price and the guidance price as two lines. Unpriced specifications are counted in the summary line and are not shown on the user side. |
| Status | System-generated | Status | Refer to the page | Whether the specification is usable on this page. Complete resource configuration and pricing before opening it to users. |
| Actions | No | Action entry | `Edit` | Supports add, edit, create from this, enable, disable, delete, and other operations. Confirm impact scope and replacement options before high-risk actions. |

## Pitfalls

- Adding a specification affects resource packages available when users create online IDEs, runtime instances, training jobs, or model services.
- Oversized specifications may increase queue time; undersized specifications may cause insufficient resources after task startup.
- Incorrect specification metrics, k8s-key, or selector-key may make the specification unavailable or cause scheduling failures.
- `Confirm` (Add New Specification and specification-metric dialogs) and `Save` (Adjust prices editing mode) are high-risk final actions.
- Do not record real cluster IDs, resource pool IDs, node labels, internal resource key mappings, tenant information, accounts, keys, tokens, or internal test parameters.

### Configuration Rules and Impact

- **Metrics before specifications**: Specifications depend on specification metrics. Without metrics, CPU, memory, or accelerators cannot be configured accurately.
- **Then associate clusters**: After a specification is created, it must still be associated with clusters before users can select it.
- **Consistent resource combination**: CPU, memory, and accelerator quantity in the specification should match cluster schedulable resources.
- **Readable naming**: Specification names should help capacity troubleshooting, user selection, and later template references.
- **Change enabled status carefully**: Before disabling or modifying an opened specification, confirm impacts on templates, tenant quotas, and running instances.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Resource Specs opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | Configuration, status, and relationships on Resource Specs is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### An Imported Resource Specification Cannot Be Associated with a Cluster

**Symptom:**

The resource specification import completes, but the specification cannot be found in the specification association list in cluster details.

**Possible Causes:**

- The specification is unavailable or still being validated.
- Specification metrics do not match reported cluster resources.
- Specification scope or active filters do not match.

**Solution:**

1. Check state, specification ID, and update time in Resource Specs.
2. Check the metric, k8s-key, selector-key, and accelerator model in the `Specification Metrics` panel of the Resource Specs page, and in `Accelerators`.
3. Reset filters, reopen cluster details, and verify the visibility scope.

#### The Operation Entry on Resource Specs Is Unavailable

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

#### A Required Field on Resource Specs Has No Options

**Symptom:**

The form opens, but a selection list is empty.

**Possible Causes:**

- Candidates are disabled.
- ownership differs.
- the current account cannot see them.

**Solution:**

1. Check candidate state
2. verify ownership
3. confirm visibility and refresh the form.

#### Resource Specs Has an Abnormal State After the Operation

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

#### A Downstream Page Cannot Use Resource Specs

**Symptom:**

The current page is normal, but a downstream page cannot select or associate Configuration, status, and relationships on Resource Specs.

**Possible Causes:**

- Visibility differs.
- the object is disabled.
- downstream cache is stale.

**Solution:**

1. Check enabled state and ownership
2. verify role visibility
3. refresh and select again.

## Notes

- Once opened to users, resource specifications directly affect creation choices for model instances, online IDEs, runtime instances, and training jobs.
- Before modifying specification ID, resource quantity, or enabled/disabled status, confirm associated clusters, templates, tenant quotas, and running instances.
- Large specifications may increase queue time, while small specifications may cause insufficient resources after task startup. Calibrate with monitoring and failure cases.
- `Confirm` (Add New Specification and specification-metric dialogs) and `Save` (Adjust prices editing mode) are high-risk final actions. Confirm the scope and impact before executing one.
- Do not record real cluster IDs, resource pool IDs, node labels, internal resource key mappings, tenant information, accounts, keys, tokens, or internal test parameters.

## Next Steps

1. Go to `On-Prem > Resource Pools > Clusters` and associate specifications with the target cluster.
2. Submit a test job, online IDE, or model service to verify specification scheduling results.
3. Return to the Resource Specifications list and confirm that enabled status, filter results, and associations are as expected.
