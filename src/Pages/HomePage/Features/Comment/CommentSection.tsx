import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../../Auth/firebase";
import { Blog } from "../../../../Context/Context";
import profilePic from '../../../../assets/profile.jpg'
import Loading from "../../../../components/Loading";
import Comments, { Comment } from "./Comments";
import { FirebaseError } from "firebase/app";
import GetComments from "../../../../hooks/GetComments";

type prop = {
  postId: string
}

interface User {
  id: string,
  userId: string,
  username: string,
  email: string,
  userImg: string,
  bio: string,
}



function CommentSection({ postId }: prop) {
  const {
    currentUser,
    users,
    /* setCommentLength, */
  } = Blog();
  const [comment, setComment] = useState<string>("");

  const getUserData = users.find((user: User) => user.id === currentUser?.uid);

  const { commentData, loadingComment } = GetComments("posts", postId, "comments");


  const writeComment = async () => {
    try {
      if (comment === "") {
        toast.error("The input must be filled.");
      }

      const commentRef = collection(db, "posts", postId, "comments");
      await addDoc(commentRef, {
        commentText: comment,
        created: Date.now(),
        userId: currentUser?.uid,
      });
      toast.success("Comment has been added");
      setComment("");
    } catch (error: unknown) {
      if(error instanceof FirebaseError){
        toast.error(error.message);
      }
    }
  };

    
  return (
    <div>
      <h3 className="text-xl font-bold mt-5">Comments ({commentData.length})</h3>
      {/* comment form  */}
      {currentUser && (
          <div className="shadows p-3 my-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              <img
                className="w-[2rem] h-[2rem] object-cover rounded-full"
                src={getUserData?.userImg || profilePic}
                alt="user-img"
              />
              <h3 className="capitalize text-sm">{getUserData?.username}</h3>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment....."
              className="w-full outline-none resize-none text-sm border px-2 pt-4"></textarea>
            <div className="flex items-center justify-end gap-4 mt-[1rem]">
              <button onClick={() => setComment("")} className="text-sm">
                Cancel
              </button>
              <button
                onClick={writeComment}
                className="bn632-hover bn20">
                Comment
              </button>
            </div>
          </div>
        )}
        {commentData && commentData.length === 0 ? (
          <p>This post has no comments</p>
        ) : (
          <div className="border-t py-4 mt-8 flex flex-col gap-8">
            {commentData &&
              commentData.map((item: Comment, i: number) =>
                loadingComment ? (
                  <Loading />
                ) : (
                  <Comments item={item} postId={postId} key={i} />
                  
                )
              )}
          </div>
        )}
    </div>
  )
}

export default CommentSection