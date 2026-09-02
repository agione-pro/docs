# Overview

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator, Model Provider, and Model Consumer |
| Navigation Path | User Manual > AI Infra(On-Prem) > Overview |
| Page Route | `N/A` |
| Managed Object | Regions, zones, clusters, resource specs, templates, usage, and monitoring entries |

#### Beginner Explanation

Overview is the directory for the on-prem compute manual. The Operator prepares regions, clusters, and resource specs; the Model Provider creates development resources or model instances; the Model Consumer reviews relevant quotas and monitoring results.

#### Terms

| Term | Description |
| --- | --- |
| Region | A resource boundary that contains zones, components, and clusters. |
| Cluster | A compute group that provides CPU, memory, accelerators, and storage. |
| Resource Spec | A CPU, memory, and accelerator combination selected when creating an instance. |

#### Recommended Operation Order

Read Getting Started to confirm roles and hierarchy, let the Operator prepare resource pools and templates, let the Model Provider create instances, and validate through quota, usage, and monitoring pages.

#### First-Time User Notes

Confirm that the task involves Regions, zones, clusters, resource specs, templates, usage, and monitoring entries, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. You have confirmed whether the current account is an operator or a Model Consumer.
2. You have selected the target region, availability zone, or resource pool.
3. Before creating instances, you have confirmed specifications, images, storage, quotas, and cluster capability.
4. For troubleshooting, prepare a sanitized time range, resource ID, error message, and log summary.

## Page Description

This page explains roles, resource hierarchy, and major entries. The image shows the Operator starting point for foundation resources.

![Regions and Zones reference](./operator/resource-pools/regions-zones/images/manual-regions-zones.png)

Focus on the Resource Pools menu, creation entries, and the region-zone hierarchy.

## Main Operations

### Locate Operator Entries

1. Open Resource Pools, Templates, Quotas & Metering, Monitoring, or System under `Operator`.
2. Select the object page for the current stage; use search, filters, and pagination only as supporting steps.
3. Validate the result before handing the workflow to the Model Provider.

### Locate Model Provider Entries

1. Open Model Deployment, Dev Resources, Storage, or Images under `User`.
2. Confirm that templates, resource specs, and quotas are available before creating an instance.
3. Verify the result in instances, usage, and monitoring pages.

### Follow the Cross-Role Workflow

1. The Operator prepares regions, zones, clusters, specs, and templates.
2. The Model Provider creates model instances or development resources.
3. The Model Consumer uses available capabilities and reviews relevant usage and monitoring.

## Parameter Quick Reference

| Parameter | Checkpoint | Impact |
| --- | --- | --- |
| Region / Availability Zone | Confirm the target resource boundary before creating or troubleshooting resources. | Affects visible clusters, storage components, templates, quotas, and monitoring scope. |
| Cluster | Confirm cluster status, node visibility, and associated specifications. | Determines whether instances and jobs can be scheduled. |
| Specification | Confirm CPU, memory, accelerator, VRAM, and storage requirements. | Determines whether users can select a resource package and whether capacity is sufficient. |
| Image / Storage | Confirm image repository access, object storage buckets, block storage, or file storage mounts. | Affects startup, data loading, output retention, and troubleshooting. |
| Quota / Credit | Confirm tenant quota and credit before creation. | Blocks instance creation when limits are insufficient. |

## Pitfalls

- Do not expose kubeconfig, registry credentials, storage keys, internal addresses, or customer data in screenshots or tickets.
- If a user cannot see a resource, check region, tenant authorization, quota, template binding, and filters before treating it as a platform failure.
- If creation stays queued, check capacity, specification association, image pull, storage mount, and cluster events together.
- Account, role, key, and permission configuration belongs to Settings. On-Prem overview only provides navigation and troubleshooting direction and does not record real accounts or credentials.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Overview opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | Regions, zones, clusters, resource specs, templates, usage, and monitoring entries is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### Target Is Missing from Overview

**Symptom:**

The page opens, but the expected Regions, zones, clusters, resource specs, templates, usage, and monitoring entries is missing.

**Possible Causes:**

- Filters remain active.
- the object belongs to another scope.
- a prerequisite is incomplete.

**Solution:**

1. Reset filters
2. verify region or tenant ownership
3. confirm prerequisite state.

#### The Operation Entry on Overview Is Unavailable

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

#### A Required Field on Overview Has No Options

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

#### Overview Has an Abnormal State After the Operation

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

#### A Downstream Page Cannot Use Overview

**Symptom:**

The current page is normal, but a downstream page cannot select or associate Regions, zones, clusters, resource specs, templates, usage, and monitoring entries.

**Possible Causes:**

- Visibility differs.
- the object is disabled.
- downstream cache is stale.

**Solution:**

1. Check enabled state and ownership
2. verify role visibility
3. refresh and select again.

## Notes

- This overview explains module-level navigation. Use feature pages for exact fields, buttons, and validation details.
- For deletion, disablement, quota adjustment, or storage unbinding, confirm the impact scope and rollback path first.

- For production incidents, collect sanitized page paths, resource IDs, time ranges, events, and logs before escalation. Do not expose real accounts, tokens, AK/SK, API keys, tenants, resource IDs, cluster IDs, node IPs, endpoints, registry credentials, storage keys, or sensitive log fragments.

## Next Steps

1. Operators should continuously maintain resource pools, templates, quotas, and monitoring.
2. Model Consumers should view usage, logs, and monitoring promptly after creating resources.
3. Before publishing, periodically check documentation screenshots, example commands, and sensitive information sanitization.
