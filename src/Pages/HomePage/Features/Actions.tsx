import React, { useState } from "react";

/* import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify"; */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Blog } from "../../../Context/Context";
import DropDown from "../../../components/Dropdown";

const Actions = ({ postId, title, desc }) => {
  const { setUpdateData, currentUser } = Blog();
  const [showDrop, setShowDrop] = useState(false);
  const handleClick = () => {
    setShowDrop(!showDrop);
  };

  /* const navigate = useNavigate(null); */

  /* const handleEdit = () => {
    navigate(`/editPost/${postId}`);
    setUpdateData({ title, description: desc });
  }; */

  /* const handleRemove = async () => {
    try {
      const ref = doc(db, "posts", postId);
      const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
      const commentRef = doc(db, "posts", postId, "comments", currentUser?.uid);
      const savedPostRef = doc(
        db,
        "users",
        currentUser?.uid,
        "savedPost",
        postId
      );
      await deleteDoc(ref);
      await deleteDoc(likeRef);
      await deleteDoc(commentRef);
      await deleteDoc(savedPostRef);

      toast.success("post has been removed");
      setShowDrop(false);
      navigate("/");
    } catch (error) {
      toast.success(error.message);
    }
  }; */
  return (
    <div className="relative">
      <button onClick={handleClick}>
        <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
        <Button click="" title="Edit Story" />
        <Button click="" title="Delete Story" />
      </DropDown>
    </div>
  );
};

export default Actions;

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left
    ${title === "Delete Story" ? "text-red-600" : ""}
    `}>
      {title}
    </button>
  );
};
