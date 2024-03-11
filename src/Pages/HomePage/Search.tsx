import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { Blog } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  desc: string;
}

interface Props {
  searchBar: boolean;
  toggleSearchBar: (searchBar: boolean) => void;
}

function Search({ searchBar, toggleSearchBar }: Props) {
  const [search, setSearch] = useState<string>("");
  const { posts } = Blog();
  const navigate = useNavigate();

  const searchData: Post[] | undefined = posts && posts.filter((post: any) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        className={`sm:flex sm:mb-0 items-center gap-2 bg-gray-100 px-2 rounded-full relative z-10 sm:w-[300px]
     duration-300  ${searchBar ? "flex " : "mb-[200px] w-[20%]"}`}
      >
        <button className="text-xl text-gray-400">
          <FaMagnifyingGlass />
        </button>
        <input
          className="bg-transparent outline-none py-[0.7rem] text-sm w-full"
          type="text"
          placeholder="Search Chatter"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchBar && (
          <MdOutlineCancel
            className="text-slate-800 text-2xl"
            onClick={() => toggleSearchBar(false)}
          />
        )}
      </div>
      {search !== "" && (
        <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
          {searchData && searchData.length > 0 ? (
            <>
              {searchData.map((post: Post, i: number) => (
                <div
                  key={i}
                  onClick={() => {
                    navigate(`/HomePage/SinglePost/${post.id}`);
                    setSearch("");
                  }}
                  className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  <h2 className="line-clamp-1 capitalize text-sm font-bold">
                    {post.title}
                  </h2>
                  <div
                    className="text-xs text-gray-500 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.desc }}
                  />
                </div>
              ))}
            </>
          ) : (
            <p className="text-sm text-gray-500 p-3">No Post Found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
