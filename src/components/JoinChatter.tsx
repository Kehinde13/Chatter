import { Link } from "react-router-dom";
import profile1 from "../assets/Profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import { Button } from "./shadcn/button";

const buttonStyle = {
  width: "150px",
  height: "45px",
  fontSize: "16px",
};

function JoinChetter() {
  return (
    <div className="w-full mt-10 text-center sm:text-left">
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
          <Link to="/signup">
            <Button className="bn632-hover bn20 self-start" style={buttonStyle}>
              Join Chatter
            </Button>
          </Link>
        </div>
      </div>
      <div className="md:flex justify-between p-10 md:p-20 ">
        <div className="sm:w-[30%]">
          <img src={profile2} alt="" className="rounded-full" />
          <img
            src={profile4}
            alt=""
            className="float-right rounded-full sm:mt-[-28px] ml-20"
          />
          <img src={profile3} alt="" className="rounded-full mt-20" />
        </div>
        <div className="flex flex-col gap-10 my-5 md:mx-20 sm:w-[60%]">
          <h1 className="text-3xl font-bold">
            Write, read and connect with great minds on chatter
          </h1>
          <p className="text-center sm:text-left">
            Joining Chatter Blog is an opportunity to immerse yourself in a
            vibrant community of thinkers, creators, and communicators. Here,
            words dance with purpose, ideas spark conversations, and voices echo
            with resonance. Whether you're passionate about sharing your
            insights, seeking inspiration, or simply connecting with like-minded
            individuals, Chatter Blog offers a platform where your voice
            matters. As a member, you'll gain access to a diverse array of
            topics spanning from technology to literature, from culture to
            science. Our inclusive environment encourages dialogue, fosters
            growth, and celebrates diversity. Whether you're a seasoned writer
            or just starting to explore your creative potential, Chatter Blog
            provides a supportive space to hone your skills and unleash your
            imagination. Join us in shaping the narrative, forging connections,
            and making an impact. Together, let's turn the cacophony of voices
            into a symphony of ideas. Join Chatter Blog today and let your words
            resonate.
          </p>
          <Link to="/signup">
            <Button className="bn632-hover bn20 self-start" style={buttonStyle}>
              Join Chatter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JoinChetter;
