# 文档配图截取规范

> 适用范围：`docs/` 与 `docs/zh-CN/` 下所有用户手册、场景文档的界面配图
> 更新日期：2026-10-29
> 配套脚本：`scripts/render-shot.py`

本规范回答一个问题：**怎么让配图稳定、可复现、中英文各自对版。**
手工截图、窗口截图、MCP 浏览器截图都会受显示器尺寸、系统缩放和窗口布局影响，
同一页面在不同机器上出来的宽高、菜单展开状态、甚至列宽都不一样。
因此本仓库的配图统一用**浏览器渲染截图**：不拍屏幕，让浏览器按固定视口把界面渲染成图片。

---

## 1. 四条硬规则

1. **固定视口**：`1920×1080`（长列表用 `1920×1220`），`deviceScaleFactor=2`。
   换谁的电脑，出来的图都是同样尺寸、同样布局。
2. **中英文各自对版**：中文页配中文界面图，英文页配英文界面图。
   英文图必须在系统里把界面语言切到 English 后再截，不能用中文图充数。
3. **保留左侧菜单、裁掉顶部导航**：左侧菜单要包含当前页高亮；页面顶部那条产品级横向导航条要裁掉。
   裁多少**不写死数字**，截图时从 DOM 实测导航条高度，再乘以 DPR 换算成设备像素。
4. **弹框只截弹框**：弹窗、抽屉、单张卡片一律用**元素截图**，禁止"整页截图后再裁"。
   整页截图会把 50% 黑遮罩和背景一起拍进去；一旦再叠上裁顶，刀口会同时削掉弹框顶部和侧边栏首行。

---

## 2. 环境准备

```bash
python -m pip install playwright pillow
```

浏览器不需要额外下载，脚本会优先复用系统 Edge（`channel=msedge`），找不到再退到 Chrome。

登录态只需保存一次：

```bash
python scripts/render-shot.py login \
  --url "http://test.metis.opr/modelone/model-source" \
  --user operator \
  --until ".main-box" \
  --state .auth/state.json
```

- `--until` 填**登录成功后才出现**的元素，用 CSS 选择器，不要用中文文本（见第 7 节坑位 1）。
- 登录态会过期（一般几天），过期后重跑这一条。
- `.auth/` 含 token，**不得提交**，不要复制到任务交付物里。

---

## 3. 三种截取方式

| 要截什么 | 方式 | 说明 |
| --- | --- | --- |
| 整页（含左侧菜单） | `page` | 视口截图，之后再裁顶部导航与底部 |
| 弹窗、抽屉、单张卡片 | `element` | 元素截图，自动去掉遮罩与背景 |
| 页面内固定区块（如筛选区） | `clip` | 页面坐标裁剪，坐标由 DOM 的 `getBoundingClientRect()` 计算 |

**优先用 element**：它只拍目标元素，不会把无关背景框进来。
只有"没有合适选择器"时（例如筛选卡片没有独立 id）才用 clip。

`clip` 的坐标必须由脚本现算，**不要手写成固定数字**：

```python
rect = page.evaluate("""() => {
  const el = document.querySelector('input[placeholder^="搜索"]').closest('.rounded-lg');
  const r = el.getBoundingClientRect();
  return {x: Math.round(r.left + scrollX), y: Math.round(r.top + scrollY),
          width: Math.round(r.width), height: Math.round(r.height)};
}""")
page.screenshot(path="filter.png", clip=rect)
```

---

## 4. 弹窗与抽屉的两个必备处理

### 4.1 抽屉高度按内容算，不要写死

抽屉是可滚动的，视口多高它多高。视口 1080 时，内容一旦超过 1080 就会被截断——
**英文文案比中文长，中文能截全的场景英文经常截不全。**

正确做法：先量出抽屉三段（header / body 内容 / footer）的实际高度，把视口设成正好容纳，
再按抽屉边界裁剪：

```python
need = header_h + content_h + footer_h + 16
page.set_viewport_size({"width": 1920, "height": need})
```

`content_h` 取 body 内**最后一个子元素的 bottom**，不要用 `scrollHeight`——
body 是 `flex:1` 撑满的，`scrollHeight` 会把空白一起算进去。

### 4.2 截图前清掉浮层

以下浮层会污染截图，截图前统一处理：

- 语言切换弹层（切换语言后会残留）
- "New Version / Update Time" 版本提示
- 右下角悬浮帮助按钮
- 右键菜单、tooltip

```python
page.keyboard.press("Escape")
page.mouse.move(5, 5)
page.evaluate("""() => {
  document.querySelectorAll('.el-popper[aria-hidden="false"]').forEach(e => e.style.display = 'none');
}""")
```

