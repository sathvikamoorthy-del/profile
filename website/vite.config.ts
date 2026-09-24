import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

function resolveBasePath(): string {
  const { basePath } = JSON.parse(
    fs.readFileSync(path.resolve(import.meta.dirname, 'src/data/site.config.json'), 'utf-8'),
  ) as { basePath: string }
  
  if (basePath && basePath !== "/") {
    return basePath
  }

  const repository = process.env.GITHUB_REPOSITORY
  if (repository) {
    const [owner, repo] = repository.split('/')
    const isUserOrOrgPage = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`
    return isUserOrOrgPage ? '/' : `/${repo}/`
  }

  return basePath
}

// Fix for virtual:dev-routes missing in production build
const devRoutesFix = {
  name: 'fix-virtual-dev-routes',
  resolveId(id: string) {
    if (id === 'virtual:dev-routes') return id
    return null
  },
  load(id: string) {
    if (id === 'virtual:dev-routes') {
      return `export const devRoutes = []; export default [];`
    }
    return null
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devRoutesFix],
  base: resolveBasePath(),
})