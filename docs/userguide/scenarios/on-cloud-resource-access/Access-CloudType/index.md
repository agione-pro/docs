---
prev: false
next: true
---

# Connect a Cloud Platform

Register the cloud-platform type before connecting accounts and regions.

## Target Outcome

The required public- or private-cloud platform is available for later account access and authorization.

## Applicable Roles

- Platform Operator

## Before You Start

- Confirm the cloud type, vendor identifier, localized display name, and private-cloud URL when applicable.
- Confirm that you are authorized to maintain platform-level access settings.

## Procedure

### Add a Platform

1. From the platform home page, select **Cloud Platforms** in the left navigation to open cloud-platform management.
2. Select **Add Platform** in the upper-right corner to open the dialog.

![Review connected cloud platforms](./images/access-cloudtype-list.png)

3. Select **Public Cloud** or **Private Cloud**.
4. Configure the platform:
   - Enter or select the **Provider Identifier**. Public clouds use a select; private clouds use text.
   - Maintain the localized **Display Name** on the English and Simplified Chinese tabs.
   - For a private cloud, enter the platform **URL**.
   - Upload a **Logo**.
5. Review the information and select **Confirm**, or **Cancel** to discard it.

![Add a cloud platform](./images/add-platform.png)

#### Parameter Reference

| Field | Type | Example | Description |
| --- | --- | --- | --- |
| Cloud Platform Type | Two-option tab | `Public Cloud` / `Private Cloud` | Required; identifies the platform type |
| Provider Identifier | Select / Text | `aliyun` / `agione-powerone` | Required; uniquely identifies the platform |
| Display Name | Localized text | `Alibaba Cloud / 阿里云` | Required; maintain English and Simplified Chinese values |
| URL | URL | `http://test.metis.opr/infrahub/op/access/platform` | Required only for private clouds |
| Logo | Image | `Alibaba Cloud / AWS / AGIOne-powerone` | Optional; platform icon. Huawei Cloud access is not currently supported. |

## Completion Checklist

> **Purpose:** These are the exit criteria for the current feature task. Use them to decide whether the result is observable and reviewable and whether you can continue to the next step in the scenario. They do not repeat the procedure; if any item fails, follow the troubleshooting section below.

| Check | Pass Criteria |
| --- | --- |
| 1 | Platform identifier and display names are correct. |
| 2 | Private-cloud access URL is reachable when applicable. |
| 3 | The platform is available in account creation. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| The platform is missing when adding an account | Platform status, vendor identifier, and saved display configuration |
| A private-cloud page cannot be opened | Access URL, DNS, network route, and certificate |

## User Manual

[Review complete fields, validation rules, and common issues for Cloud Platforms](/usermanual/ai-infra-on-cloud/operator/access-management/cloud-platforms/)
