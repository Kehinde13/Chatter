import { useEffect, useState } from "react";
import { Blog } from "../../../Context/Context";
import { toast } from "react-toastify";
import GetSinglePost from "../../../hooks/GetSinglePost";
import { db } from "../../../Auth/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { Button } from "../../../components/shadcn/button";

interface FollowBtnProps {
  userId: string;
}

const followBtnStyle = {
  marginLeft: '15px',
  marginRight: '0px',
  width: "70px",
  height: '30px',
  alignSelf: "center"
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
      <Button
        onClick={handleFollow}
        className='bn632-hover bn20'
        style={followBtnStyle}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </>
  );
};

export default FollowBtn;
