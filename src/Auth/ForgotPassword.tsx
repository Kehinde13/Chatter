import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "./firebase";

function ForgotPassword() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true)
    const userEmail = e.target.Email.value;
    if(userEmail === ""){
        toast.error("input Your Email")
        setLoading(false)
        return
    }
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        toast.success("A reset password link has been sent to your email address")
        setLoading(false)
        navigate('/LoginPage')
      })
      .catch((err) => {
        toast.error(err.message)
      });
  };
  return (
    <div className="h-screen bg-white">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Link
            to="/"
            className="text-white md:text-black absolute m-5 font-bold"
          >
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
                    Unleash the Power of Words, Connect with Like-minded Readers
                    and Writers
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 w-full flex flex-col">
              <h1 className="text-center text-3xl">Forgot Password</h1>
              <form
                onSubmit={(e) => handleReset(e)}
                className="flex flex-col mt-10  gap-10 p-10 border border-purple-500 rounded-md"
              >
                <input
                  className="border-2 border-purple-500 rounded-md py-2 px-1"
                  type="email"
                  placeholder="Email"
                  name="Email"
                />
                <button className="bg-purple-500 w-[150px] py-2 rounded-md mx-auto text-white">
                  Reset Password
                </button>
              </form>
              <Link to={"/LoginPage"} className="self-center mt-5">
                <button className="bg-purple-500 text-white rounded-md px-5 py-2  mx-auto">
                  Back to Login
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
