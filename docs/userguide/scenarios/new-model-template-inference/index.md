---
prev: false
next: true
---

# Scenario Overview - On-Prem New Model Template Preparation & Deployment

This scenario connects local model files, inference templates, instance deployment, and service registration. Choose hardware and frameworks according to actual compatibility rather than copying one Ascend 910B or vLLM example.

## Applicable Roles

- Operator: model versions, framework relations, and inference templates.
- Model Provider: deploy from a ready template, register the service, and verify calls.

The operator supplies the model version, framework relation, adapted accelerator, and deployable template. The provider checks the specification before creating the instance and, after registration, hands the model identifier, protocol, and authorized scope to the intended user.

## Goals

- Verify model versions and file state on linked clusters.
- Align model, framework, image, accelerator, and VRAM (accelerator memory) factor dependencies; factors are parameters used to estimate memory needs.
- Bring the inference service to readiness, pass its test, register a private model, and verify authorized calls.

## Scenario Flow

| Stage | Key Result |
| --- | --- |
| Prepare model | File source, version, and cluster download state are checked. |
| Prepare template | Framework relations are correct and a deployable option is visible to the user. |
| Deploy instance | Parameters match the specification and the service is ready. |
| Register service | The smoke test (a minimal connectivity check) passes, followed by private-model registration and state checks. |
| Verify calls | The intended account receives valid output and locates the log. |

## Before You Start

- Clusters, accelerators, images, specifications, quota, and account permissions are ready.
- Confirm model license, version, and workload requirements; obtain authorization for resource creation and real-request tests.

## Recommended Reading Order

1. When a deployable template exists, start with Scenario A in the [Complete Guide](./template-deployment-guide).
2. For a new model version, the operator completes Scenario B before handing the template to the provider.
3. For individual checks, use [Inference Template Building](../on-prem-inference-template/) and [Deployment Status Check](../on-prem-model-deployment-status/).

## Document Index

| Document | Description |
| --- | --- |
| [New Model Template Preparation and Deployment Guide](./template-deployment-guide) | Role-based preparation or deployment from an existing template, private registration, and call verification. |

## Completion Checklist

| Check | Pass Criteria |
| --- | --- |
| Template ready | Model files and framework dependencies are confirmed and the user-side template is deployable. |
| Instance ready | Resources match the preview and service port and protocol are checked. |
| Publication and calls | Registration and revision state are confirmed; an authorized account succeeds and locates the log. |

## Troubleshooting

Use the [Complete Guide's troubleshooting entries](./template-deployment-guide#troubleshooting) to separate model files, template, instance, and smoke-test failures. A passing test is not completed publication.
