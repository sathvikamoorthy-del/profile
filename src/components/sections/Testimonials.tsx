import { Card, CardContent } from '@/components/ui/card'
import { testimonials } from '@/lib/content/testimonials'
import { withBase } from '@/lib/base-path'

/** Testimonials section (ST-056) — static grid of cards, no carousel. */
export function Testimonials() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-foreground">Testimonials</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="flex flex-col gap-3 pt-6">
              <p className="text-sm text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img
                  src={withBase(testimonial.avatar)}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full"
                  loading="lazy"
                />
                <div className="text-xs">
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
