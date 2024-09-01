import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../components/shadcn/dropdown-menu";
import profileImg from "../../assets/profile.jpg";
import { Blog } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Auth/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

type DropdownMenuProps = {
  userImg?: string;
};

export function UserDropdownMenu({ userImg }: DropdownMenuProps) {
  const { currentUser } = Blog();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("User has been logged out");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const user = currentUser as { uid?: string; email?: string };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src={userImg || profileImg}
          alt="user profile img"
          className="w-[7rem] h-[3rem] md:w-[3rem] md:h-[3rem]  object-cover rounded-full self-center"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to={`profile/${user.uid}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-500">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
