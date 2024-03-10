import React from 'react'
import { Blog } from '../../../Context/Context';
import { useOutletContext } from 'react-router-dom';
import PostsCard from './PostsCard';

function Trending() {
  const { posts } = Blog();
  const [showSideBar] = useOutletContext()
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