# AGIOne SaaS Platform Security Overview

:::: info Document Information
Version: v1.0
Updated: 2026-09-08
::::

## 1. Overview

This document describes the primary security controls for AGIOne SaaS deployed in public cloud environments, including data protection, identity authentication, access control, infrastructure security, network isolation, security operations, and business continuity.

In this document, "the platform" refers to the platform management tier (control plane) of AGIOne SaaS and its supporting services. The platform provides enterprises with AI compute resource management, model deployment, model publishing, model inference/calling, metering, billing, and operational governance capabilities.

AGIOne SaaS adopts the "Security by Design" principle, integrating security requirements into platform architecture, data processing workflows, and daily operations. Platform security goals include:

- Protecting platform configurations, tenant information, access credentials, and operational data;
- Restricting unauthorized and cross-boundary access across tenants, businesses, roles, and resource scopes;
- Reducing infrastructure exposure through public cloud Virtual Private Clouds (VPC) and managed cloud services;
- Safeguarding model invocation links while minimizing platform persistence of model invocation payloads;
- Ensuring business continuity through monitoring, auditing, backup, and disaster recovery capabilities.

### 1.1 Control Plane and Compute Node Management Boundaries

The logical deployment of AGIOne is divided into two relatively independent layers:

- **Platform Management Layer (Control Plane)**: Hosts the control plane, business services, databases, and middleware. It serves as the user entry point and handles user and tenant management, access control, resource allocation, task orchestration, model management, publishing, and operational governance.
- **Compute Node Management Layer**: Manages heterogeneous compute nodes such as GPUs and NPUs, hosting compute workloads including training, inference, and online IDEs. Compute resources can originate from on-premises environments or cloud platforms, depending on project network design and resource authorization policies.

The two layers communicate through private internal networks. The platform management layer manages and observes compute clusters via Kubernetes APIs, monitoring interfaces, and extension ports agreed upon during delivery. This boundary decouples platform management capabilities from the model runtime environment, helping contain access scopes and reducing direct exposure of core compute infrastructure.

## 2. Data Security

AGIOne adheres to the principles of data minimization, need-to-use access, and least privilege. The platform primarily processes configuration, metadata, status, and audit records necessary for platform operations; user inputs (prompts) and model outputs (responses) during model invocations are not retained as persistent model data by the platform.

### 2.1 Data Transmission Security

Production ingress for AGIOne SaaS is recommended to use domain names and HTTPS (port 443), with HTTP requests redirected or restricted per project policy. Communication between the platform management layer and databases or middleware occurs over public cloud VPC internal networks, ensuring internal components are not directly exposed to the public Internet.

Security controls include:

- User access and API calls enter the platform through controlled ingress points;
- Core components such as databases, Nacos, Redis, and Kafka utilize internal VPC IP addresses;
- Communication between the platform management layer and compute clusters is restricted to authorized Kubernetes APIs, monitoring interfaces, and port whitelists;
- Cross-VPC or cross-region connections are established via project-approved VPC peering, dedicated leased lines, or equivalent private network solutions;
- Security groups and firewalls follow a "default deny, allow on demand" rule;
- Object storage uses private buckets accessed with least-privilege credentials or temporary STS tokens, with public write access strictly prohibited.

Actual TLS configuration, certificate lifecycles, network equipment policies, and cloud vendor security features depend on the target region, delivery configuration, and project acceptance results.

### 2.2 Data Storage Security

AGIOne public cloud production deployments utilize managed database, cache, service discovery, messaging, and object storage services provided by cloud vendors. The platform management layer typically includes the following components:

| Component | Primary Purpose | Security Boundary |
| --- | --- | --- |
| Relational Database | Stores platform master data, tenant & business configurations, model & deployment metadata | Uses VPC internal addresses; security groups/whitelists allow access only from application nodes |
| Nacos | Service registration, discovery, and configuration management | Uses VPC internal addresses with controlled namespaces and account permissions |
| Redis | Caches platform operational data | Uses VPC internal addresses, passwords, and application node whitelists |
| Kafka | Core service message bus | Uses private bootstrap and advertised brokers; open only to required services |
| Object Storage | Stores static assets such as images | Uses private buckets, internal endpoints, and least-privilege access policies |

The platform may store:

- Tenant, account, member, and role metadata;
- Resource pool, cloud platform, region, compute flavor, and authorization configurations;
- Model catalog, model source, inference framework, runtime image, and cloud deployment endpoint metadata;
- Endpoint status, publication state, visibility scope, rate limiting, and metering configurations;
- Deployment tasks, service health, resource status, and invocation statistics metadata;
- Operation audit logs, login logs, and configuration change records;
- Static resources (e.g., images) necessary for platform display.

