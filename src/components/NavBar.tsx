import logo from "../assets/CHATTER.png";

type Props = {
  modal: boolean;
  setModal: (modal: boolean) => boolean;
  setModalText: (text: string) => string;
};

function NavBar({ modal, setModal, setModalText }: Props) {
  const setSignUp = () => {
    setModal(!modal);
    setModalText("Sign Up");
  };

  const setLogin = () => {
    setModal(!modal);
    setModalText("Login");
  };

  return (
    <nav className=" top-0 z-30 ">
      <div className="flex justify-between mx-3 md:mx-10 items-center h-[70px] shadow-inner">
        <img
          src={logo}
          alt="logo"
          className="w-[80px] sm:w-[150px] self-center"
        />
        <div className="md:flex gap-10 hidden font-bold">
          <p>About us</p>
          <p>Contact</p>
          <p>Blogs</p>
        </div>
        <div className="flex justify-between md:gap-10 gap-3 md:font-bold">
          <button
            onClick={setLogin}
            className="md:py-2 md:px-10 p-1 border border-purple-500 rounded-md
                             hover:bg-purple-500 hover:text-white text-purple-500"
          >
            Log in
          </button>
          <button
            onClick={setSignUp}
            className="md:py-2 md:px-10 p-1 bg-purple-500 rounded-md text-white
                       border-purple-500 hover:bg-transparent border hover:text-purple-500"
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
