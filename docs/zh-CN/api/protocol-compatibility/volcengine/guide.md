# 私域真人人像素材资产使用指南

本指南演示如何通过 AGIOne 协议兼容网关，端到端完成**真人活体认证**、**私域人像素材资产入库**及**视频生成大模型调用**的完整业务闭环。

## 业务调用时序概览

在整套流程中，真人认证与素材资产管理使用 **System API AK/SK** 签名调用；而在最终提交视频生成任务时，平滑切换为 **Model API Key** 发起推理：

<div class="api-visual-flow">
  <svg viewBox="0 0 860 390" width="100%" height="100%" style="max-width: 860px; display: block; margin: 0 auto; font-family: var(--vp-font-family-base);">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--vp-c-brand-1)" />
      </marker>
      <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
      </marker>
    </defs>
    <!-- 泳道主体 -->
    <!-- 1. 客户端 -->
    <rect x="20" y="20" width="160" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="1.5" />
    <text x="100" y="45" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--vp-c-text-1)">业务客户端应用</text>
    <line x1="100" y1="60" x2="100" y2="370" stroke="var(--vp-c-divider)" stroke-dasharray="4 4" stroke-width="1.5" />
    <!-- 2. AGIOne 系统网关 (AK/SK) -->
    <rect x="240" y="20" width="180" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="#10b981" stroke-width="1.5" />
    <text x="330" y="45" text-anchor="middle" font-size="13.5" font-weight="600" fill="#10b981">AGIOne 资产网关 (AK/SK)</text>
    <line x1="330" y1="60" x2="330" y2="370" stroke="var(--vp-c-divider)" stroke-dasharray="4 4" stroke-width="1.5" />
    <!-- 3. 真人 H5 认证 -->
    <rect x="480" y="20" width="160" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="1.5" />
    <text x="560" y="45" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--vp-c-text-1)">真人活体认证 H5</text>
    <line x1="560" y1="60" x2="560" y2="370" stroke="var(--vp-c-divider)" stroke-dasharray="4 4" stroke-width="1.5" />
    <!-- 4. AGIOne 视频模型 (Model Key) -->
    <rect x="680" y="20" width="160" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.5" />
    <text x="760" y="36" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--vp-c-brand-1)"><tspan x="760">视频模型引擎</tspan><tspan x="760" dy="15" font-size="11.5">Model API Key</tspan></text>
    <line x1="760" y1="60" x2="760" y2="370" stroke="var(--vp-c-divider)" stroke-dasharray="4 4" stroke-width="1.5" />
    <!-- 步骤 1: 拉起认证 -->
    <line x1="100" y1="95" x2="322" y2="95" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-green)" />
    <text x="210" y="88" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">① CreateVisualValidateSession (获取 H5Link & Token)</text>
    <!-- 步骤 2: 传递 H5 给真人 -->
    <line x1="100" y1="135" x2="552" y2="135" stroke="var(--vp-c-text-2)" stroke-width="1.5" marker-end="url(#arrow)" />
    <text x="310" y="128" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">② 分发 H5Link，由真人完成活体检验</text>
    <!-- 步骤 3: 提取 Group ID -->
    <line x1="100" y1="175" x2="322" y2="175" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-green)" />
    <text x="210" y="168" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">③ GetVisualValidateResult (凭 Token 取得 GroupId)</text>
    <!-- 步骤 4: 录入素材资产 -->
    <line x1="100" y1="215" x2="322" y2="215" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-green)" />
    <text x="210" y="208" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">④ CreateAsset (录入媒体 URL，得到 Asset ID)</text>
    <!-- 步骤 5: 轮询素材就绪 -->
    <path d="M 100 245 L 322 245" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-green)" />
    <text x="210" y="240" text-anchor="middle" font-size="11.5" fill="var(--vp-c-text-2)">⑤ GetAsset 轮询直至 Status=Active</text>
    <!-- 步骤 6: 提交视频渲染 -->
    <line x1="100" y1="285" x2="752" y2="285" stroke="var(--vp-c-brand-1)" stroke-width="1.5" marker-end="url(#arrow)" />
    <text x="430" y="278" text-anchor="middle" font-size="12" font-weight="500" fill="var(--vp-c-brand-1)">⑥ CreateVideoTask (引用 asset://{ID}，带 Model Key)</text>
    <!-- 步骤 7: 轮询结果 -->
    <line x1="100" y1="330" x2="752" y2="330" stroke="var(--vp-c-brand-1)" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#arrow)" />
    <text x="430" y="323" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">⑦ GetVideoTask 轮询直至 succeeded，拉取最终视频</text>
  </svg>
</div>

## 六步标准实施流水线

<div class="api-steps-flow">
  <div class="api-step-card">
    <div class="api-step-num">1</div>
    <div class="api-step-content">
      <div class="api-step-title">
        准备前置接入信息
        <span class="api-card-badge brand">环境准备</span>
      </div>
      <p class="api-step-desc">
        从实例管理员处取得 <strong>API Base URL</strong>、<strong>4 位资产短 ID</strong>、<strong>System API AK/SK</strong>、<strong>Model API Key</strong> 以及已发布且可访问的 <strong>视频模型标识</strong>。确认当前用户能够访问目标资产服务和视频模型，并确认该模型的上游配置能够访问此资产服务创建的素材；平台内的访问授权不能替代上游账号与资源项目的匹配检查。
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">2</div>
    <div class="api-step-content">
      <div class="api-step-title">
        拉起真人活体认证 H5 链接
        <span class="api-card-badge green">System AK/SK</span>
      </div>
      <p class="api-step-desc">
        调用 <a href="./verification/create-session">拉起真人认证 H5 (CreateVisualValidateSession)</a>。服务端将返回临时凭据 <code>BytedToken</code> 以及供终端访问的 <code>H5Link</code>。将该链接提供给目标真人，由其在移动端或浏览器端完成活体面容核验。严禁用脚本跳过此步骤。
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">3</div>
    <div class="api-step-content">
      <div class="api-step-title">
        提取真人素材组合 ID (Asset Group ID)
        <span class="api-card-badge green">System AK/SK</span>
      </div>
      <p class="api-step-desc">
        真人完成活体检测后，调用 <a href="./verification/get-result">获取真人 Asset Group ID (GetVisualValidateResult)</a>，传入上一步保存的 <code>BytedToken</code>。核验成功后将取得专属的 <code>GroupId</code>。前端回调参数仅作跳转通知，业务必须以服务端返回的查询结果为唯一准绳。
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">4</div>
    <div class="api-step-content">
      <div class="api-step-title">
        录入素材资产并轮询就绪状态
        <span class="api-card-badge green">System AK/SK</span>
      </div>
      <p class="api-step-desc">
        调用 <a href="./assets/create">创建素材资产 (CreateAsset)</a>，关联上述 <code>GroupId</code>、指定素材类型（如人像面部图片）与上游可公网拉取的媒体 URL，记录返回的素材 <code>Id</code>。接着周期性调用 <a href="./assets/get">查询素材资产信息 (GetAsset)</a>，直到 <code>Status</code> 变为 <code>Active</code> 后方可投入生成。若遇到 <code>Failed</code> 应检查错误原因。
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">5</div>
    <div class="api-step-content">
      <div class="api-step-title">
        切换凭据并提交视频生成异步任务
        <span class="api-card-badge brand">Model API Key</span>
      </div>
      <p class="api-step-desc">
        携带 <strong>AGIOne Model API Key</strong>（Bearer Token 形式）调用 <a href="./video/create-task">创建视频生成任务 (CreateVideoTask)</a>。在请求体 <code>content</code> 图片项的 <code>image_url.url</code> 中填入资产协议 URI：<code>asset://&lt;ASSET_ID&gt;</code>，提示词按素材顺序关联描述。请求受理成功后返回任务 <code>id</code>。
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">6</div>
    <div class="api-step-content">
      <div class="api-step-title">
        有界轮询并消费生成视频产物
        <span class="api-card-badge brand">Model API Key</span>
      </div>
      <p class="api-step-desc">
        根据返回的任务 <code>id</code> 定期调用 <a href="./video/get-task">查询视频生成任务 (GetVideoTask)</a>。任务处于 <code>queued</code> 或 <code>running</code> 时执行带退避的有界轮询；当状态流转为 <code>succeeded</code> 时，持久化存储返回的最终视频 CDN 地址；若返回 <code>failed</code> 或 <code>expired</code>，应记录失败原因并及时终止轮询。
      </p>
    </div>
  </div>
</div>

## 异常恢复与边界治理

* **认证链接超时**：若真人未在有效期内完成活体验证导致链接失效，需重新执行第 2 步拉起全新 Session，旧 `BytedToken` 无法续期。
* **素材入库重试**：媒体下载失败、格式不支持或人脸特征点提取失败时，先修正图片源再重新调用创建接口；创建请求发生网络超时时不应盲目自动重试，应先按原参数复核是否已创建成功。
* **虚拟形象场景**：非真人认证场景（如 3D 虚拟形象）可跳过活体 H5，直接调用 <a href="./asset-groups/create">创建素材资产组合 (CreateAssetGroup)</a>（指定 `GroupType="AIGC"`）后录入素材。
* **项目隔离约束**：接口中所有的 `ProjectName=default` 均为上游云资源池协议约束，不代表也不穿透 AGIOne 租户权限隔离。
