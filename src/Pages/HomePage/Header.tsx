import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImg from "../../assets/profile.jpg";
import { useState } from "react";
import logo from "../../assets/CHATTER.png";
import { Blog } from "../../Context/Context";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import UserModal from "../UserModal";
import Search from "./Search";

function Header() {
  const { currentUser, users, userLoading } = Blog();
  const [searchBar, setSearchBar] = useState(false);
  const [modal, setModal] = useState(false);
  const { userId } = useParams();

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const currentUserData = users?.find((user) => user.id === currentUser?.uid);

  return (
    <header>
      {userLoading && <Loading />}
      <div className="flex gap-2 justify-between mx-3 md:mx-5 items-center h-[70px] h-shadow-lg">
        <Link to="/HomePage">
          <img
            src={logo}
            className={`${searchBar ? "w-[80px]" : "w-[120px]"}`}
          />
        </Link>
        
        <Search searchBar={searchBar} toggleSearchBar={toggleSearchBar} />
        
        {!searchBar && (
          <div className="flex gap-5">
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className="self-center sm:hidden block"
              onClick={toggleSearchBar}
            />
            <div className="flex items-center relative" onClick={toggleModal}>
              <img
                className="sm:w-[2.5rem] sm:h-[2.5rem] w-[70px] h-[35px] object-cover rounded-full cursor-pointer"
                src={currentUserData?.userImg || profileImg}
                alt="profile-img"
              />

              <Modal modal={modal} toggleModal={toggleModal}>
                <div
                  className={`${
                    modal ? "visible opacity-100%" : "invisible opacity-0"
                  } transition-all duration-100`}
                >
                  <UserModal toggleModal={toggleModal} />
                </div>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
