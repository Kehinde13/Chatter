import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  modal: boolean;
  setModal: (modal: boolean) => boolean;
};

function AuthModal({ modal, setModal }: Props) {
  return (
    <>
      {modal && (
        <div className="AuthModal transition-all duration-500">
          <div className="relative w-[80%] md:w-[50%] py-10 mx-auto mt-20 bg-white rounded-md border border-black">
          <button className="absolute top-3 right-5">
            <FontAwesomeIcon
              onClick={() => setModal(!modal)}
              icon="fa-solid fa-xmark"
            />
          </button>
          <div className="flex flex-col gap-5">
            <button className="border border-red-500 py-2 px-5 md:w-[50%] mx-auto rounded-md">
              <FontAwesomeIcon 
              className="text-red-500 mr-5"
              icon="fa-brands fa-google" />
              Sign in with Google
            </button>
            <button className="border border-blue-500 py-2 px-5 md:w-[50%] mx-auto rounded-md">
              <FontAwesomeIcon 
              className="text-blue-500 mr-5"
              icon="fa-solid fa-envelope" />
              Sign in with Email
            </button>
          </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthModal;
