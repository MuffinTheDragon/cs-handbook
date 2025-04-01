import { CodeBlock } from "@/components/code-block";
import { HighlightedCode } from "@/components/highlight-code";
import { ItemList, ItemListItem } from "@/components/item-list";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SlidingWindowVisualizer from "./walkthough";

export default function Home() {
  return (
    <PageContainer>
      <H1 title="Sliding window" subtitle="Sliding window pattern" />
      <p>
        Sliding window is a common pattern when working with arrays or strings
        in a contiguous fashion.
      </p>
      <p>
        This pattern involves analyzing your array or string a window at a time.
        A window is defined by two pointers, a left which determines the start
        of a window, and a right which determines the end. As you iterate
        through your data structure, you increment these pointers to move the
        window.
      </p>
      <p>
        Sliding window is a great way to reduce the time complexity of your
        solution from O(n<sup>2</sup>) to O(n) since you don't need to recompute
        everything in your window. Only the parts that leave and enter the
        window on each iteration.
      </p>
      <H2 title="Common Use Cases" />
      <p>Some common use cases for sliding windows:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Anytime the question mentions subarray or substring that must be
          contiguous
        </li>
        <li>Working with arrays</li>
        <li>Working with strings</li>
      </ul>
      <H2 title="Template" />
      <CodeBlock code={TEMPLATE}>
        <HighlightedCode code={TEMPLATE} lang="py" />
      </CodeBlock>
      <H2 title="Example" />
      <p>
        Let's say we want to find the maximum sum of a{" "}
        <i>contiguous subarray</i> of size 3. A brute approach in O(n
        <sup>2</sup>) time would be to use a double for-loop to check every
        subarray of size 3 and keep track of the largest sum.
      </p>
      <p>
        An optimized approach would be to use sliding window since we're looking
        for a contiguous subarray. Since our window size is fixed, we can create
        a window of size 3. Then each time we move our window, we subtract the
        current total from the left side, add the new number from the right
        side, and update our largest sum.
      </p>
      <H3 title="Visual Walkthrough" />
      <SlidingWindowVisualizer />
      <H3 title="Code" />
      <Tabs defaultValue="brute" className="w-full">
        <TabsList>
          <TabsTrigger value="brute">Brute approach</TabsTrigger>
          <TabsTrigger value="optimized">Optimized approach</TabsTrigger>
        </TabsList>
        <TabsContent value="brute">
          <CodeBlock code={BRUTE}>
            <HighlightedCode code={BRUTE} lang="python" />
          </CodeBlock>
          <p>
            With this implementation, although our window size is fixed here, if
            it wasn't fixed, we're comparing every subarray and recomputing the
            sums each time. This gives a time complexity of O(n<sup>2</sup>).
          </p>
        </TabsContent>
        <TabsContent value="optimized">
          <CodeBlock code={OPTIMIZED}>
            <HighlightedCode code={OPTIMIZED} lang="python" />
          </CodeBlock>
          <p>
            With the optimized approach, we just need a single loop to iterate
            through the array while keeping track of the current sum each time
            the window moves. Although the window size is fixed in this case,
            the logic will apply to dynamic window sizes.
          </p>
          <p>This approach gives a runtime of O(n).</p>
        </TabsContent>
      </Tabs>
      <H2 title="Sample Problems" />
      <ItemList>
        <ItemListItem url="https://leetcode.com/problems/longest-substring-without-repeating-characters/description/">
          Longest Substring Without Repeating Characters
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/longest-repeating-character-replacement/">
          Longest Repeating Character Replacement
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/max-consecutive-ones-iii/description/">
          Max Consecutive Ones III
        </ItemListItem>
      </ItemList>
    </PageContainer>
  );
}

const TEMPLATE = `def sliding_window(input):
  initialize window, ans
  left = 0
  for right in range(len(input)):
    while invalid(window):        # update left until window is valid again
      remove input[left] from window
      left += 1
    
    ans = max(ans, window)        # window is guaranteed to be valid here
  return ans
`;

const OPTIMIZED = `def largest_sum(numbers: List[int]) -> int:
  if len(numbers) < 3:
    return -1

  cur = sum(numbers[:3])
  ans = cur
  l = 0
  for r in range(3, len(numbers)):
    cur -= numbers[l]
    cur += numbers[r]
    
    l += 1
    ans = max(ans, cur)
        
    return ans

print(largest_sum([1, 2, 3, 4, 5, 2, 1, 7, 6, 5]))`;

const BRUTE = `def largest_sum_brute(numbers: List[int]) -> int:
  ans = 0
  for i in range(len(numbers)):
    for j in range(i + 1, i + 4):
      cur = sum(numbers[i:j])
      ans = max(ans, cur)
  return ans

print(largest_sum_brute([1, 2, 3, 4, 5, 2, 1, 7, 6, 5]))`;
