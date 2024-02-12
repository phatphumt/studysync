"use client";

import { useEffect, useRef, useState } from "react";
import { uid } from "uid";
import usePomodoroTimer from "../libs/useTimer";

export default function Timer() {
  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
    });

    return () => {
      window.removeEventListener("beforeunload", (e) => {
        e.preventDefault();
      });
    };
  }, []);

  const [todo, setTodo] = useState<string[]>([]);
  const [completedTodo, setCompletedTodo] = useState<string[]>([]);
  const [text, setText] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);
  const { isActive, start, getFormattedString, isBreak, done } =
    usePomodoroTimer(0.1, 0.05, 4);

  useEffect(() => {
    if (done) {
      modalRef.current?.showModal();
    }
  }, [done]);
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
                className="hover:italic select-none cursor-pointer hover:line-through hover:text-red-600 w-full"
              >
                <div
                  className="tooltip"
                  data-tip="click to mark as done"
                  onClick={() => {
                    setTodo((prev) => prev.filter((e) => e !== el));
                    setCompletedTodo((prev) => [...prev, el]);
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

        {!isActive ? (
          done ? (
            <div className="flex space-x-2 mx-2">
              <button
                className="btn btn-sm"
                onClick={() => start()}
                disabled={isActive}
              >
                start
              </button>
              <button className="btn btn-sm">done</button>
            </div>
          ) : (
            <button
              className="btn btn-sm mx-2"
              onClick={() => start()}
              disabled={isActive}
            >
              start
            </button>
          )
        ) : null}
        {isBreak ? <p>Break time yay</p> : <p>Get back to work</p>}
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">You{"'"}re done</h3>
          <div className="py-4">
            <p className="font-semibold text-lg">
              Wanna continue to another session?
            </p>
            <p>things you have done:</p>
            <ul className="h-[5rem] overflow-y-scroll">
              {completedTodo.map((el) => (
                <li key={uid(2)}>- {el}</li>
              ))}
            </ul>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex space-x-2">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-md"
                type="button"
                onClick={() => {
                  modalRef.current?.close();
                  start();
                }}
              >
                Yes gimme more
              </button>
              <button className="btn btn-md" type="button">
                Ahh im done
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
