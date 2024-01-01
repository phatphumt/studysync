"use client";
import Link from "next/link";
import * as uuid from "uid";

/* type Data = {
  flashcards: { answer: string; question: string; id: string }[];
  owner: string;
  name: string;
  createdAt: { seconds: number; nanoseconds: number };
};
 */
const CallToDB = ({ id }: { id: string; next: any }) => {
  const sessionID = uuid.uid(15);
  async function click() {
    /* const docData = {
      owner: null,
      timePlayed: serverTimestamp(),
      flashcard: id,
    }; */
    /* await setDoc(doc(db, "flashcards-stats", sessionID), docData);

    const docc = doc(db, "flashcards", id);
    const dataa = await getDoc(docc);
    const theFlashcards = dataa.data() as Data;
    const localStorageData = theFlashcards.flashcards; */
    const data = {
      sessionID,
      correct: 0,
      wrong: 0,
      flashcards: undefined,
      id,
    };
    localStorage.setItem("hello", JSON.stringify(data));
  }
  return (
    <>
      <Link href={`/flashcard/play/${id}/${"a"}`}>
        <button className="btn btn-primary btn-outline" onClick={click}>
          add
        </button>
      </Link>
    </>
  );
};

export default CallToDB;
