import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../../Auth/firebase';
import { Blog } from '../../../Context/Context';
import GetSinglePost from '../../../hooks/GetSinglePost';

type prop = {
    post: object,
}

function Bookmark({post}: prop) {
    const [isSaved, setIsSaved] = useState(false);
    const { currentUser, setAuthModel } = Blog();
     const { data } = GetSinglePost("users", post?.userId, "BookmarkedPost");
  
     useEffect(() => {
      setIsSaved(data && data.find((item: object) => item.id === post.id));
    }, [data, post?.id]); 
  
    const handleSave = async () => {
      try {
        if (currentUser) {
          const saveRef = doc(
            db,
            "users",
            currentUser?.uid,
            "BookmarkedPost",
            post?.id
          );
  
          if (isSaved) {
            await deleteDoc(saveRef);
            toast.success("Post has been unsaved");
          } else {
            await setDoc(saveRef, {
              ...post,
            });
            toast.success("Post has been Saved");
          }
        } else {
          setAuthModel(true);
        }
      } catch (error: unknown) {
        toast.error(error.message);
      }
    };
    return (
      <div>
        <button onClick={handleSave} className="hover:opacity-60">
          <FontAwesomeIcon icon="fa-solid fa-save"
            className={`text-2xl pointer-event-none
          ${isSaved ? "text-green-600" : ""}
          `}
          />
        </button>
      </div>
    );
}

export default Bookmark