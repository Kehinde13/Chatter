import { useState } from 'react';
import DropDown from '../../../components/Dropdown';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebookSquare, FaRegCopy } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import { Share2 } from 'lucide-react';

interface ButtonProps {
  click: () => void;
  title: string;
  icon?: JSX.Element;
}

function SharePost() {
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const path = window.location.href;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(path);
      toast.success('Link has been copied');
      setShowDrop(false);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
      setShowDrop(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setShowDrop(!showDrop)}>
        <Share2 className='text-xl'/>
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
        <Button click={copyLink} title="Copy Link" icon={<FaRegCopy />} />
        <TwitterShareButton url={path}>
          <Button click={() => {}} title="Share On Twitter" icon={<FaTwitter />} />
        </TwitterShareButton>
        <FacebookShareButton url={path}>
          <Button click={() => {}} title="Share On Facebook" icon={<FaFacebookSquare />} />
        </FacebookShareButton>
        <LinkedinShareButton url={path}>
          <Button click={() => {}} title="Share On LinkedIn" icon={<FaLinkedin />} />
        </LinkedinShareButton>
      </DropDown>
    </div>
  );
}

export default SharePost;

const Button = ({ click, icon, title }: ButtonProps) => {
  return (
    <button
      onClick={click}
      className="p-2 hover:bg-gray-200 hover:text-black/80 w-full text-sm text-left
        flex items-center gap-2 cursor-pointer text-gray-500"
    >
      {icon && <span className="text-[1.2rem]">{icon}</span>}
      {title}
    </button>
  );
};
