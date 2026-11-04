# Video

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **Playground** > **Video** |
| Route | `/modelone/exploration/video` |
| Managed objects | Video model, resolution, ratio, and generation tasks |

**New to this page**: Video turns a text prompt into a short video. Choose a video model and resolution, enter a scene description, and track the task in **Task query**.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Text-to-Video | AI generation technology translating text scripts or scene descriptions into coherent sequential video frame sequences. |
| Resolution & Ratio | Visual clarity tiers (e.g., 480P, 720P, 1080P) and framing dimensions (e.g., 16:9 landscape, 9:16 portrait). |
| Asynchronous Task Pipeline | Lifecycle queuing and background task architecture handling compute-intensive rendering that typically requires 1–5 minutes. |
| Duration Billing | Video models generally bill based on generated video seconds, frame counts, or resolution tiers, differing from token billing. |

## Prerequisites

1. Your account can open **Playground > Video**.
2. The account has available credits or a free quota for the model.
3. Duration, resolution, and billing unit are confirmed.

## Page Description

The page contains a model area, a parameter area, and an input area:

| Area | Description |
| --- | --- |
| Top model & action bar | Displays selected video model name and provider, with Task query and Reset all buttons |
| Parameter configuration panel | Provides output resolution dropdown (480P, 720P) and aspect ratio selection |
| Prompt script input console | Multi-line text box for camera motions, lighting, and scene details, supporting Shift+Enter line breaks |
| Rendering & video player area | Displays queuing progress indicator, rendering countdown, and player card with full-screen and MP4 download |

- Model area: current model `wan3.0-video` and provider `Alibaba`; **Task query** and **Model Compare** are on the right.
- Parameters: `Resolution` (currently `480P`) and `Ratio` (currently `5`).
- Input: multi-line box with `Please enter your question, Shift+Enter for a new line`.
- Reset: **Reset all** restores model and parameter defaults.

![Video playground](./images/video-playground.png)

The figure shows the current model is `wan3.0-video` from `Alibaba`; parameters show `Resolution 480P` and `Ratio 5`, with **Task query** and **Model Compare** at the top.

## Main Operations

### Select a video model

1. Click the model area and select a video model.
2. Verify the provider and supported input types.

### Set generation parameters

1. Choose a `Resolution`.
2. Choose a `Ratio`.

### Generate a video

1. Enter a scene description.
2. Use `Shift+Enter` for new lines, then submit.
3. Check the task status in the result area.

### Query tasks

1. Click **"Task query"**.
2. Locate the current or previous tasks in the list.

### Compare models

1. Click **"Model Compare"**.
2. Select video models and generate from the same description.

## Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Model | Yes | Selector | `wan3.0-video` | Current video model |
| Provider | System | Text | `Alibaba` | Provider of the current model |
| Resolution | Yes | Dropdown | `480P` | Output resolution |
| Ratio | Yes | Dropdown | `5` | Aspect ratio option |
| Prompt | Yes | Multi-line text | `Seaside sunset, slow push-in` | Scene description |

## Pitfalls

- Video generation usually takes longer than text or images; use **Task query** to track progress.
- Resolution and ratio affect generation time and price.
- A video model may support only specific input types; check the modality on the model details page.

## Result Validation

| Check Item | Success Signal | Handling on Failure |
| --- | --- | --- |
| Video model selected | The top bar accurately displays the model name (e.g., `wan3.0-video`) and provider info | If missing, open [Models](../../discover/models/) to check whether the tenant has active video model authorization |
| Parameters configured | Resolution and Ratio dropdowns show concrete values, and the script input box is active | If unsupported parameter errors occur, verify whether the model supports the chosen resolution tier |
| Task creation successful | Submitting triggers a success toast, renders a progress card, and logs the task in **Task query** | If insufficient balance or timeout occurs, verify credits and review the failure reason in Task query |
| Asynchronous progress | Clicking **"Task query"** loads current queue position or rendering percentage | Video queuing may take 1–3 minutes; maintain the tab or track via Task query without resubmitting |
| Playback & export | Upon completion, an embedded video player loads, plays smoothly, and provides an MP4 download link | If playback shows a black screen or decode error, check browser codecs or download the file locally |

## FAQ

#### No result for a long time

**Symptom:** After submitting a scene script, the page remains in queuing or processing state without displaying the video.

**Possible Causes:** Video generation is compute-intensive, and the GPU cluster queue is congested; or complex camera dynamics caused rendering timeouts and automated retries.

**Resolution:**

1. Open **Task query** to check the exact rendering percentage and queue position.
2. Maintain the session until rendering finishes; avoid clicking submit repeatedly to prevent duplicate deductions.
3. If the task status marks Failed, review the specific error code and retry with a lower resolution.

#### The model rejects the input

**Symptom:** Submitting a prompt triggers invalid parameter, format incompatibility, or generation block notices.

**Possible Causes:** The selected model only supports Image-to-Video and rejects pure text prompts; or prompt content violates automated content compliance guidelines.

**Resolution:**

1. Navigate to [Models](../../discover/models/) to verify the model's exact specifications and input modality requirements.
2. Review the prompt for sensitive keywords, policy-violating topics, and refine phrasing.
3. Switch to a standard Text-to-Video model and retry.

## Notes

- Do not generate infringing, illegal, or privacy-invasive content.
- Video is billed by duration, resolution, or seconds; confirm quota before batch generation.
- Verify copyright and compliance before commercial use.

## Next Steps

1. Verify duration-based deductions and GPU compute charges in call logs and usage statements.
2. Download verified video assets for presentations or extract parameter setups for backend API integration.
3. Explore the image playground to establish a connected text-to-image to image-to-video creative workflow.

Related pages:
- [Models Marketplace](../../discover/models/)
- [Image Playground](../images/)
- [Text Playground](../text/)
- [Model Usage](../../usage-earnings/model-usage/)
- [My Calls Overview](../../my-calls/overview/)
