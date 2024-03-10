import { Link } from "react-router-dom";

function Contact() {
  return (
    <>
      <Link to={"/"} className="mt-10">
        <button className="py-2 px-5 bg-purple-500 text-white rounded-md m-5">Back</button>
      </Link>
      <div className="w-full flex flex-col justify-center items-center p-4">
        <form
          method="POST"
          action="https://getform.io/f/0cc60f42-6d2a-428d-b35c-a968ca8dfe67"
          className="flex flex-col max-w-[600px] w-full"
        >
          <div className="pb-8">
            <p className="text-4xl font-bold inline border-b-4 border-purple-500 ">
              Contact
            </p>
          </div>
          <input
            className="border border-gray-500 rounded-md p-2"
            type="text"
            placeholder="Name"
            name="name"
          />
          <input
            className="my-4 p-2 border border-gray-500 rounded-md"
            type="email"
            placeholder="Email"
            name="email"
          />
          <textarea
            className="border border-gray-500 rounded-md p-2"
            name="message"
            rows={10}
            placeholder="Message"
          ></textarea>
          <button className="hover:text-white border border-gray-500 rounded-md hover:bg-purple-500 hover:border-purple-500 px-4 py-3 my-8 mx-auto flex items-center">
            Send Feedback
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
