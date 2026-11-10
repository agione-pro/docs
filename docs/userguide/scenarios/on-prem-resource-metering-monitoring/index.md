---
prev: false
next: true
---

# Scenario Overview - On-Prem Resource Metering and Monitoring

This scenario explains how to grant NPU quota and inspect device, node, and workload usage. Check usage against the target device inventory and approved limits, then use individual instance records to investigate abnormalities.

Resource limits cap resource quantities. Specification quota is the available usage time in hours for a specification. Credits are platform accounting units, not a physical card count.

**Example scope:** The linked guides retain a four-NPU example. Use the actual hardware inventory, compatibility, and approved workload to determine model, count, and resource tiers; four cards or all one-/two-/four-card plans are not prerequisites for every environment.

## Applicable Roles

- Platform Operator
- Provider and End User viewing their own usage


**Role handoff:** The Platform Operator maintains usage limits and reviews operator-level monitoring. Model Providers and users check their own quota, usage, and instance records. For operator assistance, provide the region, resource or task identifier, time, and billing cycle so monitoring and metering scopes can be aligned.

## Goals

- Grant an appropriate NPU quota to the tenant.
- Check target accelerator recognition and monitoring data against the actual hardware inventory.
- Correlate an abnormal card with its node and workload.

## Scenario Flow

**Main path:** Configure tenant quota → Run workloads → Correlate devices, nodes, and jobs → Reconcile metering and adjust

| Stage | Key Result |
| --- | --- |
| 1. Configure quota | The tenant receives an NPU limit that matches the plan |
| 2. Run workloads | Jobs request and occupy resources using the specifications actually required |
| 3. Correlate monitoring | Align region, cluster, and object; use a common period where filters exist and record observation times for current snapshots |
| 4. Reconcile and adjust | Keep quota limits, actual allocation, and billing-cycle metering distinct, with traceable explanations for differences |

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

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | Tenant quota supports the intended workload. |
| 2 | Target device recognition and available monitoring data have been checked against the hardware inventory. |
| 3 | Workload usage, node capacity, and device utilization agree. |
| 4 | Tenant credits, monthly usage, and metering details reconcile for the same billing cycle. |
