'use client';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '../SessionProvider';
import { useRouter } from 'next/navigation';

const FlashcardHome = () => {
	const user = useAuth()?.user;
	const router = useRouter();
	useEffect(() => {
		if (user === null) {
			redirect('/login');
		}
	}, [user]);
	return (
		<main className="flex justify-center items-center flex-col select-none">
			<div className="flex w-screen h-[90vh] justify-center gap-10">
				<div className="w-full text-center flex justify-end items-center">
					<div
						className="bg-main text-center flex flex-col w-8/12 h-1/2 items-center justify-center gap-4 rounded-lg hover:translate-y-[-.7rem] transition-all cursor-pointer"
						onClick={() => router.push('/')}
					>
						<span className="font-semibold text-3xl">New flashcard</span>{' '}
						<span className="material-icons-outlined big">add_circle</span>
						<span>
							สร้าง Flashcard อันใหม่ <br />
							เพื่อทบทวนบทเรียนของคุณ
						</span>
					</div>
				</div>
				<div className="w-full flex justify-start items-center">
					<div
						className="bg-main text-center flex flex-col w-8/12 h-1/2 items-center justify-center gap-4 rounded-lg hover:translate-y-[-.7rem] transition-all cursor-pointer"
						onClick={() => router.push('/')}
					>
						<span className="font-semibold text-3xl">Your flashcard</span>{' '}
						<span className="material-icons-outlined big">folder_open</span>
						<span>
							สร้าง Flashcard อันใหม่ <br />
							เพื่อทบทวนบทเรียนของคุณ
						</span>
					</div>
				</div>
			</div>
		</main>
	);
};

export default FlashcardHome;