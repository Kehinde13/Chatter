import { Link } from "react-router-dom";
import Follow from "./Features/Follow";

type prop = {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => boolean
};

function SideBar({ showSideBar, setShowSideBar }: prop) {
  const topics = [
    "Programming",
    "Data Science",
    "Machine Learning",
    "Technology",
    "Politics",
    "markdown",
    "Updates",
  ];

  return (
    <aside
      className={`sticky top-0 overflow-y-scroll pb-4 flex flex-col sm:w-[20%] sm:ml-0 pr-10 sm:border-r-2
                   duration-500 ${
                     showSideBar ? "ml-1 w-full" : "ml-[-260px] border-r-0"
                   }`}
    >
      <h1 className="font-bold text-lg ml-2">Following</h1>

      <div className="ml-1">
        <Follow />
      </div>

      <div className="flex gap-2">
        <h1 className="font-bold text-lg ml-2 text-center">Discover</h1>
      </div>
      <ul className="ml-5">
        {topics.map((topic, i) => (
          <Link to={`/HomePage/FilteredPosts/${topic}`} key={i}
                onClick={(e) => setShowSideBar(false)}>
            <li className="p-2">{topic}</li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
