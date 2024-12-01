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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-yellow-300 transition-colors">
          <Code2 className="h-8 w-8 animate-pulse" />
          <span className="hidden font-bold text-xl sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-yellow-400 dark:to-orange-500">
            Snippet Sphere
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-8 text-sm font-medium">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'flex items-center space-x-2 text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-yellow-300 transition-colors relative group',
                  pathname === route.href && 'text-purple-600 dark:text-yellow-300 font-semibold'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="tracking-wide">{route.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 dark:bg-yellow-300 transition-all group-hover:w-full"></span>
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-yellow-300 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-6 bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100 dark:from-purple-600 dark:via-pink-600 dark:to-blue-600">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'flex items-center space-x-2 text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-yellow-300 transition-colors',
                    pathname === route.href && 'text-purple-600 dark:text-yellow-300 font-semibold'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-lg">{route.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

