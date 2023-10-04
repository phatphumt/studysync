'use client';
import React, { useEffect, useState } from 'react';
import Button from '../components/util/Button';
import Link from 'next/link';
import { useAuth } from '../SessionProvider';
import { redirect } from 'next/navigation';

type UserCreds = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const [credential, setCredential] = useState<UserCreds>({
		email: '',
		password: '',
	});
	const [error, setError] = useState<null | string>(null);
	const user = useAuth();

	useEffect(() => {
		if (user?.user !== null) {
			redirect('/dashboard');
		}
	});

	const handleSignin = async (
		e: React.FormEvent,
		{ email, password }: UserCreds
	) => {
		e.preventDefault();
		console.log(credential.email[0], credential.password[0]);
		const authEmail = email[0];
		const authPassword = password[0];
		console.log(authEmail, authPassword);
		const a = await user
			?.signIn(authEmail, authPassword)
			.catch((e) => setError(e));
		if (a != null) {
			setError(a);
			return;
		}
		setError(null);
		console.log('success');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredential((prev) => {
			return { ...prev, [e.target.name]: [e.target.value] };
		});
	};

	return (
		<main className="h-[90vh] flex justify-center items-center flex-col gap-5">
			<h1 className="text-5xl font-bold text-center">Login</h1>
			<form
				className="flex flex-col gap-5 w-[80vh] items-center"
				onSubmit={(e) => handleSignin(e, credential)}
			>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="input input-bordered input-primary w-full focus:outline-none"
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="input input-bordered input-primary w-full focus:outline-none"
					onChange={handleChange}
				/>
				<Button className="btn-outline w-1/4">Login</Button>
			</form>
			{error && <p className="font-bold text-red-500">{error}</p>}
			<p>
				Don&apos;t have an account?{' '}
				<Link href="/signup" className="underline font-medium">
					Sign Up
				</Link>{' '}
				here!
			</p>
		</main>
	);
};

export default LoginPage;
