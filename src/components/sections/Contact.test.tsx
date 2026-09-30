import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { personal } from '@/lib/content/personal'
import { socials } from '@/lib/content/socials'
import { Contact } from './Contact'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Contact (ST-057, ST-058, ST-059)', () => {
  it('renders email and every social link', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: personal.email })).toHaveAttribute(
      'href',
      `mailto:${personal.email}`,
    )
    for (const social of socials) {
      expect(screen.getByRole('link', { name: social.platform })).toHaveAttribute(
        'href',
        social.url,
      )
    }
  })

  it('renders name, email, and message fields only (no subject)', () => {
    render(<Contact />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.queryByLabelText(/subject/i)).not.toBeInTheDocument()
  })

  it('shows a success message after a successful submission', async () => {
    const user = userEvent.setup()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) }))
    render(<Contact />)

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace')
    await user.type(screen.getByLabelText('Email'), 'ada@example.com')
    await user.type(screen.getByLabelText('Message'), 'Hello!')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByRole('status')).toHaveTextContent(/thanks/i)
  })

  it('shows an error message when the submission fails', async () => {
    const user = userEvent.setup()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    render(<Contact />)

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace')
    await user.type(screen.getByLabelText('Email'), 'ada@example.com')
    await user.type(screen.getByLabelText('Message'), 'Hello!')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/something went wrong/i)
  })
})
