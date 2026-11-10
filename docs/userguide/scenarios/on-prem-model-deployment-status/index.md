---
prev: false
next: true
---

# Scenario Overview - On-Prem Model Deployment and Status Check

This scenario shows how to create a model instance from an inference template and determine success from the instance, workload, node, and device views. Verify that the deployment receives the card count actually requested, rather than inferring allocation from a template name.

A resource specification describes the planned resource request. Check instance and task information for the actual allocation; a template or instance name is not an allocation result.

**Example scope:** The linked guides retain a four-NPU example. Use the actual hardware inventory, compatibility, and approved workload to determine model, count, and resource tiers; four cards or all one-/two-/four-card plans are not prerequisites for every environment.

## Applicable Roles

- Model Provider
- End User
- Operator assisting with troubleshooting


**Role handoff:** Model Providers and End Users manage only instances within their permissions. For cluster or device problems, hand the instance identifier, region, occurrence time, and relevant events to the Platform Operator without sharing real secrets or complete sensitive requests.

## Goals

- Create a model instance from an NPU template.
- Interpret creating, running, failed, and stopped states shown by the instance and task views.
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

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | The model instance is running. |
| 2 | The workload uses the card count in the resource specification selected at deployment time. |
| 3 | Health checks and the service endpoint work. |