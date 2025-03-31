import { CodeBlock } from "@/components/code-block";
import { HighlightedCode } from "@/components/highlight-code";
import { ItemList, ItemListItem } from "@/components/item-list";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";

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
      <H2 title="Sample Problems" />
      <ItemList>
        <ItemListItem url="https://leetcode.com/problems/longest-substring-without-repeating-characters/description/">
          Longest Substring Without Repeating Characters
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/longest-repeating-character-replacement/">
          Longest Repeating Character Replacement
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/max-consecutive-ones-iii/description/">
          1004. Max Consecutive Ones III
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
