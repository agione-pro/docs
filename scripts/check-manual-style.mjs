#!/usr/bin/env node

/**
 * check-manual-style.mjs
 *
 * 用户手册「内容样式基线」（USER_MANUAL_PAGE_STRUCTURE_GUIDE.md §10）的机械门禁。
 *
 *   node scripts/check-manual-style.mjs                  # 汇总输出；新增违规(error)>0 时退出码 1
 *   node scripts/check-manual-style.mjs --all            # 打印每一条违规
 *   node scripts/check-manual-style.mjs --json           # 机器可读输出
 *   node scripts/check-manual-style.mjs --rule S03       # 只看某条规则
 *   node scripts/check-manual-style.mjs --dump-baseline  # 打印当前各规则违规数（JSON，供收紧快照）
 *   node scripts/check-manual-style.mjs --update-baseline # 直接写快照（部分沙箱下可能 EPERM，改用 --dump-baseline）
 *
 * 基线机制（§10.9）：
 *   - 每条违规生成稳定指纹 sha1(rule|lang|rel|msg) 前 16 位。
 *   - scripts/manual-style-baseline.json 保存存量指纹集合。
 *   - 指纹已在集合 → warn（存量台账，不阻断，可分批迁移）；
 *     指纹不在集合 → error（本次新增，必须修复，退出码 1）。
 *   因此「修好一项，指纹消失；新写坏一项，立刻 FAIL」，且修旧与添新
 *   不能互相抵消。存量迁移完成后用 --update-baseline 收紧快照。
 *
 * 判定口径全部来自 §10，改规则请同步改本脚本，避免规范与工具脱节。
 * 纯只读：除 --update-baseline 写快照 JSON 外，不修改任何文件。
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS = path.resolve(__dirname, '..', 'docs')
const ROOTS = {
  en: path.join(DOCS, 'usermanual'),
  zh: path.join(DOCS, 'zh-CN', 'usermanual'),
}
const BASELINE_FILE = path.join(__dirname, 'manual-style-baseline.json')

/** 导航/总览页：豁免十节骨架，但必须中英标题对应（§10.3）。 */
const HUB_PAGES = new Set(['index.md', 'settings/index.md'])

/** §10.3 十节骨架：名称逐字固定、顺序固定。 */
const SECTIONS = {
  zh: ['功能概述', '前提条件', '页面说明', '主要操作', '参数速查表', '踩坑提示', '结果校验', '常见问题', '注意事项', '后续操作'],
  en: ['Feature Overview', 'Prerequisites', 'Page Description', 'Main Operations', 'Parameter Quick Reference', 'Pitfalls', 'Result Validation', 'FAQ', 'Notes', 'Next Steps'],
}
const SECTION_ALIASES = {
  en: { 'Parameter Reference': 'Parameter Quick Reference' },
  zh: {},
}

/** §10.6 三张标准表的唯一表头。 */
const HEADERS = {
  zh: {
    param: '| 字段名称 | 是否必填 | 字段类型 | 示例 | 说明 |',
    result: '| 检查项 | 成功表现 | 异常时处理 |',
    terms: '| 术语 | 说明 |',
  },
  en: {
    param: '| Field Name | Required | Field Type | Example | Description |',
    result: '| Check Item | Success Signal | If Abnormal |',
    terms: '| Term | Description |',
  },
}
const HEADER_ALIASES = {
  zh: {
    '字段名称': ['字段名称', '字段或控件', '配置项'],
    '是否必填': ['是否必填', '必填'],
    '字段类型': ['字段类型', '类型', '控件形态'],
    '示例': ['示例', '画面示例'],
    '说明': ['说明', '含义'],
  },
  en: {
    'Field Name': ['Field Name', 'Field'],
    'Required': ['Required'],
    'Field Type': ['Field Type', 'Field type'],
    'Example': ['Example'],
    'Description': ['Description'],
  },
}

