#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import process from 'node:process'

const repoRoot = process.cwd()

const auditDirs = [
  path.join(repoRoot, 'docs/zh-CN/usermanual'),
  path.join(repoRoot, 'docs/usermanual'),
  path.join(repoRoot, 'docs/zh-CN/userguide'),
  path.join(repoRoot, 'docs/userguide'),
]

function parseArgs(argv) {
  const args = { warnOnly: false }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--warn-only') {
      args.warnOnly = true
    }
  }
  return args
}

const args = parseArgs(process.argv.slice(2))

function getMdFiles(dir) {
  let list = []
  if (!fs.existsSync(dir)) return list
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      list = list.concat(getMdFiles(full))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      list.push(full)
    }
  }
  return list
}

function getMd5(filePath) {
  try {
    const buf = fs.readFileSync(filePath)
    return crypto.createHash('md5').update(buf).digest('hex')
  } catch {
    return null
  }
}

const allFiles = auditDirs.flatMap(getMdFiles)

let errorCount = 0
let warningCount = 0

const imgRegex = /!\[(.*?)\]\((.*?)\)/g

console.log(`[check-docs-images] Auditing ${allFiles.length} documentation markdown files...`)

for (const filePath of allFiles) {
  const relPath = path.relative(repoRoot, filePath).replace(/\\/g, '/')
  const dir = path.dirname(filePath)
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')

  const images = []
  let match
  while ((match = imgRegex.exec(content)) !== null) {
    const alt = match[1]
    const rawSrc = match[2].trim().split(' ')[0]
    const absPath = path.resolve(dir, rawSrc)
    const exists = fs.existsSync(absPath)
    const hash = exists ? getMd5(absPath) : null

    // find line number
    const upToMatch = content.substring(0, match.index)
    const lineNum = upToMatch.split('\n').length

    images.push({
      alt,
      rawSrc,
      absPath,
      exists,
      hash,
      lineNum,
      index: match.index,
      raw: match[0],
    })
  }

  // Check 1: Details container with screenshots
  if (content.includes('::: details 补充截图') || content.includes('::: details Additional screenshot')) {
    console.error(`❌ [DETAILS_REDUNDANT_SCREENSHOT] ${relPath}: Contains redundant ::: details screenshot container.`)
    errorCount++
  }

  // Check 2: Known phantom wizard / tab keywords
  lines.forEach((line, idx) => {
    if (
      /在基础信息 Tab 中|在因子表单 Tab 中|在动态表达式 Tab 中|Basic Information tab|Factor Form tab|Dynamic Expression tab/i.test(
        line,
      )
    ) {
      console.error(
        `❌ [PHANTOM_WIZARD_STEP] ${relPath}:${idx + 1}: Invented tab/wizard step detected: "${line.trim()}"`,
      )
      errorCount++
    }
  })

  // Check 3: Duplicate path in same document
  const srcCount = {}
  images.forEach((img) => {
    srcCount[img.rawSrc] = (srcCount[img.rawSrc] || 0) + 1
  })
  for (const [src, count] of Object.entries(srcCount)) {
    if (count > 1) {
      console.error(`❌ [DUPLICATE_IMAGE_PATH] ${relPath}: Image "${src}" is referenced ${count} times in the same document.`)
      errorCount++
    }
  }

  // Check 4: Duplicate binary hash in same document (different filenames with identical content)
  const hashGroups = {}
  images.forEach((img) => {
    if (img.hash) {
      hashGroups[img.hash] = hashGroups[img.hash] || []
      hashGroups[img.hash].push(img)
    }
  })
  for (const [hash, group] of Object.entries(hashGroups)) {
    const uniqueSrcs = Array.from(new Set(group.map((g) => g.rawSrc)))
    if (uniqueSrcs.length > 1) {
      console.error(
        `❌ [IDENTICAL_IMAGE_CONTENT] ${relPath}: Multiple files have identical binary content (${hash}): ${uniqueSrcs.join(', ')}`,
      )
      errorCount++
    }
  }

  // Check 5: Stacked / consecutive screenshots with minimal text or boilerplate
  for (let i = 0; i < images.length - 1; i++) {
    const end1 = images[i].index + images[i].raw.length
    const start2 = images[i + 1].index
    const textBetween = content.substring(end1, start2).trim()

    const isDirectlyAdjacent = textBetween.length === 0
    const isBoilerplate =
      /上图展示.*?重点核对|The image shows.*?Verify the target object|::: details/s.test(textBetween)

    if (isDirectlyAdjacent || (textBetween.length <= 160 && isBoilerplate)) {
      console.error(
        `❌ [STACKED_SCREENSHOTS] ${relPath}:${images[i].lineNum}: Consecutive stacked screenshots without substantive steps between "${images[i].rawSrc}" and "${images[i + 1].rawSrc}".`,
      )
      errorCount++
    }
  }

  // Check 6: Leaked untranslated UI terms or obscure jargon in Chinese user manual
  if (relPath.startsWith('docs/zh-CN/usermanual/')) {
    lines.forEach((line, idx) => {
      if (
        /["“'](Consumption Details|View Resource Usage|More settings)["”']|\|[ ]*Resource Specification[ ]*\|/i.test(
          line,
        )
      ) {
        console.error(
          `❌ [UNTRANSLATED_UI_TERMS] ${relPath}:${idx + 1}: Untranslated English UI term detected in Chinese doc: "${line.trim()}"`,
        )
        errorCount++
      }

      if (/保持相同范围下钻|下钻异常消费/.test(line)) {
        console.error(
          `❌ [OBSCURE_JARGON] ${relPath}:${idx + 1}: Obscure jargon detected in Chinese doc: "${line.trim()}"`,
        )
        errorCount++
      }
    })
  }
}

console.log(`\n[check-docs-images] Audit complete: ${errorCount} errors, ${warningCount} warnings.`)

if (errorCount > 0) {
  if (args.warnOnly) {
    console.warn(`[check-docs-images] Warning mode active. Exiting with 0 despite ${errorCount} errors.`)
    process.exit(0)
  } else {
    process.exit(1)
  }
}