**Model Invocation Data Boundary: AGIOne SaaS does not store user prompts or model responses.** Invocation statistics and logs may capture operational metadata such as invocation timestamp, status code, latency, token usage, rate-limiting results, and error categories, but must not persist prompt or response payloads to platform storage. If customers enable payload logging within their own model endpoints, gateways, logging systems, or object storage, such records fall within the customer's or provider's data processing scope and are not part of default AGIOne SaaS platform behavior.

Sensitive configurations, credentials, and cloud account permissions should be managed under the principle of least privilege. Identities used for cloud resource provisioning must be decoupled from AGIOne runtime service identities, and master deployment configurations must not retain elevated AK/SK credentials. Specific key vault management, rotation, and encryption at rest depend on customer cloud accounts, target cloud services, and delivery baselines.

### 2.3 Data Lifecycle Management

The platform manages data creation, utilization, modification, archiving, and deletion based on data classification and operational requirements:

- Retains only metadata required for platform operations, metering, auditing, and troubleshooting;
- Model prompts and responses do not enter the platform's persistent data lifecycle;
- Maintains tenant, member, role, resource, model, and deployment configurations through controlled workflows;
- Executes log, configuration, and backup retention and purging in accordance with platform operational policies and customer agreements;
- Deletion and modification operations are constrained by role permissions and audit logging to prevent unauthorized alterations.

Specific retention periods, backup intervals, and deletion schedules are governed by contracts, terms of service, target regions, and delivery configurations.

## 3. Identity Authentication and Access Control

AGIOne implements Role-Based Access Control (RBAC), combined with boundaries such as tenant, business, project, resource pool, region, model visibility scope, and API keys to regulate access under the principle of least privilege.

### 3.1 User Roles and Permission Management

The platform supports distinct operational and business responsibilities. Actual role naming and permission matrices depend on the current release and tenant setup, with typical duties outlined below:

| Role Scope | Typical Permissions | Constraints |
| --- | --- | --- |
| Platform Operator / Administrator | Manages tenants, members, roles, platform configurations, model review, resources, and operations | Restricted to approved operational boundaries |
| Model Provider / Business Admin | Manages model assets, model publishing, pricing, rate limiting, business authorization, and customer calls | Bound by tenant, business, and model authorization scopes |
| End User / Model Consumer | Discovers, tests, deploys, and calls models within authorized scopes; inspects personal usage and logs | Possesses no platform-level administration privileges |
| Read-Only / Auditor | Inspects resources, models, tasks, invocations, and operational statistics | Cannot perform write, publish, or administrative operations |

Resource authorization can further restrict the cloud platforms, regions, resource pools, and compute specifications accessible to users. Model publishing workflows allow providers to submit models for administrative review before opening access to authorized consumers.

### 3.2 Authentication Security

The platform secures control plane interfaces and model endpoints through account authentication, role authorization, API keys, or version-supported credentials. Security controls include:

- Authenticating user identities and determining visibility scopes based on tenant and role;
- Storing, using, and rotating model invocation credentials according to authorized scope;
- Enforcing controlled change procedures for members, roles, tenants, login policies, and API rate-limiting configs;
- Implementing private network access, whitelists, and least-privilege rules for management consoles and internal services;
- Preventing exposure of plaintext credentials in logs, tickets, or installation scripts.

Specific SSO integrations, multi-factor authentication (MFA), password complexity policies, and credential lifespans depend on the SaaS version, enterprise settings, and delivery plan.

### 3.3 Operation Auditing

The platform provides operation logging and invocation observability to track and record significant activities, including:

- User login and access events;
- Member, role, tenant, and authorization scope changes;
- Model registration, review, publishing, and deprecation;
- Compute resource, deployment task, and platform configuration updates;
- API rate-limiting, metering, billing, and operational policy adjustments;
- Invocation metadata including timestamps, status, latency, token usage, rate limits, and error codes.

Audit logs serve security reviews, anomaly detection, root cause analysis, and accountability tracking. By design, call logs do not store prompt or response content.

## 4. Platform Infrastructure Security

### 4.1 Public Cloud Infrastructure

The platform management layer of AGIOne SaaS is hosted on public clouds, leveraging cloud-native compute, networking, database, caching, messaging, object storage, and security capabilities. Public cloud production deployment is the recommended production architecture in AGIOne deployment documentation.

Baseline requirements for public cloud production architecture include:

- At least two management business nodes with support for horizontal scaling;
- Managed databases, middleware, and object storage configured according to validated cloud service baselines;
- Management nodes and managed middleware residing within the same VPC or interconnected through approved private networking;
- Ingress load balancers independently accepted per project, communicating with management nodes over private networks;
- Configured backup, monitoring, permission control, and maintenance mechanisms for production environments.

Middleware compatibility baselines in current deployment documentation primarily cover validated services and instances on mainstream clouds (such as Alibaba Cloud and Huawei Cloud), and should not be construed as blanket support for all similar services from a provider.

### 4.2 Environment and Tenant Isolation

The platform minimizes mutual interference across environments and tenants through multiple boundaries:

