# Nodes

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator |
| Navigation Path | AI Infra(On-Prem) > Monitoring > Nodes |
| Page Route | `/powerone/monitor/node` |
| Managed Object | Configuration, status, and relationships on Nodes |

#### Beginner Explanation

Node statistics are like a server inspection checklist. They show CPU, memory, disk, and status for each node, helping determine which machine an issue lands on.

#### Terms

| Term | Description |
| --- | --- |
| Node Status | Whether a node is Ready, unschedulable, or abnormal. |
| CPU Usage | Current CPU load of the node. |
| Memory Usage | Node memory occupation. |

#### Recommended Operation Order

Confirm prerequisites for Node status, node role, resource utilization, heartbeat, and owning cluster, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Nodes, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The current account has node monitoring view permissions.
2. The target node belongs to an accessed cluster.
3. Node CPU, memory, disk, and status metrics are reported normally.
4. The troubleshooting time range or affected task has been clarified.

## Page Description

Use this page to view and handle Configuration, status, and relationships on Nodes.

![Nodes](./images/manual-monitoring-nodes.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

Node statistics are used to view CPU, memory, disk, and runtime status for each node. Operators can use it to locate NotReady nodes, high-watermark nodes, or machines with interrupted collection curves.

The following figure shows the node statistics page.

## Main Operations

### View Monitored Objects

1. Open the monitoring page and select the time range, region, and resource pool.
2. Filter the objects supported by the current page, such as clusters, nodes, devices, jobs, or status.
3. Check aggregation scope, data refresh time, and object count to avoid comparing different scopes.
4. If no data is shown, expand the range and clear filters one at a time. Redact internal resource names and metrics before sharing.

### Drill Down into Abnormal Metrics

1. Click an abnormal metric, trend point, or **"Details"** for the target object.
2. Keep the same time range and inspect utilization, status, alerts, and related objects.
3. Determine whether the anomaly affects one object, one cluster, or the whole environment. Compare adjacent monitoring pages if information is insufficient.
4. Do not start, stop, migrate, or delete resources to test a monitoring anomaly.

### View Node Statistics

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Monitoring > Node Statistics`.
2. Confirm the region in the upper-right corner and page filters.
3. View lists, charts, or statistic cards.
4. Focus on abnormal status, high watermarks, long periods without updates, or data inconsistent with expectations.
5. When a node is abnormal, go to the cluster node page to view labels, taints, hardware, runtime, and job information.

#### View Node Statistics

1. Go to `AI Infrastructure > On-Prem > Monitoring > Node Statistics`.
2. View the node list and overall running status, and confirm node name, cluster, region/AZ, node status, and resource usage level.
3. Select cluster, node, resource type, status, or time range filters as provided by the page.
4. Review CPU, memory, accelerator, storage, network, and job-related statistics to identify high load, insufficient resources, or abnormal node status.
5. If a node is abnormal, continue troubleshooting in Devices or Jobs monitoring pages, together with cluster statistics and scheduling events.

![View node statistics](./images/node-statistics.png)

#### Key Focus

- Whether the node is online or Ready.
- Whether single-node resources are close to full load.
- Whether abnormal nodes are concentrated in the same cluster or availability zone.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Node Name | Yes | Text | `node-gpu-01` | Locates a specific compute node. |
| Cluster | Conditionally required | Drop-down | `cluster-prod-a` | Limits the cluster to which the node belongs. |
| Region / AZ | Conditionally required | Drop-down | `Wuhan / AZ A` | Limits the resource location to which the node belongs. |
| Node Status | System-generated | Status | `Ready` | Shows whether the node is schedulable, unavailable, or has alerts. |
| CPU Usage | System-generated | Percentage | `72%` | Determines whether node CPU is close to bottleneck. |
| Memory Usage | System-generated | Percentage | `81%` | Determines node memory pressure. |
| Accelerator Usage | System-generated | Percentage | `65%` | Determines whether GPU, NPU, or other accelerator resources are close to bottleneck. |
| Storage Usage | System-generated | Percentage | `68%` | Determines whether system disk, data disk, or mounted storage is close to limit. |
| Network Traffic | System-generated | Value / Trend | `Inbound / Outbound` | Helps determine whether node network traffic has abnormal fluctuation or bottlenecks. |
| Job Count | System-generated | Number | `12` | Shows the number of running, queued, or abnormal jobs on the node. |
| Time Range | Conditionally required | Date range | `Last 1 hour` | Controls the query window for statistic cards, trend charts, and list data. |
| Update Time | System-generated | Date time | `2026-07-06 10:00` | Determines whether node metrics are latest data. |

## Pitfalls

- Node Ready does not mean the device plugin is definitely normal.
- High disk watermark may cause image pull or log write failures.
- During troubleshooting, judge together with node events and job logs.
- Node statistics may have collection latency. Do not judge faults based only on a single instant metric.
- Node exceptions should be investigated together with clusters, devices, jobs, scheduling events, and node logs.
- Do not write real node names, node IPs, device IDs, cluster IDs, resource pool IDs, tenant information, internal metric keys, or test data in the document.

### Configuration Rules and Impact

- **Node status before resource watermarks**: When a node is NotReady, unschedulable, or collection is abnormal, handle the status problem first.
- **Disk pressure affects job stability**: High disk watermark may cause image pull, log write, or temporary file creation failures.
- **Single-node exception can cause local queueing**: Scheduling failure is not necessarily overall cluster capacity shortage. It may be caused by target node labels or taint restrictions.
- **Metric delay requires event judgment**: When node metrics are delayed, also view cluster events and job failure reasons.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page load | Nodes charts or lists are visible | Check monitoring permission and whether collection is available in the selected region |
| Scope | Time range, region, and object count match the investigation | Clear filters and restore them one at a time to avoid mixed scopes |
| Freshness | Update time is within the expected collection interval | Check collection interval, connection, and alerts in system or monitoring configuration |
| Correlation | An abnormal metric can be linked to a cluster, node, device, or job | Keep the same time range and cross-check adjacent monitoring pages and object details |

## FAQ

#### No Data on Nodes

**Symptom:**

The page opens, but charts or lists are empty.

**Possible Causes:**

- No job ran in the selected time.
- collection is unavailable in the region.
- the role lacks metric permission.

**Solution:**

1. Expand the time range and reset filters
2. verify regional monitoring capability
3. compare an adjacent monitoring page.

#### Nodes Is Not Updating

**Symptom:**

The data does not change for an extended period.

**Possible Causes:**

- The next collection cycle has not arrived.
- the collector is abnormal.
- the page is cached.

**Solution:**

1. Check update time
2. inspect collector status and alerts
3. refresh with the same time range.

#### Nodes Differs from Adjacent Pages

**Symptom:**

The same object has different values on two monitoring pages.

**Possible Causes:**

- Aggregation granularity differs.
- time range or time zone differs.
- filters target different objects.

**Solution:**

1. Align time range and time zone
2. verify aggregation scope
3. clear and restore filters one at a time.

#### Cannot Drill Down to the Target

**Symptom:**

The metric or details entry does not lead to the expected object.

**Possible Causes:**

- The object ended or was removed.
- the role cannot see it.
- relationship identifiers differ.

**Solution:**

1. Record object and time
2. check its list state
3. ask the Operator to verify visibility.

#### A Spike Cannot Be Reproduced

**Symptom:**

A spike was recorded, but current details are normal.

**Possible Causes:**

- The spike was brief.
- sampling is coarse.
- the job has ended.

**Solution:**

1. Lock the spike interval
2. compare job and node events
3. retain a sanitized screenshot and object identifier.

## Notes

- Node names, IPs, labels, and equipment room information should be sanitized.
- A single-node exception does not necessarily mean the whole cluster is unavailable.
- Before node maintenance, confirm impact on running tasks and mounted storage.
- Before fault judgment, cross-check with cluster statistics, device monitoring, job monitoring, scheduling events, and node logs.
- Documentation examples must not include real node names, node IPs, device IDs, cluster IDs, resource pool IDs, tenant information, internal metric keys, or test data.

## Next Steps

1. When a node is NotReady, check cluster events and node status.
2. When resources have high watermarks, locate the instances or jobs occupying resources.
3. When accelerators are involved, continue viewing device monitoring.
