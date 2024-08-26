import { readTime } from "../../../utils/helper.tsx";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import Bookmark from "../Features/Bookmark.js";
import { Post } from "../../../hooks/GetPosts.tsx";
import profileImg from "../../../assets/profile.jpg";

type prop = {
  post: Post;
};

const PostsCard = ({ post }: prop) => {
  const {
    title,
    desc,
    created,
    postImg,
    id: postId,
    username,
    userImg,
  } = post;

  return (
    <section className="border-b my-2 pb-2">
      <Link to={`/homepage/singlePost/${postId}`}>
        <div className="flex flex-col sm:flex-row gap-4 cursor-pointer ">
          <div className="flex-[2.5]">
            <div className="flex gap-3 items-center my-5">
              <img
                src={userImg ? userImg : profileImg}
                alt=""
                className="rounded-full w-8"
              />
              <p className="pb-2 font-semibold capitalize mt-2">
                {username ? username : "user"}
              </p>
            </div>
            <h1 className="text-2xl font-bold line-clamp-2 leading-6 capitalize my-5">
              {title}
            </h1>
            {postImg && (
              <div className="flex-[1]">
                <img
                  src={postImg}
                  alt="postImg"
                  className=" rounded-md my-2"
                />
              </div>
            )}
            <div
              className="py-1 text-gray-500 max-h-[100px] overflow-hidden leading-5"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between w-full md:w-[90%] mt-5">
        <p className=" text-gray-600 p-1">
          {readTime({ __html: desc })} min read,{" "}
          <span className="font-semibold">{moment(created).format("MMM DD")}</span>
        </p>
        <Bookmark post={post} />
      </div>
    </section>
  );
};

export default PostsCard;
