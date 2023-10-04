/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-document-import-in-page */
import './globals.css';
import 'material-icons/iconfont/material-icons.css';
import type { Metadata } from 'next';
import { Anuphan } from 'next/font/google';
import React from 'react';
import Navbar from './components/Navbar';
import SessionProvider from './SessionProvider';

const kanit = Anuphan({
	subsets: ['latin', 'thai'],
});

export const metadata: Metadata = {
	title: 'StudySync',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<SessionProvider>
				<body className={kanit.className}>
					<Navbar />
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}
