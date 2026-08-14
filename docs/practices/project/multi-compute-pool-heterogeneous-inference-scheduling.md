---
outline: [2, 4]
---

# AGIOne Multi-Compute Pool Heterogeneous Inference Scheduling Best Practice

> **Applicable scenario:** AGIOne coordinates multiple heterogeneous compute pools for online inference, batch processing, and elastic overflow workloads.
>
> **Coverage:** Compute pool onboarding · Fault isolation and recovery · Inference engine adaptation · Aggregated scheduling · Operations monitoring
>
> AGIOne is the platform described in this guide. Compute pool names, topology, model names, and organization information use a synthetic reference environment and do not represent a specific customer or production deployment.
>
> This document provides parameter values and thresholds as initial tuning examples. They are not AGIOne default settings, measured results, service levels, or commitments. Validate and approve them in the target environment before use.

## Chapter 1: Background and Architecture Overview

### 1.1 Business Background

When compute pools are in separate network zones and use different types of accelerators, AGIOne needs a consistent method for resource onboarding, model deployment, request scheduling, fault isolation, and capacity adjustment.

This document uses three synthetic compute pools:

- **Compute Pool A:** A private-network pool for low-latency online requests and smaller models.
- **Compute Pool B:** A controlled-link pool for throughput-oriented batch workloads.
- **Compute Pool C:** A bare-metal or independently managed pool for off-peak batch workloads, elastic expansion, and failover.

A deployment can start with a small validation set, such as `4` instances, and expand toward a larger range, such as `20-36` instances. The service entry point should remain stable while backend capacity changes, but scale operations can still affect queues, caches, and latency. Each deployment must validate the example against its hardware, network, security boundaries, and workload characteristics.

### 1.2 Core Challenges

- **Heterogeneous resources:** Different accelerators require different drivers, runtimes, device plugins, communication libraries, and inference engines.
- **Distributed nodes:** Compute resources can span private cloud, hosted compute, and bare-metal environments with different network paths and fault domains.
- **Node rebuild:** Some environments automatically rebuild the operating system after a node failure. Registration, storage mounting, service startup, and traffic restoration must therefore be repeatable.
- **Capacity growth:** Instance counts can grow from a small validation set to dozens of instances. Backend changes must not require callers to replace the service endpoint.
- **Workload periods:** Online requests, daytime batch workloads, and off-peak full-batch workloads require different resource allocations.
- **Uneven task duration:** Simple round-robin distribution can create load imbalance when inference tasks have different input and output lengths.
- **Correlated troubleshooting:** Request throughput, queue state, routing weights, instance load, and device metrics must be reviewed together.
- **Evidence constraints:** Performance, recovery, and scaling thresholds must come from tests in the target environment. Example values must not become service commitments.

### 1.3 Overall Architecture

The AGIOne reference design uses a central-management and distributed-execution pattern.

| Architecture layer | Primary responsibilities and reference components |
| --- | --- |
| AGIOne management plane | Maintains compute pools, clusters, models, templates, permissions, and audit records. It can also provide an API gateway, model publication, metering, and a unified management entry point when those modules are enabled. |
| Scheduling plane | Runs in or near each compute pool, registers resource information, receives build or deployment tasks, and selects backend instances by labels, health, queue state, and policy constraints. |
| Execution plane | Runs inference instances, loads approved model weights and runtimes, and exposes a controlled inference interface. An OpenAI-compatible interface can be used when supported by the selected engine. |
| Aggregated scheduling layer | Combines compatible backend instances behind one logical model ID and adjusts distribution by capacity, health, running tasks, and policy constraints. |
| Observability plane | Collects request, scheduling, instance, node, and device metrics to support troubleshooting and capacity decisions. |
| Security and governance plane | Manages identities, certificates, keys, network policies, log retention, and change approvals. |

> The AGIOne management plane can connect to compute pools through private networks, controlled dedicated links, or approved site-to-site routes. The reference architecture describes functional boundaries and does not prescribe actual sites, cloud services, device models, or internal endpoints.

### 1.4 Network Connectivity Matrix