/** §10.4 功能概述下唯一允许的两个四级块，及其历史别名。 */
const H4_CANONICAL = {
  zh: ['新手理解', '术语速查'],
  en: ['Beginner Explanation', 'Terms Quick Reference'],
}
const H4_ALIASES = {
  zh: { '术语速查': ['术语表'] },
  en: {
    'Terms Quick Reference': ['Terms', 'Terminology'],
    'Beginner Explanation': ['First-Time User Notes', 'Beginner Checklist', 'Beginner Quick Choice'],
  },
}
/** §10.4 旧四件套与杂项块：禁止新增，存量登记台账后分批迁移。 */
const H4_DEPRECATED = {
  zh: ['小白先看', '推荐操作顺序', '适用场景', '操作步骤', '结果校验', '注意事项', '页面区域'],
  en: ['Recommended Operation Order', 'Recommended Operation Sequence', 'Applicable Scenarios', 'Steps', 'Result Validation', 'Notes', 'Page Areas', 'Procedure', 'Pre-Operation Check'],
}

/** §10.7 FAQ 三段式标签词表。 */
const FAQ_MARKERS = {
  zh: ['问题现象', '可能原因', '处理方式'],
  en: ['Symptom', 'Possible Causes', 'Resolution'],
}
const FAQ_MARKER_ALIASES = {
  zh: {},
  en: {
    'Possible Causes': ['Possible causes', 'Possible cause'],
    'Resolution': ['Solution', 'How to Handle', 'How to handle', 'Handling', 'How to check'],
  },
}

/** §10.8 图注前缀与禁用模板句。 */
const CAPTION_PREFIX = {
  zh: { canonical: '图示为', banned: ['上图展示', '下图展示'] },
  en: { canonical: 'The figure shows', banned: ['The image shows', 'The page shows', 'The screenshot shows'] },
}
const CAPTION_TEMPLATES = [
  '重点核对目标对象、当前状态、字段和操作入口',
  '重点核对页面标题、目标记录和可见操作',
  'The image shows the page entry or current state for this operation',
  'The figure shows the page entry or current state for this operation',
  'Verify the page title, target record, and visible actions',
]
const INTERNAL_WORDING = ['源文档截图', '已脱敏', '列表数据已遮挡']

/** §10.2 头部引用块：最多一个，且只允许两类规范句式。 */
const HEAD_NOTE_PATTERNS = {
  zh: [
    /^>\s*本页面在系统左侧菜单中显示为【/,
    /^>\s*当前运营管理员账号的左侧菜单未显示本页入口/,
  ],
  en: [
    /^>\s*This page is labeled .+ in the left menu/,
    /^>\s*The current Operator account does not show this page in the left menu/,
  ],
}

const RULE_DESC = {
  S01: '页面头部 H1 唯一且位于首行',
  S02: '禁止头部 > 引用说明行',
  S03: '十节骨架：名称逐字固定、齐全、顺序固定',
  S04: '导航页豁免与中英标题对应',
  S05: '四级小节词表：功能概述只允许两个标准块',
  S06: '表格表头：参数速查表 / 结果校验表 / 术语速查表',
  S07: 'FAQ 三段式：加粗标签词表与三段齐全',
  S08: '图注：唯一前缀、禁用模板句、去重',
  S09: '禁止容器与面向内部维护的描述',
  S10: '图片：引用有效、中英成对、命名、孤儿图',
  S11: '文档信息卡片：::: info 文档信息 必备且格式固定',
}

const argv = process.argv.slice(2)
const showAll = argv.includes('--all')
const asJson = argv.includes('--json')
const updateBaseline = argv.includes('--update-baseline')
const dumpBaseline = argv.includes('--dump-baseline')
const onlyRule = (() => { const i = argv.indexOf('--rule'); return i >= 0 ? argv[i + 1] : null })()

const baselineRaw = (() => {
  try {
    if (!fs.existsSync(BASELINE_FILE)) return null
    const text = fs.readFileSync(BASELINE_FILE, 'utf8').trim()
    return text ? JSON.parse(text) : null
  } catch {
    return null
  }
})()
const baseline = new Set(
  baselineRaw?.keys || baselineRaw?.fingerprints || []
)

