import { Link, useOutletContext } from "react-router-dom";
import ForYou from "./ForYou";
import Recent from "./Recent";
import { useState } from "react";
import Trending from "./Trending";

interface Panel {
  title: string;
  component: React.ComponentType;
}

function Feed() {
  const [showSideBar]: [boolean] = useOutletContext();
  const panels: Panel[] = [
    {
      title: "For You",
      component: ForYou,
    },
    {
      title: "Trending",
      component: Trending,
    },
    {
      title: "Recent",
      component: Recent,
    },
  ];
  const [currentPanel, setCurrentPanel] = useState<Panel>(panels[0]);

  return (
    <div
      className={`w-[80%] sm:px-16 py-10 sm:block ${
        showSideBar ? "hidden" : ""
      }`}
    >
      <div className="flex justify-between border border-gray-300 rounded-md p-3">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl sm:text-4xl font-bold">FEED</h1>
          <p>Explore different content you’d love </p>
        </div>
        <Link to="texteditor" >
          <button className="bn632-hover bn20">Write</button>
        </Link>
      </div>
      <div className="border mt-2 border-gray-300 rounded-md p-3">
        <div className="flex items-center gap-5 my-3 border-b border-purple-200 w-full text-center font-bold">
          {panels.map((item, index) => (
            <div
              className={`py-1 w-full ${
                item.title === currentPanel.title
                  ? "border-b-2 border-purple-500"
                  : ""
              }`}
              key={index}
            >
              <button onClick={() => setCurrentPanel(item)}>
                {item.title}
              </button>
            </div>
          ))}
        </div>

        <currentPanel.component />
      </div>
    </div>
  );
}

export default Feed;
