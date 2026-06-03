# AGIOne Platform — Role Comparison Overview

admin · operator · provider · enduser (End User) — Role boundaries and core capabilities at a glance

## Role Summary

| Role | Positioning | Mall Metaphor |
|------|-------------|---------------|
| **admin** — System Administrator | Platform-wide System Metadata Governor | Platform Governance (credentials & qualifications) |
| **operator** — Platform Operator | Platform Standards & Review Governor | Mall Operations Team (rules & review) |
| **provider** — Supplier / Vendor | AI Capability Producer & Deployer | Brand / Vendor (stock shelves) |
| **enduser** — End User | AI Capability User | Customer (buy & use) |

---

## admin — System Administrator

**Positioning**: Platform-wide System Metadata Governor

**Typical Identities**: Platform Owner, IT Lead, System Administrator

**Business Domain**: User Space · License

### Core Capabilities

- ✓ Create / freeze tenants
- ✓ Create user accounts
- ✓ Assign / unbind roles
- ✓ Configure menus & permissions
- ✓ Define role permission templates
- ✓ Manage system built-in roles

### Out of Scope

- ✗ Use or try models
- ✗ Publish or review models
- ✗ Deploy compute tasks
- ✗ Handle billing & top-ups

### Key Entry Points

- **User Space → System Administration**: Tenant Management · User Management · Role Management · Menu Management · Built-in Role Management
- **License → License Management**: License issuance · activation · renewal at expiration

### Typical Scenarios

- New customer onboarding → activate tenant + create & assign user accounts
- New feature launch → add menu entry, bind to corresponding roles
- Platform license expires → License Management → renew and reactivate to ensure platform functionality

---

## operator — Platform Operator

**Positioning**: Platform Standards & Review Governor

**Typical Identities**: Operations Manager, Product Operations, BD Operations

**Business Domains**: Model Services · AI Infra · Hetero-XPUs · Trading & Finance

> **Domain Legend**
> - **Model Services**: Model creation · publishing · review · application development
> - **AI Infra**: Cloud platform integration · model deployment · inference
> - **Hetero-XPUs**: Heterogeneous compute · training · datasets · images
> - **Trading & Finance**: Billing operations · accounts · top-ups · agreements

### Core Capabilities

- ✓ Review model / application publishing
- ✓ Manage model taxonomy
- ✓ Integrate cloud providers (Alibaba / Huawei / Tencent / China Telecom)
- ✓ Define compute specs & images
- ✓ Configure inference routing policies
- ✓ Manage vendor admission rules
- ✓ View customer top-up records
- ✓ Publish platform announcements

### Out of Scope

- ✗ Manage tenant & user metadata
- ✗ Directly call or use models
- ✗ Deploy personal compute tasks
- ✗ View other vendors' data

### Key Entry Points

- **Model Services → Operations Management**: Model / Application Review
- **AI Infra → Integration Management**: Cloud Platform Integration / Resource Pool Authorization
- **Hetero-XPUs → Resource Configuration**: Spec Management / Image Management
- **Finance → Operations Management**: Announcement Management / Agreement Management

### Typical Scenarios

- Vendor submits a large model → review against platform standards, approve or reject
- Integrate Huawei Cloud → 5-step onboarding guide, configure AK/SK, connect resource pool
- Slow response at peak hours → adjust inference routing policy (multi-replica load balancing), verify the effect

---

## provider — Supplier / Vendor

**Positioning**: AI Capability Producer & Deployer

**Typical Identities**: AI Developer, Vendor BD, Enterprise IT Lead

**Business Domains**: Model Services · AI Infra · Hetero-XPUs

### Core Capabilities

- ✓ Create / publish models
- ✓ Develop AI applications
- ✓ One-click model deployment
- ✓ Create training / inference tasks
- ✓ Upload datasets
- ✓ Build private images
- ✓ View usage statistics & revenue
- ✓ Manage release state (draft / private / public)

### Out of Scope

- ✗ Review others' models / applications
- ✗ Manage platform-wide configuration (tags / policies / specs)
- ✗ View other providers' data
- ✗ Publish publicly directly (requires review)

### Key Entry Points

- **Model Services → Workspace**: My Models / My Applications
- **AI Infra → Model Services**: Quick Start / My Deployments
- **Hetero-XPUs → Task Center**: Model Training / Model Inference
- **Hetero-XPUs → Studio**: Workspace / My Creations

### Typical Scenarios

- Provide AI API → create model → apply for public release → await operator review → go live
- Deploy image generation model → AI Infra marketplace → one-click deploy → obtain API endpoint for internal system integration
- Train industry model → select dataset + GPU spec + parameters → system auto-schedules

---

## enduser — End User

**Positioning**: AI Capability User

**Typical Identities**: Business Staff, Business User, API Developer

**Business Domains**: Model Services · Finance · AI Infra (personal)

### Core Capabilities

- ✓ Browse model / application marketplace
- ✓ Online trials (Playground)
- ✓ Call APIs (API Key required)
- ✓ Create aggregated model workflows
- ✓ View call logs & analytics
- ✓ Personal account top-up
- ✓ Personal model deployment (authorization required)
- ✓ Bookmark models & applications

### Out of Scope

- ✗ Create and publish models
- ✗ Review others' models / applications
- ✗ Manage platform-wide configuration
- ✗ View others' usage data

### Key Entry Points

- **Model Services → Discover**: Model Marketplace / Application Marketplace
- **Model Services → Trial**: Text / Image / Video / Audio
- **Model Services → My Calls**: Call Analytics / Call Logs
- **Finance → My Finance**: Top-up / Consumption Records

### Typical Scenarios

- Business user writes copy → marketplace → online trial → obtain API Key for workflow integration
- Integrate image recognition → read API documentation → call image model → plug into CRM system
- Chain multiple models → drag-connect in My Aggregated Models → generate combined API
- Balance runs low → My Finance → top up → continue using

---

<style>
table {
  width: 100%;
  table-layout: fixed;
}
table th:first-child,
table td:first-child {
  width: 28%;
  font-weight: 600;
}
</style>