const findings = []
function add(rule, lang, rel, line, msg) {
  if (onlyRule && rule !== onlyRule) return
  findings.push({ rule, lang, rel, line, msg })
}
/** 违规指纹：不含行号，避免正文增删导致基线频繁失效。 */
function fingerprint(f) {
  return crypto.createHash('sha1').update(`${f.rule}|${f.lang}|${f.rel}|${f.msg}`).digest('hex').slice(0, 16)
}

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })
}
function relOf(root, file) { return path.relative(root, file).split(path.sep).join('/') }
function splitKey(k) {
  const i = k.indexOf(':')
  return [k.slice(0, i), k.slice(i + 1)]
}
function normHeader(line) { return line.trim().replace(/\s+/g, ' ') }
function headerCells(line) { return normHeader(line).replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim()) }
function isSeparator(line) { return /^\|[\s:\-|]+\|\s*$/.test(line.trim()) }
function isHeaderAt(lines, i) { return /^\|/.test(lines[i].trim()) && i + 1 < lines.length && isSeparator(lines[i + 1]) }
function mapHeaderCells(cells, lang, shape) {
  const aliases = HEADER_ALIASES[lang]
  const keys = Object.keys(aliases)
  const canonical = HEADERS[lang][shape]
  if (cells.length !== headerCells(canonical).length) return null
  return cells.every((c, i) => aliases[keys[i]].includes(c)) ? canonical : null
}

const imageRefsByLang = { en: new Set(), zh: new Set() }
const imageFilesByLang = { en: [], zh: [] }
const pageImageSets = {}
const hubSections = {}

