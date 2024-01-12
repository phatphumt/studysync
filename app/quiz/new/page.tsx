import Link from "next/link";

export default function CreateQuiz() {
    return (
        <div className="p-8">
            <Link href="/quiz/new/ai">AI</Link><br />
            <Link href={"/quiz/new/human"}>Human</Link>
        </div>
    )
}