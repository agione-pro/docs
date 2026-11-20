# Metis InfluxDB Data Dictionary

:::: info Document Information
Version: v1.0
Updated: 2026-09-11
::::

This document is intended for third-party users who query InfluxDB from Grafana to build statistical dashboards. It describes the available measurements, tags, fields, time semantics, and SQL query examples. Environment-specific values such as the endpoint, database name, token, and credentials are provided separately.

## 1. Connection Parameters

| Item | Value |
| --- | --- |
| Endpoint | Provided by the deployment environment |
| Query Path | `/api/v3/query_sql` |
| Database | Provided by the deployment environment |
| Query Precision | nanosecond |

## 2. General Conventions

| Item | Description |
| --- | --- |
| Time column | InfluxDB SQL queries use `time`; timestamps are stored with nanosecond precision. |
| Query language | InfluxDB 3 SQL. |
| Snapshot measurements | `time` is the timestamp of the snapshot batch. |
| Event measurements | `time` is the event timestamp. |
| Cumulative measurements | `credit_usage_daily` and `credit_usage_mtd_daily` may contain invalidated records; business queries must filter with `active = true`. |
| Aggregate queries | If an aggregate query does not select `time`, do not sort it by `time`. |
| Dimension types | All tags are stored as strings. Boolean-like dimensions such as `is_public` and `is_aggregated` are also string tags. |
| Optional columns | Empty fields are not written as empty strings or explicit `NULL`. A missing column means that the point does not contain that tag or field. |

## 2.1 Instance Monitoring

Instance monitoring measurements provide instance-level, card-level, and hourly aggregate data. `deploy_mode` distinguishes single-instance, multi-instance, and cluster deployments. `is_cluster` is a string tag whose value is `true` or `false`. Raw monitoring values are stored as received and are not automatically unit-converted.

## 3. Measurement Overview

| Measurement | Description | Time semantics | Recommended Grafana use |
| --- | --- | --- | --- |
| `tenant_profile_snapshot` | Tenant profile snapshot | Snapshot batch time | Query the latest tenant profile. |
| `tenant_credit_snapshot` | Tenant credit balance snapshot | Snapshot batch time | Query tenant credit balances. |
| `tenant_overview_snapshot` | Tenant overview snapshot | Snapshot batch time | Query tenant profile and credit balance data. |
| `model_source_snapshot` | Model provider snapshot | Snapshot batch time | Query model provider information. |
| `model_snapshot` | Model snapshot | Snapshot batch time | Query model, status, pricing, and billing configuration. |
| `model_metrics_1m` | One-minute model metrics | Metric collection time | Query short-range model metrics. |
| `model_call_event` | Model call detail events | Call event time | Query call details and errors. |
| `credit_transaction_event` | Credit transaction details | Credit event time | Query individual credit transactions. |
| `credit_usage_daily` | Daily credit usage aggregate | UTC day start | Query daily usage; always filter with `active = true`. |
| `credit_usage_mtd_daily` | Month-to-date credit usage aggregate | UTC day start | Query month-to-date usage; always filter with `active = true`. |
| `model_call_1h` | Hourly model call aggregate | UTC hour start | Build long-range call trend dashboards. |
| `model_call_daily` | Daily model call aggregate | UTC day start | Build long-range call trend dashboards. |
| `model_metrics_1h` | Hourly model metrics aggregate | UTC hour start | Build long-range model metric dashboards. |
| `tenant_model_usage_daily` | Daily tenant-model usage aggregate | UTC day start | Build tenant usage dashboards. |
| `provider_model_usage_daily` | Daily provider-model usage aggregate | UTC day start | Build provider and model-source usage dashboards. |
| `model_instance_statistics` | Instance monitoring data | Metric collection time | Query instance status, CPU, and memory metrics. |
| `model_instance_card_statistics` | Card-level instance monitoring data | Metric collection time | Query accelerator-card metrics. |
| `model_instance_statistics_1h` | Hourly instance monitoring aggregate | Completed UTC hour start | Build instance trend dashboards. |
| `model_instance_card_statistics_1h` | Hourly card-level monitoring aggregate | Completed UTC hour start | Build card-level trend dashboards. |
| `sync_diagnostic` | InfluxDB diagnostic data | Diagnostic write time | Do not use for business dashboards. |