for (const lang of ['zh', 'en']) {
  const root = ROOTS[lang]
  const mdFiles = walk(root).filter((f) => f.endsWith('.md'))
  imageFilesByLang[lang] = walk(root).filter((f) => /\.(png|svg|jpe?g)$/i.test(f)).map((f) => relOf(root, f))

  for (const file of mdFiles) {
    const rel = relOf(root, file)
    const isHub = HUB_PAGES.has(rel)
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
    const secNames = SECTIONS[lang]
    const h2 = [], h4 = []
    let section = null
    const sectionAt = {}

    for (let i = 0; i < lines.length; i++) {
      const m2 = /^##\s+(.+?)\s*$/.exec(lines[i])
      if (m2) { section = m2[1].trim(); h2.push({ name: section, line: i + 1 }); sectionAt[i] = section; continue }
      const m4 = /^####\s+(.+?)\s*$/.exec(lines[i])
      if (m4) h4.push({ name: m4[1].trim(), line: i + 1, section })
      sectionAt[i] = section
    }

    // S01
    const h1 = lines.map((l, i) => (/^#\s+\S/.test(l) ? i + 1 : -1)).filter((n) => n > 0)
    if (h1.length !== 1 || h1[0] !== 1) add('S01', lang, rel, h1[0] || 1, `H1 数量=${h1.length} 位置=${h1.join(',') || '无'}`)

    // S02: 禁止头部引用块（所有说明一律并入正文）
    for (let i = 1; i < Math.min(lines.length, 12); i++) {
      if (/^##\s+/.test(lines[i])) break
      if (/^>\s/.test(lines[i])) add('S02', lang, rel, i + 1, `禁止头部引用块说明行，冗余信息应删除或移入「页面说明」：${lines[i].trim().slice(0, 60)}`)
    }

    // S11: 文档信息容器卡片检查
    const infoHeader = lang === 'zh' ? '::: info 文档信息' : '::: info Document Information'
    const versionPrefix = lang === 'zh' ? '版本：' : 'Version: '
    const dateLinePrefix = lang === 'zh' ? '更新日期：' : 'Updated: '
    let infoStart = -1
    for (let i = 0; i < Math.min(lines.length, 20); i++) {
      if (lines[i].trim().startsWith(infoHeader)) { infoStart = i; break }
      if (/^##\s+/.test(lines[i])) break // 已经进入正文章节
    }
    if (infoStart < 0) {
      add('S11', lang, rel, 1, `缺少标准文档信息卡片「${infoHeader}」`)
    } else {
      const v = (lines[infoStart + 1] || '').trim()
      const d = (lines[infoStart + 2] || '').trim()
      const end = (lines[infoStart + 3] || '').trim()
      if (!v.startsWith(versionPrefix) || !/^v\d+\.\d+$/.test(v.slice(versionPrefix.length))) {
        add('S11', lang, rel, infoStart + 2, `文档信息版本格式错误，应为「${versionPrefix}v<大版本>.<小版本>」（如 v2.0），实际为「${v}」`)
      }
      if (!d.startsWith(dateLinePrefix) || !/^\d{4}-\d{2}-\d{2}$/.test(d.slice(dateLinePrefix.length))) {
        add('S11', lang, rel, infoStart + 3, `文档信息更新日期格式错误，应为「${dateLinePrefix}YYYY-MM-DD」，实际为「${d}」`)
      }
      if (end !== ':::') add('S11', lang, rel, infoStart + 4, `文档信息未按规范以「:::」闭合`)
    }

    // S03 / S04
    if (!isHub) {
      const names = h2.map((x) => x.name)
      for (const u of names.filter((n) => !secNames.includes(n))) {
        const a = SECTION_ALIASES[lang][u]
        add('S03', lang, rel, h2.find((x) => x.name === u).line, `章节名「${u}」不在词表${a ? `，应改为「${a}」` : ''}`)
      }
      const missing = secNames.filter((n) => !names.includes(n))
      if (missing.length) add('S03', lang, rel, 1, `缺少章节：${missing.join(' / ')}`)
      let last = -1
      for (const n of secNames) {
        const idx = names.indexOf(n)
        if (idx >= 0) { if (idx < last) add('S03', lang, rel, 1, `章节顺序错乱：${n}`); last = idx }
      }
      if (h2.length !== secNames.length) add('S03', lang, rel, 1, `二级章节数量=${h2.length}，应为 ${secNames.length}`)
    } else {
      hubSections[`${lang}:${rel}`] = h2.map((x) => x.name)
    }

    // S05
    for (const h of h4) {
      const alias = Object.entries(H4_ALIASES[lang]).find(([, al]) => al.includes(h.name))
      if (alias) add('S05', lang, rel, h.line, `四级标题「${h.name}」应改为「${alias[0]}」`)
      else if (h.section === secNames[0] && !H4_CANONICAL[lang].includes(h.name)) {
        add('S05', lang, rel, h.line, `功能概述下不允许自定义四级块「${h.name}」（§10.4 台账项）`)
      } else if (H4_DEPRECATED[lang].includes(h.name)) {
        add('S05', lang, rel, h.line, `废弃四级块「${h.name}」（§10.4 台账项，旧四件套）`)
      }
    }
    for (const c of H4_CANONICAL[lang]) {
      const n = h4.filter((h) => h.name === c).length
      if (n > 1) add('S05', lang, rel, 1, `标准四级块「${c}」出现 ${n} 次`)
    }

    // S06
    for (let i = 0; i < lines.length; i++) {
      if (!isHeaderAt(lines, i)) continue
      const sec = sectionAt[i]
      let shape = null
      if (sec === secNames[4]) shape = 'param'
      else if (sec === secNames[6]) shape = 'result'
      else {
        for (let j = i - 1; j >= Math.max(0, i - 6); j--) {
          const m4 = /^####\s+(.+?)\s*$/.exec(lines[j])
          if (m4) { if (m4[1].trim() === H4_CANONICAL[lang][1]) shape = 'terms'; break }
          if (/^##\s+/.test(lines[j])) break
        }
      }
      if (!shape) continue
      const got = normHeader(lines[i]), want = HEADERS[lang][shape]
      if (got === want) continue
      const cells = headerCells(lines[i]), wantCells = headerCells(want)
      if (cells.length !== wantCells.length) add('S06', lang, rel, i + 1, `${shape} 表列数=${cells.length}，应为 ${wantCells.length}（§10.10 台账项）：${got}`)
      else if (mapHeaderCells(cells, lang, shape)) add('S06', lang, rel, i + 1, `${shape} 表表头拼写不符：${got}`)
      else add('S06', lang, rel, i + 1, `${shape} 表列义无法映射（§10.10 台账项）：${got}`)
    }

    // S07
    const markers = FAQ_MARKERS[lang]
    let faqStart = -1, faqEnd = lines.length
    for (let i = 0; i < lines.length; i++) {
      const m = /^##\s+(.+?)\s*$/.exec(lines[i])
      if (!m) continue
      if (m[1].trim() === secNames[7]) faqStart = i
      else if (faqStart >= 0 && faqEnd === lines.length) faqEnd = i
    }
    if (faqStart >= 0) {
      const aliasMap = FAQ_MARKER_ALIASES[lang]
      for (let i = faqStart; i < faqEnd; i++) {
        const m = /^\*\*(.+?)\s*[:：]\*\*/.exec(lines[i].trim())
        if (!m) continue
        const label = m[1].trim()
        if (markers.includes(label)) continue
        const target = Object.entries(aliasMap).find(([, al]) => al.includes(label))
        add(target ? 'S07' : 'S07', lang, rel, i + 1, target ? `FAQ 标签「${label}」应改为「${target[0]}」` : `FAQ 非标准标签「${label}」`)
      }
      const blocks = []
      for (let i = faqStart; i < faqEnd; i++) if (/^####\s+/.test(lines[i])) blocks.push(i)
      for (let b = 0; b < blocks.length; b++) {
        const e = b + 1 < blocks.length ? blocks[b + 1] : faqEnd
        const body = lines.slice(blocks[b], e).join('\n')
        const miss = markers.filter((m) => !new RegExp(`\\*\\*${m}\\s*[:：]\\*\\*`).test(body))
        if (miss.length) add('S07', lang, rel, blocks[b] + 1, `FAQ 缺段：${miss.join(' / ')}（§10.10 台账项，无证据则删段不补写）`)
      }
    }

    // S08
    const cap = CAPTION_PREFIX[lang]
    const refCounts = new Map(), refs = []
    for (let i = 0; i < lines.length; i++) {
      const im = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
      let m
      while ((m = im.exec(lines[i]))) { refCounts.set(m[1], (refCounts.get(m[1]) || 0) + 1); refs.push({ line: i + 1, target: m[1] }) }
    }
    for (const [p, c] of refCounts) if (c > 1) add('S08', lang, rel, 1, `图片引用重复 ${c} 次：${p}`)
    for (const r of refs) {
      let nx = ''
      for (let j = r.line; j < Math.min(r.line + 3, lines.length); j++) {
        if (lines[j].trim() !== '') { nx = lines[j].trim(); break }
      }
      if (!nx) { add('S08', lang, rel, r.line, `图后无图注（§10.10 台账项）：${r.target}`); continue }
      const banned = cap.banned.find((p) => nx.startsWith(p))
      if (banned) add('S08', lang, rel, r.line, `图注前缀「${banned}」应改为「${cap.canonical}」并具体化（§10.10 台账项）`)
      else if (!nx.startsWith(cap.canonical)) add('S08', lang, rel, r.line, `图注缺失或非规范句式（§10.10 台账项）：${nx.slice(0, 40)}`)
      for (const tpl of CAPTION_TEMPLATES) {
        if (nx.includes(tpl)) { add('S08', lang, rel, r.line, `图注为禁用模板占位句（§10.10 台账项）：${tpl.slice(0, 24)}`); break }
      }
    }

    // S09
    for (let i = 0; i < lines.length; i++) {
      if (/^:::\s*details\b/.test(lines[i].trim())) add('S09', lang, rel, i + 1, '禁止 ::: details 折叠块堆图')
      for (const w of INTERNAL_WORDING) {
        if (lines[i].includes(w)) add('S09', lang, rel, i + 1, `出现面向内部维护的描述「${w}」（§10.10 台账项）`)
      }
    }

    // S10
    const base = path.dirname(file)
    for (const r of refs) {
      const abs = path.resolve(base, r.target.replace(/^\.\//, ''))
      if (!fs.existsSync(abs)) add('S10', lang, rel, r.line, `图片文件不存在：${r.target}`)
      imageRefsByLang[lang].add(relOf(root, abs))
    }
    pageImageSets[`${lang}:${rel}`] = refs.map((r) => path.basename(r.target)).sort()
  }
}

// 中英成对 / 孤儿图 / 命名
for (const [key, names] of Object.entries(pageImageSets)) {
  const [l, rel] = splitKey(key)
  if (l !== 'en') continue
  const zhNames = pageImageSets[`zh:${rel}`]
  if (!zhNames) { add('S10', 'en', rel, 1, '缺少中文对应页'); continue }
  if (JSON.stringify(names) !== JSON.stringify(zhNames)) {
    const onlyEn = names.filter((n) => !zhNames.includes(n))
    const onlyZh = zhNames.filter((n) => !names.includes(n))
    add('S10', 'en', rel, 1, `中英配图文件名不一致：en独有=${onlyEn.join(',') || '无'} zh独有=${onlyZh.join(',') || '无'}`)
  }
}
for (const [k, v] of Object.entries(hubSections)) {
  const [lang, rel] = splitKey(k)
  const other = hubSections[`${lang === 'zh' ? 'en' : 'zh'}:${rel}`]
  if (!other) { add('S04', lang, rel, 1, '导航页缺少另一语言对应页'); continue }
  if (v.length !== other.length) add('S04', lang, rel, 1, `导航页中英标题数量不等：${v.length} vs ${other.length}`)
}
for (const lang of ['zh', 'en']) {
  const root = ROOTS[lang], allRefs = imageRefsByLang[lang]
  for (const f of imageFilesByLang[lang]) {
    if (!allRefs.has(f)) add('S10', lang, f, 0, '孤儿图（§10.10 台账项，无引用）')
    if (/(^|\/)(manual-|[^/]*-public\.(png|svg|jpe?g)$)/.test(f)) add('S10', lang, f, 0, '旧式图片命名（§10.8 台账项）')
  }
}

// ---- 基线判定（违规指纹集合）----
const counts = {}
for (const f of findings) counts[f.rule] = (counts[f.rule] || 0) + 1

if (updateBaseline || dumpBaseline) {
  const fps = [...new Set(findings.map(fingerprint))].sort()
  const payload = JSON.stringify({
    note: 'USER_MANUAL_PAGE_STRUCTURE_GUIDE.md §10.10 存量迁移台账（违规指纹集合）；收紧时重跑 --update-baseline',
    generatedBy: 'node scripts/check-manual-style.mjs --update-baseline',
    total: fps.length,
    counts,
    keys: fps,
  }, null, 2) + '\n'
  if (dumpBaseline) process.stdout.write(payload)
  else {
    try {
      fs.writeFileSync(BASELINE_FILE, payload)
      console.log(`已写入存量台账：${fps.length} 条指纹 → ${path.relative(path.resolve(__dirname, '..'), BASELINE_FILE)}`)
    } catch (e) {
      console.error(`写入失败（${e.code}）；部分沙箱禁止创建新文件，请改用：`)
      console.error('  node scripts/check-manual-style.mjs --dump-baseline > manual-style-baseline.json')
      process.exitCode = 1
    }
  }
  process.exitCode = process.exitCode || 0
} else {
  for (const f of findings) f.severity = baseline.has(fingerprint(f)) ? 'warn' : 'error'
  const byRule = {}
  for (const f of findings) {
    const r = byRule[f.rule] ||= { error: 0, warn: 0, samples: [] }
    r[f.severity]++
    if (r.samples.length < (showAll ? Infinity : 5)) r.samples.push(`${f.severity.toUpperCase()} ${f.lang}/${f.rel}${f.line ? ':' + f.line : ''} ${f.msg}`)
  }
  const totalError = findings.filter((f) => f.severity === 'error').length
  const totalWarn = findings.filter((f) => f.severity === 'warn').length

  if (asJson) console.log(JSON.stringify({ totalError, totalWarn, counts, baselineSize: baseline.size, byRule, findings }, null, 2))
  else {
    console.log(`\n用户手册内容样式门禁 —— 规则 USER_MANUAL_PAGE_STRUCTURE_GUIDE.md §10`)
    console.log(`扫描：zh ${imageFilesByLang.zh.length} 图 / en ${imageFilesByLang.en.length} 图；error(新增)=${totalError} warn(存量台账)=${totalWarn}\n`)
    for (const rule of Object.keys(RULE_DESC).sort()) {
      const r = byRule[rule]
      const now = counts[rule] || 0
      const snap = baseline.size
      if (!r) { console.log(`  ${rule} OK  ${RULE_DESC[rule]}`); continue }
      console.log(`  ${rule} now=${now} baselineTotal=${snap} error=${r.error} warn=${r.warn}  ${RULE_DESC[rule]}`)
      for (const s of r.samples) console.log(`      ${s}`)
      if (!showAll && r.error + r.warn > r.samples.length) console.log(`      ... 另有 ${r.error + r.warn - r.samples.length} 条，--all 查看全部`)
    }
    console.log(`\n结论：${totalError === 0 ? 'PASS（无新增违规）' : `FAIL（新增违规 ${totalError} 条）`}；存量台账 ${totalWarn} 条按 §10.10 分批迁移。\n`)
  }
  process.exitCode = totalError > 0 ? 1 : 0
}
