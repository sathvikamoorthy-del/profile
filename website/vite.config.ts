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