import { useState } from "react";
import { Blog } from "../../../Context/Context";

import profileImg from "../../../assets/profile.jpg";
import About from "./About";
import Lists from "./Lists";
import Stories from "./Stories";
import { useParams } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import GetSinglePost from "../../../hooks/GetSinglePost";
import { User } from "../../../hooks/GetUsers";
import { Button } from "../../../components/shadcn/button";

type Panel = {
  title: string;
  component: React.ComponentType<any>;
};

function ProfilePage() {
  const { currentUser, users } = Blog();
  const { userId } = useParams();
  const panels = [
    {
      title: "Stories",
      component: Stories,
    },
    {
      title: "Bookmarks",
      component: Lists,
    },
    {
      title: "About",
      component: About,
    },
  ];
  const [currentPanel, setCurrentPanel] = useState<Panel>(panels[0]);
  const [modal, setModal] = useState<boolean>(false);
  const getUserData = users.find((user: User) => user.id === userId);
  const { data: following } = GetSinglePost("users", userId!, "following");
  const { data: followers } = GetSinglePost("users", userId!, "followers");

  return (
    <div className="p-1 mx-auto w-[90%] mt-10 col-span-6">
      <EditProfileModal
        modal={modal}
        setModal={setModal}
        getUserData={getUserData!}
      />
      <>
        <div className="flex gap-5">
          <img
            className="w-[80px] h-[80px] object-cover rounded-full self-center"
            src={getUserData?.userImg ? getUserData?.userImg : profileImg}
            alt="profile image"
          />
          <h1 className="text-3xl sm:text-5xl font-bold self-center capitalize">
            {getUserData?.username}
          </h1>
        </div>
        <div className="flex self-center my-3 gap-5">
          <p>Followers({followers.length})</p>
          <p>Following({following.length})</p>
        </div>
          <p className="self-center my-2">
            "{getUserData?.bio ? getUserData?.bio : "I'm a mysterious user"}"
          </p>
        {currentUser?.uid === getUserData?.userId && (
          <Button
            onClick={() => setModal(!modal)}
            className="bn632-hover bn20"
            style={{ width: "120px", marginLeft: "-5px" }}
          >
            Edit Your profile
          </Button>
        ) 
      }
      </>
      <div className="flex items-center gap-5 my-3 md:my-5 md:w-[700px] text-center font-bold">
        {panels.map((item, index) => (
          <div
            className={`py-1 w-full ${
              item.title === currentPanel.title
                ? "border-b-2 border-purple-500"
                : ""
            }`}
            key={index}
          >
            <button onClick={() => setCurrentPanel(item)}>{item.title}</button>
          </div>
        ))}
      </div>
      <currentPanel.component getUserData={getUserData} setModal={setModal} />
    </div>
  );
}

export default ProfilePage;
