import { collection, onSnapshot, query } from "firebase/firestore";
import  { useEffect, useState } from "react";
import { db } from "../Auth/firebase";

const GetSinglePost = (collectionName: string, id: string, subCol: string) => {
  const [data, setData] = useState<Array>([]);
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
            }))
          );
          setLoading(false)
        });
      }
    };
    getSingleData();
  }, [db, id]);
  return {
    data,
    loading
  };
};

export default GetSinglePost;
