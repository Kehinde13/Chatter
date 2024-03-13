import { Blog } from "../../../Context/Context";
import Loading from "../../../components/Loading";
import { Post } from "../../../hooks/GetPosts";
import { User } from "../../../hooks/GetUsers";
import PostsCard from "../Feed/PostsCard";

type prop = {
  getUserData: User
}


const Stories = ({getUserData}: prop) => {
  const { posts, postLoading } = Blog();
  const userPost =
    posts &&
    posts?.filter((post: Post) => post?.userId === getUserData?.userId);

  return (
    <div className="flex flex-col gap-5 mb-[4rem]">
      {userPost.length === 0 && (
        <p className="text-gray-500">
          <span className="capitalize">{getUserData?.username}</span> has no
          posts
        </p>
      )}
      {postLoading ? (
        <Loading />
      ) : (
        userPost &&
        userPost?.map((post: Post, i: number) => <PostsCard post={post} key={i} />)
      )}
    </div>
  );
}

export default Stories