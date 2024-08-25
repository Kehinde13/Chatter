import { Link } from "react-router-dom";
import Follow from "./Features/Follow";
import { useState } from "react";


function SideBar() {
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

  return (
    <aside
      className={`sticky h-screen scrollbar-hidden top-0  pb-4 md:flex flex-col sm:w-[20%] sm:ml-3 pr-10 sm:pr-5 sm:border-r-2
                   duration-500 hidden 
                   ${isFocused ? 'focused' : ''}`}
      id="focusSection"
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <h1 className="font-bold text-lg ml-2 mt-2">Following</h1>

      <div className="ml-1">
        <Follow />
      </div>

      
      <h1 className="font-bold text-lg ml-2">Discover</h1>
      
      <ul className="ml-2">
        {topics.map((topic, i) => (
          <li key={i} className="p-2">
            <Link to={`/homepage/filteredposts/${topic}`}>
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
