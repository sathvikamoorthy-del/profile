import { skills } from '@/lib/content/skills'
import { ProficiencyBar } from '@/components/ProficiencyBar'

/** Skills section (ST-042) — categorized, with a proficiency bar per item. */
export function Skills() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-foreground">Skills</h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {skills.map((category) => (
          <div key={category.category} className="flex flex-col gap-3">
            <h3 className="font-heading text-lg font-medium text-foreground">
              {category.category}
            </h3>
            {category.items.map((item) => (
              <ProficiencyBar key={item.name} label={item.name} value={item.proficiency} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
