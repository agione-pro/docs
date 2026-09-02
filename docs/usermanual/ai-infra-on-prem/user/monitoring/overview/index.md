# Overview

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Provider and Model Consumer |
| Navigation Path | AI Infra(On-Prem) > Monitoring > Overview |
| Page Route | `/powerone/user-monitor/overview` |
| Managed Object | Configuration, status, and relationships on Overview |

#### Beginner Explanation

Statistics overview is like a resource weather map for Model Consumers. It shows cluster count, node status, exception count, and update time in one screen, helping decide whether to drill down further.

#### Terms

| Term | Description |
| --- | --- |
| Time Range | Limits the query window for overview cards, trends, and exception statistics. |
| Region | Resource scope visible to the current user. Overview data changes after switching. |
| Exception Count | Summary of failed jobs, high-watermark resources, or offline objects within the current time range. |

#### Recommended Operation Order

Confirm prerequisites for Resource pool monitoring overview, instance runtime status, and key resource trends, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Overview, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The current account has user-side monitoring view permissions.
2. The target region has been opened for monitoring by the operator.
3. The current account has visible instances, jobs, or resources in this region.
4. Monitoring collection data has completed synchronization, and page update time should not be obviously delayed.

## Page Description

> **Verification status: Partially verified.** Screenshots and fields use existing user-side evidence. The live Operator menu does not replace independent Model Provider or Model Consumer evidence.

Use this page to view and handle Configuration, status, and relationships on Overview.

![Overview](./images/monitoring-overview.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

The page displays statistics overview capability for the selected region. When the capability is opened, users can view metric trends, list data, or key status. When the capability is not opened, the page shows a capability prompt.

#### Expected Page Elements When Capability Is Open

| Page Element | Example | Description |
| --- | --- | --- |
| Overview Cards | `Cluster count / Node count / Job count / Alert count` | Quickly judge overall resource pool status. |
| Trend Entrypoint | `Resource trend / Job trend` | Jump from overview to cluster, node, device, or job dimensions. |
| Exception Aggregation | `Failed jobs / High-watermark resources / Offline nodes` | Helps users prioritize issues that affect current instances. |
| Update Time | `2026-07-03 10:00` | Determines whether data has collection delay. |

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
2. Confirm the region in the upper-right corner.
3. Filter by time, status, or keyword provided by the page.
4. View charts, lists, or prompt information.
5. If monitoring capability is not opened, return to instance details to view logs, events, and status.

#### Key Focus When Capability Is Open

- Cluster count, node status, and exception count in overview cards.
- Whether resource trends are consistent with recent instance creation, training tasks, or deployment changes.
- Whether update time is later than the latest operation.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Time Range | Yes | Date range | `Last 1 hour` | Controls overview statistics and trend query window. |
| Region | Conditionally required | Drop-down | `Central China Zone 1` | Limits the resource scope visible to the current user. |
| Cluster Count | System-generated | Number | `3` | Number of clusters visible or associated in the current region. |
| Node Status | System-generated | Status / number | `Ready 12 / NotReady 1` | Summarizes node availability. |
| Exception Count | System-generated | Number | `2` | Aggregates failed jobs, offline nodes, or high-watermark resources. |
| Update Time | System-generated | Date time | `2026-07-06 10:00` | Determines whether monitoring data refreshes in time. |

## Pitfalls

- Overview is suitable for determining direction and should not be the sole basis for a single instance failure.
- When exception counts differ from detail pages, fix region and time range first.
- If the page only shows a capability prompt, prioritize instance logs, events, and usage, then contact the operator to confirm opening conditions.

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

- Mask tenant names, node names, node IPs, and business identifiers before screenshots.
- Do not directly equate instant high watermarks in the overview with failures.
- Use sanitized resource IDs and time ranges in external feedback.

## Next Steps

1. Enter cluster, node, device, or job pages based on exception type.
2. If only your own instance is affected, prioritize instance details, logs, and events.
3. If multiple metric types are abnormal, record the time range and resource objects, then contact the operator.
