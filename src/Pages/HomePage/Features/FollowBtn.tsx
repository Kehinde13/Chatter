import { useEffect, useState } from "react";
import { Blog } from "../../../Context/Context";
import { toast } from "react-toastify";
import GetSinglePost from "../../../hooks/GetSinglePost";
import { db } from "../../../Auth/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

const FollowBtn = ({ userId }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { currentUser } = Blog();

  const { data } = GetSinglePost(
    "users",
    currentUser?.uid,
    "following"
  );

  useEffect(() => {
    setIsFollowed(data && data?.findIndex((item: object) => item.id === userId) !== -1);
  }, [data]);

  const handleFollow = async () => {
    try {
      if (currentUser) {
        const followRef = doc(db, "users", currentUser?.uid, "following", userId);
        const followerRef = doc(
          db,
          "users",
          userId,
          "followers",
          currentUser?.uid
        );
        if (isFollowed) {
          await deleteDoc(followRef);
          await deleteDoc(followerRef);
          toast.success("User unFollowed");
        } else {
          await setDoc(followRef, {
            userId: userId,
          });
          await setDoc(followerRef, {
            userId: userId,
          });
          toast.success("User is Followed");
        }
      }
    } catch (error: unknown) {
      if(error instanceof FirebaseError){
        toast.error(error.message);
      }
    }
  };

 

  return (
    <>
      <button
        onClick={handleFollow}
        className={`text-white bg-purple-500 p-1 rounded-md`}>
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};

export default FollowBtn;
