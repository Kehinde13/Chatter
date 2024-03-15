import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "./firebase";
import Loading from "../components/Loading";
import GoogleSignIn from "../hooks/GoogleSignIn";
import { FirebaseError } from "firebase/app";

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    userEmail: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const {googleAuth, googleLoading} = GoogleSignIn()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setLoading(true)

    if(form[("userEmail")] === "" || form[("password")] === ""){
      toast.error("Input email and password")
      setLoading(false)
    }

    try{
      await signInWithEmailAndPassword(auth, form.userEmail, form.password);
      navigate("/HomePage");
      toast.success("User has been logged in")
      setLoading(false)
      
    } catch(error: unknown){
      if(error instanceof FirebaseError){
        toast.error(error.message)
      }
      setLoading(false)
    }
    
  };
  return (
    <div className="h-screen bg-white">
      {
        loading || googleLoading ?
        <Loading />
        :
       (
       <div>
        <Link to="/" className="text-white md:text-black absolute p-5 font-bold flex">
        <IoIosArrowBack  className="mx-2 self-center" />
        Back
      </Link>
      <div className="md:flex gap-20 md:my-2 md:w-[70%] md:mx-auto">
        <div className="Auth bg-no-repeat bg-cover bg-center bg-blend-multiply h-screen w-full">
          <div className="header-overlay ">
            <div className="w-[80%] text-white mx-auto">
              <h1 className="font-bold text-3xl pt-56 text-center pb-5">
                CHATTER
              </h1>
              <p>
                Unleash the Power of Words, Connect with Like-minded Readers and
                Writers
              </p>
            </div>
          </div>
        </div>
        <div className="sm:w-[80%] p-5 mx-auto sm:mt-20 ">
          <div className="flex justify-between border-b-2 border-transparent pb-3 mb-3 w-full">
            <Link to="/SignUp" className=" border-b-[3px]  w-[50%] pb-5">
              REGISTER
            </Link>
            <Link
              to="/LoginPage"
              className=" border-b-[3px] border-purple-500 w-[50%] pb-5 text-right"
            >
              LOGIN
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
          <form action=""
           onSubmit={handleSubmit}
          >
            <div className="my-5">
              <div>
                <label htmlFor="">Email Address</label> <br />
                <input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  placeholder="johndoe@gmail.com"
                  className=" border border-gray-300 w-full py-2 rounded-md p-2"
                  onChange={handleChange}
                />
              </div>
              <div className="my-5">
                <label htmlFor="">Password</label> <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="**********"
                  className=" border border-gray-300 w-full py-2 rounded-md p-2"
                  onChange={handleChange}
                />
                <Link to="/ForgotPassword">
                <p className="text-red-500 text-sm my-3 text-right">Forgot Password</p>
                </Link>
              </div>
              <button 
              className={`bold md:py-2 md:px-10 p-1 bg-purple-500 rounded-md w-full text-white`}>
                Login
              </button>
            </div>
          </form>
          <button
                onClick={googleAuth}
                className="bold md:py-2 md:px-10 mt-3 py-1 px-12 bg-purple-500 rounded-md w-full text-white"
              >
                <div className="mx-auto gap-5 flex w-full">
                <FaGoogle
                  className="text-red-500 self-center text-xl"
                />
                <p>Sign In with Google</p>
                </div>
          </button>
        </div>
      </div>
      </div>
       )
      }
    </div>
  );
}

export default LoginPage;
