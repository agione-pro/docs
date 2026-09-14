# 新模型模板准备与端到端部署调用指引

使用运营管理员准备好的模型启动模型

**使用模板创建模型实例（使用模型提供方账号）：使用已创建的模板创建新的模型实例。此步骤用于检查模板中配置的参数是否正确。**

**使用已创建的实例发布模型（使用模型提供方账号）：发布已创建的模型实例，并在 Displayground 中调用模型或使用 curl 命令调用模型。此步骤用于检查模型 API。**

为客户创建新的推理模板，以便启动模型实例

**确保模型已下载（使用运营管理员账号）：在 On-Prem 中搜索所需模型，并检查模型是否已下载到指定集群。**

**创建推理模板（使用运营管理员账号）：创建新的模型推理模板并完成全部配置，确保模板可用。**

**使用模板创建模型实例（使用模型提供方账号）：使用已创建的模板创建新的模型实例。此步骤用于检查模板中配置的参数是否正确。**

**使用已创建的实例发布模型（使用模型提供方账号）：发布已创建的模型实例，并在 Displayground 中调用模型或使用 curl 命令调用模型。此步骤用于检查模型 API。**

# 启动模型并调用的步骤

## 使用模板创建模型实例 - 模型提供方

使用模型提供方账号登录，进入 “My Models” 页面，然后按下图所示单击 Start，使用模板创建模型实例。

![图 01](./images/01-my-models-start-instance.png)

搜索要部署的模型并进入配置页面。设置此模型实例的并发数和上下文长度，右侧会自动更新可支持的规格，选择推荐的规格。

![图 02](./images/02-configure-instance-parameters.png)

确认配置，然后单击 Submit。

![图 03](./images/03-confirm-submit-instance.png)

此时可以看到模型正在启动。可以单击 “Search” 刷新模型实例状态。等待模型变为 Running 状态且服务端口可用（如下图所示）。此过程可能需要几分钟。

![图 04](./images/04-instance-running-status.png)

## 使用已创建的实例发布模型 - 模型提供方

模型实例可用后，单击 Publish 发布模型（如下图所示）。

![图 05](./images/05-publish-model-action.png)

选择 Public 进入发布页面。至少启用一种 API 协议（例如 OpenAI-ChatCompletions），然后单击 “Test” 确认模型可用。

![图 06](./images/06-publish-protocol-test.png)

还可以将 “Custom Tag” 设置为 “testing”。

![图 07](./images/07-publish-custom-tag.png)

下一步配置计费选项。测试时可以设置为 “Free”。

![图 08](./images/08-publish-billing-options.png)

然后进入 Rate Limit 页面。测试时可以设置为不启用。接着提交审批（此环境已启用自动审批，因此不需要运营管理员审批）。

![图 09](./images/09-publish-rate-limit-submit.png)

## 调用模型进行测试 - 模型提供方

单击 “Models”，搜索已发布的模型。

![图 10](./images/10-model-store-search.png)

找到在模型提供方页面发布的模型（通常是第一个），单击 “Displayground”，在新的浏览器标签页中打开 Chat 页面。

![图 11](./images/11-displayground-chat-entry.png)

在对话框中输入内容，查看输出响应。

![图 12](./images/12-playground-chat-test.png)

也可以使用 curl 进行测试，单击 “Quick start” 查看详细信息。

![图 13](./images/13-quick-start-api-drawer.png)

复制 curl 命令。

![图 14](./images/14-copy-curl-command.png)

将命令粘贴到 Shell 环境中，如下图所示。

![图 15](./images/15-terminal-curl-execution.png)

# 准备新的模型模板的步骤

## 确保模型已下载 - 运营管理员

使用运营管理员账号登录，将鼠标悬停在 AI-Infra 上，单击 On-prem，然后单击 Models。搜索所需模型，例如 DeepSeek-R1-Distill-Qwen-7B。（注意：此处的模型均已预先创建；如果找不到所需模型，请单击 Add Model。）

![图 16](./images/16-operator-onprem-models-search.png)

找到所需模型后，按下图所示单击查看详情，向下滚动并单击 “Select linked clusters”。由于模型尚未下载到此环境，需要单击目标版本对应的 “Edit” 按钮。

![图 17](./images/17-model-details-linked-clusters.png)

将模型来源从 Local 更改为 ModelScope 或 HuggingFace（当前环境应选择 ModelScope，因为此集群访问 HuggingFace 时可能存在网络问题）。需要填写 Model Id，系统将使用它自动下载模型权重文件（大多数开源模型不需要 Token，但部分受许可约束的模型需要）。

![图 18](./images/18-edit-version-modelscope-source.png)

打开 ModelScope，搜索模型并复制 Model Id，然后在 AGIOne 中设置。

![图 19](./images/19-modelscope-website-model-id.png)

单击 Save 后，所选模型将自动下载。此时可以按下图所示单击 “Enable after download”，这样模型下载完成后就会自动启用。

![图 20](./images/20-enable-after-download.png)

## 创建推理模板 - 运营管理员

在 “Inference Templates” 页面单击 New Inference Template，更改模型和版本，指定框架，并输入模板名称。

![图 21](./images/21-create-inference-template.png)

在 “Linked VRAM Factor” 表单中单击 Edit，并选择 “Common Model Inference VRAM param table for vLLM”（目前大多数开源模型支持 MoE，因此选择 “Common Model Inference VRAM param table for vLLM”；其他模型需要专业服务支持）。

向下滚动到 “Framework Relations” 部分，单击 Edit，然后选择加速卡；此环境选择 Ascend 910B，最后确认。

![图 22](./images/22-vram-factor-and-card-relations.png)

对于 “Extra parameters”，如果需要提升模型推理性能，应由专业服务人员进行配置。测试时无需进行任何操作。

然后将框架更改为 Available 状态。

![图 23](./images/23-available-inference-template.png)

完成以上操作后，推理模板创建成功。
