# Jobs

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Provider and Model Consumer |
| Navigation Path | AI Infra(On-Prem) > Monitoring > Jobs |
| Page Route | `/powerone/user-monitor/work` |
| Managed Object | Configuration, status, and relationships on Jobs |

#### Beginner Explanation

Job monitoring is like a personal task queue list. It shows job ID, status, queue duration, runtime duration, GPU occupation, and failure causes.

#### Terms

| Term | Description |
| --- | --- |
| Job ID | Identifier used to locate a single training, inference, or runtime task. |
| Queue Duration | Time a job waits for resources or scheduling conditions. |
| Runtime Duration | Duration after a job starts running. |

#### Recommended Operation Order

Confirm prerequisites for Model instances, online IDEs, runtime instances, and historical jobs within the user-visible scope, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Jobs, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The current account has job monitoring view permissions.
2. The target job belongs to the current account or current tenant visible scope.
3. The job has been submitted and generated status, events, or monitoring data.
4. The job ID or submission time to troubleshoot has been clarified.

## Page Description

> **Verification status: Partially verified.** Screenshots and fields use existing user-side evidence. The live Operator menu does not replace independent Model Provider or Model Consumer evidence.

Use this page to view and handle Configuration, status, and relationships on Jobs.

![Jobs](./images/jobs-list.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

The page displays job monitoring capability for the selected region. When the capability is opened, users can view metric trends, list data, or key status. When the capability is not opened, the page shows a capability prompt.

#### Expected Page Elements When Capability Is Open

| Page Element | Example | Description |
| --- | --- | --- |
| Job List | `train-job-001` | Displays jobs associated with model instances, online IDEs, or runtime instances. |
| Job Status | `Running / Queued / Failed` | Determines task lifecycle and current processing stage. |
| Queue Reason | `Insufficient resources / Image pulling` | Helps locate why creation is slow or cannot start. |
| Runtime Duration | `2h 13m` | Determines whether the task exceeds expected runtime. |
| Failure Information | `ImagePullBackOff` | Determines whether logs, events, or operator support is needed. |

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

### View Job Monitoring

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Monitoring > Job Monitoring`.
2. Confirm the region in the upper-right corner.
3. Filter by time, status, or keyword provided by the page.
4. View charts, lists, or prompt information.
5. If monitoring capability is not opened, return to instance details to view logs, events, and status.

#### Key Focus When Capability Is Open

- Whether jobs remain queued for a long time.
- Whether failure causes point to quota, image, startup command, or insufficient resources.
- Whether GPU occupation and runtime duration match expectations.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Job ID | Yes | Text | `job-20260706-001` | Locates a single job. |
| Status | System-generated | Status | `Running` | Shows queued, running, succeeded, or failed. |
| Queue Duration | System-generated | Duration | `18 minutes` | Determines whether scheduling wait exists. |
| Runtime Duration | System-generated | Duration | `2 hours 15 minutes` | Determines whether the task exceeds expectations. |
| GPU Occupation | System-generated | Number / specification | `2 * A800` | Shows accelerator resources occupied by the job. |
| Failure Cause | System-generated | Text | `ImagePullBackOff` | Helps locate failure direction. |
| Submission Time | System-generated | Date time | `2026-07-06 09:30` | Used to align logs, events, and usage. |

## Pitfalls

- Job queueing is usually related to quotas, specifications, capacity, or scheduling conditions. Do not only refresh the page.
- When failure cause is empty, view instance events and logs first.
- When GPU occupation is normal but results are abnormal, return to training scripts or model parameters for troubleshooting.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page load | Jobs charts or lists are visible | Check monitoring permission and whether collection is available in the selected region |
| Scope | Time range, region, and object count match the investigation | Clear filters and restore them one at a time to avoid mixed scopes |
| Freshness | Update time is within the expected collection interval | Check collection interval, connection, and alerts in system or monitoring configuration |
| Correlation | An abnormal metric can be linked to a cluster, node, device, or job | Keep the same time range and cross-check adjacent monitoring pages and object details |

## FAQ

#### No Data on Jobs

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

#### Jobs Is Not Updating

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

#### Jobs Differs from Adjacent Pages

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

- Job IDs, image addresses, data paths, and log contents may contain sensitive information.
- Before stopping a job, confirm whether output files and logs need to be retained.
- When the same error appears repeatedly, adjust configuration before retrying to avoid continuous credit consumption.

## Next Steps

1. For queueing issues, verify quotas, specifications, and device capacity first.
2. For failure issues, view events, image, startup command, and mount path first.
3. For high-duration jobs, evaluate resource consumption together with the usage page.
