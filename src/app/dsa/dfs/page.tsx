import { CodeBlock } from "@/components/code-block";
import { HighlightedCode } from "@/components/highlight-code";
import { ItemList, ItemListItem } from "@/components/item-list";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DFSVisualizerGraph from "./walkthrough";

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
      <Tabs defaultValue="iterative" className="w-full">
        <TabsList>
          <TabsTrigger value="iterative">Iterative</TabsTrigger>
          <TabsTrigger value="recursive">Recursive</TabsTrigger>
        </TabsList>
        <TabsContent value="iterative">
          <CodeBlock code={TEMPLATE_GRAPH_ITERATIVE}>
            <HighlightedCode code={TEMPLATE_GRAPH_ITERATIVE} lang="python" />
          </CodeBlock>
        </TabsContent>
        <TabsContent value="recursive">
          <CodeBlock code={TEMPLATE_GRAPH_RECURSIVE}>
            <HighlightedCode code={TEMPLATE_GRAPH_RECURSIVE} lang="python" />
          </CodeBlock>
        </TabsContent>
      </Tabs>
      <H2 title="Visual Walkthrough" />
      <DFSVisualizerGraph />
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
        <ItemListItem url="https://leetcode.com/problems/shortest-bridge/">
          Shortest Bridge (DFS + BFS)
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

const TEMPLATE_GRAPH_ITERATIVE = `stack = [node]
visited = set([node])

while stack:
  n = stack.pop()
  do_something(n)
  
  for neighbor in get_neighbors(n):
    if neighbor not in visited:
      visited.add(neighbor)
      stack.append(neighbor)
`;

const TEMPLATE_GRAPH_RECURSIVE = `visited = set()

def dfs(root):
  if root in visited:
    return

  do_something(root)
  visited.add(root)

  for neighbor in get_neighbors(root):
    dfs(neighbor)
`;

const CODE = `class Solution:
  def numIslands(self, grid: List[List[str]]) -> int:
    ans = 0
    n = len(grid)
    m = len(grid[0])
    
    def dfs(i, j):
      if i < 0 or i >= n or j < 0 or j >= m or grid[i][j] == "0":
        return

      grid[i][j] = "0"
      helper(i-1,j)
      helper(i+1,j)
      helper(i,j-1)
      helper(i,j+1)

        
    for i in range(n):
      for j in range(m):
        if grid[i][j] == "1":
          dfs(i, j)
          ans += 1

    return ans`;
