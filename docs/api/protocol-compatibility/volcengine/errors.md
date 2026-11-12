# Error handling and troubleshooting

Check routing, authentication, ownership and upstream processing in order. Record HTTP status and the response error separately; HTTP 200 does not override a failed asset or task state.

## Asset proxy errors

| HTTP | Code | Action |
| --- | --- | --- |
| 403 | PORTRAIT_ASSET_SOURCE_ACCESS_DENIED | Check the service ID, PUBLIC service availability and System API credential identity. |
| 403 | PORTRAIT_ASSET_OWNERSHIP_DENIED | Check the same user, tenant, service and resource ownership. |
| 400 | PORTRAIT_ASSET_ACTION_UNSUPPORTED / PORTRAIT_ASSET_VERSION_UNSUPPORTED | Check Action and Version. |
| 400 | PORTRAIT_ASSET_REQUEST_INVALID / PORTRAIT_ASSET_PROJECT_NOT_ALLOWED | Send a JSON object up to 1 MiB; omit ProjectName or use default. |
| 502 | PORTRAIT_ASSET_UPSTREAM_UNAVAILABLE / PORTRAIT_ASSET_RESPONSE_TOO_LARGE | Record tracing information and ask the instance administrator to check upstream connectivity and response limits. |
| 500 | PORTRAIT_ASSET_OPERATION_FAILED | Record the request time and trace information for diagnosis. |

Platform asset errors use `error.code` and `error.message`; Ark upstream errors may appear in `ResponseMetadata.Error`. Gateway authentication and routing failures can use a different JSON shape.

## Signing and credentials

Check the AGIOne AK/SK, current UTC time, complete path, Action/Version, Host, Content-Type and exact JSON bytes. Use the asset signing scheme rather than upstream account credentials, a Model API Key or the other Platform API algorithm. The gateway defaults to a 300-second clock skew, subject to instance configuration.

## Asynchronous results

Assets: wait on Processing, use only Active assets, and inspect Error on Failed. Video: poll queued/running with a timeout, save succeeded output and handle failed/expired. Platform task lookup errors, including missing or inaccessible tasks, can carry HTTP 200; inspect response errors and business status.

## Retries and diagnostic evidence

Do not automatically replay a creation, update or deletion after a timeout; check the actual outcome first. Re-sign query retries and use backoff and a deadline. Keep only request time, operation, HTTP status, error code and RequestId in diagnostic reports. Remove real credentials, BytedToken, H5Link, signed media URLs and authentication headers.
