# Models

::: info Document Information
Version: v2.0
Updated: 2026-11-04
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider & User |
| Navigation | **Model Services** > **Discover** > **Models** |
| Routes | List `/modelone/store/model`; details `/modelone/store/model/{model ID}` |
| Managed objects | Published models, model authors, provider instances, pricing, and access information |

**New to this page**: The Models page is the catalog of callable models. Narrow the list by capability, author, or source, open a model to compare providers and prices, then try it in Playground or copy the Quick Start details into your application.

#### Terms Quick Reference

| Term | Description |
| --- | --- |
| Models Marketplace | The centralized catalog displaying published, callable large models and AI services for tenants and developers. |
| Model Author | The original organization or open-source team developing the model, such as DeepSeek, OpenAI, Qwen, or Anthropic. |
| Provider | The infrastructure vendor hosting physical compute, providing API endpoints, and guaranteeing service SLAs. |
| Playground | The built-in interactive visualization console for zero-code testing across text, image, audio, and video modalities. |

## Prerequisites

1. Your account can open **Discover > Models**.
2. The target model is published and visible to your account or tenant.
3. Balance, price, context limit, and protocol are confirmed before calling.

## Page Description

The page contains a filter area, a title area, and a model list:

| Area | Description |
| --- | --- |
| Top search & filter bar | Modality multi-select, model author/source/series filters, search box, and Expand Filter button |
| Catalog title & scope bar | Title, All Models / Private Models tabs, Publish Model button, sorting options, and card/list view toggle |
| Modality counters bar | Real-time counts for Multimodal, Text, Image, Audio, Video, Embeddings, Rerank models |
| Model cards and rows | Model name, author, capability tags, context length, weekly calls/tokens, pricing, and release status |

- Filters: search box, `Input Capability`, `Output Capability`, `Model Series`, `Context`, `Billing`, `Model Author`, `Model Source`, `Scene`; use **Expand Filter** when space is limited.
- Title area: `Models`, **Publish Model** (visible to model providers), `All Models` / `Private Models` tabs, `Newest` sorting, and list/card view toggles.
- Capability counters: `All`, `Multimodal`, `Text`, `Image`, `Speech`, `Video`, `Embeddings`, `Rerank`, each with the current count.
- Model row: model name, author, type and capability tags, context length, `Weekly Calls`, `Weekly Tokens`, price in `credits ... / 1M` or per image/second, `≈ USD ...`, release date, and `Released` status.

![Models catalog](./images/models-market.png)

The figure shows the search box reads `Search model, author, series, or source`; the capability counters show `All 30`, `Multimodal 6`, `Text 8`, `Image 6`, `Video 10`. Each row shows weekly calls, weekly tokens, input/output price, and release date.

### Model details

The details page shows the model name, author, release date, model ID, price, context, max input/output, modality, capability tags, and protocols. The page provides five tabs: `Providers`, `Quick Start`, `Performance`, `Overview`, and `Best Practices`.

On `Providers`, filter by `All`, `Public`, `Private`, or `Aggregate`, and group by `All`, `By Provider`, or `By Model Source`. Each provider card shows the route ID, provider, price, context, `TTFT`, `Throughput`, `Success Rate`, `Weekly Calls`, `Weekly Tokens`, and `Uptime`, with **Playground** and **Quick Start** buttons.

## Main Operations

### Filter models

1. Enter a model name, author, series, or source in the search box.
2. Expand `Input Capability`, `Output Capability`, and other filters as needed.
3. Switch between `All Models` and `Private Models`.
4. Choose `Newest` in the sort list, or switch the list/card view.

### Open model details

1. Click a model name to open its details.
2. Check the model ID, price, context, and protocols at the top.
3. On `Providers`, compare price, latency, success rate, and weekly calls.
4. Switch to `Quick Start`, `Performance`, `Overview`, or `Best Practices` as needed.

### Try or integrate a model

1. Click **"Playground"** on a provider card to open the matching Playground.
2. Or click **"Quick Start"** on the provider card to view access details.
3. Replace addresses, model IDs, and keys in the sample with placeholders; never save real credentials.

### Publish a model

