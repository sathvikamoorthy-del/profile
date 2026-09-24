import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function resolveBasePath(): string {
  const configPath = path.resolve(__dirname, 'src/data/site.config.json')
  const { basePath } = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as { basePath: string }
  
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

export default defineConfig({
  plugins: [react()],
  base: resolveBasePath(),
})