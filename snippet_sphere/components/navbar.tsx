'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Code2, Search, List } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

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
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Code2 className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            Code Showcase
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'flex items-center space-x-2 text-muted-foreground hover:text-foreground',
                  pathname === route.href && 'text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}