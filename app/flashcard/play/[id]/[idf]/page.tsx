import { db } from '@/app/config/firebase'
import { getDoc, doc } from 'firebase/firestore'
import Link from 'next/link'
import React from 'react'
import FlashcardPlayer from './FlashcardPlayer'

type Data = {
  flashcards: [
    { answer: string, question: string, id: string },
  ]
}

const FlashcardPlayerPage = async ({ params, searchParams }: { params: { idf: string }, searchParams: { flashcardID: string } }) => {
  console.log(searchParams.flashcardID)
  const docc = doc(db, "flashcards", searchParams.flashcardID);
  const data = await getDoc(docc)
  const as: Data = (data.data() as Data)
  const current = as.flashcards.find(i => i.id === params.idf)
  const isLast = as.flashcards.length - 1 != as.flashcards.indexOf((current as { answer: string, question: string, id: string }))
  const next = as.flashcards.findIndex(i => i.id === params.idf)
  console.log(next + 1)
  console.log(as.flashcards[next + 1])
  return (
    <div className='p-6 flex flex-col gap-3 justify-center items-center'>
      <FlashcardPlayer {...(current as { answer: string, question: string, id: string })}/>
      
      {isLast ? (
        <div>
          <Link href={{ pathname: `/flashcard/play/${searchParams.flashcardID}/${as.flashcards[next+1].id}`, query: { flashcardID: searchParams.flashcardID } }}>Next</Link>
        </div>
      ) : <Link href={'/flashcard/list'}>Back</Link>}
    </div>
  )
}

export default FlashcardPlayerPage