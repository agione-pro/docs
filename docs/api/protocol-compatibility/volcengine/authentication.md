# Authentication and signing

Sign asset and verification requests with an AGIOne System API AK/SK pair using the Ark-compatible scheme. Video creation and queries use an AGIOne Model API Key. Upstream cloud credentials remain managed inside the platform.

Operator-tenant credentials cannot access this asset proxy. Console login credentials and Model API Keys do not replace the System AK/SK pair.

## Asset request headers

| Header | Required | Description |
| --- | --- | --- |
| Authorization | Yes | HMAC-SHA256 signature computed with AGIOne AK/SK. |
| Host | Yes | Actual API host, matching the signed host. |
| X-Date | Yes | UTC time, YYYYMMDDTHHMMSSZ. |
| X-Content-Sha256 | Used by the example | Lowercase SHA-256 hex digest of the actual UTF-8 body. |
| Content-Type | Required for POST | application/json |
| Accept | Recommended | application/json |
| Accept-Language | No | zh-CN / en-US |

## Ark-compatible signature

The algorithm identifier is `HMAC-SHA256`. The example uses region `cn-beijing`, service `ark` and terminator `request`.

```text
Authorization: HMAC-SHA256 Credential=<AGIONE_AK>/<YYYYMMDD>/cn-beijing/ark/request, SignedHeaders=content-type;host;x-content-sha256;x-date, Signature=<LOWERCASE_HEX_SIGNATURE>
```

1. Fix the exact UTF-8 JSON bytes and put `SHA256(body)` in `X-Content-Sha256`.
2. Join the method, canonical path, canonical query, canonical headers, signed header names and body hash with newlines. Include the entire `/hyperone` path and the `Action` and `Version` query parameters.
3. Decode and encode the path once as UTF-8, preserving `/`. Sort decoded query names by UTF-8 bytes, RFC 3986-encode names and values, then join with `&`. Use each name once.
4. Lowercase and sort signed header names. The example signs `content-type;host;x-content-sha256;x-date`. Canonical headers use `name:trimmed-value` with a final newline; omit default ports `:80` and `:443` from canonical Host.
5. Join the algorithm, UTC timestamp, `date/region/service/request` and SHA-256 of the canonical request with newlines.
6. Start with SK bytes and apply HMAC-SHA256 successively to date, region, service and `request`. HMAC the string to sign and encode the result as lowercase hex.

Do not change the path, query, signed headers or JSON bytes after signing. Use current UTC time. The default gateway clock skew is 300 seconds, subject to instance configuration. Re-sign retries and consider duplicate creation. This is separate from the [Platform API signing scheme](../../system-api/authentication) using `x-request-*`.

## Signing helper

[Download ark-sign.py](/examples/volcengine/ark-sign.py). Requires Python 3 and curl 7.76.0+ for `--fail-with-body`. It reads credentials privately in an interactive terminal and outputs a configuration for curl to read from stdin. SK is absent from headers, URLs, process arguments and generated configuration.

## Video requests

| Header | Required | Description |
| --- | --- | --- |
| Authorization | Yes | `Bearer <AGIONE_MODEL_API_KEY>` |
| Content-Type | Required for POST | application/json |
| Accept | Recommended | application/json |
| Accept-Language | No | zh-CN / en-US |

Use `Authorization: Bearer <AGIONE_MODEL_API_KEY>` for video; no simultaneous AK/SK signature is needed. Use the published AGIOne model identifier.

## Protect credentials

Keep real AK/SK, Model API Keys, H5 verification links and signed media URLs out of source, logs and tickets. Sign requests on a trusted server. Deployment routing headers do not authorize asset ownership.
