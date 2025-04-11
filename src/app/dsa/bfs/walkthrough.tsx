"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import GridVisualizer from "@/components/animations/grid/grid-visualizer";
import { AnimationController } from "@/components/bfs/animation-controller";
import { StepDisplay } from "@/components/bfs/step-display";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const BFSVisualizer = () => {
  // Initialize grid with a maze that has multiple possible paths of different lengths
  const initialGrid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const startCell = { row: 1, col: 1 };
  const targetCell = { row: 7, col: 8 };

  const grid = initialGrid;
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCell, setCurrentCell] = useState<
    { row: number; col: number } | undefined
  >(undefined);
  const [visitedCells, setVisitedCells] = useState<
    { row: number; col: number }[]
  >([]);
  const [speed, setSpeed] = useState(500);
  const [queue, setQueue] = useState<{ row: number; col: number }[]>([]);
  const [shortestPath, setShortestPath] = useState<
    { row: number; col: number }[]
  >([]);

  useEffect(() => {
    // Calculate BFS steps when component mounts
    const { steps } = bfsSolve(grid, startCell, targetCell);
    setSteps(steps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        const nextStep = currentStepIndex + 1;
        setCurrentStepIndex(nextStep);
        applyStep(steps[nextStep]);
      }, speed);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps, speed]);

  const applyStep = (step: any) => {
    if (step.currentCell) {
      setCurrentCell(step.currentCell);
    }

    if (step.visitedCells) {
      setVisitedCells(step.visitedCells);
    }

    if (step.queue) {
      setQueue(step.queue);
    }

    if (step.shortestPath) {
      setShortestPath(step.shortestPath);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStepIndex(-1);
    setCurrentCell(undefined);
    setVisitedCells([]);
    setQueue([]);
    setShortestPath([]);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStep = currentStepIndex + 1;
      setCurrentStepIndex(nextStep);
      applyStep(steps[nextStep]);
    }
  };

  const handleStepBackward = () => {
    if (currentStepIndex > 0) {
      const prevStep = currentStepIndex - 1;
      setCurrentStepIndex(prevStep);
      applyStep(steps[prevStep]);
    } else if (currentStepIndex === 0) {
      handleReset();
    }
  };

  const handleSpeedChange = (value: number[]) => {
    setSpeed(1000 - value[0]);
  };

  const progressPercentage =
    steps.length > 0 ? ((currentStepIndex + 1) / steps.length) * 100 : 0;

  return (
    <Card className="w-full">
      <p className="text-center text-lg font-semibold sm:text-xl">
        Breadth-First Search (BFS)
      </p>
      <p className="text-muted-foreground mb-3 text-center text-sm sm:text-base">
        BFS algorithm to find the shortest path in a maze from start (blue) to
        target (green)
      </p>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-6">
          <GridVisualizer
            grid={grid}
            currentCell={currentCell}
            visitedCells={visitedCells}
            shortestPath={shortestPath}
            startCell={startCell}
            targetCell={targetCell}
            className="mb-4"
            cellSize={36}
          />

          <AnimationController
            isPlaying={isPlaying}
            handlePlay={handlePlay}
            handlePause={handlePause}
            handleReset={handleReset}
            handleStepForward={handleStepForward}
            handleStepBackward={handleStepBackward}
            handleSpeedChange={handleSpeedChange}
            speed={speed}
            disabled={steps.length === 0}
          />

          <div className="w-full space-y-2">
            <div className="text-muted-foreground flex justify-between text-sm">
              <span>Progress:</span>
              <span>
                {currentStepIndex + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <StepDisplay
            currentStepIndex={currentStepIndex}
            steps={steps}
            queue={queue}
            shortestPath={shortestPath}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface Cell {
  row: number;
  col: number;
}

interface BFSStep {
  action: string;
  currentCell?: Cell;
  visitedCells: Cell[];
  queue: Cell[];
  shortestPath?: Cell[];
}

export const bfsSolve = (grid: number[][], start: Cell, target: Cell) => {
  const rows = grid.length;
  const cols = grid[0].length;

  // Record steps for visualization
  const steps: BFSStep[] = [];

  // Track visited cells and build parent map for path reconstruction
  const visited: boolean[][] = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(false));
  const parent: Record<string, string> = {};

  // Initialize queue with start cell
  const queue: Cell[] = [start];
  visited[start.row][start.col] = true;

  // Add initial step
  steps.push({
    action: "initialize",
    currentCell: start,
    visitedCells: [],
    queue: [...queue],
  });

  // Record visited cells for visualization
  const visitedCells: Cell[] = [];

  // Direction vectors (up, right, down, left)
  const directions = [
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
  ];

  let targetFound = false;

  // BFS algorithm
  while (queue.length > 0 && !targetFound) {
    // Dequeue the front cell
    const currentCell = queue.shift()!;
    visitedCells.push(currentCell);

    // Add step for processing current cell
    steps.push({
      action: "process",
      currentCell,
      visitedCells: [...visitedCells],
      queue: [...queue],
    });

    // Check if we reached the target
    if (currentCell.row === target.row && currentCell.col === target.col) {
      targetFound = true;
      steps.push({
        action: "found-target",
        currentCell,
        visitedCells: [...visitedCells],
        queue: [...queue],
      });
      break;
    }

    // Visit all valid adjacent cells
    steps.push({
      action: "add-neighbors",
      currentCell,
      visitedCells: [...visitedCells],
      queue: [...queue],
    });

    for (const dir of directions) {
      const newRow = currentCell.row + dir.row;
      const newCol = currentCell.col + dir.col;

      // Check if the new cell is valid
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol] === 0 &&
        !visited[newRow][newCol]
      ) {
        visited[newRow][newCol] = true;
        queue.push({ row: newRow, col: newCol });

        // Store parent for path reconstruction
        parent[`${newRow},${newCol}`] = `${currentCell.row},${currentCell.col}`;

        // Add step for visiting new cell
        steps.push({
          action: "visit",
          currentCell: { row: newRow, col: newCol },
          visitedCells: [...visitedCells],
          queue: [...queue],
        });
      }
    }
  }

  // If target was found, reconstruct the shortest path
  const shortestPath: Cell[] = [];

  if (targetFound) {
    let current = `${target.row},${target.col}`;

    while (current !== `${start.row},${start.col}`) {
      const [row, col] = current.split(",").map(Number);
      shortestPath.unshift({ row, col });
      current = parent[current];
    }

    shortestPath.unshift(start);

    // Add final step with the shortest path
    steps.push({
      action: "complete",
      visitedCells: [...visitedCells],
      queue: [],
      shortestPath,
    });
  }

  return {
    success: targetFound,
    steps,
    shortestPath,
  };
};

export default BFSVisualizer;
