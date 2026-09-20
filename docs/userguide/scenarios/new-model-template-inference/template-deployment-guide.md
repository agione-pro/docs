# New Model Template Preparation and Deployment Guide

::: tip Environment and Parameter Notes
This guide uses the current environment's page labels and status values. Model IDs, provider instance IDs, ports, and available publication options vary by environment; use the values shown on the current page.
:::

To launch a model with a model asset prepared by the Operator:

**Create model instance with template(with provider role account): Create new model instance with created template. This step will check whether the parameters configured in template are correct.**

**Publish model with created instance (with a Model Provider account): Publish the created instance to the approved public or private scope, then call it in Playground or with cURL. This step checks the model API.**

To create new inference template for customers for launching model instance

**Ensue model downloaded(with operator role account): Search the model we want in On-Prem, And check whether model downloaded in specified cluster.**

**Create inference template(with operator role account): Create a new model inference template and finished all configure to ensure the template available.**

**Create model instance with template(with provider role account): Create new model instance with created template. This step will check whether the parameters configured in template are correct.**

**Publish model with created instance (with a Model Provider account): Publish the created instance to the approved public or private scope, then call it in Playground or with cURL. This step checks the model API.**

# Steps to launch model and call

## Create Model Instance with Template - Provider

Login with provider role account, go to “My Models” page, and click start as follow to create model instance with template.

![Figure 01](./images/01-my-models-start-instance.png)

Search model you prefer to deploy, and select to configuration page. Set concurrency and context length for this model instance, available flavor can support will auto change at right, and choose the recommended one.

![Figure 02](./images/02-configure-instance-parameters.png)

Confirm the configuration and click submit.

![Figure 03](./images/03-confirm-submit-instance.png)

Then, see the model is launching. And you can click “Search” to refresh the model instance status. Wait until it become running status and the service port is available(See bellow). It may take several minutes.

![Figure 04](./images/04-instance-running-status.png)

## Publish Model with Created Instance - Provider

After model instances available, click to publish it(see bellow)

![Figure 05](./images/05-publish-model-action.png)

Select the approved **Public** or **Private** publication scope and go to the publishing page. Enable at least one API protocol (such as OpenAI-ChatCompletions), then click **Test** to verify that the model is available.

![Figure 06](./images/06-publish-protocol-test.png)

Can also set “Custom Tag” as “testing”

![Figure 07](./images/07-publish-custom-tag.png)

Next step, configure billing options, for testing, can set “Free”

![Figure 08](./images/08-publish-billing-options.png)

Then continue to the rate-limit page. For a controlled test, leave rate limiting disabled only when that is allowed by the current environment policy. Submit for approval when the page requires it; otherwise verify the resulting publication status.

![Figure 09](./images/09-publish-rate-limit-submit.png)

## Model Call for Testing - Provider

Click “Models”, and search the model you published.

![Figure 10](./images/10-model-store-search.png)

Fetch the one you published at provider page(commonly, the first one). Click “Playground” to Chat page in new web tab.

![Figure 11](./images/11-displayground-chat-entry.png)

Input to chat, and see the output response.

![Figure 12](./images/12-playground-chat-test.png)

Can also test with curl, click “Quick start” to see detail

![Figure 13](./images/13-quick-start-api-drawer.png)

Copy the curl command

![Figure 14](./images/14-copy-curl-command.png)

Paste at your shell environment as bellow

![Figure 15](./images/15-terminal-curl-execution.png)

# Steps to prepare new model template

## Ensure model downloaded - Operator

Login with operator, hover AI-Infra and click On-prem, and click Models. Search models you want, such as DeepSeek-R1-Distill-Qwen-7B.(Attention: this all models pre-created, if not found the model you prefer, then click add model).

![Figure 16](./images/16-operator-onprem-models-search.png)

When you found model you prefer, click to see detail as follow, scroll down, and click “Select linked clusters”, as model are not download in this environment, should need click “edit” button for specified version you want.

![Figure 17](./images/17-model-details-linked-clusters.png)

Change model source from local to ModelScope or HuggingFace(Current environment, should select ModelScope as this cluster could visit HuggingFace with network issue). Model Id is in need to auto download the model weight files(Most open source models do not need token, but some licensed model need).

![Figure 18](./images/18-edit-version-modelscope-source.png)

Open ModelScope, search for the model, copy its Model ID, and enter that value in the platform.

![Figure 19](./images/19-modelscope-website-model-id.png)

Click save, and then, the preferred model would auto download, at this time, you can click “Enable after download” as follow, so when model finished download, it will be enabled.

![Figure 20](./images/20-enable-after-download.png)

## Create Inference Template - Operator

Click new inference template at “Inference Templates” page, change the model, version, specify framework, and input template name.

![Figure 21](./images/21-create-inference-template.png)

At “Linked VRAM Factor form”, edit and select “Common Model Inference VRAM param table for vLLM”(Most current open source models support MoE, so choose “Common Model Inference VRAM param table for vLLM”, others need professional services).

Scroll down to the "Framework Relations" section, click Edit, select the required accelerator card specification (such as Ascend 910B), and then confirm.

![Figure 22](./images/22-vram-factor-and-card-relations.png)

For “Extra parameters”, need professional services to do this when need improve model inference performance. For testing, no need to do anything.

Then, change framework to available state.

![Figure 23](./images/23-available-inference-template.png)

After these checks pass, the inference template is ready for downstream model-instance deployment.

## Completion Check

After completing the steps above, verify that the end-to-end workflow is in a ready state:

1. **Template Ready**: In the **Inference Templates** list, the new template displays an **Available** status with the correct model version and accelerator associations.
2. **Instance Running**: In **My Deployments**, the model instance created from the template shows a **Running** status with an active service port.
3. **API and Invocation Verified**: The published model responds successfully to chat prompts in **Playground** or returns expected inference outputs via `cURL`.

## User Manual References

- [On-Prem Models](/usermanual/ai-infra-on-prem/operator/templates/models/)
- [Inference Templates](/usermanual/ai-infra-on-prem/operator/templates/inference-templates/)
- [My Models](/usermanual/model-services/user/studio/my-models/)
- [My Deployments](/usermanual/model-services/user/studio/my-deployments/)
