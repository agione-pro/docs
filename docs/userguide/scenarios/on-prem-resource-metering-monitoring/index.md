---
prev: false
next: true
---

# Scenario Overview - On-Prem Resource Metering and Monitoring

This scenario explains how to grant NPU quota and inspect device, node, and workload usage. For four NPU cards, it answers who may use how many cards, which workload occupies each card, and whether any device is unhealthy.

## Applicable Roles

- Platform Operator
- Provider and End User viewing their own usage

## Goals

- Grant an appropriate NPU quota to the tenant.
- Show all four cards in device monitoring.
- Correlate an abnormal card with its node and workload.

## Scenario Flow

**Main path:** Configure tenant quota → Run workloads → Correlate devices, nodes, and jobs → Reconcile metering and adjust

| Stage | Key Result |
| --- | --- |
| 1. Configure quota | The tenant receives an NPU limit that matches the plan |
| 2. Run workloads | One-, two-, or four-card jobs request and occupy resources by specification |
| 3. Correlate monitoring | Devices, nodes, and jobs map to each other over one time range |
| 4. Reconcile and adjust | Quota, allocation, utilization, and metering details agree and can be optimized |

## Before You Start

- NPU onboarding and monitoring collection are complete.
- The tenant allocation policy is defined.
- A test workload is available.

## Recommended Reading Order

1. [Configure Tenant NPU Quota](./tenant-quotas/)
2. [Monitor Devices, Nodes, and Workloads](./resource-monitoring/)
3. [Reconcile Monthly Metering and Details](./metering-reconciliation/)
4. [Deploy and Check a Model](../on-prem-model-deployment-status/)

## Document Index

| Document | Description |
| --- | --- |
| [Configure Tenant NPU Quota](./tenant-quotas/) | Grant the tenant an allowed NPU count |
| [Monitor Devices, Nodes, and Workloads](./resource-monitoring/) | Verify health and usage from device, node, and workload views |
| [Reconcile Monthly Metering and Details](./metering-reconciliation/) | Map tenant credits, monthly usage, and metering details to actual workloads |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | Tenant quota supports the intended workload. |
| 2 | Device monitoring shows all four cards. |
| 3 | Workload usage, node capacity, and device utilization agree. |
| 4 | Tenant credits, monthly usage, and metering details reconcile for the same billing cycle. |
