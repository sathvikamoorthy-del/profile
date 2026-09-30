import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DynamicIcon } from './icons'

describe('DynamicIcon', () => {
  it('renders a known lucide icon by name', () => {
    const { container } = render(<DynamicIcon name="Globe" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('falls back to a generic icon for an unknown name instead of crashing', () => {
    const { container } = render(<DynamicIcon name="NotARealIconName" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
