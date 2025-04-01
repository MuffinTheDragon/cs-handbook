"use client";

import TreeVisualizer from "@/components/animations/tree/tree-visualizer";
import { H3 } from "@/components/typography/h3";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimationStep, useAlgorithmAnimation } from "@/hooks/use-animation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Pause, Play, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";

// Define a simple binary tree for visualization
interface TreeNode {
  id: number;
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Create a smaller, more balanced sample tree
const createSampleTree = (): TreeNode => {
  return {
    id: 1,
    value: 8,
    left: {
      id: 2,
      value: 3,
      left: {
        id: 4,
        value: 1,
        left: null,
        right: null,
      },
      right: {
        id: 5,
        value: 6,
        left: null,
        right: null,
      },
    },
    right: {
      id: 3,
      value: 10,
      left: {
        id: 6,
        value: 9,
        left: null,
        right: null,
      },
      right: {
        id: 7,
        value: 14,
        left: null,
        right: null,
      },
    },
  };
};

const tree = createSampleTree();

export const DFSVisualizer: React.FC = () => {
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [dfsResult, setDfsResult] = useState<number[]>([]);
  const isMobile = useIsMobile();

  // Calculate DFS steps
  useEffect(() => {
    const newSteps: AnimationStep[] = [];
    const visitedValues: number[] = [];

    const performDFS = (node: TreeNode | null, steps: AnimationStep[]) => {
      if (!node) return;

      // Visit the current node
      visitedValues.push(node.value);
      steps.push({
        pointers: { current: node.id },
        action: `Visiting node with value: ${node.value}`,
        result: [...visitedValues],
      });

      // Visit left subtree
      if (node.left) {
        steps.push({
          pointers: { current: node.id, next: node.left.id },
          action: `Moving to left child of ${node.value}`,
          result: [...visitedValues],
        });
        performDFS(node.left, steps);
      }

      // Visit right subtree
      if (node.right) {
        steps.push({
          pointers: { current: node.id, next: node.right.id },
          action: `Moving to right child of ${node.value}`,
          result: [...visitedValues],
        });
        performDFS(node.right, steps);
      }

      // Backtrack
      if (node.id !== 1) {
        // If not the root
        steps.push({
          pointers: { current: node.id, backtrack: 1 },
          action: `Backtracking from node ${node.value}`,
          result: [...visitedValues],
        });
      }
    };

    performDFS(tree, newSteps);
    setDfsResult(visitedValues);
    setSteps(newSteps);
  }, []);

  const {
    pointers,
    currentStep,
    isPlaying,
    isFinished,
    animationSpeed,
    setAnimationSpeed,
    handlePlay,
    handlePause,
    handleReset,
    currentStepData,
  } = useAlgorithmAnimation({
    steps,
    initialPointers: { current: 0 },
    speed: 1000,
  });

  useEffect(() => {
    if (currentStep >= 0 && currentStepData?.result) {
      setVisitedNodes(currentStepData.result);
    } else {
      setVisitedNodes([]);
    }
  }, [currentStep, currentStepData]);

  return (
    <Card className="border-border bg-card text-card-foreground w-full p-4 shadow-md sm:p-6">
      <H3
        title="Depth-First Search (DFS) Tree Traversal"
        className="text-center"
      />

      <div className="space-y-4 sm:space-y-8">
        <div className="mb-2 sm:mb-4">
          <p className="text-muted-foreground mb-3 text-center text-sm sm:text-base">
            Traversing a binary tree using DFS in pre-order (root, left, right)
          </p>

          <TreeVisualizer
            tree={tree}
            currentNodeId={pointers.current}
            nextNodeId={pointers.next}
            isBacktracking={!!pointers.backtrack}
            className="mt-2"
          />
        </div>

        <div className="bg-muted/30 border-border min-h-[80px] rounded-md border p-3 text-center sm:min-h-[100px] sm:p-4">
          {currentStep === -1 ? (
            <p className="text-muted-foreground text-sm italic sm:text-base">
              Press play to start the algorithm
            </p>
          ) : (
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <div className="bg-primary/20 border-primary max-w-full overflow-auto rounded-md border px-2 py-1 text-sm sm:text-base">
                  <span className="whitespace-nowrap">
                    Visited nodes: {visitedNodes.join(" → ")}
                  </span>
                </div>
              </div>
              <p className="text-foreground mt-2 text-sm font-medium sm:text-base">
                {currentStepData?.action}
              </p>
            </div>
          )}

          {isFinished && (
            <div className="mt-3 text-sm font-medium text-green-500 sm:text-base">
              DFS Traversal Complete: {dfsResult.join(", ")}
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={handleReset}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
            Reset
          </Button>

          {isPlaying ? (
            <Button
              size={isMobile ? "sm" : "default"}
              onClick={handlePause}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Pause className="h-3 w-3 sm:h-4 sm:w-4" />
              Pause
            </Button>
          ) : (
            <Button
              size={isMobile ? "sm" : "default"}
              onClick={handlePlay}
              className="flex items-center gap-1"
              disabled={isFinished && currentStep === steps.length - 1}
            >
              <Play className="h-3 w-3 sm:h-4 sm:w-4" />
              {currentStep === -1 || currentStep === steps.length - 1
                ? "Start"
                : "Continue"}
            </Button>
          )}

          <div className="ml-2 flex items-center gap-2 sm:ml-4">
            <span className="text-muted-foreground text-xs sm:text-sm">
              Speed:
            </span>
            <select
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="border-border bg-card rounded-md border px-1 py-1 text-xs sm:px-2 sm:text-sm"
            >
              <option value={2000}>Slow</option>
              <option value={1000}>Normal</option>
              <option value={500}>Fast</option>
            </select>
          </div>
        </div>

        <div className="bg-muted h-1.5 w-full rounded-full sm:h-2.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300 sm:h-2.5"
            style={{
              width: `${currentStep >= 0 ? ((currentStep + 1) / steps.length) * 100 : 0}%`,
            }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default DFSVisualizer;
