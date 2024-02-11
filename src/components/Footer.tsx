function Footer() {
  return (
    <div className="w-full mt-10">
      <div className="bg-[#FFEDCC80] flex md:flex-row flex-col justify-around p-10 md:p-20">
        <h1 className="md:text-3xl text-2xl font-bold text-blue-500 tracking-widest md:mt-10">
          CHATTER
        </h1>
        <div className="md:flex gap-20">
          <div>
            <h1 className="font-bold text-xl my-7">Explore</h1>
            <ul>
              <li>commuinity</li>
              <li>Trending blogs</li>
              <li>Chatter for teams</li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold text-xl my-7">Support</h1>
            <ul>
              <li>Support docs</li>
              <li>Join slack</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold text-xl my-7">Official Blog</h1>
            <ul>
              <li>Official blog</li>
              <li>Engineering blog</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
