/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	User,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import app from './config/firebase';

type Props = {
	children: React.ReactNode;
};

const AuthContext = createContext<
	| undefined
	| {
			signIn: (email: string, password: string) => Promise<void>;
			logout: () => void;
			user: User | null;
	  }
>(undefined);

const SessionProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);

	const signIn = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(getAuth(app), email, password);
		} catch (e) {
			throw new Error(`sign in failed: ${e}`);
		}
	};

	const logout = () => {
		signOut(getAuth(app));
	};

	useEffect(() => {
		const unsub = onAuthStateChanged(getAuth(app), (currentUser) => {
			setUser(currentUser);
		});

		return unsub;
	}, [user]);

	return (
		<AuthContext.Provider value={{ signIn, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export default SessionProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
