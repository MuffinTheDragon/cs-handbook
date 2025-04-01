import { cn } from "@/lib/utils";
import React from "react";

export interface PointerConfig {
  label: string;
  color: string;
  position: "top" | "bottom";
  index: number;
}

interface ArrayVisualizerProps {
  array: number[];
  highlightedIndices?: Record<string, number>;
  pointerConfigs?: PointerConfig[];
  className?: string;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  highlightedIndices = {},
  pointerConfigs = [],
  className,
}) => {
  // Get all unique indices that need to be highlighted
  const uniqueHighlightedIndices = new Set<number>();
  Object.values(highlightedIndices).forEach((index) =>
    uniqueHighlightedIndices.add(index),
  );

  return (
    <div className={cn("flex justify-center", className)}>
      {array.map((num, index) => {
        // Find all pointers that point to this index
        const pointersAtThisIndex = pointerConfigs.filter(
          (p) => p.index === index,
        );
        const hasPointer = pointersAtThisIndex.length > 0;

        // Determine background color based on pointer configs
        let bgClass = "bg-muted border border-border";
        if (hasPointer) {
          const pointerConfig = pointersAtThisIndex[0]; // Take the first pointer's style
          switch (pointerConfig.color) {
            case "blue":
              bgClass = "bg-blue-900/30 border-2 border-blue-500";
              break;
            case "red":
              bgClass = "bg-red-900/30 border-2 border-red-500";
              break;
            case "purple":
              bgClass = "bg-purple-900/30 border-2 border-purple-500";
              break;
            case "green":
              bgClass = "bg-green-900/30 border-2 border-green-500";
              break;
            default:
              bgClass = "bg-muted border border-border";
          }
        }

        return (
          <div
            key={index}
            className={`relative m-1 flex h-12 w-12 items-center justify-center ${bgClass} rounded-md transition-all duration-300`}
          >
            {num}
            {pointersAtThisIndex.map((pointer) => (
              <div
                key={pointer.label}
                className={cn(
                  "absolute flex items-center text-xs font-medium",
                  pointer.position === "top" ? "-top-8" : "-bottom-8",
                  {
                    "text-blue-500": pointer.color === "blue",
                    "text-red-500": pointer.color === "red",
                    "text-purple-500": pointer.color === "purple",
                    "text-green-500": pointer.color === "green",
                  },
                )}
              >
                <span>{pointer.label}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
