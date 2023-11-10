import React from 'react';

type Props = {
	title: string;
	icon: string;
	desc: string[];
};

const AboutContent = ({ title, icon, desc }: Props) => {
	return (
		<div className="flex flex-col justify-center w-max text-center">
			<h2 className="font-semibold text-4xl my-2">{title}</h2>
			<span className="material-icons-outlined big my-2">{icon}</span>
			{desc.map((i) => (
				<p className="font-medium text-lg" key={1}>
					{i}
				</p>
			))}
		</div>
	);
};

export default AboutContent;
