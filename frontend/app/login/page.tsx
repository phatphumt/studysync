'use client';
import React, { useState } from 'react';
import Button from '../components/util/Button';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

type UserCreds = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const [credential, setCredential] = useState<UserCreds>({
		email: '',
		password: '',
	});

	const handleSignin = (e: React.FormEvent, { email, password }: UserCreds) => {
		e.preventDefault();
		console.log(email, password);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential.user.email);
			})
			.catch((error: any) => {
				console.error(error);
			});
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
