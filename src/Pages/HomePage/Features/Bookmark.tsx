import { FaRegBookmark } from "react-icons/fa6";
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../../Auth/firebase';
import { Blog } from '../../../Context/Context';
import GetSinglePost from '../../../hooks/GetSinglePost';

type Post = {
  id: string;
};

type BookmarkProps = {
  post: Post;
};

function Bookmark({ post }: BookmarkProps) {
  const { currentUser, setAuthModel } = Blog();
  const { data } = GetSinglePost("users", post?.userId, "BookmarkedPost");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    setIsSaved(data && data.find((item: Post) => item.id === post.id) ? true : false);
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
      toast.error((error as Error).message);
    }
  };

  return (
    <div>
      <button onClick={handleSave} className="hover:opacity-60">
        <FaRegBookmark
          className={`text-2xl pointer-event-none ${isSaved ? "text-green-600" : ""}`}
        />
      </button>
    </div>
  );
}

export default Bookmark;
