import logo from "../assets/CHATTER.png";

function Footer() {
  return (
    <div className="w-full mt-10 text-center sm:text-left">
      <div className="bg-[#FFEDCC80] dark:bg-[#020817] bro flex md:flex-row flex-col justify-around p-10 md:p-20">
        <img
          src={logo}
          alt="logo"
          className="w-[80px] sm:w-[150px] self-center "
        />
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
