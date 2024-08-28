import { useState } from 'react';
import AboutIMG from '../../../assets/AboutImg.png';
import profile1 from "../../../assets/Profile1.png";


function Trending() {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className={`col-span-2 hidden md:block px-2 ${isFocused ? 'focused' : ''}`}
    id="focusSection"
    tabIndex={0}
    onFocus={handleFocus}
    onBlur={handleBlur}
    >
      <h1 className='text-xl my-5 font-semibold'>Trending Posts</h1>
      
      <img src={AboutIMG} alt="story Image" className='rounded-lg'/>  
        <h1 className='text-xl font-bold my-3'>Building your API Stack</h1>
        <p className='text-sm'>
            The rise of RESTful API has been met by a rise in tools for creating, testing, and managing them.
        </p>
        <div className='flex gap-2 text-sm items-center my-2'>
           <img src={profile1} alt="" className='rounded-full w-[8%]'/>
           <p>Kenny Raheem</p>
           <p>Aug 21</p>
        </div>
    </div>
  )
}

export default Trending