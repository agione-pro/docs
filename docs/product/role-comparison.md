# Role Comparison

:::: info Document Information
Version: v1.0
Updated: 2026-07-15
::::

## Role Summary

| Role | Positioning | Responsible For | Not Responsible For |
| --- | --- | --- | --- |
| `admin` | Platform administrator | Tenant, user, role, menu, and platform access foundations | Daily compute operations, model publishing, or model consumption |
| `operator` | Platform operator | Resource preparation, governance configuration, quotas, monitoring, reviews, customer finance, License, settings, audit, and API rate control | Publishing a provider-owned model or consuming models as an end user |
| `provider` | Model provider | Publishing and maintaining models, aggregate models, reviews, customer calls, provider revenue, and permitted team settings | Platform-wide identity governance, finance operations, or reviewing its own publication |
| `enduser` | General user and model consumer | Deploying available services, discovering and experiencing models, API calls, personal usage, personal billing, personal settings, and authorized team members, projects, quotas, and Key usage | Publishing or reviewing models and managing platform-wide resources |

## Capability Comparison

| Capability | `admin` | `operator` | `provider` | `enduser` |
| --- | --- | --- | --- | --- |
| Manage tenants, users, and role assignments | Primary | No | No | No |
| Prepare On-Prem resource pools and templates | No | Primary | Use authorized resources | Use authorized resources |
| Connect and authorize supported cloud resources | No | Primary | Use assigned access accounts or resources | Use assigned access accounts or resources |
| Maintain Model Services base settings | No | Primary | Use prepared settings | No |
| Maintain Billing and License operations | No | Primary for platform/customer finance | View owned revenue and settlements | View own billing |
| Maintain Settings, audit, and API rate control | Platform access foundations | Primary for platform settings | Own team or personal scope when authorized | Own personal or team scope when authorized |
| Publish a single or BYOK model | No | Govern and review | Primary | No |
| Create an aggregate model | No | Govern and review | Primary | No |
| Review models and apps | No | Primary | Submit for review | No |
| Discover models and use Playground | No | Validation when needed | Validation when needed | Primary |
| Call model APIs | No | Validation when needed | Validate owned services | Primary |
| View customer calls and model revenue | No | Platform scope when authorized | Primary for owned models | No |
| View personal calls, usage, and billing | No | Operational scope when authorized | Own scope | Own scope |
| Manage user-side team members | No | Platform policy or audit scope | Authorized organization or project scope | Authorized organization or project scope |
| View or adjust member quotas | No | Platform policy or audit scope | Authorized organization or project scope | Authorized organization or project scope |
| Submit or handle quota requests | No | Platform policy or approval scope | Authorized organization or project scope | Own or authorized team scope |
| Manage projects and Project Key usage scope | No | Platform policy or audit scope | Authorized project scope | Authorized project scope |

“Primary” indicates normal task ownership. Actual visibility depends on tenant, role configuration, resource authorization, and the installed version.

## User-Side Collaboration and Resource Scope

Team members and projects are not added as separate platform roles. They are collaboration objects and resource boundaries inside a user-side organization or project, usually maintained by an authorized `enduser` or `provider` account within its own organization, team, or project scope.

| Object | Positioning | Main Impact | Typical Handling Role |
| --- | --- | --- | --- |
| Team member | The collaboration identity created when a user joins an organization, team, or project | Login status, collaboration relationship, role assignment, member quota, quota requests, and audit records | Authorized `enduser` or `provider` |
| Project | Business workspace for model calls, budget, and collaboration | Project members, Project Keys, project budget, model allowlist, usage, and activity records | Authorized `enduser` or `provider` |
| Member quota | Management object that controls member quota and limits | Personal Key quota, call-failure diagnosis, quota adjustment, and quota requests | Authorized `enduser` or `provider` |
| Project Key | Access credential for calling models within a project scope | Calling identity, project budget, model availability, and Key limits | Authorized `enduser` or `provider` |

When users see “Team Members,” “Projects,” “Member Quotas,” or “Project Keys,” first confirm whether the account is authorized in the corresponding organization or project instead of directly adding `admin` or `operator` permissions. For the full object relationship, see [Identity and Access Model](./identity-access-model).

## `admin`: Platform Administrator

**Typical users:** deployment owner, platform administrator, or authorized IT administrator.

Main responsibilities:

- Maintain tenants, users, roles, and platform access configuration.
- Assign roles and keep platform-level permissions within the authorized administration team.
- Help diagnose missing menus or permission boundaries after business ownership has been confirmed.

Boundary:

- `admin` is not the default role for resource operations, model publishing, review, or model consumption.
- Do not assign broad administration permissions merely to bypass a missing business permission.

## `operator`: Platform Operator

**Typical users:** platform operations, infrastructure, model governance, or delivery team.

