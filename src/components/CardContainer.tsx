import { Blog } from "../Context/Context";
import { Post } from "../hooks/GetPosts";
import Card from "./Card";

const CardContainer = () => {
  const { posts } = Blog();
  const getTrending = posts && posts?.sort((a: Post, b: Post) => b.pageViews - a.pageViews);
  const recentPost = getTrending.slice(0, 6)
     
  return (
    <div className="my-20 w-[80%] mx-auto px-3">
      <h1 className="text-2xl md:text-3xl my-5 md:my-10 mx-2 font-bold">Recent Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {
        recentPost?.map((post: Post, i: number) => <Card post={post} key={i} size="w-[30%]" />)
      } 
      </div>
    </div>
  );
};

export default CardContainer;
