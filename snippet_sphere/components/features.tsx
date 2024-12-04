'use client'

import { useState } from 'react'
import { Search, Copy, Github, Code2, ChevronRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

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

const MotionLink = motion(Link)

export function Features() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden py-16 sm:py-24"
    >
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(76, 29, 149, 0.1) 0%, rgba(76, 29, 149, 0) 50%)',
            'radial-gradient(circle at 80% 80%, rgba(76, 29, 149, 0.1) 0%, rgba(76, 29, 149, 0) 50%)',
            'radial-gradient(circle at 20% 20%, rgba(76, 29, 149, 0.1) 0%, rgba(76, 29, 149, 0) 50%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 z-0"
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500"
        >
          Innovative Features
        </motion.h2>
        <motion.div 
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isExpanded = expandedFeature === index
            return (
              <motion.div
                key={feature.title}
                layout
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                className={`group relative overflow-hidden rounded-2xl border bg-card/50 p-6 ${
                  isExpanded ? 'sm:col-span-2 lg:col-span-4 p-8' : ''
                } backdrop-blur-sm transition-all duration-300 hover:bg-card/80 hover:shadow-xl cursor-pointer`}
                onClick={() => setExpandedFeature(isExpanded ? null : index)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`}
                  initial={{ opacity: 0.2 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="relative z-10"
                  layout
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`mb-6 inline-block rounded-xl bg-gradient-to-br ${feature.gradient} p-3 text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </motion.div>
                  <motion.h3 
                    layout="position"
                    className="mb-3 text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
                  >
                    {feature.title}
                  </motion.h3>
                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.p 
                          className="text-sm text-muted-foreground mb-4"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.details}
                        </motion.p>
                        <motion.div 
                          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1
                              }
                            }
                          }}
                        >
                          {Object.entries(feature.stats).map(([key, value]) => (
                            <motion.div
                              key={key}
                              variants={{
                                hidden: { scale: 0.8, opacity: 0 },
                                visible: { scale: 1, opacity: 1 }
                              }}
                              transition={{ duration: 0.3 }}
                              className="bg-background/50 p-2 rounded-lg text-center"
                            >
                              <div className="text-lg font-semibold text-primary">{value}</div>
                              <div className="text-xs text-muted-foreground capitalize">{key}</div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-muted-foreground"
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {feature.link && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4"
                    >
                      <MotionLink
                        href={feature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-md shadow-md hover:shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Explore on GitHub</span>
                        <Github className="ml-2 h-4 w-4" />
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </MotionLink>
                    </motion.div>
                  )}
                </motion.div>
                <motion.div
                  className="absolute bottom-2 right-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

