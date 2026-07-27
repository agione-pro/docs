---
prev: false
next: true
---

# Scenario Overview - On-Prem Model Deployment and Status Check

This scenario shows how to create a model instance from an inference template and determine success from the instance, workload, node, and device views. For four NPU cards, it verifies that the deployment actually receives the requested card count.

## Applicable Roles

- Model Provider
- Platform User
- Operator assisting with troubleshooting

## Goals

- Create a model instance from an NPU template.
- Interpret creating, running, queued, failed, and stopped states.
- Verify the allocated NPU count.

## Scenario Flow

**Main path:** Select a template and plan → Create the model instance → Check scheduling and runtime → Verify the service call

| Stage | Key Result |
| --- | --- |
| 1. Select configuration | Template, card count, quota, storage, and instance parameters meet the task |
| 2. Create the instance | The request appears in Model Instances and remains traceable |
| 3. Check status | Scheduling, image, events, logs, and actual NPU allocation are healthy |
| 4. Verify the service | Health checks pass and the endpoint completes one controlled call |

## Before You Start

- A valid template and sufficient tenant quota are available.
- The cluster has enough free NPU cards.
- The model files, image, and startup parameters are ready.

## Recommended Reading Order

1. [On-Prem Inference Template Building](../on-prem-inference-template/)
2. [Deploy and Check a Model](./deploy-and-check/)
3. [On-Prem Resource Metering and Monitoring](../on-prem-resource-metering-monitoring/)

## Document Index

| Document | Description |
| --- | --- |
| [Deploy and Check a Model](./deploy-and-check/) | Create an instance and verify state, workload events, and NPU allocation |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | The model instance is running. |
| 2 | The workload uses the card count selected by the template. |
| 3 | Health checks and the service endpoint work. |