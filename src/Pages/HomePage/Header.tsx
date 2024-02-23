import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImg from "../../assets/profile.jpg";

function Header() {
  return (
    <header>
      <div className="flex justify-between mx-3 md:mx-10 items-center h-[70px] shadow-inner">
        <div>
          <h1 className="md:text-3xl text-xl font-bold text-blue-500 tracking-widest">
            CHATTER
          </h1>
          <div></div>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10 md:w-[400px]">
          <span className="text-xl text-gray-400">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"></FontAwesomeIcon>
          </span>
          <input
            className="bg-transparent outline-none py-[0.7rem] text-sm w-full"
            type="text"
            placeholder="Search Medium"
          />
        </div>
        <div className="flex gap-3">
          <FontAwesomeIcon icon='fa-solid fa-bell' className="self-center">
          </FontAwesomeIcon>
          <img
            className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
            src={profileImg}
            alt="profile-img"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
