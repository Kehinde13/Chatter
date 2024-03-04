import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Comment() {
  return (
    <button
      /* onClick={() => setShowComment(true)} */
      className="flex items-center gap-1 text-sm text-blue-400">
      <FontAwesomeIcon icon="fa-solid fa-comment" className="text-lg" />
      {/* <span>{formatNum(commentLength)}</span> */}
    </button>
  )
}

export default Comment