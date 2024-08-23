import { Drawer, DrawerContent, DrawerTrigger } from "./shadcn/drawer";
import { AlignJustifyIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "./shadcn/button";

export default function DrawerContainer() {
  const navigate = useNavigate();

  return (
    <Drawer>
      <DrawerTrigger className="md:hidden">
        <AlignJustifyIcon />
      </DrawerTrigger>
      <DrawerContent>
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
          >
            <li>About us</li>
          </ScrollLink>
        </ul>
        <Button
          onClick={() => navigate("/loginpage")}
          className="bn632-hover bn20 self-center"
        >
          Log in
        </Button>
        <Button
          onClick={() => navigate("/loginpage")}
          className="bn632-hover bn20 self-center my-8"
        >
          Sign Up
        </Button>
      </DrawerContent>
    </Drawer>
  );
}
