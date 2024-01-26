import { getQuizByID } from "@/app/libs/quizActions";
import Image from "next/image";
import PlayQuiz from "./PlayQuiz";

const PlayFlashcard = async ({ params }: { params: { id: string } }) => {
  const initialCatData = await fetch(
    "https://api.thecatapi.com/v1/images/search",
    { cache: "no-store" }
  );
  const catImg: { id: string; url: string; width: number; height: number }[] =
    await initialCatData.json();
  const { name, createdAt, updatedAt, quizes, owner, _id } = await getQuizByID(
    params.id as string
  );
  return (
    <div className="flex justify-center items-center h-[91vh] flex-col">
      <h1 className="font-semibold text-3xl">start now!!!</h1>
      <p>Flashcard name: {name}</p>
      <p className="pb-3"># of questions: {quizes.length}</p>
      {catImg.map((e) => (
        <Image
          src={e.url}
          alt={"cat imgs"}
          key={e.id}
          width={e.width / 3}
          height={e.height / 3}
        />
      ))}
      <div className="pb-3" />
      <PlayQuiz
        _id={_id}
        createdAt={createdAt}
        updatedAt={updatedAt}
        quizes={quizes}
        owner={owner}
        name={name}
      />
    </div>
  );
};

export default PlayFlashcard;