## 4. Field Reference

Each tag and field is listed separately. A required field is marked in the Constraint column.

### 4.1 `tenant_profile_snapshot`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `tenant_id` | Tenant ID | String | - |
| Field | `display_name` | Tenant display name | String | - |
| Field | `admin_user_id` | Tenant administrator user ID | String | - |
| Field | `admin_username` | Tenant administrator username | String | - |
| Field | `tenant_type` | Tenant type: `operator`, `creator`, or `eu` | String | - |
| Field | `is_superadmin` | Whether the tenant is a super-admin tenant | Boolean | - |

### 4.2 `tenant_credit_snapshot`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `tenant_id` | Tenant ID | String | - |
| Field | `credit_balance` | Tenant credit balance | Double | - |
| Field | `biz_scope_id` | Business scope identifier | String | - |
| Field | `category_type` | Account category | String | - |

### 4.3 `tenant_overview_snapshot`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `tenant_id` | Tenant ID | String | - |
| Field | `display_name` | Tenant display name | String | - |
| Field | `admin_username` | Tenant administrator username | String | - |
| Field | `credit_balance` | Tenant credit balance | Double | - |

### 4.4 `model_source_snapshot`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `model_source_id` | Model source or provider ID | String | - |
| Field | `model_source_name` | Model source or provider name | String | - |
| Field | `status` | Current value is `active` | String | - |

### 4.5 `model_snapshot`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `model_id` | Model ID | String | - |
| Tag | `meta_model_author` | Meta-model author identifier | String | - |
| Tag | `model_type` | Normalized model type | String | - |
| Tag | `is_public` | Visibility: `public` or `private` | String | - |
| Tag | `is_aggregated` | Whether the model is aggregated | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_source_id` | Model source or provider ID | String | - |
| Tag | `status` | `online`, `scheduled_offline`, `scheduled_online`, or `offline` | String | - |
| Field | `model_name` | Model name | String | - |
| Field | `provider_name` | Provider name | String | - |
| Field | `source_model_id` | Source model ID | String | - |
| Field | `related_sub_model_ids_csv` | Related sub-model IDs in CSV format | String | - |
| Field | `related_sub_model_count` | Number of related sub-models | Long | - |
| Field | `price_input_tokens` | Input-token unit price | Double | - |
| Field | `price_output_tokens` | Output-token unit price | Double | - |
| Field | `price_input_cache_tokens` | Cached input-token unit price | Double | - |
| Field | `price_output_cache_tokens` | Cached output-token unit price | Double | - |
| Field | `billing_rule_type` | Model billing rule type | Long | - |
| Field | `bill_config` | Billing configuration JSON used to reconstruct the price matrix | String | - |
| Field | `billing_main_block` | Main billing block: `token_billing`, `image_billing`, `character_billing`, `duration_billing`, or `none_token_billing` | String | - |
| Field | `billing_price_matrix` | Complete price matrix JSON | String | - |
| Field | `billing_price_compare_enabled` | Whether price comparison is enabled | Boolean | - |
| Field | `token_cache_enabled` | Whether cached-token pricing is enabled | Boolean | - |
| Field | `token_tier_enabled` | Whether tiered token pricing is enabled | Boolean | - |
| Field | `token_image_enabled` | Whether image-token pricing is enabled | Boolean | - |
| Field | `websearch_billing_enabled` | Whether WebSearch billing is enabled | Boolean | - |
| Field | `billing_unit_price` | Generic unit price for the main billing block | Double | - |
| Field | `billing_original_unit_price` | Generic original unit price | Double | - |
| Field | `billing_unit` | Unit: `per_1m_tokens`, `per_image`, `per_1m_characters`, or `per_second` | String | - |
| Field | `ext_info` | Model extension information | String | - |
| Field | `raw_status_code` | Raw status code | Long | - |

### 4.6 `model_metrics_1m`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `model_id` | Model ID | String | - |
| Tag | `meta_model_author` | Meta-model author identifier | String | - |
| Tag | `model_type` | Model type | String | - |
| Tag | `is_public` | Whether the model is public | String | - |
| Tag | `is_aggregated` | Whether the model is aggregated | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_source_id` | Model source ID | String | - |
| Tag | `provider_name` | Provider name | String | - |
| Tag | `model_source_name` | Model source name | String | - |
| Tag | `model_name` | Model name | String | - |
| Field | `request_count` | Request count | Double | - |
| Field | `error_count` | Error count | Double | - |
| Field | `success_rate` | Success rate | Double | - |
| Field | `input_tokens` | Input token count | Double | - |
| Field | `output_tokens` | Output token count | Double | - |
| Field | `first_token_use_total_ms` | Total time to first token, in milliseconds | Double | - |
| Field | `finish_token_use_total_ms` | Total completion time, in milliseconds | Double | - |
| Field | `first_token_use_avg_ms` | Average time to first token, in milliseconds | Double | - |
| Field | `finish_token_use_avg_ms` | Average completion time, in milliseconds | Double | - |
| Field | `fail_service_error` | Service-error count | Double | - |
| Field | `fail_timeout` | Timeout count | Double | - |
| Field | `fail_balance` | Insufficient-balance count | Double | - |
| Field | `health_status` | Health status aggregate | Double | - |
| Field | `operation` | Write operation type | String | Required |

