import { readTime } from "../../../utils/helper.tsx";
import moment from "moment/moment";
/* import SavedPost from "./Actions/SavedPost"; */
import { Blog } from "../../../Context/Context";
/* import Actions from "./Actions/Actions"; */
import { Link } from "react-router-dom";
import Bookmark from "../Features/Bookmark.js";
import Actions from "../Features/Actions.js";
import { Post } from "../../../hooks/GetPosts.tsx";

type prop = {
    post: Post
}

const PostsCard = ({ post }: prop) => {
  const { title, desc, created, postImg, id: postId, userId, username } = post;
  const { currentUser } = Blog();



  return (
    <section className=" border-b my-2 pb-2">
      <Link to={`/HomePage/SinglePost/${postId}`}>
      <div
        className="flex flex-col sm:flex-row gap-4 cursor-pointer ">
        <div className="flex-[2.5]">
          <p className="pb-2 font-semibold capitalize">{username}</p>
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
            {title} 
          </h2>
          <div
            className="py-1 text-gray-500 h-[400px] overflow-hidden leading-5"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
        {postImg && (
          <div className="flex-[1]">
            <img
              src={postImg}
              alt="postImg"
              className="w-[53rem] h-[8rem] object-cover"
            />
          </div>
        )}
      </div>
      </Link>
      <div className="flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0">
        <p className="text-xs text-gray-600 ">
          {readTime({ __html: desc })} min read .
          {moment(created).format("MMM DD")}
        </p>
        <div className="flex items-center gap-3">
          <Bookmark post={post} />
          {currentUser?.uid === userId && (
            <Actions postId={postId} title={title} desc={desc} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PostsCard;
