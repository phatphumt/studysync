'use client';
import React, { useEffect } from 'react';
import Button from '../components/util/Button';
import { useAuth } from '../SessionProvider';
import { redirect } from 'next/navigation';

export default function Dashboard() {
	const user = useAuth();
	useEffect(() => {
		if (user?.user === null) {
			redirect('/login');
		}
	}, [user?.user]);
	return (
		<>
			<div className="m-10">hello, {user?.user?.email}</div>
			<div onClick={() => user?.logout()}>
				<Button>Sign out</Button>
			</div>
		</>
	);
}

Dashboard.requireAuth = true;