# Quick Requirement Survey

:::: info Document Information
Version: v1.0
Updated: 2026-07-13
::::

This template is used during initial customer communication, pre-sales assessment, PoC planning, or delivery scoping. Its purpose is to turn a request into a verifiable product, model, compute, and environment decision.

> **Download fillable template:** [Quick Requirement Survey (.xlsx)](/downloads/AGIOne_Requirements_Quick_Survey.xlsx){target="_blank"}

## 1. Assessment Rules

- Do not decide support from a model name, cloud-provider name, or accelerator name alone.
- Use the current [Support Matrix](../limitations/support-matrix) for product status and [Supported Accelerators](../limitations/chips) for the onboarding list.
- Use the [User Manual](../../usermanual/) to confirm that the required workflow and role entry exist.
- Treat **Huawei Cloud access as temporarily unsupported**.
- Treat **RAG and Function Calling as planned**, not currently deliverable production capabilities.
- For a specific project, the deployed version, delivery package, live environment, and validation evidence take precedence.

## 2. Quick Conclusion

| Item | Conclusion | Evidence or Notes |
| --- | --- | --- |
| Customer / project | `<name>` | |
| Assessment date | `<YYYY-MM-DD>` | |
| Target users and roles | `<admin/operator/provider/enduser>` | |
| Target subsystem | `<On-Prem/On-Cloud/Model Services/Multiple>` | |
| Business objective | `<description>` | |
| Deployment target | `<local/cloud/private/offline/other>` | |
| Product status | `<Supported/Conditionally supported/Planned/Temporarily unsupported>` | Link to matrix item |
| Model validation | `<Passed/Required/Blocked>` | Test report or pending item |
| Compute validation | `<Passed/Required/Blocked>` | Inventory and compatibility result |
| Environment readiness | `<Pass/Conditional pass/Blocked>` | [Environment Survey](./quick-env-investigation) |
| PoC recommendation | `<Proceed/Proceed after remediation/Do not proceed>` | |
| Owner and due date | `<owner/date>` | |

## 3. Business and User Requirements

| Question | Customer Answer | Why It Matters |
| --- | --- | --- |
| What business problem should be solved? | `<fill in>` | Defines the acceptance outcome |
| Who will use or operate the platform? | `<fill in>` | Determines roles, tenants, and training scope |
| Which task must each role complete? | `<fill in>` | Maps requirements to user-manual workflows |
| Is local, cloud, or hybrid compute required? | `<fill in>` | Determines On-Prem / On-Cloud scope |
| Must data remain in a private network? | `<fill in>` | Affects deployment, endpoint, and network design |
| Are third-party endpoints or cloud accounts allowed? | `<fill in>` | Affects BYOK or On-Cloud access |
| Is model publishing and review required? | `<fill in>` | Requires provider/operator responsibility split |
| Is model API consumption required? | `<fill in>` | Requires access, credential, quota, and call validation |
| Is usage, metering, or revenue reporting required? | `<fill in>` | Determines required records and role scope |

## 4. Capability Requirements

Record the need first, then copy the status from the current support matrix. Do not write “Supported” without a source and validation boundary.

| Capability | Required | Expected Behavior | Current Status | Validation Evidence / Gap |
| --- | --- | --- | --- | --- |
| Text model discovery, experience, publishing, or calling | `<Yes/No>` | `<fill in>` | `<matrix status>` | `<manual link/test>` |
| Image, audio, or video model experience | `<Yes/No>` | `<fill in>` | `<matrix status>` | `<model and endpoint test>` |
| Single-model or BYOK publishing | `<Yes/No>` | `<fill in>` | `<matrix status>` | `<provider and review test>` |
| Aggregate-model publishing and routing | `<Yes/No>` | `<fill in>` | `<matrix status>` | `<member model and policy test>` |
| Calls, usage, metering, customer calls, or revenue | `<Yes/No>` | `<fill in>` | `<matrix status>` | `<data scope and freshness test>` |
| RAG | `<Yes/No>` | `<fill in>` | **Planned** | Record retrieval, knowledge, permission, and evaluation needs for planning |
| Function Calling | `<Yes/No>` | `<fill in>` | **Planned** | Record protocol, schema, permission, and audit needs for planning |
| Other capability | `<Yes/No>` | `<fill in>` | `<To be confirmed>` | `<owner/action>` |

## 5. Model and Endpoint Requirements

| Item | Customer Requirement | Validation Result |
| --- | --- | --- |
| Model name and version | `<fill in>` | `<confirmed/pending>` |
| Model source | `<platform deployment/BYOK/third-party endpoint/other>` | `<confirmed/pending>` |
| Input and output modality | `<text/image/audio/video/other>` | `<confirmed/pending>` |
| Endpoint and authentication method | `<fill in>` | `<confirmed/pending>` |
| Required request and response fields | `<fill in>` | `<confirmed/pending>` |
| Context or payload limits | `<fill in>` | `<confirmed/pending>` |
| Streaming requirement | `<fill in>` | `<confirmed/pending>` |
| Usage or metering fields | `<fill in>` | `<confirmed/pending>` |
| Visibility and review requirement | `<private/public/tenant scope>` | `<confirmed/pending>` |
| License and commercial restriction | `<fill in>` | `<confirmed/pending>` |

Model acceptance must use the exact endpoint, request format, credentials, quota, and deployed version. A model family name is not acceptance evidence.

## 6. Scale and Acceptance Targets

