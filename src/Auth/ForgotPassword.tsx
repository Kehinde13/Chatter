import { IoIosArrowBack } from "react-icons/io";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "./firebase";
import { Button } from "../components/shadcn/button";

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handelEmail = () => {
    setEmail(email);
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const userEmail = email;
    if (userEmail === "") {
      toast.error("input Your Email");
      setLoading(false);
      return;
    }
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        toast.success(
          "A reset password link has been sent to your email address"
        );
        setLoading(false);
        navigate("/loginpage");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Link
            to="/loginpage"
            className="text-white absolute m-5 font-bold flex "
          >
            <IoIosArrowBack className="mx-2 self-center" />
            Back
          </Link>
          <div className="md:flex gap-20 md:my-2 md:w-[100%] md:mx-auto">
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
            <div className="mt-20 w-full flex flex-col">
              <div className="w-[70%] mx-auto">
                <h1 className="text-center text-3xl">Forgot Password</h1>
                <form
                  onSubmit={(e) => handleReset(e)}
                  className="flex flex-col mt-10  gap-10 p-10 border mx-3 border-purple-500 rounded-md"
                >
                  <input
                    className="border-2 border-purple-500 rounded-md py-2 px-1"
                    type="email"
                    placeholder="Email"
                    name="Email"
                    value={email}
                    onChange={handelEmail}
                  />
                  <Button
                    className="bn632-hover bn20 self-center"
                    style={{ width: "300px" }}
                  >
                    Reset Password
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
