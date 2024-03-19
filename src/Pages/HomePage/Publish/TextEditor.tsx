import { useState } from "react";
import ReactQuill from "react-quill";
import { Blog } from "../../../Context/Context";
import { Link, useOutletContext } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";

const Write = () => {
  const [showSideBar]: [boolean] = useOutletContext();
  const { title, setTitle, description, setDescription } = Blog();
  const [markdown, setMarkdown] = useState<boolean>(false);


  const toggleMarkdown = () => {
    setMarkdown(!markdown)
  }

  return (
    <div
      className={`sm:mx-auto mx-5 w-[80%] relative my-2 ${
        showSideBar ? "hidden" : " "
      }`}
    >
      {markdown ? (
        <MarkdownEditor />
      ) : (
        <section className="w-full md:w-[90%] mx-auto py-[3rem]">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="text-4xl outline-none w-full border border-purple-500 p-2 rounded-md"
          />
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Share Your Story..."
            className=" my-5"
          />
        </section>
      )}

      <div className="flex justify-between w-full md:w-[90%] mx-auto">
        {!markdown ? (
          <button
            onClick={toggleMarkdown}
            className="bn632-hover bn20"
            style={{width: "120px"}}
          >
            Markdown Editor
          </button>
        ) : (
          <button
            onClick={toggleMarkdown}
            className="bn632-hover bn20"
          >
            Text Editor
          </button>
        )}
        <Link to="/homepage/publish">
          <button className="bn632-hover bn20">
            Publish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Write;
