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
          <Link to={"contact"}>
            <li>Contact</li>
          </Link>
          <Link to={"blogs"}>
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
            className="bn632-hover bn20"
          >
            Log in
          </button>
          <button
            onClick={setSignUp}
            className="bn632-hover bn20"
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
            <Link to={"contact"}>
              <li>Contact</li>
            </Link>
            <Link to={"blogs"}>
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
            className="bn632-hover bn20 self-center"
          >
            Log in
          </button>
          <button
            onClick={setSignUp}
            className="bn632-hover bn20 self-center"
          >
            Sign up
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
