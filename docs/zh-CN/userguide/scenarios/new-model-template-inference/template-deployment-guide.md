# 新模型模板准备与端到端部署调用指引

::: tip 环境与参数说明
本指引使用当前环境页面中的菜单、字段和状态名称。模型 ID、模型提供方实例 ID、服务端口和可选发布范围可能因环境而异，请以当前页面显示的值为准。
:::

使用运营管理员准备好的模型启动模型：

**使用模板创建模型实例（使用模型提供方账号）：使用已创建的模板创建新的模型实例。此步骤用于检查模板中配置的参数是否正确。**

**使用已创建的实例发布模型（使用模型提供方账号）：将实例发布到已批准的公有或私有范围，并在 Playground 中调用模型或使用 curl 命令调用模型。此步骤用于检查模型 API。**

为客户创建新的推理模板，以便启动模型实例

**确保模型已下载（使用运营管理员账号）：在 On-Prem 中搜索所需模型，并检查模型是否已下载到指定集群。**

**创建推理模板（使用运营管理员账号）：创建新的模型推理模板并完成全部配置，确保模板可用。**

**使用模板创建模型实例（使用模型提供方账号）：使用已创建的模板创建新的模型实例。此步骤用于检查模板中配置的参数是否正确。**

**使用已创建的实例发布模型（使用模型提供方账号）：将实例发布到已批准的公有或私有范围，并在 Playground 中调用模型或使用 curl 命令调用模型。此步骤用于检查模型 API。**

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

选择已批准的 **Public** 或 **Private** 范围进入发布页面。至少启用一种 API 协议（例如 OpenAI-ChatCompletions），然后单击 **Test** 确认模型可用。

![图 06](./images/06-publish-protocol-test.png)

还可以将 “Custom Tag” 设置为 “testing”。

![图 07](./images/07-publish-custom-tag.png)

下一步配置计费选项。测试时可以设置为 “Free”。

![图 08](./images/08-publish-billing-options.png)

然后进入 Rate Limit 页面。受控测试只有在当前环境策略允许时才可以不启用限流。页面要求审批时提交审批；如果不需要审批，则直接核对发布后的状态。

![图 09](./images/09-publish-rate-limit-submit.png)

## 调用模型进行测试 - 模型提供方

单击 “Models”，搜索已发布的模型。

![图 10](./images/10-model-store-search.png)

找到在模型提供方页面发布的模型（通常是第一个），单击 “Playground”，在新的浏览器标签页中打开 Chat 页面。

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

打开 ModelScope，搜索模型并复制 Model Id，然后在平台中填写该值。

![图 19](./images/19-modelscope-website-model-id.png)

单击 Save 后，所选模型将自动下载。此时可以按下图所示单击 “Enable after download”，这样模型下载完成后就会自动启用。

![图 20](./images/20-enable-after-download.png)

## 创建推理模板 - 运营管理员

在 “Inference Templates” 页面单击 New Inference Template，更改模型和版本，指定框架，并输入模板名称。

![图 21](./images/21-create-inference-template.png)

在 “Linked VRAM Factor” 表单中单击 Edit，并选择 “Common Model Inference VRAM param table for vLLM”（目前大多数开源模型支持 MoE，因此选择 “Common Model Inference VRAM param table for vLLM”；其他模型需要专业服务支持）。

向下滚动到 “Framework Relations” 部分，单击 Edit，选择所需的加速卡规格（例如 Ascend 910B），确认后保存。

![图 22](./images/22-vram-factor-and-card-relations.png)

对于 “Extra parameters”，如果需要提升模型推理性能，应由专业服务人员进行配置。测试时无需进行任何操作。

然后将框架更改为 Available 状态。

![图 23](./images/23-available-inference-template.png)

以上检查通过后，推理模板即可供后续模型实例部署使用。

## 完成检查

完成上述步骤后，按以下标准确认整个流程已闭环：

1. **模板就绪**：在 **Inference Templates** 列表中，新建的推理模板状态显示为 **Available**，关联的模型版本与加速卡规格正确。
2. **实例运行正常**：在 **My Deployments** 中，基于新模板创建的模型实例处于 **Running** 状态，服务端口正常暴露。
3. **API 与调用验证**：在模型列表通过 **Playground** 成功进行对话交互，或通过 `cURL` 发送请求能收到预期的模型推理结果。

## 操作手册参考

- [On-Prem 模型](/zh-CN/usermanual/ai-infra-on-prem/operator/templates/models/)
- [推理模板](/zh-CN/usermanual/ai-infra-on-prem/operator/templates/inference-templates/)
- [我的模型](/zh-CN/usermanual/model-services/user/studio/my-models/)
- [我的部署](/zh-CN/usermanual/model-services/user/studio/my-deployments/)
