#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""render-shot.py —— 文档配图渲染截图工具

配套规范：SCREENSHOT_GUIDE.md

子命令：
    login   登录一次并把登录态存到 --state
    shoot   按 recipe 渲染截图（含后处理与自检）

示例：
    python scripts/render-shot.py login \
      --url "http://<your-host>/user/login" \
      --user <your-user> --until ".main-box" --state .auth/state.json

    python scripts/render-shot.py shoot \
      --recipe members --lang en --base-url "http://<your-host>" \
      --state .auth/state.json --out /tmp/shots/en

设计约定（详见 SCREENSHOT_GUIDE.md）：
    * 固定视口 1920 宽、deviceScaleFactor=2
    * 停动画/过渡/光标
    * 切换语言后必须清浮层
    * 抽屉按内容高度设置视口，并按 rect 精确裁剪
    * 后处理：裁顶部导航 -> 裁底部 -> 降采样到 1x

环境：BASE 只是默认值，用 --base-url 指向你自己的环境（本地 / 测试 / 演示均可）。
"""
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

from PIL import Image, ImageDraw

BASE = ""   # 目标环境地址，由 --base-url 传入；各人环境不同（本地/测试/演示），不写死
W = 1920
H_PAGE = 1080
H_LIST = 1220
DPR = 2

# 产品级顶部导航条的选择器。高度不写死：每页截图前从 DOM 实测，
# 再按 DPR 换算成设备像素。历史上曾把 2x 图的 112px 直接用在 1x 图上，
# 多裁了一倍高度，导致侧边栏首行与弹框顶部被削平。
NAV_SEL = ".header-bar"
NAV_FALLBACK = 56   # 仅当页面没有导航条且实测失败时兜底，命中会打警告

STABLE_CSS = """
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
  caret-color: transparent !important;
}
html { scroll-behavior: auto !important; }
"""

LANG_TEXT = {
    "zh": {"create": "新建模型源", "cancel": "取消", "add_endpoint": "添加 Endpoint",
           "details": "详情", "search": "搜索模型源"},
    "en": {"create": "Create Model Source", "cancel": "Cancel", "add_endpoint": "Add Endpoint",
           "details": "Details", "search": "Search source name"},
}


# ----------------------------------------------------------------- 工具

def log(msg):
    print(f"[render-shot] {msg}", flush=True)


def row_avg(im, y, x0, x1, step=9):
    px = im.load()
    vals = [(px[x, y][0] + px[x, y][1] + px[x, y][2]) / 3 for x in range(x0, x1, step)]
    return sum(vals) / len(vals)


def verify(path, min_kb=8, min_var=25):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    kb = path.stat().st_size / 1024
    small = im.resize((64, 64)).tobytes()
    means = [(small[i] + small[i + 1] + small[i + 2]) / 3 for i in range(0, len(small), 3)]
    avg = sum(means) / len(means)
    var = sum((m - avg) ** 2 for m in means) / len(means)
    problems = []
    if kb < min_kb:
        problems.append(f"file too small ({kb:.1f}KB)")
    if var < min_var:
        problems.append(f"near solid color (var {var:.1f})")
    return {"size": [w, h], "kb": round(kb, 1), "variance": round(var, 1),
            "problems": problems, "ok": not problems}


# ----------------------------------------------------------------- 后处理

def rounded_mask(size, radius, inset=1, ss=4):
    """生成圆角矩形蒙版：边缘超采样后降采样，避免锯齿。

    inset: 向内收缩的像素数。元素截图取景框常比元素视觉边界高半个设备像素，
           边缘会带一条遮罩灰边，向内收 1px 即可削掉。
    """
    w, h = size
    m = Image.new("L", (w * ss, h * ss), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle(
        [inset * ss, inset * ss, w * ss - inset * ss - 1, h * ss - inset * ss - 1],
        radius=max(0, (radius - inset)) * ss, fill=255)
    return m.resize((w, h), Image.LANCZOS)


def postprocess(path: Path, crop_top_css=None, trim_bottom=False, round_radius=None):
    """后处理：裁顶部 -> 裁底部 -> 降采样到 1x -> 按元素圆角裁形。

    crop_top_css:  顶部要裁掉的 CSS 像素数，由调用方实测传入。
                   传 None 时退回按行亮度自动探测（历史行为，仅兜底用）。
    trim_bottom:   是否按亮度裁掉底部多余空白，仅整页图需要。
    round_radius:  元素圆角半径（CSS px）。传值则把直角取景框修成真圆角，
                   圆角外的像素置为透明，页面白底/暗底下都不会露出灰边。
    """
    im = Image.open(path).convert("RGB")
    if crop_top_css is None:
        top = 0
        for y in range(0, 400):
            if row_avg(im, y, 0, im.width) > 200:
                top = y
                break
    else:
        # 关键：截图是 DPR 倍图，CSS 像素必须先乘 DPR 才是要裁的像素数
        top = int(round(crop_top_css * DPR))
    top = max(0, min(top, im.height - 1))

    bottom = im.height
    if trim_bottom:
        for y in range(im.height - 15, top + 200, -1):
            if 228 <= row_avg(im, y, int(im.width * 0.12), int(im.width * 0.98)) <= 248:
                bottom = y + 1
                break
        else:
            for y in range(im.height - 1, top + 100, -1):
                if row_avg(im, y, int(im.width * 0.12), int(im.width * 0.98)) < 252:
                    bottom = min(im.height, y + 16)
                    break

    im = im.crop((0, top, im.width, bottom))
    # 全部输出统一降采样到 1x（截图固定 DPR=2）
    im = im.resize((im.width // 2, im.height // 2), Image.LANCZOS)

    if round_radius:
        mask = rounded_mask(im.size, round_radius)
        im = im.convert("RGBA")
        im.putalpha(mask)
    im.save(path)
    return im.size


# ----------------------------------------------------------------- 页面动作

class Shotter:
    def __init__(self, page, lang, out: Path):
        self.page = page
        self.lang = lang
        self.out = out
        self.t = LANG_TEXT[lang]
        self.results = []
        self.nav_h = None          # 顶部导航条高度（CSS px），每页实测

    def set_viewport(self, w, h):
        self.page.set_viewport_size({"width": w, "height": h})
        self.page.wait_for_timeout(400)

    def dismiss_floating(self):
        self.page.keyboard.press("Escape")
        self.page.mouse.move(5, 5)
        self.page.wait_for_timeout(250)
        self.page.evaluate("""() => {
          document.querySelectorAll('.el-popper[aria-hidden="false"]').forEach(e => e.style.display = 'none');
          document.querySelectorAll('div,section,aside').forEach(el => {
            if (/New Version/.test(el.textContent||'') && /Update Time/.test(el.textContent||'')
                && el.querySelectorAll('*').length < 15) el.style.display = 'none';
          });
          document.querySelectorAll('[class*=help],[class*=float]').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.width < 80 && r.height < 80 && r.left > innerWidth - 120 && r.top > innerHeight - 160)
              el.style.display = 'none';
          });
        }""")
        self.page.wait_for_timeout(300)

    def switch_lang(self):
        if self.lang == "zh":
            return
        self.page.locator(".language-select").first.click()
        self.page.wait_for_timeout(500)
        self.page.locator(".language-select__option", has_text="English").click()
        self.page.wait_for_timeout(1800)
        self.dismiss_floating()

    def measure_nav(self):
        """从 DOM 实测顶部导航条高度，作为裁顶依据。不写死数字。"""
        h = self.page.evaluate("""(sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return Math.round(r.height);
        }""", NAV_SEL)
        if not h:
            log(f"警告：未找到 {NAV_SEL}，暂时按 {NAV_FALLBACK}px 兜底")
            h = NAV_FALLBACK
        self.nav_h = h
        log(f"顶部导航条高度实测：{h} CSS px（{h * DPR} 设备像素）")
        return h

    def goto(self, url, expect=None):
        p = self.page
        p.goto(url, wait_until="domcontentloaded")
        try:
            p.wait_for_load_state("networkidle", timeout=8000)
        except Exception:  # noqa: BLE001
            pass
        p.add_style_tag(content=STABLE_CSS)
        p.locator(".main-box").first.wait_for(state="visible")
        p.wait_for_timeout(900)
        self.switch_lang()
        if expect:
            p.get_by_text(expect, exact=False).first.wait_for(state="visible")
        self.dismiss_floating()
        p.wait_for_timeout(400)
        self.measure_nav()

    def save(self, name, mode="clip", clip=None, selector=None, post="other"):
        p = self.page
        path = self.out / f"{name}.png"
        radius = 0
        if selector:
            p.locator(selector).first.screenshot(path=str(path), animations="disabled",
                                                 caret="hide", type="png")
            # 读元素圆角，后处理时把直角取景框修成真圆角
            radius = p.evaluate("""(sel) => {
              const el = document.querySelector(sel);
              if (!el) return 0;
              const r = getComputedStyle(el).borderTopLeftRadius || '0px';
              return Math.round(parseFloat(r)) || 0;
            }""", selector)
            # 守卫：元素截图宽度不可能等于视口宽度。一旦相等，说明选择器命中的是
            # 遮罩/全屏容器，截出来就是"弹框 + 半透明背景"，必须直接失败。
            shot_w = Image.open(path).width            # 设备像素
            vp_w = p.viewport_size["width"] * DPR      # 视口宽度，同样换算成设备像素
            if shot_w >= vp_w * 0.95:
                path.unlink(missing_ok=True)
                raise RuntimeError(
                    f"{name}: 元素截图宽 {shot_w}px，已达视口宽 {vp_w}px 的 95% 以上，"
                    f"选择器 {selector!r} 很可能命中的是遮罩层而不是目标元素")
        elif clip:
            p.screenshot(path=str(path), clip=clip, animations="disabled", caret="hide", type="png")
        else:
            p.screenshot(path=str(path), animations="disabled", caret="hide", type="png")

        if post == "page":
            size = postprocess(path, crop_top_css=self.nav_h, trim_bottom=True)
            expect_h = p.viewport_size["height"] - (self.nav_h or 0)
            if abs(size[1] - expect_h) > 3:
                log(f"警告：{name} 输出高 {size[1]}，与 视口高-导航高={expect_h} 不符，请复核裁切")
        else:
            size = postprocess(path, crop_top_css=0, trim_bottom=False, round_radius=radius)

        info = verify(path)
        meta = {"file": path.name, "lang": self.lang, "url": p.url, "mode": mode,
                "viewport": [p.viewport_size["width"], p.viewport_size["height"]],
                "dpr": DPR, "nav_h": self.nav_h,
                "ts": datetime.now().isoformat(timespec="seconds"),
                "check": info}
        if selector:
            meta["selector"] = selector
        if clip:
            meta["clip"] = clip
        path.with_suffix(".json").write_text(json.dumps(meta, ensure_ascii=False, indent=2),
                                             encoding="utf-8")
        log(f"{name}: {size} {info['kb']}KB var {info['variance']} "
            f"{'OK' if info['ok'] else info['problems']}")
        self.results.append(meta)

    def rect(self, sel):
        return self.page.evaluate("""(sel) => {
          const d = document.querySelector(sel);
          if (!d) return null;
          const r = d.getBoundingClientRect();
          return {x: Math.round(r.left + scrollX), y: Math.round(r.top + scrollY),
                  width: Math.round(r.width), height: Math.round(r.height)};
        }""", sel)

    def fit_drawer(self, sel):
        """按抽屉内容高度设置视口，返回精确裁剪框。"""
        m = self.page.evaluate("""(sel) => {
          const d = document.querySelector(sel);
          if (!d) return null;
          const header = d.querySelector('.el-drawer__header');
          const body = d.querySelector('.el-drawer__body');
          const footer = d.querySelector('.el-drawer__footer');
          const hh = header ? header.getBoundingClientRect().height : 0;
          const fh = footer ? footer.getBoundingClientRect().height : 0;
          let bh = body ? body.scrollHeight : 0;
          if (body && body.children.length) {
            const bt = body.getBoundingClientRect().top;
            bh = Math.max(0, Math.max(...[...body.children].map(k => k.getBoundingClientRect().bottom)) - bt);
          }
          return {hh: Math.ceil(hh), fh: Math.ceil(fh), bh: Math.ceil(bh)};
        }""", sel)
        need = m["hh"] + m["bh"] + m["fh"] + 16
        self.set_viewport(W, need)
        self.page.wait_for_timeout(800)
        self.dismiss_floating()
        return self.rect(sel)


# ----------------------------------------------------------------- 配方

def recipe_model_source(s: Shotter):
    """模型及AI服务 > 设置 > 模型源"""
    list_url = BASE + "/modelone/model-source"
    edit_url = BASE + "/modelone/model-source/1/edit"

    s.set_viewport(W, H_LIST)
    s.goto(list_url, s.t["create"])
    s.save("model-source-list-public", mode="page", post="page")

    clip = s.page.evaluate("""(ph) => {
      const inp = document.querySelector(`input[placeholder^="${ph}"]`);
      let el = inp;
      for (let i = 0; i < 8 && el; i++) {
        const cls = (el.className || '').toString();
        if (cls.includes('rounded-lg') && cls.includes('border')) break;
        el = el.parentElement;
      }
      const r = el.getBoundingClientRect();
      return {x: Math.round(r.left + scrollX) - 12, y: Math.round(r.top + scrollY) - 12,
              width: Math.round(r.width) + 24, height: Math.round(r.height) + 24};
    }""", s.t["search"])
    s.save("model-source-filter-public", mode="clip", clip=clip)

    s.set_viewport(W, H_PAGE)
    s.page.locator("button", has_text=s.t["create"]).first.click()
    s.page.locator(".el-dialog").first.wait_for(state="visible")
    s.page.wait_for_timeout(800)
    s.dismiss_floating()
    s.save("model-source-add-public", mode="element", selector=".el-dialog")
    s.page.locator(".el-dialog button", has_text=s.t["cancel"]).first.click()
    s.page.wait_for_timeout(600)

    s.goto(edit_url, s.t["add_endpoint"])
    s.save("model-source-edit-public", mode="page", post="page")

    s.page.locator("button", has_text=s.t["add_endpoint"]).first.click()
    s.page.locator(".model-source-endpoint-editor-drawer").first.wait_for(state="visible")
    s.page.wait_for_timeout(1000)
    s.dismiss_floating()
    box = s.fit_drawer(".model-source-endpoint-editor-drawer")
    s.save("model-source-add-endpoint-public", mode="clip", clip=box)
    s.page.locator(".model-source-endpoint-editor-drawer button",
                   has_text=s.t["cancel"]).first.click()
    s.page.wait_for_timeout(600)

    s.set_viewport(W, H_PAGE)
    s.goto(list_url, s.t["details"])
    s.page.locator(".main-box button", has_text=s.t["details"]).first.click()
    s.page.locator(".model-source-inspect-drawer").first.wait_for(state="visible")
    s.page.wait_for_timeout(1000)
    s.dismiss_floating()
    box = s.fit_drawer(".model-source-inspect-drawer")
    s.save("model-source-details-public", mode="clip", clip=box)


def recipe_members(s: Shotter):
    """Settings > Members & Roles > Members（弹框只截弹框）"""
    label = "Add Member" if s.lang == "en" else "添加成员"
    s.set_viewport(W, H_PAGE)
    s.goto(BASE + "/user/user-space/team-members", expect=label)

    s.page.locator("button", has_text=label).first.click()
    s.page.locator(".el-dialog").first.wait_for(state="visible")
    s.page.wait_for_timeout(900)
    # 元素截图：只拍弹框本体，遮罩与整页背景天然不会进入画面。
    # 宽度守卫会拦住"命中的是遮罩层"这类误用。
    s.save("add-member", mode="element", selector=".el-dialog")

    s.page.keyboard.press("Escape")
    s.page.wait_for_timeout(500)


RECIPES = {
    "model-source": recipe_model_source,
    "members": recipe_members,
}


# ----------------------------------------------------------------- 子命令

def cmd_login(args):
    from playwright.sync_api import sync_playwright

    with sync_playwright() as pw:
        browser = pw.chromium.launch(channel="msedge", headless=True,
                                     args=["--disable-blink-features=AutomationControlled"])
        ctx = browser.new_context(viewport={"width": W, "height": H_PAGE},
                                  device_scale_factor=DPR, ignore_https_errors=True)
        page = ctx.new_page()
        page.set_default_timeout(args.timeout * 1000)
        page.goto(args.url, wait_until="domcontentloaded")
        page.wait_for_timeout(1500)
        if args.user:
            page.locator("input[type=text], input:not([type])").first.fill(args.user)
            page.locator("input[type=password]").first.fill(args.password)
            page.locator("button:has-text('登录'), button[type=submit]").first.click()
            log("已提交登录表单")
        page.locator(args.until).first.wait_for(state="visible")
        state = Path(args.state)
        state.parent.mkdir(parents=True, exist_ok=True)
        ctx.storage_state(path=str(state))
        log(f"登录态已保存：{state}")
        browser.close()


def cmd_shoot(args):
    global BASE
    from playwright.sync_api import sync_playwright

    if not args.base_url:
        sys.exit("错误：必须用 --base-url 指定目标环境地址（各人环境不同，工具不预设）")
    BASE = args.base_url.rstrip("/")
    log(f"使用环境：{BASE}")

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as pw:
        browser = pw.chromium.launch(channel="msedge", headless=True,
                                     args=["--disable-blink-features=AutomationControlled"])
        ctx = browser.new_context(viewport={"width": W, "height": H_PAGE},
                                  device_scale_factor=DPR,
                                  locale="zh-CN" if args.lang == "zh" else "en-US",
                                  storage_state=args.state, ignore_https_errors=True)
        page = ctx.new_page()
        page.set_default_timeout(45000)
        shotter = Shotter(page, args.lang, out)
        RECIPES[args.recipe](shotter)
        bad = [r["file"] for r in shotter.results if not r["check"]["ok"]]
        (out / "_run.json").write_text(
            json.dumps(shotter.results, ensure_ascii=False, indent=2), encoding="utf-8")
        browser.close()

    if bad:
        print("CHECK FAILED:", ", ".join(bad), flush=True)
        sys.exit(2)
    print("all shots OK", flush=True)


def cmd_capture(args):
    """通用单图抓取：支持指定页面与元素选择器直接抓取弹框、抽屉或整页，无需硬编码配方。"""
    global BASE
    from playwright.sync_api import sync_playwright

    if args.base_url:
        BASE = args.base_url.rstrip("/")
        log(f"使用环境：{BASE}")
    elif not args.url.startswith("http"):
        sys.exit("错误：相对路径需要配合 --base-url 使用（各人环境不同，工具不预设）")

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as pw:
        browser = pw.chromium.launch(channel="msedge", headless=True,
                                     args=["--disable-blink-features=AutomationControlled"])
        ctx = browser.new_context(viewport={"width": W, "height": args.viewport_h},
                                  device_scale_factor=DPR,
                                  locale="zh-CN" if args.lang == "zh" else "en-US",
                                  storage_state=args.state, ignore_https_errors=True)
        page = ctx.new_page()
        page.set_default_timeout(args.timeout * 1000)
        shotter = Shotter(page, args.lang, out)

        url = args.url if args.url.startswith("http") else (BASE + args.url)
        shotter.goto(url, expect=args.expect)

        if args.click:
            page.locator(args.click).first.click()
            page.wait_for_timeout(args.wait_after_click)
            shotter.dismiss_floating()

        if args.wait:
            page.locator(args.wait).first.wait_for(state="visible", timeout=args.timeout * 1000)
            page.wait_for_timeout(400)

        if args.mode == "page":
            shotter.save(args.name, mode="page", post="page")
        elif args.mode == "element":
            if not args.selector:
                raise ValueError("mode=element 需要指定 --selector")
            page.locator(args.selector).first.wait_for(state="visible", timeout=args.timeout * 1000)
            page.wait_for_timeout(300)
            shotter.save(args.name, mode="element", selector=args.selector)
        elif args.mode == "drawer":
            if not args.selector:
                raise ValueError("mode=drawer 需要指定 --selector")
            page.locator(args.selector).first.wait_for(state="visible", timeout=args.timeout * 1000)
            box = shotter.fit_drawer(args.selector)
            shotter.save(args.name, mode="clip", clip=box)
        elif args.mode == "clip":
            if not args.selector:
                raise ValueError("mode=clip 需要指定 --selector 用于计算边界")
            box = shotter.rect(args.selector)
            shotter.save(args.name, mode="clip", clip=box)

        browser.close()
    log(f"单图抓取完成：{out / (args.name + '.png')}")


def cmd_audit(args):
    """构图规范体检：扫描指定目录下所有文档配图，发现弹框误用整页、顶部削平、缺少透明圆角等问题。"""
    import statistics
    target_dir = Path(args.dir)
    if not target_dir.exists():
        print(f"目标目录不存在: {target_dir}")
        sys.exit(1)

    print(f"[render-shot audit] 开始扫描目录: {target_dir} 下所有 PNG 图片...")
    images = [p for p in target_dir.rglob("*.png") if ".vitepress" not in str(p)]
    total = len(images)
    print(f"共发现 {total} 张图片，正在逐一检查构图规范...")

    issues = {
        "cut_top": [],
        "dialog_fullpage": [],
        "missing_rounded": [],
    }

    dialog_keywords = ["add-", "create-", "edit-", "dialog", "modal", "adjust-", "request-", "new-"]

    for p in images:
        try:
            im = Image.open(p)
        except Exception:
            continue

        w, h = im.size
        name = p.stem.lower()

        # 1. 检查是否为弹框全屏截图 (宽度 1920 但文件名带有弹框动作)
        if w == 1920 and any(k in name for k in dialog_keywords) and not name.endswith("-list") and not name.endswith("overview"):
            issues["dialog_fullpage"].append((p, w, h, "弹框/创建页面疑似误用 1920 整页截图，包含灰底遮罩"))

        # 2. 检查 1920 宽度截图的首行是否被削平
        if w == 1920 and h <= 855:
            g = im.convert("L")
            px = g.load()
            row = [px[x, 0] for x in range(0, w, 4)]
            med = statistics.median(row)
            big = sum(1 for v in row if abs(v - med) > 25) / len(row)
            if big > 0.03:
                issues["cut_top"].append((p, w, h, f"首行包含 {big*100:.1f}% 异常内容像素，疑似裁顶超量 (h={h})"))

        # 3. 检查非 1920 局部图是否缺失透明圆角 (针对弹框)
        if w < 1920 and any(k in name for k in dialog_keywords):
            if im.mode != "RGBA":
                issues["missing_rounded"].append((p, w, h, f"弹框元素截图非 RGBA 模式 ({im.mode})，无法支持透明圆角"))
            else:
                a = im.split()[-1]
                corner_alpha = [a.getpixel(xy) for xy in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]
                if any(v > 50 for v in corner_alpha):
                    issues["missing_rounded"].append((p, w, h, f"弹框四角未完全透明 (alpha={corner_alpha})，可能存在直角灰色残留"))

    print("\n========== 构图规范体检报告 ==========")
    print(f"扫描有效图片: {total} 张")
    print(f"1. 弹框误用整页截图 (DIALOG_FULLPAGE): {len(issues['dialog_fullpage'])} 张")
    print(f"2. 首行疑似多裁削平 (CUT_TOP):         {len(issues['cut_top'])} 张")
    print(f"3. 弹框四角缺少透明圆角 (NOT_ROUNDED): {len(issues['missing_rounded'])} 张")

    if issues["dialog_fullpage"]:
        print("\n--- 弹框误用整页截图清单 (前 15 项) ---")
        for p, w, h, reason in issues["dialog_fullpage"][:15]:
            print(f"  {p} ({w}x{h}) -> {reason}")

    if issues["cut_top"]:
        print("\n--- 首行疑似多裁削平清单 (前 15 项) ---")
        for p, w, h, reason in issues["cut_top"][:15]:
            print(f"  {p} ({w}x{h}) -> {reason}")

    if issues["missing_rounded"]:
        print("\n--- 弹框四角缺少透明圆角清单 ---")
        for p, w, h, reason in issues["missing_rounded"][:15]:
            print(f"  {p} ({w}x{h}) -> {reason}")

    total_problems = len(issues["dialog_fullpage"]) + len(issues["cut_top"]) + len(issues["missing_rounded"])
    print(f"\n审计完成，共发现 {total_problems} 处构图优化项。")


def main():
    ap = argparse.ArgumentParser(description="文档配图渲染截图工具")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p_login = sub.add_parser("login", help="登录并保存登录态")
    p_login.add_argument("--url", required=True)
    p_login.add_argument("--user", default="")
    p_login.add_argument("--password", default="")
    p_login.add_argument("--until", required=True, help="登录成功后可见的 CSS 选择器")
    p_login.add_argument("--state", required=True)
    p_login.add_argument("--timeout", type=int, default=60)
    p_login.set_defaults(func=cmd_login)

    p_shoot = sub.add_parser("shoot", help="按配方批量渲染截图")
    p_shoot.add_argument("--recipe", required=True, choices=sorted(RECIPES))
    p_shoot.add_argument("--lang", required=True, choices=["zh", "en"])
    p_shoot.add_argument("--base-url", default="", help="目标环境地址（必填，各人环境不同，工具不预设）")
    p_shoot.add_argument("--state", required=True)
    p_shoot.add_argument("--out", required=True)
    p_shoot.set_defaults(func=cmd_shoot)

    p_cap = sub.add_parser("capture", help="通用单图抓取（弹框/抽屉/整页）")
    p_cap.add_argument("--url", required=True, help="页面相对或绝对地址")
    p_cap.add_argument("--base-url", default="", help="目标环境地址（相对路径时必填，各人环境不同，工具不预设）")
    p_cap.add_argument("--name", required=True, help="保存的文件名（无需 .png）")
    p_cap.add_argument("--mode", required=True, choices=["element", "drawer", "page", "clip"],
                       help="抓取模式：element=弹框/单卡片(自动透明圆角), drawer=抽屉(自适应高度), page=整页(实测裁顶)")
    p_cap.add_argument("--selector", default=".el-dialog", help="目标元素选择器 (element/drawer/clip 模式必填)")
    p_cap.add_argument("--click", default="", help="截图前先点击的按钮选择器 (如打开弹框)")
    p_cap.add_argument("--wait", default="", help="截图前等待出现的元素选择器")
    p_cap.add_argument("--wait-after-click", type=int, default=800, help="点击后等待毫秒数")
    p_cap.add_argument("--expect", default="", help="页面加载后期望包含的文本")
    p_cap.add_argument("--lang", required=True, choices=["zh", "en"], help="界面语言")
    p_cap.add_argument("--state", required=True, help="登录态 storage_state JSON 路径")
    p_cap.add_argument("--out", required=True, help="输出目录")
    p_cap.add_argument("--viewport-h", type=int, default=H_PAGE, help="视口高度 (默认 1080)")
    p_cap.add_argument("--timeout", type=int, default=45, help="超时秒数")
    p_cap.set_defaults(func=cmd_capture)

    p_audit = sub.add_parser("audit", help="扫描文档目录体检图片构图规范")
    p_audit.add_argument("--dir", default="docs", help="待扫描目录，默认 docs")
    p_audit.set_defaults(func=cmd_audit)

    args = ap.parse_args()
    args.func(args)



if __name__ == "__main__":
    main()
