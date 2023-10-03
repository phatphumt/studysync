import Link from 'next/link';
import React from 'react';

const NotFound = () => {
	return (
		<div className="h-[90vh] flex justify-center items-center flex-col gap-3">
			<h1 className="text-5xl font-bold">PAGE NOT FOUND</h1>
			<Link href="/">
				<button className="btn">Go back {'<<'}</button>
			</Link>
		</div>
	);
};

export default NotFound;
