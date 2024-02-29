import React from "react";
import { Blog } from "../../../Context/Context";

type props = {
  getUserData: object;
  setModal: (modal: boolean) => boolean;
};

const About = ({ getUserData, setModal }: props) => {
  const { currentUser } = Blog();

  return (
    <div className="w-full">
      <p className="text-2xl first-letter:uppercase">
        {getUserData?.bio || getUserData?.username + " Has no bio"}
      </p>
      <div className="text-right">
        {currentUser?.uid === getUserData.userId && (
          <button
            onClick={() => setModal(true)}
            className="border border-black py-2 px-5 rounded-full text-black mt-[3rem]
                      dark:border-purple-500 dark:text-white"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default About;
