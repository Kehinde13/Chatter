import React, { useState } from "react";
import { Blog } from "../../../Context/Context";
import FollowBtn from "./FollowBtn";
import { Link, useNavigate } from "react-router-dom";

const Follow = () => {
  const { currentUser, users } = Blog();
  const [count, setCount] = useState(5);
  const allUsers =
    users &&
    users
      ?.slice(0, count)
      .filter((user: object) => user.userId !== currentUser?.uid);

  const navigate = useNavigate();

  return (
    <>
      {users &&
        allUsers?.map((user: object, i: number) => {
          const { username, bio, userImg, userId } = user;
          return (
            <div key={i} className="flex items-start gap-2 my-4">
              <Link to={`/HomePage/profile/${userId}`}
                className="flex-1 flex items-center gap-2 cursor-pointer">
                <img
                  className="w-[3rem] h-[3rem] object-cover gap-2 cursor-pointer rounded-full"
                  src={userImg}
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
 