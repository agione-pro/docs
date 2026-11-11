---
prev: false
next: true
---

# Scenario Overview - On-Prem Compute Onboarding

This scenario explains how to connect a local Kubernetes cluster and its GPU, NPU, or XPU devices to {{DOCS_PRODUCT_NAME_EN}}, then expose the hardware through schedulable resource specifications. This scenario covers device identity, cluster onboarding, and the required resource plans.

Kubernetes is a container orchestration platform. GPU means graphics processing unit, NPU means neural processing unit, and XPU here is a generic label for heterogeneous AI accelerators. A resource key is the name used in node reporting and workload requests for a resource type.

**Example scope:** The linked guides retain a four-NPU example. Use the actual hardware inventory, compatibility, and approved workload to determine model, count, and resource tiers; four cards or all one-/two-/four-card plans are not prerequisites for every environment.

## Applicable Roles

- Platform Operator
- Cluster administrator


**Role handoff:** The cluster administrator supplies controlled connection material and the hardware inventory. The Platform Operator configures region, accelerator, and specification associations. An authorized deployment user then checks selectable plans and actual allocation. Handoff records identify cluster, region, accelerator models, and specifications, not real connection credentials.

## Scenario Goals

- {{DOCS_PRODUCT_NAME_EN}} recognizes the target NPU model and resource key.
- Cluster nodes report all target accelerators expected in the hardware inventory.
- Users can select the planned specifications that fit actual capacity.

## Scenario Flow

**Main path:** Create the region and availability zone → Identify the NPU model → Onboard the cluster and discover devices → Create the required resource tiers → Verify downstream selection

| Stage | Key Result |
| --- | --- |
| 1. Establish the resource boundary | The region and availability zone are available to the target cluster |
| 2. Identify the model | NPU model, per-card memory, and scheduler resource key use one definition |
| 3. Onboard the cluster | Cluster and nodes are available and all target devices in the hardware inventory are discovered |
| 4. Create plans | Required specifications match the real scheduling topology |
| 5. Verify downstream use | An inference template or test workload can select and request the plan |

## Before You Start

- Prepare the Kubernetes connection information, region, and availability zone.
- Confirm the NPU vendor, model, memory, and device-plugin resource key.
- Confirm the target cards’ node distribution and whether the framework and workload support the planned deployment topology.

## Recommended Reading Order

1. [Create Regions and Availability Zones](./regions-zones/)
2. [Maintain Accelerator Models](./accelerator-management/)
3. [Onboard the Cluster and Verify Devices](./cluster-onboarding/)
4. [Configure Metrics and Resource Specifications](./resource-specifications/)
5. [Build an Inference Template](../on-prem-inference-template/)
6. [Configure Quotas and Monitoring](../on-prem-resource-metering-monitoring/)

## Document Index

| Document | Description |
| --- | --- |
| [Create Regions and Availability Zones](./regions-zones/) | Establish the shared resource boundary for clusters, specifications, images, and storage |
| [Maintain Accelerator Models](./accelerator-management/) | Verify the NPU model, memory, managed state, and Kubernetes resource key |
| [Onboard the Cluster and Verify Devices](./cluster-onboarding/) | Register the cluster and verify device reporting against the hardware inventory |
| [Configure Metrics and Resource Specifications](./resource-specifications/) | Create scheduling metrics and resource tiers required by the workload |
| [Regions & Zones](../../../usermanual/ai-infra-on-prem/operator/resource-pools/regions-zones/) | Start with the first operator page for On-Prem resource onboarding |

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | The region and availability zone exist and are selectable during cluster registration. |
| 2 | The cluster and nodes are available. |
| 3 | {{DOCS_PRODUCT_NAME_EN}} reports the target device count expected in the hardware inventory. |
| 4 | Inference templates or test workloads can select the new resource specifications. |

## Related Scenarios

- [On-Prem Inference Template Building](../on-prem-inference-template/)
- [On-Prem Model Deployment and Status Checks](../on-prem-model-deployment-status/)
- [On-Prem Resource Metering and Monitoring](../on-prem-resource-metering-monitoring/)
