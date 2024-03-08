import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Blog } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

type prop= {
    searchBar: boolean
    toggleSearchBar: (searchBar: boolean) => boolean 
}

function Search({ searchBar, toggleSearchBar }: prop) {
  const [search, setSearch] = useState("");
  const { posts } = Blog();

 const navigate = useNavigate()

  const searchData =
    posts &&
    posts?.filter((post: object) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    
  return (
    <div className="relative">
    <div
      className={`sm:flex sm:mb-0 items-center gap-2 bg-gray-100 px-2 rounded-full relative z-10 sm:w-[300px]
     duration-300  ${searchBar ? "flex " : "mb-[200px] w-[20%]"}`}
    >
      <button className="text-xl text-gray-400">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </button>
      <input
        className="bg-transparent outline-none py-[0.7rem] text-sm w-full"
        type="text"
        placeholder="Search Chatter"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {searchBar && (
        <FontAwesomeIcon
          icon="fa-solid fa-xmark"
          className="text-slate-800"
          onClick={toggleSearchBar}
        />
      )}
    </div>
    {search !== "" && (
              <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
                {searchData.length > 0 ? (
                  <>
                    {searchData.map((post: object, i: number) => (
                      <div
                        key={i}
                        onClick={() => {
                          navigate(`/HomePage/SinglePost/${post?.id}`);
                          setSearch("");
                        }}
                        className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
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
