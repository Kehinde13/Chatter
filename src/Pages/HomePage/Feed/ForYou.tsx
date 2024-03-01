import { Blog } from '../../../Context/Context';
import PostsCard from './PostsCard';
import Loading from '../../../components/Loading';

function ForYou() {
  const {posts, postLoading} = Blog()
  return (
    <section className="flex flex-col gap-[2.5rem]">
      {postLoading ? (
        <Loading />
      ) : (
        posts &&
        posts?.map((post: object, i: number) => <PostsCard post={post} key={i} />)
      )}
    </section>
  );
}

export default ForYou