# AI Infra On-Prem

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Subsystem Positioning

AI Infra On-Prem is designed for local or private computing resources. It helps operators manage regions, availability zones, clusters, nodes, storage, images, templates, quotas, and monitoring, and helps regular users create instances and jobs and view usage.

#### Beginner Explanation

On-Prem is like an owned computing campus: operators plan the campus, connect machines, and define rules, while regular users request resources, run models, and view status in the opened areas.

## Core Terms Quick Reference

| Term | Description |
| --- | --- |
| Region / Availability Zone | A hierarchy that divides resources by physical location or logical isolation. |
| Cluster | A Kubernetes cluster that carries compute, storage, and scheduling capabilities. |
| Node | A server in a cluster that actually runs instances or jobs. |
| Resource Specification | The CPU, memory, and GPU/NPU combination selected when a user creates an instance or job. |
| Template | A deployable plan that combines a model, framework, image, startup parameters, and VRAM rules. |
| Quota / Usage | Controls available resource limits and records actual consumption. |

## Role Entrypoints

| Role | Recommended Entrypoint | Typical Tasks |
| --- | --- | --- |
| Operator | [Resource Pools](./operator/resource-pools/regions-zones/), [Templates](./operator/templates/inference-templates/), [Quota Metering](./operator/quotas-metering/metering-details/) | Connect clusters, maintain specifications, open templates, monitor capacity, and adjust quotas. |
| Regular User | [Templates](./user/model-deployment/templates/), [Extension Services](./user/extensions/images/), [Quotas and Usage](./user/quotas-usage/quotas/) | Select templates or images to create instances, view resource status, and troubleshoot runtime issues. |

## Where Should I Start

| Your Goal | Start Here | Next Step |
| --- | --- | --- |
| Understand On-Prem as a new user | [Getting Started](./getting-started/) | Understand resource hierarchy, role boundaries, and reading paths first. |
| Prepare resources as an operator | [Regions / Availability Zones](./operator/resource-pools/regions-zones/) | Continue with clusters, specifications, images, storage, templates, quota metering, and monitoring. |
| Use resources as a regular user | [User Overview](./user/overview/) | Continue with deployment templates, model instances, Online IDE, runtime instances, storage, quotas, and usage. |
| Troubleshoot resource or runtime issues | [Monitoring Overview](./operator/monitoring/overview/) | Check instance status, events, logs, quotas, images, storage, and cluster status together. |
| Handle account and permission issues | [Configure Accounts and Permissions](../settings/end-to-end/configure-account-and-permissions/) | Account, role, key, and permission configuration belongs to Settings, not to On-Prem routes. |

## Recommended Reading Path

1. New users should first read [AI Infra On-Prem Getting Started](./getting-started/) to understand resource hierarchy, role boundaries, and reading paths.
2. Operators should prepare resources in the order of region, cluster, specification, template, and quota.
3. Regular users should create model services in the order of template, image, storage, instance, and monitoring.
4. For the complete workflow, read [Deploy a Model Service from Scratch](./end-to-end/deploy-model-service/).

## Prerequisites

1. You have confirmed whether the current account is an operator or a regular user.
2. You have selected the target region, availability zone, or resource pool.
3. Before creating instances, you have confirmed specifications, images, storage, quotas, and cluster capability.
4. For troubleshooting, prepare a sanitized time range, resource ID, error message, and log summary.

## Parameter Reference

| Parameter | Checkpoint | Impact |
| --- | --- | --- |
| Region / Availability Zone | Confirm the target resource boundary before creating or troubleshooting resources. | Affects visible clusters, storage components, templates, quotas, and monitoring scope. |
| Cluster | Confirm cluster status, node visibility, and associated specifications. | Determines whether instances and jobs can be scheduled. |
| Specification | Confirm CPU, memory, accelerator, VRAM, and storage requirements. | Determines whether users can select a resource package and whether capacity is sufficient. |
| Image / Storage | Confirm image repository access, object storage buckets, block storage, or file storage mounts. | Affects startup, data loading, output retention, and troubleshooting. |
| Quota / Credit | Confirm tenant quota and credit before creation. | Blocks instance creation when limits are insufficient. |

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Operator resources are visible | Regions, clusters, specifications, images, storage, templates, quotas, and monitoring pages show the target objects. | Check region binding, cluster access, component status, and operator permissions. |
| User creation entry is available | The user can select an opened template, image, specification, storage path, and quota. | Check tenant authorization, template scope, quota, and resource visibility. |
| Runtime status can be located | Instance status, events, logs, usage, and monitoring are available after submission. | Check image pull, startup command, mount path, cluster scheduling, and monitoring delay. |

## Pitfalls

- Do not expose kubeconfig, registry credentials, storage keys, internal addresses, or customer data in screenshots or tickets.
- If a user cannot see a resource, check region, tenant authorization, quota, template binding, and filters before treating it as a platform failure.
- If creation stays queued, check capacity, specification association, image pull, storage mount, and cluster events together.
- Account, role, key, and permission configuration belongs to Settings. On-Prem overview only provides navigation and troubleshooting direction and does not record real accounts or credentials.

## FAQ

#### User Side Cannot See Resources

**Symptom:**

After a regular user enters the creation page or monitoring page, the target region, specification, image, or cluster data is not visible.

**Possible Causes:**

- The operator has not opened the resource visibility scope.
- The region, specification, image, or template has not been associated.
- The current account lacks the required permissions.

**Solution:**

1. Confirm the current region and account role.
2. Check specifications, templates, images, and quotas against the prerequisites.
3. Contact the operator to verify the resource opening scope and account permissions.

#### Instance Creation Fails

**Symptom:**

After a user submits an instance, job, or model service, the task is queued, fails, or cannot start.

**Possible Causes:**

- Quota is insufficient, cluster capacity is insufficient, or the specification cannot be scheduled.
- Image pull, startup command, environment variables, or storage mount is abnormal.
- Template parameters do not match the model capability.

**Solution:**

1. View instance events, logs, and user-side monitoring.
2. Verify the image address, startup command, storage path, and resource specification.
3. If the issue still cannot be located, provide the sanitized resource ID and failure time to the operator.

## Next Steps

1. Operators should continuously maintain resource pools, templates, quotas, and monitoring.
2. Regular users should view usage, logs, and monitoring promptly after creating resources.
3. Before publishing, periodically check documentation screenshots, example commands, and sensitive information sanitization.

## Notes

- This overview explains module-level navigation. Use feature pages for exact fields, buttons, and validation details.
- For deletion, disablement, quota adjustment, or storage unbinding, confirm the impact scope and rollback path first.
- Quick deployment, create, delete, disable, unbind, credit adjustment, or resource change actions are high-risk. For learning or screenshots only, view entrypoints, fields, and status.
- For production incidents, collect sanitized page paths, resource IDs, time ranges, events, and logs before escalation. Do not expose real accounts, tokens, AK/SK, API keys, tenants, resource IDs, cluster IDs, node IPs, endpoints, registry credentials, storage keys, or sensitive log fragments.
