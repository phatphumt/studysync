'use client';
import React, { useEffect } from 'react';
import { useAuth } from '../SessionProvider';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
	const user = useAuth();
	useEffect(() => {
		if (user?.user === null) {
			redirect('/login');
		}
	}, [user?.user]);
	return (
		<>
			<div className="m-10">
				hello, {user?.user?.email}
				<p>Dashboard is WIP</p>
				<p className="text-lg font-bold">Features: </p>
				<ul className="list-disc mx-5">
					<li>
						<Link href="/flashcard">Flashcard</Link>
					</li>
					<li>
						<Link href="/timer">Timer</Link>
					</li>
					<li>
						<Link href="/timer">Quiz</Link>
					</li>
				</ul>
			</div>
		</>
	);
}

Dashboard.requireAuth = true;
