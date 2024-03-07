import trending from "../../assets/eva_trending-up-outline.png";
import Follow from "./Features/Follow";

type prop = {
  showSideBar: boolean;
};

function SideBar({ showSideBar }: prop) {

 

  return (
    <aside
      className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col sm:w-[20%] sm:ml-0 pr-10 sm:border-r-2
                   duration-500 ${
                     showSideBar ? "ml-1 w-full" : "ml-[-250px] border-r-0"
                   }`}
    >
      <h1 className="font-bold text-lg ml-2">Following</h1>

      <div className="ml-1">
        <Follow />
      </div>

      <div className="flex gap-2">
        <h1 className="font-bold text-lg ml-2">Trending</h1>
        <img src={trending} alt="" />
      </div>
      <ul className="ml-4">
        <li>Programming</li>
        <li>Data Science</li>
        <li>Machine Learning</li>
        <li>Technology</li>
        <li>Politics</li>
        <li>See All</li>
      </ul>
    </aside>
  );
}

export default SideBar;
