import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../Auth/firebase';
import { Comment } from '../Pages/HomePage/Features/Comment/Comments';



export interface Post {
  id: string;
  userId: string,
  title: string,
  desc: string,
  tags: string[],
  postImg: string,
  created: string,
  pageViews: number,
  comments?: Comment[] 
}

function GetPosts(collectionName: string) {
  const [postLoading, setPostsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]); 

  useEffect(() => {
    const getPosts = () => {
      const postsRef = query(collection(db, collectionName));
      onSnapshot(postsRef, (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as Post[] 
        );
        setPostsLoading(false);
      });
    };
    getPosts();
  }, [collectionName]);

  return {
    posts,
    postLoading
  };
}

export default GetPosts;
