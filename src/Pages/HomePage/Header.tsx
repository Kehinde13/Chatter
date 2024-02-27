import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImg from "../../assets/profile.jpg";
import { useState } from "react";
import logo from "../../assets/CHATTER.png";
import { Blog } from "../../Context/Context";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function Header() {
  const { currentUser, users, userLoading } = Blog();
  const [searchBar, setSearchBar] = useState(false);
  const { userId } = useParams();

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };


 const currentUserData = users.find((user: object) => user.id === userId);

  return (
    <header>
      {userLoading && <Loading />}
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
                src={currentUserData?.userImg ? currentUserData?.userImg : profileImg}
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
