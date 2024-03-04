import { useState } from 'react'
import DropDown from '../../../components/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { toast } from 'react-toastify';

function SharePost() {
    const [showDrop, setShowDrop] = useState<boolean>(false)
    const path = window.location.href;

    const copyLink = async () => {
        try {
          await navigator.clipboard.writeText(path);
          toast.success("Link has been copied");
          setShowDrop(false);
        } catch (error: unknown) {
          toast.error(error.message);
          setShowDrop(false);
        }
      };
  return (
    <div className='relative'>
     <button onClick={(e) => setShowDrop(!showDrop)}>
        <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" />
     </button>
     <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
     <Button click={copyLink} title="Copy Link" icon={<FontAwesomeIcon icon="fa-solid fa-copy" />} />
        <TwitterShareButton url={path}>
          <Button title="Share On Twitter" icon={<FontAwesomeIcon icon="fa-brands fa-twitter" />} />
        </TwitterShareButton>
        <FacebookShareButton url={path}>
          <Button title="Share On Facebook" icon={<FontAwesomeIcon icon="fa-brands fa-facebook" />} />
        </FacebookShareButton>
        <LinkedinShareButton url={path}>
          <Button title="Share On LinkedIn" icon={<FontAwesomeIcon icon="fa-brands fa-linkedin" />} />
        </LinkedinShareButton>  
    </DropDown>
    </div>
  )
}

export default SharePost;

const Button = ({ click, icon, title }) => {
    return (
      <button
        onClick={click}
        className="p-2 hover:bg-gray-200 hover:text-black/80 w-full text-sm text-left
        flex items-center gap-2 cursor-pointer text-gray-500">
        <span className="text-[1.2rem]">{icon}</span>
        {title}
      </button>
    );
  };