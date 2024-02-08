"use client";

import { useEffect, useRef, useState } from "react";
import useTimer from "../libs/useTimer";

export default function Timer({ allowed }: { allowed: boolean }) {
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
  const [text, setText] = useState("")

  const time = allowed ? 0.1 : 25
  const { isActive, start, getFormattedString, getCount } = useTimer(time);
  return (
    <div className="flex flex-row w-screen justify-evenly">
      <div className="flex justify-center flex-col items-center">
        <h1 className="font-bold text-2xl mb-3">Things todo:</h1>
        <form className="flex space-x-2" onSubmit={(e) => {
          e.preventDefault()
          console.log(text)
          if (!text) {
            return
          }
          setTodo(prev => [...prev, text])
          setText("")
        }}>
          <input type="text" value={text} onChange={(e) => { console.log(e.target.value); setText(e.target.value) }} className="input input-bordered input-xs" />
          <button className="btn btn-xs">
            add
          </button>
        </form>
        <div className="flex flex-col mt-2">
          <ul className="text-center">
            {todo.map(el =>
              <div className="tooltip" data-tip="click to mark as done" onClick={() => {
                setTodo((prev) => prev.filter(e => e !== el))
              }}>
                <li className="hover:italic select-none cursor-pointer hover:line-through hover:text-red-600">
                  {el}
                </li>
              </div>)}
          </ul>
        </div>
      </div>
      <div className="p-8 flex flex-col justify-center items-center h-[90vh]">
        <h1 className="font-semibold text-3xl">{getFormattedString()}</h1>
        <p>count: {getCount()}</p>
        {!isActive && <button
          className="btn btn-sm"
          onClick={() => start()}
          disabled={isActive}
        >
          start
        </button>}
      </div>
    </div>
  );
}
