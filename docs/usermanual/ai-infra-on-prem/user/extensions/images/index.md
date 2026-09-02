# Images

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Role | Model Provider |
| Navigation Path | AI Infra(On-Prem) > Extensions > Images |
| Page Route | `/powerone/expand-service/image-service` |
| Managed Object | Configuration, status, and relationships on Images |

#### Beginner Explanation

An image is the runtime environment of a job. It contains the system, framework, Python packages, startup scripts, and dependencies. An image project is like a namespace used to organize images from the same team or business. Before pushing images, confirm repository address, project name, image tag, and login credentials.

#### Terms

| Term | Description |
| --- | --- |
| Image | Container runtime environment. |
| Image Project | Project or namespace in the image repository. |
| Image Tag | Image version identifier, such as `v1.0.0`. |

#### Recommended Operation Order

Confirm prerequisites for My image projects, public images, push history, and image upload entrypoint, follow Main Operations, run Result Validation, and continue to the next page.

#### First-Time User Notes

Confirm that the task involves Configuration, status, and relationships on Images, and then follow the recommended order. If fields or state differ from expectations, check prerequisites before continuing downstream.

## Prerequisites

1. Image services have been opened in the target region.
2. The current account has permissions to view, create image projects, and push images.
3. Docker or a compatible container tool has been installed locally.
4. A buildable Dockerfile or local image has been prepared.
5. Do not expose robot passwords, repository passwords, or access tokens in screenshots, documentation, or command records.

## Page Description

> **Verification status: Partially verified.** Screenshots and fields use existing user-side evidence. The live Operator menu does not replace independent Model Provider or Model Consumer evidence.

Use this page to view and handle Configuration, status, and relationships on Images.

![Images](./images/images-list.png)

The image keeps the sidebar and complete feature area. Confirm the page title, scope, and primary operation entry.

The page contains three views: `My Images`, `Public Images`, and `Push History`. The screenshot shows sync, add project, project list, and image information areas.

## Main Operations

### View Image Projects

1. Go to `Extension Services > Image Service`.
2. Filter by project name, status, image count, or update time.
3. Open details and check member permissions, registry scope, and image list.
4. If no record is returned, reset filters. Do not share internal registry locations or access credentials.

### Manage Project Members or Images

1. Open the target project and distinguish member management, image upload, version management, and deletion entries.
2. Record current members, permissions, and image versions referenced by instances.
3. Before upload, permission changes, or deletion, confirm authorization and dependencies. Before the final action, confirm the resource, data, and impact, and execute it only after approval.
4. After an approved change, check the project, image list, and operation logs. If abnormal, restore according to the record.

### Add Image Project

#### Procedure

1. Go to `AI Infrastructure > On-Prem > Extension Services > Image Services`.
2. On the `My Images` page, Click **"Add Project"**.
3. Fill in the project name.
4. Click **"Confirm"**.

![Add image project](./images/add-project.png)

The image shows the image-project creation dialog. Verify the project name and repository scope before confirming.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Project Name | Yes | Text | `team-a` | Image repository project name. |
| Image Repository | System-generated | URL | `<BASE_URL>/<PROJECT>/<IMAGE>:<TAG>` | Repository address for pushing images. |
| Robot Credentials | Conditionally required | Secret text | `<PERSONAL_KEY>` | Credentials used to push or pull images. |
| Image Tag | Yes | Text | `app:v1` | Image version tag. |
| Sync Status | System-generated | Enum | `Synced` | Whether the image can be selected by jobs. |

## Pitfalls

- If an image push fails, check the repository address, project namespace, sign-in credentials, and tag before rebuilding the image.
- Use explicit version tags instead of relying on `latest`, so that runtime environments remain traceable.
- Do not include keys, internal addresses, or customer data in an image. Complete a security check before publishing it.

#### Add Image Project Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Project listed | The project appears in the `My Images` list. | Check the image project, repository address, push permissions, and image tag. |
| Project information | Image count, quota usage, and the push entry point are visible under the project. | Check the image project, repository address, push permissions, and image tag. |

