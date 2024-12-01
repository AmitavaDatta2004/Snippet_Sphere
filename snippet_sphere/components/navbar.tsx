'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { Code2, Search, List, Menu, X } from 'lucide-react'

const routes = [
  {
    href: '/snippets',
    label: 'Code Snippets',
    icon: Code2,
  },
  {
    href: '/search',
    label: 'Search',
    icon: Search,
  },
  {
    href: '/list',
    label: 'All Programs',
    icon: List,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md"
        : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
          <Code2 className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            Code Showcase
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors relative group',
                  pathname === route.href && 'text-primary font-semibold'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{route.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary hover:text-primary/80 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors',
                    pathname === route.href && 'text-primary font-semibold'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{route.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

