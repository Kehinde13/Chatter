import { secretEmail } from '../utils/helper';
import { signOut } from 'firebase/auth';
import { auth } from '../Auth/firebase';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Blog } from '../Context/Context';
import { FaUserAstronaut } from "react-icons/fa";
import { FirebaseError } from 'firebase/app';

type Props = {
  toggleModal: () => void
}

function UserModal({ toggleModal }: Props) {
    const { currentUser } = Blog();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            navigate("/");
            toast.success("User has been logged out");
        } catch (error: unknown) {
          if (error instanceof FirebaseError) {
              toast.error(error.message);
          } else {
              toast.error("An error occurred");
          }
      }
    };

    
    const user = currentUser as { uid?: string, email?: string };

    return (
        <section className="absolute w-[18rem] p-6 bg-white right-0 top-[100%] shadows rounded-md z-50">
            {user && user.uid  && ( 
                <>
                    <Link to={`profile/${user.uid}`} onClick={toggleModal} className='flex'>
                        <FaUserAstronaut className="mr-2" />
                        <p className='self-center'>Account</p>
                    </Link>
                    <button onClick={logout} className="flex flex-col pt-5 cursor-pointer text-red-500">
                        Sign Out
                    </button>
                    {user && user.email && <p className="text-sm mt-2">{secretEmail(user.email)}</p>}
                </>
            )}
        </section>
    );
}

export default UserModal;
