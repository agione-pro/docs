---
prev: false
next: true
---

# Scenario Overview - On-Prem Compute Onboarding

This scenario explains how to connect a local Kubernetes cluster and its GPU, NPU, or XPU devices to AGIOne, then expose the hardware through schedulable resource specifications. For the task “How do I manage four NPU cards?”, this scenario covers device identity, cluster onboarding, and flavor planning.

## Applicable Roles

- Platform Operator
- Cluster administrator

## Scenario Goals

- AGIOne recognizes the target NPU model and resource key.
- Cluster nodes report all four NPU cards.
- Users can select one-card, two-card, and four-card resource specifications.

## Scenario Flow

**Main path:** Create the region and availability zone → Identify the NPU model → Onboard the cluster and discover devices → Create one-, two-, and four-card plans → Verify downstream selection

| Stage | Key Result |
| --- | --- |
| 1. Establish the resource boundary | The region and availability zone are available to the target cluster |
| 2. Identify the model | NPU model, per-card memory, and scheduler resource key use one definition |
| 3. Onboard the cluster | Cluster and nodes are available and all four physical NPU cards are discovered |
| 4. Create plans | One-, two-, and four-card specifications match the real scheduling topology |
| 5. Verify downstream use | An inference template or test workload can select and request the plan |

## Before You Start

- Prepare the Kubernetes connection information, region, and availability zone.
- Confirm the NPU vendor, model, memory, and device-plugin resource key.
- Confirm whether the four cards are on one node or distributed across nodes.

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
| [Onboard the Cluster and Verify Devices](./cluster-onboarding/) | Register the cluster and verify that all four NPU cards are reported |
| [Configure Metrics and Resource Specifications](./resource-specifications/) | Create scheduling metrics and one-card, two-card, and four-card flavors |
| [Deploy a Model Service from Scratch](../../../usermanual/ai-infra-on-prem/end-to-end/deploy-model-service/) | Follow the complete On-Prem path from operator preparation through user deployment and validation |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | The region and availability zone exist and are selectable during cluster registration. |
| 2 | The cluster and nodes are available. |
| 3 | AGIOne reports four target NPU cards. |
| 4 | Inference templates or test workloads can select the new resource specifications. |

## Related Scenarios

- [On-Prem Inference Template Building](../on-prem-inference-template/)
- [On-Prem Model Deployment and Status Checks](../on-prem-model-deployment-status/)
- [On-Prem Resource Metering and Monitoring](../on-prem-resource-metering-monitoring/)
