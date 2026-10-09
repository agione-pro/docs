# Best Practices for Configuring and Using Codex with AGIOne

## Codex \+ CC Switch \+ AGIOne — AI Coding Setup Guide

> A clear step\-by\-step guide to configure **Codex Desktop** with **CC Switch** and **AGIOne \(agione\.pro\)** API tokens for AI\-assisted coding\.
> 
> 

## Architecture Overview

```Plain Text
Codex Desktop (AI coding client)
        │
        │  Requests go through local route
        ▼
CC Switch (local proxy — protocol conversion + provider management)
        │
        │  Forwards to upstream API
        ▼
AGIOne (https://agione.pro/hyperone/xapi/api)
        │
        │  Routes to models
        ▼
DeepSeek / GLM / Gemini / GPT, etc.
```

**Why Routing mode?** AGIOne uses Chat Completions protocol, while Codex uses Responses protocol\. CC Switch's Routing mode handles the conversion automatically\.

---

## Step 1: Download \& Install Codex Desktop

1. Go to OpenAI's official website and download [**Codex Desktop**](https://learn.chatgpt.com/docs/app#getting-started)\. 

![Codex Desktop download page](codex-desktop-pics/step1-codex-desktop-download.png)

    - macOS: `.dmg` file

    - Windows: `.exe` installer

    - Linux: `.AppImage` or `.deb`

2. Install and launch Codex\.

3. You may be asked to log in with your OpenAI/ChatGPT account — you can skip this wait cc switch configuration finshed\.

---

## Step 2: Download \& Install CC Switch