Model providers can click **"Publish Model"** in the upper right. Publishing scope and steps are described in [My Models](../../studio/my-models/).

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Search | No | Text | `GPT-6.1` | Search by model name, author, series, or source |
| Input / Output Capability | No | Multi-select | `Text`, `Image` | Filter by supported modality |
| Model Series | No | Single select | `Qwen3.8` | Filter by model series |
| Context | No | Single select | `≥128K` | Filter by context window |
| Billing | No | Single select | `Free`, `Paid` | Filter by billing type |
| Model Author | No | Single select | `OpenAI` | Filter by author |
| Model Source | No | Single select | `AGIOne` | Filter by source |
| Scene | No | Single select | `Text Generation` | Filter by scenario |
| Model scope | No | Tab | `All Models` / `Private Models` | Switch visible scope |
| Sort | No | Dropdown | `Newest` | Control list order |
| Weekly Calls | System | Number | `7` | Calls in the last week |
| Weekly Tokens | System | Number | `1.2M` | Tokens in the last week |
| Price | System | Text | `credits 200 / 1,000/M` | Token price or per-image/second price |
| Status | System | Tag | `Released` | Current publication status |

## Pitfalls

- Confirm the current filters and tab before reading counts; do not treat a category count as the total.
- One model can have multiple providers. Price, latency, and success rate come from each provider card, not the model row.
- Billing units differ by modality: tokens for text, images for images, seconds for video. Align units before comparing prices.
- `All Models` and `Private Models` are separate scope tabs; confirm the active tab before reading counts.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Filters applied | Model card counts and top capability counters update synchronously after selecting filters or typing a query | Click **"Reset"** to clear conflicting filters and check whether published models exist under the chosen criteria |
| Details match | Clicking a model card opens the details page with identical model title and model ID | If a 404 or permission error occurs, verify whether your tenant account has visibility permissions for the model |
| Provider card details | The `Providers` tab accurately displays pricing, context window, TTFT, throughput, and uptime for each provider | If the provider list is empty, no instance is active for this model; contact the platform operator |
| Test and access entries | **"Playground"** and **"Quick Start"** buttons are visible and active on provider cards | If disabled, verify whether the model supports interactive testing for its designated modality |
| Empty result recovery | An empty state prompt appears when no matches are found, and the full catalog restores when filters are cleared | Check whether the search box contains invisible whitespace or unclosed filter tags |

## FAQ

#### The target model is not found

**Symptom:** Typing the model name returns no matching cards or rows in the catalog.

**Possible Causes:** Active filter criteria (such as input/output modality or author) conflict with the search query; the model is private to another tenant; or the model has not been published or approved.

**Resolution:**

1. Clear all modality, series, and author filters, then search again.
2. Switch to the `All Models` tab to verify whether the model is restricted to a private scope.
3. Check with the platform administrator or model provider to ensure the model is released and tenant visibility is configured.

#### Price shows `--`

**Symptom:** The model row or provider card displays `--` for input/output price.

**Possible Causes:** The provider has not configured token pricing rules, or the model is currently under maintenance or free preview without defined billing tiers.

**Resolution:** Use the current provider card display as authoritative; if billing is required, defer production traffic integration until the provider configures active pricing.

#### The same model shows different prices

**Symptom:** Multiple provider cards for the same model display divergent rates and fees.

**Possible Causes:** Different infrastructure providers offer varied compute instances, network routes, and SLA tiers, or different pricing units apply (per 1M tokens vs. per image/second).

**Resolution:** Identify the specific provider name and billing unit in each card, align metrics to the same standard, and choose the optimal provider instance based on price and SLA.

## Notes

- Trying or calling a model creates records and consumes quota. Confirm the model, provider, and price first.
- Replace model IDs, addresses, and keys in Quick Start with environment-specific values; never write real credentials into documents or screenshots.
- Model capability, price, context, and protocols are defined by the current details page.

## Next Steps

1. Experience model inference and adjust parameters in interactive playgrounds.
2. Review call logs, token metrics, and latency percentiles in call analytics.
3. Model providers can package and publish new service instances in My Models.

Related pages:
- [Text Playground](../../playground/text/)
- [Image Playground](../../playground/images/)
- [Audio Playground](../../playground/audio/)
- [Video Playground](../../playground/video/)
- [My Calls Overview](../../my-calls/overview/)
- [My Models](../../studio/my-models/)
