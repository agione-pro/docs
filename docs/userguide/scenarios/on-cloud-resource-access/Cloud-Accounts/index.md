---
prev: false
next: true
---

# Connect a Cloud Account

Connect an operator-managed cloud account used to discover and deploy regional resources.

## Target Outcome

AGIOne can validate the cloud account and discover only the regions and resources that it is permitted to use.

## Applicable Roles

- Platform Operator

## Before You Start

- Create a dedicated least-privilege cloud credential for AGIOne.
- Confirm that the target cloud platform has already been connected.

## Procedure

### Add a Cloud Account

1. From the platform home page, select **Access Management > Cloud Accounts**.
2. Select **Add Cloud Account** in the upper-right corner.

![Review cloud accounts](./images/cloud-accounts-list.png)

3. Configure the account:
   - Enter an **Account Name**.
   - Select a currently supported cloud platform, such as Alibaba Cloud or AWS. Huawei Cloud access is not currently supported.
   - Enter the **Access Key ID**.
   - Enter the **Access Key Secret** through the protected field.
4. Review the information and select **Confirm**, or **Cancel** to discard it.

![Add a cloud account](./images/add-account.png)

#### Parameter Reference

| Field | Type | Example | Description |
| --- | --- | --- | --- |
| Account Name | Text | `aliyun-wh-dev` | Required; a user-defined account identifier |
| Cloud Platform | Select | `Alibaba Cloud` | Required; the supported target cloud platform |
| Access Key ID | Text | `LTAI5tM8xHnXoLuBW...` | Required; the cloud credential ID |
| Access Key Secret | Password | `flsBCIDPLksdaNh05J...` | Required; the cloud credential secret |

## Completion Checklist

> **Purpose:** These are the exit criteria for the current feature task. Use them to decide whether the result is observable and reviewable and whether you can continue to the next step in the scenario. They do not repeat the procedure; if any item fails, follow the troubleshooting section below.

| Check | Pass Criteria |
| --- | --- |
| 1 | Account validation succeeds. |
| 2 | Only required cloud permissions are granted. |
| 3 | Regions and resources are discovered as expected. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Account validation fails | Credential status, required cloud permissions, time synchronization, and network access |
| Regions are missing | Cloud permissions, account region scope, and resource synchronization status |

## User Manual

[Review complete fields, validation rules, and common issues for Cloud Accounts](/usermanual/ai-infra-on-cloud/operator/access-management/cloud-accounts/)
