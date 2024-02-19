import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { database, provider } from "./firebase";
import { useState } from "react";


function SignUp() {
  const [userEmail, setUserEmail] = useState<string>("")
  const [userPassword, setUserPassword] = useState<string>("")

  const history = useNavigate()
 
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    alert('hey');
    
    e.preventDefault();
    //gets user email and password from the input
    const email = userEmail;
    const password = userPassword;
    
    //Creates a new user account associated with the specified email address and password.
    createUserWithEmailAndPassword(database, email, password).then(() => {
      alert('Signed up Successfully')
      history('/HomePage')
    }).catch((err)=> {
        alert(err.code)
    })
  };

  function SignUpwithGoogle(){
    const auth = getAuth()
    signInWithRedirect(auth, provider).then(() => {
      alert('Signed up Successfully')
      history('/HomePage')
    });
  }


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
        <div className="w-[80%] mx-auto">
          <div className="flex justify-between border-b-2 border-transparent pb-3 mb-3 w-full">
            <Link
              to="/SignUp"
              className=" border-b-[3px] border-blue-500 w-[50%] pb-5"
            >
              REGISTER
            </Link>
            <Link
              to="/LoginPage"
              className=" border-b-[3px] w-[50%] pb-5 text-right"
            >
              LOGIN
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Register as a Writer/Reader</h1>
          <form action=""
          onSubmit={(e) => handleSubmit(e)}
          >
            <div className="md:flex gap-2 my-5">
              <div>
                <label htmlFor="">First Name</label> <br />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="border border-gray-300 py-2 px-2 rounded-md w-full"
                  placeholder="John"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
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
                />
              </div>
            </div>
            <div className="my-5">
              <label htmlFor="">You are joining as?</label> <br />
              <select
                name="user"
                id="user"
                className=" border border-gray-300 w-full py-2 rounded-md"
              >
                <option value="writer">writer</option>
                <option value="reader">reader</option>
              </select>
            </div>
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
            <div className="my-5">
              <label htmlFor="">confirm Password</label> <br />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="**********"
                className=" border border-gray-300 w-full py-2 rounded-md p-2"
              />
            </div>
            <button className="bold md:py-2 md:px-10 p-1 bg-blue-500 rounded-md w-full text-white">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
