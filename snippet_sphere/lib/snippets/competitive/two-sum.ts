import { type CodeSnippet } from '../types';

export const twoSum: CodeSnippet = {
  id: 'two-sum',
  title: 'Two Sum Problem',
  description: 'Efficient solution for the classic Two Sum problem',
  language: 'java',
  code: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        throw new IllegalArgumentException("No solution found");
    }
}`,
  tags: ['array', 'leetcode', 'interview', 'beginner'],
  author: {
    name: 'Pranay De',
    github: 'https://github.com/pranayde',
  },
};