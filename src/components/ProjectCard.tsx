import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { withBase } from '@/lib/base-path'
import type { Project } from '@/lib/content/projects'

/**
 * A project card (ST-050, ST-051). Only the title links to the project
 * detail page (ST-050) — repo/live links are separate sibling anchors, not
 * nested inside that link, since nested interactive elements are invalid
 * HTML and break keyboard/screen-reader navigation.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden">
      {project.imageUrl && (
        <img
          src={withBase(project.imageUrl)}
          alt=""
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
      )}
      <CardHeader>
        <CardTitle>
          <Link to={`/projects/${project.id}`} className="hover:underline">
            {project.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      {(project.repoUrl || project.liveUrl) && (
        <CardFooter className="flex gap-2 border-t-0 bg-transparent p-0 px-6 pb-6">
          {project.repoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="secondary" size="sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live
              </a>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
