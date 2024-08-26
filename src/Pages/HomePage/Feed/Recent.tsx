import { Blog } from '../../../Context/Context';
import PostsCard from './PostsCard';
import Loading from '../../../components/Loading';
import { Post } from '../../../hooks/GetPosts';



function Recent() {
  const {recentPosts, recentLoading} = Blog()
  return (
    <section className="flex flex-col gap-[2.5rem] col-span-4 border-r pr-2">
      {recentLoading ? (
        <Loading />
      ) : (
        recentPosts &&
        recentPosts?.map((post: Post, i: number) => <PostsCard post={post} key={i} />)
      )}
    </section>
  );
}

export default Recent