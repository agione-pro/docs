# Getting Started

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator, Model Provider, and Model Consumer |
| Navigation Path | User Manual > AI Infra(On-Prem) > Getting Started |
| Page Route | `N/A` |
| Managed Object | Role boundaries, resource hierarchy, preparation order, and page entries |

#### Beginner Explanation

Getting Started is a route map for first-time use. It explains the three roles and connects regions, zones, clusters, resource specs, templates, and instances in the required order.

#### Terms

| Term | Description |
| --- | --- |
| Operator | The role that maintains resource pools, templates, quotas, and system settings. |
| Model Provider | The role that creates development resources, deploys models, and maintains runtime instances. |
| Model Consumer | The role that uses available capabilities and reviews relevant quota, usage, and monitoring information. |

#### Recommended Operation Order

Confirm the role and goal, check regions and clusters, prepare specs and templates after foundation resources are ready, and then create instances and review usage and monitoring.

#### First-Time User Notes

Confirm that the task involves Role boundaries, resource hierarchy, preparation order, and page entries, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. You have confirmed whether the current account role is operator or Model Consumer.
2. You have confirmed that the target resource is in a local cluster or private resource pool.
3. Before creating instances, you have confirmed the region, specification, image, storage, and quota.

## Page Description

This page explains roles, resource hierarchy, and major entries. The image shows the Operator starting point for foundation resources.

![Regions and Zones reference](../operator/resource-pools/regions-zones/images/manual-regions-zones.png)

Focus on the Resource Pools menu, creation entries, and the region-zone hierarchy.

## Main Operations

### Confirm Role Responsibilities

1. The Operator manages resource pools, templates, quotas, and system settings.
2. The Model Provider manages development resources, images, and model instances.
3. The Model Consumer uses capabilities within the available scope and reviews relevant state.

### Confirm Resource Preparation Order

1. Create regions and zones before registering clusters.
2. After clusters are available, maintain accelerators, spec metrics, and resource specs.
3. Prepare models, frameworks, and inference templates before creating instances.

### Choose the Next Entry

1. Open **"Regions & Zones"** or **"Clusters"** when foundation resources are incomplete.
2. Open **"Spec Metrics"** and **"Resource Specs"** when specs are incomplete.
3. Open **"Templates"** after templates and quotas are available.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role Type | Yes | Selection | Model Consumer | Determines whether to read operator-side resource governance or user-side resource usage flows. |
| Resource Scope | No | Text | Example Region / Example Cluster | Locates regions, availability zones, clusters, nodes, and resource pools. |
| Job Type | No | Selection | Model Instance | Distinguishes model services, Online IDEs, runtime instances, and training jobs. |
| Quota Object | No | Text | Example Tenant | Identifies the quota, credit, usage, and metering scope. |

## Pitfalls

- Do not use user-side invisibility alone as proof of missing resources; check authorization, tenant scope, filters, and resource binding first.
- Do not paste kubeconfig, registry credentials, storage keys, or internal endpoints into screenshots or tickets.
- For capacity issues, check quota, specification association, node resources, and job events together.
- Getting Started confirms entry points, role boundaries, and resource relationships. Before creating, deleting, disabling, unbinding, adjusting credits, or changing resources, verify the impact on the corresponding function page and obtain approval.
- Account, role, key, and permission configuration belongs to Settings. Do not record real accounts, tokens, AK/SK, API keys, tenants, resource IDs, cluster IDs, node IPs, endpoints, or test parameters in On-Prem getting-started content.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Getting Started opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | Role boundaries, resource hierarchy, preparation order, and page entries is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### Target Is Missing from Getting Started

**Symptom:**

The page opens, but the expected Role boundaries, resource hierarchy, preparation order, and page entries is missing.

**Possible Causes:**

- Filters remain active.
- the object belongs to another scope.
- a prerequisite is incomplete.

**Solution:**

1. Reset filters
2. verify region or tenant ownership
3. confirm prerequisite state.

#### The Operation Entry on Getting Started Is Unavailable

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

#### A Required Field on Getting Started Has No Options

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

#### Getting Started Has an Abnormal State After the Operation

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

#### A Downstream Page Cannot Use Getting Started

**Symptom:**

The current page is normal, but a downstream page cannot select or associate Role boundaries, resource hierarchy, preparation order, and page entries.

**Possible Causes:**

- Visibility differs.
- the object is disabled.
- downstream cache is stale.

**Solution:**

1. Check enabled state and ownership
2. verify role visibility
3. refresh and select again.

## Notes

- This document is a platform-level getting started guide and does not replace field-level descriptions on each feature page.
- For operations involving deletion, disablement, offline changes, credit adjustment, or resource unbinding, confirm the impact scope, maintenance window, and rollback plan first.
- Before taking screenshots, check whether the page exposes internal addresses, credentials, keys, certificates, or a complete kubeconfig.

- If the issue is about accounts, roles, permissions, keys, or tenant members, go to Settings. If the issue is about invisible resources, unavailable specifications, or queued instances, go to On-Prem resource, quota, and monitoring pages.

## Next Steps

1. Operators should continue with regions, clusters, specifications, storage, images, templates, quotas, and monitoring pages.
2. Model Consumers should continue with user overview, deployment templates, runtime instances, object storage, image services, quotas, and usage.
3. Operators should keep events, logs, monitoring, quota, image, storage, and cluster status in the same investigation path.
