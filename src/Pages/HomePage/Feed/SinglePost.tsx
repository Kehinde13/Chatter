import { useEffect, useRef, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { Blog } from '../../../Context/Context';
import { collection, doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../../Auth/firebase';
import { toast } from 'react-toastify';
import FollowBtn from '../Features/FollowBtn';
import moment from 'moment';
import Loading from '../../../components/Loading';
import { readTime } from '../../../utils/helper';
import Like from '../Features/Like';
import Actions from '../Features/Actions';
import Bookmark from '../Features/Bookmark';
import SharePost from '../Features/SharePost';
import CommentSection from '../Features/Comment/CommentSection';
import { User } from '../../../hooks/GetUsers';
import { Post } from '../../../hooks/GetPosts';

type PostData = User & Post

function SinglePost() {
  const [showSideBar]: [boolean] = useOutletContext();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = Blog();

  // increment page views
  const isInitialRender = useRef<boolean>(true);
  useEffect(() => {
    if (isInitialRender.current) {
      const incrementPageView = async () => {
        try {
          const ref = collection(db, 'posts');
          const singlePostRef = doc(ref, postId)
          await updateDoc(singlePostRef, {
            pageViews: increment(1),
          });
        } catch (error: unknown) {
          toast.error((error as Error).message);
        }
      };
      incrementPageView();
    }
    isInitialRender.current = false;
  }, [postId]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postRef = collection(db, 'posts');
        const postDoc = await getDoc(doc(postRef, postId))
        
        if (postDoc.exists()) {
          const postData = postDoc.data();
          if (postData?.userId) {
            const userRef = doc(db, 'users', postData?.userId);
            const getUser = await getDoc(userRef);
            if (getUser.exists()) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { created, ...rest } = getUser.data();
              setPost({ ...postData as Post, ...rest as User } );
            }
          }
        }
        setLoading(false);
      } catch (error: unknown) {
        toast.error((error as Error).message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return null;
  }

  const { title, desc, postImg, username, created, userImg, userId } = post;

  return (
    <div className={`p-1 ml-[-10px] sm:ml-5 sm:block w-[80%] ${showSideBar ? 'hidden' : ''}`}>
      <section className="w-[90%] mx-auto py-[3rem]">
        <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
        <div className="flex items-center gap-2 py-[2rem]">
          <Link to={`/HomePage/profile/${userId}`}>
            <img
              className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
              src={userImg}
              alt="user-img"
            />
          </Link>
          <div>
            <div className="capitalize flex gap-5">
              <span className="self-center bold">{username}</span>
              {currentUser && currentUser?.uid !== userId && <FollowBtn userId={userId} />}
            </div>
            <p className="text-sm text-gray-500">
              {readTime({__html:desc})} min read . <span className="ml-1">{moment(created).fromNow()}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-t border-gray-200 py-[0.5rem]">
          <div className="flex items-center gap-5">
            <Like postId={postId ?? ""} post={post} />
            <SharePost />
          </div>
          <div className="flex items-center pt-2 gap-5">
            {post && <Bookmark post={post} />}
            {currentUser && currentUser?.uid === post?.userId && <Actions postId={postId ?? ""} title={title} desc={desc} />}
          </div>
        </div>
        <div className="mt-[3rem]">
          {postImg && <img className="w-full h-[400px] object-cover" src={postImg} alt="post-img" />}
          <div className="mt-6" dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
        <CommentSection postId={postId ?? ""} />
      </section>
    </div>
  );
}

export default SinglePost;
