# Devices

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Provider and Model Consumer |
| Navigation Path | AI Infra(On-Prem) > Monitoring > Devices |
| Page Route | `/powerone/user-monitor/device` |
| Managed Object | Configuration, status, and relationships on Devices |

#### Beginner Explanation

Device monitoring is like a health check table for each GPU/NPU. It shows device type, health status, temperature, and VRAM usage to determine whether accelerators affect task execution.

#### Terms

| Term | Description |
| --- | --- |
| Device Name | Identifier of a single GPU/NPU or accelerator device. |
| Device Type | Accelerator model or vendor type, such as GPU or NPU. |
| VRAM Usage | Device VRAM occupation ratio, which affects whether models can start. |

#### Recommended Operation Order

Confirm prerequisites for Utilization, VRAM, and health status of GPU/NPU and other devices within the user-visible scope, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Devices, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The current account has device monitoring view permissions.
2. The target region has visible GPU/NPU resources.
3. Device plugin and monitoring collection data are normally reported.
4. The device type or specification used by the task to troubleshoot has been clarified.

## Page Description

> **Verification status: Partially verified.** Screenshots and fields use existing user-side evidence. The live Operator menu does not replace independent Model Provider or Model Consumer evidence.

Use this page to view and handle Configuration, status, and relationships on Devices.

![Devices](./images/devices-list.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

The page displays device monitoring capability for the selected region. When the capability is opened, users can view metric trends, list data, or key status. When the capability is not opened, the page shows a capability prompt.

#### Expected Page Elements When Capability Is Open

| Page Element | Example | Description |
| --- | --- | --- |
| Device List | `GPU 0 / NPU 0` | Displays accelerators within the user-visible scope. |
| Utilization Chart | `GPU Util 85%` | Determines whether the device is busy or idle for a long time. |
| VRAM Metric | `60GiB / 80GiB` | Determines whether the model or training task is close to the VRAM limit. |
| Temperature and Health Status | `72C / Healthy` | Determines hardware health, cooling, or driver risk. |
| Update Time | `2026-07-03 10:00` | Determines whether collection is delayed. |

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

### View Device Monitoring

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Monitoring > Device Monitoring`.
2. Confirm the region in the upper-right corner.
3. Filter by time, status, or keyword provided by the page.
4. View charts, lists, or prompt information.
5. If monitoring capability is not opened, return to instance details to view logs, events, and status.

#### Key Focus When Capability Is Open

- Whether GPU/NPU utilization is empty or continuously abnormal.
- Whether VRAM usage is close to the limit.
- Whether temperature and health status have alerts.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Device Name | Yes | Text | `GPU-0` | Locates a single device. |
| Device Type | Yes | Enum | `NVIDIA A800` | Displays accelerator model or type. |
| Node IP | Conditionally required | Text | `10.0.0.*` | Locates the node where the device resides. Documentation and screenshots should sanitize it. |
| Health Status | System-generated | Status | `Normal` | Shows whether the device is available or abnormal. |
| Temperature | System-generated | Number | `71°C` | Helps judge hardware health and cooling. |
| VRAM Usage | System-generated | Percentage | `78%` | Determines model or job VRAM pressure. |
| GPU/NPU Utilization | System-generated | Percentage | `63%` | Determines compute unit load. |

## Pitfalls

- Empty utilization may mean not collected, no task, or device plugin exception. Do not directly judge it as idle.
- High VRAM directly affects model startup even when total cluster capacity looks sufficient.
- Temperature exceptions should be handled as hardware health issues. Avoid relying only on task retry.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page load | Devices charts or lists are visible | Check monitoring permission and whether collection is available in the selected region |
| Scope | Time range, region, and object count match the investigation | Clear filters and restore them one at a time to avoid mixed scopes |
| Freshness | Update time is within the expected collection interval | Check collection interval, connection, and alerts in system or monitoring configuration |
| Correlation | An abnormal metric can be linked to a cluster, node, device, or job | Keep the same time range and cross-check adjacent monitoring pages and object details |

## FAQ

#### No Data on Devices

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

#### Devices Is Not Updating

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

#### Devices Differs from Adjacent Pages

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

- Node IP, device ID, and hardware status screenshots should be sanitized.
- Device monitoring only describes hardware-side status. Model parameter errors still require instance logs.
- Do not directly equate low single-card utilization with resource waste. It may be caused by sampling window or task type.

## Next Steps

1. When VRAM is insufficient, return to instance or job configuration to reduce model size, concurrency, or context length.
2. When device health is abnormal, avoid continuing to submit high-priority tasks with the same device type.
3. When operator handling is needed, provide device type, node, time range, and error symptoms.