| Synthetic compute pool | Reference connection | Applicable workload | Design requirements |
| --- | --- | --- | --- |
| Compute Pool A | Private connection in one security zone | Low-latency online inference and smaller models | Verify end-to-end latency, fault domains, and capacity limits. |
| Compute Pool B | Controlled dedicated or equivalent connection | Throughput-oriented batch processing | Verify exclusive bandwidth, data transfer policies, and task retry behavior. |
| Compute Pool C | Approved internal or site-to-site route | Off-peak full-batch processing, elastic overflow, and failover | Verify route convergence, certificates, fallback, failback, and bare-metal recovery behavior. |

No compute pool should expose management ports or inference-instance ports directly. A security owner must approve the network, identity, and data-flow design for the target environment.

## Chapter 2: Multi-Compute Pool Access and Management

### 2.1 Cluster Onboarding Strategy

Each compute pool can maintain an independent Kubernetes control plane and communicate with the AGIOne management plane through a standardized agent or task-building API. Complete these checks before onboarding:

1. Confirm compatibility between the accelerator, driver, runtime, device plugin, and operating system versions.
2. Confirm network paths, name resolution, time synchronization, and certificate trust between the management plane and the compute pool.
3. Confirm the node initialization method, image source, artifact verification, and rollback plan.
4. Confirm storage locations and access permissions for model weights, caches, logs, and backups.
5. Use a test workload without production data to validate registration, scheduling, startup, invocation, and deletion.

#### 2.1.1 Compute Pool A: Private-Network Online Service Pool

1. Create a Kubernetes cluster in the approved private network and install the device plugin for Accelerator Type A.
2. Deploy the scheduling, monitoring, and log collection components.
3. Register the cluster ID, accelerator family, available device count, and controlled service endpoint with the AGIOne management plane.
4. Configure a heartbeat. An initial interval of `60` seconds can be used for validation and then adjusted from measured detection and recovery time.
5. Use a small test model to verify resource discovery, instance startup, health checks, and online request routing.
6. Onboard online workloads gradually after the validation gates pass.

#### 2.1.2 Compute Pool B: Controlled-Link Batch Service Pool

1. Deploy Kubernetes base services on the hosted or independently managed nodes and install the driver and device plugin for Accelerator Type B.
2. Configure the controlled management endpoint and verify bandwidth, retry, timeout, and large-file transfer policies.
3. Deploy an approved device-metrics exporter to collect utilization, device memory, temperature, and device error information.
4. Register the cluster and add generic resource labels such as `accelerator-family=type-b` and `workload-class=batch`.
5. Configure batch queues, task priorities, and resource limits.
6. Use synthetic data to validate long-running tasks, failure retries, result retention, and isolation from online workloads.

#### 2.1.3 Compute Pool C: Bare-Metal Elastic and Failover Pool

1. Install the approved operating system and run a reviewed node-initialization script to install the container runtime, Kubernetes node components, and accelerator driver.
2. Confirm that Compute Pool C uses an independent fault domain and does not share a single point of failure with the primary pool.
3. Configure an approved internal or site-to-site route to the management plane and verify certificate status with read-only probes.
4. Deploy the scheduling, monitoring, and log collection components, and complete cluster registration.
5. Mount persistent model caches and critical recoverable data on storage that is independent of the system disk.
6. Run a failover exercise and record trigger conditions, failback conditions, the manual termination method, and rollback results.
7. Do not mark Compute Pool C as an available production backend until the exercise is complete.

### 2.2 Cluster Resource Labels and Scheduling

Use stable and auditable labels to describe resource capabilities. Example values must remain generic and must not contain customer, project, location, or internal asset names.

| Label key | Synthetic example values | Purpose |
| --- | --- | --- |
| `accelerator-family` | `type-a` / `type-b` | Distinguishes accelerator families. |
| `memory-class` | `class-1` / `class-2` | Describes available device-memory classes. |
| `workload-class` | `online` / `batch` / `overflow` | Distinguishes workload types. |
| `failure-domain` | `zone-a` / `zone-b` | Prevents replicas from being concentrated in one fault domain. |
| `environment` | `validation` / `production` | Separates validation and production workloads. |

Example scheduling selector:

```yaml
accelerator-family: type-a
memory-class: class-2
workload-class: online
failure-domain: zone-a
environment: production
```

A scheduling policy must check labels, remaining capacity, health, quotas, and template constraints. Labels describe capabilities, but they do not replace runtime validation.

## Chapter 3: Node Fault Isolation and Recovery

