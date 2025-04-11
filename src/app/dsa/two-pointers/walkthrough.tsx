"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Pause, Play, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";

const array = [1, 2, 3, 4, 6]; // Ensure this array is sorted
const target = 6;

export const PointerVisualizer: React.FC = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [steps, setSteps] = useState<
    { left: number; right: number; sum: number; action: string }[]
  >([]);
  const [found, setFound] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [speed, setSpeed] = useState(1000);

  // Calculate all steps at the beginning
  useEffect(() => {
    const calculateSteps = () => {
      const newSteps: {
        left: number;
        right: number;
        sum: number;
        action: string;
      }[] = [];
      let l = 0;
      let r = array.length - 1;
      let foundSolution = false;

      while (l < r) {
        const sum = array[l] + array[r];
        let action = "";

        if (sum === target) {
          action = "Found target!";
          newSteps.push({ left: l, right: r, sum, action });
          foundSolution = true;
        } else if (sum < target) {
          action = "Sum too small, moving left pointer right";
          newSteps.push({ left: l, right: r, sum, action });
          l += 1;
        } else {
          action = "Sum too large, moving right pointer left";
          newSteps.push({ left: l, right: r, sum, action });
          r -= 1;
        }

        // If we found the solution, we can break out of the loop
        if (foundSolution) {
          break;
        }
      }

      setSteps(newSteps);
      setFound(foundSolution);
    };

    calculateSteps();
    setLeft(0);
    setRight(array.length - 1);
    setCurrentStep(-1);
    setIsFinished(false);
    setFound(false);
  }, []);

  // Animation control
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStep < steps.length - 1 && !isFinished) {
      timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);

        // Update pointers based on step data
        const step = steps[nextStep];
        setLeft(step.left);
        setRight(step.right);

        // Check if we found the target
        if (step.sum === target) {
          setFound(true);
          setIsPlaying(false);
          setIsFinished(true);
        }

        // Check if we've reached the end
        if (nextStep === steps.length - 1) {
          setIsPlaying(false);
          setIsFinished(true);
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed, isFinished]);

  const handlePlay = () => {
    if (currentStep === steps.length - 1) {
      // If at the end, reset and play
      handleReset();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStep(-1);
    setLeft(0);
    setRight(array.length - 1);
    setIsPlaying(false);
    setIsFinished(false);
    setFound(false);
  };

  return (
    <Card className="border-border bg-card text-card-foreground w-full p-6 shadow-md">
      <p className="text-center text-lg font-semibold sm:text-xl">
        Two-Pointer Technique Visualization{" "}
      </p>
      <div className="space-y-8">
        {/* Array visualization */}
        <div className="flex justify-center">
          {array.map((num, index) => (
            <div
              key={index}
              className={`relative m-1 flex h-12 w-12 items-center justify-center ${
                index === left && index === right
                  ? "border-2 border-purple-500 bg-purple-900/30"
                  : index === left
                    ? "border-2 border-blue-500 bg-blue-900/30"
                    : index === right
                      ? "border-2 border-red-500 bg-red-900/30"
                      : "bg-muted border-border border"
              } rounded-md transition-all duration-300`}
            >
              {num}
              {index === left && (
                <div className="absolute -bottom-8 flex items-center text-xs font-medium text-blue-500">
                  <ArrowLeft className="h-4 w-4" />
                  <span>left</span>
                </div>
              )}
              {index === right && (
                <div className="absolute -bottom-8 flex items-center text-xs font-medium text-red-500">
                  <span>right</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current step explanation */}
        <div className="bg-muted/30 border-border min-h-[100px] rounded-md border p-4 text-center">
          {currentStep === -1 ? (
            <p className="text-muted-foreground italic">
              Press play to start the algorithm
            </p>
          ) : (
            <div>
              <div className="mb-2 flex items-center justify-center gap-4">
                <div className="rounded-md border border-blue-500 bg-blue-900/30 px-2 py-1">
                  array[left] = {array[left]}
                </div>
                <span>+</span>
                <div className="rounded-md border border-red-500 bg-red-900/30 px-2 py-1">
                  array[right] = {array[right]}
                </div>
                <span>=</span>
                <div
                  className={`${steps[currentStep].sum === target ? "border-green-500 bg-green-900/30" : "bg-muted/50 border-muted"} rounded-md border px-3 py-1 font-medium`}
                >
                  {steps[currentStep].sum}
                </div>
              </div>
              <p
                className={`mt-2 font-medium ${steps[currentStep].sum === target ? "text-green-500" : "text-foreground"}`}
              >
                {steps[currentStep].action}
              </p>
            </div>
          )}

          {found && (
            <div className="mt-3 font-medium text-green-500">
              Target {target} found! Sum of {array[left]} and {array[right]}{" "}
              equals {target}.
            </div>
          )}

          {isFinished && !found && (
            <div className="mt-3 font-medium text-red-500">
              Target {target} not found in the array.
            </div>
          )}
        </div>

        {/* Controls */}
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

          {/* Speed control */}
          <div className="ml-4 flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Speed:</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border-border bg-card rounded-md border px-2 py-1 text-sm"
            >
              <option value={2000}>Slow</option>
              <option value={1000}>Normal</option>
              <option value={500}>Fast</option>
            </select>
          </div>
        </div>

        {/* Progress indicator */}
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

export default PointerVisualizer;
