import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Plugin } from 'vite'

const VIRTUAL_MODULE_ID = 'virtual:blog-posts'
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`
const BLOG_DIR = 'content/blog'

interface RawBlogPost {
  slug: string
  data: Record<string, unknown>
  content: string
}

function readPosts(root: string): RawBlogPost[] {
  const blogDir = path.resolve(root, BLOG_DIR)
  if (!fs.existsSync(blogDir)) return []

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8')
      const { data, content } = matter(raw)
      return { slug: file.replace(/\.md$/, ''), data, content }
    })
}

/**
 * Parses content/blog/*.md frontmatter + body entirely at build/dev time
 * (Node, via gray-matter) into a virtual module of plain JS objects — so
 * gray-matter and its YAML parser never ship in the client bundle (they
 * pulled in Node's Buffer + a direct `eval` call, per requirements.md's
 * "parsed at build time" for ST-022).
 */
export function blogPosts(): Plugin {
  let projectRoot = process.cwd()

  return {
    name: 'blog-posts',
    configResolved(config) {
      projectRoot = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return
      const posts = readPosts(projectRoot)
      return `export default ${JSON.stringify(posts)}`
    },
    configureServer(server) {
      const blogDir = path.resolve(projectRoot, BLOG_DIR)
      server.watcher.add(blogDir)
      server.watcher.on('all', (_event, file) => {
        if (file.startsWith(blogDir)) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
          if (mod) server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}