### 4.7 `model_call_event`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `model_id` | Model ID | String | - |
| Tag | `meta_model_id` | Meta-model ID | String | - |
| Tag | `meta_model_author` | Meta-model author identifier | String | - |
| Tag | `model_type` | Model type | String | - |
| Tag | `is_public` | Visibility | String | - |
| Tag | `is_aggregated` | Whether the model is aggregated | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_source_id` | Model source ID | String | - |
| Tag | `call_tenant_id` | Calling tenant ID | String | - |
| Tag | `call_user_id` | Calling user ID | String | - |
| Tag | `status` | `success`, `rate_limited`, or `fail` | String | - |
| Tag | `error_type` | Error type | String | - |
| Tag | `source` | Call source | String | - |
| Tag | `provider_name` | Provider name | String | - |
| Tag | `model_source_name` | Model source name | String | - |
| Tag | `model_name` | Model name | String | - |
| Tag | `call_tenant_name` | Calling tenant name | String | - |
| Field | `request_id` | Request ID | String | - |
| Field | `call_user_name` | Calling username | String | - |
| Field | `invoke_model_id` | Actually invoked model ID | String | - |
| Field | `related_sub_model_ids_csv` | Related sub-model IDs | String | - |
| Field | `input_tokens` | Input token count | Double | - |
| Field | `output_tokens` | Output token count | Double | - |
| Field | `input_cache_tokens` | Cached input-token count | Double | - |
| Field | `output_cache_tokens` | Cached output-token count | Double | - |
| Field | `first_token_time_ms` | Time to first token, in milliseconds | Double | - |
| Field | `finish_token_time_ms` | Completion time, in milliseconds | Double | - |
| Field | `call_duration_ms` | Total call duration, in milliseconds | Double | - |
| Field | `call_start_time` | Call start time | String | - |
| Field | `call_end_time` | Call end time | String | - |
| Field | `error_message` | Error message | String | - |
| Field | `operation` | Write operation type | String | Required |

### 4.8 `credit_transaction_event`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `transaction_type` | `income` or `deduction` | String | - |
| Tag | `sub_type` | `free` or `charge` | String | - |
| Tag | `model_id` | Model ID | String | - |
| Tag | `meta_model_id` | Meta-model ID | String | - |
| Tag | `meta_model_author` | Meta-model author identifier | String | - |
| Tag | `model_type` | Model type | String | - |
| Tag | `is_public` | Visibility | String | - |
| Tag | `is_aggregated` | Whether the model is aggregated | String | - |
| Tag | `model_source_id` | Model source ID | String | - |
| Tag | `owner_user_id` | Owner user ID | String | - |
| Tag | `owner_tenant_id` | Owner tenant ID | String | - |
| Tag | `caller_user_id` | Calling user ID | String | - |
| Tag | `caller_tenant_id` | Calling tenant ID | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `owner_tenant_name` | Owner tenant name | String | - |
| Tag | `caller_tenant_name` | Calling tenant name | String | - |
| Tag | `provider_name` | Provider name | String | - |
| Tag | `model_source_name` | Model source name | String | - |
| Tag | `model_name` | Model name | String | - |
| Field | `record_id` | Credit record ID | String | - |
| Field | `billing_fact_id` | Stable billing fact ID | String | - |
| Field | `owner_user_name` | Owner username; may be empty | String | - |
| Field | `caller_user_name` | Calling username; may be empty | String | - |
| Field | `input_token_credits` | Credits for input tokens | Double | - |
| Field | `output_token_credits` | Credits for output tokens | Double | - |
| Field | `total_credits` | Total credits | Double | - |
| Field | `deducted_credits` | Credits actually deducted | Double | - |
| Field | `round_off_credits` | Rounded-off credits | Double | - |
| Field | `input_cache_token_credits` | Credits for cached input tokens | Double | - |
| Field | `output_cache_token_credits` | Credits for cached output tokens | Double | - |
| Field | `cache_hit_tokens` | Cached token count | Double | - |
| Field | `total_tokens` | Total token count | Double | - |
| Field | `prompt_tokens` | Input token count | Double | - |
| Field | `completion_tokens` | Output token count | Double | - |
| Field | `pricing_specifications` | Pricing rule description | String | - |
| Field | `pricing_snapshot` | Billing price snapshot JSON | String | - |
| Field | `usage_detail` | Billing usage detail JSON | String | - |
| Field | `free_total_tokens` | Free token count | Double | - |
| Field | `charge_total_tokens` | Billable token count | Double | - |
| Field | `internal_call` | Whether the call is internal | Boolean | - |
| Field | `operation` | Write operation type | String | Required |

### 4.9 `credit_usage_daily`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `product_type` | Current value is `model` | String | - |
| Tag | `product_id` | Product or model ID | String | - |
| Tag | `tenant_id` | Calling tenant ID | String | - |
| Tag | `user_id` | Calling user ID | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `meta_model_id` | Meta-model ID | String | - |
| Tag | `meta_model_author` | Meta-model author identifier | String | - |
| Field | `product_name` | Product or model name | String | - |
| Field | `tenant_name` | Calling tenant name | String | - |
| Field | `user_name` | Calling username | String | - |
| Field | `provider_name` | Provider name | String | - |
| Field | `consume_credits_day` | Cumulative credits consumed today | Double | - |
| Field | `consume_deducted_credits_day` | Cumulative credits actually deducted today | Double | - |
| Field | `consume_round_off_day` | Cumulative rounded-off consumption today | Double | - |
| Field | `income_credits_day` | Cumulative credits earned today | Double | - |
| Field | `income_deducted_credits_day` | Cumulative settled income today | Double | - |
| Field | `income_round_off_day` | Cumulative rounded-off income today | Double | - |
| Field | `active` | Whether this is the current valid point | Boolean | - |

### 4.10 `credit_usage_mtd_daily`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `stat_month` | Statistics month in `YYYY-MM` format | String | - |
| Tag | `product_type` | Current value is `model` | String | - |
| Tag | `product_id` | Product or model ID | String | - |
| Tag | `tenant_id` | Calling tenant ID | String | - |
| Tag | `user_id` | Calling user ID | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `meta_model_id` | Meta-model ID | String | - |
| Tag | `meta_model_author` | Meta-model author identifier | String | - |
| Field | `product_name` | Product or model name | String | - |
| Field | `tenant_name` | Calling tenant name | String | - |
| Field | `user_name` | Calling username | String | - |
| Field | `provider_name` | Provider name | String | - |
| Field | `consume_credits_mtd` | Cumulative credits consumed in the month | Double | - |
| Field | `consume_deducted_credits_mtd` | Cumulative credits actually deducted in the month | Double | - |
| Field | `consume_round_off_mtd` | Cumulative rounded-off consumption in the month | Double | - |
| Field | `income_credits_mtd` | Cumulative credits earned in the month | Double | - |
| Field | `income_deducted_credits_mtd` | Cumulative settled income in the month | Double | - |
| Field | `income_round_off_mtd` | Cumulative rounded-off income in the month | Double | - |
| Field | `active` | Whether this is the current valid point | Boolean | - |

### 4.11 `model_call_1h`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `model_id` | Model ID | String | - |
| Tag | `meta_model_id` | Meta-model ID | String | - |
| Tag | `meta_model_author` | Meta-model author | String | - |
| Tag | `model_type` | Model type | String | - |
| Tag | `is_public` | Whether the model is public | String | - |
| Tag | `is_aggregated` | Whether the model is aggregated | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_source_id` | Model source ID | String | - |
| Tag | `call_tenant_id` | Calling tenant ID | String | - |
| Tag | `status` | `success`, `rate_limited`, or `fail` | String | - |
| Tag | `error_type` | Error type | String | - |
| Tag | `source` | Call source | String | - |
| Tag | `provider_name` | Provider name | String | - |
| Tag | `model_source_name` | Model source name | String | - |
| Tag | `model_name` | Model name | String | - |
| Tag | `call_tenant_name` | Calling tenant name | String | - |
| Field | `request_count` | Request count | Double | - |
| Field | `success_count` | Successful request count | Double | - |
| Field | `error_count` | Non-success count | Double | - |
| Field | `rate_limited_count` | Rate-limited request count | Double | - |
| Field | `fail_count` | Ordinary failure count | Double | - |
| Field | `success_rate` | Success rate | Double | - |
| Field | `input_tokens` | Total input tokens | Double | - |
| Field | `output_tokens` | Total output tokens | Double | - |
| Field | `input_cache_tokens` | Total cached input tokens | Double | - |
| Field | `output_cache_tokens` | Total cached output tokens | Double | - |
| Field | `avg_first_token_time_ms` | Average time to first token | Double | - |
| Field | `avg_finish_token_time_ms` | Average completion time | Double | - |
| Field | `avg_call_duration_ms` | Average call duration | Double | - |

