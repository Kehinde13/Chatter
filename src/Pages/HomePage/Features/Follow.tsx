import { Blog } from "../../../Context/Context";
import FollowBtn from "./FollowBtn";
import { Link } from "react-router-dom";
import profilePic from '../../../assets/profile.jpg'
import { useState } from "react";



const Follow = () => {
  const { currentUser, users } = Blog();
  const [count, setCount] = useState<number | undefined>(5);
  const allUsers =
    users &&
    users
      ?.slice(0, count)
      .filter((user: { userId: string }) => user.userId !== currentUser?.uid);


  return (
    <>
      {users &&
        allUsers?.map((user: { username: string; userImg: string; userId: string }, i: number) => {
          const { username, userImg, userId } = user;
          return (
            <div key={i} className="flex items-start gap-2 my-4">
              <Link to={`/homepage/profile/${userId}`}
                className="flex-1 flex items-center gap-2 cursor-pointer">
                <img
                  className="w-[3rem] h-[3rem] object-cover cursor-pointer rounded-full"
                  src={userImg ? userImg : profilePic}
                  alt="userImg"
                />
                <h2 className="font-bold capitalize text-sm">{username}</h2>
              </Link>
              <FollowBtn userId={userId} />
            </div>
          );
        })}
      {users?.length > 5 && (
        <button
          onClick={() =>
            setCount((prev) => {
              if (allUsers.length < users?.length) {
                return (prev ?? 0) + 3;  // Make sure prev is defined, default to 0 if undefined
              }
              return prev;  // Return prev as it is if the condition is false
            })
          }
          className="mb-3 text-green-900 dark:text-green-400 text-sm hover:underline">
          Load more users
        </button>
      )}
    </>
  );
};

export default Follow;
