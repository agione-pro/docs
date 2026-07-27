# Image Services

::: info Document Information
Version: v1.0
Updated: 2026-07-08
:::

## Feature Overview

`Image Services` is used to connect Harbor, Docker Registry, or compatible image repositories, providing image pull capability for regions, clusters, jobs, online IDEs, and model instances. When no available image component exists, later image sync, image upload, job startup, and model service deployment are usually affected.

| Item | Content |
| --- | --- |
| Applicable role | Operator |
| Navigation path | AI Infrastructure > On-Prem > Resource Pools > Image Services |
| Page route | `/powerone/resourcepool/images` |
| Managed objects | Service type, image, name, Endpoint (Public URL), Internal IP Address, Username, Password, Description, and Actions |
| Typical use | Connect Harbor/Registry to support public images, custom images, job image pulling, and user-side image project sync |

#### Beginner Explanation

Image Services is like the image repository access card of the platform. It tells the platform where to pull runtime images, which credentials to use, and which regions or clusters can use the repository. When the image component is configured incorrectly, user-side model instances, online IDEs, runtime instances, and jobs usually get stuck during image pull.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Harbor | A common enterprise container image repository. |
| Registry | Image repository service used to store and distribute container images. |
| Endpoint | Service address used by the platform or clusters to access the image repository. |
| Robot Credentials | Automated image repository account and password. These are sensitive credentials. |
| Image Pull Secret | Credential used by Kubernetes to pull private images. |
| Project Sync Scope | Scope of projects, namespaces, or image lists synchronized from the image repository by the platform. |

## Prerequisites

1. The image repository has been deployed and can be accessed from the platform side and target clusters.
2. Repository address, Endpoint, authentication method, access credentials, and certificate policy have been prepared.
3. The target cluster can resolve and access the image repository address.
4. Associated regions, bound clusters, public images, custom images, and tenant project permission boundaries have been confirmed.
5. For learning or screenshots, only view fields and forms without submitting real image component configuration.

## Page Description

The page displays connected image components, status, access address, project count, sync status, and associated regions.

The following figure shows the image services list, where component status, Endpoint, sync status, and operation entrypoints can be viewed.

![Image Services](./images/image-services-list.png)

## Main Operations

### Register Image Component

#### Applicable Scenarios

Register an image component when a new Harbor, Docker Registry, or compatible image repository needs to be connected and used by specified regions, clusters, or user-side image services.

#### Steps

1. Go to `AI Infrastructure > On-Prem > Resource Pools > Image Services`.
2. Click `Register component`.
3. Fill in `Service Type`, `Image`, `Name`, `Endpoint (Public URL)`, `Internal IP Address`, `Username`, `Password`, and `Description` according to the page fields.
4. If the page provides `Test Connection`, run the read-only connectivity check first and confirm the returned result.
5. Before submission, confirm that the repository address is reachable from both the platform side and target clusters, and that robot credentials or access accounts have minimum required permissions.
6. Before clicking the final `Save`, `Submit`, or `OK`, verify Endpoint, internal IP address, credential source, and component usage scope again.
7. For learning or page validation only, view fields and forms without submitting real image component configuration.

The following figure shows the Register Image Component form, used to fill in image service connection information and sync configuration.

![Register Image Component](./images/register-component.png)

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Service Type | Yes | Dropdown / enum | `Image` | Service type of the current component. On the Image Services page, this usually displays `Image`. |
| Image | Yes | Dropdown / enum | `registry.example.com/project/runtime:v1` | Service type value when registering an image component. Keep it consistent with the actual page option. |
| Name | Yes | Text | `Example Name` | Display name of the image service. Use a name that reflects repository purpose, region, or environment. |
| Endpoint (Public URL) | Yes | Address / path | `https://endpoint.example.com` | Public entry used by the platform or user side to access the image repository. Use placeholders only in documentation. Do not record real addresses. |
| Internal IP Address | Conditionally required | IP address | `192.0.2.10` | Internal address used by clusters or the platform to access the image repository. Keep it consistent with real network, DNS, and container runtime configuration. |
| Username | Conditionally required | Address / path | `operator-user` | Image repository access account. Fill it only in system forms. Do not write it in documents, screenshots, or tickets. |
| Password | Conditionally required | Credential / sensitive text | `<password>` | Image repository access password. Sensitive credential. Do not write it in documents, screenshots, or tickets. |
| Description | No | Multi-line text | `Example description` | Component purpose, boundary, or maintenance notes. Record non-sensitive notes only. |
| Actions | System-generated | Action entry | `Edit` | Register component, Test Connection, Cancel, Confirm, edit, delete, and similar entries. `Confirm` and `Delete` are high-risk actions. |

