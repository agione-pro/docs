# User Manual

::: info Document Information
Version: v1.0
Updated: 2026-07-21
:::

## Manual Overview

The user manual is for platform operators, model providers, general users, billing operators, and system administrators. It covers model publishing and calling, cloud resource scheduling, local heterogeneous compute management, billing operations, and platform settings.

The manual is organized into five modules in the left sidebar:

1. Model Services: publish, review, try, and call models.
2. AI Infra On-Cloud: connect cloud accounts, authorize resource pools, and deploy cloud model services.
3. AI Infra On-Prem: manage local resource pools, templates, quotas, monitoring, and user-side resources.
4. Billing: view user billing, customer billing, finance operations, and License information.
5. Settings: manage accounts, members, roles, organizations, system configuration, and operation logs.

## Where To Start

| Your role or goal | Recommended entry | Next step |
| --- | --- | --- |
| First-time platform user | Start from this page, then open the target module getting-started page. | Confirm your role, permissions, and target resource before entering a feature page. |
| General user | Model Services, AI Infra On-Prem, Billing, or Settings. | Decide whether you need to call models, use resources, check billing, or manage personal settings. |
| Platform operator | Settings, AI Infra On-Cloud, AI Infra On-Prem, and Model Services. | Confirm account permissions, resource onboarding, and approval boundaries first. |
| Billing or finance user | Billing. | Confirm billing cycle, customer, organization, and business-line scope. |
| Model provider | Model Services. | Start with model publishing, review, calling, and revenue paths. |

## Find The Right Entry By Goal

| Module | Applicable Roles | Core Features | Recommended Entry |
| --- | --- | --- | --- |
| Model Services | Model providers, model callers, operator admins | Meta-models, model sources, model publishing, reviews, Playground, call logs, revenue statistics | [Overview](./model-services/), [Getting Started](./model-services/getting-started/), [Publish and Call a Model](./model-services/end-to-end/publish-and-call-model/) |
| AI Infra On-Cloud | Cloud resource operators, general users | Cloud platforms, cloud accounts, resource pools, tenant authorization, business-region authorization, deployment assets, scheduling policies, quick deployment | [Overview](./ai-infra-on-cloud/), [Getting Started](./ai-infra-on-cloud/getting-started/), [Deploy a Cloud Model Service](./ai-infra-on-cloud/end-to-end/deploy-cloud-model-service/) |
| AI Infra On-Prem | Resource pool operators, general users | Regions, availability zones, clusters, accelerators, specifications, images, storage, templates, quotas, metering, monitoring | [Overview](./ai-infra-on-prem/), [Getting Started](./ai-infra-on-prem/getting-started/), [Deploy a Model Service](./ai-infra-on-prem/end-to-end/deploy-model-service/) |
| Billing | General users, platform operators, billing operators, License admins | User billing, customer billing, finance operations, top-up orders, monthly bills, settlements, adjustments, License | [Overview](./billing/), [Getting Started](./billing/getting-started/), [Reconcile and Settle a Billing Cycle](./billing/end-to-end/reconcile-billing-cycle/) |
| Settings | General users, platform operators, system admins, security admins | Personal Keys, account information, projects, team members, roles, organization settings, operation logs, system configuration, API rate control | [Overview](./settings/), [Getting Started](./settings/getting-started/), [Configure Account and Permissions](./settings/end-to-end/configure-account-and-permissions/) |

## Core Terms

| Term | Beginner Meaning | Common Entry |
| --- | --- | --- |
| Model Service | AI capability that can be published, tried, called, and operated. | Model Services |
| Resource Pool | Compute scope that hosts instances, jobs, or model services. | AI Infra On-Cloud, AI Infra On-Prem |
| Billing cycle | Time period used for financial statistics and settlement. | Billing |
| License | Credential that controls authorization quota, validity, and resource permission. | Billing, Settings |
| Role permission | Rules that decide which menus, buttons, and data scopes are visible. | Settings |

## Read By Role

| Role | Recommended Reading Path | Focus |
| --- | --- | --- |
| Platform operator | Settings -> AI Infra On-Cloud -> AI Infra On-Prem -> Model Services -> Billing | Account permissions, resource access, template configuration, review flows, billing checks |
| Model provider | Model Services -> Billing | My Models, model sources, Playground, call logs, model revenue |
| Model caller | Model Services -> Settings | Model Marketplace, Playground, My Calls, Personal Key |
| Cloud resource user | AI Infra On-Cloud -> Settings | Access accounts, quick deployment, My Deployments, API access |
| Local resource user | AI Infra On-Prem -> Settings | Deployment templates, runtime instances, Online IDE, storage, quotas and usage |
| Billing operator | Billing -> Settings | Today tasks, monthly overview, settlements, financial accounts, inspection center, adjustments |

