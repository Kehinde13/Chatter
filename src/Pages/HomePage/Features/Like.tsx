import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function Like() {
    const [Like, setLike] = useState<boolean>(false)

  return (
    <button /* onClick={handleLike} */ className="flex items-center gap-1 text-sm">
      <FontAwesomeIcon icon="fa-solid fa-heart"
        className={`text-xl ${Like ? "text-red-500" : "text-gray-500"}`}
      />
      {/* <span>{formatNum(data?.length)}</span> */}
    </button>
  )
}

export default Like