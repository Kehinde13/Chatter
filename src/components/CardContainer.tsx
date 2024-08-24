import Card from "./Card";

const CardContainer = () => {
  return (
    <div className="my-20 w-[80%] mx-auto px-3">
      <h1 className="text-2xl md:text-3xl my-5 md:my-10 mx-2 font-bold">Recent Blog Posts</h1>
      <div className="flex flex-col md:flex-row gap-10 justify-between flex-wrap">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default CardContainer;
