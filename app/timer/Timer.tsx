"use client";

import { useEffect } from "react";
import useTimer from "../libs/useTimer";

export default function Timer({allowed}: {allowed: boolean}) {
  useEffect(() => {
    window.addEventListener('beforeunload', e => {
      if (confirm('leave?')) {
        return
      }
      e.preventDefault()
    })

    return () => {
      window.removeEventListener('beforeunload', (e) => {
        if (confirm('leave?')) {
          return
        }
        e.preventDefault()
      })
    }
  }, [])

  const time = allowed ? 0.25 : 25
  const { isActive, start, getFormattedString } = useTimer(time);
  return (
    <div className="p-8">
      <h1 className="font-semibold text-xl">{getFormattedString()}</h1>
      <button
        className="btn btn-sm"
        onClick={() => start()}
        disabled={isActive}
      >
        start
      </button>
    </div>
  );
}
