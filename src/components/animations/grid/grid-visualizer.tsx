import { cn } from "@/lib/utils";
import { Circle, Flag, MapPin, Waves } from "lucide-react";
import React from "react";

interface GridVisualizerProps {
  grid: number[][];
  currentCell?: { row: number; col: number };
  visitedCells: { row: number; col: number }[];
  shortestPath?: { row: number; col: number }[];
  startCell?: { row: number; col: number };
  targetCell?: { row: number; col: number };
  className?: string;
  cellSize?: number;
  islandMode?: boolean; // New prop to indicate if this is the island counting DFS visualization
}

const GridVisualizer: React.FC<GridVisualizerProps> = ({
  grid,
  currentCell,
  visitedCells,
  shortestPath = [],
  startCell,
  targetCell,
  className,
  cellSize = 40,
  islandMode = false, // Default to maze mode
}) => {
  // Function to check if a cell is in visitedCells
  const isCellVisited = (row: number, col: number) => {
    return visitedCells.some((cell) => cell.row === row && cell.col === col);
  };

  // Function to check if a cell is the current cell
  const isCurrentCell = (row: number, col: number) => {
    return currentCell?.row === row && currentCell?.col === col;
  };

  // Function to check if a cell is in the shortest path
  const isInShortestPath = (row: number, col: number) => {
    return shortestPath.some((cell) => cell.row === row && cell.col === col);
  };

  // Function to check if a cell is the start cell
  const isStartCell = (row: number, col: number) => {
    return startCell?.row === row && startCell?.col === col;
  };

  // Function to check if a cell is the target cell
  const isTargetCell = (row: number, col: number) => {
    return targetCell?.row === row && targetCell?.col === col;
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => {
            const isWall = cell === 1;
            const isEmpty = cell === 0;
            const isVisited = isCellVisited(rowIndex, colIndex);
            const isCurrent = isCurrentCell(rowIndex, colIndex);
            const isStart = isStartCell(rowIndex, colIndex);
            const isTarget = isTargetCell(rowIndex, colIndex);
            const isPath = isInShortestPath(rowIndex, colIndex);

            const cellClassName = cn(
              "flex items-center justify-center transition-all duration-300 border",
              {
                // Island mode - land vs water
                "bg-gray-700 border-gray-800": islandMode && isWall, // Land in island mode
                "bg-blue-200 border-blue-300":
                  islandMode && !isWall && !isVisited && !isCurrent, // Water in island mode

                // Maze mode - walls vs paths
                "bg-gray-800 border-gray-900": !islandMode && isWall, // Wall in maze mode
                "bg-slate-100 border-slate-200":
                  !islandMode &&
                  isEmpty &&
                  !isVisited &&
                  !isCurrent &&
                  !isPath &&
                  !isStart &&
                  !isTarget, // Empty path

                // Common styles for both modes
                "bg-blue-500 border-blue-600": isStart && !isCurrent,
                "bg-green-500 border-green-600": isTarget && !isCurrent,
                "bg-yellow-400 border-yellow-500 border-2":
                  isCurrent && !isStart && !isTarget,
                "bg-violet-200 border-violet-300":
                  isVisited && !isCurrent && !isPath && !isStart && !isTarget,
                "bg-amber-300 border-amber-400":
                  isPath && !isStart && !isTarget && !isCurrent,
                "bg-blue-700 border-blue-800 border-2": isCurrent && isStart,
                "bg-green-700 border-green-800 border-2": isCurrent && isTarget,
              },
            );

            return (
              <div
                key={colIndex}
                className={cellClassName}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
              >
                {isStart ? (
                  <MapPin className="h-5 w-5 text-white" />
                ) : isTarget ? (
                  <Flag className="h-5 w-5 text-white" />
                ) : islandMode && isWall ? (
                  <Circle className="text-brown-500 h-4 w-4 fill-amber-800" />
                ) : islandMode && !isWall ? (
                  <Waves className="h-4 w-4 text-blue-500" />
                ) : isWall ? (
                  <div className="h-full w-full bg-gray-800" />
                ) : isPath ? (
                  <Circle className="h-3 w-3 fill-amber-600 text-amber-600" />
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GridVisualizer;
