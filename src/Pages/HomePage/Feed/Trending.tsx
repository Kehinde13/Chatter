import { Blog } from '../../../Context/Context';
import PostsCard from './PostsCard';

function Trending() {
  const { posts } = Blog();
  const getTrending =
    posts && posts?.sort((a: object, b: object) => b.pageViews - a.pageViews);
  return (
    <div >
      {
        getTrending && 
        getTrending?.map((post: object, i: number) => <PostsCard post={post} key={i} />)
      }
    </div>
  )
}

export default Trending