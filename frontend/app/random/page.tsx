'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../components/util/Button';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '../config/firebase';
import { useAuth } from '../SessionProvider';

type Item = {
	answer: string;
	owner: string;
	question: string;
	id: string;
};

const Test = () => {
	const db = getFirestore(app);
	const users = useAuth();
	const [data, setData] = useState<null | Item[]>(null);

	useEffect(() => {
		getDocs(collection(db, 'flashcards')).then((r) => {
			r.forEach((data) => {
				setData((prev) => {
					if (prev === null) {
						return [{ ...data.data(), id: data.id }];
					}
					return [...prev, { ...data.data(), id: data.id }];
				} as Item[] | null);
			});
		});
	}, [db]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(stuff);
		try {
			const docRef = await addDoc(collection(db, 'flashcards'), {
				question: 'hello world',
				answer: 'asddxx',
				owner: `${users?.user?.uid}`,
			});
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	const [stuff, setStuff] = useState({
		question: '',
		answer: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStuff((prev: any) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const getAllusers = async () => {
		console.log(data);
	};

	return (
		<>
			<form action="" className="flex flex-col w-max" onSubmit={handleSubmit}>
				<input
					type="text"
					name="question"
					id="question"
					placeholder="question"
					className="input input-bordered input-primary w-full max-w-xs"
					onChange={handleChange}
				/>
				<input
					type="text"
					name="answer"
					id="answer"
					placeholder="answer"
					className="input input-bordered input-primary w-full max-w-xs"
					onChange={handleChange}
				/>
				<Button>add</Button>
			</form>
			<div onClick={getAllusers}>
				<Button>All</Button>
			</div>
		</>
	);
};

export default Test;
