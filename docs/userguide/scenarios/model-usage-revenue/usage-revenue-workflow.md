---
prev: false
next: true
---

# Model Usage & Earnings

This scenario helps callers reconcile model consumption and providers reconcile customer calls and model revenue using the same time range, model, and billing basis.

## Applicable Roles

- End User reviewing personal calls and consumption
- Model Provider reviewing customer usage and revenue
- Platform Operator reconciling platform billing rules

## Target Outcome

- Callers can trace Model ID, Attribution, tokens, requests, duration, and consumption from call records.
- Providers can distinguish Customer Name from Attribution while reviewing volume, success rate, and revenue.
- Usage, revenue, and logs can validate one another for the same time range.
- An anomaly can be narrowed to a model, caller, billing period, or pricing configuration.

## Before You Start

1. Confirm whether the account is acting as a caller or provider.
2. Identify the model, Model ID, provider, time range, billing period, and billing unit.
3. Prepare a request time or identifier and keep troubleshooting material redacted.

## Procedure

| Role | Action | Manual | Completion Signal |
| --- | --- | --- | --- |
| Caller | Review personal call overview and logs | [My Calls Overview](../../../usermanual/model-services/user/my-calls/overview/), [Call Logs](../../../usermanual/model-services/user/my-calls/call-logs/) | Model ID, Attribution, state, and time can be located |
| Caller | Review model usage | [Model Usage](../../../usermanual/model-services/user/usage-earnings/model-usage/) | Model ID, Attribution, tokens, requests, or duration match logs |
| Provider | Review customer overview, logs, and analytics | [Customer Overview](../../../usermanual/model-services/user/customer-calls/overview/), [Customer Call Logs](../../../usermanual/model-services/user/customer-calls/call-logs/), [Customer Analytics](../../../usermanual/model-services/user/customer-calls/call-analytics/) | Customer Name and Attribution are separately traceable |
| Provider | Review model earnings | [Model Earnings](../../../usermanual/model-services/user/usage-earnings/model-earnings/) | Earnings map to valid usage and pricing |
| Both | Compare billing mode and currency | [My Models](../../../usermanual/model-services/user/studio/my-models/) and the platform currency settings page | Unit, price, and period are consistent |

## Reconciliation Order

1. Use call logs to confirm Model ID, Attribution, success, and actual tokens, requests, or duration.
2. Open **Model Usage** with the same time and model filters. Compare Model ID and Attribution columns before reconciling usage totals. The current Demo does not expose member or project attribution filters.

![Compare model usage with call records](./images/model-usage-overview.png)

3. Have the provider open **Model Earnings** for the same model and period and trace earnings back to valid usage and effective pricing.

![Trace model revenue to valid usage](./images/model-revenue-overview.png)

4. If values differ, check billing mode, price, currency, free-call rules, and effective time in the model publishing configuration.

## Completion Checklist

> **Purpose:** These are the exit criteria for the current feature task. Use them to decide whether the result is observable and reviewable and whether you can continue to the next step in the scenario. They do not repeat the procedure; if any item fails, follow the troubleshooting section below.

| Check | Pass Criteria |
| --- | --- |
| 1 | Model ID, Attribution, time, and call counts agree between logs and usage. |
| 2 | Billing of failed or canceled calls follows the active rule. |
| 3 | Provider Customer Name and Attribution correspond to caller records without mixing the two dimensions. |
| 4 | Revenue can be traced to valid usage and effective pricing. |
| 5 | Reconciliation material contains no full prompts, responses, or keys. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Usage is empty | Time range, model filter, successful calls, and processing delay |
| Usage rises unexpectedly | Call logs, Model ID, displayed Attribution, retries, and concurrency |
| Revenue is empty | Whether the model has paid calls, pricing, and revenue period |
| Usage and revenue differ | Billing mode, currency, effective price time, and free-call rules |
