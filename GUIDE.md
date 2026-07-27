# VitePress 项目指南

## 目录结构

```
.
├── docs/                          # VitePress 文档根目录
│   ├── .vitepress/                # 项目配置目录
│   │   ├── config/                # 配置文件
│   │   │   ├── index.ts           # 主配置入口（合并所有配置）
│   │   │   └── shared.ts          # 共享基础配置（title、description）
│   │   ├── theme/                 # 主题配置
│   │   │   ├── index.ts           # 主题入口（扩展默认主题）
│   │   │   ├── en.ts              # 英文主题配置（合并 navbar + sidebar）
│   │   │   ├── zh.ts              # 中文主题配置（合并 navbar + sidebar）
│   │   │   ├── navbar/                  # 导航栏配置
│   │   │   │   ├── en.ts                # Preview 版英文导航栏（生产环境构建时由模板生成，勿手动修改）
│   │   │   │   ├── zh.ts                # Preview 版中文导航栏（生产环境构建时由模板生成，勿手动修改）
│   │   │   │   ├── en.main.ts           # CN 版英文导航模板（docs.agione.cc）
│   │   │   │   ├── zh.main.ts           # CN 版中文导航模板（docs.agione.cc）
│   │   │   │   ├── en.global.main.ts    # Global 版英文导航模板（docs.agione.pro）
│   │   │   │   └── zh.global.main.ts    # Global 版中文导航模板（docs.agione.pro）
│   │   │   └── sidebar/           # 侧边栏配置
│   │   │       ├── en.ts          # 英文侧边栏
│   │   │       └── zh.ts          # 中文侧边栏
│   │   ├── social.ts              # 社交链接配置
│   │   ├── cache/                 # 缓存目录（自动生成）
│   │   └── dist/                  # 构建输出目录（自动生成）
│   ├── assets/                    # 文档资源文件（图片等）
│   ├── public/                    # 静态资源（favicon、logo 等，直接复制到构建输出）
│   ├── index.md                   # 英文首页
│   ├── presales/                  # 英文售前文档
│   │   ├── best-practices/        # 最佳实践子目录
│   │   └── survey/                # 调研子目录
│   ├── solution/                  # 英文方案设计文档
│   ├── deployment/                # 英文交付部署文档
│   ├── operations/                # 英文运维运营文档
│   ├── troubleshooting/           # 英文排错支持文档
│   ├── oem/                       # 英文 OEM 配置文档
│   └── zh-CN/                        # 中文文档目录
│       ├── index.md               # 中文首页
│       ├── presales/              # 中文售前文档
│       │   ├── best-practices/    # 最佳实践子目录
│       │   └── survey/            # 调研子目录
│       ├── solution/              # 中文方案设计文档
│       ├── deployment/            # 中文交付部署文档
│       ├── operations/            # 中文运维运营文档
│       ├── troubleshooting/       # 中文排错支持文档
│       └── oem/                   # 中文 OEM 配置文档
├── .github/workflows/             # CI/CD 配置
├── .gitignore
├── package.json
└── README.md
```

## 如何添加新文档

### 1. 创建 Markdown 文件

在 `docs/` 目录下创建 `.md` 文件，VitePress 会根据文件路径自动生成路由：

| 文件路径 | 访问路径 |
|----------|----------|
| `docs/presales/new-doc.md` | `/presales/new-doc` |
| `docs/zh-CN/presales/new-doc.md` | `/zh-CN/presales/new-doc` |
| `docs/deployment/subdir/guide.md` | `/deployment/subdir/guide` |

### 2. 更新侧边栏配置

添加文档后，需要在侧边栏配置中添加对应的导航项：

**英文侧边栏** `docs/.vitepress/theme/sidebar/en.ts`：

```typescript
'/presales/': [
  {
    text: 'Pre-Sales',
    collapsed: false,
    items: [
      { text: 'New Document', link: '/presales/new-doc' },
      // ... 其他文档
    ],
  },
],
```

**中文侧边栏** `docs/.vitepress/theme/sidebar/zh.ts`：

```typescript
'/presales/': [
  {
    text: '售前资料',
    collapsed: false,
    items: [
      { text: '新文档', link: '/zh-CN/presales/new-doc' },
      // ... 其他文档
    ],
  },
],
```

### 3. 更新导航栏配置