1. Go to the official download page: [**https://ccswitch\.io**](https://ccswitch.io) or [**https://github\.com/farion1231/cc\-switch/releases**](https://github.com/farion1231/cc-switch/releases)

![CC Switch GitHub Releases download page](codex-desktop-pics/step2-ccswitch-github-releases.png)

2. Choose your platform: 

    - macOS \(Apple Silicon\): `CC-Switch-v4.0.5-mac-aarch64.dmg`

    - macOS \(Intel\): `CC-Switch-v4.0.5-mac-x64.dmg`

    - Windows: `CC-Switch-v4.0.5-win-x64-setup.exe`

    - Linux: `.deb`, `.rpm`, or `.AppImage`

3. Install and launch the CC Switch\.

---

## Step 3: Access AGIOne \& Get API Key

1. Open your browser and go to [**https://agione\.pro**](https://agione.pro)** or your private agione platform\.**

2. Log in or create an account\.

3. Once logged in, go to **Settings** , **My Keys** to **Model API Keys**\.

![AGIOne Settings - My Keys - Model API Keys page](codex-desktop-pics/step3-agione-model-api-keys.png)

4. Click **Create API Key** \(or **\+ Create**\)\. 

- Give it a name \(e\.g\., `codex-cc-switch`\)

![Create Model API Key dialog](codex-desktop-pics/step3-create-model-api-key.png)

- Copy the generated key — it starts with `ak-` and is only shown once\.

![View and copy the Access Key](codex-desktop-pics/step3-copy-access-key.png)

---

## Step 4: Find Your Model Info

1. In AGIOne, go to **Model Services** in the top menu\.

![AGIOne Model Services menu](codex-desktop-pics/step4-model-services-menu.png)

2. Find the model you want to use\. Examples:

    - **DeepSeek\-V4\-Flash**: `deepseek/deepseek-v4-flash/02acd` — fast, low cost, good for daily coding

![Search and select the DeepSeek-V4-Flash model](codex-desktop-pics/step4-select-deepseek-v4-flash.png)

3. Copy the **Model ID** \&\& **Base URL**

- Go to **Quick Start, **Copy** Model ID**

![Quick Start page - copy Model ID](codex-desktop-pics/step4-copy-model-id.png)

- Go to **Quick Start, **Copy** Base URL**

![Quick Start page - copy Base URL](codex-desktop-pics/step4-copy-base-url.png)

- Confirm what protocols the model supports\.

![Protocols supported by the model](codex-desktop-pics/step4-model-protocols.png)

---

## Step 5: Configure CC Switch

### 5\.1 Open Codex page in CC Switch

1. In CC Switch, click **Codex** in the left sidebar\.

![Codex option in the CC Switch left sidebar](codex-desktop-pics/step5-ccswitch-codex-tab.png)

2. You'll see three tabs at the top: **Direct / Routing / Aggregation**\.

![Direct / Routing / Aggregation tabs on the Codex page](codex-desktop-pics/step5-routing-tabs.png)

### 5\.2 Switch to Routing mode

1. Click the **Routing** tab\.

2. Routing mode starts with a local proxy service\. Codex sends all requests through it first\.

### 5\.3 Add AGIOne as a provider

1. Click **Add Provider**\.

![Click Add Provider](codex-desktop-pics/step5-add-provider.png)

2. Choose **Custom Configuration**\.

![Choose Custom Configuration](codex-desktop-pics/step5-custom-configuration.png)

3. Fill in the fields:

|**Field**|**Value**|
|---|---|
|Name|AGIOne|
|API Key|ak\-xxxxxxxx \(your key from Step 3\)|
|API Request URL|\<Copy Base URL of the AGIOne Platform\>|
|Full URL|**Off**|
|Default Model|\<Copy Model ID of the AGIOne Platform\>|

![Fill in the AGIOne provider fields](codex-desktop-pics/step5-provider-fields.png)

### 5\.4 Configure Advanced Options

Expand **Advanced Options** and set:

|**Setting**|**Value**|
|---|---|
|Upstream Format|Chat Completions \(routing required\) \| depends on the protocol types supported by the model|
|Prompt cache routing|Auto \(recommended\)|
|Supports Thinking Mode|\<depends on the Thinking mode supported by the model\> \| DeepSeek Support, There is Enabled|
|Supports Reasoning Effort|\<depends on the Thinking mode supported by the model\> \| DeepSeek Support, There is Enabled|

![Advanced Options settings](codex-desktop-pics/step5-advanced-options.png)

### 5\.5 Model Mapping

1. Click \+ **Add manually to **add which models do you want to use\.

![Model Mapping - add manually](codex-desktop-pics/step5-model-mapping.png)

> You can get more models from agione platform and fill in model on there to use it\.
> 
> 

2. Click **Save**\.

### 5\.6 Activate routing

1. In the provider list, find **AGIOne**\.

2. Click **Route here**\.

![Click Route here on the AGIOne entry](codex-desktop-pics/step5-route-here.png)

3. Confirm the top of the page shows **Routing is active → AGIOne**\.

![Routing is active - AGIOne](codex-desktop-pics/step5-routing-active.png)

---

## Step 6: Test in Codex

1. **Fully quit Codex** \(Cmd\+Q on macOS\) and reopen it\.

2. Start a new chat in Codex\.

3. Send a test message: 

```Plain Text
Hello! Tell me who you are and which model you are using.
```

![Send a test message in Codex](codex-desktop-pics/step6-codex-test-message.png)

1. If you get a reply, the setup is working\!

![Codex receives the model reply](codex-desktop-pics/step6-codex-test-reply.png)

---

## Step 7: verify Usage in AGIOne

1. Go back to **AGIOne Dashboard** \(`https://agione.pro`\)\.

2. Check the **Usage** or **Call Logs** page to see your API calls\.

![AGIOne Call Logs page](codex-desktop-pics/step7-agione-call-logs.png)



---

## Configuration Files \(Auto\-generated\)

CC Switch manages these files automatically:

**`~/.codex/auth.json`**

```JSON
{
  "OPENAI_API_KEY": "ak-xxxxxxxx"
}
```

**`~/.codex/config.toml`** \(key fields\)

```TOML
model_provider = "custom"
model = "deepseek/deepseek-v4-flash/02acd"
model_reasoning_effort = "high"
model_catalog_json = "cc-switch-model-catalog.json"

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "https://agione.pro/hyperone/xapi/api"
```

---

## Troubleshooting

|**Issue**|**Likely Cause**|**Fix**|
|---|---|---|
|Fetch Models fails|Wrong API Key or no balance|Check key and AGIOne balance|
|Codex returns 401|Key not saved properly|Re\-save provider in CC Switch|
|Codex returns 404|Wrong Base URL|Confirm [https://agione\.pro/hyperone/xapi/api](https://agione.pro/hyperone/xapi/api)|
|No models in Codex|Codex not restarted|Fully quit and reopen Codex|
|Requests hang|Network issue or model overload|Check network, try another model|

---

## Links

|**Resource**|**URL**|
|---|---|
|AGIOne|[https://agione\.pro](https://agione.pro)|
|CC Switch Official|[https://ccswitch\.io](https://ccswitch.io)|
|CC Switch GitHub|[https://github\.com/farion1231/cc\-switch](https://github.com/farion1231/cc-switch)|
|CC Switch Releases|[https://github\.com/farion1231/cc\-switch/releases](https://github.com/farion1231/cc-switch/releases)|

---

*Guide generated: 2026\-10\-09 \| Verified on: macOS \+ Codex Desktop \+ CC Switch v4\.0\.5 \+ AGIOne*

