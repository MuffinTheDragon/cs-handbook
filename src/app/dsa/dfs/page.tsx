import { CodeBlock } from "@/components/code-block";
import { HighlightedCode } from "@/components/highlight-code";
import { ItemList, ItemListItem } from "@/components/item-list";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import DFSVisualizer from "./walkthrough";

export default function Home() {
  return (
    <PageContainer>
      <H1 title="DFS" subtitle="DFS pattern" />
      <p>
        DFS or depth-first-search is an algorithm used to traverse non-linear
        data structures (like graphs and trees). DFS involves visiting the
        deepest possible before continuing on other paths.
      </p>
      <p>
        DFS is usually implemented using iterativley using a stack or through
        recursion (which uses stacks interally).
      </p>
      <H2 title="Common Use Cases" />
      <p>Some common use cases include:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Working with trees</li>
        <li>Working with graphs</li>
        <li>Working with multi-dimensional arrays</li>
      </ul>
      <H2 title="DFS on Trees" />
      <p>DFS on trees can be traversed in 3 ways:</p>
      <ol className="list-decimal space-y-2 pl-6">
        <li>Pre-order: Visiting root, then left, then right</li>
        <li>
          In-order: Visiting left, then root, then right. This gives the sorted
          order in a BST
        </li>
        <li>Post-order: Visiting left, then right, then root</li>
      </ol>
      <H3 title="Template" />
      <CodeBlock code="TEMPLATE_TREE">
        <HighlightedCode code={TEMPLATE_TREE} lang="py" />
      </CodeBlock>
      <H2 title="DFS on Graphs" />
      <p>
        DFS on graphs is implemented by visiting a node's neighbours. This can
        be done by building an adjacency matrix (if you are given the structure
        of the graph and how the ndoes are connected). Where for each node, you
        have a list of its neighbors.
      </p>
      <p>
        For nodes that are connected directionally in 4 ways, your neighbors
        would be top, bottom, left, and right.
      </p>
      <p>
        You also want to keep track of which nodes you have visited so that you
        don't get caught in an infinite loop and continue revisiting the same
        nodes. This isn't required on a tree because a valid tree doesn't have
        cycles.
      </p>
      <H3 title="Template" />
      <CodeBlock code="TEMPLATE_GRAPH">
        <HighlightedCode code={TEMPLATE_GRAPH} lang="py" />
      </CodeBlock>
      <H2 title="Visual Walkthrough" />
      <DFSVisualizer />
      <H3 title="Code" />
      <CodeBlock code={CODE}>
        <HighlightedCode code={CODE} lang="python" />
      </CodeBlock>
      <H2 title="Sample Problems" />
      <ItemList>
        <ItemListItem url="https://leetcode.com/problems/number-of-islands/">
          Number of Islands
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/path-sum/description/?envType=problem-list-v2&envId=depth-first-search">
          Path Sum
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/surrounded-regions/">
          Surrounded Regions
        </ItemListItem>
      </ItemList>
    </PageContainer>
  );
}

const TEMPLATE_TREE = `def dfs(root):
  if root is None:
    return None
  do_someting(root)
  dfs(root.left)
  dfs(root.right)
`;

const TEMPLATE_GRAPH = `visited = set()

def dfs(root):
  if root in visited:
    return

  do_something(root)
  visited.add(root)

  for neighbor in get_neighbors(root):
    dfs(neighbor)
`;

const CODE = `def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
  ans = []
  
  def dfs(node):
    if not node:
      return
    ans.append(node.val)
    dfs(node.left)
    dfs(node.right)
        
  dfs(root)
  return ans`;
