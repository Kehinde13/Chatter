import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./shadcn/dropdown-menu";
import { ArrowDown } from "lucide-react";

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm hover:text-slate-300 flex items-center gap-2">
        Blogs
        <ArrowDown className="w-[16px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Blogs</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={"/loginpage"}>Fashion</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/loginpage"}>Health and Fitness</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/loginpage"}>Tech</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/loginpage"}>Food</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
