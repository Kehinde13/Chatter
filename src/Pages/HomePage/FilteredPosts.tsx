import PostsCard from './Feed/PostsCard';
import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';
import { Blog } from '../../Context/Context';
import { Post } from '../../hooks/GetPosts';



function FilteredPosts() {
    const { tag } = useParams<{ tag?: string  }>();
    const { posts, postLoading } = Blog();

    if (!tag) {
      return (
        <section className="sm:mx-3 w-[80%]">
          <div>
            <h3 className="text-3xl pb-6 border-b border-purple-500 mb-[3rem] ">
              There are no tag specified
            </h3>
          </div>
        </section>
      );
    }
  
    const filteredData = posts.filter((post: Post) => post.tags.includes(tag));
  
    return (
      <section className="sm:mx-3 w-[80%]">
        <div>
          <h3 className="text-3xl pb-6 border-b border-purple-500 mb-[3rem] ">
            {filteredData.length
              ? "Your Filtered Posts "
              : "There are no post with this tag"}
          </h3>
          {postLoading ? (
            <Loading />
          ) : (
            <div className="lg:max-w-[60%] mx-10 flex flex-col gap-[2rem]">
              {filteredData &&
                filteredData.map((post: Post, i: number) => <PostsCard post={post} key={i} />)}
            </div>
          )}
        </div>
      </section>
    );
}

export default FilteredPosts