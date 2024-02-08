import { useState, useEffect } from "react";
import useIsMount from "./useIsMount";

export default function useTimer(minutes: number) {
  const [time, setTime] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0)
  const reset = () => {
    setIsActive(false);
    setTime(minutes * 60);
  };
  const isMount = useIsMount()

  const getFormattedString = () => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getCount = () => count;

  const start = () => setIsActive(true);

  useEffect(() => {
    let interval: any = undefined;

    if (time < 1) {
      setIsActive(false);
    }

    if (time > 0 && isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, isActive, minutes]);
  
  useEffect(() => {
    if (!isActive && !isMount) {
      setCount(prev => {
        return prev + 1
      })
      setTime(2)
    }
  }, [isActive])

  return {
    time,
    isActive,
    start,
    reset,
    getFormattedString,
    getCount
  };
}
