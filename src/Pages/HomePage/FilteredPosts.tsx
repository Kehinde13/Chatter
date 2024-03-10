import PostsCard from './Feed/PostsCard';
import Loading from '../../components/Loading';
import { useOutletContext, useParams } from 'react-router-dom';
import { Blog } from '../../Context/Context';

function FilteredPosts() {
    const { tag } = useParams();
    const { posts, postLoading } = Blog();
    const [showSideBar]= useOutletContext()
  
    const filteredData = posts.filter((post: object) => post.tags.includes(tag));
  
    return (
      <section className={`sm:mx-3 w-[80%] ${showSideBar ? "hidden" : " "}`}>
        <div>
          <h3 className="text-3xl pb-6 border-b border-purple-500 mb-[3rem] text-center">
            {filteredData.length
              ? "Your Filtered Posts "
              : "There are no post with this tag"}
          </h3>
          {postLoading ? (
            <Loading />
          ) : (
            <div className="lg:max-w-[60%] mx-10 flex flex-col gap-[2rem]">
              {filteredData &&
                filteredData.map((post: object, i: number) => <PostsCard post={post} key={i} />)}
            </div>
          )}
        </div>
      </section>
    );
}

export default FilteredPosts