# Images

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **Playground** > **Images** |
| Route | `/modelone/exploration/image` |
| Managed objects | Image model, size, image count, and generation tasks |

**New to this page**: Images turns a text prompt into pictures. Choose an image model, set size and count, enter a description, and review results in **Task query**.

## 2. Prerequisites

1. Your account can open **Playground > Images**.
2. The account has available credits or a free quota for the model.
3. The billing unit and image-count limit are confirmed.

## 3. Page Description

The page contains a model area, a parameter area, and an input area:

- Model area: current model `qwen-image-3.0` and provider `Alibaba`; **Task query** and **Model Compare** are on the right.
- Parameters: `Size` (currently `No documented default`) and `Images` (currently `4`).
- Input: multi-line box with `Describe the image you want to generate, Shift+Enter for new line`.
- Reset: **Reset all** restores model and parameter defaults.

![Image playground](./images/image-playground.png)

**Figure note**: The current model is `qwen-image-3.0` from `Alibaba`; parameters show `Size` and `Images 4`, with **Task query** and **Model Compare** at the top.

## 4. Main Operations

### 4.1 Select an image model

1. Click the model area and select an image model.
2. Verify the provider and model status.

### 4.2 Set generation parameters

1. Open `Size` and choose a supported size; keep `No documented default` to let the model decide.
2. Set the number of images in `Images`.

### 4.3 Generate images

1. Enter a description in the input box.
2. Use `Shift+Enter` for new lines, then submit.
3. Review the generated images in the result area.

### 4.4 Query past tasks

1. Click **Task query**.
2. Locate previous generation tasks in the list.

### 4.5 Compare models

1. Click **Model Compare**.
2. Select image models and generate from the same description.

## 5. Parameter Quick Reference

| Field | Required | Field type | Example | Description |
| --- | --- | --- | --- | --- |
| Model | Yes | Selector | `qwen-image-3.0` | Current image model |
| Provider | System | Text | `Alibaba` | Provider of the current model |
| Size | No | Dropdown | `No documented default` | Output size; default is decided by the API |
| Images | Yes | Number | `4` | Number of images per request |
| Prompt | Yes | Multi-line text | `An orange cat on a windowsill` | Description used to generate the image |

## 6. Pitfalls

- When `Size` shows `No documented default`, the actual size is decided by the model API and can differ between models.
- More images multiply generation time and cost; verify the count before submitting.
- Image models are billed per image or request, not by text tokens.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Model selected | The top shows the model name and provider |
| Parameters set | `Size` and `Images` show current values |
| Task submitted | A task or images appear in the result area |
| History available | **Task query** opens the task list |

## 8. FAQ

#### Results differ from the description

**Symptom**: The generated image misses key elements.

**Resolution**:

1. Add subject, scene, style, and composition details to the prompt.
2. Compare results with another image model.

#### Past tasks are missing

**Symptom**: **Task query** does not show the latest task.

**Resolution**: Confirm the task finished and check the current model and time range.

## 9. Notes

- Do not generate infringing, illegal, or privacy-invasive content.
- Generation is billed by the model; confirm quota before batch generation.
- Output is for reference; verify copyright and compliance before commercial use.

## 10. Next Steps

- Review image call volume in [My Calls](../../my-calls/overview/).
- Check deductions in [Model Usage](../../usage-earnings/model-usage/).
- Compare image models in [Models](../../discover/models/).
