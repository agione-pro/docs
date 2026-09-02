# Top-up Records

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Provider and Model Consumer |
| Navigation Path | AI Infra(On-Prem) > Quotas & Usage > Top-up Records |
| Page Route | `/powerone/quota-usage/top-up-history` |
| Managed Object | Configuration, status, and relationships on Top-up Records |

#### Beginner Explanation

Top-up records are like the transaction history of a credit wallet, used to view the time, quantity, and status of each top-up, deduction, or adjustment.

#### Terms

| Term | Description |
| --- | --- |
| Granted Amount | Amount of credits granted to the account by the platform. |
| Value Amount | Value amount corresponding to the credits. |
| Source | Credit source, such as manual grant, campaign, or external system. |

#### Recommended Operation Order

Confirm prerequisites for Credit top-up records, source, acquisition method, third-party serial number, and top-up time, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Top-up Records, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. The current account has permission to view top-up records.
2. The current tenant has had credit top-ups or grants.
3. For reconciliation, external payment or approval records have been prepared.

## Page Description

> **Verification status: Partially verified.** Screenshots and fields use existing user-side evidence. The live Operator menu does not replace independent Model Provider or Model Consumer evidence.

Use this page to view and handle Configuration, status, and relationships on Top-up Records.

![Top-up Records](./images/top-up-records-list.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

The page provides search, reset, and top-up record tables. In the screenshot, the list is empty, indicating no top-up records under the current conditions.

#### Page Areas

| Field/Area | Description |
| --- | --- |
| Search Area | Filters top-up records by conditions. |
| Granted Amount | Granted credit quantity. |
| Value Amount | Credit value amount. |
| Source | Credit source. |
| Acquisition Method | Acquisition method. |
| Third Party Serial Number | External serial number. |
| Top-up Time | Arrival time. |

## Main Operations

### View Top-up Records

1. Go to `Quotas and Usage > Top-up Records`.
2. Select a time range and filter by order number, status, resource type, or posting result.
3. Check creation time, quota change, status, and completion time.
4. If no record is returned, check the time zone and reset filters. Redact order and quota information before sharing.

### Reconcile a Top-up with the Quota Change

1. Open the target details and record a redacted order number, status, and completion time.
2. Compare Resource Quotas or usage records and locate the corresponding quota change.
3. The top-up status and quota change should be traceable. If not, check refresh time and posting status.
4. Do not create another top-up or quota adjustment to test an anomaly.

### Query Top-Up Records

#### Applicable Scenario

When you need to confirm whether credits have arrived, reconcile accounts, or trace credit source, query top-up records.

#### Pre-Operation Check

1. The time range or serial information to query is clear.
2. The current account is viewing the target tenant.

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Quota & Usage > Top-Up Records`.
2. Enter query conditions.
3. Click **"Search"**.
4. View records in the table.
5. To restore the default list, Click **"Reset"**.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Record ID | System-generated | Text | `topup-20260706-001` | Locates a single top-up or adjustment record. |
| Change Type | System-generated | Enum | `Top-up` | Shows top-up, deduction, refund, or manual adjustment type. |
| Change Quantity | System-generated | Number | `2000 Credits` | Quantity of credits changed this time. |
| Operation Time | System-generated | Date time | `2026-07-06 10:00` | Time when the credit change occurred. |
| Effective Status | System-generated | Status | `Effective` | Whether the record has affected available credits. |
| Remarks | No | Text | `Project expansion` | Describes the business background or source of this change. |

## Pitfalls

- When there is no data, Click **"Reset"** first to exclude filter impact.
- Top-up records are used for reconciliation and do not mean resource quotas have been adjusted.

### Configuration Rules and Impact

- Top-up records only reflect credit changes and do not reflect resource quotas such as GPU or CPU.
- Credit arrival and resource quota adjustment are different concepts.
- During reconciliation, retain external serial numbers and times.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Top-up Records opens with filters or statistics | Check menu permission, current business identity, and tenant scope |
| Data scope | Lists or statistics match the selected time, region, and object | Reset filters and verify time boundaries, time zone, and aggregation scope |
| Data update | Update time or latest record matches the expected cycle | Check whether the source job, metering, or quota record has been generated |
| Cross-check | Configuration, status, and relationships on Top-up Records matches its details, billing, or monitoring records | Compare the responsible detail page by object identifier and time range |

## FAQ

#### No Records on Top-up Records

**Symptom:**

The page opens, but lists or statistics are empty.

**Possible Causes:**

- Filters are too narrow.
- source records are not generated.
- the role cannot see them.

**Solution:**

1. Reset filters
2. verify the source job or metering cycle
3. check business identity and tenant scope.

#### Top-up Records Shows the Wrong Scope

**Symptom:**

Data does not belong to the expected time, region, or object.

**Possible Causes:**

- Time boundaries differ.
- the region filter did not apply.
- ownership changed.

**Solution:**

1. Select time and region again
2. verify object identifiers
3. confirm ownership in source details.

#### Top-up Records Is Delayed

**Symptom:**

A source operation completed, but its record is not visible.

**Possible Causes:**

- Aggregation is not complete.
- the page is cached.
- source state is still processing.

**Solution:**

1. Verify source state
2. wait one aggregation cycle and refresh
3. inspect the processing task if delay persists.

#### Details or Download Is Unavailable

**Symptom:**

The details, expand, or download entry is disabled.

**Possible Causes:**

- The record does not support it.
- role permission is insufficient.
- the file is not generated.

**Solution:**

1. Select an eligible record
2. check role permission
3. confirm the statistics or export task is complete.

#### Summary and Details Do Not Match

**Symptom:**

The summary differs from the total of individual records.

**Possible Causes:**

- Periods differ.
- values are rounded.
- some records are still processing.

**Solution:**

1. Align period and time zone
2. compare by object
3. wait for pending records and check again.

## Notes

- Top-up records involve credits and settlement information. Do not display complete screenshots in public channels.
- After a record takes effect, the balance may still change due to metering deductions. View usage at the same time.
- During reconciliation, use record ID and time range. Do not leak internal accounts or business contract information.

## Next Steps

1. If credits do not change after top-up, verify record status and effective time.
2. When abnormal deductions are found, troubleshoot together with usage records and operator metering details.
3. For reconciliation, export or record top-up transactions by time range.
4. When contacting the operator, provide record ID, time, change quantity, and a screenshot of current credits.
