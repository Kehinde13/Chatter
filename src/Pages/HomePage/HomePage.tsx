import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomePage() {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
    console.log(showSideBar);
  };

  return (
    <div className='dark:bg-slate-800 dark:text-white '>
      <Header />
      <div className="flex">
        <button
          className={`border w-8 py-1 absolute sm:hidden rounded-full top-64 z-50 ${
            showSideBar ? "right-0" : "left-0"
          }`}
          onClick={toggleSideBar}
        >
          <FontAwesomeIcon
            icon={
              showSideBar ? "fa-solid fa-angle-left" : "fa-solid fa-angle-right"
            }
          />
        </button>
        <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <Outlet context={[showSideBar]} />
      </div>
    </div>
  );
}

export default HomePage;
