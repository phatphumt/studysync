import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../../../config/firebase'
import FlashcardPlayer from './FlashcardPlayer';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Data = {
  owner: string,
  createdAt:
  { seconds: number, nanoseconds: number },
  flashcards: [
    { answer: string, question: string, id: string },
  ],
  name: string,
}

const PlayFlashcard = async ({ params }: { params: { id: string } }) => {
  const initialCatData = await fetch("https://api.thecatapi.com/v1/images/search", { cache: 'no-store' });
  const catImg: { id: string, url: string, width: number, height: number }[] = await initialCatData.json();
  const docc = doc(db, "flashcards", params.id);
  const data = await getDoc(docc)
  const as: Data = (data.data() as Data)
  return (
    <div className='flex justify-center items-center h-[91vh] flex-col'>
      <h1 className="font-semibold text-3xl">start now!!!</h1>
      <p>Flashcard name: {as.name}</p>
      <p className='pb-3'># of questions: {as.flashcards.length}</p>
      {catImg.map(i => {
        return <Image className='pb-3' src={i.url} key={i.id} width={i.width / 3} height={i.height / 3} alt='cat imgs' />
      })}
      <Link href={{
        pathname: `/flashcard/play/${params.id}/${as.flashcards[0].id}`,
        query: {
          flashcardID: params.id
        }
      }
      } >
        <button className='btn btn-primary btn-outline'>Start now</button>
      </Link>
    </div>
  )
}

export default PlayFlashcard