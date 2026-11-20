// Audit rendered routes, exact-case assets, and HTML fragments. No network requests.
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
const entity = s => s.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, x => {
  const names = {'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'}
  return names[x.toLowerCase()] ?? String.fromCodePoint(parseInt(x.slice(x[2].toLowerCase()==='x'?3:2,-1),x[2].toLowerCase()==='x'?16:10))
})
const clean = s => s.replace(/<!--[\s\S]*?-->/g,'').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'')
const attr = (tag, key) => {
  const m = tag.match(new RegExp('(?:^|\\s)'+key+'\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\')','i'))
  return m ? entity(m[1] ?? m[2]) : null
}
export async function auditDirectory(root, options = {}) {
  root = path.resolve(root)
  const files = new Map(), html = new Map(), ids = new Map(), broken = [], external = new Set()
  const ownHosts = new Set(options.ownHosts ?? ['docs.agione.cc','docs.agione.pro'])
  const base = '/' + (options.base ?? '/').replace(/^\/+|\/+$/g,'')
  const prefix = base === '/' ? '/' : base + '/'
  async function walk(dir) {
    for (const e of await fs.readdir(dir,{withFileTypes:true})) {
      const p = path.join(dir,e.name)
      if (e.isDirectory()) await walk(p)
      else if (e.isFile()) files.set(path.relative(root,p).split(path.sep).join('/'),p)
    }
  }
  await walk(root)
  for (const [rel,p] of files) if (rel.endsWith('.html')) {
    const s = clean(await fs.readFile(p,'utf8')); html.set(rel,s)
    const seen = new Set()
    for (const tag of s.matchAll(/<[a-z][^>]*>/gi)) { const id = attr(tag[0],'id'); if (id!==null) seen.add(id) }
    ids.set(rel,seen)
  }
  let checked = 0, fragments = 0, ignored = 0
  for (const [page,s] of html) {
    const pageURL = new URL(prefix+page,'https://docs-audit.invalid')
    for (const m of s.matchAll(/<(a|img|link)\b[^>]*>/gi)) {
      const kind=m[1].toLowerCase(), href=attr(m[0],kind==='img'?'src':'href')
      if (href===null || !href.trim() || /^(?:mailto:|tel:|javascript:|data:|blob:)/i.test(href)) {ignored++;continue}
      let u
      try {u=new URL(href,pageURL)} catch {broken.push({page,href,type:'invalid_url'});continue}
      if (u.protocol!=='https:' && u.protocol!=='http:') {ignored++;continue}
      if (u.origin!==pageURL.origin && !ownHosts.has(u.hostname)) {external.add(u.origin);continue}
      checked++
      let raw
      try {raw=decodeURIComponent(u.pathname)} catch {broken.push({page,href,type:'invalid_encoded_path'});continue}
      if (prefix!=='/' && !(raw===base || raw.startsWith(prefix))) {broken.push({page,href,type:'outside_configured_base'});continue}
      let rel=(prefix==='/'?raw.slice(1):raw.slice(base.length).replace(/^\//,''))
      rel=path.posix.normalize(rel || '.')
      if (rel==='..' || rel.startsWith('../')) {broken.push({page,href,type:'outside_build_root'});continue}
      if (rel==='.') rel=''
      const candidates=rel?[rel,rel+'.html',rel.replace(/\/$/,'')+'/index.html']:['index.html']
      const target=candidates.find(x=>files.has(x))
      if (!target) {broken.push({page,href,type:'missing_page_or_asset',candidates});continue}
      if (kind==='a' && u.hash && u.hash!=='#' && target.endsWith('.html')) {
        let fragment
        try {fragment=decodeURIComponent(u.hash.slice(1))} catch {broken.push({page,href,type:'invalid_encoded_fragment'});continue}
        if (fragment.startsWith(':~:text=')) {ignored++;continue}
        fragments++
        if (!ids.get(target)?.has(fragment)) broken.push({page,href,type:'missing_html_fragment',target,fragment})
      }
    }
  }
  return {passed:broken.length===0,html_pages:html.size,built_files:files.size,checked_internal_occurrences:checked,checked_fragment_occurrences:fragments,external_origins_unverified:[...external].sort(),ignored_occurrences:ignored,broken_links:broken.length,broken,network_requests:0,case_sensitive_lookup:true,base:prefix}
}
if (process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  const args=process.argv.slice(2), root=args[0]
  if (!root) throw new Error('Usage: node check-docs-links.mjs <built-dist> [--json <output>] [--base <prefix>]')
  const report=await auditDirectory(root,{base:args.includes('--base')?args[args.indexOf('--base')+1]:'/'})
  if (args.includes('--json')) await fs.writeFile(args[args.indexOf('--json')+1],JSON.stringify(report,null,2))
  console.log(JSON.stringify({...report,broken:report.broken.slice(0,20)},null,2))
  if (!report.passed) process.exitCode=1
}
