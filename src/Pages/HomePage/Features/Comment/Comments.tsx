import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../../Auth/firebase';
import { toast } from 'react-toastify';
import moment from 'moment';
import DropDown from '../../../../components/Dropdown';
import { Blog } from '../../../../Context/Context';

type prop = {
    comment: object
    postId: string
    item: object
}

function Comments({ item: comment, postId }: prop) {
  const { users, currentUser } = Blog();
  const [drop, setDrop] = useState(false);
  const [more, setMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const getUserData = users.find((user: object) => user.id === comment?.userId);

  const [editComment, setEditComment] = useState<string>("");

  const { userId, commentText, created } = comment;

  const removeComment = async () => {
    try {
      const ref = doc(db, "posts", postId, "comments", comment?.id);
      await deleteDoc(ref);
      setDrop(false);
      toast.success("Comment has been removed");
    } catch (error: unknown) {
      toast.error(error.message);
    }
  };

  const editCommentText = () => {
    setIsEdit(true);
    setDrop(false);
    setEditComment(commentText);
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const ref = doc(db, "posts", postId, "comments", comment.id);
      await updateDoc(ref, {
        commentText: editComment,
        create: Date.now(),
        userId: currentUser?.uid,
      });
      setEditComment("");
      setIsEdit(false);
      setDrop(false);
      toast.success("Comment has been updated");
    } catch (error: unknown) {
      toast.success(error.message);
    } finally {
      setLoading(false);
    }
  };
    return (
        <section className="border-b">
          {!isEdit ? (
            <>
              <div className="flex items-center gap-5">
                <img
                  className="w-[2rem] h-[2rem] object-cover rounded-full"
                  src={getUserData?.userImg || "/profile.jpg"}
                  alt="user-img"
                />
                <div className="flex-1 flex justify-between">
                  <div>
                    <h2 className="text-sm capitalize">{getUserData?.username}</h2>
                    <p className="text-sm text-gray-400">
                      {moment(created).fromNow()}
                    </p>
                  </div>
                  <div className="relative">
                    {currentUser && currentUser?.uid === userId && (
                      <>
                        <button
                          onClick={() => setDrop(!drop)}
                          className="text-2xl hover:opacity-70">
                           ...
                        </button>
                        <DropDown
                          showDrop={drop}
                          setShowDrop={setDrop}
                          size="w-[10rem]">
                          <Button
                            click={editCommentText}
                            title="Edit this response"
                          />
                          <Button click={removeComment} title="Delete" />
                        </DropDown>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="py-4 text-sm">
                {more ? commentText : commentText.substring(0, 100)}
                {commentText.length > 100 && (
                  <button onClick={() => setMore(!more)}>
                    {more ? "...less" : "...more"}
                  </button>
                )}
              </p>
            </>
          ) : (
            <div className="bg-white shadows p-4">
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                placeholder="Write your update text..."
                className="w-full resize-none outline-none text-sm"></textarea>
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => setIsEdit(false)} className="w-fit text-sm">
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="btn !text-white !p-2 !bg-purple-500 !rounded-full !text-xs">
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          )}
        </section>
      );
}

export default Comments

const Button = ({ click, title }) => {
    return (
      <button
        onClick={click}
        className="p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left">
        {title}
      </button>
    );
  };