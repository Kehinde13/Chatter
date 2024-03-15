import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Auth/firebase";
import Loading from "../components/Loading";
import GetUsers from "../hooks/GetUsers";
import GetPosts, { Post } from "../hooks/GetPosts";
import GetRecentPost from "../hooks/GetRecentPost";
import { User as FirebaseUser } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";

export interface User {
  id: string;
  userId: string;
  username: string;
  email: string;
  userImg: string;
  bio: string;
}

type UserAndFirebaseUser = User & FirebaseUser;

type UpdateData = {
  title: string;
  description: string;
};


type BlogContextType = {
  currentUser: UserAndFirebaseUser | null;
  setCurrentUser: (user: UserAndFirebaseUser | null) => void;
  users: User[];
  userLoading: boolean;
  description: string;
  setDescription: (description: string) => void;
  title: string;
  setTitle: (title: string) => void;
  markdownText: string;
  setMarkdownText: (text: string) => void;
  posts: Post[];
  postLoading: boolean;
  recentPosts: Post[];
  recentLoading: boolean;
  commentLength: number;
  setCommentLength: (length: number) => void;
  updateData: UpdateData;
  setUpdateData: (data: UpdateData) => void;
  publish: boolean;
  setPublish: (publish: boolean) => void;
  authModel: boolean;
  setAuthModel: (authModel: boolean) => void;
  loading: boolean
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
  updateData: { title: "", description: "" }, 
  setUpdateData: () => {},
  publish: false,
  setPublish: () => {},
  authModel: false,
  setAuthModel: () => {},
  loading: false
});

type Props = {
  children: ReactNode;
};

function Context({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<UserAndFirebaseUser | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [markdownText, setMarkdownText] = useState<string>("");
  const { users, userLoading } = GetUsers("users");
  const { posts, postLoading } = GetPosts("posts");
  const { recentPosts, recentLoading } = GetRecentPost("posts");
  const [commentLength, setCommentLength] = useState<number>(0);
  const [updateData, setUpdateData] = useState<UpdateData>({ title: "", description: "" }); 
  const [publish, setPublish] = useState<boolean>(false);
  const [authModel, setAuthModel] = useState<boolean>(false);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.uid) {
          const userRef = collection(db, "users");
          const userSnapShot = await getDoc(doc(userRef, user.uid));
          if (userSnapShot.exists()) {
            setCurrentUser({
              ...user,
              ...(userSnapShot.data() as User),
            });
          } else {
            console.log("user not found");
          }
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unSubscribe();
  }, [setCurrentUser]);

  return (
    <BlogContext.Provider
      value={{
        loading,
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
        setAuthModel,
      }}
    >
      {loading ? <Loading /> : children}
    </BlogContext.Provider>
  );
}

export default Context;

export const Blog = () => useContext(BlogContext);
