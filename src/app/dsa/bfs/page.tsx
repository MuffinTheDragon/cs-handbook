import { CodeBlock } from "@/components/code-block";
import { HighlightedCode } from "@/components/highlight-code";
import { ItemList, ItemListItem } from "@/components/item-list";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BFSVisualizer from "./walkthrough";

export default function Home() {
  return (
    <PageContainer>
      <H1 title="BFS" subtitle="BFS pattern" />
      <p>
        BFS or breadth-first-search is a very common algorith used to traverse
        non-linear data structures (think trees or graphs). It is similar to DFS
        but instead of going depth-first, you traverse breadth-first (i.e. level
        by level)
      </p>
      <p>
        BFS is most commonly implemented using a queue where nodes are append to
        the end of the queue. In each iteration, you pop from the start of the
        queue.
      </p>
      <H2 title="Common Use Cases" />
      <p>Some common use cases include:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Working with trees</li>
        <li>Working with graphs</li>
        <li>Working with multi-dimensional arrays</li>
        <li>Anytime multi-dimensional arrays mention "shortest"</li>
      </ul>
      <H3 title="Important Note on When to Use BFS vs DFS" />
      <p>
        BFS is particularly more useful than DFS in situations where you're
        trying to find the shortest path to something. This is because in DFS,
        you'll explore the first possibility all the way to the end. If this
        possibility leads to a solution, you still have to explore all other
        possibilities to find the smallest.
      </p>
      <p>
        In contrast, with BFS, since you're exploring level by level, that means
        the first possibility that leads to a valid solution will always be the
        shortest. Making your algorithm much more efficient in problems that ask
        for shortest distance.
      </p>
      <H2 title="Template" />
      <Tabs defaultValue="tree" className="w-full">
        <TabsList>
          <TabsTrigger value="tree">Tree</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
        </TabsList>
        <TabsContent value="tree">
          <CodeBlock code={TEMPLATE_BFS_TREE}>
            <HighlightedCode code={TEMPLATE_BFS_TREE} lang="python" />
          </CodeBlock>
        </TabsContent>
        <TabsContent value="graph">
          <CodeBlock code={TEMPLATE_BFS_GRAPH}>
            <HighlightedCode code={TEMPLATE_BFS_GRAPH} lang="python" />
          </CodeBlock>
        </TabsContent>
      </Tabs>
      <H2 title="Visual Walkthrough" />
      <BFSVisualizer />
      <H3 title="Code" />
      <CodeBlock code={CODE}>
        <HighlightedCode code={CODE} lang="python" />
      </CodeBlock>
      <H2 title="Sample Problems" />
      <ItemList>
        <ItemListItem url="https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/">
          Nearest Exit from Entrance in Maze
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/binary-tree-right-side-view/">
          Binary Tree Right Side View
        </ItemListItem>
        <ItemListItem url="https://leetcode.com/problems/flood-fill/">
          Flood Fill
        </ItemListItem>
      </ItemList>
    </PageContainer>
  );
}

const TEMPLATE_BFS_TREE = `def bfs(root):
  queue = deque([root])
  while queue:
    for _ in range(len(queue)):
      # look at every node at current level
      node = queue.popleft()
      do_something(node)
      for child in node.children:
        if child:
          queue.append(child)
  return None
`;

const TEMPLATE_BFS_GRAPH = `def bfs(root):
  queue = deque([root])
  visited = set([root])
  while queue:
    node = queue.popleft()
    for neighbor in get_neighbors(node):
      if neighbor in visited:
        continue
      queue.append(neighbor)
      visited.add(neighbor)
`;

const CODE = `n = len(maze)
m = len(maze[0])
queue = deque([(start[0], start[1], 0)])
visited = set()

while queue:
  r, c, dist = queue.popleft()

  if [r, c] == end:
    return dist

  directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

  for dx, dy in directions:
    nr, nc = r + dx, c + dy
    if 0 <= nr < n and 0 <= nc < m and (nr, nc) not in visited:
      visited.add((nr, nc))
      queue.append((nr, nc, dist + 1))

return -1
`;
