# 协议兼容专区

AGIOne 协议兼容代理服务面向希望复用既有上游客户端 SDK、自动化脚本或调用习惯的团队。通过在平台侧构建协议转译与安全代理层，业务系统无需迁移代码或重写业务流水线，即可直接对接本地与私有化智算资源。

<div class="api-portal-grid">
  <a href="./volcengine/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🌋</span>
    </div>
    <div class="api-card-title">
      火山方舟兼容 API
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      对标火山方舟（Ark）数字人与素材生态，完整覆盖真人活体认证 H5、素材资产组合（AIGC）、私域人像素材托管及异步视频生成任务。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">版本 2024-01-01</span>
      <span class="api-tag">12 个资产 Action</span>
      <span class="api-tag">视频生成任务</span>
    </div>
  </a>

  <a href="./doubao/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">📦</span>
      <span class="api-card-badge">已升级</span>
    </div>
    <div class="api-card-title">
      旧版豆包协议入口
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      原单页豆包协议文档已全面归并升级至“火山方舟兼容专区”。保留该路由以保证存量系统文档链接与书签的可访问性。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">存量链接重定向</span>
      <span class="api-tag">参考归并</span>
    </div>
  </a>
</div>

## 专区设计规范与适配原则

1. **凭据双轨制**：
   - 素材与真人认证涉及租户级资产安全，严格使用 AGIOne 签发的 **System API AK/SK** 配合火山兼容签名算法；
   - 视频生成与单任务查询面向模型推理，直接复用 **Model API Key** 的 Bearer Token 鉴权。
2. **上游边界明确**：
   - 资产操作统一定位在 `POST /hyperone/xapi/api/ark_asset/{shortId}`，请求体上限严格限制在 1 MiB 内；
   - 兼容范围以本专区列出的接口和参数为准。
3. **安全与环境隔离**：
   - 签名计算严格由服务端完成，严禁在前端或客户端明文传输 SK；
   - 部署路由请求头用于网关寻址，不替代租户和用户的身份归属鉴权。
