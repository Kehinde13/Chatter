import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";

function HomePage() {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <div /* className='dark:bg-slate-800 dark:text-white' */>
      <Header />
      <div className="flex">
        <SideBar 
          showSideBar={showSideBar} 
          setShowSideBar={setShowSideBar} 
        />
        <Outlet context={[showSideBar]}/>
      </div>
    </div>
  );
}

export default HomePage;
