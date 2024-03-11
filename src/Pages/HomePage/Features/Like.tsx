import { CiHeart } from "react-icons/ci";
import React, { useEffect, useState } from 'react'
import GetSinglePost from '../../../hooks/GetSinglePost';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../Auth/firebase';
import { toast } from 'react-toastify';
import { formatNum } from '../../../utils/helper';
import { Blog } from '../../../Context/Context';
import { FirebaseError } from 'firebase/app';

function Like({postId, post}) {
    const [Like, setLike] = useState<boolean>(false)
    const { currentUser, setAuthModel } = Blog();
  
    const { data: posts } = GetSinglePost("posts", postId, "likes");
  
    useEffect(() => {
      
      setLike(
        posts && posts.findIndex((item: object) => item.id === currentUser?.uid) !== -1
      );
    }, [posts]);
  
    const handleLike = async () => {
      
      try {
        if (currentUser) {
          const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
          const userLikesRef = doc(db, "users", currentUser?.uid, "likes", ...post.tags);
          if (Like) {
            await deleteDoc(likeRef);
            await deleteDoc(userLikesRef)
          } else {
            await setDoc(likeRef, {
              userId: currentUser?.uid,
            });
            await setDoc(userLikesRef, {
              ...post.tags
            });
          }
        } else {
          setAuthModel(true);
        }
      } catch (error: unknown) {
        if(error instanceof FirebaseError){
          toast.error(error.message);
        }
      }
    };

  return (
    <button onClick={handleLike} className="flex items-center gap-1 text-sm">
      <CiHeart
        className={`text-xl ${Like ? "text-red-500" : "text-gray-500"}`}
      />
      <span>{formatNum(posts?.length)}</span>
    </button>
  )
}

export default Like