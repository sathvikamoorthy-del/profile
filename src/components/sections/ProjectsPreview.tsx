import { Link } from 'react-router-dom'
import { projects } from '@/lib/content/projects'
import { ProjectCard } from '@/components/ProjectCard'

/** Projects preview on the home page (ST-050) — first 3, "View all" to /projects. */
export function ProjectsPreview() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Projects</h2>
        <Link to="/projects" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
