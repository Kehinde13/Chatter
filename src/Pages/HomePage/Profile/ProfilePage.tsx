import { Blog } from "../../../Context/Context";

import profileImg from "../../../assets/profile.jpg";
import About from "./About";
import Lists from "./Lists";
import Stories from "./Stories";

function ProfilePage() {
  const { currentUser } = Blog();

  const activities = [
    {
        title: "Stories",
        component: <Stories />
    },
    {
        title:"Reading Lists",
        component: <Lists />
    },
    {
        title: "About",
        component: <About />
    }
  ]

  return (
    <div className="p-5">
      <>
        <div className="flex gap-5">
          <img
            className="w-[80px] h-[80px] object-cover rounded-full self-center"
            src={currentUser.photoURL ? currentUser.photoURL : profileImg}
            alt="profile image"
          />
          <h1 className="text-3xl sm:text-5xl font-bold self-center capitalize">
            {currentUser.displayName}
          </h1>
        </div>
        <div className="flex self-center my-3 gap-5">
          <p>Followers(0)</p>
          <p>Following(0)</p>
        </div>
        <div>
          <p className="self-center">
            "{currentUser.bio ? currentUser.bio : "I'm a mysterious user"}"
          </p>
        </div>
        <button className="bg-purple-500 my-3 py-1 px-3 rounded-md text-white">
           Edit Your profile
        </button>
      </>
    </div>
  );
}

export default ProfilePage;
