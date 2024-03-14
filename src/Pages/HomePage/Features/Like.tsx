import  { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import GetSinglePost from '../../../hooks/GetSinglePost';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../Auth/firebase';
import { toast } from 'react-toastify';
import { formatNum } from '../../../utils/helper';
import { Blog } from '../../../Context/Context';
import { FirebaseError } from 'firebase/app';

interface LikeProps {
  postId: string;
  post: {
    tags: string[];
  };
}

function Like({ postId, post }: LikeProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { currentUser, setAuthModel } = Blog();

  const { data: likes } = GetSinglePost('posts', postId, 'likes');

  useEffect(() => {
    setIsLiked(
      likes && likes.findIndex((item: { id: string }) => item.id === currentUser?.uid) !== -1
    );
  }, [currentUser?.uid, likes]);

  const handleLike = async () => {
    try {
      if (currentUser) {
        const likeRef = doc(db, 'posts', postId, 'likes', currentUser?.uid);
        const userLikesRef = doc(db, 'users', currentUser?.uid, 'likes', postId);
        if (isLiked) {
          await deleteDoc(likeRef);
          await deleteDoc(userLikesRef);
        } else {
          await setDoc(likeRef, { userId: currentUser?.uid });
          await setDoc(userLikesRef, post);
        }
        setIsLiked((prev) => !prev);
      } else {
        setAuthModel(true);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <button onClick={handleLike} className="flex  gap-1 self-start">
      <CiHeart className={`text-2xl  ${isLiked ? 'text-red-500' : 'text-gray-500'}`} />
      <span>{formatNum(likes?.length)}</span>
    </button>
  );
}

export default Like;