导航栏文件 `en.ts` / `zh.ts` 是构建时由模板自动生成的，**请勿直接修改**。
如需修改导航内容，需要编辑对应的模板文件：

| 模板文件 | 用途 | 生效域名 |
|----------|------|---------|
| `navbar/en.main.ts` | CN 版英文导航 | docs.agione.cc |
| `navbar/zh.main.ts` | CN 版中文导航 | docs.agione.cc |
| `navbar/en.global.main.ts` | Global 版英文导航 | docs.agione.pro |
| `navbar/zh.global.main.ts` | Global 版中文导航 | docs.agione.pro |

```typescript
// 添加新导航项
{ text: 'New Section', link: '/new-section/' },

// 或添加到下拉菜单
{
  text: 'Documentation',
  items: [
    { text: 'New Section', link: '/new-section/' },
    // ... 其他项
  ]
},
```

> **注意**：CN 版和 Global 版需要分别修改对应的模板文件，确保两边同步。

### 4. 添加新章节（完整流程）

如果需要添加全新的章节（如 `/api/`）：

1. **创建文档目录和首页**：
   ```bash
   mkdir -p docs/api docs/zh-CN/api
   ```
   创建 `docs/api/index.md` 和 `docs/zh-CN/api/index.md`

2. **添加侧边栏配置**：

   `docs/.vitepress/theme/sidebar/en.ts`：
   ```typescript
   '/api/': [
     {
       text: 'API Reference',
       collapsed: false,
       items: [
         { text: 'Overview', link: '/api/' },
         { text: 'Endpoints', link: '/api/endpoints' },
       ],
     },
   ],
   ```

   `docs/.vitepress/theme/sidebar/zh.ts`：
   ```typescript
   '/zh-CN/api/': [
     {
       text: 'API 参考',
       collapsed: false,
       items: [
         { text: '概述', link: '/zh-CN/api/' },
         { text: '接口列表', link: '/zh-CN/api/endpoints' },
       ],
     },
   ],
   ```

3. **添加到导航栏**（可选）：

   `docs/.vitepress/theme/navbar/en.ts`：
   ```typescript
   { text: 'API', link: '/api/' },
   ```

   `docs/.vitepress/theme/navbar/zh.ts`：
   ```typescript
   { text: 'API', link: '/zh-CN/api/' },
   ```

## 主要配置说明

### 主配置 `config/index.ts`

项目的主配置文件，负责合并所有配置：

```typescript
import { defineConfig } from 'vitepress'
import { baseConfig } from './shared'
import { enTheme } from '../theme/en'
import { zhTheme } from '../theme/zh'
import { socialLinks } from '../social'

export default defineConfig({
  ...baseConfig,                    // 基础配置（title、description）
  themeConfig: {
    search: {                       // 搜索配置
      provider: 'local',            // 'local' 或 'algolia'
      options: {
        locales: {
          zh: {                     // 中文搜索翻译
            translations: { /* ... */ },
          },
        },
      },
    },
  },
  locales: {
    root: {                         // 英文（根语言）
      label: 'English',
      lang: 'en',
      themeConfig: {
        ...enTheme,
        socialLinks,
      },
    },
    zh: {                           // 中文
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-CN/',                 // 切换语言时的默认链接
      themeConfig: {
        ...zhTheme,
        socialLinks,
      },
    },
  },
})
```

### 侧边栏配置 `sidebar/*.ts`

侧边栏使用路径作为 key，实现不同章节显示不同的侧边栏：

```typescript
import type { DefaultTheme } from 'vitepress'

export const enSidebar: DefaultTheme.Sidebar = {
  '/presales/': [                   // 访问 /presales/* 时显示
    {
      text: 'Pre-Sales',            // 分组标题
      collapsed: false,             // false=默认展开，true=默认折叠
      items: [
        { text: 'Overview', link: '/presales/' },
        { text: 'Feature List', link: '/presales/feature-list' },
      ],
    },
  ],
}
```

**侧边栏属性说明**：

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | `string` | 分组标题或链接文本 |
| `link` | `string` | 点击跳转的路径（相对于 `docs/`） |
| `collapsed` | `boolean` | `true` 默认折叠，`false` 默认展开 |
| `items` | `array` | 子项列表 |
| `base` | `string` | 基础路径前缀（可选，用于简化 link） |

