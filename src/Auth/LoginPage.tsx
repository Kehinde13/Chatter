import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from "./firebase";

function LoginPage() {
  const history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    //gets user email and password from the input
    const email = e.target.userEmail.value;
    const password = e.target.password.value;

    //Asynchronously signs in using an email and password. "fails if user is not in the database"
    signInWithEmailAndPassword(database, email, password)
      .then(() => {
        history("/HomePage");
      })
      .catch((err) => {
        alert(err.code);
      })
  };
  return (
    <div className="h-screen">
      <Link to="/" className="text-white md:text-black absolute m-5 font-bold">
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
        <div className="w-[80%] p-5 mx-auto">
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
           onSubmit={e => handleSubmit(e)}
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
                />
              </div>
              <button className="bold md:py-2 md:px-10 p-1 bg-blue-500 rounded-md w-full text-white">
                Login
              </button>
            </div>
          </form>
          <button
            className="bold md:py-2 md:px-10 p-1 my-2 border border-gray-300 rounded-md 
                  w-full hover:bg-blue-500 hover:text-white"
          >
            Sign in with google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
