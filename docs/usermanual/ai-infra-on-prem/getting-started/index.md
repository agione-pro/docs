# AI Infra On-Prem Getting Started

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## 30-Second Quick Reference

| Who Am I | What to Read First | Next Step |
| --- | --- | --- |
| First time using On-Prem | Understand the hierarchy of regions, availability zones, clusters, nodes, and resource pools first. | Read [Deploy a Model Service from Scratch](../end-to-end/deploy-model-service/). |
| Operator | Complete region / availability zone setup and cluster access first. | Continue configuring specifications, images, storage, templates, quotas, and monitoring. |
| Regular User | Confirm available regions, quotas, images, and storage first. | Create deployment templates, online IDEs, or runtime instances. |
| Troubleshooter | First locate whether the issue is about permissions, quotas, images, storage, specifications, or clusters. | View instance logs, events, resource usage, and monitoring. |

## Feature Overview

`AI Infra On-Prem` is AGIOne's access, scheduling, metering, and usage capability for localized heterogeneous computing resource pools. It connects regions, availability zones, clusters, nodes, specifications, images, storage, templates, quotas, and monitoring into a complete chain: operators first connect and govern resources, and regular users then create model services, online IDEs, runtime instances, and storage resources based on the opened capabilities.

This document is an understanding-oriented getting-started page, not a concrete operation page. It explains On-Prem resource hierarchy, role boundaries, and reading paths. Real create, delete, start, stop, disable, unbind, credit adjustment, or resource change actions should be performed only in the corresponding feature pages and according to their risk notes.

| Item | Content |
| --- | --- |
| Applicable Role | Operator, regular user |
| Recommended Entrypoint | This document, [Heterogeneous Accelerator Management Overview](../), [Deploy a Model Service from Scratch](../end-to-end/deploy-model-service/) |
| Key Objects | Regions, availability zones, clusters, nodes, resource specifications, image services, storage components, templates, quotas, monitoring |
| Typical Use | Build an On-Prem resource understanding framework, clarify the operation boundary between operators and users, and choose the correct reading path |

#### Beginner Explanation

AI Infra On-Prem is like the user guide for a self-built computing campus: first learn regions, availability zones, clusters, nodes, and resource pools, then read along the path of operator resource preparation and user resource consumption.

## Applicable Roles

| Role | Reading Focus | Recommended Entrypoint |
| --- | --- | --- |
| Operator | Connect regions, availability zones, clusters, specifications, images, storage, templates, and quotas. | [Regions / Availability Zones](../operator/resource-pools/regions-zones/), [Cluster Management](../operator/resource-pools/clusters/), [Templates](../operator/templates/models/) |
| Regular User | Create model services, online IDEs, runtime instances, storage, and image projects. | [User Overview](../user/overview/), [Templates](../user/model-deployment/templates/), [Runtime Instances](../user/dev-resources/runtime-instances/) |
| Troubleshooter | Check permissions, quotas, images, storage, specifications, clusters, logs, and monitoring. | [Monitoring Overview](../user/monitoring/overview/), [Resource Usage](../user/quotas-usage/usage/) |

## What Are AGIOne and On-Prem

AGIOne is an integrated platform for model services, computing resources, and operational governance. On-Prem refers to localized deployment or local resource pool management scenarios. The platform does not directly replace underlying components such as Kubernetes, Harbor, MinIO, Ceph, or NFS. Instead, it incorporates these capabilities into unified resource pool, template, quota, and monitoring views.

In an On-Prem scenario, the platform is responsible for:

1. Recording resource boundaries, such as regions, availability zones, and clusters.
2. Maintaining schedulable capabilities, such as nodes, accelerators, resource specifications, and storage mounts.
3. Managing job entrypoints, such as deployment templates, model instances, online IDEs, and runtime instances.
4. Metering user usage and providing resource monitoring and troubleshooting entrypoints.

## Role Relationships

| Role | Main Responsibilities | Common Sections |
| --- | --- | --- |
| Operator | Connect regions, availability zones, clusters, specifications, images, and storage components; maintain templates, quotas, metering, and monitoring. | [Regions / Availability Zones](../operator/resource-pools/regions-zones/), [Cluster Management](../operator/resource-pools/clusters/), [Templates](../operator/templates/models/) |
| Regular User | Use resources opened by operators to create model services, online IDEs, runtime instances, object storage, and image projects, and view quotas, usage, and monitoring. | [User Overview](../user/overview/), [Templates](../user/model-deployment/templates/), [Runtime Instances](../user/dev-resources/runtime-instances/) |

Operators decide "which resources are available." Regular users decide "how to use the opened resources for business." If the user side cannot see a resource, troubleshooting usually starts from region, permissions, quotas, templates, specifications, and cluster status.

## Cross-System Boundary