### 导航栏配置 `navbar/*.ts`

本项目使用模板 + 生成的方式管理导航栏：

- **模板文件**（手动编辑）：`*.main.ts` / `*.global.main.ts`
- **生成文件**（CI/CD 自动生成）：`en.ts` / `zh.ts`

CI/CD 构建时会自动将模板复制为生成文件：
- `deploy` job（CN）：`en.main.ts` → `en.ts`，`zh.main.ts` → `zh.ts`
- `deploy-global` job（Global）：`en.global.main.ts` → `en.ts`，`zh.global.main.ts` → `zh.ts`

模板示例：

```typescript
export const enNavbar = [
  { text: 'Home', link: '/' },
  { text: 'Product Overview', link: '/presales/' },
  {
    text: 'Documentation',
    items: [
      { text: 'Solution', link: '/solution/' },
      { text: 'Deployment', link: '/deployment/' },
    ],
  },
  { text: 'AGIOne', link: 'https://agione.pro/' },  // CN 版为 https://agione.cc/
  { text: 'OneProCloud', link: 'https://oneprocloud.com/' },
]
```

**导航栏属性说明**：

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | `string` | 显示文本 |
| `link` | `string` | 链接地址（内部路径或外部 URL） |
| `items` | `array` | 下拉菜单项 |
| `activeMatch` | `string` | 高亮匹配的正则表达式（可选） |

### 搜索配置

**本地搜索**（已启用）：

```typescript
search: {
  provider: 'local',
  options: {
    locales: {
      zh: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询',
            backButtonTitle: '关闭搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
  },
},
```

**Algolia DocSearch**（已注释，可选启用）：

```typescript
search: {
  provider: 'algolia',
  options: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
    indexName: 'YOUR_INDEX_NAME',
  },
},
```

### 社交链接配置 `social.ts`

```typescript
export const socialLinks = [
  { icon: 'github', link: 'https://github.com/agione-pro/docs' },
  // ... 更多社交链接
]
```

## CI/CD 说明

### 构建部署流程

项目使用 GitHub Actions 实现自动化构建部署，配置文件位于 `.github/workflows/main.yml`。

`main` 分支推送代码时，会触发 **两个并行 job** 构建两套静态资源。
也支持在 GitHub Actions 页面手动触发（`workflow_dispatch`）。

| Job | 使用模板 | 部署路径 | 访问域名 |
|-----|---------|---------|---------|
| `deploy` | `en.main.ts` + `zh.main.ts` | `vars.DEPLOY_PATH` | docs.agione.cc |
| `deploy-global` | `en.global.main.ts` + `zh.global.main.ts` | `vars.GLOBAL_DEPLOY_PATH` | docs.agione.pro |

### 构建步骤（每个 job 相同）

1. **Checkout** - 拉取代码
2. **Setup Node** - 配置 Node.js 环境
3. **Copy 导航文件** - 将对应模板复制为 `en.ts` / `zh.ts`
4. **Install** - `npm ci` 安装依赖
5. **Build** - `npm run docs:build` 构建静态资源
6. **Rsync** - 同步到目标服务器
7. **Refresh CDN** - 刷新 CDN 缓存

### 触发方式

| 触发方式 | 说明 |
|----------|------|
| 推送到 `main` 分支 | 自动触发 CN + Global 双构建 |
| 手动触发（Actions 页面） | 可选择 `workflow_dispatch` 手动运行 |

### 环境变量

| 变量 | 用途 |
|------|------|
| `vars.DEPLOY_PATH` | CN 版部署目录 |
| `vars.GLOBAL_DEPLOY_PATH` | Global 版部署目录 |
| `vars.DEPLOY_HOST` | 目标服务器地址（两套共用） |
| `vars.DEPLOY_PORT` | SSH 端口（两套共用） |
| `vars.DEPLOY_USER` | SSH 用户名（两套共用） |
| `secrets.DEPLOY_KEY` | SSH 私钥（两套共用） |

### 两套版本差异

CN 版和 Global 版唯一的区别是导航栏中 **AGIOne** 的链接地址：

| 版本 | AGIOne 链接 |
|------|------------|
| CN (`deploy`) | `https://agione.cc/` |
| Global (`deploy-global`) | `https://agione.pro/` |

如需添加新的外部链接且两套版本不同，需要分别在 `*.main.ts` 和 `*.global.main.ts` 模板中修改。

