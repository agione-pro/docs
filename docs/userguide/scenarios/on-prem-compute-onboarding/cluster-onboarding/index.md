# Onboard the Cluster and Verify Devices

## Target Outcome

The cluster is available, all four NPU cards are discovered on the expected nodes, and compatible specifications can be associated.

## Applicable Roles

- Platform Operator

## Before You Start

- Prepare the cluster endpoint, registration information, network route, and required agent or credential.
- Record the expected node count and physical distribution of all four NPU cards.

## Entry

- **Role:** Operator
- **Menu:** AI Infra (On-Prem) > Resource Pools > Cluster Management
- **Route:** `/powerone/resourcepool/cluster`

## Steps

1. Confirm that the target region and availability zone exist.
2. Register the cluster with kubeconfig, API server, authentication, and network data.
3. Wait until the cluster becomes available.
4. Open cluster details and verify that all accelerator nodes are Ready.
5. Verify that the reported target NPU count is four, with no missing or duplicate devices.

![Cluster management](./images/clusters-list.png)

## How to Verify All Four NPU Cards

| Check | Expected Result |
| --- | --- |
| Cluster state | Available |
| Node state | Every node hosting an NPU is Ready |
| Device total | Four NPU cards |
| Allocatable count | Matches actual usage after subtracting running workloads |
| Resource key | Matches Accelerator Management and specification metrics |

## Completion Checklist

> **Purpose:** These are the exit criteria for the current feature task. Use them to decide whether the result is observable and reviewable and whether you can continue to the next step in the scenario. They do not repeat the procedure; if any item fails, follow the troubleshooting section below.

| Check | Pass Criteria |
| --- | --- |
| 1 | Cluster, node, and device data are visible. |
| 2 | All four NPU cards are recognized. |
| 3 | A one-card test workload enters scheduling successfully. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Cluster registration fails | Endpoint, network, registration data, agent state, and time synchronization |
| Fewer than four cards appear | Node health, driver, device plug-in, accelerator mapping, and hardware visibility |

## User Manual

[Cluster Management](/usermanual/ai-infra-on-prem/operator/resource-pools/clusters/)
