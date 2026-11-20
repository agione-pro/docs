# Metis InfluxDB 数据字典

:::: info 文档信息
版本：v1.0
更新日期：2026-09-11
::::

> 本文面向第三方在 Grafana 中查询 InfluxDB 数据并生成统计图表。文中的 measurement、tag、field 定义及查询示例以当前实际可用的数据为准。配置中的 endpoint、token、账号密码等敏感值不在本文展开。

## 1. 接入参数

| 项 | 值 |
| --- | --- |
| Endpoint | 按环境配置 `metis.sync.influx.url` |
| Query Path | `/api/v3/query_sql` |
| Database | 按环境配置 `metis.sync.influx.database` |
| 查询精度 | nanosecond |

## 2. 通用约定

| 项 | 说明 |
| --- | --- |
| 统一时间列 | InfluxDB SQL 查询统一使用 `time`；写入端通过 line protocol timestamp 写入时间。 |
| 查询语言 | InfluxDB 3 SQL。 |
| Snapshot 类 measurement | `time` 为当前快照批次时间。 |
| 事件类 measurement | `time` 为业务事件时间。 |
| 累计类 measurement | `credit_usage_daily`、`credit_usage_mtd_daily` 可能包含失效记录；业务查询必须过滤 `active = true`。 |
| 聚合查询约定 | 如果查询只返回聚合结果且未选择 `time`，不要再按 `time` 排序。 |
| 维度类型 | Tag 均按字符串写入；`is_public`、`is_aggregated` 等布尔语义维度也是 String Tag。 |
| 可选列 | 写入端不会把无值字段写成空字符串或显式 `NULL`；查询结果中列缺失表示该点没有写入该 Tag / Field。 |

## 2.1 实例监控说明

实例监控 measurement 提供实例级、卡级和小时聚合数据。`deploy_mode` 用于区分单实例、多实例和集群部署；`is_cluster` 为字符串 Tag，值为 `true` 或 `false`。原始监控数值按采集端返回值保存，不自动换算单位。

## 3. Measurement 总览

| Measurement | 说明 | time 语义 | Grafana 使用建议 |
| --- | --- | --- | --- |
| `tenant_profile_snapshot` | 租户资料快照 | 当前快照批次时间 | 查询最新租户资料。 |
| `tenant_credit_snapshot` | 租户积分余额快照 | 当前快照批次时间 | 查询租户积分余额。 |
| `tenant_overview_snapshot` | 租户总览快照 | 当前快照批次时间 | 查询租户资料和积分余额。 |
| `model_source_snapshot` | 供应商快照 | 当前快照批次时间 | 查询模型来源信息。 |
| `model_snapshot` | 模型快照 | 当前快照批次时间 | 查询模型、状态、价格和计费配置。 |
| `model_metrics_1m` | 模型分钟指标事实 | 指标采集时间 | 查询短时间范围的模型指标。 |
| `model_call_event` | 模型调用明细事件 | 调用事件时间 | 查询调用明细和错误排障。 |
| `credit_transaction_event` | 模型账务明细事件 | 账务事件时间 | 查询积分交易明细。 |
| `credit_usage_daily` | 每日积分用量汇总 | UTC 日期 00:00:00 | 查询每日积分用量，必须过滤 `active = true`。 |
| `credit_usage_mtd_daily` | 月累计积分用量汇总 | UTC 日期 00:00:00 | 查询月累计积分用量，必须过滤 `active = true`。 |
| `model_call_1h` | 模型调用小时聚合 | UTC 小时桶起点 | 长时间范围的调用趋势看板。 |
| `model_call_daily` | 模型调用日聚合 | UTC 日期 00:00:00 | 长时间范围的调用趋势看板。 |
| `model_metrics_1h` | 模型指标小时聚合 | UTC 小时桶起点 | 长时间范围的模型指标看板。 |
| `tenant_model_usage_daily` | 租户模型用量日聚合 | UTC 日期 00:00:00 | 租户维度的用量看板。 |
| `provider_model_usage_daily` | 发布方模型用量日聚合 | UTC 日期 00:00:00 | 发布方和模型来源维度的用量看板。 |
| `model_instance_statistics` | 模型实例监控事实 | 指标采集时间 | 查询实例状态、CPU 和内存指标。 |
| `model_instance_card_statistics` | 模型实例卡级监控事实 | 指标采集时间 | 查询卡级 XPU 指标。 |
| `model_instance_statistics_1h` | 模型实例监控小时聚合 | 已完成 UTC 小时桶起点 | 查询实例小时趋势。 |
| `model_instance_card_statistics_1h` | 模型实例卡级监控小时聚合 | 已完成 UTC 小时桶起点 | 查询卡级小时趋势。 |
| `sync_diagnostic` | InfluxDB 诊断数据 | 诊断写入时间 | 不建议用于业务看板。 |