## Recommended Reading Path

1. Read this page first to identify your role and target module.
2. Read the getting-started page for the module to understand core objects, prerequisites, and common limits.
3. For cross-module tasks, read the end-to-end workflow page before entering feature pages.
4. If you already know the target page, open the feature page and check page description, procedure, parameters, and result validation.
5. If something is abnormal, check the feature page FAQ, notes, events, logs, monitoring, call records, or billing records first.

## Prerequisites

1. Confirm the current account role, tenant, and visible organization scope.
2. Confirm that the target module, resource pool, cloud account, model, billing cycle, or settings object is visible to the current account.
3. Before deployment, authorization, top-up, settlement, adjustment, deletion, publishing, or License activation, confirm the impact scope and rollback path.
4. Screenshots, tickets, and communication materials must not contain passwords, tokens, AK/SK values, private keys, full credentials, customer-sensitive data, or real internal addresses.

## Pitfalls

- Do not choose an entry only by menu name. Confirm your role, target object, and permission scope first.
- For cross-module tasks, start from the end-to-end workflow. Use feature pages for page-level fields and procedures.
- For cost, credential, deployment, deletion, publishing, or authorization operations, confirm impact scope before final confirmation.


## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Entry point identified | You can decide which module owns the target task. | Return to “Find The Right Entry By Goal” and locate the task again. |
| Role path is clear | You can find the recommended reading path for your role. | Return to “Read By Role” and confirm permissions and responsibilities. |
| Next step is clear | You can open the related overview, getting-started, or end-to-end page. | Check the link, sidebar entry, and visible menus under your account. |
| Sensitive data is not exposed | Messages and screenshots do not include passwords, tokens, AK/SK values, customer data, or internal addresses. | Remove exposed content immediately and follow the security process. |

## FAQ

#### Not sure which module to read

**Symptom:**

You want to complete model deployment, model calling, resource access, or billing reconciliation, but you are not sure which module to start from.

**Possible Causes:**

- The task involves resources, models, permissions, and billing at the same time.
- The boundary between the current role and the target operation is unclear.
- Menu names and business goals do not map one-to-one.

**How to Handle:**

1. For model publishing, trial, or calling, start with Model Services.
2. For cloud resource access or cloud model service deployment, start with AI Infra On-Cloud.
3. For local clusters, instances, templates, storage, or quotas, start with AI Infra On-Prem.
4. For balances, transactions, bills, settlements, adjustments, or License, start with Billing.
5. For accounts, projects, keys, members, roles, organizations, or security policies, start with Settings.

#### Page entry is not visible

**Symptom:**

The menu, button, or page mentioned in the documentation is not visible under the current account.

**Possible Causes:**

- The current account role or tenant permissions do not include the feature.
- The target resource, cloud account, model, billing cycle, or organization scope is not open to the current account.
- The prerequisite resources required by the feature have not been configured.

**How to Handle:**

1. Confirm the current account role, tenant, organization, and module entry point.
2. Check resources, authorization, and visibility against the prerequisites on the feature page.
3. When requesting help, provide only desensitized page paths, time ranges, resource IDs, and missing entry descriptions.

#### Operation fails after following the documented steps

**Symptom:**

After you complete the documented steps, the instance, deployment, job, call, billing operation, or settings change still does not meet expectations.

**Possible Causes:**

- Permissions, credits, capacity, specifications, images, storage, model sources, or upstream services do not meet the requirements.
- Cloud account authorization, Personal Key, API Key, request headers, or business configuration has expired.
- Monitoring, metering, billing, or status synchronization is delayed.

**How to Handle:**

1. Return to the feature page and check result validation and notes.
2. Cross-check events, logs, monitoring, call records, billing records, or operation logs.
3. For costs, authorization, deletion, publishing, and billing changes, pause final confirmation and verify the impact scope first.

## Usage Suggestions

- Confirm the role first, then the module, and finally enter the specific feature page.
- For operations involving costs, credentials, deployment, and production resources, validate them in a controlled scope first.
- The example names, paths, and addresses in the documentation are for explanation only. Use the resources visible in the current environment during actual operations.