#### Push Custom Image

#### Pre-Operation Check

1. The target image project has been created on the page.
2. Repository address and push instructions have been obtained from the page.
3. If the page provides robot credentials, use them only in the local terminal and do not write them into documentation, script repositories, or screenshots.
4. Use explicit image version tags. Using only `latest` is not recommended.

#### Command Examples

The following examples use placeholders. Replace them with the repository address, project name, and local image name provided by the page when running them.

```bash
docker login <BASE_URL>
docker tag <local-image>:<local-tag> <BASE_URL>/<project>/<image>:<version>
docker push <BASE_URL>/<project>/<image>:<version>
```

If you need to build the image locally first, run:

```bash
docker build -t <local-image>:<local-tag> .
```

#### Push Custom Image Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Push command | The `docker push` command succeeds. | Check the image project, repository address, push permissions, and image tag. |
| Page synchronization | Return to Image Services and select `Sync`. | Check the image project, repository address, push permissions, and image tag. |
| Image and tag | The new image and tag are visible under the project. | Check the image project, repository address, push permissions, and image tag. |
| Image selection | The image can be selected when creating an Online IDE, runtime instance, or model service. | Check the image project, repository address, push permissions, and image tag. |

#### View Public Images and Push History

1. Switch to `Public Images` to view base images provided by the platform.
2. Switch to `Push History` to view image push records.
3. If push fails, locate the cause from history records and local command output.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Page entry | Images opens with the target operation entry | Check Operator permission and whether the menu is available |
| Object record | Configuration, status, and relationships on Images is visible in the list or details | Reset filters and verify name, ownership, and creation result |
| State result | State after creation or change matches the page message | Check operation feedback, dependency state, and latest update time |
| Downstream use | A downstream page can select or associate the target | Return to prerequisites and check enabled state, ownership, and visibility |

## FAQ

#### Target Is Missing from Images

**Symptom:**

The page opens, but the expected Configuration, status, and relationships on Images is missing.

**Possible Causes:**

- Filters remain active.
- the object belongs to another scope.
- a prerequisite is incomplete.

**Solution:**

1. Reset filters
2. verify region or tenant ownership
3. confirm prerequisite state.

#### The Operation Entry on Images Is Unavailable

**Symptom:**

The create, register, or maintain entry is hidden or disabled.

**Possible Causes:**

- Role permission is insufficient.
- the page is read-only.
- dependencies are not ready.

**Solution:**

1. Check Operator permission
2. read the page message
3. complete dependency configuration first.

#### A Required Field on Images Has No Options

**Symptom:**

The form opens, but a selection list is empty.

**Possible Causes:**

- Candidates are disabled.
- ownership differs.
- the current account cannot see them.

**Solution:**

1. Check candidate state
2. verify ownership
3. confirm visibility and refresh the form.

#### Images Has an Abnormal State After the Operation

**Symptom:**

A record exists after submission, but its state is unexpected.

**Possible Causes:**

- Connectivity or validation failed.
- a dependency is abnormal.
- processing is incomplete.

**Solution:**

1. Check feedback and update time
2. inspect related objects
3. troubleshoot the processing stage.

#### A Downstream Page Cannot Use Images

**Symptom:**

The current page is normal, but a downstream page cannot select or associate Configuration, status, and relationships on Images.

**Possible Causes:**

- Visibility differs.
- the object is disabled.
- downstream cache is stale.

**Solution:**

1. Check enabled state and ownership
2. verify role visibility
3. refresh and select again.

## Notes

- Do not screenshot robot credentials, repository passwords, or tokens on image upload pages.
- Production images should use explicit version tags and avoid using only `latest`.
- When push fails, do not paste complete repository addresses, usernames, or robot passwords into public tickets.

## Next Steps

1. Select this image in Online IDE or Runtime Instances to verify dependencies.
2. Maintain version tags and change records for production images.
3. Clean up unused tags to reduce image repository storage usage.
