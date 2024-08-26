import { Link } from "react-router-dom";
import { Button } from "../../../components/shadcn/button";
import { SquarePen } from "lucide-react";
import Recent from "./Recent";
import Trending from "./Trending";


function Feed() {

  return (
    <div
      className="py-5 px-5 col-span-6"
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl sm:text-4xl font-bold">FEED</h1>
        </div>
        <Link to="texteditor" >
          <Button className="bn632-hover bn20 flex gap-2">
             Write
            <SquarePen />
          </Button>
        </Link>
      </div>
      <div className="mt-2 p-3 md:grid gap-2 grid-cols-6">
        <Recent />
        <Trending />
      </div>
    </div>
  );
}

export default Feed;
