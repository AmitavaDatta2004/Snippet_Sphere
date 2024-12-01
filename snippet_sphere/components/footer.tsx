import { Github, Linkedin, Heart } from 'lucide-react'
import Link from 'next/link'

const contributors = [
  {
    name: 'Amitava Datta',
    github: 'https://github.com/amitavadatta',
    linkedin: 'https://www.linkedin.com/in/amitava-datta-301920292/',
  },
  {
    name: 'Pranay De',
    github: 'https://github.com/PRANAY130',
    linkedin: 'https://www.linkedin.com/in/amitava-datta-301920292/',
  },
]

export function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-purple-900 dark:via-pink-900 dark:to-red-900">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 place-items-center max-w-2xl mx-auto">
            {contributors.map((contributor) => (
              <div
                key={contributor.name}
                className="flex flex-col items-center space-y-2 p-6 rounded-2xl bg-white/10 backdrop-blur-md dark:bg-gray-800/30 shadow-lg hover:shadow-xl transition-all duration-300 group text-center transform hover:scale-105 w-full"
              >
                <h3 className="text-xl font-bold text-white group-hover:animate-pulse">
                  {contributor.name}
                </h3>
                <div className="flex space-x-4 mt-4">
                  <Link
                    href={contributor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-300 dark:hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
                  >
                    <Github className="h-6 w-6" />
                  </Link>
                  <Link
                    href={contributor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300 dark:hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg text-white dark:text-gray-200 mb-4 animate-bounce">
            Made with{' '}
            <Heart className="inline-block h-6 w-6 text-red-300 animate-pulse" />{' '}
            by the Snippet Sphere team
          </p>
          <p className="text-md text-white dark:text-gray-200">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-semibold">
              Contribute to this project on{' '}
            </span>
            <Link
              href="https://github.com/AmitavaDatta2004/Snippet_Sphere"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-300 dark:hover:text-yellow-400 transition-colors duration-300 font-bold"
            >
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

