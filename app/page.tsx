import Button from "./components/util/Button";
import "material-icons/iconfont/material-icons.css";
import AboutContent from "./components/AboutContent";
import Link from "next/link";

type Items = {
  title: string;
  icon: string;
  desc: string[];
};

const Home = () => {
  const items: Items[] = [
    {
      title: "เรียน",
      icon: "local_library",
      desc: ["เพิ่มโฟกัสด้วย", "Pomodoro Technique"],
    },
    {
      title: "ทบทวน",
      icon: "rate_review",
      desc: ["ทบทวนโดยการใช้", "Flashcard หรือ Quiz", "ที่สร้างขึ้นโดย AI"],
    },
  ];

  return (
    <>
      <main className="h-[90vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mt-10 mb-10">
          StudySync คืออะไร
        </h1>
        <div className="flex flex-col justify-center items-center w-screen bg-gray-200 pb-4 sm:flex-row sm:justify-evenly">
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
          <Button className="mt-10 text-lg btn-lg text-center">
            รออะไรอยู่ล่ะ เริ่มเลย
          </Button>
        </Link>
      </main>
    </>
  );
};

export default Home;
