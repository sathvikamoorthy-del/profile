import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Wraps a page's content in a fade/slide transition. Respects
 * `prefers-reduced-motion` (ST-075) by rendering without animating when set.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
