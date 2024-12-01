import { Github, Linkedin, Heart } from 'lucide-react'
import Link from 'next/link'

const contributors = [
  {
    name: 'Amitava Datta',
    github: 'https://github.com/amitavadatta',
    linkedin: 'https://linkedin.com/in/amitavadatta',
  },
  {
    name: 'Pranay De',
    github: 'https://github.com/PRANAY130',
    linkedin: 'https://linkedin.com/in/pranayde',
  },
]

export function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 place-items-center">
          {contributors.map((contributor) => (
            <div
              key={contributor.name}
              className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
            >
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent group-hover:animate-pulse">
                {contributor.name}
              </h3>
              <div className="flex space-x-4 mt-2">
                <Link
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href={contributor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Made with{' '}
            <Heart className="inline-block h-4 w-4 text-red-500 animate-pulse" />{' '}
            by the Code Showcase team
          </p>
          <p className="text-sm">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
              Contribute to this project on{' '}
            </span>
            <Link
              href="https://github.com/amitavadatta/code-showcase"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            >
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

