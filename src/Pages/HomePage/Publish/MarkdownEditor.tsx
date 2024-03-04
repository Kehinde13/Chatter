import { Remarkable } from "remarkable";
import { Blog } from "../../../Context/Context";


function MarkdownEditor() {
  const { title, setTitle, description, setDescription, markdownText, setMarkdownText } = Blog();

  return (
    <div>
      <section className="w-full md:w-[90%] mx-auto py-[3rem] dark:text-black">
        <h1 className="text-xl sm:text-3xl font-bold dark:text-purple-500">Markdown Editor</h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="text-4xl outline-none w-full my-2 p-2 dark:bg-gray-300"
        />

        <textarea
          name="markdown"
          id="markdown"
          value={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
          cols={30}
          rows={10}
          className="w-full my-3 border border-gray-500 rounded-md p-2 dark:bg-gray-300"
          required
          placeholder="Type in some markdown"
        ></textarea>
      </section>
    </div>
  );
}

export default MarkdownEditor;
