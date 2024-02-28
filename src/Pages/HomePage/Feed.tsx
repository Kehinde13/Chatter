import React from 'react'
import { useOutletContext } from 'react-router-dom'

function Feed() {
  const [showSideBar] = useOutletContext()
  return (
    <div  className={`p-5 sm:block ${showSideBar ? "hidden" : "ml-3"}`}>
      <div>
        ioerbce sdniocerve jhiosd sdochuc jkasducysc jac7ceyuw
      </div>
    </div>
  )
}

export default Feed