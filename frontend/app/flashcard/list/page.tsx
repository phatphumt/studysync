'use client'
import { db } from '@/app/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';

const ListFlashcard = () => {
	useEffect(() => {
		async function getFlashcard() {
			try {
				const data = await getDocs(collection(db, '/flaschards'))
				const acutualData = data.docs.map(doc => ({...doc.data(), id: doc.id}))
				console.log(acutualData)
			} catch (e) {
				console.error('error while fecting docs' + e)
			}
		}
		getFlashcard()
	}, [])
	return (
		<div className='p-10'>
			
		</div>
	);
};

export default ListFlashcard;