### 3.1 Fault Trigger and Recovery Process

Some infrastructure environments can automatically rebuild a failed node. AGIOne should treat that mechanism as one step in a controlled recovery workflow rather than as proof that the service has recovered.

Use the following state flow:

1. The monitoring system detects consecutive anomalies and creates a traceable event.
2. The scheduling plane stops assigning new requests to the affected instance.
3. The system waits for in-flight requests, retries them, or returns a controlled failure according to policy.
4. The operations system repairs or rebuilds the node through an approved method.
5. After the node registers again, verify the driver, device, storage, network, and inference service.
6. After the health criteria are satisfied, restore traffic gradually through a controlled process.
7. If a metric becomes abnormal, return the instance to isolation and keep a manual takeover path available.

An initial exercise can use the following non-binding recovery budget: operating-system rebuild in approximately `10` minutes, base-service recovery in less than `5` minutes, and inference-service startup in less than `15` minutes. These values are test objectives only. Heartbeat intervals, failure counts, actual recovery time, and traffic ramp rates must come from exercises in the target environment.

### 3.2 Base Image Creation Specification

| Image layer | Requirements and technical content |
| --- | --- |
| Operating system layer | Pin a supported long-term-support version and record security patches, time zone, DNS, and hardening information. |
| Driver and firmware layer | Pin the accelerator driver, firmware, and communication-library versions and record compatibility results. |
| Container runtime layer | Pin Docker or containerd, the Kubernetes node component, and the device plugin. Do not use unreviewed floating tags. |
| AGIOne component layer | Include only the approved monitoring agent, log collector, and node-registration component. Read credentials from the approved secret mechanism. |
| Inference engine layer | Pin Engine A or Engine B, the Python environment, and dependencies. Keep model weights outside the image and mount them at runtime. |

Before publishing an image, generate an artifact inventory, checksums, vulnerability scan results, and rollback instructions.

### 3.3 Critical Data Storage Specification

- **Model weights:** Store weights in a controlled model repository or independent data volume. A generic mount path such as `/data/models/<model-name>/` can be used after access control and integrity verification.
- **Cluster configuration:** Store protected configuration backups and, where applicable, encrypted `etcd` snapshots outside the system disk. Do not publish a real `kubeconfig` or internal object name.
- **AGIOne configuration:** Use access-restricted and encrypted backups. Do not disclose real internal paths or object names in customer-facing documentation.
- **Secrets and certificates:** Use an approved key-management mechanism. Do not include secrets in images, scripts, or examples.
- **Logs and metrics:** Set retention periods, access permissions, and redaction rules according to data classification.
- **Recovery evidence:** Retain the exercise time, environment, version, results, and unresolved issues.

### 3.4 Traffic Removal and Recovery Coordination

Design traffic control as an explicit state machine instead of relying on one probe result. The following values are reference parameters, not defaults:

1. `Healthy`: The instance receives normal traffic and reports a heartbeat every `60` seconds.
2. `Suspect`: After `2` consecutive heartbeat failures, limit new traffic and continue evidence collection.
3. `Draining`: Set the scheduling weight to `0`, stop new requests, and wait for in-flight tasks or apply controlled retries.
4. `Isolated`: Fully isolate the instance while the node is repaired or rebuilt.
5. `Registering`: After rebuild, verify cluster registration, driver, storage, network, and service-process state.
6. `Warming`: Call the controlled `HTTP /health` endpoint. After `3` consecutive successes, send test traffic at a low weight.
7. `Healthy`: Increase the weight gradually and return to normal operation after the recovery gates are satisfied.

Record the trigger, operator, policy version, and rollback result for each state change.

## Chapter 4: Inference Engine Adaptation and Performance Baseline

### 4.1 Inference Engine for Accelerator Type A

#### 4.1.1 Base Image Construction

- Start from an approved Engine A image or internal artifact repository. Pin the image digest or an explicit version.
- Install the driver interface, communication library, and inference-framework dependencies for Accelerator Type A.
- Preload the tokenizer only when the model license and artifact policy permit it. Avoid an unreviewed network download during first startup.
- Inject the model path, service port, parallelism, concurrency, and context parameters through controlled configuration.
- Do not store customer models, production data, credentials, or internal endpoints in the image.
- Use a representative test model to verify startup, shutdown, health checks, log output, and multi-device communication.

