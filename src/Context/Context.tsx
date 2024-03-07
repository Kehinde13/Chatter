import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { auth } from '../Auth/firebase';
import Loading from '../components/Loading';
import GetUsers from '../hooks/GetUsers';
import GetPosts from '../hooks/GetPosts';
import GetRecentPost from '../hooks/GetRecentPost';

const BlogContext = createContext();

type Props = {
    children: ReactNode;
}

function Context({children}: Props) {
  const [currentUser, setCurrentUser] = useState<object | boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [markdownText, setMarkdownText] = useState<string>("")
  const {users, userLoading} = GetUsers("users")
  const {posts, postLoading} = GetPosts("posts")
  const {recentPosts, recentLoading} = GetRecentPost("posts")
  const [commentLength, setCommentLength] = useState(0);
  

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
    <BlogContext.Provider value={{ currentUser, 
    setCurrentUser, 
    users, 
    userLoading,  
    description, 
    setDescription,
    title, 
    setTitle,
    markdownText,
    setMarkdownText,
    posts,
    postLoading,
    recentPosts,
    recentLoading,
    commentLength,
    setCommentLength
    }}>
        {loading ? <Loading /> : children}
    </BlogContext.Provider>
  )
}

export default Context

export const Blog = () => useContext(BlogContext) 