| Target | Required Value | Test Method / Evidence |
| --- | --- | --- |
| Total and daily active users | `<fill in>` | `<fill in>` |
| Peak concurrency | `<fill in>` | `<fill in>` |
| Requests per minute or second | `<fill in>` | `<fill in>` |
| Tokens or payloads per minute | `<fill in>` | `<fill in>` |
| First-response latency | `<fill in>` | `<P95/P99 method>` |
| Total response latency | `<fill in>` | `<P95/P99 method>` |
| Availability target | `<fill in>` | `<measurement window>` |
| Recovery objective | `<fill in>` | `<backup/failover test>` |
| Data retention | `<fill in>` | `<logs/usage/audit policy>` |
| Cost or credit boundary | `<fill in>` | `<quota/pricing validation>` |

## 7. Compute and Cloud Resource Survey

### 7.1 Resource Source

| Question | Customer Answer | Decision Impact |
| --- | --- | --- |
| Are resources local, cloud, or both? | `<fill in>` | Selects On-Prem / On-Cloud workflow |
| Which cloud platform is requested? | `<fill in>` | Huawei Cloud is temporarily unsupported; other platforms require environment validation |
| Is an authorized cloud account available? | `<fill in>` | Required for On-Cloud access and resource synchronization |
| Is a Kubernetes cluster already available? | `<fill in>` | Requires version, architecture, runtime, network, storage, and permission checks |
| Are existing Docker or Kubernetes environments present? | `<fill in>` | Cleanup requires authorization and a rollback plan |
| Is new hardware procurement planned? | `<fill in>` | Requires model sizing and compatibility validation before purchase |

### 7.2 Node Inventory

| Node | Role | CPU / Architecture | CPU / Memory | Disk / Storage | Accelerator / Memory / Count | Network | OS / Kernel |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<node-1>` | `<management/compute/storage>` | `<fill in>` | `<fill in>` | `<fill in>` | `<fill in>` | `<fill in>` | `<fill in>` |
| `<node-2>` | `<management/compute/storage>` | `<fill in>` | `<fill in>` | `<fill in>` | `<fill in>` | `<fill in>` | `<fill in>` |
| `<node-3>` | `<management/compute/storage>` | `<fill in>` | `<fill in>` | `<fill in>` | `<fill in>` | `<fill in>` | `<fill in>` |

### 7.3 Compatibility Chain

| Layer | Current Value | Status | Required Action |
| --- | --- | --- | --- |
| Accelerator model | `<fill in>` | `<listed/unlisted/pending>` | Compare with [Supported Accelerators](../limitations/chips) |
| Operating system and kernel | `<fill in>` | `<pass/pending/blocked>` | Compare with installation requirements |
| Driver and vendor runtime | `<fill in>` | `<pass/pending/blocked>` | Freeze exact versions |
| Container runtime and device plugin | `<fill in>` | `<pass/pending/blocked>` | Verify device registration and scheduling |
| Image and inference engine | `<fill in>` | `<pass/pending/blocked>` | Run deployment validation |
| Model, precision, and parallelism | `<fill in>` | `<pass/pending/blocked>` | Validate memory and card-count fit |
| Storage and registry | `<fill in>` | `<pass/pending/blocked>` | Validate capacity, mount, and pull path |
| Network and ports | `<fill in>` | `<pass/pending/blocked>` | Validate directions and latency |

## 8. Match Decision

| Decision Area | Pass Condition | If Not Passed |
| --- | --- | --- |
| Product capability | Status is Supported, or Conditional support has been explicitly accepted | Remove from scope or create a product assessment item |
| Role and workflow | The responsible role and user-manual workflow are confirmed | Adjust responsibility, permission, or workflow design |
| Model and endpoint | Exact request, response, authentication, modality, and usage behavior pass | Change model/endpoint or create an adaptation item |
| Compute compatibility | Accelerator-software-model chain passes | Remediate environment, change hardware, or perform adaptation |
| Capacity and performance | Resource sizing meets the recorded acceptance target | Scale resources, adjust the model, or revise the target |
| Operations evidence | Monitoring, calls, usage, and required records are visible | Fix collection/scope or revise acceptance evidence |

## 9. Risk and Action Register

| ID | Risk / Gap | Impact | Severity | Owner | Action | Due Date | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | `<fill in>` | `<fill in>` | `<High/Medium/Low>` | `<owner>` | `<action>` | `<date>` | `<status>` |
| R-002 | `<fill in>` | `<fill in>` | `<High/Medium/Low>` | `<owner>` | `<action>` | `<date>` | `<status>` |
| R-003 | `<fill in>` | `<fill in>` | `<High/Medium/Low>` | `<owner>` | `<action>` | `<date>` | `<status>` |

## 10. Required Outputs

- [ ] Confirmed business objective and acceptance criteria
- [ ] Role and workflow map
- [ ] Support-matrix decision with links
- [ ] Model and endpoint validation record
- [ ] Compute and environment inventory
- [ ] Compatibility and performance test plan
- [ ] Remediation list with owners and dates
- [ ] Final PoC or delivery recommendation

## 11. Conclusion Template

**Proceed:** The required product status, role workflow, exact model/endpoint, compute combination, and environment prerequisites are confirmed, with measurable acceptance criteria and no unresolved blocking risk.

**Proceed after remediation:** The target path is supportable, but listed environment, compatibility, authorization, or validation items must be completed before installation or PoC acceptance.

**Do not proceed:** A required capability is planned or temporarily unsupported, or a blocking model, compute, environment, security, or commercial condition has no accepted resolution. Do not commit delivery until the status changes or the scope is redesigned.

## Related Documentation

- [Support Matrix](../limitations/support-matrix)
- [Other Limitations](../limitations/limitations)
- [Environment Quick Assessment](./quick-env-investigation)
- [User Manual](../../usermanual/)
- [Installation Guide](../../installation/)
