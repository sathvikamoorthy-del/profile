import { useEffect, useState } from 'react'

/** True once the page has scrolled past `threshold` px (for header shrink, ST-036). */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
