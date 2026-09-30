import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useScrolled } from './useScrolled'

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', { value, configurable: true })
}

afterEach(() => {
  setScrollY(0)
})

describe('useScrolled (ST-036)', () => {
  it('is false when the page has not scrolled past the threshold', () => {
    setScrollY(0)
    const { result } = renderHook(() => useScrolled(24))
    expect(result.current).toBe(false)
  })

  it('becomes true after scrolling past the threshold', () => {
    setScrollY(0)
    const { result } = renderHook(() => useScrolled(24))

    setScrollY(100)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(true)
  })
})
