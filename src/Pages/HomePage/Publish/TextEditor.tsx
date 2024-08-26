import { useState } from "react";
import ReactQuill from "react-quill";
import { Blog } from "../../../Context/Context";
import { Link } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";
import { Button } from "../../../components/shadcn/button";

const Write = () => {
  const { title, setTitle, description, setDescription } = Blog();
  const [markdown, setMarkdown] = useState<boolean>(false);


  const toggleMarkdown = () => {
    setMarkdown(!markdown)
  }

  return (
    <div
      data-testid = "TextEditor"
      className="mx-auto relative my-2 col-span-6 w-[80%]"
    >
      {markdown ? (
        <MarkdownEditor />
      ) : (
        <section className=" py-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="text-4xl outline-none w-full border dark:bg-slate-800 border-purple-500 p-2 rounded-md"
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
          <Button
            onClick={toggleMarkdown}
            className="bn632-hover bn20"
            style={{width: "120px"}}
          >
            Markdown Editor
          </Button>
        ) : (
          <Button
            onClick={toggleMarkdown}
            className="bn632-hover bn20"
          >
            Text Editor
          </Button>
        )}
        <Link to="/homepage/publish">
          <Button className="bn632-hover bn20">
            Publish
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Write;
