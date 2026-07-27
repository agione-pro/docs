---
prev: false
next: true
---

# Scenario Overview - On-Cloud Scheduling Policies

This scenario helps operators configure preferred resource pools, capacity thresholds, and failure fallback after cloud resources, tenants, and business regions are authorized, so subsequent model deployments select resources within explicit cost, capacity, and compliance boundaries.

## Applicable Roles

- Platform Operators, multi-cloud resource administrators, and deployment-policy administrators

## Scenario Goals

- Give each scheduling policy a clear scope, priority, and preferred resource pool.
- Ensure fallback resource pools are authorized and have usable capacity.
- Assess latency, cost, and compliance impact for cross-region or cross-cloud fallback.
- Make a test deployment select the expected resource pool or return a clear failure reason.

## Scenario Flow

**Main path:** Check access and authorization -> Design preference and fallback -> Save and enable policy -> Run test deployment -> Review scheduling events and capacity

| Stage | Key Result |
| --- | --- |
| 1. Check foundation | Cloud accounts, resource pools, and authorization are complete |
| 2. Design policy | Scope, priority, threshold, and fallback are clear |
| 3. Validate scheduling | Test deployment selects the expected pool or fails clearly |
| 4. Govern continuously | Capacity, cost, latency, and authorization changes are reviewed |

## Before You Start

- Complete [On-Cloud Resource Access](../on-cloud-resource-access/).
- Authorize preferred and fallback pools for the tenant and business region.
- Define capacity threshold, SLA, cost, and data-compliance boundaries.
- Prepare a low-risk test deployment and validation window.

## Recommended Reading Order

1. Review Access Overview, resource pools, and authorization.
2. Design policy scope, priority, and fallback conditions.
3. Save and enable the policy, then run a test deployment.
4. Review the selected resource pool, deployment events, and fallback result.

## Document Index

| Document | Description |
| --- | --- |
| [Configure and Validate an On-Cloud Scheduling Policy](./scheduling-policy-workflow) | Steps from access checks through policy, test deployment, and result review |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. They confirm that the policy affected a real scheduling result, rather than merely saving a configuration record.

| Check | Pass Criteria |
| --- | --- |
| 1 | Policy tenant, business-region, and resource-pool scope are correct. |
| 2 | Preferred and fallback pools are authorized, enabled, and have capacity. |
| 3 | Priority, capacity threshold, and constraints meet SLA, cost, and compliance requirements. |
| 4 | The test deployment selects the expected pool; fallback or failure matches the policy. |
| 5 | An owner is assigned for later capacity and policy reviews. |