## 4. 字段清单

Tag 和 Field 均拆成单字段明细行；“约束”中标注必填的字段由写入端强校验。字段说明按当前代码的写入来源与业务语义整理。

### 4.1 `tenant_profile_snapshot`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `tenant_id` | 租户 ID | String | - |
| Field | `display_name` | 租户展示名称，优先 `tenant_show_name`，否则取 `name` | String | - |
| Field | `admin_user_id` | 租户管理员用户 ID | String | - |
| Field | `admin_username` | 租户管理员用户名 | String | - |
| Field | `tenant_type` | 租户类型，当前值域为 `operator` / `creator` / `eu` | String | - |
| Field | `is_superadmin` | 是否超级管理员租户 | Boolean | - |

### 4.2 `tenant_credit_snapshot`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `tenant_id` | 租户 ID | String | - |
| Field | `credit_balance` | 租户积分余额 | Double | - |
| Field | `biz_scope_id` | 业务范围标识 | String | - |
| Field | `category_type` | 账户分类类型 | String | - |

### 4.3 `tenant_overview_snapshot`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `tenant_id` | 租户 ID | String | - |
| Field | `display_name` | 租户展示名称 | String | - |
| Field | `admin_username` | 租户管理员用户名 | String | - |
| Field | `credit_balance` | 租户积分余额 | Double | - |

### 4.4 `model_source_snapshot`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `model_source_id` | 模型来源/供应商 ID | String | - |
| Field | `model_source_name` | 模型来源/供应商名称 | String | - |
| Field | `status` | 当前代码写入值固定为 `active` | String | - |

### 4.5 `model_snapshot`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `model_id` | 模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者标识 | String | - |
| Tag | `model_type` | 模型类型，按版本类型标准化后输出 | String | - |
| Tag | `is_public` | 可见性，当前值域为 `public` / `private` | String | - |
| Tag | `is_aggregated` | 是否聚合模型 | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `model_source_id` | 模型来源/供应商 ID | String | - |
| Tag | `status` | 当前值域为 `online` / `scheduled_offline` / `scheduled_online` / `offline` | String | - |
| Field | `model_name` | 模型名称 | String | - |
| Field | `provider_name` | 发布方名称 | String | - |
| Field | `source_model_id` | 来源模型 ID | String | - |
| Field | `related_sub_model_ids_csv` | 关联子模型 ID 列表，CSV 形式 | String | - |
| Field | `related_sub_model_count` | 关联子模型数量 | Long | - |
| Field | `price_input_tokens` | 输入 token 单价；旧字段为空时从 `bill_config.token_billing.price_matrix[0].prices.input.unit_price` 解析 | Double | - |
| Field | `price_output_tokens` | 输出 token 单价；旧字段为空时从 `bill_config.token_billing.price_matrix[0].prices.output.unit_price` 解析 | Double | - |
| Field | `price_input_cache_tokens` | 输入缓存命中 token 单价；旧字段为空时从 `bill_config.token_billing.price_matrix[0].prices.cache_hit_input.unit_price` 解析 | Double | - |
| Field | `price_output_cache_tokens` | 输出缓存 token 单价；仅在 `bill_config` 中存在对应价格节点时写入 | Double | - |
| Field | `billing_rule_type` | 模型计费规则类型 | Long | - |
| Field | `bill_config` | 模型计费配置 JSON；用于还原价格矩阵 | String | - |
| Field | `billing_main_block` | `bill_config` 主计费块：`token_billing` / `image_billing` / `character_billing` / `duration_billing` / `none_token_billing` | String | - |
| Field | `billing_price_matrix` | 主计费块的 `price_matrix` JSON，保留完整矩阵用于排查不同条件命中的价格 | String | - |
| Field | `billing_price_compare_enabled` | 是否开启价格对比，来自根节点或主计费块 `price_compare_enabled` | Boolean | - |
| Field | `token_cache_enabled` | token 计费是否启用缓存命中价格 | Boolean | - |
| Field | `token_tier_enabled` | token 计费是否启用阶梯价格 | Boolean | - |
| Field | `token_image_enabled` | token 计费是否区分图片 token 价格 | Boolean | - |
| Field | `websearch_billing_enabled` | 是否包含 WebSearch 附加计费块 | Boolean | - |
| Field | `billing_unit_price` | 主计费块第一档的通用单价，适用于 image / character / duration / 简单 token 等顶层 `unit_price` 场景 | Double | - |
| Field | `billing_original_unit_price` | 主计费块第一档的通用原价，来自顶层 `original_unit_price` | Double | - |
| Field | `billing_unit` | 单价单位：`per_1m_tokens` / `per_image` / `per_1m_characters` / `per_second` | String | - |
| Field | `ext_info` | 模型扩展信息 | String | - |
| Field | `raw_status_code` | 原始状态码 | Long | - |

