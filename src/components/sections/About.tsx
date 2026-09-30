import ReactMarkdown from 'react-markdown'
import { personal } from '@/lib/content/personal'

/** About/Story section (ST-041) — renders personal.bio as Markdown. */
export function About() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-foreground">About</h2>
      <div className="flex flex-col gap-4 text-foreground [&_strong]:font-semibold">
        <ReactMarkdown>{personal.bio}</ReactMarkdown>
      </div>
    </section>
  )
}
