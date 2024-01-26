import { useState, useEffect } from "react";

export default function useTimer(minutes: number) {
  const [time, setTime] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const reset = () => {
    setIsActive(false);
    setTime(minutes * 60);
  };

  const getFormattedString = () => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const start = () => setIsActive(true);

  useEffect(() => {
    let interval = undefined;

    if (time < 1) setIsDone(true);

    if (time > 0 && isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, isActive]);

  return {
    time,
    isActive,
    isDone,
    start,
    reset,
    getFormattedString,
  };
}