### 4.6 `model_metrics_1m`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `model_id` | 模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者标识 | String | - |
| Tag | `model_type` | 模型类型 | String | - |
| Tag | `is_public` | 可见性 | String | - |
| Tag | `is_aggregated` | 是否聚合模型 | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `model_source_id` | 模型来源/供应商 ID | String | - |
| Tag | `provider_name` | 发布方名称 | String | - |
| Tag | `model_source_name` | 模型来源/供应商名称 | String | - |
| Tag | `model_name` | 模型名称 | String | - |
| Field | `request_count` | 请求数 | Double | - |
| Field | `error_count` | 错误数 | Double | - |
| Field | `success_rate` | 成功率 | Double | - |
| Field | `input_tokens` | 输入 token 数 | Double | - |
| Field | `output_tokens` | 输出 token 数 | Double | - |
| Field | `first_token_use_total_ms` | 首 token 总耗时（毫秒） | Double | - |
| Field | `finish_token_use_total_ms` | 完成总耗时（毫秒） | Double | - |
| Field | `first_token_use_avg_ms` | 首 token 平均耗时（毫秒） | Double | - |
| Field | `finish_token_use_avg_ms` | 完成平均耗时（毫秒） | Double | - |
| Field | `fail_service_error` | 服务错误数 | Double | - |
| Field | `fail_timeout` | 超时错误数 | Double | - |
| Field | `fail_balance` | 余额不足错误数 | Double | - |
| Field | `health_status` | 健康状态；回填场景固定写 `1` | Double | - |
| Field | `operation` | 写入操作类型 | String | 必填 |

### 4.7 `model_call_event`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `model_id` | 模型 ID | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者标识 | String | - |
| Tag | `model_type` | 模型类型 | String | - |
| Tag | `is_public` | 可见性 | String | - |
| Tag | `is_aggregated` | 是否聚合模型 | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `model_source_id` | 模型来源/供应商 ID | String | - |
| Tag | `call_tenant_id` | 调用方租户 ID | String | - |
| Tag | `call_user_id` | 调用方用户 ID | String | - |
| Tag | `status` | 当前值域为 `success` / `rate_limited` / `fail` | String | - |
| Tag | `error_type` | 错误类型；限流场景写为 `rate_limited` | String | - |
| Tag | `source` | 调用来源 | String | - |
| Tag | `provider_name` | 发布方名称 | String | - |
| Tag | `model_source_name` | 模型来源/供应商名称 | String | - |
| Tag | `model_name` | 模型名称 | String | - |
| Tag | `call_tenant_name` | 调用方租户名称 | String | - |
| Field | `request_id` | 请求 ID | String | - |
| Field | `call_user_name` | 调用方用户名 | String | - |
| Field | `invoke_model_id` | 实际调用模型 ID | String | - |
| Field | `related_sub_model_ids_csv` | 关联子模型 ID 列表 | String | - |
| Field | `input_tokens` | 输入 token 数 | Double | - |
| Field | `output_tokens` | 输出 token 数 | Double | - |
| Field | `input_cache_tokens` | 输入缓存 token 数 | Double | - |
| Field | `output_cache_tokens` | 输出缓存 token 数 | Double | - |
| Field | `first_token_time_ms` | 首 token 耗时（毫秒） | Double | - |
| Field | `finish_token_time_ms` | 完成耗时（毫秒） | Double | - |
| Field | `call_duration_ms` | 调用总耗时（毫秒） | Double | - |
| Field | `call_start_time` | 调用开始时间 | String | - |
| Field | `call_end_time` | 调用结束时间 | String | - |
| Field | `error_message` | 错误信息 | String | - |
| Field | `operation` | 写入操作类型 | String | 必填 |

