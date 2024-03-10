import React from "react";
import { Blog } from "../Context/Context";
import { readTime } from "../utils/helper";
import moment from "moment";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function Blogs() {
  const { posts } = Blog();
  const getTrending =
    posts && posts?.sort((a: object, b: object) => b.pageViews - a.pageViews);
  return (
    <div>
      <h1 className="text-3xl font-bold border-b-2 border-purple-500 m-5 pb-3 w-[20%] mx-auto text-center">
        Trending Posts
      </h1>
      {getTrending ? (
        getTrending?.map((post: object, i: number) => (
          <BlogCard post={post} key={i} />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Blogs;

type prop = {
  post: object;
};

const BlogCard = ({ post }: prop) => {
  const { title, desc, created, postImg, id: postId, username } = post;

  return (
    <section className="p-2 my-2 mx-auto sm:w-[70%]">
      <Link to={`/HomePage/SinglePost/${postId}`}>
        <div className="flex flex-col sm:flex-row gap-4 cursor-pointer ">
          <div className="flex-[2.5]">
            <p className="pb-2 font-semibold capitalize">{username}</p>
            <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
              {title}
            </h2>
            <div
              className="py-1 text-gray-500  line-clamp-2 leading-5"
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
      </div>
    </section>
  );
};
