'use client';

import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '../SessionProvider';

type Props = {
	children: React.ReactNode;
};

const Preloader = ({ children }: Props) => {
	const auth = useAuth();
	return (
		<>
			{auth?.loading ? (
				<div className="h-screen flex justify-center items-center">
					<span className="loading loading-dots loading-lg"></span>
				</div>
			) : (
				<>
					<Navbar />
					{children}
				</>
			)}
		</>
	);
};

export default Preloader;
