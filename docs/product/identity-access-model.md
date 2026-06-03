# AGIOne Platform — User, Tenant, and Role Design Logic

## 1. Core Relationship

In AGIOne, **the tenant defines the organizational boundary, users belong to tenants, roles define user capabilities, and menus plus permissions determine what users can see and operate**.

| Object | Meaning | Key Rule |
| --- | --- | --- |
| Tenant | An organization, customer, or business boundary | One tenant can contain multiple users |
| User | A personal account used to sign in to the platform | A user belongs to a tenant through `tenantId` |
| Role | A set of capabilities and permissions | A user can be assigned one or more roles |
| Menu / Permission | Page entries, buttons, and API permissions | After a role is assigned, the user can see the corresponding menus and perform the corresponding operations |

After sign-in, the system loads menus and permissions according to the roles assigned to the user. The user can only see authorized menu entries. Buttons and APIs are also controlled by permission codes.

## 2. Tenant Design

| Tenant Type | Identification Rule | Default Roles | Capability Boundary |
| --- | --- | --- | --- |
| Super tenant / operator tenant | `tenantId = "1"` | `admin`, `operator` | Manages the platform, tenants, roles, menus, and cross-domain operations |
| Normal tenant | Any other `tenantId` | `provider`, `enduser` | Uses platform capabilities, provides models or resources, and calls model services |

Key points:

- `operator` is not an independent tenant. It is an operations user under the super tenant.
- `provider` and `enduser` both belong to normal tenants. They are not distinguished by tenant type, but by assigned roles.
- The same normal tenant can contain both provider users and enduser users.
- Customer-facing documents should consistently use `enduser` instead of the internal shorthand `eu`.

## 3. Default Role Overview

| Role | Tenant | Core Positioning | Main Capabilities |
| --- | --- | --- | --- |
| `admin` | Super tenant | Platform super administrator | Manages tenants, base roles, menus, permissions, and platform metadata |
| `operator` | Super tenant | Platform operations administrator | Handles model review and governance, cloud resource access, compute resource operations, and finance operations |
| `provider` | Normal tenant | Model or compute provider and deployment user | Creates models, connects BYOK resources, deploys models, manages call statistics, and uses compute resources |
| `enduser` | Normal tenant | End user | Browses models, tries model capabilities, calls models, views usage, and manages personal call records |

## 4. admin Capabilities

| Dimension | Description |
| --- | --- |
| Role positioning | Platform super administrator |
| Main objects | Tenants, users, base roles, menus, and permission metadata |
| Typical operations | Create and manage tenants, maintain roles, configure menus, and maintain permission metadata |
| Menu scope | User Space account-domain capabilities, such as tenant, role, and menu management |
| Permission boundary | Does not handle daily business operations for models, compute resources, or finance |
| Customer interpretation | The overall platform administrator, usually held by the deployment owner or the highest platform management team |

## 5. operator Capabilities

| Dimension | Description |
| --- | --- |
| Role positioning | Platform operations administrator |
| Model Services | Manages meta models, model sources, templates, tags, and currency settings; reviews models and applications; manages application lists |
| Cross-Platforms / AI Infra-On Cloud | Connects cloud platforms, authorizes cloud platforms, manages access accounts, resource pools, resource pool authorization, model libraries, model categories, inference frameworks, and runtime images |
| Heterogeneous-XPUs | Manages resource pools, clusters, nodes, storage, images, specifications, quotas, credits, approvals, monitoring, and statistics |
| Trading / Finance | Manages announcements, agreements, platform customer accounts, and top-up orders from the operations side |
| Permission boundary | Manages platform supply and governance, but is not a normal business user consuming model capabilities |
| Customer interpretation | Suitable for platform operations or infrastructure teams that provide and govern models, compute resources, and platform resources |

## 6. provider Capabilities

| Dimension | Description |
| --- | --- |
| Role positioning | Supply-side role that also includes deployment and resource usage capabilities |
| Model Services | Creates and manages owned models; supports AGIOne managed deployment, third-party BYOK access, multi-model aggregation, customer call overview, call logs, and call statistics |
| Cross-Platforms / AI Infra-On Cloud | Connects personal cloud accounts; uses Model Services quick start; browses the model gallery; manages personal deployments |
| Heterogeneous-XPUs | Creates development environments, training jobs, inference jobs; manages instances, storage, images, datasets, and creative workspace resources |
| Permission boundary | Should not have platform-level tenant management, global menu governance, or global resource governance permissions |
| Customer interpretation | Suitable for teams or users responsible for model access, model publishing, cloud account access, compute deployment, and resource maintenance |

## 7. enduser Capabilities

| Dimension | Description |
| --- | --- |
| Role positioning | End user |
| Model Services | Browses the model marketplace; uses text, image, audio, and video playgrounds; views personal calls, call logs, call statistics, usage and revenue; uses private models or aggregated models |
| Finance / Deck | Handles consumer-side finance capabilities such as top-up and credit deduction |
| Permission boundary | Should not have model review, cloud resource access management, platform-level menus, or tenant governance permissions |
| Customer interpretation | Suitable for business users who only need to use, try, and call model capabilities |

## 8. Custom Roles and Menu Permissions

AGIOne supports custom roles as needed. The actual control logic is:

```text
Create a role
  -> Bind menus, buttons, and API permissions to the role
  -> Assign the role to users
  -> Users can only see and operate authorized content after sign-in
```

| Configuration Action | Object | Effect |
| --- | --- | --- |
| Create a role | `sys_role` | Defines a group of business capabilities; `type=2` means tenant custom role |
| Configure menu permissions | `sys_role_menu` + `sys_menu` | Determines which menus, buttons, and API permissions the role can access |
| Assign users | `sys_user_role` | Determines which role capabilities a user receives |
| Menu control | `sys_menu.menuType=0` | Controls left-side navigation entries and page access |
| Button control | `sys_menu.menuType=1` + `permission` | Controls buttons such as add, edit, delete, import, and export |
| API control | `@HasPermission` + `sys_menu.permission` | Controls whether backend APIs can be called |

Customer-facing explanation:

> The platform does not enable menus user by user. It authorizes by role. A user can only see and operate the menus and permissions assigned to the user's roles.

## 9. Enterprise Private Deployment Example

If one enterprise deploys AGIOne and provides access to users from another enterprise or external organization, the relationship can be understood as follows:

| Participant | Recommended Role | Capability Boundary |
| --- | --- | --- |
| Platform administrator of the deploying enterprise | `admin` | Manages tenants, roles, menus, and platform base permissions |
| Operations or infrastructure team of the deploying enterprise | `operator` | Manages model review, resource access, compute supply, and finance operations |
| Model or technical team of the served enterprise | `provider` or a provider-derived role | Connects models, connects cloud accounts, deploys models, and views call statistics |
| Business users of the served enterprise | `enduser` or an enduser-derived role | Calls models, tries model capabilities, and views personal calls and usage |

Platform-level governance permissions should remain with the deploying enterprise. The capabilities granted to the served enterprise should be controlled through tenants, roles, and menu permissions.
