import { MdOutlineCancel } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../components/Loading";
import { FirebaseError } from "firebase/app";

type Props = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
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
      if (error instanceof FirebaseError) {
          toast.error(error.message);
      } else {
          // Handle other types of errors
          toast.error("An error occurred");
      }
  }
  };

  return (
    < >
      {modal && (
        <div 
        onClick={() => setModal(!modal)}
        className="AuthModal transition-all duration-500">
         {
          loading ?
          <Loading /> :
          <div className="relative w-[80%] md:w-[50%] py-10 mx-auto mt-20 bg-white z-50 rounded-md border border-black">
          <button className="absolute top-3 right-5">
          <MdOutlineCancel 
          className="text-xl"
              onClick={() => setModal(!modal)}
          />
          </button>
          <div className="flex flex-col gap-5">
            <button 
              onClick={googleAuth}
              className="border border-red-500 py-2 px-5 md:w-[50%] mx-auto rounded-md flex  justify-around">
              <FaGoogle 
              className="text-red-500 text-2xl self-center"
              />
              <p>{text} with Google</p>
            </button>
            <Link to={text === 'Sign Up' ? "SignUp" : "LoginPage"}
            onClick={() => setModal(!modal)}
            className="border border-blue-500 py-2 px-5 md:w-[50%] mx-auto rounded-md text-center flex justify-around">
              <MdOutlineEmail 
              className="text-blue-500 text-2xl self-center"
               />
               <p>{text} with Email</p>
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