### 4.8 `credit_transaction_event`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `transaction_type` | 当前值域为 `income` / `deduction` | String | - |
| Tag | `sub_type` | 当前值域为 `free` / `charge` | String | - |
| Tag | `model_id` | 模型 ID | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者标识 | String | - |
| Tag | `model_type` | 模型类型 | String | - |
| Tag | `is_public` | 可见性 | String | - |
| Tag | `is_aggregated` | 是否聚合模型 | String | - |
| Tag | `model_source_id` | 模型来源/供应商 ID | String | - |
| Tag | `owner_user_id` | 原始主体用户 ID | String | - |
| Tag | `owner_tenant_id` | 原始主体租户 ID | String | - |
| Tag | `caller_user_id` | 实际调用方用户 ID | String | - |
| Tag | `caller_tenant_id` | 实际调用方租户 ID | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `owner_tenant_name` | 原始主体租户名称 | String | - |
| Tag | `caller_tenant_name` | 实际调用方租户名称 | String | - |
| Tag | `provider_name` | 发布方名称 | String | - |
| Tag | `model_source_name` | 模型来源/供应商名称 | String | - |
| Tag | `model_name` | 模型名称 | String | - |
| Field | `record_id` | 账务记录 ID | String | - |
| Field | `billing_fact_id` | 稳定计费事实 ID，用于 billing/financial 幂等排查 | String | - |
| Field | `owner_user_name` | 原始主体用户名；当前版本中可能为空 | String | - |
| Field | `caller_user_name` | 实际调用方用户名；当前版本中可能为空 | String | - |
| Field | `input_token_credits` | 输入 token 对应积分 | Double | - |
| Field | `output_token_credits` | 输出 token 对应积分 | Double | - |
| Field | `total_credits` | 总积分 | Double | - |
| Field | `deducted_credits` | 实际扣减积分 | Double | - |
| Field | `round_off_credits` | 抹零积分 | Double | - |
| Field | `input_cache_token_credits` | 输入缓存 token 对应积分 | Double | - |
| Field | `output_cache_token_credits` | 输出缓存 token 对应积分 | Double | - |
| Field | `cache_hit_tokens` | 缓存命中 token 数 | Double | - |
| Field | `total_tokens` | 总 token 数 | Double | - |
| Field | `prompt_tokens` | 输入 token 数 | Double | - |
| Field | `completion_tokens` | 输出 token 数 | Double | - |
| Field | `pricing_specifications` | 计价规则说明 | String | - |
| Field | `pricing_snapshot` | 计费价格快照 JSON | String | - |
| Field | `usage_detail` | 计费用量明细 JSON | String | - |
| Field | `free_total_tokens` | 免费 token 数 | Double | - |
| Field | `charge_total_tokens` | 计费 token 数 | Double | - |
| Field | `internal_call` | 是否内部调用 | Boolean | - |
| Field | `operation` | 写入操作类型 | String | 必填 |

### 4.9 `credit_usage_daily`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `product_type` | 当前代码写入值固定为 `model` | String | - |
| Tag | `product_id` | 产品/模型 ID | String | - |
| Tag | `tenant_id` | 调用方租户 ID | String | - |
| Tag | `user_id` | 调用方用户 ID | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者标识 | String | - |
| Field | `product_name` | 产品/模型名称 | String | - |
| Field | `tenant_name` | 调用方租户名称 | String | - |
| Field | `user_name` | 调用方用户名 | String | - |
| Field | `provider_name` | 发布方名称 | String | - |
| Field | `consume_credits_day` | 当日累计消耗积分 | Double | - |
| Field | `consume_deducted_credits_day` | 当日累计实际扣减积分 | Double | - |
| Field | `consume_round_off_day` | 当日累计抹零积分 | Double | - |
| Field | `income_credits_day` | 当日累计收益积分 | Double | - |
| Field | `income_deducted_credits_day` | 当日累计实际结算收益 | Double | - |
| Field | `income_round_off_day` | 当日累计收益抹零积分 | Double | - |
| Field | `active` | 是否为当前有效点；repair 失效旧点时写 `false` | Boolean | - |

### 4.10 `credit_usage_mtd_daily`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `stat_month` | 统计月份，格式 `YYYY-MM` | String | - |
| Tag | `product_type` | 当前代码写入值固定为 `model` | String | - |
| Tag | `product_id` | 产品/模型 ID | String | - |
| Tag | `tenant_id` | 调用方租户 ID | String | - |
| Tag | `user_id` | 调用方用户 ID | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者标识 | String | - |
| Field | `product_name` | 产品/模型名称 | String | - |
| Field | `tenant_name` | 调用方租户名称 | String | - |
| Field | `user_name` | 调用方用户名 | String | - |
| Field | `provider_name` | 发布方名称 | String | - |
| Field | `consume_credits_mtd` | 截至当前点的当月累计消耗积分 | Double | - |
| Field | `consume_deducted_credits_mtd` | 截至当前点的当月累计实际扣减积分 | Double | - |
| Field | `consume_round_off_mtd` | 截至当前点的当月累计抹零积分 | Double | - |
| Field | `income_credits_mtd` | 截至当前点的当月累计收益积分 | Double | - |
| Field | `income_deducted_credits_mtd` | 截至当前点的当月累计实际结算收益 | Double | - |
| Field | `income_round_off_mtd` | 截至当前点的当月累计收益抹零积分 | Double | - |
| Field | `active` | 是否为当前有效点；repair 失效旧点时写 `false` | Boolean | - |

