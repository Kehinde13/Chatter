import React from 'react'
import { Blog } from '../../../Context/Context';
import GetSinglePost from '../../../hooks/GetSinglePost';
import Loading from '../../../components/Loading';
import PostsCard from '../Feed/PostsCard';

type prop = {
  getUserData: object
}

function Lists({getUserData}: prop) {
  const { currentUser } = Blog();
  const { data, loading } = GetSinglePost(
    "users",
    currentUser?.uid,
    "BookmarkedPost"
  );
  return (
    <div>
      {currentUser && currentUser?.uid === getUserData?.userId ? (
        <div className="flex flex-col gap-[2rem] mb-[2rem]">
          {data && data.length === 0 && (
            <p className="text-2xl first-letter:uppercase">
              <span className="capitalize mr-1">{getUserData?.username}</span>{" "}
              has no saved post
            </p>
          )}
          {loading ? (
            <Loading />
          ) : (
            data && data?.map((post: object, i: number) => <PostsCard post={post} key={i} />)
          )}
        </div>
      ) : (
        <p className='text-2xl first-letter:uppercase'>
          {getUserData?.username}'s Bookmarked posts are Private
        </p>
      )}
    </div>
  );
}

export default Lists