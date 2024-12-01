import { type CodeSnippet } from '../../types';

export const linqExamples: CodeSnippet = {
  id: 'linq-examples-csharp',
  title: 'LINQ Query Examples',
  description: 'Common LINQ query patterns in C#',
  language: 'csharp',
  code: `public class LinqExamples
{
    public void DemonstrateLinq()
    {
        var numbers = Enumerable.Range(1, 100).ToList();
        var words = new[] { "hello", "world", "linq", "csharp" };

        // Filter and transform
        var evenSquares = numbers
            .Where(n => n % 2 == 0)
            .Select(n => n * n)
            .ToList();

        // Group by length
        var wordGroups = words
            .GroupBy(w => w.Length)
            .Select(g => new {
                Length = g.Key,
                Words = g.ToList()
            });

        // Aggregate operations
        var sum = numbers.Sum();
        var avg = numbers.Average();
        var max = numbers.Max();

        // Custom aggregation
        var customAggregate = words
            .Aggregate("", (current, next) => 
                current + (current.Length > 0 ? ", " : "") + next);
    }
}`,
  tags: ['utility', 'intermediate', 'data-manipulation'],
  author: {
    name: 'Pranay De',
    github: 'https://github.com/PRANAY130',
  },
};