### 4.11 `model_call_1h`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `model_id` | 模型 ID | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者 | String | - |
| Tag | `model_type` | 模型类型 | String | - |
| Tag | `is_public` | 是否公开 | String | - |
| Tag | `is_aggregated` | 是否聚合模型 | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `model_source_id` | 模型来源 ID | String | - |
| Tag | `call_tenant_id` | 调用方租户 ID | String | - |
| Tag | `status` | `success` / `rate_limited` / `fail` | String | - |
| Tag | `error_type` | 错误类型 | String | - |
| Tag | `source` | 调用来源 | String | - |
| Tag | `provider_name` | 发布方名称 | String | - |
| Tag | `model_source_name` | 模型来源名称 | String | - |
| Tag | `model_name` | 模型名称 | String | - |
| Tag | `call_tenant_name` | 调用方租户名称 | String | - |
| Field | `request_count` | 请求数 | Double | - |
| Field | `success_count` | 成功数 | Double | - |
| Field | `error_count` | 非成功数 | Double | - |
| Field | `rate_limited_count` | 限流数 | Double | - |
| Field | `fail_count` | 普通失败数 | Double | - |
| Field | `success_rate` | 成功率 | Double | - |
| Field | `input_tokens` | 输入 token 总数 | Double | - |
| Field | `output_tokens` | 输出 token 总数 | Double | - |
| Field | `input_cache_tokens` | 输入缓存 token 总数 | Double | - |
| Field | `output_cache_tokens` | 输出缓存 token 总数，当前源缺失时为 `0` | Double | - |
| Field | `avg_first_token_time_ms` | 平均首 token 时间 | Double | - |
| Field | `avg_finish_token_time_ms` | 平均完成 token 时间 | Double | - |
| Field | `avg_call_duration_ms` | 平均调用耗时 | Double | - |

### 4.12 `model_call_daily`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `stat_date` | 统计日期 | String | - |
| Tag | `model_id` | 模型 ID | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者 | String | - |
| Tag | `model_type` | 模型类型 | String | - |
| Tag | `is_public` | 是否公开 | String | - |
| Tag | `is_aggregated` | 是否聚合模型 | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `model_source_id` | 模型来源 ID | String | - |
| Tag | `call_tenant_id` | 调用方租户 ID | String | - |
| Tag | `status` | `success` / `rate_limited` / `fail` | String | - |
| Tag | `error_type` | 错误类型 | String | - |
| Tag | `source` | 调用来源 | String | - |
| Tag | `provider_name` | 发布方名称 | String | - |
| Tag | `model_source_name` | 模型来源名称 | String | - |
| Tag | `model_name` | 模型名称 | String | - |
| Tag | `call_tenant_name` | 调用方租户名称 | String | - |
| Field | `request_count` | 请求数 | Double | - |
| Field | `success_count` | 成功数 | Double | - |
| Field | `error_count` | 非成功数 | Double | - |
| Field | `rate_limited_count` | 限流数 | Double | - |
| Field | `fail_count` | 普通失败数 | Double | - |
| Field | `success_rate` | 成功率 | Double | - |
| Field | `input_tokens` | 输入 token 总数 | Double | - |
| Field | `output_tokens` | 输出 token 总数 | Double | - |
| Field | `input_cache_tokens` | 输入缓存 token 总数 | Double | - |
| Field | `output_cache_tokens` | 输出缓存 token 总数，当前源缺失时为 `0` | Double | - |
| Field | `avg_first_token_time_ms` | 平均首 token 时间 | Double | - |
| Field | `avg_finish_token_time_ms` | 平均完成 token 时间 | Double | - |
| Field | `avg_call_duration_ms` | 平均调用耗时 | Double | - |

### 4.13 `model_metrics_1h`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `model_id` | 模型 ID | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者 | String | - |
| Tag | `model_type` | 模型类型 | String | - |
| Tag | `is_public` | 是否公开 | String | - |
| Tag | `is_aggregated` | 是否聚合模型 | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `model_source_id` | 模型来源 ID | String | - |
| Tag | `provider_name` | 发布方名称 | String | - |
| Tag | `model_source_name` | 模型来源名称 | String | - |
| Tag | `model_name` | 模型名称 | String | - |
| Field | `request_count` | 请求数 | Double | - |
| Field | `success_count` | 成功数，按 `request_count - error_count` 派生 | Double | - |
| Field | `error_count` | 错误数 | Double | - |
| Field | `success_rate` | 成功率 | Double | - |
| Field | `input_tokens` | 输入 token 总数 | Double | - |
| Field | `output_tokens` | 输出 token 总数 | Double | - |
| Field | `first_token_use_total_ms` | 首 token 总耗时 | Double | - |
| Field | `finish_token_use_total_ms` | 完成 token 总耗时 | Double | - |
| Field | `first_token_use_avg_ms` | 首 token 平均耗时 | Double | - |
| Field | `finish_token_use_avg_ms` | 完成 token 平均耗时 | Double | - |
| Field | `fail_service_error` | 服务错误数 | Double | - |
| Field | `fail_timeout` | 超时数 | Double | - |
| Field | `fail_balance` | 余额不足数 | Double | - |
| Field | `health_status` | 健康状态聚合值 | Double | - |

