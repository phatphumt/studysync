'use client';
import Link from 'next/link';
import React from 'react';
import { useAuth } from '../SessionProvider';
import { redirect } from 'next/navigation';

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
							<details>
								<summary>
									<Link href="/dashboard">{user?.user.email}</Link>
								</summary>
								<ul className="p-2 bg-base-100">
									<li
										onClick={() => {
											user?.logout();
											redirect('/login');
										}}
									>
										<Link href={''}>Sign Out</Link>
									</li>
								</ul>
							</details>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
