import { Link } from "react-router-dom";

const headerButton = {
  width: '150px',
  height: '45px',
  fontSize: "16px"
};

function Header() {
  return (
    <div className="">
      <div className="header bg-no-repeat bg-contain h-screen">
        <div className="header-overlay">
          <div className="mx-auto max-w-[900px] leading-10 px-5 text-white flex flex-col gap-10">
            <h1 className="text-2xl md:text-5xl pt-24 md:pt-52">
              Welcome to Chatter: A Haven for Text-Based Content
            </h1>
            <p className="md:w-[60%]">
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </p>
            <Link to="signup">
              <button className="bn632-hover bn20 self-start" style={headerButton}>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
