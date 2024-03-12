import { useEffect, useState } from "react";
import { Blog } from "../../../Context/Context";
import { toast } from "react-toastify";
import GetSinglePost from "../../../hooks/GetSinglePost";
import { db } from "../../../Auth/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

interface FollowBtnProps {
  userId: string;
}

const FollowBtn = ({ userId }: FollowBtnProps) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const { currentUser } = Blog();

  const protectedUser = currentUser!

  const { data } = GetSinglePost("users", protectedUser.uid, "following");

  useEffect(() => {
    setIsFollowed(data && data.findIndex((item: { id: string }) => item.id === userId) !== -1);
  }, [data, setIsFollowed, userId]);

  const handleFollow = async () => {
    try {
      if (currentUser) {
        const followRef = doc(db, "users", currentUser?.uid, "following", userId);
        const followerRef = doc(db, "users", userId, "followers", currentUser?.uid);
        if (isFollowed) {
          await deleteDoc(followRef);
          await deleteDoc(followerRef);
          toast.success("User Unfollowed");
        } else {
          await setDoc(followRef, {
            userId: userId,
          });
          await setDoc(followerRef, {
            userId: currentUser?.uid,
          });
          toast.success("User is Followed");
        }
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleFollow}
        className={`text-white bg-purple-500 p-1 rounded-md`}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};

export default FollowBtn;
