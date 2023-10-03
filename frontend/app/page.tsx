type Flashcard = {
	_id: string;
	question: string;
	answer: string;
};

async function fetchData() {
	const data = await fetch('http://localhost:4000/flashcard');
	const json = await data.json();
	return json;
}

const Home = async () => {
	const flashcards: Flashcard[] = await fetchData();
	console.log(flashcards);
	return (
		<main>
			{flashcards.map(({ _id, answer, question }) => (
				<div key={_id} className="border-b-2 mb-3 pb-3 w-max">
					<div>Question: {question}</div>
					<div>Answer: {answer}</div>
				</div>
			))}
		</main>
	);
};

export default Home;
