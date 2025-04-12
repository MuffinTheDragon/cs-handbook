import { CodeBlock } from "@/components/code-block";
import { HighlightedCode } from "@/components/highlight-code";
import { ItemList, ItemListItem } from "@/components/item-list";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PointerVisualizer } from "./walkthrough";

export default function Home() {
  return (
    <PageContainer>
      <H1 title="Two Pointers" subtitle="Two Pointers Pattern" />
      <p>
        The two pointers pattern is a common technique used in algorithms to
        efficiently traverse data structures, particularly arrays and linked
        lists. By using two pointers, you can usually solve the problem without
        using extra space.
      </p>
      <p>
        This pattern is particularly useful for solving problems that involve
        searching, sorting, or comparing elements within a data structure. The
        two pointers can move in various ways:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Away from each other (e.g., finding pairs that sum to a target)</li>
        <li>Toward the center (e.g., checking for palindromes)</li>
        <li>In the same direction (e.g., merging two sorted arrays)</li>
      </ul>
      <H2 title="Common Use Cases" />
      <p>Some common use cases or hints for when to use two pointers:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Finding two or more integers in a particular array</li>
        <li>Reversing a string / array or working with palindromes</li>
        <li>Removing duplicates in an array</li>
        <li>Working with linked lists (i.e. fast and slow)</li>
      </ul>
      <H2 title="Template" />
      <Tabs defaultValue="classic" className="w-full">
        <TabsList>
          <TabsTrigger value="classic">Classic</TabsTrigger>
          <TabsTrigger value="ll">Linked List</TabsTrigger>
        </TabsList>
        <TabsContent value="classic">
          <CodeBlock code={TEMPLATE}>
            <HighlightedCode code={TEMPLATE} lang="python" />
          </CodeBlock>
        </TabsContent>
        <TabsContent value="ll">
          <CodeBlock code={TEMPLATE_LINKED_LIST}>
            <HighlightedCode code={TEMPLATE_LINKED_LIST} lang="python" />
          </CodeBlock>
        </TabsContent>
      </Tabs>
      <CodeBlock code={TEMPLATE}>
        <HighlightedCode code={TEMPLATE} lang="python" />
      </CodeBlock>
      <H2 title="Example" />
      <p>
        Let's say we want to find two numbers that sum up to 6 in a given sorted
        array. A brute approach would be to check every possible pair in O(n
        <sup>2</sup>) and see which ones sum up to our target.
      </p>
      <p>
        Slightly optmized would be to use a hashmap to store which values we've
        seen so far and for each value we come across, if we've seen target -
        that value, then we'll have our pair. This reduces the runtime from O(n
        <sup>2</sup>) to O(n), but increases the space complexity to O(n) as
        well.
      </p>
      <p>
        An optimized approach would be to use two pointers that start at
        opposite ends. The idea is that if the current sum is greater than our
        target, that means we need to lower our sum. Which we can do by moving
        the right pointer down. Since the array is sorted, moving the right
        pointer to left will lower the total sum.
      </p>
      <p>
        Similarly, if the sum is too small, we can move the left pointer up,
        which will incease our sum and get us closer to target.
      </p>
      <H3 title="Visual Walkthrough" />
      <PointerVisualizer />
      <H3 title="Code" />
      <CodeBlock code={EXAMPLE_CODE}>
        <HighlightedCode code={EXAMPLE_CODE} lang="python" />
      </CodeBlock>
      <H2 title="Sample Problems" />
      <ItemList>
        <ItemListItem url="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/">
          Two Sum II - Input Array Is Sorted
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/remove-duplicates-from-sorted-array/">
          Remove Duplicates from Sorted Array
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/linked-list-cycle/">
          Linked List Cycle
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/container-with-most-water/">
          Container With Most Water
        </ItemListItem>
      </ItemList>
    </PageContainer>
  );
}

const TEMPLATE = `def two_pointers(arr):
  left, right = 0, len(arr) - 1
  while left < right:
    # Process current elements
    current = process(arr[left], arr[right])
    
    # Update pointers based on condition
    if condition(arr[left], arr[right]):
      left += 1
    else:
      right -= 1
`;

const TEMPLATE_LINKED_LIST = `slow = head
fast = head

while fast and fast.next:
  slow = slow.next
  fast = fast.next.next

  if slow == fast:
    # found cycle

`;

const EXAMPLE_CODE = `def twoSum(numbers: List[int], target: int) -> List[int]:
  l, r = 0, len(numbers) - 1
  
  while l <= r:
    if numbers[l] + numbers[r] == target:
      return [l, r]
    elif numbers[l] + numbers[r] > target:
      r -= 1
    else:
      l += 1
  return []`;