### 4.12 `model_call_daily`

The fields are the same as `model_call_1h`, with the addition of the following tag:

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `stat_date` | Statistics date | String | - |

### 4.13 `model_metrics_1h`

The dimensions and fields are the same as `model_metrics_1m`, except that the values are aggregated by UTC hour. The metric fields are:

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Field | `request_count` | Request count | Double | - |
| Field | `success_count` | Successful request count | Double | - |
| Field | `error_count` | Error count | Double | - |
| Field | `success_rate` | Success rate | Double | - |
| Field | `input_tokens` | Total input tokens | Double | - |
| Field | `output_tokens` | Total output tokens | Double | - |
| Field | `first_token_use_total_ms` | Total time to first token | Double | - |
| Field | `finish_token_use_total_ms` | Total completion time | Double | - |
| Field | `first_token_use_avg_ms` | Average time to first token | Double | - |
| Field | `finish_token_use_avg_ms` | Average completion time | Double | - |
| Field | `fail_service_error` | Service-error count | Double | - |
| Field | `fail_timeout` | Timeout count | Double | - |
| Field | `fail_balance` | Insufficient-balance count | Double | - |
| Field | `health_status` | Health status aggregate | Double | - |

### 4.14 `tenant_model_usage_daily`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `stat_date` | Statistics date | String | - |
| Tag | `tenant_id` | Calling tenant ID | String | - |
| Tag | `model_id` | Model ID | String | - |
| Tag | `meta_model_id` | Meta-model ID | String | - |
| Tag | `meta_model_author` | Meta-model author | String | - |
| Tag | `model_type` | Model type | String | - |
| Tag | `is_public` | Whether the model is public | String | - |
| Tag | `is_aggregated` | Whether the model is aggregated | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_source_id` | Model source ID | String | - |
| Tag | `tenant_name` | Tenant name | String | - |
| Tag | `provider_name` | Provider name | String | - |
| Tag | `model_source_name` | Model source name | String | - |
| Tag | `model_name` | Model name | String | - |
| Field | `request_count` | Request count | Double | - |
| Field | `success_count` | Successful request count | Double | - |
| Field | `error_count` | Non-success count | Double | - |
| Field | `rate_limited_count` | Rate-limited request count | Double | - |
| Field | `fail_count` | Ordinary failure count | Double | - |
| Field | `success_rate` | Success rate | Double | - |
| Field | `input_tokens` | Total input tokens | Double | - |
| Field | `output_tokens` | Total output tokens | Double | - |
| Field | `input_cache_tokens` | Total cached input tokens | Double | - |
| Field | `output_cache_tokens` | Total cached output tokens | Double | - |
| Field | `avg_first_token_time_ms` | Average time to first token | Double | - |
| Field | `avg_finish_token_time_ms` | Average completion time | Double | - |
| Field | `avg_call_duration_ms` | Average call duration | Double | - |

### 4.15 `provider_model_usage_daily`

This measurement uses provider dimensions instead of tenant dimensions. Its metric fields are:

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `stat_date` | Statistics date | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_id` | Model ID | String | - |
| Tag | `meta_model_id` | Meta-model ID | String | - |
| Tag | `meta_model_author` | Meta-model author | String | - |
| Tag | `model_type` | Model type | String | - |
| Tag | `is_public` | Whether the model is public | String | - |
| Tag | `is_aggregated` | Whether the model is aggregated | String | - |
| Tag | `model_source_id` | Model source ID | String | - |
| Tag | `provider_name` | Provider name | String | - |
| Tag | `model_source_name` | Model source name | String | - |
| Tag | `model_name` | Model name | String | - |
| Field | `request_count` | Request count | Double | - |
| Field | `success_count` | Successful request count | Double | - |
| Field | `error_count` | Error count | Double | - |
| Field | `success_rate` | Success rate | Double | - |
| Field | `input_tokens` | Total input tokens | Double | - |
| Field | `output_tokens` | Total output tokens | Double | - |
| Field | `first_token_use_total_ms` | Total time to first token | Double | - |
| Field | `finish_token_use_total_ms` | Total completion time | Double | - |
| Field | `first_token_use_avg_ms` | Average time to first token | Double | - |
| Field | `finish_token_use_avg_ms` | Average completion time | Double | - |
| Field | `fail_service_error` | Service-error count | Double | - |
| Field | `fail_timeout` | Timeout count | Double | - |
| Field | `fail_balance` | Insufficient-balance count | Double | - |
| Field | `health_status` | Health status aggregate | Double | - |

