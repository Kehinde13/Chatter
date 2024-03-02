import { collection, onSnapshot, query } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { db } from '../Auth/firebase';



function GetUsers(collectionName: string) {
    const [userLoading, setUserLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<Array>([])

    useEffect(() => {
        const getUsers = () => {
          const userRef = query(collection(db, collectionName));
          onSnapshot(userRef, (snapshot) => {
            setUsers(
              snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }))
            );
            setUserLoading(false);
          });
        };
        getUsers();
      }, []);
  return {
    users,
    userLoading
}
}

export default GetUsers