| Issue Type | Target Subsystem | Description |
| --- | --- | --- |
| Accounts, roles, permissions, keys, organization members | [Settings](../../settings/end-to-end/configure-account-and-permissions/) | Account and permission configuration does not belong to On-Prem. Do not create a same-name route under On-Prem. |
| Invisible resources, unavailable specifications, queued instances | AI Infra On-Prem | Troubleshoot with regions, availability zones, clusters, templates, quotas, images, storage, and monitoring pages. |
| Model publishing, review, listing, or calling | [Model Services](../../model-services/) | Model business lifecycle content is not handled in On-Prem resource getting-started content. |

## Resource Hierarchy

| Layer | Description | Impact Scope |
| --- | --- | --- |
| Region | The largest resource boundary, usually corresponding to a city, equipment room, resource pool, or tenant boundary. | Affects user-visible resources, component binding, and scheduling scope. |
| Availability Zone | A resource group under a region, usually corresponding to an equipment room area, network domain, or cluster group. | Affects cluster ownership and fault isolation. |
| Cluster | A Kubernetes cluster managed by the platform. | Determines whether jobs have schedulable nodes. |
| Node | A server in the cluster that actually provides CPU, memory, disk, and accelerator resources. | Determines runtime capacity and hardware capability. |
| Resource Pool | A schedulable capability set composed of regions, availability zones, clusters, specifications, images, and storage. | Determines which instances users can create and whether instances can run normally. |
| Job / Instance | A model service, online IDE, runtime instance, or training task created by a user. | Consumes quota and credits, and generates monitoring and metering data. |

The recommended configuration order is: create regions first, then create availability zones, register clusters, associate specifications, images, and storage, and finally open templates and quotas to users.

## User-Side and Operator-Side Function Boundaries

| Capability | Operator | Regular User |
| --- | --- | --- |
| Region / Availability Zone | Create, edit, enable, disable, and bind components. | Select opened regions and view results related to their own resources. |
| Cluster / Node | Register clusters, view nodes, and associate specifications and storage. | Perceive resource runtime results through instance status, logs, and monitoring. |
| Image | Connect image components and maintain base images and image resources. | Create image projects, push custom images, and select images to run instances. |
| Storage | Connect object storage, block storage, and file storage components. | Create buckets or use opened storage capabilities to save data. |
| Template | Configure models, frameworks, inference templates, and VRAM estimation rules. | Use deployment templates to create model instances. |
| Quota / Metering | Set tenant quotas, credits, and metering rules. | View resource quotas, usage, and top-up records. |
| Monitoring | View resource pool, cluster, node, device, and job monitoring. | View authorized user-side monitoring and instance runtime status. |

## Global Core Terms

| Term | Description |
| --- | --- |
| Kubernetes | A container orchestration system and the foundation of On-Prem cluster access and job scheduling. |
| kubeconfig | A Kubernetes connection configuration file that contains API Server, certificate, and authentication information. It is sensitive material. |
| Harbor / Registry | A container image repository used to store and distribute job images. |
| MinIO / S3 | Common object storage implementations or protocols used for bucket and object read/write. |
| Ceph / RBD | Common block storage solutions. RBD provides block device capability. |
| NFS | Network File System, commonly used for shared directory mounts. |
| Resource Specification | A resource package that includes CPU, memory, accelerators, VRAM, and other resources. |
| VRAM Estimation | Estimates VRAM usage based on factors such as model, precision, KV Token, and concurrency. |
| KV Token | Tokens related to Key/Value Cache during inference, which affect VRAM usage. |
| Dynamic Expression | Used to dynamically calculate recommended specifications, VRAM, or form display conditions based on parameters. |
| Quota | The upper limit of resources that a tenant or user can request. |
| Credit | A billing or consumption control value corresponding to resource usage. |

## Prerequisites

1. You have confirmed whether the current account role is operator or regular user.
2. You have confirmed that the target resource is in a local cluster or private resource pool.
3. Before creating instances, you have confirmed the region, specification, image, storage, and quota.

## Parameter Reference

| Parameter | Meaning | Check Before Use |
| --- | --- | --- |
| Region / Availability Zone | Logical or physical resource boundary. | Confirm the target region is enabled and bound to required clusters and components. |
| Cluster / Node | Kubernetes compute and scheduling carrier. | Confirm cluster status, node status, accelerator resources, and monitoring data. |
| Specification | User-selectable CPU, memory, accelerator, and VRAM package. | Confirm the specification is associated with the target cluster and opened to users. |
| Image / Storage | Runtime image and data persistence resources. | Confirm repository access, bucket or mount path, and credential handling. |
| Quota / Credit | Tenant-side creation and consumption limits. | Confirm remaining quota and credit before creating instances or jobs. |

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Resource hierarchy is clear | You can map region, availability zone, cluster, node, resource pool, and instance relationships. | Re-read Resource Hierarchy and Role Relationship before entering feature pages. |
| Operator preparation is complete | Regions, clusters, specifications, images, storage, templates, quotas, and monitoring have target records. | Continue with the operator reading path and check missing bindings. |
| User creation path is available | User-side template, image, storage, quota, usage, and monitoring entries are visible. | Check permissions, tenant scope, resource opening, and filters. |

