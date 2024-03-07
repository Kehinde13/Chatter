import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { Blog } from '../../../Context/Context';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../Auth/firebase';
import { toast } from 'react-toastify';
import FollowBtn from '../Features/FollowBtn';
import moment from 'moment';
import Loading from '../../../components/Loading';
import { readTime } from "../../../utils/helper.tsx";
import Like from '../Features/Like.tsx';
import Comment from '../Features/Comment.tsx';
import Actions from '../Features/Actions.tsx';
import Bookmark from '../Features/Bookmark.tsx';
import SharePost from '../Features/SharePost.tsx';
import CommentSection from '../Features/Comment/CommentSection.tsx';

function SinglePost() {
const [showSideBar] = useOutletContext()
const { postId } = useParams();
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = Blog();


  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postRef = doc(db, "posts", postId);
        const getPost = await getDoc(postRef);

        if (getPost.exists()) {
          const postData = getPost.data();
          if (postData?.userId) {
            const userRef = doc(db, "users", postData?.userId);
            const getUser = await getDoc(userRef);

            if (getUser.exists()) {
              const { created, ...rest } = getUser.data();
              setPost({ ...postData, ...rest, id: postId });
            }
          }
        }
        setLoading(false);
      } catch (error: unknown) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, post?.userId]);

  const { title, desc, postImg, username, created, userImg, userId } = post;

  return (
    <div className={`p-1 ml-[-10px] sm:ml-5 sm:block w-[80%] ${
        showSideBar ? "hidden" : ""
      }`}>
        {loading ? (
        <Loading />
      ) : (
          <section className="w-[90%]  mx-auto py-[3rem]">
            <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
            <div className="flex items-center gap-2 py-[2rem]">
              <img
                /* onClick={() => navigate(`/profile/${userId}`)} */
                className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
                src={userImg}
                alt="user-img"
              />
              <div>
                <div className="capitalize">
                  <span>{username} .</span>
                  {currentUser && currentUser?.uid !== userId && (
                    <FollowBtn userId={userId} />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {readTime({ __html: desc })} min read .
                  <span className="ml-1">{moment(created).fromNow()}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-t border-gray-200 py-[0.5rem]">
              <div className="flex items-center gap-5">
                <Like postId={postId} post={post} />
                <SharePost />
              </div>
              <div className="flex items-center pt-2 gap-5">
                {post && <Bookmark post={post} />}
                {currentUser && currentUser?.uid === post?.userId && (
                  <Actions postId={postId} title={title} desc={desc} />
                )}
              </div>
            </div>
            <div className="mt-[3rem]">
              {postImg && (
                <img
                  className="w-full h-[400px] object-cover"
                  src={postImg}
                  alt="post-img"
                />
              )}
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            </div>
            <CommentSection postId={postId} />
          </section>
        )}
    </div>
  )
}

export default SinglePost