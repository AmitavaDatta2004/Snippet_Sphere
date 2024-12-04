'use client'

import { useState, useRef } from 'react'
import { Search, Copy, Github, Code2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

const features = [
  {
    icon: Code2,
    title: 'Code Snippets',
    description: 'Browse through a collection of useful code snippets and programs.',
    gradient: 'from-blue-500 to-cyan-500',
    details: 'Access a vast library of code snippets covering various programming languages and frameworks. Our collection includes everything from basic algorithms to complex design patterns. Each snippet is carefully curated, tested for quality, and optimized for efficiency. Whether you\'re a beginner looking to learn or an experienced developer seeking to save time, our snippets provide reliable, reusable code solutions for common programming challenges.',
    stats: { snippets: '10,000+', languages: '50+', categories: '100+', updates: 'Daily' }
  },
  {
    icon: Search,
    title: 'Elastic Search',
    description: 'Quickly find the code you need with powerful search functionality.',
    gradient: 'from-purple-500 to-pink-500',
    details: 'Our advanced search algorithm understands programming context, allowing you to find relevant code snippets faster than ever before. It uses natural language processing to interpret your queries, considers code structure and semantics, and even takes into account your past searches and preferences. With features like auto-complete, syntax highlighting in search results, and filters for language, complexity, and usage, you can pinpoint exactly what you need in seconds.',
    stats: { accuracy: '99%', speed: '<0.5s', customFilters: '20+', savedSearches: 'Unlimited' }
  },
  {
    icon: Copy,
    title: 'Easy Copy',
    description: 'Copy code snippets with a single click.',
    gradient: 'from-green-500 to-emerald-500',
    details: 'Seamlessly integrate snippets into your projects with our one-click copy feature. But it\'s more than just copying - our system intelligently formats the code to match your project\'s style guide, adjusts indentation, and even offers to rename variables to fit your naming conventions. The copied snippets come with optional comments explaining the code\'s functionality and usage. Plus, our clipboard history feature lets you access and re-copy your recently used snippets.',
    stats: { formats: '20+', integrations: '10+', styleGuides: '5+', clipboardHistory: '50 items' }
  },
  {
    icon: Github,
    title: 'Open Source',
    description: 'Contribute to the project and help it grow.',
    gradient: 'from-yellow-500 to-red-500',
    link: 'https://github.com/AmitavaDatta2004/Snippet_Sphere',
    details: 'Join our thriving community of developers. Contribute your own snippets, improve existing ones, and help shape the future of code sharing. Our open-source model ensures transparency, encourages collaboration, and drives continuous improvement. We have a robust system for snippet submissions, peer reviews, and version control. Regular hackathons, coding challenges, and community events keep the platform dynamic and engaging. Your contributions can earn you recognition, badges, and even opportunities for featured developer spotlights.',
    stats: { contributors: '500+', stars: '5000+', forks: '1000+', pullRequests: '200+/month' }
  },
]

export function Features() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
        <LayoutGroup>
          <motion.div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" layout>
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isExpanded = expandedFeature === index
              return (
                <motion.div
                  key={feature.title}
                  className={`group relative overflow-hidden rounded-2xl border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-card/80 hover:shadow-xl ${isExpanded ? 'sm:col-span-2 lg:col-span-2 cursor-default' : 'cursor-pointer'}`}
                  onClick={() => setExpandedFeature(isExpanded ? null : index)}
                  layout
                  transition={{
                    layout: { duration: 0.3, ease: "easeOut" },
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  whileHover={isExpanded ? {} : { scale: 1.05 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 transition-opacity duration-300 group-hover:opacity-40`}
                    layoutId={`gradient-${index}`}
                  />
                  <div className="h-full flex flex-col">
                    <motion.div
                      className={`mb-6 inline-block rounded-xl bg-gradient-to-br ${feature.gradient} p-3 text-white shadow-lg transition-all duration-300 group-hover:shadow-2xl`}
                      // whileHover={{ rotate: 12, scale: 1.1 }}
                      layout="position"
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>
                    <motion.h3 
                      className="mb-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
                      layout="position"
                    >
                      {feature.title}
                    </motion.h3>
                    <AnimatePresence mode="wait">
                      {isExpanded ? (
                        <motion.div
                          key="details"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
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
                          key="description"
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
                      <motion.div layout="position" className="mt-4">
                        <Link
                          href={feature.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-md transition-all duration-300 shadow-md hover:shadow-lg z-10 relative overflow-hidden group cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(feature.link, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                            Explore on GitHub
                          </span>
                          <Github className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.div
                            className="absolute right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronRight className="h-4 w-4 text-white" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}

