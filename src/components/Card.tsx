import moment from 'moment';
import profile1 from "../assets/Profile1.png";
import { Post } from '../hooks/GetPosts';
import { Link } from 'react-router-dom';

type Prop = {
  post: Post
}

const Card = ({post}: Prop) => {
  const {
    title,
    desc,
    created,
    postImg,
    id: postId,
    username,
    userImg,
  } = post;
  return (
    <Link to={`singlePost/${postId}`} className='w-[100%] md:w-[30%] flex flex-col gap-3 '>
        <img src={postImg} alt="story Image" className='rounded-lg w-full h-[200px]'/>  
        <h1 className='text-xl font-bold'>{title}</h1>
        <div className="py-1 text-gray-500 max-h-[100px] text-sm overflow-hidden leading-5"
        dangerouslySetInnerHTML={{ __html: desc }}></div>
        <div className='flex gap-2 text-sm items-center'>
           <img src={userImg ? userImg : profile1} alt="" className='rounded-full w-[8%] h-6'/>
           <p>{username}</p>
           <p>{moment(created).format("MMM DD")}</p>
        </div>
    </Link>
  )
}

export default Card