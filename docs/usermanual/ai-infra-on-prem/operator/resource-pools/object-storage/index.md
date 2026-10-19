# Object Storage

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator |
| Navigation Path | AI Infra(On-Prem) > Resource Pools > Object Storage |
| Page Route | `/powerone/resourcepool/storage` |
| Managed Object | Configuration, status, and relationships on Object Storage |

#### Beginner Explanation

- **Object storage** is like a bucket-organized file repository, suitable for storing model weights, datasets, compressed packages, and runtime artifacts.
- **Bucket** is the top-level container of object storage. Users can organize objects only after creating buckets.
- **Endpoint** is the access entrypoint. The platform, clusters, or jobs need to access object storage through it.
- **AK/SK** are access credentials and sensitive information. They should not appear in screenshots, documentation, or tickets.

#### Terms

| Term | Description |
| --- | --- |
| MinIO | A common S3-compatible object storage implementation. |
| S3 | Object storage API protocol or compatible interface. |
| Bucket | The top-level object storage container used to organize objects. |

#### Recommended Operation Order

Confirm prerequisites for the provider type, the access credentials, the endpoint or region, the source name, and the quota and pricing plan, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Object Storage, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The object storage service has been deployed and can be accessed from the platform management side and target clusters.
2. Endpoint or region, access protocol, authentication method, access credentials, bucket and capacity plan, capacity price, and associated regions have been prepared.
3. Bucket naming, tenant isolation, permission boundaries, and data retention policies have been confirmed.
4. The current account has operator resource pool management permissions.

## Page Description

Use this page to manage connected object storage sources: provider type, display name, endpoint or region, access credentials, bucket and capacity quota, capacity pricing, description, and health state.

![Object Storage](./images/manual-object-storage.png)

Sources are shown as cards. Each card shows `Endpoint` with `Copy endpoint`, the service region, the masked `Access Key` with show and copy actions, `Available buckets N items`, `Reference bucket limit N items`, the capacity price in credits per GiB per hour, `Created at: ...`, and the availability-zone labels. Filter with the `All providers` / `Compatible S3` / `AWS S3` / `Alibaba Cloud OSS` / `Huawei Cloud OBS` tabs, search by name, endpoint, or region and click `Search`, then use `Register` on the page header.

## Main Operations

### Register Object Storage Component

#### Applicable Scenarios

Register a storage component when a new MinIO, S3-compatible storage, or another object storage service needs to be connected and used by regions, user-side buckets, or job object path read/write. In this page, storage component refers to the object storage entry managed here.

#### Steps

1. Go to `AI Infra(On-Prem) > Resource Pools > Object Storage` and click **"Register"** to open the `Register S3 source` dialog.
2. Choose the provider card: `Compatible S3`, `AWS S3`, `Alibaba Cloud OSS`, or `Huawei Cloud OBS`. Each provider lists the permission codes its account needs, with a copy action.
3. Fill in `Access Key *` and `Secret Key *`; `Show secret` reveals the value.
4. Fill in the address or the region: `Compatible S3`, `AWS S3`, and `Alibaba Cloud OSS` take the endpoint field, while `Huawei Cloud OBS` replaces it with `Region *`, whose options are returned by **"Load regions"**.
5. Fill in `Source name *` and `Description`, then click the final **"Account preflight"** to submit. This dialog contains no quota fields; bucket count, capacity, and pricing are configured on the card afterwards.
6. Before submitting, verify the provider, the endpoint or region, the Access Key, and the source name again.

The following figure shows the Register Storage Component form, used to configure object storage access method and connection parameters.

![Register Storage Component](./images/object-storage-register.png)

#### Result Validation

- After a successful submit, the source appears as a card showing its state, the `Endpoint` or `Provider Region` line, `Available buckets`, `Reference bucket limit`, `Capacity pricing`, and the `Created at:` timestamp.
- The card also carries the four entries used by the rest of this page: the quota entry, `Health check`, `Edit`, and `Delete`.
- Quota and pricing are not part of registration. Configure them through the quota entry on the card, where the bucket limit, capacity limit, and the capacity price are submitted together.

#### Notes

- The register dialog footer offers only `Cancel` and `Account preflight`; the edit dialog ends with `Save changes`. The two are different entries and behave differently.
- `Huawei Cloud OBS` replaces the endpoint field with `Region *`, whose options are returned by `Load regions` after the credentials are complete.
- The account you enter must already hold the action codes the provider card lists.

### Configure Quota and Pricing

"Configure limits for ..." on the card opens one dialog with three tabs: `Default quota`, `Tenant quota`, and `Pricing Strategy`. Quota and price are submitted together.

#### Applicable Scenarios

Use this dialog to set the default bucket count and capacity per tenant, to give one tenant a dedicated quota, or to change the hourly capacity price in credits.

#### Steps

1. Click the quota entry on the target card to open the dialog, which shows the source name and its endpoint.
2. On `Default quota`, set the bucket count limit and the capacity limit with its unit. The default applies when a tenant has no dedicated quota.
3. On `Tenant quota`, choose the tenant, set the bucket count and the capacity limit (blank disables the limit), and click **"Add"**. The `Configured` table lists `Tenant Name`, `Bucket Limit`, `Capacity limit`, `Allocated Capacity`, `Update Time`, `Edit`, and `Remove (Restore Default)`.
4. On `Pricing Strategy`, set the capacity price in credits per GiB per hour. The tab shows the current revision and a price history table with `Active` and `Archived` rows. Blank disables billing.
5. Click **"Save"**. The dialog notes that a changed capacity price is submitted together with the quota limits; click **"Cancel"** to discard.

