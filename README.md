# Agione Docs

Agione 项目文档站点，基于 [VitePress](https://vitepress.dev/) 构建。

## 环境要求

- **Node.js**: `>= 20.19.0`

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 本地访问
npm run docs:dev

# 局域网访问
npm run docs:dev -- --host
```

开发服务器启动后，浏览器打开 `http://localhost:5173/` 即可预览，修改文档会热重载。

### 生产构建

```bash
npm run docs:build
```

构建产物输出到 `docs/.vitepress/dist/`，可直接部署到任意静态服务器。

### 预览生产构建

```bash
npm run docs:preview
```

## 项目结构

```
.
├── docs/
│   ├── .vitepress/
│   │   └── config.mts        # VitePress 站点配置
│   ├── index.md              # 首页
│   ├── markdown-examples.md  # Markdown 示例
│   └── api-examples.md       # 运行时 API 示例
├── .gitignore
├── package.json
└── package-lock.json
```

## 添加文档

在 `docs/` 目录下新增 `.md` 文件，VitePress 会自动生成路由。路由路径即文件路径：

| 文件路径 | 访问路径 |
|---|---|
| `docs/index.md` | `/` |
| `docs/guide/getting-started.md` | `/guide/getting-started` |

侧边栏和导航栏配置在 `docs/.vitepress/config.mts` 中同步更新。

## License

MIT