#### 4.1.2 Key Parameters

| Reference parameter | Example starting value | Adjustment basis |
| --- | --- | --- |
| `max-seq-len` | Target maximum context length | Do not exceed the model, engine, or device-memory limit. |
| `max-input-token-len` | Target maximum input length | Validate with the actual prompt-length distribution. |
| `max-iter-times` | Target maximum output length | Align with the API limit and termination policy. |
| `world-size` | Number of participating devices, such as `8` | Match process count, device count, and communication topology. |
| `block-size` | `16` or `32` when supported | Compare device-memory fragmentation and throughput. |
| `max-batch-size` | Derived from the stress test | Increase in steps and stop before latency or memory gates fail. |
| Memory-utilization limit | `0.90` as a test starting point | Retain headroom for cache growth, monitoring, and recovery. |

### 4.2 Inference Engine for Accelerator Type B

#### 4.2.1 Base Image Construction

- Start from an approved Engine B image that supports Accelerator Type B.
- Pin dependency versions and retain license, source, patch, and vulnerability scan records.
- Enable optimized attention kernels only when the accelerator, precision mode, and engine version support them.
- Configure the approved multi-device communication library when an instance spans multiple devices or nodes.
- Add the device plugin, runtime, communication library, and engine versions to the compatibility matrix.
- Validate online and batch workloads with the same test protocol.

#### 4.2.2 Key Parameters

| Reference parameter | Example starting value | Adjustment basis |
| --- | --- | --- |
| `dtype` | `bfloat16` or `float16` | Select from device support and the approved accuracy evaluation. |
| `max-model-len` | Target maximum context length | Do not exceed model, engine, or device-memory limits. |
| `tensor-parallel-size` | `2` for a two-device validation profile | Match model size, device count, and interconnect bandwidth. |
| `gpu-memory-utilization` | `0.90` | Retain enough headroom to avoid out-of-memory failures. |
| `max-num-seqs` | `256` as a stress-test candidate | Reduce it when long contexts or queue latency exceed the gate. |
| `quantization` | `awq` or `gptq` when supported | Confirm model quality, engine compatibility, and license conditions. |

Type B must use the same metric definitions and evidence template as Type A. Do not set concurrency, throughput, or scheduling weights from theoretical compute capacity alone.

### 4.3 Performance Test Method

Use an approved load-testing tool to simulate the target request distribution. The test report must record the environment, tool version, model, precision, input length, output length, concurrency, duration, and failure-retry policy. Retain the raw result files and the exact command or scenario configuration.

#### 4.3.1 Test Scenario Configuration

| Test scenario | Prompt-token reference | Maximum output-token reference | Primary purpose |
| --- | --- | --- | --- |
| Short text | Less than `1k` | Less than `1k` | Establish a single-request baseline and verify streaming and errors. |
| Medium text | Less than `10k` | `5k` | Test step concurrency and common business-length requests. |
| Long text | Less than `32k` | `10k` | Verify device memory, queue growth, and long-context latency. |
| Mixed workload | Use the target distribution | Use the target distribution | Run online and batch requests together to verify resource isolation. |
| Fault scenario | Use a representative request | Use a representative request | Isolate an instance or node and verify retry, traffic removal, and recovery. |
| Stability scenario | Use the target distribution | Use the target distribution | Observe resource leaks, queue growth, and performance drift over time. |

#### 4.3.2 Key Performance Metrics and Evidence

The following table provides an illustrative tuning baseline. It does not report measured results for a product or customer environment.

| Metric | Meaning | Type A example | Type B example | Evidence required before publication |
| --- | --- | --- | --- | --- |
| TTFT | Time from request submission to the first token. | `< 2.5 s` under an FP16 profile | `< 1.8 s` under an AWQ INT4 profile | Record percentiles, load, model, hardware, precision, and version. |
| TPS | Tokens generated per second by one instance. | Approximately `180 tokens/s` under an FP16/TP8 profile | Approximately `120 tokens/s` under an INT4/TP4 profile | Record input/output lengths, parallelism, batching, and concurrency. |
| RPM | Requests completed per minute by one instance. | `20-40 RPM` | `30-60 RPM` | Define request length, timeout, retry, and success criteria. |
| TPM | Tokens processed per minute by one instance. | `8,000-15,000 TPM` | `6,000-12,000 TPM` | Preserve raw token counts and the calculation method. |
| Device utilization | Accelerator compute utilization under load. | `> 70%` as a test candidate | `> 65%` as a test candidate | Record the sampling interval and monitoring source. |
| TPOT | Average time per generated token after the first token. | Derive from the target test | Derive from the target test | Record the statistical method and outlier handling. |
| Success and error rate | Percentage of completed and failed requests. | Derive from the target test | Derive from the target test | Define how timeouts, retries, cancellations, and error types are counted. |

