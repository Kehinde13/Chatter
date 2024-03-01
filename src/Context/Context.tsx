import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { auth, db } from '../Auth/firebase';
import Loading from '../components/Loading';
import { collection, onSnapshot, query } from 'firebase/firestore';

const BlogContext = createContext();

type Props = {
    children: ReactNode;
}

function Context({children}: Props) {
  const [currentUser, setCurrentUser] = useState<object | boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [users, setUsers] = useState([])
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [markdownText, setMarkdownText] = useState<string>("")

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
        if(user) {
            setCurrentUser(user)
        } else {
            setCurrentUser(false)
        }
        setLoading(false)
    });
     return () => unSubscribe();
  }, [currentUser])

  useEffect(() => {
    const getUsers = () => {
      const userRef = query(collection(db, "users"));
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

  return (
    <BlogContext.Provider value={{ currentUser, 
    setCurrentUser, 
    users, 
    userLoading,  
    description, 
    setDescription,
    title, 
    setTitle,
    markdownText,
    setMarkdownText
    }}>
        {loading ? <Loading /> : children}
    </BlogContext.Provider>
  )
}

export default Context

export const Blog = () => useContext(BlogContext) 