import { Blog } from '../../../Context/Context';
import { Post } from '../../../hooks/GetPosts';
import PostsCard from './PostsCard';

function Trending() {
  const { posts } = Blog();
  const getTrending =
    posts && posts?.sort((a: Post, b: Post) => b.pageViews - a.pageViews);
  return (
    <div >
      {
        getTrending && 
        getTrending?.map((post: Post, i: number) => <PostsCard post={post} key={i} />)
      }
    </div>
  )
}

export default Trending