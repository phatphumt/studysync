import Flashcard from "@/app/models/FlashcardSchema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { connect } from "mongoose";

type Data = {
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
  await connect(process.env.MONGO_URI as string);
  const data: Data[] = await Flashcard.find({ owner: user?.id }).sort({
    createdAt: "desc",
  });
  console.log(data);
  return (
    <div className="p-10">
      {data.length !== 0 ? (
        data.map((i) => (
          <div key={i._id}>
            <span className="font-bold text-2xl">Flashcard ({i.name})</span>
            {"       "}
            <DeleteButton id={i._id} />
            {"  "}
            <p>
              Created At: {new Date(i.createdAt).toLocaleDateString()}{" "}
              {new Date(i.createdAt).toLocaleTimeString()}
            </p>
            <Link href={`/flashcard/history/${i._id}`}>
              View your history here
            </Link>
            <br />
            <Link
              href={`/flashcard/play/${i._id}`}
              className="text-xl font-semibold"
            >
              PLAY NOW!!!
            </Link>
            <br />
          </div>
        ))
      ) : (
        <p>You have no flashcards</p>
      )}
    </div>
  );
};

export default ListFlashcard;
