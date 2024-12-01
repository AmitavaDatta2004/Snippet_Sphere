import { Search, Copy, Github, Code2 } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Code2,
    title: 'Code Snippets',
    description: 'Browse through a collection of useful code snippets and programs.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Search,
    title: 'Elastic Search',
    description: 'Quickly find the code you need with powerful search functionality.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Copy,
    title: 'Easy Copy',
    description: 'Copy code snippets with a single click.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Github,
    title: 'Open Source',
    description: 'Contribute to the project and help it grow.',
    gradient: 'from-orange-500 to-red-500',
    link: 'https://github.com/amitavadatta/code-showcase',
  },
]

export function Features() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            const FeatureContent = (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-lg border bg-card/50 p-6 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg hover:scale-105`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 transition-opacity group-hover:opacity-20`} />
                <div
                  className={`mb-4 inline-block rounded-lg bg-gradient-to-br ${feature.gradient} p-3 text-white shadow-md`}
                >
                  <Icon className="h-6 w-6 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-primary">{feature.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {feature.description}
                </p>
              </div>
            )

            return feature.link ? (
              <Link
                key={feature.title}
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {FeatureContent}
              </Link>
            ) : (
              FeatureContent
            )
          })}
        </div>
      </div>
    </section>
  )
}

