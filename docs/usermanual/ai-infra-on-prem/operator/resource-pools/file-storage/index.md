# File Storage

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

`File Storage` is used to connect shared directory and file volume capabilities. Common implementations include NFS or compatible file storage supported by the platform. File storage is suitable for multiple jobs, nodes, or instances to read and write the same directory, such as shared datasets, model repositories, code directories, and output results.

| Item | Content |
| --- | --- |
| Applicable role | Operator |
| Navigation path | AI Infrastructure > On-Prem > Resource Pools > File Storage |
| Page route | `/powerone/resourcepool/file` |
| Managed objects | Name, Tenant Quota, Overcommit Ratio, Phy. Threshold, Log. Threshold, Cluster Connection Information, Paste Config, Upload File, Manual Input, and Description |
| Typical use | Create file storage components to provide shared directory mounts, model repositories, local Git repositories, or dataset directories |

#### Beginner Explanation

A file storage component is like a shared filing cabinet in the platform. It determines which clusters can mount shared directories. Operators first connect NFS or compatible shared storage to the platform, and then user-side instances and jobs can use the same directory to read data, models, and output files.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| NFS | Network File System, used to share directories over the network. |
| Shared Path | The directory path exported by the file storage service. |
| Mount Path | The path after mounting inside a container or node. |
| kubeconfig | Configuration file content used to connect to and validate the target Kubernetes cluster. |
| Tenant Isolation | Permission boundaries that prevent different tenants from accidentally reading or writing the same directory. |

## Prerequisites

1. NFS or an equivalent file storage service has been deployed.
2. The shared path has been created, and access permissions, directory ownership, and network policies have been confirmed.
3. Target cluster nodes can access the file storage service address and exported directory.
4. Tenant directories, read/write policies, capacity, overcommit ratio, and backup policies have been planned.
5. If the page requires `kubeconfig`, prepare sanitized validation material. Do not paste real cluster credentials during learning or screenshot capture.

## Page Description

The page displays connected file storage components, status, service address, shared path, capacity, and associated regions or clusters.

The following figure shows the file storage page.

![File Storage](./images/file-storage-list.png)

## Main Operations

### Create File Storage Component

#### Pre-Operation Check

