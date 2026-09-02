# Instances

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Provider |
| Navigation Path | AI Infra(On-Prem) > Model Deployment > Instances |
| Page Route | `/powerone/quickstart/model-service` |
| Managed Object | Configuration, status, and relationships on Instances |

#### Beginner Explanation

Model instances can be understood as model services that have already been ordered and started. Deployment templates are responsible for creation, while the Model Instances page is responsible for checking whether creation succeeded, whether the instance is still running, and whether further troubleshooting is needed.

#### Terms

| Term | Description |
| --- | --- |
| Instance | A runtime object created by the platform and scheduled to a cluster, such as a model service, online IDE, or runtime instance. |
| Specification | Resource package that a job can request, such as CPU, memory, GPU model, and card count. |
| Single Instance | One model service instance runs independently, suitable for testing or low-traffic scenarios. |

#### Recommended Operation Order

Confirm prerequisites for Model service instances created through deployment templates, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Instances, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. At least one model instance has been created, or you are preparing to view the current empty-list state.
2. The current account has permission to view model instances.
3. For troubleshooting, you can enter instance details, logs, or monitoring pages.

## Page Description

> **Verification status: Partially verified.** Screenshots and fields use existing user-side evidence. The live Operator menu does not replace independent Model Provider or Model Consumer evidence.

Use this page to view and handle Configuration, status, and relationships on Instances.

![Instances](./images/instances-list.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

The page provides instance type, status, search, and reset entrypoints. In the current environment screenshot, the list is empty, indicating that the tenant has no model service instances under the current conditions.

#### Page Areas

| Field/Area | Description |
| --- | --- |
| Instance Type Filter | Narrows the scope by All, Single Instance, Multi-instance, Cluster, and other types. |
| Status Filter | Views instances by all statuses or a specific runtime status. |
| Search Area | Enter conditions and Click **"Search"** to locate the target instance. |
| List Area | Displays model instances and their status. When no data exists, it displays No model services. |
| Pagination Area | View by page when there are many instances. |

## Main Operations

### View Model Instances

1. Go to `Model Deployment > Model Instances`.
2. Filter by instance name, model, status, cluster, or update time.
3. Open details and check model version, resource flavor, instance status, Endpoint, and events.
4. If no record is returned, reset filters. Redact internal addresses and credentials before sharing.

### View Monitoring and Diagnose Abnormal Status

1. In instance details, review utilization, call status, events, and recent errors.
2. Keep the same time range and compare cluster, node, and device monitoring to locate the affected layer.
3. If information is insufficient, escalate with a redacted instance identifier, status, and time.
4. Before starting, stopping, restarting, scaling, or deleting instances, verify the resource, data, and impact and execute the action only after approval.

### View Instances

#### Applicable Scenario

When you need to confirm whether a model service was created successfully, is still running, or has exceptions, view the model instance list.

#### Pre-Operation Check

1. Model instance creation has been completed, or you explicitly need to confirm that there are no instances.
2. Filters are not too narrow, avoiding false empty results.

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Model Deployment > Instances`.
2. View the instance list and confirm instance name, instance type, running status, model, specification, region, and creation time.
3. Use `Instance Type`, `Status`, or the search box to filter target instances.
4. Click **"Search"** and confirm that filters have taken effect.
5. To view all data again, Click **"Reset"** to clear filters.
6. If the list is empty, first check whether filters exist, whether the instance was just created, and whether the current tenant or region is correct.

## Parameter Quick Reference

| Field Name | Description |
| --- | --- |
| Instance Name | Name of the model service instance. |
| Instance Type | Instance form, such as single instance, multi-instance, or cluster instance. |
| Status | Current runtime or lifecycle status of the instance. |
| Model | Model associated with the instance. |
| Specification | Resource specification used by the instance. |
| Region | Region or resource pool where the instance runs. |
| Created At | Time when the instance was created. |
| Search Condition | Filter or keyword used to narrow the instance list. |
| Actions | Available row actions, such as viewing details or lifecycle operations. |

## Pitfalls

- The instance list may have refresh delay. A newly created instance may not appear immediately.
- An empty list does not necessarily mean there are no instances. Check filters, tenant, region, and permissions first.
- `Stop`, `Restart`, and `Delete` are high-risk actions.

- Do not write real instance IDs, instance names, tenant information, regions, nodes, endpoints, logs, error details, or test data in the document.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Instances opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | Configuration, status, and relationships on Instances is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### Target Is Missing from Instances

**Symptom:**

The page opens, but the expected Configuration, status, and relationships on Instances is missing.

**Possible Causes:**

- Filters remain active.
- the object belongs to another scope.
- a prerequisite is incomplete.

**Solution:**

1. Reset filters
2. verify region or tenant ownership
3. confirm prerequisite state.

#### The Operation Entry on Instances Is Unavailable

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

#### A Required Field on Instances Has No Options

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

#### Instances Has an Abnormal State After the Operation

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

#### A Downstream Page Cannot Use Instances

**Symptom:**

The current page is normal, but a downstream page cannot select or associate Configuration, status, and relationships on Instances.

**Possible Causes:**

- Visibility differs.
- the object is disabled.
- downstream cache is stale.

**Solution:**

1. Check enabled state and ownership
2. verify role visibility
3. refresh and select again.

## Notes

- During troubleshooting, do not expose internal access credentials or API keys in screenshots.
- Before providing external service, confirm access control, instance specification, and runtime cycle.
- `Stop`, `Restart`, and `Delete` may interrupt service, release resources, or remove instance records. Confirm business impact before operating.
- Use the list and detail pages as the primary basis for instance status. Overview pages only provide entrypoints and summaries.

## Next Steps

1. View instance details and logs.
2. Confirm service access address and invocation method.
3. Track runtime cost in `Resource Usage`.
