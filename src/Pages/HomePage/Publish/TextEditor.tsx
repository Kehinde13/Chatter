import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Blog } from "../../../Context/Context";
import { Link, useOutletContext } from "react-router-dom";

const Write = () => {
  const [showSideBar] = useOutletContext();
  const {title, setTitle, description, setDescription} = Blog()
    

  return (
    <div
      className={`sm:mx-auto mx-5 w-[80%] relative ${
        showSideBar ? "hidden" : " "
      }`}
    >
      <section className="w-full md:w-[90%] mx-auto py-[3rem]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="text-4xl outline-none w-full"
        />
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          placeholder="Share Your Story..."
          className="write my-5"
        />
        <Link to="/HomePage/Publish">
          <button className="bg-purple-500 p-2 rounded-full text-white">
            Publish
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Write;
