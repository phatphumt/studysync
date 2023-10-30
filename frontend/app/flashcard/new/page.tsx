'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const NewFlashcard = () => {
	const r = useRouter()
	return <div className='p-10'>
		<button className='btn font-bold' onClick={() => r.push('/flashcard/new/ai')}>AI</button>
	</div>;
};

export default NewFlashcard;
