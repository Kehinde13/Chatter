import { collection, onSnapshot, query } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { db } from '../Auth/firebase';

interface User {
  id: string,
  userId: string,
  username: string,
  email: string,
  userImg: string,
  bio: string,
}

function GetUsers(collectionName: string) {
    const [userLoading, setUserLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const getUsers = () => {
          const userRef = query(collection(db, collectionName));
          onSnapshot(userRef, (snapshot) => {
            setUsers(
              snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              })) as User[]
            );
            setUserLoading(false);
          });
        };
        getUsers();
      }, [collectionName]);
  return {
    users,
    userLoading
}
}

export default GetUsers