### 4.16 `model_instance_statistics`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `related_model_id` | Related model ID | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_instance_id` | Model instance ID | String | - |
| Tag | `deploy_mode` | `single_instance`, `multi_instance`, or `cluster` | String | - |
| Tag | `is_cluster` | `true` for cluster mode; otherwise `false` | String | - |
| Tag | `type` | Metric source type identifier | String | - |
| Field | `related_model_name` | Related model name | String | - |
| Field | `provider_tenant_name` | Provider tenant name | String | - |
| Field | `model_instance_name` | Model instance name | String | - |
| Field | `flavor_cpu` | CPU specification | Double | - |
| Field | `flavor_mem` | Memory specification | Double | - |
| Field | `flavor_ai_card` | Accelerator-card specification | Double | - |
| Field | `flavor_ai_card_type` | Accelerator-card type | String | - |
| Field | `status` | Instance status value | Double | - |
| Field | `cpu_util` | Raw CPU utilization; no automatic unit conversion | Double | - |
| Field | `mem_util` | Raw memory utilization; no automatic unit conversion | Double | - |

`status`, `cpu_util`, and `mem_util` are merged by timestamp. A point may contain only some of these fields.

### 4.17 `model_instance_card_statistics`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `related_model_id` | Related model ID | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_instance_id` | Model instance ID | String | - |
| Tag | `card_no` | Card number, for example `nvidia0` | String | - |
| Tag | `deploy_mode` | `single_instance`, `multi_instance`, or `cluster` | String | - |
| Tag | `is_cluster` | `true` for cluster mode; otherwise `false` | String | - |
| Tag | `type` | Metric source type identifier | String | - |
| Field | `related_model_name` | Related model name | String | - |
| Field | `provider_tenant_name` | Provider tenant name | String | - |
| Field | `model_instance_name` | Model instance name | String | - |
| Field | `xpu_util` | Raw accelerator utilization; no automatic unit conversion | Double | - |
| Field | `xpu_mem_util` | Raw accelerator-memory utilization; no automatic unit conversion | Double | - |
| Field | `xpu_gpu_power_usage` | Raw GPU power usage; no automatic unit conversion | Double | - |
| Field | `xpu_gpu_temperature` | Raw GPU temperature; no automatic unit conversion | Double | - |

