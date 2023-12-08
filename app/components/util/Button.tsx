'use client';
import React from 'react';

type Props = {
	className?: string;
	children: React.ReactNode;
	disabled?: boolean | false
};

const Button = ({ className, children, disabled }: Props) => {
	return <button className={'btn ' + className} disabled={disabled}>{children}</button>;
};

export default Button;
