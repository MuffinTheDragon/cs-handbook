import { CodeBlock } from "@/components/code-block";
import { HighlightedCode } from "@/components/highlight-code";
import { ItemList, ItemListItem } from "@/components/item-list";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
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
      <CodeBlock code={TEMPLATE}>
        <HighlightedCode code={TEMPLATE} lang="python" />
      </CodeBlock>
      <H2 title="Visual Walkthrough" />
      <p>
        Let's say we want to find two numbers that sum up to 6 in the following
        array
      </p>
      <PointerVisualizer />
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