### 4.14 `tenant_model_usage_daily`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `stat_date` | 统计日期 | String | - |
| Tag | `tenant_id` | 调用方租户 ID | String | - |
| Tag | `model_id` | 模型 ID | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者 | String | - |
| Tag | `model_type` | 模型类型 | String | - |
| Tag | `is_public` | 是否公开 | String | - |
| Tag | `is_aggregated` | 是否聚合模型 | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `model_source_id` | 模型来源 ID | String | - |
| Tag | `tenant_name` | 租户名称 | String | - |
| Tag | `provider_name` | 发布方名称 | String | - |
| Tag | `model_source_name` | 模型来源名称 | String | - |
| Tag | `model_name` | 模型名称 | String | - |
| Field | `request_count` | 请求数 | Double | - |
| Field | `success_count` | 成功数 | Double | - |
| Field | `error_count` | 非成功数 | Double | - |
| Field | `rate_limited_count` | 限流数 | Double | - |
| Field | `fail_count` | 普通失败数 | Double | - |
| Field | `success_rate` | 成功率 | Double | - |
| Field | `input_tokens` | 输入 token 总数 | Double | - |
| Field | `output_tokens` | 输出 token 总数 | Double | - |
| Field | `input_cache_tokens` | 输入缓存 token 总数 | Double | - |
| Field | `output_cache_tokens` | 输出缓存 token 总数，当前源缺失时为 `0` | Double | - |
| Field | `avg_first_token_time_ms` | 平均首 token 时间 | Double | - |
| Field | `avg_finish_token_time_ms` | 平均完成 token 时间 | Double | - |
| Field | `avg_call_duration_ms` | 平均调用耗时 | Double | - |

### 4.15 `provider_model_usage_daily`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `stat_date` | 统计日期 | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID | String | - |
| Tag | `model_id` | 模型 ID | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Tag | `meta_model_author` | 元模型作者 | String | - |
| Tag | `model_type` | 模型类型 | String | - |
| Tag | `is_public` | 是否公开 | String | - |
| Tag | `is_aggregated` | 是否聚合模型 | String | - |
| Tag | `model_source_id` | 模型来源 ID | String | - |
| Tag | `provider_name` | 发布方名称 | String | - |
| Tag | `model_source_name` | 模型来源名称 | String | - |
| Tag | `model_name` | 模型名称 | String | - |
| Field | `request_count` | 请求数 | Double | - |
| Field | `success_count` | 成功数，按 `request_count - error_count` 派生 | Double | - |
| Field | `error_count` | 错误数 | Double | - |
| Field | `success_rate` | 成功率 | Double | - |
| Field | `input_tokens` | 输入 token 总数 | Double | - |
| Field | `output_tokens` | 输出 token 总数 | Double | - |
| Field | `first_token_use_total_ms` | 首 token 总耗时 | Double | - |
| Field | `finish_token_use_total_ms` | 完成 token 总耗时 | Double | - |
| Field | `first_token_use_avg_ms` | 首 token 平均耗时 | Double | - |
| Field | `finish_token_use_avg_ms` | 完成 token 平均耗时 | Double | - |
| Field | `fail_service_error` | 服务错误数 | Double | - |
| Field | `fail_timeout` | 超时数 | Double | - |
| Field | `fail_balance` | 余额不足数 | Double | - |
| Field | `health_status` | 健康状态聚合值 | Double | - |

### 4.16 `model_instance_statistics`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `related_model_id` | 关联模型 ID | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID，口径与 `model_snapshot.provider_tenant_id` 一致 | String | - |
| Tag | `model_instance_id` | 模型实例 ID | String | - |
| Tag | `deploy_mode` | 部署模式：`single_instance`=单节点单实例，`multi_instance`=多个互不组网实例，`cluster`=含主/工作节点的集群 | String | - |
| Tag | `is_cluster` | String 值：`true`=`cluster`，`false`=`single_instance` 或 `multi_instance` | String | - |
| Tag | `type` | 指标来源类型标识 | String | - |
| Field | `related_model_name` | 关联模型名称 | String | - |
| Field | `provider_tenant_name` | 发布方租户名称 | String | - |
| Field | `model_instance_name` | 模型实例名称 | String | - |
| Field | `flavor_cpu` | CPU 规格信息 | Double | - |
| Field | `flavor_mem` | 内存规格信息 | Double | - |
| Field | `flavor_ai_card` | 加速卡规格信息 | Double | - |
| Field | `flavor_ai_card_type` | 加速卡类型 | String | - |
| Field | `status` | 实例状态数值 | Double | - |
| Field | `cpu_util` | CPU 利用率原始值，不自动换算单位 | Double | - |
| Field | `mem_util` | 内存利用率原始值，不自动换算单位 | Double | - |

