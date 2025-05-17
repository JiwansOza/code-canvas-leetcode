import { Problem } from '@/components/ProblemCard';

// Mock data for featured problems on the home page
export const mockFeaturedProblems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    slug: "two-sum"
  },
  {
    id: 53,
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    slug: "maximum-subarray"
  },
  {
    id: 146,
    title: "LRU Cache",
    difficulty: "Medium",
    tags: ["Hash Table", "Linked List", "Design"],
    slug: "lru-cache"
  },
  {
    id: 42,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    slug: "trapping-rain-water"
  },
  {
    id: 121,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    tags: ["Array", "Dynamic Programming"],
    slug: "best-time-to-buy-and-sell-stock"
  },
  {
    id: 200,
    title: "Number of Islands",
    difficulty: "Medium",
    tags: ["Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
    slug: "number-of-islands"
  }
];

// Mock data for all problems
export const mockProblems: Problem[] = [
  ...mockFeaturedProblems,
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    slug: "longest-substring-without-repeating-characters"
  },
  {
    id: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    slug: "valid-parentheses"
  },
  {
    id: 23,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    tags: ["Linked List", "Divide and Conquer", "Heap", "Merge Sort"],
    slug: "merge-k-sorted-lists"
  },
  {
    id: 49,
    title: "Group Anagrams",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sorting"],
    slug: "group-anagrams"
  },
  {
    id: 56,
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    slug: "merge-intervals"
  },
  {
    id: 70,
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    slug: "climbing-stairs"
  },
  {
    id: 98,
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"],
    slug: "validate-binary-search-tree"
  },
  {
    id: 101,
    title: "Symmetric Tree",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    slug: "symmetric-tree"
  },
  {
    id: 104,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    slug: "maximum-depth-of-binary-tree"
  },
  {
    id: 128,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "Union Find"],
    slug: "longest-consecutive-sequence"
  },
  {
    id: 141,
    title: "Linked List Cycle",
    difficulty: "Easy",
    tags: ["Hash Table", "Linked List", "Two Pointers"],
    slug: "linked-list-cycle"
  },
  {
    id: 198,
    title: "House Robber",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming"],
    slug: "house-robber"
  },
  {
    id: 207,
    title: "Course Schedule",
    difficulty: "Medium",
    tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
    slug: "course-schedule"
  },
  {
    id: 208,
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Design", "Trie"],
    slug: "implement-trie-prefix-tree"
  },
  {
    id: 215,
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Sorting", "Heap", "Quickselect"],
    slug: "kth-largest-element-in-an-array"
  },
  {
    id: 238,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    tags: ["Array", "Prefix Sum"],
    slug: "product-of-array-except-self"
  },
  {
    id: 242,
    title: "Valid Anagram",
    difficulty: "Easy",
    tags: ["Hash Table", "String", "Sorting"],
    slug: "valid-anagram"
  },
  {
    id: 295,
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    tags: ["Two Pointers", "Data Stream", "Sorting", "Heap", "Design"],
    slug: "find-median-from-data-stream"
  },
  {
    id: 297,
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    tags: ["String", "Tree", "Depth-First Search", "Breadth-First Search", "Design", "Binary Tree"],
    slug: "serialize-and-deserialize-binary-tree"
  },
  {
    id: 300,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    tags: ["Array", "Binary Search", "Dynamic Programming"],
    slug: "longest-increasing-subsequence"
  }
];

// Mock data for detailed problem view
export const mockProblemDetails = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
                <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the <em>same</em> element twice.</p>
                <p>You can return the answer in any order.</p>
                
                <p><strong>Example 1:</strong></p>
                <pre>
<strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                </pre>
                
                <p><strong>Example 2:</strong></p>
                <pre>
<strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]
                </pre>
                
                <p><strong>Example 3:</strong></p>
                <pre>
<strong>Input:</strong> nums = [3,3], target = 6
<strong>Output:</strong> [0,1]
                </pre>
                
                <p><strong>Constraints:</strong></p>
                <ul>
                  <li><code>2 <= nums.length <= 10<sup>4</sup></code></li>
                  <li><code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code></li>
                  <li><code>-10<sup>9</sup> <= target <= 10<sup>9</sup></code></li>
                  <li><strong>Only one valid answer exists.</strong></li>
                </ul>`,
  tags: ["Array", "Hash Table"],
  solutions: {
    python: `class Solution:
  def twoSum(self, nums: List[int], target: int) -> List[int]:
    # Create a hash map to store values and their indices
    num_map = {}
    
    # Iterate through the array
    for i, num in enumerate(nums):
      # Calculate the complement needed
      complement = target - num
      
      # If complement exists in the map, we found the solution
      if complement in num_map:
        return [num_map[complement], i]
      
      # Otherwise, add current number to the map
      num_map[num] = i
    
    # No solution found (problem states there is always a solution)
    return []`,
    
    java: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    // Create a hash map to store values and their indices
    Map<Integer, Integer> numMap = new HashMap<>();
    
    // Iterate through the array
    for (int i = 0; i < nums.length; i++) {
      // Calculate the complement needed
      int complement = target - nums[i];
      
      // If complement exists in the map, we found the solution
      if (numMap.containsKey(complement)) {
        return new int[] {numMap.get(complement), i};
      }
      
      // Otherwise, add current number to the map
      numMap.put(nums[i], i);
    }
    
    // No solution found (problem states there is always a solution)
    return new int[0];
  }
}`,
    
    cpp: `class Solution {
public:
  vector<int> twoSum(vector<int>& nums, int target) {
    // Create a hash map to store values and their indices
    unordered_map<int, int> numMap;
    
    // Iterate through the array
    for (int i = 0; i < nums.size(); i++) {
      // Calculate the complement needed
      int complement = target - nums[i];
      
      // If complement exists in the map, we found the solution
      if (numMap.find(complement) != numMap.end()) {
        return {numMap[complement], i};
      }
      
      // Otherwise, add current number to the map
      numMap[nums[i]] = i;
    }
    
    // No solution found (problem states there is always a solution)
    return {};
  }
};`
  },
  explanation: `<p>This problem asks us to find two numbers in an array that sum to a target value.</p>
                <h3>Approach:</h3>
                <p>The most efficient approach is to use a hash map (dictionary in Python):</p>
                <ol>
                  <li>Create a hash map to store numbers we've seen so far and their indices.</li>
                  <li>For each number in the array:
                    <ul>
                      <li>Calculate the complement (target - current number)</li>
                      <li>Check if the complement exists in our hash map</li>
                      <li>If it does, we've found our solution</li>
                      <li>If not, add the current number and its index to the hash map</li>
                    </ul>
                  </li>
                </ol>
                
                <h3>Time and Space Complexity:</h3>
                <ul>
                  <li><strong>Time Complexity:</strong> O(n) where n is the length of the array. We only need to traverse the array once.</li>
                  <li><strong>Space Complexity:</strong> O(n) for storing the hash map in the worst case.</li>
                </ul>
                
                <h3>Why this approach works:</h3>
                <p>This one-pass hash table approach works because for any pair of numbers (a, b) that sum to the target, 
                if we've already seen a when we're at b, we can immediately return the result. If not, we store a and continue.</p>
                <p>The hash map allows us to check for the complement in O(1) time, making this solution very efficient.</p>`
};
