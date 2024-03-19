import { Blog } from "../../../Context/Context";

function MarkdownEditor() {
  const {
    title,
    setTitle,
    markdownText,
    setMarkdownText,
  } = Blog();

  return (
    <div>
      <section className="w-full md:w-[90%] mx-auto py-[3rem] dark:text-black">
        <h1 className="text-xl sm:text-3xl font-bold">
          Markdown Editor
        </h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="text-4xl outline-none w-full my-2 p-2 border border-purple-500 rounded-md"
        />

        <textarea
          name="markdown"
          id="markdown"
          value={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
          cols={30}
          rows={10}
          className="w-full my-3 border border-purple-500 rounded-md p-2 "
          required
          placeholder="How to use Markdown
          Heading 1	#
          Heading 2	##
          Heading 3	###
          Italics	*italics*
          Bold	**Bold**
          Strike	~~insert text~~
          Block quote	>
          Links	[link name](link.com)
          Unordered list	* List item * List item
          Code Block	`insert code here`"
        ></textarea>
      </section>
    </div>
  );
}

export default MarkdownEditor;
