import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Blog } from '../../../Context/Context';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../../Auth/firebase';
import { FirebaseError } from 'firebase/app';

function EditPost() {
  const [showSideBar]: [boolean] = useOutletContext();
  const { updateData, title, setTitle, description, setDescription } = Blog();
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const postId = pathname.split('/')[3];
  const navigate = useNavigate();

  const publishEdit = async () => {
    try {
      setLoading(true);
      const ref = doc(db, 'posts', postId);
      await updateDoc(ref, {
        title,
        description,
      });
      navigate('/HomePage');
      toast.success('Post has been updated');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (updateData) {
      setTitle(updateData.title);
      setDescription(updateData.description);
    }
  }, [setDescription, setTitle, updateData]);

  return (
    <div className={`sm:mx-3 w-[80%] ${showSideBar ? 'hidden' : ''}`}>
      <section>
        <input
          type="text"
          placeholder="Title..."
          className="text-4xl outline-none w-full dark:text-black p-2 dark:bg-gray-300 my-5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          placeholder="Description..."
          theme="snow"
          value={description}
          onChange={setDescription}
        />
      </section>
      <button
        onClick={publishEdit}
        className="text-right p-2 bg-purple-500 text-white rounded-md mt-5"
        disabled={loading}
      >
        {loading ? 'Publishing' : 'Publish'}
      </button>
    </div>
  );
}

export default EditPost;
