import { type FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DynamicIcon } from '@/lib/icons'
import { personal } from '@/lib/content/personal'
import { socials } from '@/lib/content/socials'
import { siteConfig } from '@/lib/content/site-config'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Contact section (ST-057, ST-058, ST-059) — email/socials plus a
 * name/email/message form (no subject field) posted to the configured
 * Formspree endpoint, with distinct success/error feedback states.
 */
export function Contact() {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const contactForm = siteConfig.contactForm

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!contactForm) return

    // Captured before the `await` below — event.currentTarget is only valid
    // during synchronous event dispatch and becomes null after an async gap.
    const form = event.currentTarget
    setStatus('submitting')
    const formData = new FormData(form)

    try {
      const response = await fetch(contactForm.endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-16 text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Get in touch</h2>
        <a href={`mailto:${personal.email}`} className="text-primary hover:underline">
          {personal.email}
        </a>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <DynamicIcon name={social.icon} className="size-5" />
            </a>
          ))}
        </div>
      </div>

      {contactForm && (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className="rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </Button>
          {status === 'success' && (
            <p role="status" className="text-sm text-primary">
              Thanks — your message has been sent.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-sm text-destructive">
              Something went wrong. Please try again, or email me directly.
            </p>
          )}
        </form>
      )}
    </section>
  )
}
