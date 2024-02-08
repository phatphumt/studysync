"use client";

import { useState } from "react";
import { uid } from "uid";
import usePomodoroTimer from "../libs/useTimer";

export default function Timer() {
  // useEffect(() => {
  //   window.addEventListener('beforeunload', e => {
  //     if (confirm('leave?')) {
  //       return
  //     }
  //     e.preventDefault()
  //   })

  //   return () => {
  //     window.removeEventListener('beforeunload', (e) => {
  //       if (confirm('leave?')) {
  //         return
  //       }
  //       e.preventDefault()
  //     })
  //   }
  // }, [])

  const [todo, setTodo] = useState<string[]>([]);
  const [text, setText] = useState("");

  const { isActive, start, getFormattedString, isBreak, showContinuePrompt } =
    usePomodoroTimer(0.5, 0.1, 4);
  return (
    <div className="flex flex-row w-screen justify-evenly">
      <div className="flex justify-center flex-col items-center">
        <h1 className="font-bold text-2xl mb-3">Things todo:</h1>
        <form
          className="flex space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(text);
            if (!text) {
              return;
            }
            setTodo((prev) => [...prev, text]);
            setText("");
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => {
              console.log(e.target.value);
              setText(e.target.value);
            }}
            className="input input-bordered input-xs"
          />
          <button className="btn btn-xs">add</button>
        </form>
        <div className="flex flex-col mt-2">
          <ul className="text-center">
            {todo.map((el) => (
              <li
                key={uid(2)}
                className="hover:italic select-none cursor-pointer hover:line-through hover:text-red-600"
              >
                <div
                  className="tooltip"
                  data-tip="click to mark as done"
                  onClick={() => {
                    setTodo((prev) => prev.filter((e) => e !== el));
                  }}
                >
                  {el}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-8 flex flex-col justify-center items-center h-[90vh]">
        <h1 className="font-semibold text-3xl">{getFormattedString()}</h1>
        {!isActive && (
          <button
            className="btn btn-sm"
            onClick={() => start()}
            disabled={isActive}
          >
            start
          </button>
        )}
        {isBreak ? <p>Break time yay</p> : <p>Get back to work</p>}
        {showContinuePrompt ? <p>yay</p> : <p>nah</p>}
      </div>
    </div>
  );
}
