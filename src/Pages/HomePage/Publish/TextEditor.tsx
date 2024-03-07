import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Blog } from "../../../Context/Context";
import { Link, useOutletContext } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";

const Write = () => {
  const [showSideBar] = useOutletContext();
  const { title, setTitle, description, setDescription } = Blog();
  const [markdown, setMarkdown] = useState<boolean>(false);

  return (
    <div
      className={`sm:mx-auto mx-5 w-[80%] relative  ${
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
            className="text-4xl outline-none w-full dark:text-black p-2 dark:bg-gray-300"
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
            onClick={(e) => setMarkdown(true)}
            className="bg-purple-500 p-2 rounded-full text-white"
          >
            Markdown Editor
          </button>
        ) : (
          <button
            onClick={(e) => setMarkdown(false)}
            className="bg-purple-500 p-2 rounded-full text-white"
          >
            Text Editor
          </button>
        )}
        <Link to="/HomePage/Publish">
          <button className="bg-purple-500 p-2 rounded-full text-white">
            Publish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Write;
