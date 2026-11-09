# My Models

::: info Document Information
Version: v2.0
Updated: 2026-11-04
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider |
| Navigation | **Model Services** > **Studio** > **My Models** |
| Routes | Overview `/modelone/model/my/overview`; publish form `/modelone/model/create?isPublic=0` |
| Managed objects | Published models, aggregate models, deployment entries, and publish configuration |

#### Beginner Explanation

My Models is the workspace for model providers. `Overview` explains deployment, BYOK integration, and aggregation; `My Published` manages directly published models; `My Aggregate` manages models combined behind one Model ID.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Meta Model | The foundational capability and protocol standard used as the baseline for publishing upstream models. |
| Endpoint | The physical network access point under a model source, bound to a request URL and credential. |
| Access Mode | Access control mode, including globally available (`Global`) and tenant-authorized (`Authorized`). |
| Aggregate Model | A service architecture combining multiple underlying models behind a unified Model ID via routing policies. |

## Prerequisites

1. Your account has access to **Studio > My Models**.
2. The meta model, model source, Endpoint, request URL, and credential are confirmed.
3. Billing, price, rate limits, and publication scope are confirmed before publishing.

## Page Description

The page has three tabs: `Overview`, `My Published`, and `My Aggregate`.

`Overview` is organized into three publication paths:

- `01 AGIOne Deployed`: explains on-prem nodes, cloud nodes, model service, and deploy-to-list. Two cards are provided: `On-Prem` and `On-Cloud`. Both currently show `Environment not configured.` and provide **Contact Us**.
- `02 BYOK (Bring Your Own Key)`: explains connecting an existing endpoint and provides `Private Model` and `Public Model` publish entries.
- `03 Multiple Models. One Model ID.`: explains aggregate routing and provides `Private Model` and `Public Model` aggregate entries.

![My Models overview](./images/my-models-overview.png)

The figure shows three tabs sit at the top; the deployment area shows On-Prem/On-Cloud (environment not configured), and the BYOK and aggregate areas provide private and public entries.

| Area | Description |
| --- | --- |
| Top Tabs | Switches among the `Overview`, `My Published`, and `My Aggregate` views. |
| 01 AGIOne Deployed | Displays on-prem and on-cloud deployment cards with configuration status and contact entry. |
| 02 BYOK | Provides publish entries for onboarding existing physical endpoints as private or public models. |
| 03 Aggregate Model | Provides configuration entries for aggregating multiple published models under a single Model ID. |
| My Published List | Manages directly published model instances, supporting search, detail view, and version editing. |
| My Aggregate List | Manages aggregated routing instances, supporting type filtering, search, and topology expansion. |

### My Published

`My Published` lists directly published models. Columns are `Model name`, `Model type`, `Billing mode`, `Billing rules`, `Status`, `Effective version`, `Pending version`, `Updated at`, and `Actions`. The toolbar provides **Publish Model**, search, and **Reset**; row actions provide **View details** and **Edit**.

### My Aggregate

`My Aggregate` uses the same columns and provides **Create Aggregate Model**, `Public Model` / `Private Model` filters, an `All Model type` filter, search, **Reset**, and **Expand**.

## Main Operations

### Publish a model

1. Open **"My Models"** and switch to `My Published`, or start from the `02 BYOK` area on `Overview`.
2. Click **"Publish Model"** and choose `Private Model` or `Public Model` in the `Select publish type` dialog.
3. Click **"Publish as Private Model"** or **"Publish as Public Model"** to open the three-step form.
4. In `Step 1 Basic Information`, select the meta model, model source, and Endpoint, and fill in the request URL, credential, upstream model name, and input/output modalities.
5. Optionally enable `Function/Tool Support` and `Thinking Mode`, and set the maximum context, input, and output tokens.
6. Select at least one protocol under `Official Native Protocol & Default Advanced Parameters`, and test connectivity first.
7. Fill in the custom tag (up to 20 characters), review the model name preview, and choose the publication method and `Access Mode`.
8. Click **"Next"** to open `Step 2 Billing Configuration`, then complete `Step 3 Rate Limit Configuration` and submit.

![Publish model basic information](./images/publish-basic.png)

The figure shows the wizard shows `1 Basic Information`, `2 Billing Configuration`, and `3 Rate Limit Configuration`. The visible area contains `Meta Model`, `Model Source`, `Endpoint`, `Request URL`, `Credential`, `Upstream model name`, input/output modalities, advanced capabilities, token limits, and protocol selection; `Access Mode` sits lower in the basic-information area.

### Create an aggregate model

1. Switch to `My Aggregate` and click **"Create Aggregate Model"**.
2. Choose `Private Model` or `Public Model`.
3. Select published models, then configure routing, billing, and rate limits.
4. After submission, verify the record and status in `My Aggregate`.

### View and edit a published model

