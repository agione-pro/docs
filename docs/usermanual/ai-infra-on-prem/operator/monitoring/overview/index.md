# Overview

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Operator |
| Navigation Path | AI Infra(On-Prem) > Monitoring > Overview |
| Page Route | `/powerone/monitor/overview` |
| Managed Object | Configuration, status, and relationships on Overview |

#### Beginner Explanation

Statistics overview is like the resource pool cockpit. First check overall watermarks, exception counts, and update time, then decide whether to drill down to cluster, node, device, or job pages for further troubleshooting.

#### Terms

| Term | Description |
| --- | --- |
| Global Watermark | Overall platform resource usage. |
| Exception Aggregation | Centralized display of cluster, node, device, and job exceptions. |
| Trend Entrypoint | Analysis entrypoint that jumps to a specific monitoring object. |

#### Recommended Operation Order

Confirm prerequisites for Resource pool overview, cluster count, node status, job distribution, and resource capacity, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Overview, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The current account has operator monitoring view permissions.
2. Target regions, availability zones, and clusters have completed resource access.
3. Monitoring collection components normally report cluster, node, device, and job data.
4. For troubleshooting, the time range and affected resource type have been clarified.

## Page Description

Use this page to view and handle Configuration, status, and relationships on Overview.

![Overview](./images/manual-monitoring-overview.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

Statistics overview is used to view global resource watermarks, exception aggregation, and trend entrypoints from an operator perspective. The page helps operators first determine whether an issue is concentrated in clusters, nodes, devices, or jobs, then enter the corresponding monitoring page for drill-down.

The following figure shows the statistics overview page.

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

### View Statistics Overview

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Monitoring > Overview`.
2. Confirm the region in the upper-right corner and page filters.
3. View lists, charts, or statistic cards.
4. Focus on abnormal status, high watermarks, long periods without updates, or data inconsistent with expectations.
5. After finding an exception, go to cluster statistics, node statistics, device monitoring, or job monitoring for further location.

#### Monitoring Overview

1. Go to `AI Infrastructure > On-Prem > Monitoring > Overview`.
2. View the overall running status of resource pools, clusters, nodes, devices, and jobs.
3. Focus on total resources, used resources, remaining resources, online status, abnormal status, and trend metrics.
4. If the page provides time range, region, cluster, or resource type filters, select the filters before reviewing statistics.
5. If high resource usage, device exceptions, or job exceptions are found, continue troubleshooting in Clusters, Nodes, Devices, or Jobs monitoring pages.

![Monitoring overview](./images/overview-list.png)

#### Key Focus

- Whether cluster and node counts change abnormally.
- Whether GPU, CPU, memory, and disk watermarks are close to limits.
- Whether failed, queued, or long-running jobs increase.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Resource Pool | System-generated | Summary object | `Resource Pool` | Shows the overall running and capacity status of resource pools in the current operator scope. |
| Cluster | System-generated | Summary object | `Cluster` | Shows the count, status, and exceptions of clusters included in monitoring statistics. |
| Node | System-generated | Summary object | `Node` | Shows node online status, abnormal status, and resource watermarks. |
| Device | System-generated | Summary object | `Device` | Shows running status and availability of device resources such as GPU. |
| Job | System-generated | Summary object | `Job` | Shows job count, running status, and exception distribution. |
| Total Resources | System-generated | Number | `Total` | Shows the total capacity in the current filter scope. |
| Used Resources | System-generated | Number | `Used` | Shows the resources already occupied in the current filter scope. |
| Remaining Resources | System-generated | Number | `Remaining` | Shows resources still available for scheduling or use in the current filter scope. |
| Abnormal Status | System-generated | Status | `Abnormal` | Shows aggregated abnormal status for clusters, nodes, devices, or jobs. |
| Time Range | Yes | Date range | `Last 1 hour` | Controls the query window for overview cards, trend charts, and exception statistics. |
| Region | Conditionally required | Drop-down | `Central China Zone 1` | Limits the resource scope covered by the statistics overview. |
| Cluster Count | System-generated | Number | `12` | Total number of clusters included in monitoring statistics in the current region. |
| Exception Count | System-generated | Number | `3` | Aggregates abnormal objects in clusters, nodes, devices, or jobs. |
| Update Time | System-generated | Date time | `2026-07-06 10:00` | Used to determine whether overview data has collection delay. |

## Pitfalls

- The overview can only help locate direction and does not replace specific object details.
- Rising watermarks should be judged together with new jobs, expansion, and queueing.
- Monitoring overview is used to observe global watermarks and should not be the sole basis for expansion, migration, or fault judgment.
- Metrics may have collection latency. Troubleshooting should be combined with cluster, node, device, and job details.
- Mask tenants, node names, and business identifiers before screenshots.
- Do not write real cluster IDs, node names, resource pool IDs, tenant information, internal metric keys, or test data in the document.

### Configuration Rules and Impact

- **Use overview to determine direction first**: Confirm whether exceptions are concentrated in a region, cluster, or resource type before entering drill-down pages.
- **Interpret exception count with time range**: The longer the time window, the more easily historical exceptions are included. Fix the time range during troubleshooting.
- **Update time determines trustworthiness**: If update time is clearly delayed, check the collection link before judging whether resources are truly abnormal.
- **Watermark changes require trends**: Instant high watermarks are not necessarily failures. Judge them together with new jobs, expansion, maintenance windows, and historical trends.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page load | Overview charts or lists are visible | Check monitoring permission and whether collection is available in the selected region |
| Scope | Time range, region, and object count match the investigation | Clear filters and restore them one at a time to avoid mixed scopes |
| Freshness | Update time is within the expected collection interval | Check collection interval, connection, and alerts in system or monitoring configuration |
| Correlation | An abnormal metric can be linked to a cluster, node, device, or job | Keep the same time range and cross-check adjacent monitoring pages and object details |

## FAQ

#### No Data on Overview

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

#### Overview Is Not Updating

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

#### Overview Differs from Adjacent Pages

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

- Overview is used to discover direction and should not be the sole basis for incident responsibility.
- Mask tenants, nodes, IPs, and business identifiers before screenshots.
- Watermark exceptions need to be judged together with historical trends, business windows, and job changes.
- Before expansion, migration, or fault handling, cross-check with cluster statistics, node statistics, device monitoring, and job monitoring.
- Documentation examples must not include real cluster IDs, node names, resource pool IDs, tenant information, internal metric keys, or test data.

## Next Steps

1. If exceptions are concentrated in clusters, go to cluster statistics.
2. If exceptions are concentrated in nodes or devices, go to the corresponding monitoring page.
3. If job failures or queueing increase, go to job monitoring and troubleshoot with quotas.
