import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { Blog } from "../../Context/Context";
import { Link } from "react-router-dom";
import logo from "../../assets/CHATTER.png";
import Search from "./Search";
import Loading from "../../components/Loading";
import { UserDropdownMenu } from "./ProfileDropdownMenu";
import { ModeToggle } from "../../components/shadcn/mode-toggle";

interface UserData {
  id: string;
  userImg?: string;
}

function Header() {
  const { currentUser, users, userLoading } = Blog();
  const [searchBar, setSearchBar] = useState<boolean>(false);

  const toggleSearchBar = (): void => {
    setSearchBar((prevState) => !prevState);
  };

  const currentUserData: UserData | undefined = users?.find(
    (user) => user.id === currentUser?.uid
  );

  return (
    <div>
      {userLoading && <Loading />}
      <div className="flex gap-2 justify-between px-2 md:px-5 items-center h-[70px] shadow-lg mb-5">
        <Link to="/homepage">
          <img
            src={logo}
            className={`${searchBar ? "w-[100px]" : "w-[200px] md:w-[100px]"}`}
            alt="logo"
          />
        </Link>

        
        <Search searchBar={searchBar} toggleSearchBar={toggleSearchBar} />
        

        {!searchBar && (
          <div className="flex gap-5 justify-end">
            <FaMagnifyingGlass
              className="self-center sm:hidden block text-5xl"
              onClick={toggleSearchBar}
            />

            <UserDropdownMenu userImg={currentUserData?.userImg} />
            <ModeToggle />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
