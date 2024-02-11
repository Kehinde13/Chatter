function NavBar() {
  return (
    <nav className="sticky top-0 z-50 ">
      <div className="flex justify-between mx-3 md:mx-10 items-center h-[70px] shadow-inner">
        <h1 className="md:text-3xl text-xl font-bold text-blue-500 tracking-widest">CHATTER</h1>
        <div className="md:flex gap-10 hidden font-bold">
          <p>Home</p>
          <p>About us</p>
          <p>Contact</p>
          <p>Blogs</p>
        </div>
        <div className="flex justify-between md:gap-10 gap-3 md:font-bold">
          <button
            className="md:py-2 md:px-10 p-1 border border-blue-500 rounded-md
                             hover:bg-blue-500 hover:text-white"
          >
            Log in
          </button>
          <button
            className="md:py-2 md:px-10 p-1 bg-blue-500 rounded-md text-white
                             hover:bg-white border border-blue-500 hover:text-black"
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
