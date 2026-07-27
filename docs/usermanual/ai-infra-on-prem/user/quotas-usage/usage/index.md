# Resource Usage

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

`Resource Usage` is used to view the current tenant's usage and consumption details across different resource specifications. Regular users can view quotas by specification and enter consumption details to confirm resource consumption sources.

| Item | Content |
| --- | --- |
| Applicable role | Regular user |
| Navigation path | AI Infrastructure > On-Prem > Quota & Usage > Resource Usage |
| Page route | `/powerone/quota-usage/usage` |
| Managed objects | Resource specification usage, quota occupation, and consumption details |
| Typical use | View credits, occupation, and consumption details of each specification to help determine resource consumption sources |

#### Beginner Explanation

My usage is like a personal resource consumption record, used to view how much compute, storage, and service resources were used over a period of time.

#### First-Time Flow

1. Go to `Quota & Usage > Resource Usage`.
2. Search for target specifications by conditions.
3. View specification quotas.
4. Click `Consumption Details` to view consumption details for that specification.
5. Locate consumption sources together with instance lists.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Quota | Resource upper limit available to a tenant. Common dimensions include GPU, CPU, memory, and specifications. |
| Specification | Resource package that a job can request, such as CPU, memory, GPU model, and card count. |
| Consumption Details | Specific resource consumption records under a specification. |
| Credits | Available upper limit of resources or balance. |

## Prerequisites

1. The current account has permission to view resource usage.
2. The platform already has quota or usage statistics.
3. To locate specific instances, permission to view the corresponding instances is required.

## Page Description

The page displays resource specifications, quotas, and operation entrypoints in a table. The screenshot shows multiple specifications with Unlimited credits and provides `Consumption Details`.

![Resource Usage](./images/usage-list.png)

#### Page Areas

| Field/Area | Description |
| --- | --- |
| Search Area | Filters resource specifications by conditions. |
| Resource Specification | Specification name. |
| Quota | Quota limit for this specification. |
| Consumption Details | Opens consumption details for this specification. |
| Pagination Area | View by page when there are many usage records. |

## Main Operations

### View Consumption Details

#### Applicable Scenario

When you need to confirm which instances or tasks caused resource consumption for a specification, view consumption details.

#### Pre-Operation Check

1. The target resource specification has been located.
2. Filters are confirmed not to exclude target records.

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Quota & Usage > Resource Usage`.
2. Find the target specification.
3. Click `Consumption Details` in that row.
4. View consumption records in the details dialog or drawer.
5. Continue troubleshooting by instance name, time, and resource type.

The following figure shows the page state after opening the consumption details entrypoint, which can be used to view specification usage sources.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Time Range | Yes | Date range | `Last 7 days` | Limits the usage query window. |
| Resource Type | Conditionally required | Enum | `GPU` | Views usage by compute, storage, or instance category. |
| Resource Name | No | Text | `train-job-001` | Locates the specific resource that generated usage. |
| Accumulated Usage | System-generated | Number / duration | `48 card-hours` | Resource usage within the selected range. |
| Consumed Credits | System-generated | Number | `1440 Credits` | Consumed credits converted according to platform rules. |
| Statistics Update Time | System-generated | Date time | `2026-07-06 10:00` | Determines whether usage data has completed synchronization. |

## Pitfalls

- If details are empty, this specification may currently have no consumption records.
- Statistical data may be delayed and is not suitable as a replacement for real-time instance status.

## Result Validation

1. The details page or drawer can open.
2. The specification in records is consistent with the clicked row.
3. Consumption sources can correspond to instances or jobs.

## Configuration Rules and Impact

- Resource usage is used for statistics and reconciliation and does not directly create or release resources.
- Unlimited means there is no fixed upper limit, but underlying resources and scheduling conditions still apply.
- Consumption details may be delayed. Judge real-time status together with instance details.

## FAQ

#### Usage List Is Empty

**Symptom:** The resource usage page has no specifications or records.

**Possible Causes:**

- The current tenant has no allocated specifications.
- Filters are too narrow.
- The statistics service has no data yet.

**Solution:**

1. Click `Reset`.
2. Confirm whether the Resource Quotas page has specifications.
3. Contact the operator to check quota allocation.

#### Details Do Not Match Instance Status

**Symptom:** Consumption details show usage, but the corresponding runtime object is not visible in the instance list.

**Possible Causes:**

- Statistics are delayed.
- The instance has ended or been deleted.
- Filters or time ranges are different.

**Solution:**

1. Expand the time range and view again.
2. View historical instance or job records.
3. Contact the operator to verify metering data.

## Next Steps

1. When usage grows abnormally, locate high-consumption instances and jobs by resource name or time range.
2. When usage is inconsistent with credit changes, wait for metering synchronization and check again. Contact the operator if necessary.
3. For cost review, export or record usage trends, resource types, and business purposes.
4. Set shutdown or cleanup plans for long-running resources to avoid continuous credit consumption.

## Notes

- Usage statistics may lag behind resource status changes. Short-term differences are common.
- Usage data may contain business resource names. Sanitize it before external communication.
- Fee or Credits explanations should follow platform metering rules. Do not use a single screenshot as final settlement basis.
