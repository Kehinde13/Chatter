import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { Blog } from "../../Context/Context";
import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.jpg";
import logo from "../../assets/CHATTER.png";
import Search from "./Search";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import UserModal from "../UserModal";

interface UserData {
  id: string;
  userImg?: string; 
}

function Header() {
  const { currentUser, users, userLoading } = Blog();
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggleSearchBar = (): void => {
    setSearchBar((prevState) => !prevState);
  };

  const toggleModal = (): void => {
    setModal(!modal);
  };

  const currentUserData: UserData | undefined  = users?.find((user) => user.id === currentUser?.uid);

  return (
    <header>
      {userLoading && <Loading />}
      <div className="flex gap-2 justify-between mx-3 md:mx-5 items-center h-[70px] h-shadow-lg">
        <Link to="/HomePage">
          <img
            src={logo}
            className={`${searchBar ? "w-[80px]" : "w-[120px]"}`}
            alt="logo"
          />
        </Link>
        
        <Search searchBar={searchBar} toggleSearchBar={toggleSearchBar} />
        
        {!searchBar && (
          <div className="flex gap-5">
            <FaMagnifyingGlass
              className="self-center sm:hidden block text-2xl"
              onClick={toggleSearchBar}
            />
            <div className="flex items-center relative" onClick={toggleModal}>
              <img
                className="sm:w-[2.5rem] sm:h-[2.5rem] w-[60px] h-[35px] object-cover rounded-full cursor-pointer"
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