import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { auth } from '../Auth/firebase';
import Loading from '../components/Loading';

const BlogContext = createContext();

type Props = {
    children: ReactNode;
}

function Context({children}: Props) {
  const [currentUser, setCurrentUser] = useState<object | boolean>(false)
  const [loading, setLoading] = useState(true)

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
  return (
    <BlogContext.Provider value={{ currentUser, setCurrentUser}}>
        {loading ? <Loading /> : children}
    </BlogContext.Provider>
  )
}

export default Context

export const Blog = () => useContext(BlogContext) 