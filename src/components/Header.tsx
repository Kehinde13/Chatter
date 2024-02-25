

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
            <button className="bold md:py-2 md:px-10 px-3  bg-purple-500 rounded-md self-start">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
