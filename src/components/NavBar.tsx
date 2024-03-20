import { Link } from "react-router-dom";
import logo from "../assets/CHATTER.png";
import { FaBars } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { Link as ScrollLink } from "react-scroll";

type prop = {
  dropdown: boolean,
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBar({dropdown, setDropdown}: prop) {

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
 

  return (
    <nav className="top-0">
      <div className="flex justify-between mx-3 md:mx-10 items-center h-[50px] sm:h-[70px] ">
        <img
          src={logo}
          alt="logo"
          className="w-[80px] sm:w-[100px] self-center"
        />
        <FaBars className="block md:hidden" onClick={toggleDropdown} />
        <ul className="md:flex gap-10 hidden font-bold">
          <Link to={"contact"}>
            <li className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
              Contact
            </li>
          </Link>
          <Link to={"blogs"}>
            <li className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
              Blogs
            </li>
          </Link>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <li className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
              About us
            </li>
          </ScrollLink>
        </ul>
        <div className="md:flex justify-between md:gap-10 gap-3 md:font-bold hidden">
          <Link to={'/loginpage'}
           className="bn632-hover bn20">
            <p className="mt-3">Log in</p>
          </Link>
          <Link to={'/signup'} className="bn632-hover bn20">
          <p className="mt-3">Sign Up</p>
          </Link>
        </div>
      </div>
      {dropdown && (
        <div className="bg-white absolute inset-0 z-50 h-screen flex flex-col gap-5">
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
          <Link to={"/loginpage"}
          className="bn632-hover bn20 self-center">
            <p className="mt-3">Log in</p>
          </Link>
          <Link to={'/signup'}  className="bn632-hover bn20 self-center">
          <p className="mt-3">Sign Up</p>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
