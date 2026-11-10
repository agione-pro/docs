# Runtime Images

This task registers a cloud image used by inference frameworks. Image availability directly affects whether downstream services can start.

## Target Outcome

The target cloud environment can pull the image, and inference-framework configuration can select it.

## Applicable Roles

- Platform Operator

## Before You Start

- Confirm the full repository address, controlled version tag (the image version label), and supported framework types.
- Confirm that the target cloud environment has network access and pull permission for the image repository.

## Procedure

### Add an Image

1. Open **On-Cloud > Deploy Assets > Runtime Images** and review existing records for the target cloud platform and region.

![Runtime Images](./images/runtime-images-runtime-images.png)

2. Select **Add Runtime Image**, choose the cloud platform, region, and public/private type, and enter the name, complete registry path, and description. Verify the applicable architecture and pool scope on the form.
3. Use an explicit version in the complete path, such as `registry.example.com/ai/runtime:example-tag`; this example is not a real pullable image.
4. Select **Confirm**, verify the record and scope, and check that the image can be selected by the framework version.

![Add Runtime Image](./images/runtime-images-add-runtime-image.png)

If the entry only shows an unavailable-feature notice, stop this configuration step rather than treating registration as an available capability. Ask the operator to confirm the required image source. See the linked manual for complete fields and editing.

## Completion Checklist

Check the results below; resolve failed items using the troubleshooting section before continuing.

| Check | Pass Criteria |
| --- | --- |
| 1 | Repository address and tag uniquely identify a controlled image. |
| 2 | The target cloud environment can pull the image. |
| 3 | Inference-framework configuration can select the image. |

## Troubleshooting

| Symptom | Check First |
| --- | --- |
| Image pull fails | Repository address, tag, pull permission, network, and architecture |
| Image pulls but the service fails to start | Image content, framework compatibility, startup command, and port |

## User Manual

[Review complete fields, validation rules, and troubleshooting for Runtime Images](../../../../usermanual/ai-infra-on-cloud/operator/deploy-assets/runtime-images/)
