# Supported Accelerators

:::: info Document Information
Version: v1.0
Updated: 2026-07-13
::::

## How to Read This List

The models below are within the current AGIOne accelerator-management scope. Inclusion means that the accelerator model can be evaluated for On-Prem onboarding; it does **not** guarantee that every driver, runtime, image, inference engine, model, quantization method, or multi-node topology is compatible.

Before delivery, freeze and validate the complete combination:

**Accelerator -> Operating system -> Driver and runtime -> Container image -> Inference engine -> Model -> Deployment topology**

## Accelerator List

| Vendor | Architecture / Series | Models |
| --- | --- | --- |
| NVIDIA | Hopper | H800, H200, H100, H20 |
| NVIDIA | Ampere | A100, A800, A40, A30, A10, RTX A6000, RTX A5000, RTX A4000, RTX A2000, RTX 3090, RTX 3060 |
| NVIDIA | Ada | L40, L40S, L20, L20S, L4, L2, RTX 6000, RTX 5000, RTX 4500, RTX 4000, RTX 2000, RTX 4090, RTX 4090D |
| Huawei Ascend | Ascend 910 | Ascend 910B, Ascend 910C |
| Enflame | Enflame | 106 |
| Biren | Biren | S60 |
| Hygon | BW | BW200 |

## Required Project Validation

| Check | What to Confirm |
| --- | --- |
| Hardware inventory | Exact model, card count, device memory, server architecture, and topology |
| Software stack | Operating system, kernel, driver, CUDA/CANN/vendor runtime, and device plugin |
| Runtime assets | Container runtime, image, inference engine, model weights, and storage path |
| Model fit | Required memory, precision or quantization, parallelism, context length, and expected throughput |
| Cluster readiness | Node status, device registration, scheduling labels, storage, registry, network, and time synchronization |
| Acceptance | Deployment success, model-call correctness, monitoring visibility, stability, and target performance |

For accelerators not listed above, perform an adaptation assessment before committing to onboarding or model deployment.

::: warning Separate Cloud and Accelerator Support
Huawei Ascend accelerator onboarding is an AI Infra On-Prem compatibility topic. It does not mean that Huawei Cloud access is supported. Huawei Cloud access is currently temporarily unsupported.
:::

## Related Documentation

- [Support Matrix](./support-matrix)
- [Other Limitations](./limitations)
- [Compute Node Deployment Requirements](../../installation/deployment-requirements-for-managing-compute-nodes)
- [Scenario Guide: Accelerator Management](../../userguide/scenarios/on-prem-compute-onboarding/accelerator-management/)
