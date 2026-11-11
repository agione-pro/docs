# System API

System API is designed for developers who need to call the AGIOne endpoints explicitly documented in this section using a **System API AK/SK pair**. Model inference invocations use a **Model API Key** and are documented in [Model API (OpenAPI)](../openapi/). The two credential families serve different purposes and authentication mechanisms and cannot be interchanged.

::: info Credential Family Separation
- **System API AK/SK**: For system management and query endpoints, authenticated via HMAC-SHA256 request signatures.
- **Model API Key**: For native model inference endpoints, authenticated via standard HTTP `Authorization: Bearer <key>` headers.
:::

## Available Endpoints

The System API currently provides the following read-only endpoint:

| Endpoint | Method | Path | Returns |
| --- | --- | --- | --- |
| [Get caller roles](./endpoints) | `GET` | `/hyperone/admin/user/roles` | Roles held by the authenticated identity |

Operator, Provider, and End User identities can call this endpoint using their respective System API AK/SK pairs. The returned records depend on the actual roles held by the key owner. A successful call does not imply access to other administrative interfaces.

## Quickstart

1. **Create Credentials**: In the console under **My Keys**, select **System API AK/SK Pairs** to generate a key for the caller identity. The Operator view displays only this credential type, while Provider and End User views also include Model API Keys. See the [Operator guide](../../usermanual/settings/operator/personal/my-keys/) or [User guide](../../usermanual/settings/user/personal/my-keys/). Save the returned Secret Key (SK) securely during creation; it will not be displayed again in plaintext.
2. **Obtain the API Address**: Request the API Base URL for your target AGIOne instance from the administrator. Include the scheme, such as `https://`, but exclude the `/hyperone` root path, which is already included in each endpoint's complete path.
3. **Sign and Request**: Follow the [Authentication and signing](./authentication) guide to calculate the HMAC-SHA256 signature and make requests. Detailed request and response specifications are described in [Get caller roles](./endpoints).
