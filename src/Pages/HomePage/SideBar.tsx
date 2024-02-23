import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function SideBar() {
  return (
    <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1">
      <h1 className="font-bold text-lg ml-2">Overview</h1>
      <ul className="ml-4">
        <li>
          <FontAwesomeIcon
            icon="fa-solid fa-house-chimney-user"
            className="mr-2"
          />
          Feed
        </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-book-bookmark" className="mr-2" />
          Bookmarks
        </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-people-group" className="mr-2" />
          Team Blog
        </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-envelope-open" className="mr-2" />
          Drafts
        </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-chart-line" className="mr-2" />
          Analytics
        </li>
      </ul>

      <h1 className="font-bold text-lg ml-2">Trending Tags</h1>
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
        <li>
          <FontAwesomeIcon icon="fa-solid fa-user" className="mr-2" />
          Account
        </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-bell" className="mr-2" />
          Notification
        </li>
        <li>Log Out</li>
      </ul>
    </aside>
  );
}

export default SideBar;
