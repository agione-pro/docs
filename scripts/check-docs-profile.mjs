#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const knownTokens = new Set([
  'DOCS_API_ENDPOINT',
  'DOCS_APP_EXAMPLE',
  'DOCS_BRAND_PREFIX_EN',
  'DOCS_BRAND_PREFIX_ZH',
  'DOCS_CLOUD_PLATFORM_EN',
  'DOCS_CLOUD_PLATFORM_ZH',
  'DOCS_LOGIN_URL',
  'DOCS_MODEL_STORE_URL',
  'DOCS_OPENCODE_URL',
  'DOCS_PASSWORD',
  'DOCS_PLATFORM_URL',
  'DOCS_PRODUCT_NAME_EN',
  'DOCS_PRODUCT_NAME_ZH',
  'DOCS_PRODUCT_POSSESSIVE_EN',
  'DOCS_PRODUCT_POSSESSIVE_ZH',
  'DOCS_PROVIDER_EXAMPLE',
  'DOCS_SUPPORT_EMAIL',
  'DOCS_TEST_EMAIL',
])

function parseArgs(argv) {
  const args = { repo: process.cwd(), profile: 'private', scope: 'all' }
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index]
    if (value === '--repo') args.repo = path.resolve(argv[++index])
    else if (value === '--profile') args.profile = argv[++index]
    else if (value === '--scope') args.scope = argv[++index]
    else if (value === '--help' || value === '-h') {
      console.log('Usage: node check-docs-profile.mjs --repo <repo> --profile <public|private> --scope <source|dist|all>')
      process.exit(0)
    } else throw new Error(`Unknown argument: ${value}`)
  }
  if (!['public', 'private'].includes(args.profile)) throw new Error(`Unsupported profile: ${args.profile}`)
  if (!['source', 'dist', 'all'].includes(args.scope)) throw new Error(`Unsupported scope: ${args.scope}`)
  return args
}

function walk(directory) {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory() && ['cache', 'dist', '.temp'].includes(entry.name)) return []
    return entry.isDirectory() ? walk(absolute) : [absolute]
  })
}

function scanFiles(files, pattern) {
  const matches = []
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    for (const match of content.matchAll(pattern)) {
      matches.push({ file, value: match[0] })
    }
  }
  return matches
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const docsRoot = path.join(args.repo, 'docs')
  const errors = []

  if (args.scope !== 'dist') {
    const sourceFiles = walk(docsRoot).filter((file) => /\.(md|mdx|ts|vue|js|mjs)$/i.test(file))
    const tokenMatches = scanFiles(sourceFiles, /\{\{(DOCS_[A-Z0-9_]+)\}\}/g)
    const unknown = tokenMatches.filter(({ value }) => !knownTokens.has(value.slice(2, -2)))
    errors.push(...unknown.map(({ file, value }) => `Unknown documentation token ${value} in ${path.relative(args.repo, file)}`))

    if (args.profile === 'private') {
      const forbidden = scanFiles(sourceFiles, /AGIOne|OnePro|agione\.(?:cc|pro)|onepro\.cloud/gi)
      errors.push(...forbidden.map(({ file, value }) => `Private profile contains forbidden branding ${value} in ${path.relative(args.repo, file)}`))
    }
  }

  if (args.scope !== 'source') {
    const distRoot = path.join(args.repo, 'docs', '.vitepress', 'dist')
    if (!fs.existsSync(distRoot)) {
      errors.push(`Missing documentation build output ${path.relative(args.repo, distRoot)}`)
    } else {
      const distFiles = walk(distRoot).filter((file) => /\.(html|js|json)$/i.test(file))
      const unresolved = scanFiles(distFiles, /\{\{DOCS_[A-Z0-9_]+\}\}/g)
      errors.push(...unresolved.map(({ file, value }) => `Unresolved documentation token ${value} in ${path.relative(args.repo, file)}`))

      if (args.profile === 'private') {
        const forbiddenDist = scanFiles(distFiles, /AGIOne|OnePro|agione\.(?:cc|pro)|onepro\.cloud/gi)
        errors.push(...forbiddenDist.map(({ file, value }) => `Private build contains forbidden branding ${value} in ${path.relative(args.repo, file)}`))
      }
    }
  }

  if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
  }

  console.log(`Documentation profile check passed: ${args.profile} (${args.scope})`)
}

main()
