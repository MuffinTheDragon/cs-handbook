import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import React, { JSX } from "react";

interface TreeNode {
  id: number;
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface TreeVisualizerProps {
  tree: TreeNode;
  currentNodeId?: number;
  nextNodeId?: number;
  isBacktracking?: boolean;
  className?: string;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({
  tree,
  currentNodeId,
  nextNodeId,
  isBacktracking,
  className,
}) => {
  const isMobile = useIsMobile();

  // Calculate the depth and width of the tree
  const getTreeDimensions = (
    node: TreeNode | null,
  ): { depth: number; width: number } => {
    if (!node) return { depth: 0, width: 0 };

    const leftDimensions = getTreeDimensions(node.left);
    const rightDimensions = getTreeDimensions(node.right);

    const depth = 1 + Math.max(leftDimensions.depth, rightDimensions.depth);
    const width = leftDimensions.width + rightDimensions.width + 1;

    return { depth, width };
  };

  const { depth: maxDepth } = getTreeDimensions(tree);

  // Calculate appropriate tree height based on depth
  const nodeSize = isMobile ? 28 : 36;
  const verticalGap = isMobile ? 50 : 70;
  const treeHeight = (maxDepth + 1) * verticalGap;
  const totalWidth = Math.pow(2, maxDepth) * (isMobile ? 30 : 40);

  // Calculate horizontal spacing based on level
  const getLevelWidth = (level: number) => {
    return Math.pow(2, level);
  };

  const renderNode = (
    node: TreeNode | null,
    level: number,
    position: number,
  ): JSX.Element | null => {
    if (!node) return null;

    const isCurrentNode = node.id === currentNodeId;
    const isNextNode = node.id === nextNodeId;

    // Determine node appearance based on state
    let nodeClassName =
      "border rounded-full flex items-center justify-center transition-all duration-300";
    let borderColor = "border-border";
    let bgColor = "bg-card";

    if (isCurrentNode) {
      borderColor = "border-blue-500";
      bgColor = "bg-blue-900/30";
      nodeClassName = cn(nodeClassName, "border-2");
    } else if (isNextNode) {
      borderColor = "border-green-500";
      bgColor = "bg-green-900/30";
      nodeClassName = cn(nodeClassName, "border-2");
    } else if (isBacktracking && node.id === currentNodeId) {
      borderColor = "border-orange-500";
      bgColor = "bg-orange-900/30";
      nodeClassName = cn(nodeClassName, "border-2");
    }

    // Calculate positions for nodes at current level
    const nodesInLevel = getLevelWidth(level);
    const levelWidth = totalWidth;
    const nodeSpacing = levelWidth / (nodesInLevel + 1);
    const horizontalOffset = nodeSpacing * (position + 1);

    // Calculate vertical and horizontal positions
    const topPosition = level * verticalGap + 20;
    const leftPosition = horizontalOffset;

    // Calculate positions for child nodes
    const leftChildPosition = position * 2;
    const rightChildPosition = position * 2 + 1;

    return (
      <>
        <div
          className={cn(nodeClassName, borderColor, bgColor)}
          style={{
            width: `${nodeSize}px`,
            height: `${nodeSize}px`,
            position: "absolute",
            left: `${leftPosition}px`,
            top: `${topPosition}px`,
            transform: "translate(-50%, 0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
          }}
        >
          {node.value}
        </div>

        {/* Draw lines to children */}
        {node.left && (
          <div
            className="bg-muted-foreground/30 absolute"
            style={{
              width: "1px",
              height: `${verticalGap * 0.7}px`,
              position: "absolute",
              left: `${leftPosition}px`,
              top: `${topPosition + nodeSize}px`,
              transform: `translate(-50%, 0) rotate(-${isMobile ? 45 : 30}deg)`,
              transformOrigin: "top",
              zIndex: 5,
            }}
          ></div>
        )}

        {node.right && (
          <div
            className="bg-muted-foreground/30 absolute"
            style={{
              width: "1px",
              height: `${verticalGap * 0.7}px`,
              position: "absolute",
              left: `${leftPosition}px`,
              top: `${topPosition + nodeSize}px`,
              transform: `translate(-50%, 0) rotate(${isMobile ? 45 : 30}deg)`,
              transformOrigin: "top",
              zIndex: 5,
            }}
          ></div>
        )}

        {/* Render children */}
        {node.left && renderNode(node.left, level + 1, leftChildPosition)}
        {node.right && renderNode(node.right, level + 1, rightChildPosition)}
      </>
    );
  };

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        height: `${treeHeight}px`,
        minHeight: isMobile ? "250px" : "300px",
        maxHeight: isMobile ? "400px" : "450px",
      }}
    >
      <div
        style={{
          width: `${totalWidth}px`,
          height: "100%",
          position: "relative",
          margin: "0 auto",
        }}
      >
        {renderNode(tree, 0, 0)}
      </div>
    </div>
  );
};

export default TreeVisualizer;