Different metrics for the same timestamp and `card_no` are merged into one point.

### 4.18 `model_instance_statistics_1h`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `related_model_id` | Related model ID | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_instance_id` | Model instance ID | String | - |
| Tag | `deploy_mode` | `single_instance`, `multi_instance`, or `cluster` | String | - |
| Tag | `is_cluster` | `true` for cluster mode; otherwise `false` | String | - |
| Tag | `type` | Metric source type identifier | String | - |
| Tag | `meta_model_id` | Meta-model ID | String | - |
| Field | `related_model_name` | Related model name | String | - |
| Field | `provider_tenant_name` | Provider tenant name | String | - |
| Field | `model_instance_name` | Model instance name | String | - |
| Field | `flavor_cpu` | CPU specification | Double | - |
| Field | `flavor_mem` | Memory specification | Double | - |
| Field | `flavor_ai_card` | Accelerator-card specification | Double | - |
| Field | `flavor_ai_card_type` | Accelerator-card type | String | - |
| Field | `status_last` | Last finite status value in the completed UTC hour | Double | - |
| Field | `cpu_util_avg` | Average CPU utilization in the completed UTC hour | Double | - |
| Field | `cpu_util_max` | Maximum CPU utilization in the completed UTC hour | Double | - |
| Field | `mem_util_avg` | Average memory utilization in the completed UTC hour | Double | - |
| Field | `mem_util_max` | Maximum memory utilization in the completed UTC hour | Double | - |
| Field | `sample_count` | Number of distinct valid sample timestamps in the hour | Long | - |

