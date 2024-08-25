import { Outlet } from "react-router-dom";
import Header from "./Navbar";
import SideBar from "./SideBar";
import { useState } from "react";

function HomePage() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState<string>("");

  
  

  return (
    <div data-testid="homepage">
      <Header />
      <div className="flex gap-5 sm:gap-0">
        <SideBar />
        <Outlet context={[ 
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