---

## 5. 中英文分离

英文文档的图必须来自英文界面：

```python
page.locator(".language-select").first.click()
page.wait_for_timeout(500)
page.locator(".language-select__option", has_text="English").click()
page.wait_for_timeout(1800)
```

切换后必须执行 4.2 的清浮层，否则语言弹层会留在图里挡住右上角按钮。

语言选择按钮：页面顶栏地球图标，类名 `.language-select`；选项类名 `.language-select__option`。
选项文案为 `English` / `中文简体` / `Español`。

---

## 6. 后处理

### 6.1 裁顶部导航

**不要写死像素数，也不要靠亮度探测。** 整页截图前先问 DOM：

```python
nav_h = page.evaluate("""() => {
  const el = document.querySelector('.header-bar');
  return el ? Math.round(el.getBoundingClientRect().height) : null;
}""")
```

实测该导航条高度为 **56 CSS px**。裁切时按倍图换算：

```python
top_device_px = nav_h * deviceScaleFactor      # 2x 图上是 112，1x 图上是 56
```

**单位是这里最容易出错的地方**：`112` 只在 2 倍图上成立，等于 56 CSS px。
把 112 直接用在已经降到 1 倍的图上，等于裁掉 112 CSS px——正好是导航条的两倍，
多出来的 56px 会吃掉侧边栏顶部的分组标题，并把垂直居中的弹框顶部削掉 9px。

亮度探测（`row_avg > 200`）只在"没有遮罩"的普通页面上有效。弹框打开后整屏被
`rgba(0,0,0,.5)` 遮罩压暗，任何一行都到不了 200，探测会直接返回 0 或误判，
所以弹框场景根本不该走整页截图（见第 1 节规则 4）。

### 6.2 降采样到 1x

2x 图清晰但体积大。统一 `resize(width//2, height//2, LANCZOS)`，
得到与历史配图一致的 1x 尺寸（1920 宽），单张控制在 300KB 以内。

### 6.3 列表页底部

列表底部允许裁在某一行中间（与仓库既有列表图一致），但**不能把标题行切掉一半还留着下划线**。
需要更干净时，把列表视口加到 1220 再按行分隔线裁。

### 6.4 元素截图修圆角

浏览器拍元素时按**外接矩形**取景，圆角以外的那几个像素会露出遮罩灰（`rgba(0,0,0,.5)` 压成 127），
降采样后表现为图角一圈灰边、图是直角而弹框是圆角。

处理办法：截图后按元素自身圆角把外接矩形修成真圆角，圆角外置透明。

```python
radius = page.evaluate("""(sel) => {
  const el = document.querySelector(sel);
  return el ? Math.round(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0) : 0;
}""", selector)
mask = rounded_mask(size_1x, radius)        # 4 倍超采样画圆角，避免锯齿
im = im.convert("RGBA"); im.putalpha(mask)
```

要点：

- **向内收 1px 再画圆角**。元素取景框常比视觉边界高半个设备像素，不内收会在最外圈留一条灰发丝。
- **输出 RGBA 透明**，不要填白。站点默认带暗色模式，填白会在暗底下露出白色直角块。
- 圆角半径从 `getComputedStyle` 读，不要写死 24。

---

## 7. 坑位清单

| # | 现象 | 原因 | 处理 |
| --- | --- | --- | --- |
| 1 | 传中文选择器，等到超时 | Windows 控制台把 argv 里的中文转成乱码，Playwright 收到的是乱码字符串 | 中文选择器写在脚本文件内（UTF-8），命令行只传 ASCII；或改用 CSS 选择器 |
| 2 | 英文图右上角多出一个语言下拉框 | 切换语言后弹层未关闭 | 截图前按 Esc + 移除 `.el-popper` |
| 3 | 抽屉底部内容被截断（英文尤其明显） | 视口高度固定 1080 | 按内容高度动态设置视口（4.1） |
| 4 | 元素截图右侧按钮被切一半 | 英文文案更长，撑出抽屉边界 | 抽屉改用 clip 按 rect 精确裁剪，不要用元素截图 |
| 5 | 整页截图的表格最后一行只有一半 | 视口高度不是行高整数倍 | 加高视口后按分隔线裁，或接受（与既有图一致） |
| 6 | `full_page=True` 出来文字发糊 | 长页面会被缩放压缩 | 禁用整页截图，改用分段或固定视口 |
| 7 | 图里有真实 Key 或手机号 | 未脱敏 | 按 `USER_MANUAL_PAGE_STRUCTURE_GUIDE.md` 第 6 节：仅对 Key 值与电话号码做高斯模糊 |
| 8 | 截图空白或只有骨架 | SPA 首屏 8–12 秒，`sleep` 不可靠 | 用 `--wait` 等一个"加载完成后才出现"的元素 |
| 9 | 弹框图背景发灰、整屏被压暗 | 用了整页截图，把 `rgba(0,0,0,.5)` 遮罩一起拍了 | 改用元素截图 `.el-dialog`，并在脚本里加宽度守卫：输出宽度等于视口宽度就直接报错 |
| 10 | 侧边栏第一行文字/图标被削平、首行分组标题消失 | 裁顶像素数翻倍：把 2 倍图上的 112 当成了 1 倍图的 112 | 裁顶前实测导航条高度并乘 DPR；输出高度应等于"视口高 − 导航高"，不符就告警 |
| 11 | 弹框标题栏贴顶、上内边距只剩一半、顶部圆角被削平 | 弹框垂直居中，裁切线落在弹框内部 | 同上；弹框场景本就不该裁顶，见规则 4 |

