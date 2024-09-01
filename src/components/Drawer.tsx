import { Drawer, DrawerContent, DrawerTrigger } from "./shadcn/drawer";
import { AlignJustifyIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./shadcn/button";
import { ModeToggle } from "./shadcn/mode-toggle";

export default function DrawerContainer() {
  const navigate = useNavigate();

  return (
    <Drawer>
      <DrawerTrigger className="md:hidden flex gap-3 items-center">
        <ModeToggle />
        <AlignJustifyIcon />
      </DrawerTrigger>
      <DrawerContent>
        <ul className="flex flex-col gap-5 font-bold self-center text-center">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"contact"}>
            <li>Contact</li>
          </Link>
          <Link to={"aboutpage"}>
            <li>About</li>
          </Link>
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
