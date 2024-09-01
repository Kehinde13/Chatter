import { useState } from 'react';
import { Blog } from '../../../Context/Context';
import { Post } from '../../../hooks/GetPosts';
import Card from '../../../components/Card';


function Trending() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { posts } = Blog();
  const getTrending = posts && posts?.sort((a: Post, b: Post) => b.pageViews - a.pageViews);
  const recentPost = getTrending.slice(0, 6)

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className={`col-span-2 hidden md:block px-2 sticky scrollbar-hidden ${isFocused ? 'focused' : ''}`}
    id="focusSection"
    tabIndex={0}
    onFocus={handleFocus}
    onBlur={handleBlur}
    >
      <h1 className='text-xl my-5 font-semibold'>Trending Posts</h1>
      
      {
        recentPost?.map((post: Post, i: number) => <Card post={post} key={i} size="w-[100%]" />)
      }
    </div>
  )
}

export default Trending