### 4.19 `model_instance_card_statistics_1h`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `related_model_id` | Related model ID | String | - |
| Tag | `provider_tenant_id` | Provider tenant ID | String | - |
| Tag | `model_instance_id` | Model instance ID | String | - |
| Tag | `card_no` | Card number, for example `nvidia0` | String | - |
| Tag | `deploy_mode` | `single_instance`, `multi_instance`, or `cluster` | String | - |
| Tag | `is_cluster` | `true` for cluster mode; otherwise `false` | String | - |
| Tag | `type` | Metric source type identifier | String | - |
| Tag | `meta_model_id` | Meta-model ID | String | - |
| Field | `related_model_name` | Related model name | String | - |
| Field | `provider_tenant_name` | Provider tenant name | String | - |
| Field | `model_instance_name` | Model instance name | String | - |
| Field | `xpu_util_avg` | Average accelerator utilization in the completed UTC hour | Double | - |
| Field | `xpu_util_max` | Maximum accelerator utilization in the completed UTC hour | Double | - |
| Field | `xpu_mem_util_avg` | Average accelerator-memory utilization in the completed UTC hour | Double | - |
| Field | `xpu_mem_util_max` | Maximum accelerator-memory utilization in the completed UTC hour | Double | - |
| Field | `xpu_gpu_power_usage_avg` | Average GPU power usage in the completed UTC hour | Double | - |
| Field | `xpu_gpu_power_usage_max` | Maximum GPU power usage in the completed UTC hour | Double | - |
| Field | `xpu_gpu_temperature_avg` | Average GPU temperature in the completed UTC hour | Double | - |
| Field | `xpu_gpu_temperature_max` | Maximum GPU temperature in the completed UTC hour | Double | - |
| Field | `sample_count` | Number of distinct valid sample timestamps for the card in the hour | Long | - |

### 4.20 `sync_diagnostic`

| Category | Field | Description | Type | Constraint |
| --- | --- | --- | --- | --- |
| Tag | `diag_id` | Diagnostic ID | String | Required |
| Tag | `purpose` | Diagnostic purpose | String | - |
| Field | `value` | Diagnostic value | Double | - |
| Field | `stage` | Diagnostic stage | String | - |

## 5. Query Constraints

