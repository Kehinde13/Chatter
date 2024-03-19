import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

function HomePage() {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState<string>("");

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  

  return (
    <div>
      <Header />
      <div className="flex gap-3">
        <button
          className={`border p-1 py-1 fixed sm:hidden rounded-full top-64 z-50 ${
            showSideBar ? "right-0" : "left-0"
          }`}
          onClick={toggleSideBar}
        >
          {
            showSideBar ? (
             <FaAngleLeft /> ):(
              <FaAngleRight />
            )
          }
        </button>
        <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <Outlet context={[
          showSideBar, 
          description,
          setDescription,
          title,
          setTitle
          ]} />
      </div>
    </div>
  );
}

export default HomePage;
