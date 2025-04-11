"use client";

import { ArrayVisualizer } from "@/components/animations/array/array-visualizer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimationStep, useAlgorithmAnimation } from "@/hooks/use-animation";
import { cn } from "@/lib/utils";
import { Pause, Play, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";

// Example: Find the maximum sum subarray of size 3
const array = [1, 2, 3, 4, 5, 2, 1, 7, 6, 5];
const windowSize = 3;

export const SlidingWindowVisualizer: React.FC = () => {
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [maxSum, setMaxSum] = useState<number | null>(null);
  const [maxSumIndices, setMaxSumIndices] = useState<{
    start: number;
    end: number;
  } | null>(null);

  // Calculate animation steps for the sliding window algorithm
  useEffect(() => {
    const calculateSteps = () => {
      const newSteps: AnimationStep[] = [];

      if (array.length < windowSize) {
        newSteps.push({
          pointers: { start: 0, end: array.length - 1 },
          action: `Array length ${array.length} is less than window size ${windowSize}`,
          isSuccess: false,
        });
        return newSteps;
      }

      let start = 0;
      let end = windowSize - 1;

      // Calculate initial window sum
      let currentSum = 0;
      for (let i = 0; i <= end; i++) {
        currentSum += array[i];
      }

      let maxSum = currentSum;
      let maxStart = 0;
      let maxEnd = end;

      newSteps.push({
        pointers: { start, end },
        action: `Initial window sum: ${currentSum}`,
      });

      // Slide the window
      while (end < array.length - 1) {
        currentSum = currentSum - array[start] + array[end + 1];
        start++;
        end++;

        const isNewMax = currentSum > maxSum;
        if (isNewMax) {
          maxSum = currentSum;
          maxStart = start;
          maxEnd = end;
        }

        newSteps.push({
          pointers: { start, end },
          action: isNewMax
            ? `New maximum found: ${currentSum}`
            : `Current sum: ${currentSum}`,
          isSuccess: isNewMax,
        });
      }

      setMaxSum(maxSum);
      setMaxSumIndices({ start: maxStart, end: maxEnd });

      return newSteps;
    };

    setSteps(calculateSteps());
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
    initialPointers: { start: 0, end: windowSize - 1 },
    speed: 1000,
  });

  // Convert pointers to array visualization format
  const getPointerConfigs = () => {
    if (currentStep < 0) return [];

    return [
      {
        label: "start",
        color: "blue",
        position: "bottom" as const,
        index: pointers.start,
      },
      {
        label: "end",
        color: "red",
        position: "bottom" as const,
        index: pointers.end,
      },
    ];
  };

  // Calculate current window sum
  const getCurrentWindowSum = () => {
    if (currentStep < 0) return 0;
    let sum = 0;
    for (let i = pointers.start; i <= pointers.end; i++) {
      sum += array[i];
    }
    return sum;
  };

  return (
    <Card className="border-border bg-card text-card-foreground w-full p-6 shadow-md">
      <p className="text-center text-lg font-semibold sm:text-xl">
        Sliding Window Technique: Maximum Sum Subarray
      </p>
      <div className="space-y-12">
        <div className="mb-8">
          <p className="text-muted-foreground mb-4 text-center">
            Finding the maximum sum subarray of size {windowSize} in the array
            below
          </p>

          <ArrayVisualizer array={array} pointerConfigs={getPointerConfigs()} />
        </div>

        <div className="bg-muted/30 border-border min-h-[100px] rounded-md border p-4 text-center">
          {currentStep === -1 ? (
            <p className="text-muted-foreground italic">
              Press play to start the algorithm
            </p>
          ) : (
            <div>
              <div className="mb-2 flex items-center justify-center gap-4">
                <div className="bg-primary/20 border-primary rounded-md border px-2 py-1">
                  Window Sum = {getCurrentWindowSum()}
                </div>
              </div>
              <p
                className={cn("mt-2 font-medium", {
                  "text-green-500": currentStepData?.isSuccess,
                  "text-foreground": !currentStepData?.isSuccess,
                })}
              >
                {currentStepData?.action}
              </p>
            </div>
          )}

          {isFinished && maxSum !== null && maxSumIndices !== null && (
            <div className="mt-3 font-medium text-green-500">
              Maximum sum: {maxSum} found between indices {maxSumIndices.start}{" "}
              and {maxSumIndices.end}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>

          {isPlaying ? (
            <Button
              size="sm"
              onClick={handlePause}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handlePlay}
              className="flex items-center gap-1"
              disabled={isFinished && currentStep === steps.length - 1}
            >
              <Play className="h-4 w-4" />
              {currentStep === -1 || currentStep === steps.length - 1
                ? "Start"
                : "Continue"}
            </Button>
          )}

          <div className="ml-4 flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Speed:</span>
            <select
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="border-border bg-card rounded-md border px-2 py-1 text-sm"
            >
              <option value={2000}>Slow</option>
              <option value={1000}>Normal</option>
              <option value={500}>Fast</option>
            </select>
          </div>
        </div>

        <div className="bg-muted h-2.5 w-full rounded-full">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${currentStep >= 0 ? ((currentStep + 1) / steps.length) * 100 : 0}%`,
            }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default SlidingWindowVisualizer;
