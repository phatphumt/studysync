import React from 'react'
import {doc, collection, getDocs, getFirestore, getDoc} from 'firebase/firestore'
import { db } from "../../../config/firebase";
import FlashcardEditor from './FlashcardEditor';

type Data = {
  owner: string,
  createdAt:
  { seconds: number, nanoseconds: number },
  flashcards: [
    { answer: string, question: string, id: string },
  ],
  name: string,
}

const EditPage = async ({ params }: { params: { id: string } }) => {
  const docc = doc(db, "flashcards", params.id);
  const data = await getDoc(docc)
  const {createdAt, flashcards, name, owner}: Data = (data.data() as Data)
  return (
    <>
      <FlashcardEditor createdAt={createdAt} flashcards={flashcards} name={name} owner={owner}/>
    </>
  )
}

export default EditPage
