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
      <div className="flex flex-col md:flex-row gap-10 justify-between flex-wrap">
        {
        recentPost?.map((post: Post, i: number) => <Card post={post} key={i} />)
      } 
      </div>
    </div>
  );
};

export default CardContainer;
