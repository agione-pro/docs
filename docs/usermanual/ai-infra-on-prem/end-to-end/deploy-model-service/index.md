# Deploy a Model Service from Scratch

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator and Model Provider |
| Navigation Path | User Manual > AI Infra(On-Prem) > Deploy a Model Service from Scratch |
| Page Route | `N/A` |
| Managed Object | The cross-role workflow from resource-pool preparation to model-instance validation |

#### Beginner Explanation

This workflow builds a complete model runtime path. The Operator prepares regions, clusters, specs, and templates; the Model Provider creates and validates an instance and returns to the responsible page when a stage fails.

#### Terms

| Term | Description |
| --- | --- |
| Deployment Template | A deployment entry that defines the model, framework, image, and resource requirements. |
| Model Instance | A model runtime service created from a template and resource spec. |
| Resource Quota | The available limit for CPU, memory, and accelerator consumption. |

#### Recommended Operation Order

Follow regions and zones, clusters, specs, templates, instances, and validation in order. Do not bypass a failed prerequisite.

#### First-Time User Notes

Confirm that the task involves The cross-role workflow from resource-pool preparation to model-instance validation, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The operator has permissions to manage resource pools, templates, quotas, and monitoring.
2. The Model Consumer has permissions to create model instances, runtime instances, object storage, and image projects.
3. Kubernetes API Server, image registry, object storage, or shared storage is accessible from the platform side.
4. Tenant quotas and credits are sufficient for this validation.
5. Images, startup commands, model files, and input/output paths have been planned.

## Page Description

This page explains roles, resource hierarchy, and major entries. The image shows the Operator starting point for foundation resources.

![Regions and Zones reference](../../operator/resource-pools/regions-zones/images/manual-regions-zones.png)

Focus on the Resource Pools menu, creation entries, and the region-zone hierarchy.

## Main Operations

### Create Regions and Zones

1. The Operator opens **"Regions & Zones"** and clicks **"Add Region"** to configure resource boundaries and component bindings.
2. Select the target region and click **"Create AZ"** to define cluster ownership.
3. After submission, verify hierarchy, state, and component relationships.

![Add Region](../../operator/resource-pools/regions-zones/images/manual-add-region.png)

The image shows region basics and resource capability bindings.

### Register Clusters and Prepare Specs

1. Register a cluster in **"Clusters"** and confirm node and accelerator reporting.
2. Maintain resource keys and units in **"Spec Metrics"**.
3. Combine CPU, memory, and accelerator quotas in **"Resource Specs"**.

### Create and Validate a Model Instance

1. The Operator prepares models, frameworks, and inference templates.
2. The Model Provider selects a template and resource spec in **"Templates"** and creates an instance.
3. Verify state, usage, and exceptions in **"Instances"**, **"Usage"**, and monitoring pages.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Region / Availability Zone | Yes | Selection | Example East China Zone | Determines the resource pool, specification, and user-visible scope. |
| Cluster | Yes | Text | Example Cluster A | Provides the underlying resources for instances, jobs, or model services. |
| Resource Specification | Yes | Selection | `4C16G-1GPU` | Defines the CPU, memory, and accelerator combination selected when a user creates a service. |
| Image | Yes | Text | `<BASE_URL>/<PROJECT>/<IMAGE>:<TAG>` | Provides the runtime image for the model service. The placeholder is not a real repository. |
| Storage Component | No | Text | Example File Storage A | Mounts models, data, or output files. |
| Deployment Instance | System generated | Text | `INSTANCE-202607130001` | Tracks service status, events, logs, and monitoring data. |

## Pitfalls

- Do not paste real kubeconfig, registry credentials, storage keys, tokens, or internal endpoints into examples or screenshots.
- If a specification is not selectable, check cluster association, tenant quota, template limits, and current filters together.
- If an instance fails after submission, inspect events and logs before changing quota or cluster configuration.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Deploy a Model Service from Scratch opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | The cross-role workflow from resource-pool preparation to model-instance validation is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### Target Is Missing from Deploy a Model Service from Scratch

**Symptom:**

The page opens, but the expected The cross-role workflow from resource-pool preparation to model-instance validation is missing.

**Possible Causes:**

- Filters remain active.
- the object belongs to another scope.
- a prerequisite is incomplete.

**Solution:**

1. Reset filters
2. verify region or tenant ownership
3. confirm prerequisite state.

#### The Operation Entry on Deploy a Model Service from Scratch Is Unavailable

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

#### A Required Field on Deploy a Model Service from Scratch Has No Options

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

#### Deploy a Model Service from Scratch Has an Abnormal State After the Operation

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

#### A Downstream Page Cannot Use Deploy a Model Service from Scratch

**Symptom:**

The current page is normal, but a downstream page cannot select or associate The cross-role workflow from resource-pool preparation to model-instance validation.

**Possible Causes:**

- Visibility differs.
- the object is disabled.
- downstream cache is stale.

**Solution:**

1. Check enabled state and ownership
2. verify role visibility
3. refresh and select again.

## Notes

- Ownership, state, and relationships on Deploy a Model Service from Scratch must match actual resources.
- Before changing shared configuration, confirm affected instances, jobs, and roles.
- Documentation, screenshots, and troubleshooting materials must not contain real credentials, accounts, or internal addresses.

## Next Steps

1. Organize the verified image, startup command, ports, object paths, and parameters into team standards.
2. Accumulate inference templates or runtime instance templates for common scenarios.
3. Clean up unused objects, image tags, and completed instances according to business cycles.
4. Periodically check quota, usage, and monitoring trends to discover capacity bottlenecks in advance.
