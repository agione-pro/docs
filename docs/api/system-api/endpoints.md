# Get caller roles

This endpoint returns the list of roles held by the identity associated with the calling System API Key.

Operator, Provider, and End User identities can call this endpoint using their respective System API AK/SK pairs. The returned records depend on the actual roles held by the key owner. This is a read-only endpoint and does not assign or modify any permissions.

## Endpoint Overview

| Item | Description |
| --- | --- |
| Method | `GET` |
| Complete path | `/hyperone/admin/user/roles` |
| Protocols | `HTTPS` / `HTTP` |
| Authentication | System API AK/SK signature verification (see [Authentication and signing](./authentication)) |

## Request Parameters

### Headers

| Header | Type | Required | Example | Description |
| --- | --- | --- | --- | --- |
| `x-request-verify-type` | String | Yes | `HmacSHA256` | Signature algorithm used by this page's examples |
| `x-request-access-key` | String | Yes | `ak_live_xxxxxxxxxxxx` | Your System API Access Key (AK) |
| `x-request-timestamp` | String | Yes | `1731312345678` | Current Unix time in milliseconds |
| `x-request-sign` | String | Yes | `a1b2c3d4e5f6...` | Lowercase hexadecimal HMAC-SHA256 signature calculated with your SK |
| `Accept` | String | Recommended | `application/json` | Media type requested by the client |
| `Content-Type` | String | Recommended | `application/json` | Included in the example; this endpoint sends no request body |

### Query Parameters

None

### Request Body

None

## Response Parameters

### Top-Level Response Envelope

| Field | Type | Description |
| --- | --- | --- |
| `status` | Integer | Business status code. Returns `200` on success; non-200 error code on failure |
| `message` | String | Error message; this endpoint does not set a success message, so the field may be omitted or null |
| `result` | Array of Object | Role data array (see role object specification below) |
| `timestamp` | String | Server response Unix timestamp in milliseconds, serialized as a decimal string |
| `requestId` | String | Request tracking identifier supplied by the runtime context; may be null or omitted |

::: tip Status Validation Notice
Check that the response body `status` is `200` before accessing `result`. An HTTP 200 alone does not prove application success. `result` is an array; do not depend on the order of elements.
:::

### Role Object Specification (`result` items)

Callers should depend only on the fields documented here and ignore other fields when parsing responses.

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `roleId` | String | Unique role identifier | `"role_example_001"` |
| `roleName` | String | Display name of the role | `"System - Member"` |
| `roleDesc` | String | Role description | See response example below |

## Response Examples

This example uses an administrator of a regular tenant as the caller and shows one assigned role, `System - Member`. Actual roles vary with the account's role assignments. The role ID, timestamp, and request identifier are illustrative; the example contains only documented fields, and null fields may be omitted.

### Success Response (HTTP 200)

```json
{
  "status": 200,
  "result": [
    {
      "roleId": "role_example_001",
      "roleName": "System - Member",
      "roleDesc": "Built-in ModelOne member role for workspace self-service, project access, API key management, quota requests, and model exploration."
    }
  ],
  "timestamp": "1731312345678",
  "requestId": "req_6731a8f901bc4"
}
```

### Failure Response (Authentication Failed)

This example represents the current gateway's invalid-signature branch. Its application `status` is `500`; read the HTTP status separately. The message depends on the request language; the example uses the default English message.

```json
{
  "status": 500,
  "message": "The request signature is invalid. Check the signing key and request headers.",
  "result": null,
  "timestamp": "1731312345678",
  "requestId": "req_6731a8f902cd5"
}
```

## Troubleshooting

When a request fails, record the HTTP status and application status separately, then use the actual error message to identify the cause:

- **Signature, signature-header, or timestamp errors**: These branches currently return application `status: 500`. Use the message to check the SK, mandatory signing headers, StringToSign, and client clock; the status alone does not identify the cause.
- **Permission or access-scope errors**: Check the caller identity and access conditions according to the actual message. A non-200 application status does not always mean authentication failed.
- **Routing or endpoint errors**: Verify the instance API Base URL and complete path, including `/hyperone`. A gateway or proxy may return these errors; do not assume their HTTP and application statuses match or that their bodies use the JSON structure above.

If the issue persists, provide the request time, HTTP status, and any available response `requestId` and `timestamp` to your deployment administrator. Do not include real AK/SK values or signed request headers.
