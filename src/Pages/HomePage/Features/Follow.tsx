import { Blog } from "../../../Context/Context";
import FollowBtn from "./FollowBtn";
import { Link } from "react-router-dom";
import profilePic from '../../../assets/profile.jpg'
import { useState } from "react";

interface SidebarProps {
  setShowSideBar: (showSideBar: boolean) => void; 
}

const Follow = ({ setShowSideBar }: SidebarProps) => {
  const { currentUser, users } = Blog();
  const [count, setCount] = useState<number | undefined>(5);
  /* const count = 5 */
  const allUsers =
    users &&
    users
      ?.slice(0, count)
      .filter((user: { userId: string }) => user.userId !== currentUser?.uid);

      const handleClick = () => {
        setShowSideBar(false); 
      };

  return (
    <>
      {users &&
        allUsers?.map((user: { username: string; bio: string; userImg: string; userId: string }, i: number) => {
          const { username, bio, userImg, userId } = user;
          return (
            <div key={i} className="flex items-start gap-2 my-4">
              <Link to={`/homepage/profile/${userId}`}
                onClick={handleClick}
                className="flex-1 flex items-center gap-2 cursor-pointer">
                <img
                  className="w-[3rem] h-[3rem] object-cover gap-2 cursor-pointer rounded-full"
                  src={userImg ? userImg : profilePic}
                  alt="userImg"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold capitalize">{username}</h2>
                  <span className="leading-4 text-gray-500 text-sm line-clamp-2">
                    {bio || "This user has no bio"}
                  </span>
                </div>
              </Link>
              <FollowBtn userId={userId} />
            </div>
          );
        })}
      {users?.length > 5 && (
        <button
          onClick={() =>
            setCount((prev) => allUsers.length < users?.length && prev + 3)
          }
          className="mb-3 text-green-900 text-sm hover:underline">
          Load more users
        </button>
      )}
    </>
  );
};

export default Follow;
