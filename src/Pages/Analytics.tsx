import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import GetSinglePost from "../hooks/GetSinglePost";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Auth/firebase";
import Loading from "../components/Loading";

function Analytics() {
  const [showSideBar] = useOutletContext();
  const [loading, setLoading] = useState<boolean>(false);
  /* const [views, setViews] = useState<string>("0"); */
  const [postData, setPostData] = useState<object>({
    postViews: "",
    postImage: "",
    postTitle: "",
  });
  const { pathname } = useLocation();
  const postId = pathname.split("/")[3];

  const { data: likes } = GetSinglePost("posts", postId, "likes");
  const { data: comments } = GetSinglePost("posts", postId, "comments");

  useEffect(() => {
    setLoading(true);
    const getSingleData = async () => {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPostData({
          postViews: docSnap.data().pageViews,
          postImage: docSnap.data().postImg,
          postTitle: docSnap.data().title,
        });
      }
    };
    getSingleData();
    setLoading(false);
  }, [postId]);

  return (
    <div
      className={`p-1 ml-[-10px] sm:ml-5 sm:block w-[80%] ${
        showSideBar ? "hidden" : ""
      }`}
    >
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-3xl pb-3 border-b border-purple-500 mb-2">
            Post Analytics
          </h1>
          <div className="">
            <div className="mt-10 flex flex-col sm:w-[50%]">
              {postData.postImage && (
                <img
                  src={postData.postImage}
                  alt="postImg"
                  className=" object-cover"
                />
              )}
              <h2 className="text-2xl p-3 sm:m-5">{postData.postTitle}</h2>
            </div>
            <div className="mt-10 ml-5">
              <div className="flex gap-5 my-5">
                <h1 className="text-5xl text-gray-400">{postData.postViews}</h1>
                <p className="self-end">Views</p>
              </div>
              <div className="flex gap-5 my-5">
                <h1 className="text-5xl text-gray-400">{likes.length}</h1>
                <p className="self-end">Likes</p>
              </div>
              <div className="flex gap-5 my-5">
                <h1 className="text-5xl text-gray-400">{comments.length}</h1>
                <p className="self-end">Comments</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
