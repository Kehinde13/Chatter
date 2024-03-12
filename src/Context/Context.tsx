import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/firebase';
import Loading from '../components/Loading';
import GetUsers from '../hooks/GetUsers';
import GetPosts from '../hooks/GetPosts';
import GetRecentPost from '../hooks/GetRecentPost';
import {  User as FirebaseUser } from 'firebase/auth';

interface User {
  id: string,
  userId: string,
  username: string,
  email: string,
  userImg: string,
  bio: string,
}


// Define the type for the context value
type BlogContextType = {
    currentUser: FirebaseUser | null;
    setCurrentUser: (user: FirebaseUser | null) => void;
    users: User[]; 
    userLoading: boolean;
    description: string;
    setDescription: (description: string) => void;
    title: string;
    setTitle: (title: string) => void;
    markdownText: string;
    setMarkdownText: (text: string) => void;
    posts: object[]; 
    postLoading: boolean;
    recentPosts: object[]; 
    recentLoading: boolean;
    commentLength: number;
    setCommentLength: (length: number) => void;
    updateData: object;
    setUpdateData: (data: object) => void;
    publish: boolean;
    setPublish: (publish: boolean) => void;
    authModel: boolean,
    setAuthModel: (authModel: boolean) => void;
};

const BlogContext = createContext<BlogContextType>({
    currentUser: null,
    setCurrentUser: () => {},
    users: [],
    userLoading: true,
    description: "",
    setDescription: () => {},
    title: "",
    setTitle: () => {},
    markdownText: "",
    setMarkdownText: () => {},
    posts: [],
    postLoading: true,
    recentPosts: [],
    recentLoading: true,
    commentLength: 0,
    setCommentLength: () => {},
    updateData: {},
    setUpdateData: () => {},
    publish: false,
    setPublish: () => {},
    authModel: false,
    setAuthModel: () => {},
});

type Props = {
    children: ReactNode;
}

function Context({ children }: Props) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [description, setDescription] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [markdownText, setMarkdownText] = useState<string>("");
    const { users, userLoading } = GetUsers("users");
    const { posts, postLoading } = GetPosts("posts");
    const { recentPosts, recentLoading } = GetRecentPost("posts");
    const [commentLength, setCommentLength] = useState<number>(0);
    const [updateData, setUpdateData] = useState<object>({});
    const [publish, setPublish] = useState<boolean>(false);
    const [authModel, setAuthModel] = useState<boolean>(false);

    

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });
        return () => unSubscribe();
    }, [setCurrentUser]);

    return (
        <BlogContext.Provider value={{
            currentUser,
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
            setCommentLength,
            updateData,
            setUpdateData,
            publish,
            setPublish,
            authModel, 
            setAuthModel
        }}>
            {loading ? <Loading /> : children}
        </BlogContext.Provider>
    );
}

export default Context;

export const Blog = () => useContext(BlogContext);
