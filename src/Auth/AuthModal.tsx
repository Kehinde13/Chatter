import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../components/Loading";

type Props = {
  modal: boolean;
  setModal: (modal: boolean) => boolean;
  text: string;
};

function AuthModal({ modal, setModal, text }: Props) {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  
  const googleAuth = async () => {
    setLoading(true)
    try {
      const createUser = await signInWithPopup(auth, provider);
      const newUser = createUser.user;
      
      const docRef = doc(db, "users", newUser.uid);
      
      const userDoc = await getDoc(docRef); 
    
      
      if (!userDoc.exists()) {
        await setDoc(docRef, {
          userId: newUser.uid,
          username: newUser.displayName,
          email: newUser.email,
          userImg: newUser.photoURL,
          bio: "",
        });
      }
      setLoading(false)
      setModal(!modal);
      toast.success("User have been Signed in");
      navigate("/HomePage"); 
    } catch (error: unknown) {
      toast.error(error.message);
      setLoading(false)
    }
  };

  return (
    < >
      {modal && (
        <div className="AuthModal transition-all duration-500 dark:bg-slate-900 dark:text-white">
         {
          loading ?
          <Loading /> :
          <div className="relative w-[80%] md:w-[50%] py-10 mx-auto mt-20 bg-white dark:bg-slate-800 text-white rounded-md border border-black">
          <button className="absolute top-3 right-5">
            <FontAwesomeIcon
              onClick={() => setModal(!modal)}
              icon="fa-solid fa-xmark"
            />
          </button>
          <div className="flex flex-col gap-5">
            <button 
              onClick={googleAuth}
              className="border border-red-500 py-2 px-5 md:w-[50%] mx-auto rounded-md">
              <FontAwesomeIcon 
              className="text-red-500 mr-5"
              icon="fa-brands fa-google" />
              {text} with Google
            </button>
            <Link to={text === 'Sign Up' ? "SignUp" : "LoginPage"}
            className="border border-blue-500 py-2 px-5 md:w-[50%] mx-auto rounded-md text-center">
              <FontAwesomeIcon 
              className="text-blue-500 mr-5"
              icon="fa-solid fa-envelope" />
              {text} with Email
            </Link>
          </div>
          </div>
         }
        </div>
      )}
    </>
  );
}

export default AuthModal;
