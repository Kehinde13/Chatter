import { collection, onSnapshot, query } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { db } from '../Auth/firebase';



function GetPosts(collectionName: string) {
    const [postLoading, setPostsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = () => {
          const postsRef = query(collection(db, collectionName));
          onSnapshot(postsRef, (snapshot) => {
            setPosts(
              snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }))
            );
            setPostsLoading(false);
          });
        };
        getPosts();
      }, []);
  return {
    posts,
    postLoading
}
}

export default GetPosts