- Use UTC ISO-8601 for all time parameters, for example `2026-04-29T04:06:15Z`.
- Business queries against `credit_usage_daily` and `credit_usage_mtd_daily` must include `active = true`.
- These measurements are credit-usage aggregates. Confirm the business rules before using them as settlement amounts.
- Do not use unfiltered `COUNT(*)`, `last(*)`, or dimension scans as credit-usage metrics.
- For long time ranges, prefer the hourly or daily aggregate measurements in Grafana.
- If an aggregate query does not select `time`, do not add `ORDER BY time`.
- Raw `model_instance_*` values are not automatically unit-converted. Confirm the metric scale before setting thresholds or displaying units.
- `model_instance_statistics.status` and `status_last` are metric values, not business status codes.
- `model_instance_statistics_1h` and `model_instance_card_statistics_1h` contain only completed UTC hour buckets.
- `sample_count` is the number of distinct timestamps after merging related metrics. It is not the sample count of one individual metric.
- InfluxDB point identity is determined by the measurement, all tags, and the timestamp. Retrying the same identity overwrites the existing point.

## 6. SQL Examples

```sql
-- Daily credit usage; active points are required
SELECT tenant_id, user_id, product_id,
       SUM(consume_credits_day) AS consume_credits_day,
       SUM(income_credits_day) AS income_credits_day
FROM credit_usage_daily
WHERE active = true
  AND time >= TIMESTAMP '2026-04-01T00:00:00Z'
  AND time <  TIMESTAMP '2026-04-02T00:00:00Z'
GROUP BY tenant_id, user_id, product_id;
```

```sql
-- Month-to-date credit usage; active points are required
SELECT tenant_id, user_id, product_id,
       SUM(consume_credits_mtd) AS consume_credits_mtd,
       SUM(income_credits_mtd) AS income_credits_mtd
FROM credit_usage_mtd_daily
WHERE active = true
  AND stat_month = '2026-04'
GROUP BY tenant_id, user_id, product_id;
```

```sql
-- Prefer aggregate measurements for long-range dashboards
SELECT stat_date, model_id,
       SUM(request_count) AS request_count,
       SUM(error_count) AS error_count
FROM model_call_daily
WHERE time >= TIMESTAMP '2026-04-01T00:00:00Z'
  AND time <  TIMESTAMP '2026-05-01T00:00:00Z'
GROUP BY stat_date, model_id
ORDER BY stat_date;
```

```sql
-- Limit the time range when inspecting call details
SELECT time, request_id, model_id, call_tenant_id, status, error_type, error_message
FROM model_call_event
WHERE time >= TIMESTAMP '2026-04-29T00:00:00Z'
  AND time <  TIMESTAMP '2026-04-30T00:00:00Z'
ORDER BY time DESC
LIMIT 100;
```

```sql
-- Check whether instance metrics exist for each deployment mode
SELECT deploy_mode,
       COUNT(*) AS point_count,
       MAX(time) AS latest_time
FROM model_instance_statistics
WHERE time >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
GROUP BY deploy_mode
ORDER BY deploy_mode;
```

```sql
-- View recent instance metrics and model associations
SELECT time,
       model_instance_id,
       deploy_mode,
       is_cluster,
       related_model_id,
       status,
       cpu_util,
       mem_util
FROM model_instance_statistics
WHERE time >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
ORDER BY time DESC
LIMIT 100;
```

```sql
-- View recent card-level metrics
SELECT time,
       model_instance_id,
       card_no,
       deploy_mode,
       xpu_util,
       xpu_mem_util,
       xpu_gpu_power_usage,
       xpu_gpu_temperature
FROM model_instance_card_statistics
WHERE time >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
ORDER BY time DESC
LIMIT 100;
```

```sql
-- View completed hourly instance buckets
SELECT time,
       model_instance_id,
       deploy_mode,
       status_last,
       cpu_util_avg,
       cpu_util_max,
       mem_util_avg,
       mem_util_max,
       sample_count
FROM model_instance_statistics_1h
WHERE time >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
ORDER BY time DESC
LIMIT 100;
```

```sql
-- View completed hourly card-level buckets
SELECT time,
       model_instance_id,
       card_no,
       deploy_mode,
       xpu_util_avg,
       xpu_util_max,
       xpu_mem_util_avg,
       xpu_mem_util_max,
       xpu_gpu_power_usage_avg,
       xpu_gpu_power_usage_max,
       xpu_gpu_temperature_avg,
       xpu_gpu_temperature_max,
       sample_count
FROM model_instance_card_statistics_1h
WHERE time >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
ORDER BY time DESC
LIMIT 100;
```
