import { Link } from "react-router-dom";
import Follow from "./Features/Follow";
import { useState } from "react";

interface SidebarProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void; 
}

function SideBar({ showSideBar, setShowSideBar }: SidebarProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
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
      className={`sticky h-screen scrollbar-hidden top-0  pb-4 flex flex-col sm:w-[20%] sm:ml-3 pr-10 sm:pr-5 sm:border-r-2
                   duration-500 ${
                     showSideBar ? "ml-1 w-full" : "ml-[-320px] border-r-0"
                   }
                   ${isFocused ? 'focused' : ''}`}
      id="focusSection"
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <h1 className="font-bold text-lg ml-2 mt-2">Following</h1>

      <div className="ml-1">
        <Follow showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
      </div>

      <div className="flex gap-2">
        <h1 className="font-bold text-lg ml-2 text-center">Discover</h1>
      </div>
      <ul className="ml-5">
        {topics.map((topic, i) => (
          <li key={i} className="p-2">
            <Link to={`/homepage/filteredposts/${topic}`} onClick={handleClick}>
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
