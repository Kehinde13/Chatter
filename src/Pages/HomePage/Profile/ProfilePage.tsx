import { useState } from "react";
import { Blog } from "../../../Context/Context";

import profileImg from "../../../assets/profile.jpg";
import About from "./About";
import Lists from "./Lists";
import Stories from "./Stories";
import { useOutletContext } from "react-router-dom";

function ProfilePage() {
  const { currentUser } = Blog();
  const [showSideBar] = useOutletContext();
  const panels = [
    {
      title: "Stories",
      component: Stories,
    },
    {
      title: "Reading Lists",
      component: Lists,
    },
    {
      title: "About",
      component: About,
    },
  ];
  const [currentPanel, setCurrentPanel] = useState<object>(panels[0]);

  return (
    <div className={`p-5 sm:block ${showSideBar ? "hidden" : "block"}`}>
      <>
        <div className="flex gap-5">
          <img
            className="w-[80px] h-[80px] object-cover rounded-full self-center"
            src={currentUser.photoURL ? currentUser.photoURL : profileImg}
            alt="profile image"
          />
          <h1 className="text-3xl sm:text-5xl font-bold self-center capitalize">
            {currentUser.displayName}
          </h1>
        </div>
        <div className="flex self-center my-3 gap-5">
          <p>Followers(0)</p>
          <p>Following(0)</p>
        </div>
        <div>
          <p className="self-center">
            "{currentUser.bio ? currentUser.bio : "I'm a mysterious user"}"
          </p>
        </div>
        <button className="bg-purple-500 my-5 py-1 px-3 rounded-md text-white">
          Edit Your profile
        </button>
      </>
      <div className="flex items-center gap-5 my-3 border-b border-purple-200 md:w-[500px]">
        {panels.map((item, index) => (
          <div
            className={`py-1 ${
              item.title === currentPanel.title
                ? "border-b-2 border-purple-500"
                : ""
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

export default ProfilePage;
