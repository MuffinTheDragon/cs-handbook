import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface StepDisplayProps {
  currentStepIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  steps: any[];
  queue: { row: number; col: number }[];
  shortestPath?: { row: number; col: number }[];
}

export const StepDisplay: React.FC<StepDisplayProps> = ({
  currentStepIndex,
  steps,
  queue,
  shortestPath = [],
}) => {
  const currentStep =
    currentStepIndex >= 0 && currentStepIndex < steps.length
      ? steps[currentStepIndex]
      : null;

  const getActionMessage = () => {
    if (!currentStep) return "Press play to start BFS";

    switch (currentStep.action) {
      case "initialize":
        return "Initializing BFS with start cell in queue";
      case "process":
        return `Processing cell (${currentStep.currentCell.row}, ${currentStep.currentCell.col})`;
      case "visit":
        return `Visiting cell (${currentStep.currentCell.row}, ${currentStep.currentCell.col})`;
      case "add-neighbors":
        return "Adding valid neighbors to queue";
      case "found-target":
        return "Found target! Building shortest path...";
      case "complete":
        return "BFS complete - shortest path found!";
      default:
        return currentStep.action || "Processing...";
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Current Action:</p>
              <p className="text-muted-foreground">{getActionMessage()}</p>
            </div>

            <div>
              <p className="mb-2 font-medium">Queue:</p>
              <div className="flex flex-wrap gap-2">
                {queue.length > 0 ? (
                  queue.map((cell, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-secondary"
                    >
                      ({cell.row}, {cell.col})
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">Queue is empty</span>
                )}
              </div>
            </div>

            {shortestPath && shortestPath.length > 0 && (
              <div>
                <p className="mb-2 font-medium">Shortest Path:</p>
                <div className="flex flex-wrap gap-2">
                  {shortestPath.map((cell, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-amber-200 text-amber-800"
                    >
                      ({cell.row}, {cell.col})
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