Main responsibilities by subsystem:

| Subsystem | Responsibilities | Manual Entry |
| --- | --- | --- |
| AI Infra On-Prem | Prepare resource topology, specifications, storage, images, templates, quotas, metering, and monitoring | [On-Prem Getting Started](../usermanual/ai-infra-on-prem/getting-started/) |
| AI Infra On-Cloud | Maintain supported cloud access, accounts, resource pools, authorization, deployment assets, and scheduling policies | [On-Cloud Getting Started](../usermanual/ai-infra-on-cloud/getting-started/) |
| Model Services | Maintain meta-models, model sources, templates, tags, and currency settings; process model and app reviews | [Model Services Getting Started](../usermanual/model-services/getting-started/) |
| Billing | Maintain customer finance, operation finance, reconciliation, settlement, adjustment, and License status | [Billing Getting Started](../usermanual/billing/getting-started/) |
| Settings | Maintain members, roles, organizations, operation logs, platform settings, login properties, and API rate-control rules | [Settings Getting Started](../usermanual/settings/getting-started/) |

Boundary:

- The operator prepares supply and governance conditions but does not replace the provider that owns a model publication.
- Huawei Cloud access is temporarily unsupported and must not be used as an operator onboarding scenario.

## `provider`: Model Provider

**Typical users:** model team, AI developer, model service provider, or technical team responsible for publishing.

Main responsibilities:

- Publish and maintain single models or BYOK endpoints.
- Create aggregate models from eligible member models and select an available routing strategy.
- Configure provider-owned publication information, submit reviews, and respond to review results.
- View model usage, model revenue, and customer-call data for the permitted scope.
- View provider-side earnings, customer lists, and settlement records within the permitted scope.
- Manage personal Keys, profile, team members, roles, quotas, or organization settings only when those entries are authorized to the provider account.
- Use authorized On-Prem or On-Cloud resources when a deployment workflow requires them.

Boundary:

- A provider cannot approve its own model or app publication.
- A provider does not manage platform-wide tenants, menus, resource policies, or another provider's data.

See [Publish and Call a Model](../usermanual/model-services/end-to-end/publish-and-call-model/).

## `enduser`: General User and Model Consumer

**Typical users:** business user, application developer, API consumer, or a user deploying from prepared resources.

Main responsibilities:

- Browse visible models and inspect model details.
- Experience supported model interactions in Playground.
- Obtain required access and call model APIs.
- View personal-call overview, analytics, logs, usage, and deployment status.
- View personal billing, transactions, top-up orders, monthly bills, and personal settings when available.
- Manage user-side team members, projects, member quotas, quota requests, and Project Key usage scope within the authorized scope.
- Create On-Prem or On-Cloud workloads from resources and templates already authorized to the account.

Boundary:

- An end user does not publish single or aggregate models. Aggregate-model creation belongs to the model provider.
- An end user does not process reviews or maintain platform-wide resource and identity configuration.
- User-side team member and project permissions apply only within the corresponding organization or project scope. They do not replace platform-level member, menu, system setting, or operations approval permissions.

See the [User Manual](../usermanual/) and [Scenario Guide](../userguide/scenarios).

## Which Role Should Perform the Task?

| Task | Recommended Role |
| --- | --- |
| Create a tenant or assign a role | `admin` |
| Onboard a local cluster or configure quotas | `operator` |
| Connect and authorize a supported cloud resource pool | `operator` |
| Maintain meta-models or review a model | `operator` |
| Reconcile a billing cycle or maintain customer finance | `operator` |
| Maintain members, roles, login settings, or API rate-control rules | `operator` or authorized administrator |
| Publish a model or create an aggregate model | `provider` |
| View customer calls and provider revenue | `provider` |
| Try a model or call its API | `enduser` |
| View personal usage, billing, or a personal deployment | `enduser` |
| Manage user-side team members | Authorized `enduser` or `provider` |
| View or adjust member quotas | Authorized `enduser` or `provider` |
| Submit or handle quota requests | Authorized `enduser` or `provider`; platform policy is maintained by `operator` |
| Manage project members and Project Keys | Authorized `enduser` or `provider` |

If one person performs multiple responsibilities in a small deployment, assign multiple roles only after confirming the required boundary. Keep platform administration and review permissions limited and auditable.

## Related Documentation

- [Identity and Access Model](./identity-access-model)
- [Team Members](../usermanual/settings/user/members-roles/team-members/)
- [Member Quotas](../usermanual/settings/user/members-roles/member-quotas/)
- [Quota Requests](../usermanual/settings/user/members-roles/quota-requests/)
- [Projects](../usermanual/settings/user/personal/projects/)
- [Features and Capabilities](./technical/features)
- [Scenario Guide](../userguide/scenarios)
- [User Manual](../usermanual/)
