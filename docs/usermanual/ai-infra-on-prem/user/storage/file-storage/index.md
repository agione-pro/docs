# File Storage

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Provider |
| Navigation Path | AI Infra(On-Prem) > Storage > File Storage |
| Page Route | `/powerone/storage-service/file` |
| Managed Object | Configuration, status, and relationships on File Storage |

#### Beginner Explanation

File storage is like a team shared folder, suitable for multiple instances or jobs to read the same data, model files, or output directories. It emphasizes directory and file semantics, which are different from the independent disk semantics of block storage.

#### Terms

| Term | Description |
| --- | --- |
| Shared Directory | File system directory accessible by multiple instances or jobs. |
| NFS | Common shared file system protocol. |
| Mount Path | Path used to access the shared directory inside the container. |

#### Recommended Operation Order

Confirm prerequisites for Shared file systems, directories, capacity, mount relationships, and access policies, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on File Storage, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The operator has connected and opened file storage components in the target region.
2. The current account has permission to view and use file storage.
3. Tenant quota, capacity, and instance specifications meet usage requirements.
4. When mounting to an instance, the instance region, cluster, and storage capability are consistent.

## Page Description

> **Verification status: Partially verified.** Screenshots and fields use existing user-side evidence. The live Operator menu does not replace independent Model Provider or Model Consumer evidence.

Use this page to view and handle Configuration, status, and relationships on File Storage.

![File Storage](./images/file-storage-list.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

The page is used to display file storage capability in the selected region. When the capability is opened, it usually displays list, capacity, status, creation entrypoint, mount entrypoint, and operation entrypoint. When the capability is not opened, the page shows a capability unavailable prompt.

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

### Create Shared Directory

#### Areas Displayed When the Feature Is Available

| Area | Description |
| --- | --- |
| List Area | Displays existing shared directories, capacity, status, and update time. |
| Create Entrypoint | Adds a file storage directory or declaration. |
| Mount Entrypoint | Associates a shared directory with an instance or container path. |
| Operation Entrypoint | Edit, expand, unmount, delete, or view details depending on page capabilities. |

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Storage Services > File Storage`.
2. Confirm the region in the upper-right corner.
3. If the page provides a create entrypoint, fill in name, capacity, access policy, and description.
4. After submission, return to the list and view status.
5. Select this shared directory in instance creation or instance details and set the in-container path.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Shared Directory Name | Yes | Text | `shared-dataset` | File storage resource display name. |
| Capacity | Yes | Number | `500GiB` | Available space in the shared directory. |
| Access Policy | Conditionally required | Enum | `Read/write` | Controls read-only or read/write access. |
| Mount Path | Conditionally required | Text | `/mnt/shared` | Access path inside the instance or container. |
| Share Status | System-generated | Enum | `Available` | Used to determine whether it can be mounted, expanded, or deleted. |

#### Mount, Unmount, and Confirm Capacity

#### Mount

1. Open the instance creation page or storage mount entrypoint.
2. Select the target file storage resource.
3. Fill in the in-container path, such as `/mnt/data` or `/mnt/output`.
4. After submission, view instance events and logs to confirm successful mounting.

#### Unmount

1. Confirm that no running process is reading or writing this path.
2. Perform unmount through the instance or storage operation entrypoint.
3. Refresh the page to confirm that the mount relationship has been removed.

#### Confirm Capacity

1. View capacity and status in the file storage list.
2. Run `df -h` inside the instance or perform application-side capacity checks.
3. If capacity is insufficient, expand according to page capabilities or contact the operator to adjust quota.

## Pitfalls

- Files in shared directories are visible to multiple tasks. Confirm naming and overwrite risks before writing.
- NFS or shared storage paths must be sanitized before screenshots.
- High-concurrency small-file read/write may affect performance. Split directories or use object storage if necessary.

### Alternative Paths

- To save model files, datasets, or artifact packages, consider [Object Storage](../object-storage/) first.
- When shared directory semantics are required, use file storage or cluster shared storage configured by the operator.
- When independent volume capability is required, use block storage. If the page is not opened, contact the operator to confirm whether the target region has underlying storage components.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | File Storage opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | Configuration, status, and relationships on File Storage is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### Target Is Missing from File Storage

**Symptom:**

The page opens, but the expected Configuration, status, and relationships on File Storage is missing.

**Possible Causes:**

- Filters remain active.
- the object belongs to another scope.
- a prerequisite is incomplete.

**Solution:**

1. Reset filters
2. verify region or tenant ownership
3. confirm prerequisite state.

#### The Operation Entry on File Storage Is Unavailable

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

#### A Required Field on File Storage Has No Options

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

#### File Storage Has an Abnormal State After the Operation

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

#### A Downstream Page Cannot Use File Storage

**Symptom:**

The current page is normal, but a downstream page cannot select or associate Configuration, status, and relationships on File Storage.

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
