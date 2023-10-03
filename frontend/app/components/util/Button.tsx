'use client';
import React from 'react';

type Props = {
	className?: string;
	children: React.ReactNode;
};

const Button = ({ className, children }: Props) => {
	return <button className={'btn ' + className}>{children}</button>;
};

export default Button;
