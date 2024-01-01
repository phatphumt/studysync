import { data } from "autoprefixer";
import Link from "next/link";

const ListFlashcard = () => {
  const dt: any = [];

  async function getFromDB() {
    console.log("getting from db");
  }

  async function deleteData(id: string) {
    console.log("deleting", id);
  }

  return (
    <div className="p-10">
      {dt ? (
        dt.map((i: any) => (
          <div key={i.id}>
            <span className="font-bold text-2xl">Flashcard ({i.name})</span>
            {"       "}
            <span
              className="text-red-600 font-bold cursor-pointer select-none"
              onClick={() => deleteData(i.id)}
            >
              del{"  "}
            </span>
            |
            <Link
              className="text-green-700 font-bold cursor-pointer select-none"
              href={`/flashcard/edit/${i.id}`}
            >
              {"  "}edit{"  "}
            </Link>
            <br />
            <span>
              Created at:
              {"  "}
              {new Date(i.createdAt.seconds * 1000).toLocaleDateString()}
              {"  "}
              {new Date(i.createdAt.seconds * 1000).toLocaleTimeString()}
            </span>
            <br />
            <Link
              href={`/flashcard/play/${i.id}`}
              className="text-xl font-semibold"
            >
              PLAY NOW!!!
            </Link>
          </div>
        ))
      ) : data === null ? (
        <p>loading...</p>
      ) : (
        <p>You have no flashcards</p>
      )}
    </div>
  );
};

export default ListFlashcard;
