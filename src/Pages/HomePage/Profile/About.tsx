import { Blog } from "../../../Context/Context";

type props = {
  getUserData: object;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const About = ({ getUserData, setModal }: props) => {
  const { currentUser } = Blog();

  return (
    <div className="w-full sm:w-[70%]">
      <p className="text-2xl first-letter:uppercase">
        {getUserData?.bio || getUserData?.username + " Has no bio"}
      </p>
      <div className="text-right">
        {currentUser?.uid === getUserData.userId && (
          <button
            onClick={() => setModal(true)}
            className="border bg-purple-500 py-2 px-5 rounded-full mt-[3rem]
                      dark:border-purple-500 text-white"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default About;