1. Use search or **"Reset"** in `My Published` to locate a model.
2. Click **"View details"** to check billing rules, versions, and status.
3. Click **"Edit"** to change the configuration.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Publish type | Yes | Card | `Private Model` / `Public Model` | Determines visibility and call scope |
| Meta Model | Yes | Selector | `GPT-6.1 Sol` | Capability and protocol definition |
| Model Source | Yes | Selector | `AGIOne` | Upstream service source |
| Endpoint | Yes | Selector | `China` | Access point under the model source |
| Request URL | Yes | Text | `<BASE_URL><ENDPOINT_PATH>` | Upstream call address |
| Credential | Yes | Selector | `example-credential` | Upstream credential; **New Credential** creates one |
| Upstream model name | Yes | Text | `openai/gpt-6.1-sol` | Model ID sent upstream |
| Input/Output Modalities | Yes | Checkbox | `Text`, `Image` | Supported input and output types |
| Function/Tool Support | No | Toggle | Enabled | Enables tool calling |
| Thinking Mode | No | Toggle | Enabled | Enables advanced reasoning |
| Maximum Context / Input / Output Tokens | No | Number | `1050K` | Token limits |
| Official Native Protocol | Yes | Multi-select | `OpenAI-ChatCompletions` | At least one protocol is required |
| Custom Tag | No | Text, max 20 chars | `#High Speed` | Differentiates models under the same meta model |
| Publication method | Yes | Single select | `Immediate Release` | Controls when the model goes live |
| Access Mode | Yes | Single select | `Global` / `Authorized` | Controls tenant authorization |
| Billing type | Yes | Selector | `Token` | Billing method |
| Pricing Dimension | Yes | Selector | `Input / Output` | Price matrix dimension |
| Enable Rate Limiting | Yes | Toggle | `Enabled` / `Not enabled` | Controls rate-limit configuration |
| Model name | System | Text | `GPT-6.1 Sol` | Display name in lists and provider cards |
| Model type | System | Tag | `Text`, `Multimodal` | Model modality |
| Billing mode | System | Tag | `Token`, `Per second` | Current billing method |
| Status | System | Tag | `Listed`, `Delisting scheduled`, `Delisted` | Current model status |
| Effective version / Pending version | System | Version tag | `Rev.1` | Current and pending revisions |

## Pitfalls

- The first step requires a protocol connectivity test. Until it passes, the page shows `Please test the protocol connectivity first`.
- `Access Mode` `Global` allows all tenants and users without extra authorization; `Authorized` keeps the model visible in the marketplace but requires tenant-level authorization.
- `My Published` shows both `Effective version` and `Pending version`; rows with `Delisting scheduled` remain in the list.
- The custom tag is limited to 20 characters and affects display only, not model capability.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Publish record | The target model appears in `My Published` with type, billing mode, status, and update time. | If missing, verify that search filters are cleared, or check if the model is pending approval. |
| Aggregate record | The aggregate model appears in `My Aggregate` with normal status. | Refresh the page; if not generated, check child model dependencies and routing policies. |
| Version status | `Effective version` and `Pending version` show revision numbers (e.g., Rev.1) and review badges. | If versions do not update, confirm whether the edit submission succeeded or is pending review. |
| Wizard progress | The form advances smoothly from Step 1 Basic Information to Step 2 Billing and Step 3 Rate Limits. | If stuck on Step 1, verify protocol connectivity testing passed and all required fields are filled. |

## FAQ

#### The publish form cannot continue

**Symptom:**

Clicking **Next** in `Step 1 Basic Information` does not advance to billing configuration.

**Possible Causes:**

Protocol connectivity test has not been executed or failed, required fields (Meta Model, Model Source, Endpoint, Request URL, Credential) are missing, or upstream network connectivity is unreachable.

**Resolution:**

1. Check that Meta Model, Model Source, Endpoint, Request URL, Credential, and upstream model name are all filled in.
2. Ensure at least one native protocol is selected and test connectivity until it passes.

#### The published model is missing

**Symptom:**

The published model cannot be found in the `My Published` list after submission.

**Possible Causes:**

Previous search or filter criteria are active, the model is still in review/pending status, or the submission failed.

**Resolution:**

1. Confirm you are on the `My Published` tab and click **"Reset"** to clear search conditions.
2. Check the publish approval ticket to see whether it is under review or rejected.

#### The deployment cards cannot be used

**Symptom:**

`On-Prem` or `On-Cloud` displays `Environment not configured.` and direct deployment cannot be triggered.

**Possible Causes:**

The tenant has not provisioned computing node environments or bound underlying compute clusters.

**Resolution:**

Click **"Contact Us"** on the card to submit a computing resource application, and proceed after the administrator configures the environment.

## Notes

- Publishing and editing affect customer calls and billing; confirm the impact first.
- Credentials and request URLs are sensitive; never write them into documents, screenshots, or external chat tools.
- Price, billing method, and rate limits directly affect real call cost; verify them before submission.

## Next Steps

1. Verify call revenue and billing reconciliation after publication in [Model Earnings](../../usage-earnings/model-earnings/).
2. Monitor external customer call traffic and health in [Customer Calls](../../provider-calls/overview/).
3. Maintain upstream credentials and Endpoint mappings in [My Credentials](../../studio/credentials/).

Related pages:
- [Model Earnings](../../usage-earnings/model-earnings/)
- [Customer Calls](../../provider-calls/overview/)
- [My Credentials](../../studio/credentials/)
