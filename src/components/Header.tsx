



function Header() {

  return (
    <div>
      <div className="header bg-no-repeat bg-contain h-screen text-white">
        <div className="header-overlay">
          <div className="max-w-full pt-64 mx-3 flex flex-col gap-3 md:pt-80 md:mx-10">
           <h1 className="md:text-xl">Featured</h1>
           <h1 className="text-xl md:text-5xl">
              Breaking Into Product Design: <br />
              Advice From Experienced Product Designer, Kenny
           </h1>
           <p className="text-sm md:w-[60%] md:text-base">
            Lets get one thing of the way, you don't need a fancy degree to become to get into product design,
            We sat with kenny to talk about gatekeeping in product design and how anyone can get into this growing 
            industry.
           </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
