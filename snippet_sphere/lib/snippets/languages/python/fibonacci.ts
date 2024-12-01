import { type CodeSnippet } from '../../types';

export const fibonacciPython: CodeSnippet = {
  id: 'fibonacci-python',
  title: 'Fibonacci Sequence',
  description: 'Generate Fibonacci sequence using Python',
  language: 'python',
  code: `def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n numbers."""
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

def main():
    n = 10
    result = fibonacci(n)
    print(f"First {n} Fibonacci numbers: {result}")

if __name__ == "__main__":
    main()`,
  tags: ['math', 'beginner', 'tutorial', 'example'],
  author: {
    name: 'Amitava Datta',
    github: 'https://github.com/AmitavaDatta2004',
  },
};