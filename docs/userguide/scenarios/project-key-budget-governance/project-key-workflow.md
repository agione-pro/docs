---
prev: false
next: true
---

# Configure Projects, Keys, and Budgets

Use this task to create a project with a budget, model scope, and independent calling credential.

## Applicable Roles

- Model Providers, end users, and provider administrators

## Before You Start

- Confirm permission to create projects and keys in the target tenant.
- Identify the project owner, members, budget cycle, model scope, and over-budget policy.
- Decide whether the workload needs a Model API Key or System API AK/SK pair.

## Procedure

### 1. Create a Project

Open [Projects](../../../usermanual/settings/user/personal/projects/), select Create Project, and enter the name, description, reset cycle, cycle budget, alert threshold, over-budget policy, and model allowlist.

![Create a project and set its budget and model scope](../../../usermanual/settings/user/personal/projects/images/create-project.png)

### 2. Review Project Details

Open the project from the list and review Overview, Members, Usage, API Keys, Activity, and Settings. Confirm that project state and budget rules were saved.

![Review projects and budget status](../../../usermanual/settings/user/personal/projects/images/projects-list.png)

### 3. Create a Purpose-Specific Key

Open [My Keys](../../../usermanual/settings/user/personal/my-keys/) from the visible menu, then choose `Model API Keys` or `System API AK/SK Pairs`. Both creation dialogs contain `Key Name`, optional `Description`, and `Expire Time`; only the Model API dialog contains reset-cycle and limit controls. Use the description to record the purpose; do not treat Purpose as a separate field. Use separate Keys for production, testing, and temporary work.

![Create a key with a clear purpose and validity period](../../../usermanual/settings/user/personal/my-keys/images/create-key.png)

### 4. Set Key Limits and Validate

For a Model API Key, open the row overflow menu and select `Limit`. Review `Reset Cycle`, the conditional reset day, and `Enable Limit`; when enabled, review `Period Limit (credits)` and `Warning Threshold (%)` against the project budget. Stop before `Save Limit` unless the change is explicitly approved. After an approved save, use a controlled request to verify that the model allowlist, project budget, and Key limit all apply.

![Set the cycle limit for a key](../../../usermanual/settings/user/personal/my-keys/images/key-quota.png)

## Completion Checklist

> **Purpose:** These checks confirm that the project and its credentials are ready for controlled use. Resolve failed checks before distributing the key.

| Check | Pass Criteria |
| --- | --- |
| Project rules | Budget, alert, over-budget policy, and model allowlist are saved. |
| Key boundary | Key Name, Description, validity period, and applicable limit are clear; ownership is verified in the Project or Member scope. |
| Call validation | Allowed models work; disallowed or over-limit requests are restricted as configured. |
| Audit records | Project and key changes can be located in activity or operation logs. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Calls stop after the project reaches its budget | Used budget, over-budget policy, and reset cycle |
| Key call fails | Key state, expiration, project budget, member quota, and model allowlist |
| Project or key is not visible | Account role, tenant membership, and menu permission |
| Workload fails after key rotation | Caller configuration update and whether the old key was disabled too early |