Scheduling weights for different compute pools must use results from the same protocol. Replace every example value with target-environment evidence before it is presented as a performance target, service level, or default capability.

## Chapter 5: Aggregated Model and Dynamic Scheduling Strategy

### 5.1 Aggregated Model Design

In AGIOne, an aggregated model provides one logical model ID and service entry point for multiple compatible inference instances. Callers do not need to know the backend distribution. Ensure that:

- Backend instances use compatible models, versions, tokenizers, and interface protocols.
- The scheduling policy recognizes compute pools, fault domains, health, and workload classes.
- Backend changes, weight adjustments, and failover operations have audit records and rollback methods.
- The aggregated entry point does not expose internal instance addresses or customer network information.

### 5.2 Three Synthetic Workload Configurations

#### 5.2.1 Low-Latency Online Service

| Configuration item | Reference example and usage condition |
| --- | --- |
| Backend instances | Start with `3-5` verified instances. Adjust from actual peak load and redundancy requirements. |
| Preferred compute pool | Select a pool with verified network latency and stability. |
| Scheduling policy | Use weighted round-robin combined with running-task count, health, and latency percentiles. |
| Request timeout | `3000 s` is a long-request reference example, not a recommended default. Set the smallest value that supports the validated request profile. |
| Rate limit | Start from a tested value such as `20 QPS` and verify queue and error behavior. |
| Active period | Use the observed online-service period rather than publishing a customer's work schedule. |
| Degradation | If no healthy backend is available, return an explicit error or use an approved fallback pool. |

#### 5.2.2 Throughput-Oriented Batch Processing

| Configuration item | Reference example and usage condition |
| --- | --- |
| Backend instances | Use a tested range such as `10-30` instances when the workload and available capacity justify it. |
| Preferred compute pool | Select a pool with verified throughput, storage, and long-task stability. |
| Scheduling policy | Combine weighted distribution, running tasks, available capacity, task priority, and estimated completion time. |
| Request timeout | `3000 s` can be evaluated for long generation tasks; validate cancellation and retry behavior. |
| Concurrency limit | Keep the operating point below the failure boundary from the stress test. Do not use `99%` without evidence. |
| Data requirements | Process only approved data and record input and output retention policies. |

#### 5.2.3 Off-Peak Full-Batch, Elastic Overflow, and Failover

| Configuration item | Reference example and usage condition |
| --- | --- |
| Backend instances | Use all verified available instances only when online-service redundancy remains protected. |
| Activation condition | Enter the off-peak window, reach a verified capacity threshold, or confirm a primary-pool failure. |
| Backend requirements | The standby pool has passed model, network, permission, storage, and performance validation. |
| Scheduling policy | Enable batching when supported, start failover with a small percentage of traffic, and increase after gates pass. |
| Request timeout | Evaluate the `3000 s` reference example only for validated long-running tasks. |
| Failback condition | The primary pool has recovered, passed stability observation, and has no unresolved alerts. |

### 5.3 Dynamic Distribution Scheduling

The following simplified formula can be used as a reference algorithm for dynamic weights:

> `Weight(i) = BaseCapacity(i) × HealthScore(i) / (RunningTasks(i) + 1)`

- `BaseCapacity`: A normalized TPM or throughput baseline from the same test protocol.
- `HealthScore`: A value from `0.0` to `1.0`; set it to `0` when the instance is isolated.
- `RunningTasks`: The current number of requests handled by the instance.

Dynamic scheduling can also use these signals:

- Capacity baselines from the same test protocol.
- Current health and consecutive error conditions.
- Running tasks and queue length.
- Latency, success-rate, and error-rate trends.
- Quotas, fault domains, and data-residency constraints.

