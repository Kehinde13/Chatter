import { Link } from "react-router-dom";
import logo from "../assets/CHATTER.png";
import { FaBars } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

type NavBarProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalText: React.Dispatch<React.SetStateAction<string>>;
};

function NavBar({ modal, setModal, setModalText }: NavBarProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const setSignUp = () => {
    setModal(!modal);
    setModalText("Sign Up");
  };

  const setLogin = () => {
    setModal(!modal);
    setModalText("Login");
  };

  return (
    <nav className=" top-0 z-30 ">
      <div className="flex justify-between mx-3 md:mx-10 items-center h-[70px] shadow-inner">
        <img
          src={logo}
          alt="logo"
          className="w-[80px] sm:w-[150px] self-center"
        />
        <FaBars
          className="block md:hidden"
          onClick={toggleDropdown}
        />
        <ul className="md:flex gap-10 hidden font-bold">
          <Link to={"Contact"}>
            <li>Contact</li>
          </Link>
          <Link to={"Blogs"}>
            <li>Blogs</li>
          </Link>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <li>About us</li>
          </ScrollLink>
        </ul>
        <div className="md:flex justify-between md:gap-10 gap-3 md:font-bold hidden">
          <button
            onClick={setLogin}
            className="md:py-2 md:px-10 p-1 border border-purple-500 rounded-md
                             hover:bg-purple-500 hover:text-white text-purple-500"
          >
            Log in
          </button>
          <button
            onClick={setSignUp}
            className="md:py-2 md:px-10 p-1 bg-purple-500 rounded-md text-white
                       border-purple-500 hover:bg-transparent border hover:text-purple-500"
          >
            Sign up
          </button>
        </div>
      </div>
      {dropdown && (
        <div className="bg-white fixed inset-0 z-10 h-screen flex flex-col gap-5">
          <MdOutlineCancel
            className="self-end m-5 sm:hidden block"
            onClick={toggleDropdown}
          />
          <ul className="flex flex-col gap-5 font-bold self-center text-center">
            <Link to={"Contact"}>
              <li>Contact</li>
            </Link>
            <Link to={"Blogs"}>
              <li>Blogs</li>
            </Link>

            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="cursor-pointer"
              onClick={toggleDropdown}
            >
              <li>About us</li>
            </ScrollLink>
          </ul>
          <button
            onClick={setLogin}
            className="px-5 py-2 border border-purple-500 rounded-md self-center mb-5
                               hover:bg-purple-500 hover:text-white text-purple-500"
          >
            Log in
          </button>
          <button
            onClick={setSignUp}
            className="px-5 py-2 bg-purple-500 rounded-md text-white self-center
                         border-purple-500 hover:bg-transparent border hover:text-purple-500"
          >
            Sign up
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
