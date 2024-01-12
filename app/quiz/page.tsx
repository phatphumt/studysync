import Link from "next/link";

export default function QuizHome() {
    return (
        <div className="m-6">
            <Link href={"/quiz/new"} className="mb-2">Create</Link><br />
            <Link href={"/quiz/list"}>Your Quiz</Link>
        </div>
    )
}