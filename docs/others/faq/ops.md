# Operations, Security, and Delivery

## Development Tools

### Q: Can GPUs be used through these tools?

**Answer:** Yes. Users can create a development IDE with the required CPU/NPU resource flavor.

## Distributed Capabilities

### Q: Distributed model training / inference

**Answer:** Yes.

### Q: RAY framework support

**Answer:** Yes.

## Monitoring

### Q: How do we collect monitoring metrics?

**Answer:** NPU/GPU card metrics are collected through NPU exporters or the DCGM exporter. CPU, RAM, and ephemeral disk metrics are collected through the Kubernetes Metrics Server.

### Q: NVIDIA has DCGM metrics and debugging tools such as Nsight. What is the equivalent on HCS?

**Answer:** The DCGM exporter is deployed when GPU nodes are managed.

### Q: How can we observe card-level metrics?

**Answer:** Card-level metrics are collected through NPU exporters or the DCGM exporter.

## AI Security

### Q: Are there AI security solutions specific to the HCS platform?

**Answer:** None by default. The platform can be integrated with third-party AI security solutions.

Security capabilities that can be integrated include:

- Model scanning
- Guardrail
- LLM Firewall
- Data masking
- Compliance
