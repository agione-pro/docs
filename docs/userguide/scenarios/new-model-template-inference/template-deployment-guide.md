# New Model Template Preparation and Deployment Guide

To launch model with prepared models by operator

**Create model instance with template(with provider role account): Create new model instance with created template. This step will check whether the parameters configured in template are correct.**

**Publish model with created instance(with provider role account): Publish the created instance, do some call in display ground or using curl command. This step will check the model API.**

To create new inference template for customers for launching model instance

**Ensue model downloaded(with operator role account): Search the model we want in On-Prem, And check whether model downloaded in specified cluster.**

**Create inference template(with operator role account): Create a new model inference template and finished all configure to ensure the template available.**

**Create model instance with template(with provider role account): Create new model instance with created template. This step will check whether the parameters configured in template are correct.**

**Publish model with created instance(with provider role account): Publish the created instance, do some call in display ground or using curl command. This step will check the model API.**

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

Select public and go to publishing page. Enable at least one API protocol(Such as OpenAI-ChatCompletions), click “Test” button to make sure the model is available.

![Figure 06](./images/06-publish-protocol-test.png)

Can also set “Custom Tag” as “testing”

![Figure 07](./images/07-publish-custom-tag.png)

Next step, configure billing options, for testing, can set “Free”

![Figure 08](./images/08-publish-billing-options.png)

Then, next, to rate limit page, can set not enabled for testing. And then submit for approval(This environment had enable auto-approve, so do not need approve by operator).

![Figure 09](./images/09-publish-rate-limit-submit.png)

## Model Call for Testing - Provider

Click “Models”, and search the model you published.

![Figure 10](./images/10-model-store-search.png)

Fetch the one you published at provider page(commonly, the first one). Click “Displayground” to Chat page in new web tab.

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

Open ModelScope and search the model to copy model id, and then set in AGIOne.

![Figure 19](./images/19-modelscope-website-model-id.png)

Click save, and then, the preferred model would auto download, at this time, you can click “Enable after download” as follow, so when model finished download, it will be enabled.

![Figure 20](./images/20-enable-after-download.png)

## Create Inference Template - Operator

Click new inference template at “Inference Templates” page, change the model, version, specify framework, and input template name.

![Figure 21](./images/21-create-inference-template.png)

At “Linked VRAM Factor form”, edit and select “Common Model Inference VRAM param table for vLLM”(Most current open source models support MoE, so choose “Common Model Inference VRAM param table for vLLM”, others need professional services).

Scroll down, at “Framework Relations” section, click edit, and then select accelerator card, choose Ascend 910B for this environment, and then confirm.

![Figure 22](./images/22-vram-factor-and-card-relations.png)

For “Extra parameters”, need professional services to do this when need improve model inference performance. For testing, no need to do anything.

Then, change framework to available state.

![Figure 23](./images/23-available-inference-template.png)

After all, inference template create successful.
