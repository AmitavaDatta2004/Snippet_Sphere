'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Copy, Github, Code2, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  {
    icon: Code2,
    title: 'Code Snippets',
    description: 'Browse through a collection of useful code snippets and programs.',
    gradient: 'from-blue-500 to-cyan-500',
    details: 'Access a vast library of code snippets covering various programming languages and frameworks. Each snippet is curated and tested for quality and efficiency.',
    stats: { snippets: '10,000+', languages: '50+' }
  },
  {
    icon: Search,
    title: 'Elastic Search',
    description: 'Quickly find the code you need with powerful search functionality.',
    gradient: 'from-purple-500 to-pink-500',
    details: 'Our advanced search algorithm understands programming context, allowing you to find relevant code snippets faster than ever before.',
    stats: { accuracy: '99%', speed: '<0.5s' }
  },
  {
    icon: Copy,
    title: 'Easy Copy',
    description: 'Copy code snippets with a single click.',
    gradient: 'from-green-500 to-emerald-500',
    details: 'Seamlessly integrate snippets into your projects with our one-click copy feature. Supports syntax highlighting for easy readability.',
    stats: { formats: '20+', integrations: '10+' }
  },
  {
    icon: Github,
    title: 'Open Source',
    description: 'Contribute to the project and help it grow.',
    gradient: 'from-yellow-500 to-red-500',
    link: 'https://github.com/amitavadatta/code-showcase',
    details: 'Join our community of developers. Contribute your own snippets, improve existing ones, and help shape the future of code sharing.',
    stats: { contributors: '500+', stars: '5000+' }
  },
]

export function Features() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedFeature(null)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/50" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.h2 
          className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Innovative Features
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isExpanded = expandedFeature === index
            const FeatureContent = (
              <motion.div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-card/80 hover:shadow-xl ${isExpanded ? 'col-span-2 row-span-2' : ''}`}
                layoutId={`feature-${index}`}
                onClick={() => setExpandedFeature(isExpanded ? null : index)}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 transition-opacity duration-300 group-hover:opacity-40`} />
                <motion.div
                  className={`mb-6 inline-block rounded-xl bg-gradient-to-br ${feature.gradient} p-3 text-white shadow-lg transition-all duration-300 group-hover:shadow-2xl`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                >
                  <Icon className="h-8 w-8" />
                </motion.div>
                <h3 className="mb-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                  {feature.title}
                </h3>
                <AnimatePresence>
                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-4">
                        {feature.details}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {Object.entries(feature.stats).map(([key, value]) => (
                          <div key={key} className="bg-background/50 p-2 rounded-lg text-center">
                            <div className="text-lg font-semibold text-primary">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p
                      className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {feature.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                {feature.link && (
                  <Link
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Explore on GitHub <Github className="ml-1 h-4 w-4" />
                  </Link>
                )}
                <AnimatePresence>
                  {!isExpanded && isHovering === index && (
                    <motion.div
                      className="absolute bottom-2 right-2 text-primary"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {isExpanded && (
                  <motion.button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedFeature(null)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                )}
              </motion.div>
            )

            return feature.link ? (
              <div key={feature.title} className={isExpanded ? 'col-span-2 row-span-2' : ''}>
                {FeatureContent}
              </div>
            ) : (
              FeatureContent
            )
          })}
        </div>
      </div>
    </section>
  )
}