---

## 8. 出图自检

每张图交付前检查：

- [ ] 尺寸正常（整页 1920 宽，弹窗/抽屉为元素实际宽度）
- [ ] 文件 > 8KB，且不是纯色图
- [ ] 整页图高度 = 视口高 − 导航条高（1920×1080 视口应为 1024，1920×855 视口应为 799）
- [ ] 左侧菜单存在、当前页高亮，且**第一行文字与图标完整未被削平**
- [ ] 顶部导航条已裁掉
- [ ] 弹框图**宽度等于弹框实际宽度**（例如 700），绝不是 1920；画面里没有灰底遮罩
- [ ] 弹框图四角为**透明圆角**：不得出现灰色直角边、灰方块或发丝灰线
- [ ] 弹框标题栏上内边距与下内边距接近对称，圆角四角完整
- [ ] 语言与所在页面一致（中文页中文图、英文页英文图）
- [ ] 弹窗/抽屉内容完整，底部按钮未被截断
- [ ] 无真实凭据、无内部地址泄露风险
- [ ] 图片内文字与正文步骤一致（按钮名、字段名逐字对应）

出图后运行：

```bash
npm run check:docs-images
npm run check:docs-profile
npm run docs:build
```

---

## 9. 复用方式

`scripts/render-shot.py` 内置了本仓库常用页面的截图配方。新增页面时在该文件的
`RECIPES` 里加一个函数，按上面的约定实现即可：

```bash
python scripts/render-shot.py shoot \
  --recipe model-source \
  --lang en \
  --state .auth/state.json \
  --out /tmp/shots/en
```

输出目录会同时得到 `.png` 与同名 `.json`（记录 url、选择器、视口、耗时、校验结果），
`.json` 是配图可追溯的依据，归档时与图片一起保留。

### 9.2 通用单图抓取（无需编写配方）

如果只需截单张弹框、抽屉或页面，无需新写 recipe 函数，直接调用 `capture`：

```bash
# 1) 弹框截图（自动点开、元素截图、透明圆角、宽度安全校验）
python scripts/render-shot.py capture \
  --url "/user/user-space/team-members" \
  --name "add-member" \
  --mode element \
  --selector ".el-dialog" \
  --click "button:has-text('Add Member')" \
  --lang en \
  --state .auth/state.json \
  --out docs/usermanual/settings/operator/members-roles/members/images

# 2) 抽屉截图（自动撑开视口自适应内容高度、精确裁剪）
python scripts/render-shot.py capture \
  --url "/modelone/model-source/1/edit" \
  --name "add-endpoint" \
  --mode drawer \
  --selector ".model-source-endpoint-editor-drawer" \
  --click "button:has-text('Add Endpoint')" \
  --lang en \
  --state .auth/state.json \
  --out /tmp/shots

# 3) 整页截图（DOM 实测导航高裁顶、清理底部白边）
python scripts/render-shot.py capture \
  --url "/user/user-space/team-members" \
  --name "members-list" \
  --mode page \
  --lang en \
  --state .auth/state.json \
  --out /tmp/shots
```

### 9.3 构图规范体检（保障命令）

提交前或排查存量图片问题时，运行体检命令：

```bash
python scripts/render-shot.py audit --dir docs
```

会自动检测三类严重构图违规：
1. **弹框误用整页截图**：操作类弹框图片宽度为 1920，包含整页背景和遮罩。
2. **首行削平（多裁）**：1920 宽度截图首行被削平，丢失菜单分组或标题。
3. **缺少透明圆角**：弹框元素截图未做透明圆角处理，四周残留灰色方块或杂边。

