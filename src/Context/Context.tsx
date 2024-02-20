import { createContext, useContext, useState, ReactNode } from 'react'

const BlogContext = createContext();

type Props = {
    children: ReactNode;
}

function Context({children}: Props) {
  const [currentUser, setCurrentUser] = useState<boolean>(false)
  return (
    <BlogContext.Provider value={{ currentUser, setCurrentUser}}>
        {children}
    </BlogContext.Provider>
  )
}

export default Context

export const Blog = () => useContext(BlogContext) 