`status`、`cpu_util`、`mem_util` 分别请求后按完全相同的响应 timestamp 合并；上游采样时间不一致时，同一个 point 可能只包含其中部分 Field，查询方不应假设三列总是同时存在。

### 4.17 `model_instance_card_statistics`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `related_model_id` | 关联模型 ID | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID，口径与 `model_snapshot.provider_tenant_id` 一致 | String | - |
| Tag | `model_instance_id` | 模型实例 ID | String | - |
| Tag | `card_no` | 卡编号，例如 `nvidia0` | String | - |
| Tag | `deploy_mode` | 部署模式：`single_instance`=单节点单实例，`multi_instance`=多个互不组网实例，`cluster`=含主/工作节点的集群 | String | - |
| Tag | `is_cluster` | String 值：`true`=`cluster`，`false`=`single_instance` 或 `multi_instance` | String | - |
| Tag | `type` | 指标来源类型标识 | String | - |
| Field | `related_model_name` | 关联模型名称 | String | - |
| Field | `provider_tenant_name` | 发布方租户名称 | String | - |
| Field | `model_instance_name` | 模型实例名称 | String | - |
| Field | `xpu_util` | XPU 利用率原始值，不自动换算单位 | Double | - |
| Field | `xpu_mem_util` | XPU 显存利用率原始值，不自动换算单位 | Double | - |
| Field | `xpu_gpu_power_usage` | GPU 功耗原始值，不自动换算单位 | Double | - |
| Field | `xpu_gpu_temperature` | GPU 温度原始值，不自动换算单位 | Double | - |

同一 timestamp 和 `card_no` 的不同指标会合并为一个 point。

### 4.18 `model_instance_statistics_1h`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `related_model_id` | 关联模型 ID | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID，口径与 `model_snapshot.provider_tenant_id` 一致 | String | - |
| Tag | `model_instance_id` | 模型实例 ID | String | - |
| Tag | `deploy_mode` | 部署模式：`single_instance`=单节点单实例，`multi_instance`=多个互不组网实例，`cluster`=含主/工作节点的集群 | String | - |
| Tag | `is_cluster` | String 值：`true`=`cluster`，`false`=`single_instance` 或 `multi_instance` | String | - |
| Tag | `type` | 指标来源类型标识 | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Field | `related_model_name` | 关联模型名称 | String | - |
| Field | `provider_tenant_name` | 发布方租户名称 | String | - |
| Field | `model_instance_name` | 模型实例名称 | String | - |
| Field | `flavor_cpu` | CPU 规格信息 | Double | - |
| Field | `flavor_mem` | 内存规格信息 | Double | - |
| Field | `flavor_ai_card` | 加速卡规格信息 | Double | - |
| Field | `flavor_ai_card_type` | 加速卡类型 | String | - |
| Field | `status_last` | 已完成 UTC 小时内 `status` 数值序列按时间排序的最后一个有限值；同样不能解释为作业状态枚举 | Double | - |
| Field | `cpu_util_avg` | 已完成 UTC 小时内 CPU 利用率有限样本的算术平均值 | Double | - |
| Field | `cpu_util_max` | 已完成 UTC 小时内 CPU 利用率有限样本的最大值 | Double | - |
| Field | `mem_util_avg` | 已完成 UTC 小时内内存利用率有限样本的算术平均值 | Double | - |
| Field | `mem_util_max` | 已完成 UTC 小时内内存利用率有限样本的最大值 | Double | - |
| Field | `sample_count` | 同一实例在小时内跨监控指标去重后的有效采样时间点数 | Long | - |

