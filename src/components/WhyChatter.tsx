import Group1 from "../assets/Group 1.png";
import Group2 from "../assets/Group 2.png";
import Group3 from "../assets/Group 3.png";


function WhyChatter() {
  return (
    <div className="w-[80%] mx-auto text-center">
      <div className=" my-20">
        <h1 className="font-bold my-5 text-xl md:text-4xl text-center">Why you should join chatter</h1>
        <p className="md:w-[80%] mx-auto">
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:mx-20 justify-around gap-5">
        <div className="md:w-[50%] border border-gray-300 p-5 flex flex-col gap-5 rounded-md">
          <img src={Group1} alt=""  className="self-center"/>
          <h1 className="font-bold text-xl">Analytics</h1>
          <p>
            Analytics to track the number of views, likes and comment and also
            analyze the performance of your articles over a period of time
          </p>
        </div>
        <div className="md:w-[50%] border border-gray-300 p-5 flex flex-col gap-5 rounded-md">
          <img src={Group2} alt="" className="self-center"/>
          <h1 className="font-bold text-xl">Social interactions</h1>
          <p>
            Users on the platform can interact with posts they like, comment and
            engage in discussions
          </p>
        </div>
        <div className="md:w-[50%] border border-gray-300 p-5 flex flex-col gap-5 rounded-md">
          <img src={Group3} alt="" className="self-center"/>
          <h1 className="font-bold text-xl">Content creation</h1>
          <p>
            Write nice and appealing with our in-built markdown, a rich text
            editor
          </p>
        </div>
      </div>

      
    </div>
  );
}

export default WhyChatter;
