# Model Deployment and Management

## Model Download and Marketplace

### Q: How is model download and deployment performed?

**Answer:** First, shared storage, such as NAS or a local path, is provided for all customers and can be managed by the operator. This storage can be attached to clusters with NPU/GPU nodes managed by Kubernetes. Operator users can download models from Hugging Face or ModelScope through the UI, or download them in a background terminal and store them in the specified path. Before a deployment task starts, the shared storage is automatically mounted to the pod instances. Model deployment can then be performed by starting Kubernetes jobs or deployments using operator-managed model templates, or by providing a specified command.

### Q: Is there an SLA for newly released models to appear in the marketplace?

**Answer:** Yes. Models are packaged by the operator using inference templates, which include inference base images such as vLLM, SGLang, or MindIE, resource flavors, startup commands, and other required parameters. The packaged models are tested in the background before release.

## Deployment Methods

### Q: Do we create profiles for GPU allocation?

**Answer:** Yes. Kubernetes YAML files for deployments or jobs are created to define GPU allocation.

### Q: How is self-service deployment handled?

**Answer:** Customers can perform self-service model deployments through the UI by creating Kubernetes jobs or deployments with operator-managed model templates, or by providing a specified command.

## Model Management and Inference Capabilities

### Q: What inference management capabilities does the platform provide? Does it support model version management, canary release, and dynamic batching?

**Answer:** The platform supports fast model deployment and template management, model version management, and model publishing. It also supports model aggregation from multiple sources, including self-deployed models and third-party models. Models of the same type can be aggregated and used based on distribution policies. Circuit breaker and failback capabilities are supported.

### Q: What model management capabilities does the platform provide? Which inference acceleration technologies are supported? How large is the built-in model library?

**Answer:** AGIOne turns mainstream model deployment knowledge into reusable model templates. A template includes model specifications, recommended compute resources, inference engine, context capabilities, and other configurations. The platform supports both official template import and custom templates. Inference acceleration includes two parts. First, during deployment, acceleration modules in inference frameworks such as vLLM and SGLang can be enabled. Second, on the model aggregation side, especially when multiple model instances are used, AGIOne can dynamically distribute inference requests based on real-time workload, throughput, latency, and other metrics of different instances. This improves resource utilization and inference efficiency. The template library mainly covers common open-source models, including DeepSeek and Qwen, and continues to grow over time.

### Q: Which data-related processes are covered? Does the platform support incremental training and model fine-tuning?

**Answer:** No.

## Model Update Process

### Q: What is the process when models are updated frequently?

**Answer:** A model service is provided.

For a single model, a static model ID, API key, and endpoint are provided. The model can be managed across different versions while retaining the same API key and endpoint. A new model version can be deployed and tested in the background. After testing is complete, it can be published with the new model endpoint, model ID, and API key.

### Q: What steps are required when replacing an existing model?

**Answer:** For aggregated models, a static model ID, API key, and endpoint are provided, and multiple single models can be combined and individually enabled or disabled. After a new model version is deployed, it can be added to the aggregated model, and users can disable the previous version.
