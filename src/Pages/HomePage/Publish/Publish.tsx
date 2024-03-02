import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Blog } from "../../../Context/Context";
import ReactQuill from "react-quill";
import TagsInput from "react-tagsinput";
import { toast } from "react-toastify";
import { db, storage } from "../../../Auth/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Remarkable } from "remarkable";
import "./Markdown.css"

const md = new Remarkable();

function Publish() {
  const [showSideBar] = useOutletContext();
  const { userId } = useParams();
  const { users, title, description, currentUser, markdownText } = Blog();
  const imgRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [newPostImage, setnewPostImage] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [preview, setPreview] = useState({
    title: "",
    photo: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const SubmitImage = () => {
    imgRef.current.click();
  };

  useEffect(() => {
    if(markdownText > 1){
      setDesc(markdownText)
    }
    if (title || description) {
      setPreview({ ...preview, title: title });
      setDesc(description);
    } else {
      setPreview({ ...preview, title: "" });
      setDesc("");
    }
  }, [title, description, markdownText]);

  const publishPost = async () => {
    setLoading(true);
    try {
      if (preview.title === "" || desc === "" || tags.length === 0) {
        toast.error("All fields are required!!!");
        return;
      }

      const collections = collection(db, "posts");

      let url;
      if (newPostImage) {
        const storageRef = ref(storage, `image/${preview.photo.name}`);
        await uploadBytes(storageRef, preview?.photo);

        url = await getDownloadURL(storageRef);
      }

      await addDoc(collections, {
        userId: currentUser?.uid,
        title: preview.title,
        desc,
        tags,
        postImg: url || "",
        created: Date.now(),
        pageViews: 0,
      });
      toast.success("Post has been added");
      navigate("/HomePage");
      setPreview({
        title: "",
        photo: "",
      });
    } catch (error: unknown) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserData = users.find((user: object) => user.id === userId);
  return (
    <div className={`sm:mx-auto mx-5 w-[80%] ${showSideBar ? "hidden" : " "}`}>
      <div className="mt-10 flex flex-col md:flex-row gap-10">
        <div className="flex-[1]">
          <h3>Story Preview</h3>
          <div
            style={{ backgroundImage: `url(${newPostImage})` }}
            onClick={SubmitImage}
            className="w-full h-[200px] object-cover bg-gray-100 my-3 grid 
                place-items-center cursor-pointer bg-cover bg-no-repeat dark:text-black"
          >
            {!newPostImage && "Add Image"}
          </div>
          <input
            onChange={(e) => {
              setnewPostImage(URL.createObjectURL(e.target.files[0]));
              setPreview({ ...preview, photo: e.target.files[0] });
            }}
            ref={imgRef}
            type="file"
            hidden
          />
          <input
            type="text"
            placeholder="Title"
            className="outline-none w-full border-b border-gray-300 py-2 text-4xl dark:text-black p-2"
            value={preview.title}
            onChange={(e) => setPreview({ ...preview, title: e.target.value })}
          />
          {markdownText.length > 1 ? (
            <div className="markdown p-3"
              dangerouslySetInnerHTML={{ __html: md.render(markdownText) }}
            ></div>
          ) : (
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={setDesc}
              placeholder="Share your story..."
              className="p-1 my-2 border-gray-300"
            />
          )}
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
            onClick={publishPost}
            className="btn bg-purple-500 w-fit text-white rounded-full p-2"
          >
            {loading ? "Publishing..." : "Publish Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;
