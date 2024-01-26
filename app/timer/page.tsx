"use client";

import useTimer from "../libs/useTimer";

export default function TimerPage() {
  const { isActive, start, getFormattedString, isDone } = useTimer(2);
  return (
    <div className="p-8">
      <h1 className="font-semibold text-xl">{getFormattedString()}</h1>
      <p>{isDone ? "doneed" : "not onde"}</p>
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
