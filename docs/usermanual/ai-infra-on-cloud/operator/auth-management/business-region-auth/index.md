# Business-Region Auth

::: info Document Information
Version: v1.0
Updated: 2026-07-20
:::

## Feature Overview

`Business-Region Auth` is used to assign usage permissions for specific regions under cloud platforms to different business scenarios. After authorization, tenants can only access and use resources and services in authorized regions, which helps control the cloud platform region scope available to each business.

| Item | Content |
| --- | --- |
| Applicable role | Operator |
| Navigation path | AI Infrastructure > On-Cloud > Authorization Management > Business-Region Auth |
| Page route | `/infrahub/op/auth/region-auth` |
| Managed objects | Business type, cloud platform, authorized regions, and action entries |
| Typical use | Configure available cloud platform regions for a specified business type |

#### Beginner Explanation

Business-region authorization defines the region boundary that a business can use for deployment. After tenants obtain cloud platform permission, business-region authorization is still required so deployment or scheduling workflows can choose resources within the allowed region scope.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Business Type | Business scenario being authorized on the page, such as inference deployment. |
| Authorized Regions | Cloud platform regions that the current business is allowed to use. |
| Cloud Platform | Cloud platform that contains authorized regions, such as Huawei Cloud, Alibaba Cloud, or Virtual Cloud. |
| Current Authorized Business | Business type currently being configured in the authorization dialog. |
| Region Count | Number of authorized regions displayed in a cloud platform card. |

## Prerequisites

1. The target business type has been configured in the platform.
2. The cloud platform and regions to be authorized have been connected and are available.
3. The business-available regions, resource scheduling scope, and change impact have been confirmed.

## Page Description

This page is used to view and maintain authorization relationships between business types and cloud platform regions. The list is grouped by `Business Type`, displays cloud platforms and their authorized region counts under each business type, and provides entries such as `Authorize Regions`, `Export`, and `Import`.

Page screenshot:

![Business-Region Auth List](./images/business-region-auth-list.png)

## Main Operations

### Authorize Regions

1. Go to `AI Infrastructure > On-Cloud > Authorization Management > Business-Region Auth`.
2. Find the target business in the business type list, such as `INFERENCE_JOB`.
3. Click `Authorize Regions` on the right side of the target business.
4. In the dialog, confirm `Current Authorized Business` and expand the target cloud platform.
5. Select or clear the regions to authorize.
6. Before clicking the final `Confirm`, verify the business type, cloud platform, and region authorization scope again.
7. For learning or page validation only, click `Cancel` or close the dialog without submitting real authorization configuration.

Key step screenshot:

![Authorize Regions](./images/auth-regions.png)

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Business Type | Yes | Text/Group | `INFERENCE_JOB` | Business scenario whose region authorization is being configured. |
| Current Authorized Business | Yes | Prompt | `INFERENCE_JOB` | Indicates the business type currently being authorized in the dialog. |
| Cloud Platform | Yes | Tree group | `Huawei Cloud` | Used to expand and select regions under the cloud platform. |
| Authorized Regions | Yes | Multi-select | `East China-Shanghai 1` | Cloud platform regions that the current business is allowed to use. |
| Region Count | No | Number | `2` | Number of authorized regions displayed in the list card. |
| Authorize Regions | No | Button | `Authorize Regions` | Opens the region authorization dialog. |
| Export | No | Button | `Export` | Exports authorization data and may contain sensitive operational information. |
| Import | No | Button | `Import` | Imports authorization data in bulk and may change multiple authorization configurations. |
| Cancel | No | Button | `Cancel` | Closes the dialog without saving the current configuration. |
| Confirm | Yes | Button | `Confirm` | Submits the region authorization configuration. Review carefully before clicking. |

## Pitfalls

- Business-region authorization affects deployment or scheduling availability. Do not rely only on similar region names.
- `Import` may change authorization relationships in bulk. Do not perform a real import when only learning or validating the page.
- The screenshots do not show resource pool, availability zone, or enabled status fields, so this page does not document them as confirmed UI fields.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page is accessible | The `Business-Region Auth` page is displayed. | Check menu permissions, route, and login status. |
| Authorization list loads | The list displays business type, cloud platform cards, region counts, and action entries. | Check data permissions, API status, and page refresh result. |
| Authorization entry is visible | `Authorize Regions` is displayed on the right side of the target business. | Check operator permissions and business type configuration. |
| Authorization dialog opens | The dialog displays `Current Authorized Business`, the cloud platform region tree, `Cancel`, and `Confirm`. | Refresh the page and retry. If the issue persists, contact the administrator. |
| Required controls are identifiable | The region tree can be expanded and region checkboxes can be selected. | Check cloud platform and region access status. |
| Authorization can be tracked | If a real submission is made, the region count for the corresponding cloud platform should match the authorization selection. | Return to the list and verify business type, cloud platform, and region scope. |

## FAQ

#### No Available Specifications Under a Business Region

**Issue Symptom:**

After a user selects a business region, specifications or available resources are empty.

**Possible Causes:**

- The current business has not been authorized for the corresponding cloud platform region.
- The cloud platform region has not been connected, synchronized, or is in an abnormal state.
- Upper-level tenant-cloud authorization is incomplete.

**Handling:**

1. Check the authorized regions under the business type.
2. Confirm cloud platform and region access status.
3. Return to Tenant-Cloud Auth and verify the upper-level authorization.

#### Deployment Is Scheduled to an Unexpected Region

**Issue Symptom:**

After a user selects a business scenario, the deployment lands in an unexpected cloud platform region.

**Possible Causes:**

- Multiple regions are authorized for the current business.
- The downstream scheduling policy has fallback regions or resources configured.
- The preferred region is unavailable or has insufficient capacity.

**Handling:**

1. Check the authorized region scope of the target business.
2. Review the scheduling policy and resource availability.
3. Verify scheduling reasons in deployment events.

## Next Steps

1. Validate the deployment or resource selection flow from the business perspective.
2. Review region selection order and fallback scope together with scheduling policies.
3. Regularly check authorized region counts to avoid business availability being too broad or too narrow.

## Notes

- Authorizing regions may change business-available regions, resource pool scheduling scope, and deployment availability.
- Authorization changes may affect real deployments, resource scheduling, capacity usage, cost ownership, and business continuity.
- `Confirm`, `Save`, and `Submit` are high-risk final actions. This document only describes field review and pre-submission checks, and does not guide users to submit during testing or learning.
- `Export` may contain sensitive operational data, and `Import` may update authorization relationships in bulk. Confirm the impact scope before operating.
- Do not write real business names, tenant information, accounts, keys, tokens, AK/SK, endpoints, cloud resource IDs, or internal test parameters.
