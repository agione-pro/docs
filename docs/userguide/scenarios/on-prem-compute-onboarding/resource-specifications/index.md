# Configure Metrics and Resource Specifications

## Target Outcome

Users can request clear one-card, two-card, and four-card NPU plans, each mapped to the correct scheduler resource key.

## Applicable Roles

- Platform Operator

## Before You Start

- Confirm the accelerator entry and the resource key reported by the cluster device plug-in.
- Decide which card combinations are supported and how CPU and memory scale with NPU count.

## Entry

- **Role:** Operator
- **Menu:** On-Prem > Resource Pools > Resource Specs
- **Routes:** `/powerone/resourcepool/flavor/list`

## Steps

1. In the **Flavor Group Navigation** (Specification Metrics) panel on the left of the **Resource Specs** page, verify or create the NPU metric, ensuring that its k8s-key matches the device-plugin resource key and adding selector keys when scheduling must target a model or node group.

![Add specification metric](../../../../usermanual/ai-infra-on-prem/operator/resource-pools/resource-specs/images/add-specification-metric.png)

2. In the specification list on the right, click the create button to configure one-card, two-card, and four-card plans.
3. Configure CPU, memory, NPU count, and storage requirements, then associate each plan with the target cluster.

![Verify resource specifications](../../../../usermanual/ai-infra-on-prem/operator/resource-pools/resource-specs/images/manual-resource-specs.png)

4. Validate the one-card plan with a test workload before testing the two-card and four-card plans.

5. Before exposing a specification to users, confirm that its enabled state, associated cluster, region/availability-zone scope, and tenant quota allow the intended downstream template or workload to select it.

## Recommended Four-Card Plan

| Flavor | NPU Count | Typical Use |
| --- | ---: | --- |
| `npu-1` | 1 | Functional checks and small-model inference |
| `npu-2` | 2 | Two-card parallel inference |
| `npu-4` | 4 | A workload that exclusively uses all cards |

Do not assume that a single pod can request all four cards when they are distributed across nodes.

## Completion Checklist

> **Purpose:** These are the exit criteria for the current feature task. Use them to decide whether the result is observable and reviewable and whether you can continue to the next step in the scenario. They do not repeat the procedure; if any item fails, follow the troubleshooting section below.

| Check | Pass Criteria |
| --- | --- |
| 1 | All three flavors are selectable. |
| 2 | Resource keys match node reporting. |
| 3 | One-card validation passes before two-card and four-card validation. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| A specification is not selectable | Status, tenant quota, cluster association, and region availability |
| A workload remains pending | Resource key, requested card count, free capacity, and node labels |
| A specification is visible in the list but unavailable downstream | Enabled state, cluster association, region/zone scope, tenant quota, and stale page data |

## User Manual

- [Resource Specifications](/usermanual/ai-infra-on-prem/operator/resource-pools/resource-specs/)
