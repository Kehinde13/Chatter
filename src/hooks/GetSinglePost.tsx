import { collection, onSnapshot, query } from "firebase/firestore";
import  { useEffect, useState } from "react";
import { db } from "../Auth/firebase";
import { Post } from "./GetPosts";




const GetSinglePost = (collectionName: string, id: string, subCol: string) => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const getSingleData = () => {
      if (id) {
        const postRef = query(collection(db, collectionName, id, subCol));
        onSnapshot(postRef, (snapshot) => {
          setData(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })) as Post[]
          );
          setLoading(false)
        });
      }
    };
    getSingleData();
  }, [ id, collectionName, subCol]);
  return {
    data,
    loading
  };
};

export default GetSinglePost;