### Preview 环境部署

项目另有一个 Preview 环境用于测试预览，配置文件位于 `.github/workflows/preview.yml`。

与 main 分支的 CI/CD 不同，Preview 环境有以下特点：

| 特性 | main 分支 | preview 分支 |
|------|-----------|-------------|
| 配置文件 | `main.yml` | `preview.yml` |
| 触发分支 | `main` | `preview` |
| 构建 job | 2 个并行（CN + Global） | 1 个（Preview） |
| 导航栏 | 由模板生成 | 直接使用 `en.ts` / `zh.ts` |
| 部署路径 | `vars.DEPLOY_PATH` / `vars.GLOBAL_DEPLOY_PATH` | `vars.PREVIEW_DEPLOY_PATH` |

Preview 环境**不使用导航栏模板**，构建时直接使用仓库中现有的 `en.ts` / `zh.ts` 文件。这适用于：
- 在正式发布前预览文档内容
- 测试导航栏配置的实际效果

如需部署到 Preview 环境：
1. 将代码推送到 `preview` 分支，或
2. 在 GitHub Actions 页面手动触发 `Deploy to docs-preview` workflow

### 环境变量

Preview 环境需要额外配置以下变量：

| 变量 | 用途 |
|------|------|
| `vars.PREVIEW_DEPLOY_PATH` | Preview 版部署目录 |
| `vars.DEPLOY_HOST` | 目标服务器地址（三套共用） |
| `vars.DEPLOY_PORT` | SSH 端口（三套共用） |
| `vars.DEPLOY_USER` | SSH 用户名（三套共用） |
| `secrets.DEPLOY_KEY` | SSH 私钥（三套共用） |

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run docs:dev` | 启动开发服务器 |
| `npm run docs:dev -- --host` | 启动开发服务器（局域网访问） |
| `npm run docs:build` | 生产构建 |
| `npm run docs:preview` | 预览生产构建 |

## 注意事项

1. **路由规则**：`docs/foo/bar.md` 对应访问路径 `/foo/bar`，`.md` 后缀自动省略
2. **首页文件**：目录下的 `index.md` 对应该目录的首页，如 `docs/presales/index.md` → `/presales/`
3. **中英文同步**：添加新文档时，建议同时添加对应的中文版本并更新两侧的配置
4. **静态资源**：放在 `docs/public/` 下的文件可通过 `/filename` 直接访问
5. **文档内图片**：建议使用相对路径或 `~assets/` 前缀引用 `docs/assets/` 下的资源
6. **侧边栏路径**：侧边栏的 `link` 不需要 `.md` 后缀

## 场景文档写作规范

用户指南中的场景文档负责回答“我要完成什么”，用户手册负责说明“某个页面怎么操作”。场景文档应串联用户手册，不复制维护完整字段表和页面说明。

每个场景使用“场景概览 + 功能子文档”的结构。场景根目录的 `index.md` 只承担概览和索引，具体操作拆到同目录的功能文档中。

每个场景至少包含以下内容：

1. **场景概览**：介绍场景内容、适用角色、场景目标、开始前准备、推荐阅读顺序和文档索引。
2. **功能子文档**：按实际菜单或业务任务拆分操作，避免把所有功能堆在概览页。
3. **功能截图**：每个功能子文档至少包含一张与当前功能对应的界面截图。
4. **操作链路**：按业务顺序给出菜单路径，并链接到对应用户手册功能页。
5. **完成检查**：使用状态、数量、日志、监控或列表记录等可观察结果判断是否完成。
6. **失败分支**：按现象给出首要检查项和继续排查的手册入口。
7. **安全边界**：不得写入真实密码、Token、API Key、AK/SK、Cookie、证书或内部客户数据。

维护要求：

- 新增场景时同步创建中英文路径，并同步更新 `ScenarioGuide.vue` 与中英文侧边栏。
- 常见任务用于筛选多个具体场景，不应为同一业务问题额外创建重复的独立场景卡。
- 场景页优先链接用户手册中的入门页、端到端流程页和功能页，避免复制易变化的字段说明。
- 场景使用“完成”表述前，必须具备前置条件、操作步骤、完成检查和失败处理。
- 发布前执行中英文路径对齐、相对链接扫描和 `npm run docs:build`。
