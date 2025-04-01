import { useEffect, useState } from "react";

export interface AnimationStep {
  pointers: Record<string, number>;
  result?: any;
  action: string;
  isSuccess?: boolean;
}

interface UseAlgorithmAnimationProps {
  steps: AnimationStep[];
  initialPointers: Record<string, number>;
  speed?: number;
}

export const useAlgorithmAnimation = ({
  steps,
  initialPointers,
  speed = 1000,
}: UseAlgorithmAnimationProps) => {
  const [pointers, setPointers] =
    useState<Record<string, number>>(initialPointers);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(speed);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStep < steps.length - 1 && !isFinished) {
      timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);

        const step = steps[nextStep];
        setPointers(step.pointers);

        if (nextStep === steps.length - 1) {
          setIsPlaying(false);
          setIsFinished(true);
        }
      }, animationSpeed);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, animationSpeed, isFinished]);

  const handlePlay = () => {
    if (currentStep === steps.length - 1) {
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
    setPointers(initialPointers);
    setIsPlaying(false);
    setIsFinished(false);
  };

  return {
    pointers,
    currentStep,
    isPlaying,
    isFinished,
    animationSpeed,
    setAnimationSpeed,
    handlePlay,
    handlePause,
    handleReset,
    currentStepData: currentStep >= 0 ? steps[currentStep] : null,
  };
};
