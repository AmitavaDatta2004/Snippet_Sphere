import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const contributors = [
    {
      name: 'Amitava Datta',
      github: 'https://github.com/amitavadatta',
      linkedin: 'https://linkedin.com/in/amitavadatta',
    },
    {
      name: 'Pranay De',
      github: 'https://github.com/pranayde',
      linkedin: 'https://linkedin.com/in/pranayde',
    },
  ];

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {contributors.map((contributor) => (
            <div
              key={contributor.name}
              className="flex flex-col items-center space-y-2"
            >
              <h3 className="text-lg font-semibold">{contributor.name}</h3>
              <div className="flex space-x-4">
                <Link
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href={contributor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Contribute to this project on{' '}
            <Link
              href="https://github.com/amitavadatta/code-showcase"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}