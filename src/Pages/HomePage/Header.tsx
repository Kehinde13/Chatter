import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImg from "../../assets/profile.jpg";
import { useState } from "react";

function Header() {
  const [searchBar, setSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };


  return (
    <header>
      <div className="flex gap-2 justify-between mx-3 md:mx-5 items-center h-[70px] shadow-inner">
        <div>
          <h1
            className={`md:text-3xl font-bold text-blue-500 tracking-widest
                        ${searchBar ? "text-xs" : "text-xl"}`}
          >
            CHATTER
          </h1>
        </div>
        <form
          className={`sm:flex items-center gap-2 bg-gray-100 px-2 rounded-full relative z-10 sm:w-[400px]
                  w-[80%] ${searchBar ? "flex" : "hidden"}`}
        >
          <button className="text-xl text-gray-400">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </button>
          <input
            className="bg-transparent outline-none py-[0.7rem] text-sm w-full"
            type="text"
            placeholder="Search Chatter"
          />
          {searchBar && (
            <FontAwesomeIcon
              icon="fa-solid fa-xmark"
              onClick={toggleSearchBar}
            />
          )}
        </form>
        {!searchBar && (
          <div className="flex gap-5">
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className="self-center sm:hidden block"
              onClick={toggleSearchBar}
            />
            <FontAwesomeIcon icon="fa-solid fa-bell" className="self-center" />
            <img
              className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
              src={profileImg}
              alt="profile-img"
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