### 4.19 `model_instance_card_statistics_1h`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `related_model_id` | 关联模型 ID | String | - |
| Tag | `provider_tenant_id` | 发布方租户 ID，口径与 `model_snapshot.provider_tenant_id` 一致 | String | - |
| Tag | `model_instance_id` | 模型实例 ID | String | - |
| Tag | `card_no` | 卡编号，取 monitor 完整 key 最后一个 `:` 后的字符串，例如 `nvidia0` | String | - |
| Tag | `deploy_mode` | 部署模式：`single_instance`=单节点单实例，`multi_instance`=多个互不组网实例，`cluster`=含主/工作节点的集群 | String | - |
| Tag | `is_cluster` | String 值：`true`=`cluster`，`false`=`single_instance` 或 `multi_instance` | String | - |
| Tag | `type` | 指标来源类型标识 | String | - |
| Tag | `meta_model_id` | 元模型 ID | String | - |
| Field | `related_model_name` | 关联模型名称 | String | - |
| Field | `provider_tenant_name` | 发布方租户名称 | String | - |
| Field | `model_instance_name` | 模型实例名称 | String | - |
| Field | `xpu_util_avg` | 已完成 UTC 小时内 XPU 利用率有限样本的算术平均值 | Double | - |
| Field | `xpu_util_max` | 已完成 UTC 小时内 XPU 利用率有限样本的最大值 | Double | - |
| Field | `xpu_mem_util_avg` | 已完成 UTC 小时内 XPU 显存利用率有限样本的算术平均值 | Double | - |
| Field | `xpu_mem_util_max` | 已完成 UTC 小时内 XPU 显存利用率有限样本的最大值 | Double | - |
| Field | `xpu_gpu_power_usage_avg` | 已完成 UTC 小时内 GPU 功耗有限样本的算术平均值 | Double | - |
| Field | `xpu_gpu_power_usage_max` | 已完成 UTC 小时内 GPU 功耗有限样本的最大值 | Double | - |
| Field | `xpu_gpu_temperature_avg` | 已完成 UTC 小时内 GPU 温度有限样本的算术平均值 | Double | - |
| Field | `xpu_gpu_temperature_max` | 已完成 UTC 小时内 GPU 温度有限样本的最大值 | Double | - |
| Field | `sample_count` | 同一卡在小时内跨卡级监控指标去重后的有效采样时间点数 | Long | - |

### 4.20 `sync_diagnostic`

| 分类 | 字段 | 中文说明 | 数据类型 | 约束 |
| --- | --- | --- | --- | --- |
| Tag | `diag_id` | 诊断 ID | String | 必填 |
| Tag | `purpose` | 诊断用途 | String | - |
| Field | `value` | 诊断值 | Double | - |
| Field | `stage` | 诊断阶段 | String | - |

## 5. 查询约束

- 所有时间参数统一使用 UTC ISO-8601，例如 `2026-04-29T04:06:15Z`。
- `credit_usage_daily` 和 `credit_usage_mtd_daily` 的业务查询必须增加 `active = true`。
- `credit_usage_daily` 和 `credit_usage_mtd_daily` 是积分用量汇总；如需计算结算金额，应结合业务口径确认筛选条件。
- 不要用未过滤的 `COUNT(*)`、`last(*)` 或维度扫描作为 credit usage 业务指标。
- 明细表大范围查询容易触发 InfluxDB 3 parquet file limit，Grafana / 看板优先使用 1h 或 daily 聚合表。
- 只返回聚合结果且未选择 `time` 时，不要再 `ORDER BY time`。
- `model_instance_*` 原始数值不会自动换算单位；跨环境、跨卡型做阈值或单位展示前，应先确认指标的数值尺度。
- `model_instance_statistics.status` / `status_last` 是监控序列值，应按指标数值解释，不要当作业务状态枚举。
- `model_instance_statistics_1h` 和 `model_instance_card_statistics_1h` 只写已经完成的 UTC 小时桶。
- 小时表 `sample_count` 是同一实例或卡在该小时内跨相关指标合并并按 timestamp 去重后的时间点数，不等于某一个指标的样本数。
- Influx point 的幂等身份由 measurement、全部 Tags 和 timestamp 决定；同一身份重试会覆盖。

## 6. 常用 SQL 示例

```sql
-- 查询每日积分汇总，必须过滤 active=true
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
-- 查询月累计积分汇总，必须过滤 active=true
SELECT tenant_id, user_id, product_id,
       SUM(consume_credits_mtd) AS consume_credits_mtd,
       SUM(income_credits_mtd) AS income_credits_mtd
FROM credit_usage_mtd_daily
WHERE active = true
  AND stat_month = '2026-04'
GROUP BY tenant_id, user_id, product_id;
```

```sql
-- 长时间范围看板优先查询聚合表
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
-- 明细排障必须限制时间窗口
SELECT time, request_id, model_id, call_tenant_id, status, error_type, error_message
FROM model_call_event
WHERE time >= TIMESTAMP '2026-04-29T00:00:00Z'
  AND time <  TIMESTAMP '2026-04-30T00:00:00Z'
ORDER BY time DESC
LIMIT 100;
```

```sql
-- 验证三种部署模式是否已产生通用实例指标
SELECT deploy_mode,
       COUNT(*) AS point_count,
       MAX(time) AS latest_time
FROM model_instance_statistics
WHERE time >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
GROUP BY deploy_mode
ORDER BY deploy_mode;
```

```sql
-- 查看通用实例原始指标及模型关联结果
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
-- 查看卡级原始指标
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
-- 查看通用实例最近的已完成 UTC 小时桶
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
-- 查看卡级最近的已完成 UTC 小时桶
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
