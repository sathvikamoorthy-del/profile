import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './button'
import { Card, CardContent, CardTitle } from './card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './dialog'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './navigation-menu'

describe('shadcn/ui primitives (ST-004)', () => {
  it('renders Button', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders Card', () => {
    render(
      <Card>
        <CardTitle>Title</CardTitle>
        <CardContent>Body</CardContent>
      </Card>,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('renders Dialog trigger and content', () => {
    render(
      <Dialog open>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog heading</DialogTitle>
        </DialogContent>
      </Dialog>,
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.getByText('Dialog heading')).toBeInTheDocument()
  })

  it('renders NavigationMenu', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })
})
