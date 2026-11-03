# Text

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **Playground** > **Text** |
| Route | `/modelone/exploration/chat` |
| Managed objects | Selected model or aggregate model, conversation input, and comparison results |

**New to this page**: Text is the online trial entry for catalog models. Choose a model, ask a question, and read the response; turn on **Model Compare** when you need side-by-side results.

## 2. Prerequisites

1. Your account can open **Playground > Text**.
2. The account has available credits or a free quota for the model.
3. The target model, context limit, and billing method are confirmed.

## 3. Page Description

The page contains a model area, a welcome area, and an input area:

- Model area: current model name, tags, and provider, such as `GLM-5.2`, `Aggregate`, and `星云智算人工智能科技有限公司`; **Model Compare** is on the right.
- Welcome area: shows `What would you like to explore?` on first entry.
- Input area: a multi-line box with `Please enter your question, Shift+Enter for a new line`; the footer reads `AI-generated content may be inaccurate and does not represent our views.`.
- Reset: **Reset all** clears the current configuration.

![Text playground](./images/text-playground.png)

**Figure note**: The current model is `GLM-5.2` with the `Aggregate` tag; the input prompt is `Please enter your question, Shift+Enter for a new line`, and **Model Compare** is available on the right.

## 4. Main Operations

### 4.1 Select a model

1. Click the model area to open the model list.
2. Select a model or aggregate model and verify its tag and provider.

### 4.2 Start a conversation

1. Enter a question in the input box.
2. Use `Shift+Enter` for a new line, or submit.
3. Read the response in the output area.

### 4.3 Compare models

1. Click **Model Compare**.
2. Select the models to compare.
3. Submit the same input and compare the responses.

### 4.4 Reset the session

1. Click **Reset all**.
2. Confirm the model selection and input are cleared.

## 5. Parameter Quick Reference

| Field | Required | Type | Example | Description |
| --- | --- | --- | --- | --- |
| Model | Yes | Selector | `GLM-5.2` | Model or aggregate model used for the conversation |
| Model tag | System | Tag | `Aggregate` | Model type or composition |
| Provider | System | Text | `星云智算人工智能科技有限公司` | Provider of the current model |
| Input | Yes | Multi-line text | `Hello` | Prompt submitted to the model |
| Model Compare | No | Button | — | Opens multi-model comparison |

## 6. Pitfalls

- Verify the model tag before submitting; an `Aggregate` model routes across multiple backends, so responses may come from different nodes.
- `Shift+Enter` inserts a new line, it does not submit.
- Playground calls create usage records and consume tokens; long conversations cost more.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Model selected | The top shows the target model, tag, and provider |
| Input accepted | The input box shows the prompt and accepts multiple lines |
| Response returned | The output area shows generated content |
| Disclaimer | The footer shows `AI-generated content may be inaccurate and does not represent our views.` |

## 8. FAQ

#### No response after submitting

**Symptom**: The output area stays empty.

**Resolution**:

1. Confirm the model status and account quota.
2. Check that the input is not empty and does not exceed the context limit.
3. Select the model again and retry.

#### The target model is missing

**Symptom**: The model list does not contain the target model.

**Resolution**: Confirm the model is published and visible to your tenant, or check its scope in [Models](../../discover/models/).

## 9. Notes

- Do not enter keys, customer privacy, or unmasked business data.
- Playground calls are billed at the model price; long or frequent calls consume quota quickly.
- Model output is for reference only; review important conclusions manually.

## 10. Next Steps

- Review calls and tokens in [My Calls](../../my-calls/overview/).
- Check deductions in [Model Usage](../../usage-earnings/model-usage/).
- For application integration, open **Quick Start** in [Models](../../discover/models/).
