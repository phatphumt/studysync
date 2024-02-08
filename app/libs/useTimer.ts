import { useState, useEffect } from "react";
import useIsMount from "./useIsMount";

export default function usePomodoroTimer(
  workMinutes: number,
  breakMinutes: number,
  cyclesBeforePrompt: number
) {
  const [time, setTime] = useState(workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workCount, setWorkCount] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const isMount = useIsMount();

  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(workMinutes * 60);
  };

  const start = () => setIsActive(true);

  const getFormattedString = () => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: any;

    if (time <= 0) {
      setIsActive(false);
      if (!isBreak) {
        setIsBreak(true);
        setTime(breakMinutes * 60);
        setWorkCount((prevCount) => prevCount + 1);
      } else {
        setIsBreak(false);
        setTime(workMinutes * 60);
        setBreakCount((prevCount) => prevCount + 1);
        setCycleCount((prevCount) => prevCount + 1);
        if (cycleCount >= cyclesBeforePrompt) {
          setShowContinuePrompt(true);
        }
      }
    }

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    time,
    isActive,
    isBreak,
    workMinutes,
    breakMinutes,
    cyclesBeforePrompt,
    cycleCount,
  ]);

  useEffect(() => {
    if (!isActive && !isMount) {
      if (isBreak) {
        setBreakCount((prevCount) => prevCount + 1);
      } else {
        setWorkCount((prevCount) => prevCount + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isBreak]);

  const handleContinue = () => {
    setShowContinuePrompt(false);
    setCycleCount(0);
    start();
  };

  const handleCancel = () => {
    setShowContinuePrompt(false);
    reset();
  };

  return {
    time,
    isActive,
    isBreak,
    start,
    reset,
    getFormattedString,
    workCount,
    breakCount,
    showContinuePrompt,
    handleContinue,
    handleCancel,
  };
}
