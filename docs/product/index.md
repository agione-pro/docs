# Product Overview

:::: info Document Information
Version: v1.0
Updated: 2026-07-13
Functional baseline: User Manual updated on 2026-07-10
::::

## Understand AGIOne in 30 Seconds

AGIOne connects the work required to deliver model services into one path:

**Compute resources -> Model deployment and publishing -> Model experience and API calling -> Usage, finance, settings, and governance operations**

| Stage | What AGIOne Manages | Main Subsystem |
| --- | --- | --- |
| Compute | Local clusters, cloud accounts, resource pools, storage, specifications, quotas, and monitoring | AI Infra On-Prem / AI Infra On-Cloud |
| Model | Deployment assets, model sources, templates, model publishing, and review | AI Infra On-Prem / AI Infra On-Cloud / Model Services |
| Service | Model Marketplace, Playground, API access, call records, and deployment status | Model Services |
| Operations | Authorization, metering, usage, monitoring, customer calls, model revenue, finance, License, settings, audit, and API rate control | All product modules |

## Five Product Modules

| Product Module | Use It When You Need To | Main Objects |
| --- | --- | --- |
| **AI Infra On-Prem** | Manage private or local compute and deploy services on local clusters | Regions, availability zones, clusters, nodes, accelerators, storage, templates, quotas, monitoring |
| **AI Infra On-Cloud** | Connect cloud accounts, authorize cloud resources, and deploy cloud model services | Cloud platforms, cloud accounts, resource pools, authorization, deployment assets, scheduling policies |
| **Model Services** | Publish, review, discover, experience, call, and operate models | Model Marketplace, My Models, Playground, call logs, usage, customer calls, revenue |
| **Billing** | Manage user billing, customer finance, settlement, reconciliation, revenue, and License status | Transactions, monthly bills, top-up orders, settlement statements, financial accounts, reconciliation, License |
| **Settings** | Manage identity, organization, audit, login policy, platform configuration, and API rate control | Keys, profiles, members, roles, organizations, operation logs, login properties, API rate-control rules |

These modules can be used independently for a focused task or together as an end-to-end model service delivery and operations workflow.

## Roles and Responsibilities

| Role | Main Responsibility | Typical Starting Point |
| --- | --- | --- |
| **Administrator (`admin`)** | Manage tenants, users, role assignments, and platform-level access boundaries | [Identity and Access Model](./identity-access-model) |
| **Operator (`operator`)** | Prepare resources and templates, configure governance rules, maintain quotas and monitoring, and review published content | [Role Comparison](./role-comparison) |
| **Model Provider (`provider`)** | Publish single or aggregate models, maintain versions and pricing, submit reviews, and view customer calls and revenue | [Model Services Getting Started](../usermanual/model-services/getting-started/) |
| **End User (`enduser`)** | Discover and experience models, obtain access, call APIs, deploy available services, and view personal usage | [User Manual](../usermanual/) |

The menus visible to an account depend on its role, tenant, authorization scope, and available resources.

## Choose the Right Document

| Your Question | Recommended Entry |
| --- | --- |
| What does AGIOne provide, and where are its boundaries? | [Technical Overview](./technical/overview) -> [Features and Capabilities](./technical/features) -> [Support Matrix](./limitations/support-matrix) |
| How do I complete a real task? | [Scenario Guide](../userguide/scenarios) |
| What does a page or field mean, and how do I operate it? | [User Manual](../usermanual/) |
| How do I prepare or install the platform? | [Installation Guide](../installation/) and [Network Planning](./technical/network) |
| Is a chip, cloud platform, or model capability supported? | [Supported Accelerators](./limitations/chips) and [Support Matrix](./limitations/support-matrix) |
| How should I collect requirements before a PoC or delivery? | [Quick Requirement Survey](./investigation/quick-requirement-investigation) and [Quick Environment Survey](./investigation/quick-env-investigation) |

## How to Read Support Status

| Status | Meaning |
| --- | --- |
| **Supported** | Documented product capability is available, subject to account permission and required resources. |
| **Conditionally supported** | Available only for specified versions, configurations, deployment modes, or project validation results. |
| **Planned** | Included in the product roadmap but not available as a current production capability. |
| **Temporarily unsupported** | Do not plan delivery around this capability in the current version. |

Current status that requires special attention:

- **Huawei Cloud access: temporarily unsupported.** Huawei Ascend accelerator onboarding is a separate On-Prem compatibility topic; it does not mean that Huawei Cloud access is supported.
- **RAG: planned.**
- **Function Calling: planned.**

For all other capabilities, use the [Support Matrix](./limitations/support-matrix) as the product-level status entry and verify project-specific prerequisites before delivery.

## Recommended Reading Order for Beginners

1. Read the [Technical Overview](./technical/overview) to understand the product workflow and subsystem boundaries.
2. Read [Roles and Access](./identity-access-model) to identify which tasks your account can perform.
3. Select a task from the [Scenario Guide](../userguide/scenarios).
4. Open the linked [User Manual](../usermanual/) page for detailed fields, prerequisites, result checks, and troubleshooting.
5. Before a PoC or deployment, confirm the [Support Matrix](./limitations/support-matrix), [Other Limitations](./limitations/limitations), and [Installation Guide](../installation/).
