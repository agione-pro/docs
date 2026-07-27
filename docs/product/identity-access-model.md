# Identity and Access Model

:::: info Document Information
Version: v1.0
Updated: 2026-07-13
::::

## One-Sentence Summary

In AGIOne, access is not determined by the account alone. It is jointly determined by **organization, user, member, project, role, and authorization scope**.

## Core Relationship

```text
Organization
  -> Defines the business entity and data boundary
User
  -> Identifies the person signing in to the platform
Member
  -> Represents the user's collaboration identity and status inside an organization or team
Project
  -> Carries budget, member collaboration, API Keys, invocation usage, and activity records
Role
  -> Defines responsibilities and visible menus
Authorization scope
  -> Determines the final visible resources, data records, and allowed operations
```

In short: **organization defines the boundary, user signs in, member defines collaboration relationship, project carries the business workspace, role defines responsibility, and authorization scope decides what can be seen or operated.**

## Core Objects

| Object | Beginner-friendly Meaning | What It Affects | User Manual Reference |
| --- | --- | --- | --- |
| Organization | A business entity or customer space in the platform, replacing the earlier tenant concept | Data boundary, administrator, roles, tags, business ownership, and organization-visible scope | [Organizations](../usermanual/settings/operator/tenants/tenants/) |
| User | A personal account that can sign in to the platform | Login identity, personal operation records, personal Keys, and personal settings | [Settings](../usermanual/settings/) |
| Member | The collaboration identity created when a user joins an organization, team, or project | Member status, collaboration, role assignment, project visibility, and operation permissions | [Team Members](../usermanual/settings/operator/members-roles/members/) |
| Project | A business workspace for model invocation and collaboration | Project budget, member scope, API Keys, usage, activity, model allowlist, and settings | [Projects](../usermanual/settings/user/personal/projects/) |
| Role | A responsibility and permission set, such as operator, provider, or regular user | Menus, buttons, task ownership, and allowed operations | [Role Comparison](./role-comparison) |
| Authorization scope | Resources, records, and actions opened to an organization, member, project, or account | Visible regions, resource pools, cloud accounts, models, templates, billing records, License, audit logs, and API rate-control rules | [User Manual](../usermanual/) |

## How Access Is Decided

```text
Sign in
  -> Identify the user
  -> Confirm the organization
  -> Confirm member status
  -> Load role permissions
  -> Apply project scope
  -> Apply resource and data authorization
  -> Display permitted menus, buttons, and data
```

Having a menu does not mean that every resource is visible. Seeing a resource does not mean that every action is allowed. When a documented menu or object is not visible, check organization, member, project, role, and authorization scope before treating it as a product fault.

## Organization, Member, and Project Boundaries

### Organization

- An organization is the business entity or customer boundary in the platform.
- An organization can contain multiple users and members.
- An organization can have administrators, roles, tags, status, and business identity.
- Cross-organization access must be explicitly governed. Users should not assume that resources or data from another organization are visible.

### Member

- A member is the collaboration identity created when a user joins an organization, team, or project.
- Member status affects whether the user can sign in, collaborate, view projects, or perform operations.
- Member should usually be evaluated together with role: the same user may have different responsibilities in different organizations or projects.
- Member changes can affect project collaboration, invocation permission, quota requests, audit records, and team settings.

### Project

- A project is a business workspace for organization-side or provider-side invocation.
- A project usually connects members, budget, API Keys, model allowlists, invocation usage, activity records, and settings.
- Project Key availability depends not only on Key status, but also on project status, budget, member scope, and model allowlist.
- When a project is missing, first confirm whether the current user is a project member, then check organization, role, and project status.

## Default Role Model

