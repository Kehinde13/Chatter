import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImg from "../../assets/profile.jpg";
import { useState } from "react";
import logo from "../../assets/CHATTER.png";
import { Blog } from "../../Context/Context";
import { Link } from "react-router-dom";

function Header() {
  const { currentUser } = Blog();
  const [searchBar, setSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  return (
    <header>
      <div className="flex gap-2 justify-between mx-3 md:mx-5 items-center h-[70px] h-shadow-lg">
        <img src={logo} className={`${searchBar ? "w-[80px]" : "w-[120px]"}`} />
        <form
          className={`sm:flex sm:mb-0 items-center gap-2 bg-gray-100 px-2 rounded-full relative z-10 sm:w-[300px]
                      duration-300  ${
                        searchBar ? "flex " : "mb-[200px] w-[20%]"
                      }`}
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
              className="text-slate-800"
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
            <Link to={`profile/${currentUser?.uid}`}>
              <img
                className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
                src={currentUser.photoURL ? currentUser.photoURL : profileImg}
                alt="profile-img"
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
