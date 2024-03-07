import React from 'react'
import { secretEmail } from '../utils/helper';
import { signOut } from 'firebase/auth';
import { auth } from '../Auth/firebase';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Blog } from '../Context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type prop = {
    toggleModal: (modal: boolean) => boolean
}

function UserModal({toggleModal}: prop) {

    const { currentUser } = Blog();

    const navigate = useNavigate(null);
    const logout = async () => {
      try {
        await signOut(auth);
        navigate("/");
        toast.success("User has be logged out");
      } catch (error) {
        toast.error(error.message);
      }
    };

    return (
        <section
          className="absolute w-[18rem] p-6 bg-white right-0 top-[100%]
        shadows rounded-md z-50 text-gray-500">
          {/* <div className="flex flex-col gap-4 border-b border-gray-300 pb-5">
            {userModal.map((link, i) => (
              <Link
                onClick={() => setModal(false)}
                className="flex items-center gap-2 text-gray-500 hover:text-black/70"
                key={i}
                to={link.path}>
                <span className="text-2xl">{link.icon}</span>
                <h2 className="text-md">{link.title}</h2>
              </Link>
            ))}
          </div> */}
          <Link to={`profile/${currentUser?.uid}`}
                onClick={toggleModal}>
            <FontAwesomeIcon icon="fa-solid fa-user" className="mr-2" />
            Account
        </Link>
          <button
            onClick={logout}
            className="flex flex-col pt-5 cursor-pointer hover:text-black/70">
            Sign Out
            <span className="text-sm">{secretEmail(currentUser?.email)}</span>
          </button>
        </section>
      );
}

export default UserModal