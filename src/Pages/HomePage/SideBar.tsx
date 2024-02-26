import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import feed from "../../assets/ftxtoken.png";
import trending from "../../assets/eva_trending-up-outline.png";
import { Link } from "react-router-dom";
import { Blog } from "../../Context/Context";

type prop= {
 showSideBar: boolean,
 setShowSideBar: (showSideBar: boolean) => boolean
}

function SideBar({showSideBar, setShowSideBar}: prop) {
  const { currentUser } = Blog();
  
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <aside
      className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col sm:ml-0 pr-10 border-r-2
                   duration-500 ${showSideBar ? "ml-1 w-full" : "ml-[-178px] border-r-0"}`}
    >
      <button
        className="border w-8 py-1 absolute sm:hidden rounded-full right-[-10px] top-64"
        onClick={toggleSideBar}
      >
        <FontAwesomeIcon
          icon={
            showSideBar ? "fa-solid fa-angle-left" : "fa-solid fa-angle-right"
          }
        />
      </button>
      <h1 className="font-bold text-lg ml-2">Overview</h1>
      <ul className="ml-4">
        <li className="flex gap-2">
          <img src={feed} alt="" />
          Feed
        </li>
        <li>
          <FontAwesomeIcon
            icon="fa-solid fa-book-bookmark"
            className="mr-2 text-purple-600"
          />
          Bookmarks
        </li>
        <li>
          <FontAwesomeIcon
            icon="fa-solid fa-people-group"
            className="mr-2 text-purple-600"
          />
          Team Blog
        </li>
        <li>
          <FontAwesomeIcon
            icon="fa-solid fa-envelope-open"
            className="mr-2 text-purple-600"
          />
          Drafts
        </li>
        <li>
          <FontAwesomeIcon
            icon="fa-solid fa-chart-line"
            className="mr-2 text-purple-600"
          />
          Analytics
        </li>
      </ul>

      <div className="flex gap-2">
        <h1 className="font-bold text-lg ml-2">Trending Tags</h1>
        <img src={trending} alt="" />
      </div>
      <ul className="ml-4">
        <li>Programming</li>
        <li>Data Science</li>
        <li>Machine Learning</li>
        <li>Technology</li>
        <li>Politics</li>
        <li>See All</li>
      </ul>

      <h1 className="font-bold text-lg ml-2">Personal</h1>
      <ul className="ml-4">
        <Link to={`profile/${currentUser?.uid}`}>
          <li>
            <FontAwesomeIcon icon="fa-solid fa-user" className="mr-2" />
            Account
          </li>
        </Link>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-bell" className="mr-2 " />
          Notification
        </li>
        <li>Log Out</li>
      </ul>
    </aside>
  );
}

export default SideBar;
