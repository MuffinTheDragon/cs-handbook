import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import React from "react";

interface AnimationControllerProps {
  isPlaying: boolean;
  handlePlay: () => void;
  handlePause: () => void;
  handleReset: () => void;
  handleStepForward: () => void;
  handleStepBackward: () => void;
  handleSpeedChange: (value: number[]) => void;
  speed: number;
  disabled: boolean;
}

export const AnimationController: React.FC<AnimationControllerProps> = ({
  isPlaying,
  handlePlay,
  handlePause,
  handleReset,
  handleStepForward,
  handleStepBackward,
  handleSpeedChange,
  speed,
  disabled,
}) => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleStepBackward}
          disabled={disabled}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {isPlaying ? (
          <Button variant="outline" onClick={handlePause} disabled={disabled}>
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        ) : (
          <Button variant="default" onClick={handlePlay} disabled={disabled}>
            <Play className="mr-2 h-4 w-4" />
            Play
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={handleStepForward}
          disabled={disabled}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button variant="outline" onClick={handleReset} disabled={disabled}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="w-full space-y-2">
        <div className="text-muted-foreground flex justify-between text-sm">
          <span>Slow</span>
          <span>Animation Speed</span>
          <span>Fast</span>
        </div>
        <Slider
          defaultValue={[1000 - speed]}
          max={900}
          min={100}
          step={100}
          onValueChange={handleSpeedChange}
        />
      </div>
    </div>
  );
};
