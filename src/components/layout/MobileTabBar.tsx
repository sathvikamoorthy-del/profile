import { NavLink } from 'react-router-dom'
import { siteConfig } from '@/lib/content/site-config'
import { getPrimaryNavItems, CUSTOMIZE_NAV_ITEM } from '@/lib/navigation'
import { cn } from '@/lib/utils'

/**
 * Fixed bottom tab bar (ST-038) — the mobile nav pattern chosen over a
 * hamburger drawer (questionnaire D3). Replaces the header's nav below the
 * `sm` breakpoint; hidden at `sm` and above where the header nav takes over.
 */
export function MobileTabBar() {
  const navItems = getPrimaryNavItems()
  const items = siteConfig.showCustomizeGuide ? [...navItems, CUSTOMIZE_NAV_ITEM] : navItems

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background/95 backdrop-blur sm:hidden"
    >
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 py-2 text-xs transition-colors',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )
          }
        >
          <item.icon className="size-5" aria-hidden="true" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
