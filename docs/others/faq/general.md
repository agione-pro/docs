# General FAQ

## Account

### Q: I cannot login. What should I check first?

- Verify username/password or verification code validity
- Confirm account status is not locked/disabled
- Check SSO binding if enterprise login is enabled

### Q: How do I reset my password?

- Use the `Forgot password` flow (if enabled), or contact admin to reset in admin portal.

## Deployment

### Q: Installation fails due to image pull errors.

- Confirm registry network connectivity
- Verify registry credentials and certificate trust
- Check node DNS and time synchronization (NTP)

### Q: Is deployment performed through the UI?

Yes. Model deployments can be performed through the UI by starting Kubernetes jobs or deployments with operator-managed model templates, or by providing a specified command.

### Q: Can deployment also be performed through CLI?

No. Deployment is performed through the provided UI interface, so there is no need to execute it through the CLI.

## Usage

### Q: Model requests are slow. How to troubleshoot?

- Check resource utilization (GPU/CPU/memory)
- Review request logs and error rate
- Validate concurrency and quota policies

## Development Workbench

### Q: What kind of workbench solution exists for development?

A web-based IDE, including Jupyter and CodeServer, is provided for development.

### Q: Are there web-based IDE solutions such as Jupyter or CodeServer for developers on the platform?

Both Jupyter and CodeServer are provided.