## Pitfalls

- Do not use user-side invisibility alone as proof of missing resources; check authorization, tenant scope, filters, and resource binding first.
- Do not paste kubeconfig, registry credentials, storage keys, or internal endpoints into screenshots or tickets.
- For capacity issues, check quota, specification association, node resources, and job events together.
- Getting Started is only for understanding entrypoints, role boundaries, and resource relationships. Do not perform real create, delete, disable, unbind, credit adjustment, or resource change actions.
- Account, role, key, and permission configuration belongs to Settings. Do not record real accounts, tokens, AK/SK, API keys, tenants, resource IDs, cluster IDs, node IPs, endpoints, or test parameters in On-Prem getting-started content.

## Understanding Checklist

- You can clearly explain the hierarchy of regions, availability zones, clusters, nodes, and resource pools.
- You can distinguish operator resource preparation from regular user resource usage.
- You know to check quotas, specifications, images, storage, and monitoring first when instance creation fails.

## Recommended Reading Path

#### Operators

1. Read this document to confirm role boundaries and resource hierarchy.
2. Complete [Regions / Availability Zones](../operator/resource-pools/regions-zones/).
3. Complete [Cluster Management](../operator/resource-pools/clusters/).
4. Connect image, object storage, block storage, and file storage components.
5. Configure resource specifications, models, frameworks, inference templates, and VRAM estimation.
6. Configure tenant quotas and credits.
7. Use monitoring pages to verify resource pool, node, device, and job status.

#### Regular Users

1. Read [User Overview](../user/overview/) to confirm the current entrypoint.
2. Use [Templates](../user/model-deployment/templates/) or [Model Instances](../user/model-deployment/instances/) to create inference services.
3. Use [Online IDE](../user/dev-resources/online-ide/) or [Runtime Instances](../user/dev-resources/runtime-instances/) to run development, training, or batch processing tasks.
4. Use [Object Storage](../user/storage/object-storage/) and [Image Services](../user/extensions/images/) to retain data and environments.
5. View [Resource Quotas](../user/quotas-usage/quotas/) and [Resource Usage](../user/quotas-usage/usage/).
6. Use monitoring, logs, and events to locate runtime issues.

## FAQ

#### User Side Cannot See a Resource

**Symptom:**

When a user creates an instance, selects an image, selects a specification, or views monitoring, the target resource does not appear in the list.

**Possible Causes:**

- The operator has not connected or enabled the corresponding resource in the target region.
- The resource has been connected, but it has not been bound to the region, availability zone, cluster, or tenant selected by the user.
- The current account lacks menu, resource, or tenant authorization.
- User-side filters limit the list scope.

**Solution:**

1. Confirm the region, availability zone, and filters selected by the user.
2. Ask the operator to check the binding relationships among regions, clusters, specifications, images, storage, and templates.
3. Check tenant quotas, credits, and account permissions.
4. If the resource was just adjusted, refresh the page or re-enter the creation flow.

#### Instance Remains Queued for a Long Time After Creation

**Symptom:**

A model instance, online IDE, or runtime instance does not enter the running state after submission.

**Possible Causes:**

- The target specification has insufficient resources.
- Tenant quota or credit is insufficient.
- Image pull, storage mount, or cluster scheduling is abnormal.
- The target cluster is under maintenance, unavailable, or in a monitoring data delay state.

**Solution:**

1. View the instance status, events, and logs first.
2. Check resource quotas and usage.
3. Try a smaller specification or another available region.
4. Contact the operator to check cluster nodes, specification associations, image services, and storage mounts.

## Next Steps

1. Operators should continue with regions, clusters, specifications, storage, images, templates, quotas, and monitoring pages.
2. Regular users should continue with user overview, deployment templates, runtime instances, object storage, image services, quotas, and usage.
3. Troubleshooters should keep events, logs, monitoring, quota, image, storage, and cluster status in the same investigation path.

## Notes

- This document is a platform-level getting started guide and does not replace field-level descriptions on each feature page.
- For operations involving deletion, disablement, offline changes, credit adjustment, or resource unbinding, confirm the impact scope, maintenance window, and rollback plan first.
- Before taking screenshots, check whether the page exposes internal addresses, credentials, keys, certificates, or a complete kubeconfig.
- For learning or screenshots only, view entrypoints, fields, status, and navigation without submitting real create, delete, start, stop, disable, unbind, credit adjustment, or resource change actions.
- If the issue is about accounts, roles, permissions, keys, or organization members, go to Settings. If the issue is about invisible resources, unavailable specifications, or queued instances, go to On-Prem resource, quota, and monitoring pages.
