import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

/**
 * Copies the built index.html to 404.html (ST-063) — the standard GitHub
 * Pages SPA trick, since Pages serves 404.html for any unmatched path and
 * this lets the client-side router take over from there. Distinct from the
 * in-app Not Found page (ST-099), which handles routes that mount but don't
 * match any <Route>.
 */
export function spaFallback404(): Plugin {
  let outDir = 'dist'

  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const indexPath = path.resolve(outDir, 'index.html')
      const fallbackPath = path.resolve(outDir, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath)
      }
    },
  }
}
