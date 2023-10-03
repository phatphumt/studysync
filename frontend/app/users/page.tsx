import Link from 'next/link';
import React from 'react';

const UserPage = () => {
	return (
		<div>
			UserPage <Link href="/users/new">new</Link>
		</div>
	);
};

export default UserPage;
