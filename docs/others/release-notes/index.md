---
prev: false
next: true
---

# Release Notes

## Table of Contents

- [2026-10-28](#_2026-10-28)
- [2026-06-30](#_2026-06-30)
- [2026-05-15](#_2026-05-15)

## 2026-10-28

### Release Contents

#### Highlights

- 【Feature】Improved account security and tenant governance, covering password setup and recovery, token and key security, source controls, tenant deactivation, language preferences, tenant initialization recovery, and multilingual policy publishing.
- 【Feature】Improved member, role, and consumption-quota governance with batch role and quota management, permission-package checks, model-access requests and approvals, and usage audits.
- 【Feature】Reworked billing and settlement flows, including account preparation, Credit issuance and recovery, billing periods, final-usage deduction, discrepancy reconciliation, and provider revenue.
- 【Feature】Upgraded model-service supply and invocation access across model lifecycle management, sources and endpoints, credentials, connectivity checks, billing modes, multimodal protocols, and aggregate routing.
- 【Feature】Expanded invocation observability and troubleshooting with role-based data isolation, TPOT metrics, trend analysis, request-versus-upstream-attempt records, asynchronous data, and member/project filters.
- 【Feature】Built the notification center and business audit capabilities for notification preferences, tenant contacts, maintenance and registration notices, financial and model-status notices, business operation logs, and reconnect delivery.
- 【Feature】Enhanced cloud deployment and multi-cloud access with dedicated-pool authorization, deployment prechecks, runtime-asset migration, cloud-account health checks, batch authorization, and guided deployment.
- 【Feature】Improved private deployment and cluster operations across deployment candidates, instance API settings, health checks, cluster access, terminal tickets, custom models, VRAM estimation, job terminals, and resource reservations.
- 【Feature】Improved images, object storage, and resource metering with image prechecks, multi-cloud S3 sources, capacity management, resumable multipart upload, live mounts, charge recalculation, specification pricing, and personal usage.
- 【UI】Improved shared UI and runtime support with upgraded charts, dialogs, and settings interactions, stronger message and task recovery compatibility, and cleanup of retired entries.

#### Accounts and Tenants

- 【Feature】Unified first-time password setup, password changes, and email recovery. First-time setup no longer requires the old password; the current session is kept after first-time setup, while related web sessions are revoked after a regular password change or recovery.
- 【Feature】Reworked token issuance, key validation, and frontend session handling to distinguish network errors, authorization errors, invalid credentials, source-policy rejections, and expired login sessions.
- 【Feature】Tenants can manage allowed source addresses, and personal or project Model API Keys can use source-address allowlists. Key creation and rotation results are shown separately, and copied-key state is cleared when the view closes.
- 【Feature】Added tenant-retirement prechecks, irreversible deactivation, and payment-operation blocking, including deactivation of related sessions and business keys.
- 【UI】Unified the public tenant name across pages, prioritized usernames in the account switcher, and separated platform language settings from personal language preferences. Added Latin American Spanish pages and server-side copy.
- 【Quality】Improved independent consumption, retry, and initialization recovery for new tenants. Default model-call keys now receive localized names and descriptions after quota initialization. Chinese, English, and Latin American Spanish system policies can be published by version and remain compatible with legacy policies.

#### Members, Roles, and Quotas

- 【Feature】Added member-role change preview, batch execution, role-based member views, and result checks. Role visibility and assignment scopes are unified, and role-usage queries support pagination, global sorting, and stable ordering across pages.
- 【Feature】Added permission-package previews, change details, unbound-permission and reference checks, and tighter menu-authorization boundaries. Legacy direct user-menu grants are removed during import, and concurrent imports are protected.
- 【Feature】Batch member quota, cycle-policy, and model-access maintenance now supports selection, preview, chunked submission, conflict detection, and receipt readback. Invalid items prevent the batch from being written.
- 【Feature】Unified single-member quota, usage-policy, and model-allowlist maintenance, with unit conversion, quick fill, threshold hints, quota alerts, and daily model-usage display.
- 【Feature】Members can request, view, and cancel model access from Model Marketplace and Playground. Administrators can approve, reject, and track requests.
- 【Feature】Expanded usage details, daily member summaries, and current-day queries with name, tag, member, project, and model filters. Administrators can backfill missing daily summaries for the previous 90 days.

#### Billing and Provider Settlement

- 【Feature】Added lightweight account preparation with idempotent account creation when needed. Balance, balance visibility, and top-up capability are handled independently, and the legacy aggregated account-overview interface is retired.
- 【Feature】Credit issuance and recovery are now separate business actions with request identifiers, reasons, duplicate-request checks, and distinct pending and posted states.
- 【Feature】Unified customer billing periods, consumption sources, and daily trends. Customer financial summaries and source statistics use explicit billing periods, and monthly bill rebuilds align with ModelOne daily summaries first.
- 【Feature】Normal usage and settlement discrepancies now share one provider-settlement flow, with missing or duplicate-detail checks and handling for pending discrepancies below the minimum materialization amount.
- 【Feature】ModelOne deducts quotas and posts billing from actual final usage, separating provider-result, deduction, and posting states. Asynchronous media tasks are billed only after actual usage is available.
- 【Feature】Added reconciliation views by billing period and provider for pending discrepancies, missing attribution, revenue, and billing differences, plus recent-settlement and cumulative-Credit revenue summaries.

#### Model Services and Invocation Access

- 【Feature】Model publishing now uses V2 revisions and runtime snapshots for current and pending-review versions. Added scheduled updates, forced delisting, route-cache refresh, and deletion for eligible models.
- 【Feature】Added model sources, endpoints, and a protocol catalog, with consolidated protocol headers, endpoint editing, candidate filtering, and migration compatibility for legacy sources.
- 【Feature】Expanded credential query, binding, referenced-model, and audit capabilities. New and rotated credentials are encrypted at rest and masked in the UI, with affected-model checks before rotation.
- 【Feature】Added configuration-driven connectivity probes and candidate-credential tests that return vendor errors, credential error types, and test results, with close protection during submission.
- 【Feature】New model publishing no longer offers a free billing option. Existing models and drafts remain compatible with their previous rules, with synchronous and asynchronous final-usage guidance.
- 【Feature】Model lists are filtered by tenant, personal, and project authorization, and invocation rejections distinguish balance, member/project quota, key quota, and model-permission failures.
- 【Feature】Added multimodal image and video protocol support, nested and array usage paths, and input/output/cache metering. Parameter correction matches protocol and meta-model layers and reports parsing failures for invalid configuration.
- 【UI】Upgraded image and video Playground calls, asynchronous-task queries, result display, audio playback, dragging, and downloads. API descriptions and examples follow the selected protocol, and draft sessions are protected when switching or leaving.
- 【Feature】Protocol-specific publishing and editing now constrain billing units and invocation modes, with updated video price previews and units. Model details show the last 24-hour success rate, service status, and trends.
- 【Performance】Aggregate models select candidates by request capability, authorization, concurrency, and upstream health, then retry eligible failures. Streaming calls record timeouts, disconnects, retries, and per-attempt stages while preserving client-origin information.
- 【Feature】Platform settings support object or local storage for model-media uploads, including bucket, endpoint, object-prefix, and credential settings with runtime updates.

#### Invocation Observability and Troubleshooting

- 【Feature】Added observability views for operators, providers, organization administrators, and members within their authorized scopes. Analysis supports source, capability model, customer, client, and routed-model dimensions while isolating tenant-internal data.
- 【Feature】Added TPOT, distributions, ranking, daily trends, and hourly queries. Request extremes link to details, and historical observability data can be restored when enabled by configuration.
- 【Feature】Invocation records distinguish user requests from upstream attempts and support historical asynchronous calls. Usage is shown by image count, duration, characters, or tokens, while requested and actually processed models are distinguished in lists and details.
- 【Feature】Model-usage details support member, project, and model filters. Detail links preserve filters and time ranges and block navigation when the target identifier is missing.

#### Notifications and Business Audit

- 【Feature】Users can manage email preferences by notification type and view in-product messages. Tenant administrators can manage shared contacts and delivery channels and preview notification templates.
- 【Feature】Unified maintenance and registration-event notifications with multilingual details, delivery status, failure handling, and missed-delivery compensation. Batch status follows actual delivery results and avoids duplicate sends.
- 【Feature】Balance, quota, budget, scheduled-delisting, and license-expiry reminders now use the unified notification flow with Chinese, English, and Latin American Spanish templates.
- 【Feature】Business-operation records cover login, member roles, permissions, billing, resource pools, model governance, and credential lifecycles. Records support scope and operator filters, masked export, and retention settings.
- 【Feature】Added multi-tab real-time notices, unread counts, connection coordination, reconnect delivery, and limits on per-user and per-node real-time connections, with invalid connections cleaned up.

#### Cloud Deployment and Multi-Cloud Access

- 【Feature】Added dedicated-resource-pool customer authorization, paginated specification quotas, hardware summaries, and batch additions. Deployments use customer-authorized networks, with authorization audit and name configuration.
- 【Feature】Added cloud-deployment prechecks and progress queries for accounts, licenses, cloud resources, specifications, and model/framework dependencies. Non-compliant submissions are blocked by a second check.
- 【Feature】Improved multi-cloud reference plans, VRAM displays, and deployment-point candidate specifications, with support for Huawei custom OBS models, cloud-inference access, and eligible non-streaming online debugging.
- 【Feature】ZIP-based migration now covers model runtime assets, framework versions, cloud platforms, and resource pools, with mapping prechecks, task records, and result views. Legacy standalone import/export entries are consolidated.
- 【Feature】Cloud-account health can be refreshed in batches. Identity, configuration, and service-reachability issues are distinguished, and cloud-provider error causes and handling hints are shown.
- 【Feature】Added progress views for cloud platforms, accounts, regions, and authorization. Tenants can receive batch cloud-platform authorization, full regional coverage, and candidate resource scopes; a platform cannot be disabled while a deployment is running.
- 【Feature】Model Gallery supports public and dedicated resource-pool search. Quick deployment guides model, framework, policy, and recommended-plan selection; progress shows cloud events, and monitoring queries cloud data by region and time range.

#### Private Deployment and Cluster Operations

- 【Feature】Improved framework, specification, dependency-artifact, and region candidates for custom models and inference templates, with configuration-problem hints.
- 【Feature】Instance API port and protocol snapshots are retained, batch template instances become independent tasks, vLLM monitoring follows configured ports, and instance deletion synchronizes with job terminal states.
- 【Feature】Added custom health checks for frameworks and instances, pre-publish real-inference validation, and retry-after-failure flows that distinguish job health from model accessibility.
- 【Feature】Added regional workbenches and a cluster-registration wizard with connection-file parsing, connectivity checks, address checks, accelerator-metric diagnosis, and monitoring by region, cluster, and node.
- 【Feature】Terminal, job-log, and model-download-log connections now use short-lived resource-bound tickets. Terminal resize synchronization, `sh` fallback for images without `bash`, cluster execution, file-log connections, access-proxy setup, link tests, and proxy restarts are supported.
- 【Feature】Custom models can select inference frameworks and regional resources and use custom runtime settings and startup commands. vLLM runtime profiles, VRAM estimation, and profile import/export are supported.
- 【UI】Job terminals support split panes and new tabs. Job logs support keyword, case, and context filtering while preserving reading position and allowing refresh pause/resume.
- 【Feature】Cluster workbenches now support scheduling limits, node-resource reservations, and deployment-resource previews across cluster, cluster-resource, node, and node-resource levels. Previews do not reserve actual resources.
- 【Feature】Online development, jobs, and model deployments support project attribution, project filters, and resource-specification sorting. Codelab, Gitea, and legacy model-training, instance-job, quick-deployment, and fine-tuning paths are removed.

#### Images, Object Storage, and Resource Metering

- 【Feature】Added Harbor and cloud Registry component registration, staged prechecks, health checks, asset synchronization, version-copy, batch enablement, and temporary Docker-login commands. Image groups and tags support usage and quota management.
- 【UI】Reorganized public and custom image repositories, project lists, and detail panes to present counts, quotas, times, version actions, and upload guidance together.
- 【Feature】Added multi-cloud S3 source discovery, credential protection, permission prechecks, region binding, and connection-status checks. A source can serve multiple regions, with bucket counts, capacity, and prices maintained per default or tenant settings.
- 【Feature】Added object-capacity ledgers, write reservations, initialization, calibration, existing-bucket migration, project association, capacity-shortage handling, and cleanup-state recovery after balance restoration.
- 【Feature】Added create, resume, query, upload, complete, cancel, resumable, and retry flows for files up to 50 GiB, reusing the server-side part size.
- 【Feature】Jobs can dynamically mount and unmount S3 while running, with CSI certificate handling, mount-state checks, provider identification, and separate accepted-versus-available states.
- 【Feature】Bucket capacity and pricing now feed resource metering and Credit deduction. Hourly, daily, and monthly charge rebuilds can append differences, and exports include job, bucket, region, and availability-zone details.
- 【Feature】Added specification-pricing statistics, metric-price maintenance, and batch customer specification quotas, with batch price changes and enable/disable controls. Memory quotas use GiB consistently, and users can query resource quotas and personal usage.

#### Shared UI and Runtime Support

- 【Quality】Improved protection for empty queues, producer probes, expired node leases, and abnormal service exits. Message listeners, scheduled tasks, and temporary reservations recover after restart, and historical platform-license imports remain compatible.
- 【UI】Upgraded GPU-utilization charts to ECharts 6, cleaned up listeners after page destruction, localized numeric values, unified shared-dialog close and submit protection, and showed editable or read-only settings by permission.
- 【UI】Improved navigation-text clipping, page back actions, table action columns, and long localized copy across shared interactions.
- 【Quality】Removed retired application, sharing, chat-session, document-processing, and obsolete model-invocation entries, plus selected legacy private-deployment proxy entries, while retaining integrations used by cloud deployment.

## 2026-06-30

### Release Contents

#### Highlights

- 【Feature】Added and improved User Space capabilities, including Workspace Overview, project management, personal and project Model API Keys, member quotas, quota requests, operation logs, budgets, and model allowlists.
- 【Feature】Strengthened the API Key and Quota management flow, including personal/project Key attribution, gateway authentication, quota logs, expiration time, limit statistics, and more accurate quota deduction in abnormal scenarios.
- 【Feature】Continued upgrades to Model Services, including cache billing, tiered billing, Web Search billing, and usage parsing and billing for image, video, and audio models.
- 【Feature】Upgraded the Playground text, image, video, and audio pages, improving model selection, parameter configuration, model comparison, file upload, Key selection, and old/new version switching.
- 【Feature】Enhanced model publishing, Model Marketplace, My Models, meta-model configuration, model sources, and model review workflows to improve model onboarding, configuration, review, publishing, and multilingual maintenance.
- 【Feature】Upgraded AI Infra On-Prem resource management, covering resource pools, clusters, accelerators, specifications, images, storage, deployment templates, VRAM calculation, model services, runtime instances, and online IDE.
- 【Feature】Enhanced AI Infra On-Cloud recommended deployment and model migration, supporting recommendation generation by model, framework, deployment mode, cloud provider, and policy, with hardware specifications, pricing, inventory, and multi-cloud adaptation data.
- 【Feature】Rebuilt the Billing flow, covering account overview, monthly bills, transactions, top-ups, provider revenue, and operator settlement, while improving consumption-source attribution and Stripe posting reliability.
- 【Feature】Enhanced License capabilities, including pre-publish checks, model publishing controls, SaaS subscription entry, top-bar health status, global alerts, AI Infra guards, and SKU usage control.
- 【Feature】Enhanced login and account capabilities, including email account recovery, email login, password retry limits, and automatic tenant registration for Google login.
- 【Feature】Enhanced system management and permission capabilities, including new menu tags, service configuration internationalization, API rate control, permission scanning, dynamic system configuration refresh, and parameterized scheduled tasks.
- 【UI】Continued platform-wide UI unification, optimizing headers, cards, filters, tables, action columns, empty states, status tags, dialogs, MessageBox, AK dropdowns, and dark mode styles.
- 【Performance】Optimized Playground page switching, Model Marketplace queries, Quota deduction, cloud specification inventory checks, top-up posting, API rate-control statistics, scheduled task status synchronization, log reporting, and monitoring metrics.
- 【Performance】Optimized gateway remote calls, dynamic configuration refresh, log reporting, and monitoring metrics to improve startup stability, API compatibility, and O&M observability.
- 【Quality】Fixed stability issues across Model Services, billing attribution, License blocking, menu permissions, scheduled tasks, Google login, email templates, multilingual content, dark mode, and complex table rendering.

#### Settings

- 【Feature】Added User Space entries such as Workspace Overview, Projects, My Keys, Member Quotas, Quota Requests, and Operation Logs.
- 【Feature】Projects now support project lists, details, members, usage, activity logs, settings, budgets, budget alerts, reset cycles, over-budget policies, and model allowlists.
- 【Feature】Project Keys support creation, viewing, copying, disabling/enabling, rotation, revocation, expiration, limits, and usage statistics.
- 【Feature】Enhanced end-to-end API Key capabilities, including gateway attribution authentication, key names, expiration time, default quota, quota logs, personal/project key attribution, and compatibility with the legacy key model.
- 【Feature】Separated Model API Keys from legacy System AK/SK, clarifying capability boundaries and separating model-call authentication from regular API authentication.
- 【Feature】Member Quotas support quota viewing, administrator management, quota policies, model allowlists, alert thresholds, and reset cycles.
- 【Feature】Quota Requests support request submission, cancellation, approval, rejection, and automatic expiration. A member can keep only one pending request at the same time.
- 【Feature】Enhanced customer directory capabilities, including operator tenant directory, tenant customer summary, customer type filters, business identity, administrator email, and custom customer tags.
- 【Performance】Quota deduction rules are more stable. Failed requests, allowlist failures, insufficient balance, abnormal Key status, archived projects, and precheck failures no longer cause unreasonable deductions.
- 【UI】Unified Key display, list headers, action buttons, empty states, and quota-related copy. Quota terminology is used consistently.

#### Model Services

- 【Feature】Enhanced model billing with cache billing, tiered billing, Web Search billing, and usage parsing for image, video, and audio models.
- 【Feature】Improved support for video, image, and Web Search scenarios. Video and image model prices can be retrieved even in passwordless login scenarios.
- 【Feature】Playground text, image, video, and audio pages can select valid Model API Keys and distinguish Personal Keys from Project Keys.
- 【Feature】The Playground text, image, video, and audio pages were upgraded to a more centralized top-bottom structure, making model selection, generation type, model comparison, and input areas clearer, with entries to return to the old version or switch to the new version.
- 【Feature】Optimized model comparison in Playground. The second model now defaults to an unselected state, shows a lightweight hint when not selected, and supports selecting the same model for comparison.
- 【Feature】Common parameters are moved to the bottom of the input box, while model protocol and advanced parameters are grouped into the parameter dialog. Text, image, video, and audio models display parameters based on their actual configurations.
- 【Feature】Enhanced upload capabilities for image-to-image, image editing, video image-to-video, and related scenarios, including upload entry, batch upload, thumbnails, deletion, uploading state, and failure prompts.
- 【Feature】Merged the AK / API Key selector into the input area. Dropdown options show name, masked Key, and Personal tag, with improved overlay, stacking, and narrow-width behavior.
- 【Performance】When switching across Playground text, image, video, and audio pages, the previous page's subtype, model list, conversation content, and old/new version state are cleared. Response guards prevent stale page requests from overwriting the current page.
- 【Feature】Enhanced model publishing flows, including quick deployment, My Deployments, publishing entry, multi-instance publishing node selection, and post-publish return path handling.
- 【Feature】Model Marketplace and My Models support secondary type filters, billing method filters, model name search, scheduled delisting model viewing, and abnormal data filtering.
- 【Feature】Optimized operator meta-model configuration. The author column supports drag resizing, model version tables, input/output modalities, and model capability displays are more compact, and an entry to return to the old version is provided.
- 【Feature】Meta-model create/edit pages support multilingual tabs for model descriptions, missing-language red-dot hints, and unified advanced capability configuration.
- 【Feature】The model source list was upgraded from card layout to table layout. Provider names use name + code hierarchy, and regions can be expanded through a `+N` popover to view all regions and API addresses.
- 【Feature】Model source create/edit pages support multilingual tab editing for provider and region names, showing inputs based on the current language and reducing row height.
- 【Feature】The model review list was upgraded to table layout, pagination was moved below the table, and the review dialog now includes read-only capability configuration to avoid accidental edits during review.
- 【Feature】Model author display name, model tags, model description, provider name, and region name now consistently use multilingual tabs and red-dot hints.
- 【Feature】Provider configuration adds output config template support, preventing internal platform parameters and attribution fields from being incorrectly passed to vendors.
- 【Feature】Callback task queries support taskId or id, with stronger data isolation for tasks not owned by the current user.
- 【Performance】Optimized usage statistics and billing, supporting standard usage, raw vendor usage, no billing for failed requests, and supplemental billing for asynchronous video tasks.
- 【Performance】Optimized Model Marketplace meta-model list query scope, returned fields, and sorting logic to reduce invalid data and large-field overhead.
- 【UI】Improved model details, model icons, model sources, pricing, Key selection, and model publishing overview display.
- 【UI】Unified model selection dialogs, parameter dialogs, AK dropdowns, chat bubbles, model comparison areas, and dark-mode input styles. Pages can be clicked immediately after dialogs close.

#### AI Infra On-Prem

- 【Feature】Upgraded resource pool management. Regions and availability zones support split-pane details, filtering, drag sorting, associated components, zone enable/disable, and dedicated-region tenant authorization.
- 【Feature】Cluster management supports card/table views, filtering and pagination, detail drawers, resource status, associated specifications, storage configuration, and start/stop maintenance.
- 【Feature】Accelerator management was upgraded into a vendor-grouped resource directory, supporting managed status, metric binding, create, edit, delete, import, and export.
- 【Feature】Specification metrics and resource specification configuration pages now support more complete card-based management plus import and export.
- 【Feature】Images, image components, object storage, block storage, file storage, and related resource configuration pages now support more complete card-based management.
- 【Feature】Deployment template management was revised. Model configuration now needs to be created from meta-models, framework and inference template pages have improved visuals, and VRAM calculation is provided to help users estimate deployment template memory needs by scenario.
- 【Feature】The user overview page adds deployment template quick deployment, allowing users to select model resources by model and accelerator vendor and enter the deployment flow.
- 【Feature】User-side deployment templates were upgraded to interactive deployment. After selecting a model, users can customize model-service capabilities by scenario and automatically receive recommended accelerator deployment resources.
- 【Feature】Added Model Services capability to centrally manage model deployment tasks.
- 【Feature】Removed the previous Model Training and Container Instance features, replacing them with the more complete Runtime Instances feature.
- 【Feature】Optimized the visual experience of Online IDE and Runtime Instances pages.
- 【Feature】Upgraded Online IDE and Runtime Instance terminal and log capabilities. Multiple terminals can now be opened at the same time, switching tabs in the details page no longer disconnects them, and logs support user-defined container log file display.
- 【Feature】Some user-side pages now show all-region data by default and hide the region filter in the header.
- 【UI】Unified resource cards, status tags, progress bars, capacity displays, action menus, and detail drawers to make resource usage and abnormal causes easier to inspect.

#### AI Infra On-Cloud

- 【Feature】Enhanced recommended deployment, supporting recommendation generation and deployment confirmation by model, framework, deployment mode, cloud provider, and policy.
- 【Feature】Recommended plans now return structured hardware specifications, pricing, billing cycle, currency, business policy, and real-time inventory status for clearer pre-deployment decisions.
- 【Feature】Model migration adds export, precheck, and import capabilities, supporting migration of models, cloud configuration, API configuration, model sources, and framework dependencies across environments.
- 【Feature】Model Gallery and Model Management add meta-model, cloud provider, region, model tag, model cloud configuration, and meta-model snapshot information.
- 【Feature】Access object overview supports aggregated data for cloud platforms, resource pools, accounts, assets, tenant authorization, and business resource authorization.
- 【Feature】Enhanced multi-cloud adaptation, optimizing AWS, Aliyun, and other cloud-provider deployment, specification, and access-address handling.
- 【Performance】Optimized cloud specification synchronization and inventory-status checks to reduce cases where sold-out or unavailable specifications are treated as deployable.
- 【UI】Improved model list, deployment details, cloud-provider filters, meta-model tags, and deployment error prompts.

#### Billing

- 【Feature】Rebuilt the Billing flow, covering account overview, monthly bills, transactions, top-ups, provider revenue, and operator settlement.
- 【Feature】Enhanced the provider settlement loop, including candidate lists, generation wizard, settlement details, progress display, paired records, transfers, resubmission, and settlement inspection.
- 【Feature】Provider customer lists now include keyword search plus tenant, company, administrator, email, phone, and other identifying fields.
- 【Feature】Transactions now include source system, entity name, display name, and transaction context to help users identify billing sources.
- 【Feature】Monthly bill snapshots support historical billing-cycle queries, hot rebuild, manual refresh, reconciliation tasks, and customer current-month consumption snapshot refresh.
- 【Feature】When customers top up directly through Stripe in AGIOne, top-up confirmation emails are sent, and Stripe-side transaction details are more readable and complete.
- 【Feature】Consumption-source attribution is optimized across model, AI Infra, project, member, Project, and other dimensions, making Project Key consumption and member consumption statistics more accurate.
- 【Performance】Top-up and posting reliability improved for Stripe timeout-after-success, duplicate callbacks, late successful posting, bonus credits, and balance initialization.
- 【UI】Billing cycle, amount, net change, source ranking, project name, member name, and provider revenue source are easier to read.
- 【UI】Provider-side pages hide unreadable internal IDs, reducing the cognitive cost of customer details and revenue records.

#### License

- 【Feature】License adds pre-publish checks, model publishing controls, SaaS subscription entry configuration, top-bar health status, global alerts, and AI Infra guards.
- 【Feature】License usage aggregation and request-count control are enhanced, supporting SKU-based usage statistics, pre-publish permission checks, and restricted-action blocking.
- 【Feature】License risk definitions now include scenarios such as expired installed SKUs, making publish and review blocking prompts more accurate.
- 【UI】License management pages, global alerts, configurable/disableable license purchase entries, contact email, and related guidance now cover restricted states more completely.

#### Login and Account

- 【Feature】Added email account recovery, including recovery contact email configuration and email template productName configuration.
- 【Feature】Password login supports email as the login identifier and adds password retry limits.
- 【Feature】Google login adds authorization flow, authorization code flow, system configuration, configuration APIs, automatic tenant registration, and frontend entry.
- 【UI】Optimized login, registration, and password recovery pages with video backgrounds, dark forms, language rendering, and button hover states.
- 【Fix】Fixed post-registration redirects, balance initialization retry, login failure prompts, and email dark-mode rendering issues.

#### System Management and Permissions

- 【Feature】Adjusted menu permission AppId rules. Menu and role authorization continue to use frontend AppId, while the Permissions dialog uses backend AppId.
- 【Feature】The new system menu management supports menu applicable-role tags. Menu tags support saving, copying, filtering, sorting, and sidebar refresh.
- 【Feature】Enhanced service configuration internationalization, improving English resources, multi-frontend application menu permission AppId semantics, and menu deletion application ID parameters.
- 【Feature】Added API rate control with gateway-level rate limiting, local counting, IP / user / tenant / OAuth2 identity conditions, dynamic quotas, rule ranking, hit logs, statistics dashboard, and manual rate-control check entry.
- 【Performance】Optimized the API rate-control model into a count-key model, supporting automatic rule quota recalculation after node changes and retaining failed statistics-reporting batches for troubleshooting.
- 【Feature】Permission scanning supports manually triggering all service permissions into storage and uses MQ to trigger local scanning, limited to the primary node.
- 【Feature】Enhanced dynamic system configuration refresh and configuration permission control, making default remote client startup behavior more stable.
- 【Feature】Scheduled tasks support parameter metadata, parameter guidance, Cron editor, and JSON parameter object saving.
- 【Performance】Enhanced scheduled task status synchronization, including pause status preservation after restart, update restrictions while running, and reverse chronological execution logs.
- 【Feature】Optimized JSON editing for system configuration, and adjusted currency API permissions and project key permission identifiers.
- 【Fix】Fixed menu filter button crowding, menu permission refresh, scheduled task pause status, running update, and pause/restart recovery issues.

#### Tools and Shared Experience

- 【Feature】Enhanced VRAM calculation and deployment resource estimation, supporting estimation of required VRAM, card count, and specifications by model, framework, accelerator, and parameters.
- 【Feature】Configuration import/export was extended to accelerators, specification metrics, resource specifications, model configuration, framework configuration, inference templates, and VRAM calculation configuration.
- 【UI】Unified headers, universal cards, status dropdowns, filters, table headers, action columns, and empty states.
- 【UI】Optimized model allowlists, Key masking, quota prompts, project budgets, service connection copy, deployment entry, and other interaction details.
- 【UI】Added a shared horizontal floating scrollbar for horizontally overflowing tables, supporting bottom floating scroll, drag, track click-to-jump, and automatic association across multiple tables.
- 【UI】Tables requiring horizontal scrolling now show boundary lines and side shadows on fixed action columns, making fixed columns and table bodies clearer in dark mode.
- 【UI】Further unified dark-mode boundaries, masks, and shadows for new dialogs, model selection dialogs, parameter dialogs, AK dropdowns, and MessageBox. Legacy dialogs remain unchanged.
- 【Performance】Upgraded shared dependencies and styles to reduce display issues in dark mode, mobile, ultra-wide, long-text, and empty-data scenarios.
- 【Performance】Enhanced logs and monitoring with degradable log reporting, Prometheus metric events, monthly system log partitions, and query index optimization.

#### Fixes

- 【Fix】Fixed unreasonable billing that could occur for failed requests, vendor failures, allowlist failures, insufficient balance, or abnormal Key status.
- 【Fix】Fixed API Key quota checks, quota configuration limits, tenant status queries, unavailable default quota policies, and legacy key model compatibility issues.
- 【Fix】Fixed gateway API Key verification, request filtering, request ID pass-through, request body size handling, and servlet dependency mis-triggering.
- 【Fix】Fixed authentication exception handling, opaque token checks, anonymous authentication handling, API Key filter order, and access token extraction flow.
- 【Fix】Fixed Model Marketplace search, My Models name search, scheduled delisting model viewing, and abnormal data returns.
- 【Fix】Fixed Playground page switching issues where subtype, model list, conversation content, or old/new version state could leak into other pages.
- 【Fix】Fixed old Playground page responses overwriting current page data after page switches.
- 【Fix】Fixed lingering overlays after model selection dialogs and parameter popups close, abnormal page clicks, and delayed top navigation clicks.
- 【Fix】Fixed internal model-call parameters being incorrectly passed to vendors, querying tasks not owned by the current user, and callback task query compatibility.
- 【Fix】Fixed Project Key consumption attribution mixing into member statistics, raw IDs in bill source display, and internal IDs in provider customer revenue sources.
- 【Fix】Fixed cloud specification inventory status, model deployment access addresses, multi-cloud deployment failure prompts, and cloud-provider specification dependency compatibility.
- 【Fix】Fixed Online IDE terminal connection status inaccuracies, unstable terminal text copying, and non-running tasks still showing Connected.
- 【Fix】Fixed missing deployment task failure reasons, deleting status being overwritten by old Pod status, and job creation staying in environment setup for too long.
- 【Fix】Fixed License page redirects, License risk status, model publishing License blocking prompts, and permission internationalization.
- 【Fix】Fixed menu type judgment, permission scan i18n fallback, permission filtering, API rate-control export permission configuration, and License update permission validation.
- 【Fix】Fixed default user role null pointer, missing tenant/type information in user role lists, login failure prompts, and frontend exception messages.
- 【Fix】Fixed email template dark-mode rendering, Google login automatic tenant registration entry, and inconsistent backend source for email configuration.
- 【Fix】Fixed dynamic system configuration refresh, log event reporting, concurrent License usage retrieval, and several type conversion / NPE issues.
- 【Fix】Fixed missing translations, English capitalization, special characters, hardcoded copy, long-text wrapping, and dark-mode style issues.
- 【Fix】Fixed menu sorting, menu filter layout, permission scan compatibility, and scheduled task pause / resume / parameter saving issues.

---

## 2026-05-15

### Release Contents

#### General

- 【UI】Brand new UI with dark/light mode support (including new homepage, login/register pages, Console page, etc.)
- 【UI】Platform-wide naming standardization - unified terminology for model providers and model sources across all pages for better consistency and understandability
- 【UI】Optimized model publishing overview UI - improved display of key information before and after model publishing

#### Model Services

- 【Feature】Failover support - automatic model switching capability to reduce invocation failures
- 【Performance】Circuit breaker support - improved call monitoring and success rate evaluation for more stable model selection
- 【Performance】Enhanced streaming output - supports unified format while maintaining compatibility with original model API capabilities, reducing answer interruption, format anomalies, and incomplete results
- 【Feature】Extended video model billing support for both token-based billing (per million tokens) and non-token billing (per second) scenarios
- 【UI】Optimized model name display in billing records - more accurate and recognizable model information in bills and transfer records
- 【Performance】Improved billing snapshot records for easier usage and cost verification
- 【Performance】Optimized model connectivity testing interface for more accurate pre-publishing checks
- 【Feature】Added model source type identification to distinguish models from different sources
- 【Performance】Added platform data synchronization (side-channel sync) for improved accuracy of call data, billing data, and model metrics
- 【Performance】Optimized dashboard aggregation for more stable hourly and daily data summaries

#### AI Infra - On Cloud

- 【Feature】Optimized AWS-related model registration, invocation, and deployment workflows
- 【UI】Improved cloud account query experience with better recognition of shortened names like Alibaba Cloud and Huawei Cloud
- 【Feature】Support publishing cloud inference service Endpoints to Model Services platform
- 【Feature】Support publishing inference service Tokens to Model Services platform
- 【Feature】Support syncing meta-model information to Model Services platform
- 【Feature】Support inference testing of published models on the Model Services platform

#### Finance

- 【Feature】Advanced finance function integration - merging some MSP-side billing capabilities to operator side
- 【UI】Balance display optimization - added display in top-right corner of navigation bar

#### Tools

- 【Feature】Model deployment resource estimation - estimate VRAM and GPU count based on model and accelerator card parameters

### Bug Fixes

- 【Fix】Improved handling of abnormal model parameters to reduce invocation failures caused by non-standard parameters
- 【Fix】More detailed error messages for deployment failures to help users and operations staff locate issues
- 【Fix】Fixed model details, specifications query, and dependency compatibility issues for some cloud providers
- 【Fix】Improved historical data refresh capability to reduce timeout or incomplete data risks during large time range queries
- 【Fix】Fixed payment configuration default value issues for improved billing configuration stability
- 【Fix】Corrected cloud region permission query logic for more accurate available region display
- 【Fix】Fixed special character issues in English text for better multilingual display consistency
