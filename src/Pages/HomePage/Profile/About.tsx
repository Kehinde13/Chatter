import { Button } from "../../../components/shadcn/button";
import { Blog } from "../../../Context/Context";
import { User } from "../../../hooks/GetUsers";

type props = {
  getUserData: User;
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
          <Button
            onClick={() => setModal(true)}
            className="bn632-hover bn20"
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default About;