- Production, staging, and development environments are segregated per operational policy;
- Tenants and business units are logically isolated through tenant IDs, roles, business zones, projects, and resource authorizations;
- Compute pools in different regions can be deployed and managed as separate logical units;
- Platform management VPCs and compute VPCs connect via project-approved VPC peering or direct connections, keeping internal services off the public Internet;
- Databases, caches, messaging queues, and service registries are accessible only to required application services.

Isolation efficacy depends on customer cloud accounts, VPCs, subnets, security groups, tenant configurations, and authorization policies, verified upon project acceptance.

### 4.3 Network Security

Recommended network controls include:

- Exposing platform management services solely through accepted load balancers or equivalent gateways;
- Enforcing private network access for management nodes, managed middleware, and object storage;
- Ensuring internal database, middleware, and application ports are not exposed to the public Internet;
- Applying default-deny firewall and security group policies, allowing only necessary ports;
- Limiting connectivity between platform management and compute clusters to Kubernetes API (port 6443), monitoring endpoints, and verified extension ports;
- Disallowing public write access on object storage and restricting credentials to designated buckets or prefixes.

### 4.4 Vulnerability and Patch Management

The platform maintains continuous security maintenance for operating systems, container images, application dependencies, and managed cloud services, including security updates, CVE remediation, version upgrades, and configuration audits. Patch windows, vulnerability severities, emergency response, and change approval workflows adhere to AGIOne SaaS operational policies, cloud provider shared responsibility models, and customer contracts.

## 5. Security Operations and Monitoring

### 5.1 System Monitoring

The platform provides observability across the following targets:

- Platform service availability and business service health;
- Database, middleware, and message bus operating metrics;
- Compute cluster, node, accelerator card, job, and model deployment states;
- Model invocation metrics: request volume, success rates, failures, rate-limiting counts, latency, time to first token (TTFT), and token consumption;
- System logs, application logs, cloud platform audit events, and exception alerts.

Specific metrics, collection agents, scrape intervals, and display scopes depend on accelerator hardware, monitoring configuration, role permissions, and product release.

### 5.2 Logging and Security Event Management

The platform logs user access, logins, administrative operations, configuration updates, resource allocations, deployment workflows, and invocation metadata for security analysis, anomaly detection, and troubleshooting. Log queries are governed by role and tenant permissions; sensitive credentials are masked, and prompt/response bodies are not retained as default logs.

### 5.3 Backup and Disaster Recovery

The platform establishes backup and disaster recovery mechanisms for critical platform data, including platform settings, tenant and permission metadata, model and deployment metadata, billing and metering records, and essential operational state. In the event of node, service, or cloud provider failures, redundant systems and backups restore platform availability.

Model invocation prompts and responses are not backed up by AGIOne SaaS. Model weights, training data, and customer-configured content logs located within customer-managed compute, model endpoints, or storage environments must be backed up, retained, and recovered according to the customer's own policies.

## 6. Security Assurance Statement

AGIOne SaaS protects platform and business operations through the following controls:

- Public cloud VPC and internal private routing;
- Access control across managed databases, caches, messaging systems, registries, and object storage;
- Multi-tier tenant, role, business zone, resource, and model authorization;
- HTTPS / API gateway protection and credential lifecycle management;
- Private storage buckets with least-privilege AK/SK or temporary STS credentials;
- Operational audit trails, invocation metadata telemetry, and anomaly investigation;
- Data backup, disaster recovery, and environment isolation.

This document summarizes security controls based on current product capabilities and deployment baselines; it does not constitute a regional compliance certification or an implied commitment to unlisted configurations. Actual security levels are determined collectively by the SaaS release, deployment region, cloud vendor services, tenant configuration, customer model endpoints, and project acceptance verification.

## 7. Data Flow Security Architecture

### 7.1 Control Flow

The control flow governs:

- User, tenant, member, and role administration;
- Permissions, business zones, and resource authorizations;
- Cloud platforms, cloud accounts, regions, resource pools, and compute flavors;
- Model assets, deployment templates, publication reviews, and endpoint lifecycle;
- Task orchestration, metering, billing, rate limiting, and operational governance;
- Service health, resource monitoring, invocation statistics, and operational audit logging.

### 7.2 Model Invocation and Compute Data Flow

Data flows are processed by model services and compute execution environments. The typical flow is as follows:

1. An authorized user or client issues a model inference request through an approved endpoint;
2. The request travels through controlled network routes and authentication mechanisms to reach the target model service or inference runtime;
3. The model service processes the request and returns the response;
4. AGIOne logs essential invocation status and operational metadata for metering, rate limiting, observability, and auditing;
5. AGIOne SaaS does not persist user prompts or model responses.

The platform management layer is responsible for control and observability without acting as a centralized data repository for model payloads. Model files, inference runtimes, and actual compute workloads are hosted on the cloud side or customer-designated compute environments.
