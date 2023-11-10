import Link from 'next/link';
import Button from './components/util/Button';
import 'material-icons/iconfont/material-icons.css';
import AboutContent from './components/AboutContent';

type Items = {
	title: string;
	icon: string;
	desc: string[];
};

const Home = () => {
	const items: Items[] = [
		{
			title: 'วางแผน',
			icon: 'assignment',
			desc: ['วางแผนการเรียนด้วย', 'To-Do list ของเรา'],
		},
		{
			title: 'เรียน',
			icon: 'local_library',
			desc: ['เพิ่มโฟกัสด้วย', 'Pomodoro Technique'],
		},
		{
			title: 'ทบทวน',
			icon: 'rate_review',
			desc: ['ทบทวนโดยการใช้', 'Flashcard หรือ Quiz', 'ที่สร้างขึ้นโดย AI'],
		},
	];

	return (
		<>
			<main className="h-[90vh] flex justify-center items-center flex-col">
				<h1 className="text-5xl font-bold text-center mb-10">
					StudySync คืออะไร
				</h1>
				<div className="flex justify-evenly w-screen bg-gray-200 h-2/4">
					{items.map((i, ii) => (
						<AboutContent
							icon={i.icon}
							desc={i.desc}
							title={i.title}
							key={ii}
						/>
					))}
				</div>
				<Link href="/dashboard">
					<Button className="mt-10 text-lg btn-lg">
						รออะไรอยู่ล่ะ เริ่มเลย
					</Button>
				</Link>
			</main>
		</>
	);
};

export default Home;