#### Result Validation

- The card shows the new capacity price, and `Available buckets` and `Reference bucket limit` follow the default quota.
- The `Pricing Strategy` tab increases the current revision and moves the previous rate to the history table.

#### Notes

- Price and quota share one save action, so any quota field you touched is written even when you only meant to change the price.
- `Allocated Capacity` is the sum of capacity quotas of that tenant's active buckets, not real file usage.
- Lowering a bucket count or capacity limit can affect buckets that already exist. Confirm the business window first.

### Edit Object Storage Component

#### Applicable Scenarios

Edit a source when its endpoint or region, display name, description, or credentials must change.

#### Steps

1. Click "Edit ..." on the target card to open the `Edit S3 source` dialog.
2. Leave the credential fields empty to keep the existing credential, or enter new values to replace it.
3. Change the endpoint or region, `Source name`, and `Description`.
4. Click **"Save changes"** to submit, or **"Cancel"** to discard.

#### Result Validation

- The card shows the new name, endpoint or region, and description.

#### Notes

- The final button of the edit dialog is `Save changes`, which differs from the `Account preflight` entry of the register dialog.
- The health check and the quota dialog are separate entries and are not part of this edit.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Provider type | Yes | Card selection | `Compatible S3` | `Compatible S3`, `AWS S3`, `Alibaba Cloud OSS`, or `Huawei Cloud OBS`. The choice decides whether the dialog asks for an endpoint or a region. |
| Access Key | Yes | Credential / sensitive text | `<ACCESS_KEY_ID>` | Access key for object storage. Fill it only in system forms. Do not write it in documents, screenshots, or tickets. |
| Secret Key | Yes | Credential / sensitive text | `<ACCESS_KEY_SECRET>` | Secret key for object storage. Sensitive credential. Do not write it in documents, screenshots, or tickets. |
| Endpoint | Conditionally required | Address / path | `<BASE_URL>` | Used by `Compatible S3`, `AWS S3`, and `Alibaba Cloud OSS`. Do not record real endpoint values in documentation. |
| Region | Conditionally required | Dropdown / enum | `<REGION_ID>` | Replaces the endpoint field for `Huawei Cloud OBS`. Options are returned after the credentials are complete. |
| Source name | Yes | Text | `<SOURCE_NAME>` | Display name of the object storage source. Use a name that reflects storage type, environment, or region. |
| Description | No | Multi-line text | `Example description` | Component purpose, boundary, or maintenance notes. Record non-sensitive notes only. |
| Bucket limit / capacity limit | No | Number / capacity | `10` / `5 GiB` | Configured in the `Configure Quota & Pricing` dialog, not in the register dialog. |
| Capacity price | No | Number / price | `<PRICE>` | Configured on the `Pricing Strategy` tab and submitted together with the quota limits. Blank disables billing. |
| Actions | System-generated | Action entry | `Edit` | The card offers the quota and pricing entry, the health check, edit, and delete. The health check and `Delete` are high-risk actions. |

## Pitfalls

- Registering a storage component affects regional object storage capability, user-side bucket creation, job object path read/write, and data access scope.
- An incorrect endpoint, region, certificate, AK/SK, bucket policy, or quota setting may cause jobs to fail to read from or write to object storage.
- AK/SK, tokens, internal connection strings, and production bucket paths are sensitive information and must not be written into documents, screenshots, or tickets.
- `Save`, `Submit`, and `OK` are high-risk final actions.
- Do not record real Endpoint values, internal addresses, AK/SK, tokens, bucket names, production object paths, cluster IDs, resource pool IDs, or internal test parameters.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Object Storage opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | Configuration, status, and relationships on Object Storage is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### Target Is Missing from Object Storage

**Symptom:**

The page opens, but the expected object storage source, provider card, endpoint or region, or quota and pricing entry is missing.

**Possible Causes:**

- Filters remain active.
- the object belongs to another scope.
- a prerequisite is incomplete.

**Solution:**

1. Reset filters
2. verify region or tenant ownership
3. confirm prerequisite state.

#### The Operation Entry on Object Storage Is Unavailable

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

#### A Required Field on Object Storage Has No Options

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

#### Object Storage Has an Abnormal State After the Operation

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

#### A Downstream Page Cannot Use Object Storage

**Symptom:**

The current page is normal, but a downstream page cannot select the object storage source, its bucket and capacity quota, or the pricing applied to the target tenant.

**Possible Causes:**

- Visibility differs.
- the object is disabled.
- downstream cache is stale.

**Solution:**

1. Check enabled state and ownership
2. verify role visibility
3. refresh and select again.

## Notes

- Registering a storage component affects regional object storage capability, user-side bucket creation, job object path read/write, and data access scope.
- Do not screenshot or record real Endpoint values, internal addresses, AK/SK, tokens, internal connection strings, production bucket names, or production object paths.
- Before deleting, disabling, or replacing an object storage component, confirm data migration, backups, region bindings, and dependent jobs.
- `Save`, `Submit`, and `OK` are high-risk final actions. Confirm the scope and impact before executing the final action.
- Do not record real Endpoint values, internal addresses, AK/SK, tokens, bucket names, production object paths, cluster IDs, resource pool IDs, or internal test parameters.

## Next Steps

1. Go to [Regions & Zones](../regions-zones/) to bind the object storage component.
2. Guide users to create buckets and upload data in [Object Storage](../../../user/storage/object-storage/).
3. Verify object read/write, permissions, and path configuration with a test job.
4. Regularly check capacity usage, bucket policy, and data retention policy.
