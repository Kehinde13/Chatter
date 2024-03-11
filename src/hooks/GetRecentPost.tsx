import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { db } from '../Auth/firebase';


interface Post {
  id: string;
  userId: string,
  title: string,
  desc: string,
  tags: string,
  postImg: string,
  created: string,
  pageViews: number,
}



function GetRecentPost(collectionName: string) {
    const [recentLoading, setRecentLoading] = useState<boolean>(true);
    const [recentPosts, setRecentPosts] = useState<Post[]>([])

    useEffect(() => {
        const getRecentPost = () => {
          const postsRef = query(collection(db, collectionName), orderBy("created", "desc"));
          onSnapshot(postsRef, (snapshot) => {
            setRecentPosts(
              snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              })) as Post[]
            );
            setRecentLoading(false);
          });
        };
        getRecentPost();
      }, [collectionName]);
  return {
    recentPosts,
    recentLoading
}
}

export default GetRecentPost