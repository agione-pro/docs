# Block Storage

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

`Block Storage` is used to connect volume-oriented storage capabilities. Common implementations include Ceph RBD. Block storage is suitable for providing independent disk volumes to workloads, especially scenarios that require persistent volumes, low-level block devices, or specific performance characteristics.

| Item | Content |
| --- | --- |
| Applicable role | Operator |
| Navigation path | AI Infrastructure > On-Prem > Resource Pools > Block Storage |
| Page route | `/powerone/resourcepool/block` |
| Managed objects | Block Storage Type, Cluster Name, Mon Node, FSID, Storage Pool, Admin Key, Over-provision Ratio, Tenant Quota Limit, thresholds, and Description |
| Typical use | Provide persistent block device capability for workload PVC creation, volume mounting, capacity display, and resource scheduling |

#### Beginner Explanation

Block Storage is like the independent disk supplier for instances. It connects Ceph RBD or compatible block device capabilities to the platform. When users create instances that require persistent volumes, the platform applies and mounts block volumes according to the storage pool, capacity thresholds, and CSI configuration maintained here.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Ceph | A distributed storage system that can provide object, block, and file capabilities. |
| Mon Addresses | Ceph Monitor addresses used to access and discover Ceph cluster status. |
| FSID | The unique identifier of a Ceph cluster, used to distinguish different Ceph clusters. |
| Storage Pool | A Ceph storage pool that hosts block volumes. |
| CSI configuration | Kubernetes storage integration settings used for dynamic volume creation. |
| Admin Key/Secret | Authentication materials required to access Ceph or CSI. These are sensitive information. |
| Reclaim Policy | Policy that controls whether the underlying volume is retained or deleted after PVC deletion. |

## Prerequisites

1. Ceph or an equivalent block storage service has been deployed.
2. Connection materials such as Mon Node, FSID, Storage Pool, authentication user, Keyring, or Secret have been prepared.
3. The target Kubernetes cluster has the corresponding CSI or volume plugin capability.
4. Storage Pool, capacity thresholds, performance, tenant isolation, and CSI policies have been confirmed.
5. For learning or screenshots, only view fields and dialogs without submitting real block storage configuration.

## Page Description

The page displays connected block storage components, status, capacity, connection information summary, and associated regions.

The following figure shows the block storage component list, where component status, capacity, and connection information summary can be viewed.

![Block Storage](./images/block-storage-list.png)

## Main Operations

### Create Block Storage Component

#### Applicable Scenarios

Create a block storage component when a new Ceph RBD or compatible block storage service needs to be connected and used for workload PVC creation, volume mounting, capacity display, and resource scheduling. The current UI uses `Register component` on the list page and opens `New Block Storage - Block Storage`.

#### Steps

1. Go to `AI Infrastructure > On-Prem > Resource Pools > Block Storage`.
2. Click `Register component` to open the `New Block Storage - Block Storage` page.
3. Fill in `Block Storage Type`, `Cluster Name`, `Mon Node`, `FSID`, `Storage Pool`, `Admin Key`, `Over-provision Ratio`, `Tenant Quota Limit`, `Physical Threshold`, `Logical Threshold`, `Snapshot Limit per Vol`, and `Description` according to the page fields.
4. If the page provides `Test Connection`, run the read-only connectivity check first and confirm the returned result.
5. Before clicking the final `Save`, `Submit`, or `OK`, verify Mon Node, FSID, Storage Pool, Admin Key, thresholds, and capacity impact again.
6. For learning or page validation only, view fields and dialogs without submitting real block storage configuration.

The following figure shows the New Block Storage page, used to fill in block storage connection parameters.

![New Block Storage](./images/new-block-storage.png)

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Block Storage Type | Yes | Dropdown / enum | `Ceph RBD` | Block storage backend type. Select according to actual page-supported types. |
| Cluster Name | Yes | Text | `cluster-a` | Storage cluster name to connect. Keep it consistent with the real storage cluster. |
| Mon Node | Yes | Address / path | `<mon-host>:6789` | Ceph Monitor node address list. Use placeholders only in documentation. Do not record real addresses. |
| FSID | Yes | Identifier / text | `<fsid>` | Unique identifier of the Ceph cluster. Keep it consistent with the target storage cluster. |
| Storage Pool | Yes | Text | `rbd-pool` | Storage pool that hosts block volumes. Confirm capacity, quota, and permissions. |
| Admin Key | Yes | Credential / sensitive text | `<admin-key>` | Admin key content or credential material. Fill it only in system forms. Do not write it in documents, screenshots, or tickets. |
| Over-provision Ratio | Yes | Number / capacity | `Example value` | Overcommit ratio between logical and physical capacity. Fill it carefully according to capacity planning. |
| Tenant Quota Limit | Yes | Number / capacity | `10 TiB` | Capacity limit available to tenants. Keep it consistent with tenant capacity policies. |
| Physical Threshold | Yes | Number / capacity | `80%` | Physical capacity alarm or limit threshold. Do not exceed the real capacity safety boundary. |
| Logical Threshold | Yes | Number / capacity | `90%` | Logical capacity alarm or limit threshold. Verify it together with the over-provision ratio. |
| Snapshot Limit per Vol | Yes | Number / capacity | `16` | Number of snapshots retained per volume. Configure according to capacity and backup policy. |
| Description | No | Multi-line text | `Example description` | Component purpose, boundary, or maintenance notes. Record non-sensitive notes only. |
| Actions | System-generated | Action entry | `Edit` | Register component, Test Connection, Submit, Search, Reset, and similar entries. `Submit` submits real configuration. Do not click it during learning or screenshot capture. |

