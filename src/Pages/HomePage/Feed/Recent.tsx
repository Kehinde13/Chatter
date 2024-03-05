import { Blog } from '../../../Context/Context';
import PostsCard from './PostsCard';
import Loading from '../../../components/Loading';

function Recent() {
  const {recentPosts, recentLoading} = Blog()
  return (
    <section className="flex flex-col gap-[2.5rem]">
      {recentLoading ? (
        <Loading />
      ) : (
        recentPosts &&
        recentPosts?.map((post: object, i: number) => <PostsCard post={post} key={i} />)
      )}
    </section>
  );
}

export default Recent