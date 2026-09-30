import { hobbies } from '@/lib/content/hobbies'
import { DynamicIcon } from '@/lib/icons'

/** Hobbies section (ST-053) — icon + short blurb per hobby. */
export function Hobbies() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-foreground">Hobbies</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {hobbies.map((hobby) => (
          <div key={hobby.id} className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
              <DynamicIcon name={hobby.icon} className="size-6 text-secondary-foreground" />
            </div>
            <h3 className="font-heading font-medium text-foreground">{hobby.title}</h3>
            <p className="text-sm text-muted-foreground">{hobby.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
