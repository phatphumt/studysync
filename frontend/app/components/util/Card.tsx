'use client';
import React from 'react';

type Props = {
	children: React.ReactNode;
	title: string;
	className?: string;
};

const Card = ({ children, title, className }: Props) => {
	return (
		<div className={'card ' + className}>
			<div className="card-body">
				<h2 className="card-title text-2xl">{title}</h2>
				{children}
			</div>
		</div>
	);
};

export default Card;
