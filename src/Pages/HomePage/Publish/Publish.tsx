import { useRef, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { Blog } from "../../../Context/Context";
import ReactQuill from "react-quill";
import TagsInput from "react-tagsinput";

function Publish() {
  const [showSideBar] = useOutletContext();
  const { userId } = useParams();
  const { users } = Blog();
  const imgRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [newPostImage, setnewPostImage] = useState<string>("");

  const SubmitImage = () => {
    imgRef.current.click();
  };

  const getUserData = users.find((user: object) => user.id === userId);
  return (
    <div className={`sm:mx-auto mx-5 w-[80%] ${showSideBar ? "hidden" : " "}`}>
      <button className="sm:py-2 sm:px-3 p-1  bg-purple-500 self-start text-white rounded-full">
        Write
      </button>
      <div className="mt-10 flex flex-col md:flex-row gap-10">
        <div className="flex-[1]">
          <h3>Story Preview</h3>
          <div
            style={{ backgroundImage: `url(${newPostImage})` }}
            onClick={SubmitImage}
            className="w-full h-[200px] object-cover bg-gray-100 my-3 grid 
                place-items-center cursor-pointer bg-cover bg-no-repeat "
          >
            {!newPostImage && "Add Image"}
          </div>
          <input
            onChange={(e) => {
              setnewPostImage(URL.createObjectURL(e.target.files[0]));
              /* setPreview({ ...preview, photo: e.target.files[0] }) */
            }}
            ref={imgRef}
            type="file"
            hidden
          />
          <input
            type="text"
            placeholder="Title"
            className="outline-none w-full border-b border-gray-300 py-2"
            /* value={preview.title}
              onChange={(e) =>
                setPreview({ ...preview, title: e.target.value })
              } */
          />
          <ReactQuill
            theme="snow"
            /* value={desc}
              onChange={setDesc} */
            placeholder="Share your story..."
            className="p-1 border-b border-gray-300"
          />
        </div>
        <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0 mt-5">
          <h3 className="text-2xl">
            Publishing to:
            <span className="font-bold capitalize">
              {getUserData?.username}
            </span>
          </h3>
          <p>Add up to 5 Tags that relate to your story</p>
          <TagsInput value={tags} onChange={setTags} />
          <button
            /* onClick={handleSubmit} */
            className="btn bg-purple-500 w-fit text-white rounded-full p-2"
          >
            {/* {loading ? "Submitting..." : "Publish Now"} */}Publish Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;
