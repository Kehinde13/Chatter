import { Link, useOutletContext } from 'react-router-dom';
import ForYou from './ForYou';
import Recent from './Recent';
import { useState } from 'react';
import Trending from './Trending';

interface Panel {
  title: string;
  component: React.ComponentType;
}

function Feed() {
  const [showSideBar]: [boolean] = useOutletContext();
  const panels: Panel[] = [
    {
      title: 'For You',
      component: ForYou,
    },
    {
      title: 'Trending',
      component: Trending,
    },
    {
      title: 'Recent',
      component: Recent,
    },
  ];
  const [currentPanel, setCurrentPanel] = useState<Panel>(panels[0]);

  return (
    <div className={`w-[80%] sm:px-16 py-10 sm:block ${showSideBar ? 'hidden' : ''}`}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl sm:text-4xl font-bold">FEED</h1>
          <p>Explore different content you’d love </p>
        </div>
        <Link to="TextEditor">
          <button className="sm:py-2 sm:px-3 p-2  bg-purple-500 self-start text-white rounded-full">
            Write
          </button>
        </Link>
      </div>
      <div className="flex items-center gap-5 my-3 border-b border-purple-200 md:w-[700px] text-center font-bold">
        {panels.map((item, index) => (
          <div
            className={`py-1 w-full ${
              item.title === currentPanel.title ? 'border-b-2 border-purple-500' : ''
            }`}
            key={index}
          >
            <button onClick={() => setCurrentPanel(item)}>{item.title}</button>
          </div>
        ))}
      </div>
      <currentPanel.component />
    </div>
  );
}

export default Feed;
