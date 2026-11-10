---
prev: false
next: true
---

# Authorize Business Types to Regions

Grant each business type access to the cloud regions it may use.

## Target Outcome

Each business type, such as inference deployment, can schedule only to its approved cloud regions.

## Applicable Roles

- Platform Operator

## Before You Start

- Enable the required resource-pool regions first.
- Confirm which business types are allowed in each region.

## Procedure

### Authorize Regions

1. From the platform home page, select **Authorization Management > Business-Region Authorization**.
2. Expand a business type to review cards showing the number of authorized regions for each currently supported cloud platform, such as AWS, Alibaba Cloud, or {{DOCS_CLOUD_PLATFORM_EN}}.
3. Select **+ Authorize Regions** for the business type to open the authorization dialog.

![Review business-region authorization](./images/business-region-auth-business-region-auth.png)

The image shows the authorization list before its business type is expanded. It locates **Authorize Regions**, not a saved authorization result.

4. Confirm the current business type shown in the information bar.
5. In the dialog, select the cloud platform and check only the resource pools approved for the business. Unchecked pools remain unauthorized.
6. Select **Done** to save the authorization, or close the dialog without saving.

![Select authorized regions](./images/business-region-auth-authorize-resource-pools.png)

The figure shows the resource-pool selection dialog with per-cloud selected counts and a searchable pool list. It does not prove a successful save or effective downstream access; after saving, verify the list and deployment entry.

> This authorization assigns regions to a specific business scenario. A tenant can use only regions covered by both tenant-cloud and business-region authorization.

#### Parameter Reference

| Field | Type | Example | Description |
| --- | --- | --- | --- |
| Business Type | Single select | `Inference Deployment` | Required; the business scenario receiving access |
| Cloud Platform | Checkbox | `Alibaba Cloud / AWS` | Required; platform groups in the region tree |
| Region | Checkbox | `China East 2 (Shanghai) / Hong Kong` | Required; approved regions under the selected platforms |

## Completion Checklist

Check the results below; resolve failed items using the troubleshooting section before continuing.

| Check | Pass Criteria |
| --- | --- |
| 1 | The business type has only the intended regions. |
| 2 | Saved authorization persists after refresh. |
| 3 | User deployment options follow the granted region set. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| No region can be selected | Resource-pool enablement and cloud-platform status |
| Deployment shows an unexpected region | Business type, saved region selection, and current tenant authorization |

## User Manual

[Review complete authorization rules and common issues for Business-Region Authorization](/usermanual/ai-infra-on-cloud/operator/auth-management/business-region-auth/)
