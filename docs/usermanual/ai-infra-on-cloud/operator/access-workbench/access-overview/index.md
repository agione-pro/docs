# Access Overview

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

`Access Overview` is used to view the InfraHub access foundation, operator resource checklist, and grant status. It helps operators quickly confirm whether cloud platforms, resource pools, accounts, inference images, inference frameworks, model library models, policies, and grant configurations are complete.

| Item | Content |
| --- | --- |
| Applicable role | Operator |
| Navigation path | AI Infrastructure > On-Cloud > Access Workbench > Access Overview |
| Page route | `/infrahub/op/workbanch/overview` |
| Managed objects | Connected clouds, connected resource pools, connected accounts, operator resource checklist, tenant grants, and business resource pool grants |
| Typical use | View cloud infrastructure access completeness and grant status |

#### Beginner Explanation

Access Overview is like a dashboard for cloud infrastructure access. It does not replace specific configuration pages. Instead, it puts cloud platforms, resource pools, accounts, operator resources, and grant status on one page so operators can determine whether the access chain is complete.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Access Foundation | Shows the basic access status of connected clouds, resource pools, and accounts. |
| Operator Resource Checklist | Shows resource types such as inference images, inference frameworks, model library models, and policies, including count, prerequisites, supports, and action entries. |
| Grant Status | Shows tenant-cloud platform grants and business-resource pool grants. |
| Prerequisites | Access configurations that must be completed before a resource can be used. |
| Action | Entry that jumps to the corresponding resource management page. |

## Prerequisites

1. The current account has access to `Access Workbench > Access Overview`.
2. At least one cloud platform, resource pool, or access account has been configured.
3. Before viewing grant status, tenant, business type, and resource pool grant rules have been configured according to actual operational needs.

## Page Description

The page displays `InfraHub Access Overview`. The top `Access Foundation` section shows connected clouds, connected resource pools, and connected accounts. The middle `Operator Resource Checklist` shows resource, count, prerequisites, supports, and action entries. The bottom `Grant Status` section shows Tenant-Cloud Platform Grants and Business-Resource Pool Grants.

Page screenshot:

![Access Overview](./images/access-overview-list.png)

## Main Operations

### View Access Overview

1. Go to `AI Infrastructure > On-Cloud > Access Workbench > Access Overview`.
2. In `Access Foundation`, view the counts and names of `Connected clouds`, `Connected resource pools`, and `Connected accounts`.
3. Click `Connect Cloud Platforms`, `Connect Resource Pools`, or `Access Accounts` to open the corresponding access management page and view details.
4. In `Operator Resource Checklist`, view Resource, Count, Prerequisites, Supports, and Action to confirm whether inference images, inference frameworks, model library models, and policies are ready.
5. Click `Open` in a resource row to enter the corresponding resource management page for viewing or handling configuration.
6. In `Grant Status`, view `Tenant-Cloud Platform Grants`, `Business-Resource Pool Grants`, total tenants, granted tenants, ungranted tenants, and authorized resource pool counts.
7. To adjust grants, click `Manage Tenant-Cloud Grants` or `Manage Business-Region Grants` to enter the grant management page. For learning or page validation, only view information and do not perform real grant or configuration changes.

![Access Overview](./images/access-overview-list.png)

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Connected clouds | System-generated | Number / list | Displayed on page | Shows the number and names of connected cloud platforms. |
| Connected resource pools | System-generated | Number / list | Displayed on page | Shows the number and names of connected resource pools. |
| Connected accounts | System-generated | Number / list | Displayed on page | Shows the number and names of connected accounts. |
| Resource | System-generated | Text | `Inference images` | Resource type in the operator resource checklist. |
| Count | System-generated | Number | Displayed on page | Number of registered or configured items under the resource type. |
| Prerequisites | System-generated | Text | Displayed on page | Access configurations that must be completed before the resource can be used. |
| Supports | System-generated | Text | Displayed on page | Describes the role of the resource in the inference deployment or scheduling flow. |
| Action | No | Action entry | `Open` | Jumps to the corresponding resource management page. |
| Total tenants | System-generated | Number | Displayed on page | Number of tenants in the current statistics scope. |
| Granted tenants | System-generated | Number | Displayed on page | Number of tenants with cloud platform grants configured. |
| Ungranted tenants | System-generated | Number | Displayed on page | Number of tenants without cloud platform grants configured. |
| Authorized resource pools | System-generated | Number / tag | Displayed on page | Number and names of resource pools available to the business type. |

## Pitfalls

- Access Overview is an aggregated view. During troubleshooting, go to the cloud platform, resource pool, account, resource, or grant page for verification.
- Entries such as `Open`, grant management, and access entries may jump to configuration pages. Do not perform real configuration changes during learning or screenshots.
- Before screenshots or external communication, redact cloud accounts, resource pool names, internal resource identifiers, access endpoints, Keys, Tokens, AK/SK, and internal test parameters.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page is accessible | The `InfraHub Access Overview` page opens normally, and `Access Workbench > Access Overview` is highlighted in the sidebar. | Check account permissions, navigation path, and page loading status. |
| Access Foundation displays normally | Connected clouds, connected resource pools, and connected accounts cards show counts and names normally. | Return to the cloud platform, resource pool, or access account page and check access status. |
| Operator Resource Checklist loads normally | Resource rows such as inference images, inference frameworks, model library models, and policies display normally. | Check prerequisites and resource synchronization status. |
| Grant Status displays normally | Tenant-Cloud Platform Grants and Business-Resource Pool Grants show grant counts normally. | Go to the grant management page and check grant configurations. |
| Entries can be opened | Clicking `Open`, `Connect Cloud Platforms`, `Connect Resource Pools`, `Access Accounts`, or grant management entries opens the corresponding page. | Check target page permissions and route configuration. |
| Data is consistent with configuration | Card counts, resource counts, and grant counts are consistent with the corresponding management pages. | Refresh the page or wait for synchronization tasks to complete, then review again. |

## FAQ

#### Access overview counts are inconsistent with detail pages

**Issue Symptom:**

The access overview card count or resource count is inconsistent with data shown on the detail page.

**Possible Causes:**

- Aggregated overview data has refresh latency.
- Resource or grant synchronization tasks have not completed.
- The current account has different data permissions on the detail page and overview page.

**Handling:**

1. Refresh Access Overview and confirm the latest data.
2. Go to the corresponding cloud platform, resource pool, account, or grant page and check status.
3. Wait for synchronization tasks to complete, then review again.

#### What if Grant Status shows ungranted tenants?

**Issue Symptom:**

`Ungranted tenants` is greater than 0, or the target resource pool is missing from Business-Resource Pool Grants.

**Possible Causes:**

- The tenant has not been configured with cloud platform grants.
- The business type has not been bound to available resource pools.
- Grant configuration has changed but the overview has not refreshed.

**Handling:**

1. Click the grant management entry to open the corresponding grant page.
2. Check the tenant, business type, and resource pool grant scope.
3. After completing grants, return to Access Overview and confirm that the counts changed.

## Next Steps

1. Go to the cloud platform, resource pool, or access account page to complete access configuration.
2. Go to inference images, inference frameworks, model library models, or policies to view operator resource readiness.
3. Go to grant management pages to check tenant and business resource pool grants.

## Notes

- Access Overview is mainly for viewing. Configuration changes should be completed on the corresponding management pages.
- Synchronization, export, configuration, refreshing access data, or changing resource mappings are sensitive entries. This document does not guide real configuration changes.
- Do not write real provider-sensitive information, internal resource identifiers, access endpoints, Keys, Tokens, AK/SK, or internal test parameters in the document.
