'use client'

import { useState } from 'react'
import { Search, Copy, Github, Code2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  {
    icon: Code2,
    title: 'Code Snippets',
    description: 'Browse through a collection of useful code snippets and programs.',
    gradient: 'from-blue-500 to-cyan-500',
    details: 'Access a vast library of code snippets covering various programming languages and frameworks. Our collection includes everything from basic algorithms to complex design patterns. Each snippet is carefully curated, tested for quality, and optimized for efficiency.',
    stats: { snippets: '10,000+', languages: '50+', categories: '100+', updates: 'Daily' }
  },
  {
    icon: Search,
    title: 'Elastic Search',
    description: 'Quickly find the code you need with powerful search functionality.',
    gradient: 'from-purple-500 to-pink-500',
    details: 'Our advanced search algorithm understands programming context, allowing you to find relevant code snippets faster than ever before. It uses natural language processing to interpret your queries, considers code structure and semantics, and even takes into account your past searches and preferences.',
    stats: { accuracy: '99%', speed: '<0.5s', customFilters: '20+', savedSearches: 'Unlimited' }
  },
  {
    icon: Copy,
    title: 'Easy Copy',
    description: 'Copy code snippets with a single click.',
    gradient: 'from-green-500 to-emerald-500',
    details: 'Seamlessly integrate snippets into your projects with our one-click copy feature. But it\'s more than just copying - our system intelligently formats the code to match your project\'s style guide, adjusts indentation, and even offers to rename variables to fit your naming conventions.',
    stats: { formats: '20+', integrations: '10+', styleGuides: '5+', clipboardHistory: '50 items' }
  },
  {
    icon: Github,
    title: 'Open Source',
    description: 'Contribute to the project and help it grow.',
    gradient: 'from-yellow-500 to-red-500',
    link: 'https://github.com/AmitavaDatta2004/Snippet_Sphere',
    details: 'Join our thriving community of developers. Contribute your own snippets, improve existing ones, and help shape the future of code sharing. Our open-source model ensures transparency, encourages collaboration, and drives continuous improvement.',
    stats: { contributors: '500+', stars: '5000+', forks: '1000+', pullRequests: '200+/month' }
  },
]

export function Features() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500">
          Innovative Features
        </h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isExpanded = expandedFeature === index
            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border bg-card/50 p-6 ${
                  isExpanded ? 'md:col-span-2 lg:col-span-4 p-8' : ''
                } backdrop-blur-sm transition-all duration-300 hover:bg-card/80 hover:shadow-xl`}
                onClick={() => setExpandedFeature(isExpanded ? null : index)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 transition-opacity duration-300 group-hover:opacity-30`}
                />
                <div className="relative z-10">
                  <div
                    className={`mb-6 inline-block rounded-xl bg-gradient-to-br ${feature.gradient} p-3 text-white shadow-lg`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                    {feature.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm text-muted-foreground mb-4">
                          {feature.details}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {Object.entries(feature.stats).map(([key, value]) => (
                            <div key={key} className="bg-background/50 p-2 rounded-lg text-center">
                              <div className="text-lg font-semibold text-primary">{value}</div>
                              <div className="text-xs text-muted-foreground capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    )}
                  </AnimatePresence>
                  {feature.link && (
                    <div className="mt-4">
                      <Link
                        href={feature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-md shadow-md hover:shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Explore on GitHub</span>
                        <Github className="ml-2 h-4 w-4" />
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

