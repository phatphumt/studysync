"use client"
import Link from 'next/link'
import React, { useState } from 'react'

type Props = { answer: string, question: string, id: string, isLast: boolean, flashcardID: string, next: string}

const FlashcardPlayer = ({ question, answer, isLast, flashcardID, next }: Props) => {
  const [flipped, setFlipped] = useState(false)
  return (
    <>
      <label className={!flipped ? "swap swap-flip" : "swap swap-active swap-flip"}>
        <div className="swap-off">
          <p className='text-3xl'>{question}</p>
          <button className='text-xl' onClick={() => setFlipped(prev => !prev)} type='button'>🔄</button>
        </div>
        <div className="swap-on">
          <p className='text-3xl'>{answer}</p>
          <button className='btn btn-xs btn-info mr-3' type='button'>correct</button>
          <button className='btn btn-xs btn-warning mr-3' type='button'>wrong</button>
          <button className='text-xl' onClick={() => setFlipped(prev => !prev)} type='button'>🔄</button>
        </div>
      </label>
    </>
  )
}

export default FlashcardPlayer