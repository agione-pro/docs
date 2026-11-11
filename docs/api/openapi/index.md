# Model API (OpenAPI)

::: info Document Information
Version: v1.0
Updated: 2026-11-06
:::

This section describes the general conventions of AGIOne native model invocation interfaces, including authentication, Base URL rules, error codes, and rate limit policies. Individual interfaces are listed by call type. Interface details follow what the current environment actually returns.

## Interface Conventions

| Topic | Description |
|------|------|
| Authentication | Use a Model API Key as the calling credential, passed via the `Authorization` request header |
| Base URL rules | Native interfaces and compatible protocols use different base paths; confirm the protocol before calling |
| Error codes | Grouped into authentication, quota, rate limit, and protocol categories for faster troubleshooting |
| Rate limit and quota | Constrained jointly by tenant, project, and key quotas |

## Content To Be Added

The following pages will be added incrementally in later versions based on actual interfaces:

| Page | Scope |
|------|------|
| Interface overview | Index of text, image, video, audio, and embedding interfaces |
| Model invocation | Request and response structures, and parameter descriptions for each protocol |
| Asynchronous tasks | Task queries, status transitions, and result retrieval after submission |

## Notes

1. Domains, keys, and model identifiers in the examples are placeholders. Replace them with actual values from the current environment when calling.
2. Do not write real API keys, tokens, or customer data into documents, screenshots, or tickets.
3. Interface fields and error codes follow what the current environment actually returns. This section does not replace actual test results.