The formula is a reference, not a complete production policy. Add queue latency, quotas, fault domains, and data-residency constraints. Set limits, cooldown periods, and change rates for scheduling weights. Record the input signals, policy version, and result of each adjustment. Automated policies must provide manual pause and rollback capabilities.

An evaluation interval of `1` minute can be used as an initial parameter. Shorten or lengthen it only after checking metric freshness, routing oscillation, and recovery speed.

## Chapter 6: Horizontal Scaling Best Practices

### 6.1 Scale-Out Process

1. Confirm insufficient capacity through consistent monitoring data, not one instantaneous metric.
2. Check quotas, devices, images, models, networks, storage, and license conditions in the target compute pool.
3. Prepare the node from the approved base image and register it with an initial scheduling weight of `0`.
4. Create the inference instance and associate it with the intended aggregated model without sending normal business traffic.
5. Run startup, model loading, `HTTP /health`, and representative test-request checks.
6. Start warm-up with a small percentage of traffic. A `5` minute warm-up is a reference value that must be adjusted from model-loading and cache behavior.
7. Increase traffic gradually after approved gates pass, and record RPM, TTFT, error rate, queue, and resource metrics before and after scaling.
8. If a gate fails, set the weight back to `0`, isolate the instance, and roll back the change.

Scale-out can affect queues, caches, and backend distribution. Do not promise that it has no effect on callers. Define acceptable impact and rollback conditions before the change.

### 6.2 Scale-In Process

1. Confirm that remaining capacity covers the target load and approved redundancy requirements.
2. Put the target instance in the draining state, set its weight to `0`, and stop sending new requests to it.
3. Wait for running tasks to reach `0`. A maximum wait of `request-timeout × 2` is a reference guard and must be bounded by the failure policy.
4. Remove the instance from the aggregated backend list and stop the inference container after verifying queues and error rate.
5. Before removing a node, confirm that no other workloads on the node are affected. Use `kubectl drain` only after reviewing disruption budgets, local storage, and daemon workloads.
6. Retain metrics and change records from before and after scale-in, and verify the scale-out path again.

## Chapter 7: Operations Monitoring and Observability

### 7.1 Monitoring Metrics

#### 7.1.1 Application-Layer Metrics

| Metric | Purpose |
| --- | --- |
| RPM / RPH / RPD | Shows request volume per minute, hour, and day. |
| TPM / TPH / TPD | Shows token volume per minute, hour, and day. |
| TTFT and TPOT | Shows first-token response and generation speed. |
| P50 / P95 / P99 end-to-end latency | Shows the latency distribution instead of only an average. |
| Success rate and error rate by type | Separates caller, platform, network, and inference-instance failures. |
| Input and output length distribution | Explains performance changes and calibrates test scenarios. |

#### 7.1.2 Scheduling-Layer Metrics

| Metric | Purpose |
| --- | --- |
| Backend health | Confirms whether an instance satisfies the traffic gate. |
| Running tasks and queue length | Identifies queue growth and load imbalance. |
| Instance-weight distribution | Shows whether weights match capacity and health. |
| Actual route distribution | Confirms that request distribution matches the policy. |
| Circuit-breaker and degradation events | Records the backend, trigger, duration, and recovery result. |
| Failover and failback events | Traces triggers, duration, and results. |

#### 7.1.3 Infrastructure-Layer Metrics

The thresholds below are initial alert candidates. They must be replaced by hardware specifications, measured baselines, and operations policy.

| Metric | Example alert candidate | Purpose |
| --- | --- | --- |
| Accelerator utilization | `< 20%` for sustained idleness; `> 90%` for `5` minutes for saturation review | Identifies underuse and sustained pressure. |
| Accelerator memory | `> 90%` | Identifies fragmentation and out-of-memory risk. |
| Device temperature | `> 85°C` warning; `> 90°C` urgent review | Identifies thermal anomalies. Use the hardware vendor's limits if they are stricter. |
| CPU utilization | `> 80%` | Identifies preprocessing or runtime bottlenecks. |
| Host memory | `> 85%` | Identifies host-memory pressure. |
| Network and storage | Derive from tested bandwidth, latency, and queue depth | Identifies data-path bottlenecks. |
| Node state and restarts | `NotReady > 60 s` as an initial trigger | Correlates infrastructure events with service anomalies. |

