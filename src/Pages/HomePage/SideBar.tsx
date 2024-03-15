import { Link } from "react-router-dom";
import Follow from "./Features/Follow";

interface SidebarProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void; 
}

function SideBar({ showSideBar, setShowSideBar }: SidebarProps) {
  const topics = [
    "Programming",
    "Data Science",
    "Machine Learning",
    "Technology",
    "Politics",
    "markdown",
    "Updates",
  ];

  const handleClick = () => {
    setShowSideBar(false); 
  };

  return (
    <aside
      className={`sticky h-screen sm:overflow-y-scroll top-0  pb-4 flex flex-col sm:w-[20%] sm:ml-0 pr-10 sm:border-r-2
                   duration-500 ${
                     showSideBar ? "ml-1 w-full" : "ml-[-280px] border-r-0"
                   }`}
    >
      <h1 className="font-bold text-lg ml-2">Following</h1>

      <div className="ml-1">
        <Follow showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
      </div>

      <div className="flex gap-2">
        <h1 className="font-bold text-lg ml-2 text-center">Discover</h1>
      </div>
      <ul className="ml-5">
        {topics.map((topic, i) => (
          <li key={i} className="p-2">
            <Link to={`/HomePage/FilteredPosts/${topic}`} onClick={handleClick}>
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
