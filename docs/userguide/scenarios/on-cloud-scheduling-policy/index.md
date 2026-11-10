---
prev: false
next: true
---

# Scenario Overview - On-Cloud Scheduling Policies

This scenario helps operators configure associated models, primary/backup routes, and health probes after cloud resources, tenants, and business regions are authorized, so subsequent model deployments select resources within explicit cost, capacity, and compliance boundaries.

The primary route is the preferred service node; a backup route can take over under the configured rules. Health probes check whether a node service is available.

## Applicable Roles

- Platform Operators, multi-cloud resource administrators, and deployment-policy administrators


**Role handoff:** The operator or policy owner configures and checks the policy. A Model Provider with deployment permission tests it in an approved window and returns the model version, selected nodes, and events for the owner to review. A successful save is not scheduling validation.

## Scenario Goals

- Give each scheduling policy a clear associated model version, priority, and primary route node.
- Ensure fallback resource pools are authorized and have usable capacity.
- Assess latency, cost, and compliance impact for cross-region or cross-cloud fallback.
- Make a test deployment select the expected resource pool or return a clear failure reason.

## Scenario Flow

**Main path:** Check access and authorization -> Design preference and fallback -> Submit policy and verify state -> Run test deployment -> Review scheduling events and capacity

| Stage | Key Result |
| --- | --- |
| 1. Check foundation | Cloud accounts, resource pools, and authorization are complete |
| 2. Design policy | Associated model, route priority, and health probes are clear |
| 3. Validate scheduling | Test deployment selects the expected pool or fails clearly |
| 4. Govern continuously | Capacity, cost, latency, and authorization changes are reviewed |

## Before You Start

- Complete [On-Cloud Resource Access](../on-cloud-resource-access/).
- Authorize preferred and fallback pools for the tenant and business region.
- Define health-probe requirements, cost, and data-compliance boundaries.
- Prepare a low-risk test deployment and validation window.

## Recommended Reading Order

1. Review Access Overview, resource pools, and authorization.
2. Design the associated model, primary/backup priority, and health-probe rules.
3. Submit the policy, verify its state, then run an approved test deployment.
4. Review the selected resource pool, deployment events, and fallback result.

## Document Index

| Document | Description |
| --- | --- |
| [Configure and Validate an On-Cloud Scheduling Policy](./scheduling-policy-workflow) | Steps from access checks through policy, test deployment, and result review |

## Completion Checklist

Verify the actual scheduling result, not just a saved policy.

| Check | Pass Criteria |
| --- | --- |
| 1 | The associated model/version, available deployment targets, and resource grants are correct. |
| 2 | Preferred and fallback pools are authorized, enabled, and have capacity. |
| 3 | Primary/backup priorities and health probes match the plan, and cost and compliance boundaries have been reviewed. |
| 4 | The test deployment selects the expected pool; fallback or failure matches the policy. |
| 5 | An owner is assigned for later capacity and policy reviews. |
