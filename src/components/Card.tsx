import AboutIMG from '../assets/AboutImg.png';
import profile1 from "../assets/Profile1.png";

const Card = () => {
  return (
    <div className='w-[100%] md:w-[30%] flex flex-col gap-3 '>
        <img src={AboutIMG} alt="story Image" className='rounded-lg'/>  
        <h1 className='text-xl font-bold'>Building your API Stack</h1>
        <p className='text-sm'>
            The rise of RESTful API has been met by a rise in tools for creating, testing, and managing them.
        </p>
        <div className='flex gap-2 text-sm items-center'>
           <img src={profile1} alt="" className='rounded-full w-[8%]'/>
           <p>Kenny Raheem</p>
           <p>19-Aug-2021</p>
        </div>
    </div>
  )
}

export default Card