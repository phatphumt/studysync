'use client';
import Link from 'next/link';
import React from 'react';
import { useAuth } from '../SessionProvider';

const Navbar = () => {
	const user = useAuth();
	return (
		<div className="navbar bg-base-200">
			<div className="flex-1">
				<span className="btn btn-ghost normal-case text-2xl">
					<Link href="/">StudySync</Link>
				</span>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1 text-lg">
					<li>
						<Link href="/dashboard">Dashboard</Link>
					</li>
					<li>
						{user?.user === null ? (
							<Link href="/login">Login</Link>
						) : (
							<Link href="/dashboard">{user?.user.email}</Link>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
