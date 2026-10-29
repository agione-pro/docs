#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""render-shot.py —— 文档配图渲染截图工具

配套规范：SCREENSHOT_GUIDE.md

子命令：
    login   登录一次并把登录态存到 --state
    shoot   按 recipe 渲染截图（含后处理与自检）

示例：
    python scripts/render-shot.py login \
      --url "http://test.metis.opr/modelone/model-source" \
      --user operator --until ".main-box" --state .auth/state.json

    python scripts/render-shot.py shoot \
      --recipe model-source --lang en --state .auth/state.json --out /tmp/shots/en

设计约定（详见 SCREENSHOT_GUIDE.md）：
    * 固定视口 1920 宽、deviceScaleFactor=2
    * 停动画/过渡/光标
    * 切换语言后必须清浮层
    * 抽屉按内容高度设置视口，并按 rect 精确裁剪
    * 后处理：裁顶部导航 -> 裁底部 -> 降采样到 1x
"""
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

from PIL import Image

BASE = "http://test.metis.opr"
W = 1920
H_PAGE = 1080
H_LIST = 1220
DPR = 2

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

def postprocess(path: Path, mode: str):
    """mode: page=整页(裁顶部导航+底部) / other=仅降采样"""
    im = Image.open(path).convert("RGB")
    if mode == "page":
        top = 0
        for y in range(0, 400):
            if row_avg(im, y, 0, im.width) > 200:
                top = y
                break
        bottom = im.height
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

    def save(self, name, mode="clip", clip=None, selector=None, post="other"):
        p = self.page
        path = self.out / f"{name}.png"
        if selector:
            p.locator(selector).first.screenshot(path=str(path), animations="disabled",
                                                 caret="hide", type="png")
        elif clip:
            p.screenshot(path=str(path), clip=clip, animations="disabled", caret="hide", type="png")
        else:
            p.screenshot(path=str(path), animations="disabled", caret="hide", type="png")
        size = postprocess(path, "page" if post == "page" else "other")
        info = verify(path)
        meta = {"file": path.name, "lang": self.lang, "url": p.url, "mode": mode,
                "viewport": [p.viewport_size["width"], p.viewport_size["height"]],
                "dpr": DPR, "ts": datetime.now().isoformat(timespec="seconds"),
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


RECIPES = {"model-source": recipe_model_source}


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
    from playwright.sync_api import sync_playwright

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


def main():
    ap = argparse.ArgumentParser(description="文档配图渲染截图")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p_login = sub.add_parser("login", help="登录并保存登录态")
    p_login.add_argument("--url", required=True)
    p_login.add_argument("--user", default="")
    p_login.add_argument("--password", default="")
    p_login.add_argument("--until", required=True, help="登录成功后可见的 CSS 选择器")
    p_login.add_argument("--state", required=True)
    p_login.add_argument("--timeout", type=int, default=60)
    p_login.set_defaults(func=cmd_login)

    p_shoot = sub.add_parser("shoot", help="按配方渲染截图")
    p_shoot.add_argument("--recipe", required=True, choices=sorted(RECIPES))
    p_shoot.add_argument("--lang", required=True, choices=["zh", "en"])
    p_shoot.add_argument("--state", required=True)
    p_shoot.add_argument("--out", required=True)
    p_shoot.set_defaults(func=cmd_shoot)

    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