## Pitfalls

- Registering an image component affects image pull capability for regions, clusters, jobs, online IDEs, and model instances.
- Incorrect repository address, certificate chain, Robot credentials, or Image Pull Secret may cause `ImagePullBackOff`.
- Binding the image component to the wrong region may cause user-side image projects to be invisible or jobs to fail image pull.
- `Save`, `Submit`, and `OK` are high-risk final actions.
- Do not record real repository addresses, Robot passwords, Image Pull Secret, tokens, AK/SK, internal addresses, cluster IDs, resource pool IDs, or internal test parameters.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page can be opened | `AI Infra > On-Prem > Resource Pools > Image Services` is accessible. | Check menu configuration and account permissions. |
| Component list loads normally | Component name, status, access address, project count, sync status, and associated region are displayed normally. | Refresh the page and check service status or browser console errors. |
| Registration entry is visible | `Register component` is displayed on the page. | Check operator permissions, License, and page configuration. |
| Registration form can be opened | Clicking the entry shows Service Type, Name, Endpoint (Public URL), Internal IP Address, Username, and Password fields. | Check route, permissions, and frontend errors. |
| Required field validation works | Validation prompts appear when Name, Endpoint, Username, or Password is missing. | Complete fields according to page prompts without bypassing validation. |
| No real submission during learning | No real save, submit, or OK action is triggered. | If submitted by mistake, immediately verify the component list and binding scope. |
| Status is traceable after real submission | The new component appears in the list, and status and sync result are visible. | Check repository connectivity, credentials, certificates, and sync logs. |
| Downstream image pull can be verified | A test job, online IDE, or model instance can pull images normally. | Check Image Pull Secret, region binding, DNS, network, and certificate trust. |

## FAQ

#### Job Image Pull Fails

**Symptom:**

Instance events or logs show image pull failure, authentication failure, image not found, or `ImagePullBackOff`.

**Possible Causes:**

- Image address, project name, or tag is incorrect.
- Robot credentials, Image Pull Secret, or repository permissions are configured incorrectly.
- The target cluster cannot access the image repository Endpoint.
- The private certificate is not trusted by the cluster.
- The image component is not bound to the region or cluster where the job runs.

**Solution:**

1. Check the complete image address, project name, and tag.
2. Verify image component authentication information, Robot credentials, and user-side project permissions.
3. Verify repository network connectivity and DNS resolution on the target node.
4. Check certificate trust and container runtime configuration.
5. Verify the binding relationship among region, cluster, and image component.

#### User Side Cannot See Image Projects

**Symptom:**

After a regular user enters Image Services, custom projects or public images are not visible.

**Possible Causes:**

- The image component is not bound to the region selected by the user.
- Project sync scope does not cover the target project.
- The user has no image service permissions.
- Image sync has not completed or has failed.

**Solution:**

1. Check the binding relationship between the region and image component.
2. Verify project sync scope, tenant permissions, and account permissions.
3. Perform image sync or refresh the page.
4. Check sync status, update time, and error messages.

## Next Steps

1. Go to [Regions / Availability Zones](../regions-zones/) to bind or verify the image component.
2. Guide users to create projects and push images in [Image Services](../../../user/extensions/images/).
3. Go to Image Management or user-side Image Services to confirm that projects, images, and tags are visible.
4. Use a test job, online IDE, or model instance to verify image pull and startup.

## Notes

- Registering an image component affects image pull capability for regions, clusters, jobs, online IDEs, and model instances.
- Robot credentials, repository passwords, Image Pull Secret, tokens, and certificate materials are sensitive information.
- Incorrect repository address, certificate chain, Robot credentials, or Image Pull Secret may cause `ImagePullBackOff`.
- Binding the image component to the wrong region may cause user-side image projects to be invisible or jobs to fail image pull.
- Long-term use of the `latest` tag in production templates is not recommended. Use explicit version tags instead.
- `Save`, `Submit`, and `OK` are high-risk final actions. Do not trigger them during learning or screenshots.
- Do not record real repository addresses, Robot passwords, Image Pull Secret, tokens, AK/SK, internal addresses, cluster IDs, resource pool IDs, or internal test parameters.
