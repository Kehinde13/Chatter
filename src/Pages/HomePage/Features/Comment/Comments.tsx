import { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../Auth/firebase';
import { toast } from 'react-toastify';
import moment from 'moment';
import DropDown from '../../../../components/Dropdown';
import { Blog } from '../../../../Context/Context';
import { FirebaseError } from 'firebase/app';
import { Button } from "../../../../components/shadcn/button";

export interface Comment {
  userId: string;
  commentText: string;
  created: number;
  id: string;
  uid: string
}

interface UserData {
  id: string;
  userImg: string;
  username: string;
}

interface Props {
  comment?: Comment;
  postId: string;
  item: Comment; 
}

function Comments({ item: comment, postId }: Props) {
  const { users, currentUser } = Blog();
  const [drop, setDrop] = useState(false);
  const [more, setMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const getUserData = users.find((user: UserData) => user.id === comment?.userId);


  const [editComment, setEditComment] = useState<string>(comment.commentText);

  const removeComment = async () => {
    try {
      const ref = doc(db, 'posts', postId, 'comments', comment.id);
      await deleteDoc(ref);
      setDrop(false);
      toast.success('Comment has been removed');
    } catch (error: unknown) {
      if(error instanceof FirebaseError){
        toast.error(error.message);
      }
    }
  };

  const editCommentText = () => {
    setIsEdit(true);
    setDrop(false);
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const ref = doc(db, 'posts', postId, 'comments', comment.id);
      await updateDoc(ref, {
        commentText: editComment,
        created: Date.now(), 
        userId: currentUser?.uid,
      });
      setIsEdit(false);
      setDrop(false);
      toast.success('Comment has been updated');
    } catch (error: unknown) {
      if(error instanceof FirebaseError){
        toast.error(error.message);
      }
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
              src={getUserData?.userImg || '/profile.jpg'}
              alt="user-img"
            />
            <div className="flex-1 flex justify-between">
              <div>
                <h2 className="text-sm capitalize">{getUserData?.username}</h2>
                <p className="text-sm text-gray-400">{moment(comment.created).fromNow()}</p>
              </div>
              <div className="relative">
                {currentUser && currentUser.uid === comment.userId && (
                  <>
                    <button onClick={() => setDrop(!drop)} className="text-2xl hover:opacity-70">
                      ...
                    </button>
                    <DropDown showDrop={drop} setShowDrop={setDrop} size="w-[150px]">
                      <button onClick={editCommentText} title="Edit this response" className='p-1'>
                        Edit Comment
                      </button>
                      <button onClick={removeComment} title="Delete" className='text-red-500 hover:bg-red-300'>
                        Delete Comment
                      </button>
                    </DropDown>
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="py-4 text-sm">
            {more ? comment.commentText : comment.commentText.substring(0, 100)}
            {comment.commentText.length > 100 && (
              <button onClick={() => setMore(!more)}>{more ? '...less' : '...more'}</button>
            )}
          </p>
        </>
      ) : (
        <div className="bg-white dark:bg-slate-600 rounded-md shadows p-4">
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            placeholder="Write your update text..."
            className="w-full resize-none outline-none text-sm dark:bg-slate-800 rounded-md p-2"></textarea>
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => setIsEdit(false)} className="w-fit text-sm">
              Cancel
            </button>
            <Button
              onClick={handleEdit}
              className="bn632-hover bn20">
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Comments;

/*interface ButtonProps {
  click: () => void;
  title: string;
}

 const Button: React.FC<ButtonProps> = ({ click, title }) => {
  return (
    <button onClick={click} className="p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left">
      {title}
    </button>
  );
}; */
