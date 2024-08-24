import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import GoogleSignIn from "../hooks/GoogleSignIn";
import { Blog } from "../Context/Context";
import { Button } from "../components/shadcn/button";

interface FormState {
  firstName: string;
  lastName: string;
  Email: string;
  password: string;
  confirmPassword: string;
}

const authButton = {
  width: "100%",
  fontSize: "16px",
};

function SignUp() {
  const navigate = useNavigate();
  const { currentUser } = Blog();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    Email: "",
    password: "",
    confirmPassword: "",
  });
  const { googleAuth, googleLoading } = GoogleSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (Object.values(form).some((field) => field === "")) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Your passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.Email,
        form.password
      );
      const docRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(docRef);

      if (!userDoc.exists()) {
        await setDoc(docRef, {
          userId: user.uid,
          username: form.firstName,
          email: form.Email,
          userImg: "",
          bio: "",
        });
        toast.success("Sign Up Successful");
        navigate("/homepage");
        setLoading(false);
      }
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/homepage");
    }
  }, [currentUser, navigate]);

  return (
    <div className="h-screen">
      {loading || googleLoading ? (
        <Loading />
      ) : (
        <>
          <Link to="/" className="text-white absolute m-5 font-bold flex">
            <IoIosArrowBack className="mx-2 self-center" />
            Back
          </Link>
          <div className="md:flex gap-20 md:my-2 md:w-[100%] h-screen md:mx-auto">
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
            <div className="sm:w-[100%] p-5 mx-auto mt-10">
              <div className="sm:w-[70%] mx-auto">
                <div className="flex justify-between border-b-2 border-transparent pb-3 mb-3 w-full">
                  <Link
                    to="/signup"
                    className=" border-b-[3px] border-purple-500 w-[50%] pb-3"
                  >
                    REGISTER
                  </Link>
                  <Link
                    to="/loginpage"
                    className=" border-b-[3px] w-[50%] pb-3 text-right"
                  >
                    LOGIN
                  </Link>
                </div>
                <h1 className="text-3xl font-bold">
                  Register as a Writer/Reader
                </h1>
                <form action="" onSubmit={handleSubmit}>
                  <div className="md:flex gap-2 my-5 w-full">
                    <div>
                      <label htmlFor="">First Name</label> <br />
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="border border-gray-300 py-2 px-2 rounded-md w-full "
                        placeholder="John"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Last Name</label> <br />
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="border border-gray-300 p-2 rounded-md w-full"
                        placeholder="Doe"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="">Email Address</label> <br />
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      placeholder="johndoe@gmail.com"
                      onChange={handleChange}
                      className=" border border-gray-300 w-full py-2 rounded-md p-2 dark:text-black"
                    />
                  </div>
                  <div className="my-5">
                    <label htmlFor="">Password</label> <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="**********"
                      onChange={handleChange}
                      className=" border border-gray-300 w-full py-2 rounded-md p-2 dark:text-black"
                    />
                  </div>
                  <div className="my-5">
                    <label htmlFor="">Confirm Password</label> <br />
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="**********"
                      onChange={handleChange}
                      className=" border border-gray-300 w-full py-2 rounded-md p-2 dark:text-black"
                    />
                  </div>
                  <Button className="bn632-hover bn20" style={authButton}>
                    Sign Up
                  </Button>
                </form>
                <Button
                  onClick={googleAuth}
                  className="bn632-hover bn20 mt-5"
                  style={authButton}
                >
                  
                    <FaGoogle className="text-red-500 mr-5" />
                    <p className="">Sign up with Google</p>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SignUp;
