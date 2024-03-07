import React, { useEffect, useState } from "react";
import { readTime } from "../../../utils/helper";
import moment from "moment";
import GetPosts from "../../../hooks/GetPosts";
import GetSinglePost from "../../../hooks/GetSinglePost";
import { Blog } from "../../../Context/Context";
import { Link } from "react-router-dom";

function Featured() {
  const { posts } = GetPosts("posts");
  const { currentUser, users } = Blog();

  const [commonTags, setCommonTags] = useState([]);
  const getUserData = users.find((user: object) => user.id === currentUser?.uid);

  const { data: likedPost } = GetSinglePost("users", getUserData?.id, "likes");
  

  useEffect(() => {
    const recommendedPost: [] = [];
    posts &&
      posts.forEach((post: object) => {
        if (post.title === likedPost) {
          return;
        }

        const postTag = post.tags;
        const sameTags: [] = postTag.filter((tag: string) =>
          likedPost?.postTags?.includes(tag)
        );

        if (commonTags.length > 0) {
          recommendedPost.push({
            ...post,
            sameTags,
          });
        }
      });
      setCommonTags(recommendedPost)
      console.log(commonTags.length);
      
  }, [posts, likedPost]);

  return (
    <div>
      <section className="bg-gray-100">
        <div className="w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem]">
          <h2 className="text-xl font-bold">Recommended Posts</h2>
          {commonTags.length <= 0 ? (
            <p>No recommended posts found based on your preference, please like more posts</p>
          ) : (
            <div className="grid grid-cols-card gap-[2rem] my-[3rem]">
              {commonTags.map((post: object) => (
                <Post post={post} key={post.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Featured;

type prop ={
  post: object
}

const Post = ({ post }: prop) => {
  const { title, desc, created, postImg, id: postId, userId } = post;
  const { posts } = GetPosts("users");

  const { username, userImg } =
    posts && posts.find((user: object) => user?.id === userId);
  return (
    
    <div
     
      className="w-full cursor-pointer"
    >
      {postImg && (
        <img
          className="w-full h-[200px] object-cover"
          src={postImg}
          alt="post-img"
        />
      )}
      <div className="flex items-center gap-1 py-3">
        <img
          className="w-[2rem] h-[2rem] object-cover rounded-full"
          src={userImg}
          alt="userImg"
        />
        <h3 className="text-sm capitalize">{username}</h3>
      </div>
      <h2 className="font-extrabold leading-5 line-clamp-2">{title}</h2>
      <div
        className="line-clamp-2 my-3 text-gray-500 leading-5"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
      <p className="text-sm text-gray-600">
        {readTime({ __html: desc })} min read
        <span className="ml-3">{moment(created).format("MMM DD")}</span>
      </p>
    </div>
  );
};
