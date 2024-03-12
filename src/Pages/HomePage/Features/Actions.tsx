import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { Blog } from "../../../Context/Context";
import DropDown from "../../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Auth/firebase";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

type ActionsProps = {
  postId: string;
  title: string;
  desc: string;
};

const Actions = ({ postId, title, desc }: ActionsProps) => {
  const { setUpdateData } = Blog();
  const [showDrop, setShowDrop] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowDrop(!showDrop);
  };

  const handleEdit = () => {
    navigate(`/HomePage/EditPost/${postId}`);
    setUpdateData({ title, description: desc });
  };

  const handleAnalytics = () => {
    navigate(`/HomePage/Analytics/${postId}`);
  };

  const handleRemove = async () => {
    try {
      const ref = doc(db, "posts", postId);
      await deleteDoc(ref);

      toast.success("Post has been removed");
      setShowDrop(false);
      navigate("/HomePage");
    } catch (error: unknown) {
      if(error instanceof FirebaseError){
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="relative">
      <button onClick={handleClick}>
        <FaEllipsisH />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
        <Button click={handleEdit} title="Edit Story" />
        <Button click={handleRemove} title="Delete Story" />
        <Button click={handleAnalytics} title="Analytics" />
      </DropDown>
    </div>
  );
};

export default Actions;

type ButtonProps = {
  click: () => void;
  title: string;
};

const Button = ({ click, title }: ButtonProps) => {
  return (
    <button
      onClick={click}
      className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left ${
        title === "Delete Story" ? "text-red-600" : ""
      }`}
    >
      {title}
    </button>
  );
};
