"use client";

import GridVisualizer from "@/components/animations/grid/grid-visualizer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimationStep, useAlgorithmAnimation } from "@/hooks/use-animation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Pause, Play, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";

// Create a sample grid for the Number of Islands problem
// 1 represents land, 0 represents water
const createSampleGrid = (): number[][] => {
  return [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1],
  ];
};

const grid = createSampleGrid();

export const DFSVisualizer: React.FC = () => {
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [visitedCells, setVisitedCells] = useState<
    { row: number; col: number }[]
  >([]);
  const [islandCount, setIslandCount] = useState<number>(0);
  const isMobile = useIsMobile();

  // Calculate Number of Islands DFS steps
  useEffect(() => {
    const newSteps: AnimationStep[] = [];
    const visited: { row: number; col: number }[] = [];
    let islandCounter = 0;

    const isValidCell = (row: number, col: number): boolean => {
      return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
    };

    const dfs = (row: number, col: number) => {
      // Check boundaries and if cell is land and not visited
      if (
        !isValidCell(row, col) ||
        grid[row][col] === 0 ||
        visited.some((cell) => cell.row === row && cell.col === col)
      ) {
        return;
      }

      // Mark cell as visited
      visited.push({ row, col });
      newSteps.push({
        pointers: { current: 1 },
        action: `Visiting land cell at (${row}, ${col})`,
        result: [...visited],
      });

      // Visit all adjacent cells (4-directionally)
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]; // up, down, left, right

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          isValidCell(newRow, newCol) &&
          grid[newRow][newCol] === 1 &&
          !visited.some((cell) => cell.row === newRow && cell.col === newCol)
        ) {
          newSteps.push({
            pointers: { current: 1 },
            action: `Moving to adjacent land cell at (${newRow}, ${newCol})`,
            result: [...visited],
          });
          dfs(newRow, newCol);
        }
      }
    };

    // Loop through all cells in the grid
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          grid[row][col] === 1 &&
          !visited.some((cell) => cell.row === row && cell.col === col)
        ) {
          islandCounter++;
          newSteps.push({
            pointers: { current: 1 },
            action: `Found new island #${islandCounter} starting at (${row}, ${col})`,
            result: [...visited],
          });
          dfs(row, col);
        }
      }
    }

    // Final step showing the total count
    newSteps.push({
      pointers: { current: 1 },
      action: `Total number of islands found: ${islandCounter}`,
      result: [...visited],
      isSuccess: true,
    });

    setIslandCount(islandCounter);
    setSteps(newSteps);
  }, []);

  const {
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

  // Update visited cells based on the current step
  useEffect(() => {
    if (currentStep >= 0 && currentStepData?.result) {
      setVisitedCells(currentStepData.result);
    } else {
      setVisitedCells([]);
    }
  }, [currentStep, currentStepData]);

  // Get current cell position from the current step (parsing from action text)
  const getCurrentCell = () => {
    if (currentStep < 0 || !currentStepData?.action) return undefined;

    const match = currentStepData.action.match(/\((\d+), (\d+)\)/);
    if (match) {
      return {
        row: parseInt(match[1]),
        col: parseInt(match[2]),
      };
    }
    return undefined;
  };

  return (
    <Card className="border-border bg-card text-card-foreground w-full p-4 shadow-md sm:p-6">
      <p className="text-center text-lg font-semibold sm:text-xl">
        Number of Islands - DFS Solution
      </p>
      <div className="space-y-4 sm:space-y-8">
        <div className="mb-2 sm:mb-4">
          <p className="text-muted-foreground mb-3 text-center text-sm sm:text-base">
            Finding the number of islands in a grid using Depth-First Search
          </p>

          <div className="flex justify-center">
            <GridVisualizer
              grid={grid}
              currentCell={getCurrentCell()}
              visitedCells={visitedCells}
              cellSize={isMobile ? 32 : 40}
              className="mt-2"
              islandMode={true} // Set to true for island visualization
            />
          </div>
        </div>

        <div className="bg-muted/30 border-border min-h-[80px] rounded-md border p-3 text-center sm:min-h-[100px] sm:p-4">
          {currentStep === -1 ? (
            <p className="text-muted-foreground text-sm italic sm:text-base">
              Press play to start the algorithm
            </p>
          ) : (
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <div className="bg-primary/20 border-primary rounded-md border px-2 py-1 text-sm sm:text-base">
                  <span>
                    Islands found: {islandCount > 0 ? islandCount : "?"}
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
              Algorithm Complete: Found {islandCount} islands!
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