## Pitfalls

- Creating a block storage component may affect workload PVC creation, volume mounting, capacity display, and resource scheduling.
- Incorrect Mon Node, FSID, Storage Pool, CSI configuration, or Admin Key may cause volume creation failure, mount failure, or data unavailability.
- Storage Pool and CSI configuration must match the target cluster CSI capability. Otherwise, volumes may be created but fail to mount.
- Before expanding a block volume, confirm that the underlying storage, file system, and workload all support online expansion.
- Before unmounting or deleting a block volume, confirm that the instance has stopped writing to avoid file system corruption or data loss.
- `Save`, `Submit`, and `OK` are high-risk final actions.
- Do not record real Mon Node values, FSID, Storage Pool names, Admin Key, Secret, kubeconfig, cluster IDs, resource pool IDs, accounts, keys, tokens, or internal test parameters.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page can be opened | `AI Infra > On-Prem > Resource Pools > Block Storage` is accessible. | Check menu configuration and account permissions. |
| List loads normally | Block storage component list, status, capacity, and connection information summary are displayed normally. | Refresh the page and check service status or browser console errors. |
| Creation entry is visible | `Register component` is displayed. | Check operator permissions, License, and page configuration. |
| Creation page can be opened | Clicking the entry opens `New Block Storage - Block Storage` and shows Block Storage Type, Cluster Name, Mon Node, FSID, Storage Pool, Admin Key, and threshold fields. | Check route, permissions, and frontend errors. |
| Required field validation works | Validation prompts appear when Block Storage Type, Cluster Name, Mon Node, FSID, Storage Pool, Admin Key, or threshold fields is missing. | Complete fields according to page prompts without bypassing validation. |
| No real submission during learning | No real save, submit, or OK action is triggered. | If submitted by mistake, immediately verify the component list and binding scope. |
| Status is traceable after real submission | The component appears in the list, and status matches expectations. | Check connection information, credentials, CSI configuration, and connection test result. |
| Binding scope can be verified | The target region or cluster can bind block storage capability. | Check component status, region, cluster, and permissions. |
| Volume lifecycle can be verified | A test workload can create, mount, unmount, and release a block volume. | Check CSI controller, node plugin, Storage Pool, CSI configuration, and node network. |
| Capacity statistics are consistent | Page capacity statistics remain consistent with the underlying storage system. | Check collection scope, quota, and sync status. |

## FAQ

#### Block Volume Creation Fails

**Symptom:**

After a job or instance requests block storage, the volume cannot be created or remains waiting.

**Possible Causes:**

- Ceph Mon, FSID, Pool, or authentication information is configured incorrectly.
- CSI configuration does not match.
- The target cluster CSI driver is abnormal.
- The underlying storage has insufficient capacity or Pool policy restrictions.

**Solution:**

1. Check the block storage component connection information.
2. Check CSI parameters, FSID, and Storage Pool configuration.
3. Check CSI controller and node plugin status in the target cluster.
4. Confirm Pool capacity, quotas, and permissions.

#### Block Volume Mount Fails

**Symptom:**

The volume has been created, but it cannot be mounted when the container starts.

**Possible Causes:**

- The node-side CSI plugin is abnormal.
- The volume access mode does not match the workload.
- The node cannot reach Ceph Mon or OSD network.
- Keyring, Secret, or authentication user permissions are insufficient.

**Solution:**

1. View instance events and node logs.
2. Check access mode, CSI configuration, and node plugin.
3. Confirm network connectivity from nodes to Mon and OSD.
4. Verify Keyring, Secret, and authentication user permissions.

## Next Steps

1. Bind the block storage component in regions or target clusters.
2. Use a test workload to verify creation, mounting, unmounting, and capacity release.
3. Include Ceph, Storage Pool, CSI status, and reclaim policies in operations inspections.
4. Regularly verify capacity statistics, Pool quotas, and abnormal events.

## Notes

- Creating a block storage component may affect workload PVC creation, volume mounting, capacity display, and resource scheduling.
- keyring, Ceph user keys, Secret, and kubeconfig are sensitive materials.
- Before deleting a block storage component, confirm that no running instances, PVCs, PVs, or business data depend on it.
- `Save`, `Submit`, and `OK` are high-risk final actions. Do not trigger them during learning or screenshots.
- Do not record real Mon Node values, FSID, Storage Pool names, Admin Key, Secret, kubeconfig, cluster IDs, resource pool IDs, accounts, keys, tokens, or internal test parameters.
