import { collection, onSnapshot, query } from "firebase/firestore";
import  { useEffect, useState } from "react";
import { db } from "../Auth/firebase";


export interface Comment {
    userId: string;
    commentText: string;
    created: number;
    id: string;
    uid: string
  }

const GetComments = (collectionName: string, id: string, subCol: string) => {
  const [commentData, setComment] = useState<Comment[]>([]);
  const [loadingComment, setCommentLoading] = useState<boolean>(true)
  useEffect(() => {
    const getSingleData = () => {
      if (id) {
        const postRef = query(collection(db, collectionName, id, subCol));
        onSnapshot(postRef, (snapshot) => {
          setComment(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })) as Comment[]
          );
          setCommentLoading(false)
        });
      }
    };
    getSingleData();
  }, [ id, collectionName, subCol]);
  return {
    commentData,
    loadingComment
  };
};

export default GetComments;