1. The file storage service address is accessible from target cluster nodes.
2. The shared path has been exported and permissions comply with the read/write policy.
3. The mount path does not conflict with container system directories or application directories.
4. Tenant isolation method, directory naming rules, capacity limit, and overcommit policy have been confirmed.

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Resource Pools > File Storage`.
2. Click `Register component` to open the `New File Storage - File Storage` page.
3. Fill in `Name`, `Tenant Quota`, `Overcommit Ratio`, `Phy. Threshold`, and `Log. Threshold` according to the page fields.
4. In `Cluster Connection Information`, provide connection configuration through `Paste Config`, `Upload File`, or `Manual Input`, and confirm that the configuration content has been sanitized.
5. If the page provides `Test Connection`, verify connectivity from target cluster nodes to the file storage service first.
6. In `Cluster Configuration`, fill in `Description`, and continue checking cluster connection information, capacity thresholds, and description according to the actual page.
7. Before clicking the final `Save`, `Submit`, or `OK`, verify the cluster connection information, capacity thresholds, and capacity impact again.
8. For learning or page validation only, view fields and dialogs without submitting real file storage configuration.

The following figure shows the New File Storage page, used to fill in basic policy, cluster connection information, and cluster configuration.

![New File Storage](./images/new-file-storage.png)

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Name | Yes | File / configuration text | `Example Name` | File storage component name. Use a name that reflects environment, purpose, or capacity boundary. |
| Tenant Quota | Yes | Number / capacity | `10 TiB` | Whether tenant capacity usage is limited. Keep it consistent with tenant capacity policies. |
| Overcommit Ratio | Yes | File / configuration text | `1.5` | Overcommit ratio between logical and physical file storage capacity. Fill it carefully according to capacity planning. |
| Phy. Threshold | Yes | Number / capacity | `Example value` | Physical capacity alarm or limit threshold. Do not exceed the real capacity safety boundary. |
| Log. Threshold | Yes | Number / capacity | `Example value` | Logical capacity alarm or limit threshold after overcommit. Verify it together with the overcommit ratio. |
| Paste Config | Conditionally required | File / configuration text | `Example value` | Enter cluster connection information by pasting kubeconfig content. Do not write real kubeconfig in documentation. |
| Upload File | Conditionally required | File / configuration text | `<kubeconfig>` | Enter cluster connection information by uploading a file. Upload only authorized configuration files from controlled environments. |
| Manual Input | Conditionally required | Text | `Example value` | Enter cluster connection information manually. Do not write real internal addresses, accounts, or secrets. |
| Description | No | Multi-line text | `Example description` | Component purpose, boundary, or maintenance notes. Record non-sensitive notes only. |
| Actions | System-generated | Action entry | `Edit` | Test Connection, Submit, Search, Reset, and similar entries. `Submit` submits real configuration. Do not click it during learning or screenshot capture. |

## Pitfalls

- Creating a file storage component may affect mounts and read/write access for jobs, IDEs, model repositories, or dataset directories.
- Incorrect service address, shared path, export permission, UID/GID, or read/write policy may cause mount failure, write failure, or unintended cross-tenant access.
- Incorrect capacity thresholds or overcommit ratio may block file volume creation too early, or make displayed capacity inconsistent with actual resources.
- Verify the file storage service address and mount path from target nodes, not only from the platform management side.
- `Save`, `Submit`, and `OK` are high-risk final actions.
- Do not write real NFS addresses, internal paths, accounts, secrets, tokens, kubeconfig, cluster IDs, resource pool IDs, tenant directories, or internal test parameters.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page is accessible | The `File Storage` page can be opened. | Check account permissions, menu configuration, and page route. |
| Component list loads normally | The list displays connected file storage components and status. | Check dependent services, filter conditions, and API responses. |
| Creation entry is visible | `Register component` is displayed. | Check operator permissions, License, and page configuration. |
| Creation page can be opened | The `New File Storage - File Storage` page opens, and Basic Policy and Cluster Connection Information are displayed. | Check frontend route, form configuration, and browser console errors. |
| Required field validation works | The page displays validation prompts when required fields are empty. | Complete name, capacity, connection configuration, or other required fields according to page prompts. |
| Connection test can be executed | If `Test Connection` is provided, it returns a clear result after execution. | Check network connectivity, kubeconfig, service address, and access permissions. |
| High-risk action is not triggered accidentally | No final save, submit, or OK action is clicked during learning or screenshot capture. | If real configuration is submitted by mistake, immediately verify impact and roll back according to the change process. |
| Status is correct after real submission | If real creation is performed, the new component appears in the list and its status matches expectations. | Return to the configuration page and check connection parameters, binding scope, capacity thresholds, and backend logs. |

## FAQ

#### File Storage Mount Fails

**Symptom:**

The job cannot mount the shared directory at startup, or the directory is not visible after mounting.

**Possible Causes:**

- The file storage service address or shared path is incorrect.
- Network from the target node to the file storage service is unreachable.
- NFS export permissions, directory ownership, or access policy is incorrect.

**Solution:**

1. Check the service address, shared path, and network connectivity.
2. Verify file storage mounting on the target node.
3. Adjust export permissions, directory ownership, and read/write policy.

#### Cannot Write After Mounting

**Symptom:**

The directory is visible in the container, but writing files fails.

**Possible Causes:**

- The directory is configured as read-only.
- Server-side permissions or UID/GID do not match.
- The tenant directory isolation policy is inconsistent with the actual path.

**Solution:**

1. Confirm whether the access policy requires read/write.
2. Check server-side directory ownership, permissions, and export configuration.
3. Verify tenant subdirectory rules and the container runtime user.

## Next Steps

1. Reference the file storage component in region or cluster storage configuration.
2. Use a test job to verify read/write, concurrency, and capacity limits.
3. Include shared directories in backup, cleanup, and permission audits.

## Notes

- Do not configure shared directories with an overly broad public read/write scope.
- Before deleting or adjusting a shared path, confirm that no running jobs, IDEs, model repositories, or dataset directories depend on it.
- Do not record real NFS addresses, internal paths, kubeconfig, accounts, secrets, tokens, cluster IDs, resource pool IDs, tenant directories, or internal test parameters in documentation, screenshots, or examples.
