# Operation Logs

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Consumer |
| Navigation path | Settings > Activity & Notifications > Operation Logs |
| Page route | `/user/user-space/operation-logs` |
| Managed objects | Tenant user-operation records, HTTP methods, results, time ranges, and operation details |

#### Beginner Explanation

Operation Logs is the audit trail for Settings. It shows who performed an action, when the action occurred, and whether it succeeded. When investigating a configuration or permission problem, filter by time, operator, and target object first.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Operation log | Audit information that records a user action and its processing result.; Keep only desensitized clues during troubleshooting. |
| Operator | The account that performed the action.; Confirm that the person was expected to perform it. |
| Target object | The configuration, member, or rule that was viewed or changed.; Use it to identify the impact scope. |
| Operation result | Success, failure, processing, or another action result.; Investigate the cause when it is not successful. |

## Prerequisites

1. The current account has permission to view operation logs.
2. Before the query, you have identified the time range, HTTP method, or result filter.
3. Before exporting logs, you have confirmed the tenant's data-management requirements.

## Page Description

| Area | Description |
| --- | --- |
| Top action | Export CSV |
| Filters | HTTP method, result, start time, and end time |
| Table columns | Time, user, action, method, IP address, processing time, and result |
| Actions | Search and Reset |
| High-risk action | Export CSV |

![Operation Logs](../../../operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Operation Logs page.

## Main Operations

### View Operation Logs

1. Open Operation Logs, select a time range, and filter by operator, module, action type, result, or keyword.
2. Check the target time, operator, object, result, and source. If no record is returned, check the time zone and clear filters one at a time.
3. The target event should be uniquely identifiable. For duplicate names, narrow the range with a redacted object ID fragment and time.
4. Logs may contain account, IP, and business-object information and must be redacted before export, screenshots, or sharing.

![View Operation Logs](../../../operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Operation Logs page.

**Result validation:** The list, details, and status fields show the target object and remain consistent.

**Note:** Use only the fields and entries visible on the current page. Do not infer behavior from another role's page.

**FAQ:** If the entry is hidden, the button is disabled, or the result is not updated, check the current account permission, filters, object status, and page refresh time.

### View Operation Log Details

1. Click **"Details"** for the target record and inspect the request action, object, result, duration, and error summary.
2. Compare preceding and following events to determine whether the action completed and whether a subsequent failure occurred.
3. If information is insufficient, escalate with a redacted time, module, and error category. Do not copy Tokens, keys, cookies, or complete request bodies.
4. Use log details only for audit and diagnosis. Do not replay high-risk operations from the page.

![View Operation Log Details](../../../operator/personal/profile/images/manual-settings-operator-profile.png)

The screenshot keeps the left navigation and the complete functional area with the top menu hidden. Check the fields, buttons, and action locations on the Operation Logs page.

**Result validation:** The list, details, and status fields show the target object and remain consistent.

**Note:** Use only the fields and entries visible on the current page. Do not infer behavior from another role's page.

**FAQ:** If the entry is hidden, the button is disabled, or the result is not updated, check the current account permission, filters, object status, and page refresh time.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Keyword or name | No | Text | `Example name` | Used to locate a specific record. |
| Status | No | Enum | `Enabled` | Used to determine the current processing or availability state. |
| Time range or billing cycle | No | Date / Month | `2026-07` | Used to narrow statistics, logs, bills, or settlements. |
| Tenant / customer / member | No | Text | `Example tenant` | Used to identify the business ownership scope. |
| Operation | System generated | Button / link | `View Details` | Provides row-level entry points for follow-up checks. |

## Pitfalls

- Do not change roles, members, login policies, Keys, or API rate-control rules without confirming the affected users and systems.
- UI entries can differ by role and tenant scope; verify the current account context before troubleshooting.
- Never copy complete Keys, AK/SK, tokens, or secrets into documentation, tickets, or screenshots.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Search | The list shows only logs that match the conditions. | Check the operator, time range, and operation type. |
| Reset | The filters return to their defaults. | Clear the filters manually and query again. |
| Status | The success or failure state matches the Result column. | Open log details and verify the error or operation result. |

## FAQ

#### A target operation record cannot be found

**Symptom:**

The list is empty after filtering by time or user.

**Possible cause:**

- The time range does not include the target action.
- The HTTP method or result filter is too restrictive.
- The record has not refreshed into the list.

**Resolution:**

1. Expand the time range and search again.
2. Clear the HTTP method and result filters.
3. Wait for the log to refresh, then query again.

#### Why is a target operation log missing?

**Symptom:**

The target record is absent after searching by operator, time, or object.

**Possible cause:**

The time range does not include the action, the retention period has passed, or the current account cannot view logs for that tenant, project, or member.

**Resolution:**

Expand the time range and clear the operation-type filter. Confirm the tenant and object where the action occurred. If the record is still missing, ask an administrator to check log collection and retention.

#### Why are log export or detail actions unavailable?

**Symptom:**

Logs can be queried, but Export or View Details cannot be selected.

**Possible cause:**

The current account lacks audit-export permission, the record is outside the viewable retention range, or the tenant security policy disables export.

**Resolution:**

Verify audit permission and the log retention range. Before sending logs outside the tenant, request export permission and follow desensitization requirements.

#### How should the Operation Logs page be exported or captured safely?

**Symptom:**

Page information is needed for troubleshooting, audit, or delivery.

**Possible causes:**

The page may contain accounts, email addresses, IP addresses, internal paths, tenant identifiers, Keys, or amounts.

**Resolution:**

Keep only the necessary fields and action context. Use opaque light-gray pixel mosaics for sensitive text and never share complete credentials or internal addresses.

#### What should I do when the Operation Logs page shows unexpected data?

**Symptom:**

A field, status, metric, or related object differs from the expectation.

**Possible causes:**

The page scope, time condition, role permission, or upstream setting does not match.

**Resolution:**

Record the redacted object, time, and result. Verify the entry and filters first, then check related pages and Operation Logs.

## Notes

- Exported CSV files may contain users, IP addresses, and audit information. Handle them according to tenant data-security requirements.
- Do not distribute exported log files without authorization.

## Next Steps

1. Retain audit records for critical operations.
2. Compare member, role, and quota pages to identify the source of a change.

### Preserved Existing Screenshots

![Preserved Existing Screenshots](./images/operation-logs-list.png)
