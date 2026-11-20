---
prev: false
next: true
---

# Scenario Overview - On-Prem Runtime Images and Storage Foundation

This scenario helps operators configure the image registry, runtime images, and block, file, or object storage after onboarding a local cluster, creating a reusable foundation for online IDEs, training jobs, and inference services.

An image registry stores container runtime environments, while storage components provide backend data access. Component registration, image-content upload, and instance mounting are separate steps.

## Applicable Roles

- Platform Operators, on-prem compute administrators, and storage administrators


**Role handoff:** Operators and image/storage administrators prepare components and available capabilities, then hand the region, controlled image version, and storage scope to deployment users. User-side image groups and push validation are handled by users with the corresponding permissions; credentials are not shared handoff material.

## Scenario Goals

- Make the image service reachable from the platform and target cluster and keep synchronization healthy.
- Give runtime images explicit versions, hardware environments, and purpose labels.
- Connect storage capabilities that are actually available. Verify image and object-storage bindings in region configuration and check availability before using block/file storage.
- Validate that a test workload can pull the image and create, mount, or access storage.

## Scenario Flow

**Main path:** Confirm cluster and network -> Register image service -> Synchronize runtime images -> Register storage components -> Bind the region -> Validate with a test workload

| Stage | Key Result |
| --- | --- |
| 1. Confirm dependencies | Cluster, network, registry, and storage services are reachable |
| 2. Prepare images | Image service is healthy and the versioned target image is visible |
| 3. Prepare storage | Required storage components are registered and bound to the target region |
| 4. Validate together | A workload can pull the image and use storage as intended |

## Before You Start

- Complete [On-Prem Compute Onboarding](../on-prem-compute-onboarding/).
- Prepare the image registry, storage services, network, and authentication materials.
- Define the target region, cluster, tenant isolation, capacity, and reclaim policies.
- Enter credentials only in the platform configuration page, never in documentation or tickets.

## Recommended Reading Order

1. Register the image service and validate synchronization.
2. Synchronize or upload runtime images with explicit version tags.
3. Select available storage for the workload. Keep the block/file storage documentation, but do not make unavailable entries an executable prerequisite.
4. Bind the region and run an end-to-end test workload.

## Document Index

| Document | Description |
| --- | --- |
| [Runtime Image and Storage Foundation Workflow](./runtime-storage-workflow) | Complete steps from registry onboarding through storage and test-workload validation |

## Related Scenarios

- [On-Prem Development, Training, and Assets](../on-prem-dev-training-assets/): use runtime images and shared storage for development and training.
- [On-Prem Inference Template Building](../on-prem-inference-template/): reference available images, models, and resource specifications in templates.
- [On-Prem Model Deployment and Status Check](../on-prem-model-deployment-status/): validate image pulls, volume mounts, and instance state.

## Completion Checklist

Verify that the target cluster can actually use the configured runtime and storage.

| Check | Pass Criteria |
| --- | --- |
| 1 | Image service state is healthy and it is bound to the correct region or cluster. |
| 2 | The target runtime image is visible with a clear version, architecture, hardware environment, and purpose. |
| 3 | Required storage state, capacity, access policy, and region binding are correct. |
| 4 | A test workload can pull the image and create, mount, read/write, or access storage. |
| 5 | Owners for deletion, reclaim, backup, and credential rotation are identified. |