| Role | Main Responsibility | Typical Scope |
| --- | --- | --- |
| `admin` | Manage platform identity and access foundations | Organizations, users, members, roles, menus, and platform-level permission configuration |
| `operator` | Prepare and govern platform resources, published content, finance operations, and settings | Resource onboarding, templates, authorization, quotas, monitoring, base settings, reviews, customer finance, License, audit, and API rate control |
| `provider` | Supply and operate model services | Publish single or aggregate models, maintain versions and pricing, submit reviews, view customer calls and revenue, and manage authorized team, project, and Key settings |
| `enduser` | Consume authorized platform capabilities | Discover and experience models, call APIs, deploy available services, and view personal calls, projects, usage, billing, or settings |

The exact menus available to a role can vary with the deployed version and platform configuration. Use the current environment as the final source for visible entries.

## Role and Authorization Are Different

| Situation | Check First | Then Check |
| --- | --- | --- |
| A menu is missing | Whether the account has the role responsible for the task | Whether the menu is enabled for the role in this deployment |
| A region, cluster, or resource pool is missing | Whether the role can use the relevant subsystem | Whether organization, business-region, or resource-pool authorization is configured |
| A model is missing from Model Marketplace | Whether the account is an end user or another permitted consumer | Model review status, visibility, and access scope |
| A provider cannot publish | Whether the account has the `provider` role | Model sources, templates, tags, and organization permissions |
| A project is missing | Whether the account is a project member | Project status, organization scope, member scope, and role permissions |
| A Project Key is unavailable | Whether the Key is enabled and the account can use the project | Project budget, model allowlist, project status, and Key limit |
| A billing or License record is missing | Whether the account has the required billing, finance, provider, or user-side role | Billing cycle, organization, customer, account, License scope, and synchronization status |
| A settings or API rate-control entry is missing | Whether the account can manage settings or audit tasks | Organization scope, member status, role-menu configuration, and rule visibility |
| An operation button is missing | Whether the current role owns the task | Button permission, resource state, and operation risk control |

## Recommended Responsibility Split

| Participant | Recommended Role | Responsibility Boundary |
| --- | --- | --- |
| Deployment owner | `admin` | Maintains organizations, users, members, roles, and platform access foundations |
| Platform operations, finance, security, or infrastructure team | `operator` | Prepares resources, maintains governance configuration, reviews content, manages customer finance or License, maintains settings, and monitors platform operations |
| Model or technical team | `provider` | Publishes and maintains models, submits reviews, operates provider-side calls and revenue, and maintains authorized team, project, and Key settings |
| Business user or application developer | `enduser` | Experiences and calls authorized models and views personal usage, projects, billing, or settings |

Avoid assigning `admin` or broad `operator` permissions only to make a missing menu visible. Adjust the role, project scope, or resource authorization to the minimum scope required by the task.

## Troubleshooting Access

1. Confirm the current subsystem and target task.
2. Confirm the signed-in user and organization.
3. Confirm the user's member status in the target organization, team, or project.
4. Confirm whether the current role owns the task.
5. Confirm whether the target project is visible, enabled, and includes the current account as a project member.
6. Confirm that the target region, resource pool, cluster, cloud account, model, template, billing record, License, setting, audit log, or rate-control rule has been authorized.
7. Confirm that the prerequisite resource has been prepared by the operator.
8. If the entry is still missing, record the page path, expected entry, account role, organization, project, member status, and time of observation for the platform administrator.

::: details Implementation Notes for Maintainers
Some deployments use a designated platform organization for `admin` and `operator`, with ordinary organizations carrying `provider` and `enduser`. Member, project, role-menu, user-role, button, and API permission mappings may be stored in implementation objects, with backend permission checks applied to APIs. These names are implementation details and should not be used as the primary customer explanation or assumed to be stable public interfaces.
:::

## Related Documentation

- [Role Comparison](./role-comparison)
- [Features and Capabilities](./technical/features)
- [User Manual: Settings](../usermanual/settings/)
- [Organizations](../usermanual/settings/operator/tenants/tenants/)
- [Team Members](../usermanual/settings/operator/members-roles/members/)
- [Projects](../usermanual/settings/user/personal/projects/)
- [Scenario Guide](../userguide/scenarios)
- [User Manual](../usermanual/)