### 7.2 Correlated Troubleshooting Process

1. At the application layer, identify the time window from RPM, success rate, latency, and error-type trends.
2. At the scheduling layer, review backend health, running tasks, queue length, weights, and actual route distribution.
3. Correlate high running-task counts with accelerator utilization, device memory, and temperature. High utilization can indicate a capacity limit; low utilization with a growing queue can indicate a blocked runtime, memory failure, or downstream dependency.
4. Review inference-service logs for out-of-memory, timeout, connection refusal, device, and communication errors. Use the exact error taxonomy of the selected engine.
5. Compare with a normal baseline for the same version to distinguish capacity, configuration, model, network, and hardware issues.
6. Isolate an abnormal backend when necessary, adjust routing temporarily, and use non-mutating requests to validate recovery.
7. Record the root cause, fix, validation evidence, and preventive action.

### 7.3 Operations Analysis and Capacity Decisions

- **Throughput trends:** Review RPM/RPH/RPD and TPM/TPH/TPD by hour, day, and week to identify recurring peaks.
- **Resource heatmaps:** Compare accelerator utilization by instance and time period to identify persistent imbalance or scale-in candidates.
- **Latency distribution:** Review P50/P95/P99 TTFT and end-to-end latency before changing capacity.
- **Capacity analysis:** Combine test baselines, observed peaks, queue growth, and redundancy requirements to assess scaling needs.
- **Cost analysis:** Compare cost per request or token under the same service-quality target and test protocol.
- **Predictive analysis:** A planning model can use a window such as the next `30` days and an early-warning period such as `7` days. These are configurable examples, not guaranteed platform features or forecast accuracy.

Product, operations, and test owners must approve alert thresholds, scaling thresholds, and prediction periods from evidence in the target environment.

## Chapter 8: Security and Compliance

### 8.1 Network Security

- Protect cross-zone communication with approved TLS versions, cipher suites, and certificate-management processes. `TLS 1.2` can be a minimum compatibility baseline; use `TLS 1.3` where the target security policy and components support it.
- Use mutual TLS or an equivalent authenticated channel between the management plane and compute-pool components.
- Use a supported caller-authentication method, such as an API key or OAuth 2.0, and assign separate credentials and scopes to each caller.
- Open only required ports and directions, and audit private-network, firewall, and security-group rules regularly.
- Do not expose inference-instance ports directly to untrusted networks. Use the controlled aggregated-model or service entry point.
- Retain network, certificate, credential-scope, and permission change records, and verify rollback methods.

### 8.2 Data Security

- Classify models, inputs, outputs, logs, and metrics, and enforce least-privilege access.
- Use approved encryption for data at rest and in transit.
- Do not include credentials, keys, certificates, customer identifiers, or private endpoints in documentation, images, logs, or test data.
- By default, avoid storing prompt and output bodies in ordinary operational logs. If content logging is required, document the lawful purpose, access control, redaction, retention, deletion, and audit rules.
- Prefer request IDs, token counts, latency, status, and error categories for routine observability.
- Verify that outbound connections for telemetry, updates, licenses, model downloads, and remote support match delivery documentation and deployment policy.
- External examples must use synthetic organizations, topologies, accounts, model identifiers, and approved test data.

## Appendix

### Appendix A: Core Glossary

| Term | Definition |
| --- | --- |
| AGIOne | The platform described in this guide. It manages compute pools, models, inference services, scheduling, monitoring, and permissions. |
| Compute pool | A set of compute resources with defined capabilities, network boundaries, and fault domains. |
| Accelerator Type A / B | Synthetic accelerator families that represent technical differences without identifying a customer hardware combination. |
| Engine A / B | Synthetic inference-engine profiles associated with the two accelerator families. |
| Aggregated model | A logical object that combines compatible inference instances behind one service entry point. |
| Inference instance | A service process or container that runs a model and handles inference requests. |
| TTFT | Time from request submission to the first token. |
| TPOT | Average time per generated token after the first token. |
| RPM / TPM | Requests per minute and tokens per minute. |
| Running tasks | Requests currently being processed by one inference instance. |
| In-flight task | A request or batch task that is currently running and not complete. |
| Traffic removal | The process of stopping new requests to an instance and handling its in-flight tasks. |
