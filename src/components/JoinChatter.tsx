import profile1 from "../assets/Profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";

function JoinChetter() {
  return (
    <div className="w-full mt-10">
      <div className="bg-[#FFEDCC80] md:flex justify-between p-10 md:p-20 gap-20">
        <img src={profile1} alt="" className="rounded-full" />
        <div className="flex flex-col gap-10 my-5">
          <p>
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>
          <p>
            <span className="font-bold text-xl">Adebobola Muhydeen, </span> 
            Software developer at Apple
          </p>
          <button className="bold md:py-2 md:px-10 p-1  bg-purple-500 rounded-md self-start text-white">
            Join Chatter
          </button>
        </div>
      </div>
      <div className="md:flex justify-between p-10 md:p-20 ">
        <div className="">
           <img src={profile2} alt="" className="rounded-full"/>
           <img src={profile4} alt=""  className="float-right rounded-full md:mt-[-28px] ml-20"/>
           <img src={profile3} alt="" className="rounded-full mt-20"/>
        </div>
        <div className="flex flex-col gap-10 my-5 md:mx-20">
            <h1 className="text-3xl font-bold md:w-[70%]">Write, read and connect with great minds on chatter</h1>
            <p>
            Share people your great ideas, and also read write-ups based on your interests. connect with people of same interests and goals  
            </p>
            <button className="bold md:py-2 md:px-10 p-1  bg-purple-500 rounded-md self-start text-white">
            Join Chatter
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinChetter;
