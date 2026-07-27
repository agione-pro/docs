---
prev: false
next: true
---

# Release and Audit API Rate-Control Rules

Use this task to release an API rate-control rule version safely and validate node state and business impact.

## Applicable Roles

- Platform Operators, API gateway administrators, and security or audit staff

## Before You Start

1. Record the target API, tenant or model scope, and current normal request baseline.
2. Define statistics or blocking mode, threshold, observation window, and rollback conditions.
3. Confirm release permission, approval requirements, and target-node scope.

## Procedure

### 1. Record the Traffic Baseline

Open [API Rate Control Overview](../../../usermanual/settings/operator/api-rate-control/overview/), select a time range that covers normal and peak traffic, and record requests, blocked requests, over-limit statistics, and top rules. Do not judge a rule from total requests alone.

![Record the API request and blocking baseline](../../../usermanual/settings/operator/api-rate-control/overview/images/overview-list.png)

### 2. Create or Review the Rule

Open [Rule Management](../../../usermanual/settings/operator/api-rate-control/rule-management/) and review API Pattern, counting scope, mode, quota, window, and priority. Validate a new rule in statistics mode or a limited scope first, then expand only after confirming that it does not match unrelated APIs.

![Review rule scope, threshold, and release state](../../../usermanual/settings/operator/api-rate-control/rule-management/images/rule-management-list.png)

### 3. Release and Check Node Versions

Release the target version according to approval requirements. Open [Release Center](../../../usermanual/settings/operator/api-rate-control/publish-center/) and check version, state, node count, publisher, and message. Then open [Node Cache](../../../usermanual/settings/operator/api-rate-control/node-cache/) and confirm that target nodes loaded the same version. Investigate failed nodes before repeating a full release.

![Review rule-version release records](../../../usermanual/settings/operator/api-rate-control/publish-center/images/publish-center-list.png)

### 4. Observe Hits and Audit Details

Return to Overview to review request and blocking trends. Then open [Observability and Audit](../../../usermanual/settings/operator/api-rate-control/observability-audit/) and compare minute statistics, block logs, and audit logs for the same API, nodes, and time range. Adjust or roll back according to the plan when false positives or abnormal growth appear.

![Review audit details by API, node, and time range](../../../usermanual/settings/operator/api-rate-control/observability-audit/images/observability-audit-list.png)

## Completion Checklist

> **Purpose:** These checks confirm that the release action produced observable and explainable node behavior. Stop expanding the rule scope while any check fails.

| Check | Pass Criteria |
| --- | --- |
| Rule configuration | API matching, counting scope, threshold, mode, and priority are correct. |
| Release record | Target version, node count, state, and release message match expectations. |
| Node cache | All target nodes load the same valid version. |
| Hit audit | Overview metrics correspond to audit records and false positives are acceptable. |
| Rollback readiness | Rollback condition, owner, and validation method are clear. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Rule does not work after a successful release | Enabled state, API Pattern, rule priority, and node-cache version |
| Only some nodes apply the rule | Release target, failure message, node availability, and cache update time |
| Blocking count rises unexpectedly | Business peak, caller retries, matching scope, and threshold |
| Overview shows blocks but audit has no records | Time range, tab, API Path, node, and reporting delay |
