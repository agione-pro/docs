# Block Storage

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Provider |
| Navigation Path | AI Infra(On-Prem) > Storage > Block Storage |
| Page Route | `/powerone/storage-service/block` |
| Managed Object | Configuration, status, and relationships on Block Storage |

#### Beginner Explanation

Block storage is like attaching an independent disk to an instance. It is suitable for tasks that require persistent writes, independent volumes, or block device semantics. It is not a shared directory. Before multiple instances read and write simultaneously, confirm whether the platform supports the corresponding mount mode.

#### Terms

| Term | Description |
| --- | --- |
| Volume | Persistent block device that can be mounted by an instance. |
| Capacity | Usable storage size of a volume. |
| Mount | Connects a volume to an instance or in-container path. |

#### Recommended Operation Order

Confirm prerequisites for Block storage volumes, capacity, mount relationships, and volume status, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Block Storage, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The operator has connected and opened block storage components in the target region.
2. The current account has permission to view and use block storage.
3. Tenant quota, capacity, and instance specifications meet usage requirements.
4. When mounting to an instance, the instance region, cluster, and storage capability are consistent.

## Page Description

> **Verification status: Partially verified.** Screenshots and fields use existing user-side evidence. The live Operator menu does not replace independent Model Provider or Model Consumer evidence.

Use this page to view and handle Configuration, status, and relationships on Block Storage.

![Block Storage](./images/block-storage-list.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

The page is used to display block storage capability in the selected region. When the capability is opened, it usually displays list, capacity, status, creation entrypoint, mount entrypoint, and operation entrypoint. When the capability is not opened, the page shows a capability unavailable prompt.

## Main Operations

### View Storage Resources

1. Open the corresponding storage-service page and filter by name, project, status, capacity, or update time.
2. Open details and check capacity, used space, access method, mount or connection status, and creation time.
3. If no record is returned, reset filters and check project and region. Do not share internal addresses or access credentials.
4. For capacity or status anomalies, inspect quota, events, and associated instances before creating another resource.

### Manage Capacity, Mounts, or Access

1. Open the target action menu and identify the impact of expansion, mount, unmount, permission, or deletion entries.
2. Record current capacity, associated instances, and data-protection status before changes.
3. Before expansion, unmount, or deletion, confirm tasks and backups. Before the final action, confirm the resource, data, and impact, and execute it only after approval.
4. After an approved change, check capacity, connection status, and events. If abnormal, stop subsequent actions and follow the recovery process.

### Create Volume

#### Areas Displayed When the Feature Is Available

| Area | Description |
| --- | --- |
| List Area | Displays existing volumes, capacity, status, and update time. |
| Create Entrypoint | Adds a block storage volume. |
| Mount Entrypoint | Associates a volume with an instance or container path. |
| Operation Entrypoint | Edit, expand, unmount, delete, or view details depending on page capabilities. |

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Storage Services > Block Storage`.
2. Confirm the region in the upper-right corner.
3. If the page provides a create entrypoint, fill in name, capacity, access policy, and description.
4. After submission, return to the list and view status.
5. Select this volume in instance creation or instance details and set the in-container path.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Volume Name | Yes | Text | `train-data-volume` | Block storage volume display name. |
| Capacity | Yes | Number | `100GiB` | Usable space of the volume. |
| Access Mode | Conditionally required | Enum | `ReadWriteOnce` | Controls whether the volume allows single-instance or multi-instance mounting. |
| Mount Path | Conditionally required | Text | `/mnt/data` | Access path inside the instance or container. |
| Volume Status | System-generated | Enum | `Available` | Used to determine whether it can be mounted, expanded, or deleted. |

#### Mount, Unmount, and Confirm Capacity

#### Mount

1. Open the instance creation page or storage mount entrypoint.
2. Select the target block storage resource.
3. Fill in the in-container path, such as `/mnt/data` or `/mnt/output`.
4. After submission, view instance events and logs to confirm successful mounting.

#### Unmount

1. Confirm that no running process is reading or writing this path.
2. Perform unmount through the instance or storage operation entrypoint.
3. Refresh the page to confirm that the mount relationship has been removed.

#### Confirm Capacity

1. View capacity and status in the block storage list.
2. Run `df -h` inside the instance or perform application-side capacity checks.
3. If capacity is insufficient, expand according to page capabilities or contact the operator to adjust quota.

## Pitfalls

- Block storage is usually not suitable for multiple instances reading and writing the same path simultaneously. Confirm the access mode before use.
- Mount paths must not overwrite system directories, startup directories, or key directories inside the image.
- Before deleting a volume, confirm that no running instances, training tasks, or output artifacts depend on it.

### Alternative Paths

- To save model files, datasets, or artifact packages, consider [Object Storage](../object-storage/) first.
- When shared directory semantics are required, use file storage or cluster shared storage configured by the operator.
- When independent volume capability is required, use block storage. If the page is not opened, contact the operator to confirm whether the target region has underlying storage components.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Block Storage opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | Configuration, status, and relationships on Block Storage is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### Target Is Missing from Block Storage

**Symptom:**

The page opens, but the expected Configuration, status, and relationships on Block Storage is missing.

**Possible Causes:**

- Filters remain active.
- the object belongs to another scope.
- a prerequisite is incomplete.

**Solution:**

1. Reset filters
2. verify region or tenant ownership
3. confirm prerequisite state.

#### The Operation Entry on Block Storage Is Unavailable

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

#### A Required Field on Block Storage Has No Options

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

#### Block Storage Has an Abnormal State After the Operation

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

#### A Downstream Page Cannot Use Block Storage

**Symptom:**

The current page is normal, but a downstream page cannot select or associate Configuration, status, and relationships on Block Storage.

**Possible Causes:**

- Visibility differs.
- the object is disabled.
- downstream cache is stale.

**Solution:**

1. Check enabled state and ownership
2. verify role visibility
3. refresh and select again.

## Notes

- Before deleting or unmounting, confirm that no running instances depend on it.
- Mount paths must not overwrite system directories, application directories, or key directories inside the image.

## Next Steps

1. Verify the mount path in runtime instances or Online IDE.
2. Write input data and output results to persistent paths.
3. Periodically clean up unused data to avoid exhausting quotas.
