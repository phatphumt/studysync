import FlashcardPlayer from "./FlashcardPlayer";

const FlashcardPlayerPage = ({ params }: { params: { idf: string } }) => {
  // console.log(searchParams.flashcardID);
  /*const flashcardID = localStorage.getItem("id");

  useEffect(() => {
    async function doit() {
      const docc = doc(db, "flashcards");
      const data = await getDoc(docc);
      setData(data.data() as Data);
      console.log(data.data());
    }
    doit();
  }, []); */

  /* 
    searchParams: {
      flashcardID: string;
      sessionID: string;
      correct: string;
      wrong: string;
    };
  */

  return (
    <div className="p-6 flex flex-col gap-3 justify-center items-center">
      <FlashcardPlayer currentID={params.idf} />
      {/* {isLast ? (
        <div>
          <Link
            href={{
              pathname: `/flashcard/play/${searchParams.flashcardID}/${
                as.flashcards[next + 1].id
              }`,
              query: {
                flashcardID: searchParams.flashcardID,
                correct: 0,
                wrong: 0,
                sessionID: searchParams.sessionID,
              },
            }}
          >
            Next
          </Link>
        </div>
      ) : (
        <Link href={"/flashcard/summary/012"}>Summary</Link>
      )} */}
    </div>
  );
};

export default FlashcardPlayerPage;
