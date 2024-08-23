import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/CHATTER.png";
import { Link as ScrollLink } from "react-scroll";
import { ModeToggle } from "./shadcn/mode-toggle";
import { Button } from "./shadcn/button";
import DrawerContainer from "./Drawer";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="top-0 md:block flex justify-between px-2">
      <div className="flex justify-between mx-3 md:mx-10 items-center h-[50px] sm:h-[70px]">
        <img
          src={logo}
          alt="logo"
          className="w-[80px] sm:w-[100px] self-center"
        />
        <ul className="md:flex gap-10 hidden font-bold">
          <Link to={"contact"}>
            <li className="inline-block rounded-lg px-2 py-1 text-sm hover:text-slate-300">
              Contact
            </li>
          </Link>
          <Link to={"blogs"}>
            <li className="inline-block rounded-lg px-2 py-1 text-sm hover:text-slate-300">
              Blogs
            </li>
          </Link>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <li className="inline-block rounded-lg px-2 py-1 text-sm hover:text-slate-300">
              About us
            </li>
          </ScrollLink>
        </ul>
        <div className="md:flex justify-between md:gap-6 gap-3 md:font-bold hidden">
          <Link to={"/loginpage"} className="hover:text-slate-300 mt-2">
            Log in
          </Link>
          <Button
            onClick={() => navigate("/signup")}
            className="bn632-hover bn20"
          >
            Sign Up
          </Button>
          <ModeToggle />
        </div>
      </div>
      <DrawerContainer />
    </nav>
  );
}

export default NavBar;
