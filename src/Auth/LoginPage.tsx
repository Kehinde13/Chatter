import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "./firebase";
import Loading from "../components/Loading";

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    userEmail: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setLoading(true)

    if(form[("userEmail", "password")] === ""){
      toast.error("Input email and password")
      setLoading(false)
    }

    try{
      await signInWithEmailAndPassword(auth, form.userEmail, form.password);
      navigate("/HomePage");
      toast.success("User has been logged in")
      setLoading(false)
    } catch(error: unknown){
      toast.error(error.message)
      setLoading(false)
    }
    
  };
  return (
    <div className="h-screen bg-white dark:bg-slate-800 dark:text-white ">
      {
        loading ?
        <Loading />
        :
       (
       <div>
        <Link to="/" className="text-white md:text-black absolute p-5 font-bold dark:text-white">
        <FontAwesomeIcon icon="fa-solid fa-angle-left" className="mx-2" />
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
        <div className="sm:w-[80%] p-5 mx-auto sm:mt-20 dark:bg-slate-800 dark:text-white">
          <div className="flex justify-between border-b-2 border-transparent pb-3 mb-3 w-full">
            <Link to="/SignUp" className=" border-b-[3px]  w-[50%] pb-5">
              REGISTER
            </Link>
            <Link
              to="/LoginPage"
              className=" border-b-[3px] border-blue-500 w-[50%] pb-5 text-right"
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
              </div>
              <button 
              className={`bold md:py-2 md:px-10 p-1 bg-blue-500 rounded-md w-full text-white`}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
       )
      }
    </div>
  );
}

export default LoginPage;
