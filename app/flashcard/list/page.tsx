import Flashcard from "@/app/models/FlashcardSchema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connect } from "mongoose";
import { redirect } from "next/navigation";
import FlashcardList from "./FlashcardList";

export type Data = {
  _id: string;
  name: string;
  owner: string;
  flashcards: [];
  createdAt: string;
  updatedAt: string;
};

const ListFlashcard = async () => {
  const { getUser } = getKindeServerSession();
  /* 
  const dt: any = [];

  async function getFromDB() {
    console.log("getting from db");
  }

  async function deleteData(id: string) {
    console.log("deleting", id);
  }
 */
  const user = await getUser();
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    redirect("/flashcard/list");
  }
  const data: Data[] = await Flashcard.find({ owner: user?.id }).sort({
    createdAt: "desc",
  });
  console.log(data);
  return (
    <FlashcardList data={data}/>
  );
};

export default ListFlashcard;
