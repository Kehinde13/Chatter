import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import { Blog } from "../Context/Context";
import GoogleSignIn from "../hooks/GoogleSignIn";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<object>({
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

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      form[
        ("firstName", "lastName", "Email", "password", "confirmPassword")
      ] === ""
    ) {
      toast.error("All fields are required");
      setLoading(false);
    } else if (form["password"] !== form["confirmPassword"]) {
      toast.error("your passwords does not Match");
      setLoading(false);
      return;
    } else {
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
          toast.success("Sign Up Succesfull");
          navigate("/HomePage");
          setLoading(false);
        }
      } catch (error: unknown) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="h-screen bg-white">
      {loading || googleLoading ? (
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
            <div className="sm:w-[80%] p-5 mx-auto ">
              <div className="flex justify-between border-b-2 border-transparent pb-3 mb-3 w-full">
                <Link
                  to="/SignUp"
                  className=" border-b-[3px] border-purple-500 w-[50%] pb-3"
                >
                  REGISTER
                </Link>
                <Link
                  to="/LoginPage"
                  className=" border-b-[3px] w-[50%] pb-3 text-right"
                >
                  LOGIN
                </Link>
              </div>
              <h1 className="text-3xl font-bold">
                Register as a Writer/Reader
              </h1>
              <form action="" onSubmit={handleSubmit}>
                <div className="md:flex gap-2 my-5">
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
                  <label htmlFor="">confirm Password</label> <br />
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="**********"
                    onChange={handleChange}
                    className=" border border-gray-300 w-full py-2 rounded-md p-2 dark:text-black"
                  />
                </div>
                <button className="bold md:py-2 md:px-10 mt-3 p-1 bg-purple-500 rounded-md w-full text-white">
                  Sign Up
                </button>
              </form>
              <button
                onClick={googleAuth}
                className="bold md:py-2 md:px-10 mt-3 p-1 bg-purple-500 rounded-md w-full text-white"
              >
                <FontAwesomeIcon
                  className="text-red-500 mr-5"
                  icon="fa-brands fa-google"
                />
                Sign Up with Google
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SignUp;
