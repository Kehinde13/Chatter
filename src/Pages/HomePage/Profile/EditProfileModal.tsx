import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import profilePhoto from "../../../assets/profile.jpg";

type prop = {
  modal: boolean;
  setModal: (modal: boolean) => boolean;
};

function EditProfileModal({ modal, setModal }: prop) {
  const imgRef = useRef(null);
  const [profileImgUrl, setProfileImgUrl] = useState<string>("");
  const [form, setForm] = useState({
    username: "",
    userImg: "",
    bio: "",
  });
  const [loading, setLoading] = useState<string>(false)

  /* openFile works on the button because a ref has been set on the input and the click event refrences it*/
  const openFile = () => {
    imgRef.current.click();
  };

  const btn = "border border-green-600 py-2 px-5 rounded-full text-green-600";

  return (
    <div>
      {modal && (
        <div className="AuthModal transition-all duration-500 dark:bg-slate-800 dark:text-white">
          <div className="opacity-100 relative w-[80%] md:w-[50%] py-10 px-5 mx-auto mt-20 bg-white dark:bg-slate-800 dark:text-white rounded-md border ">
            <button className="absolute top-3 right-5">
              <FontAwesomeIcon
                onClick={() => setModal(!modal)}
                icon="fa-solid fa-xmark"
              />
            </button>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl">Profile information</h2>
              </div>
              <section className="mt-6">
                <div className="flex gap-[2rem]">
                  <div className="w-[5rem]">
                    <img
                      className="min-h-[5rem] min-w-[5rem] object-cover border rounded-full"
                      src={
                        profileImgUrl
                          ? profileImgUrl
                          : /* : form.userImg
                          ? form.userImg */
                            profilePhoto
                      }
                      alt="profile-img"
                    />
                    <input
                      onChange={(e) => {
                        setProfileImgUrl(
                          URL.createObjectURL(e.target.files[0])
                        );
                        /* setForm({ ...form, userImg: e.target.files[0] }); */
                      }}
                      accept="image/jpg, image/png, image/jpeg"
                      ref={imgRef}
                      type="file"
                      hidden
                    />
                  </div>
                  <div>
                    <div className="flex gap-4 text-sm">
                      <button onClick={openFile} className="text-green-600">
                        Update
                      </button>
                      <button className="text-red-600">Remove</button>
                    </div>
                    <p className="w-full sm:w-[20rem] text-sm pt-2">
                      Recommended: Square JPG, PNG, or GIF, at least 1,000
                      pixels per side.
                    </p>
                  </div>
                </div>
              </section>
              <section className="pt-[1rem] text-sm">
                <label className="pb-3 block" htmlFor="">
                  Name*
                </label>
                <input
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  value={form.username}
                  type="text"
                  placeholder="username..."
                  className="p-1 border-b border-black w-full outline-none"
                  maxLength={50}
                />
                <p className="text-sm  pt-2">
                  Appears on your Profile page, as your byline, and in your
                  responses.
                  {form.username.length}/50
                </p>
                <section className="pt-[1rem] text-sm">
                  <label className="pb-3 block" htmlFor="">
                    Bio*
                  </label>
                  <input
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    value={form.bio}
                    type="text"
                    placeholder="bio..."
                    className="p-1 border-b border-black w-full outline-none"
                    maxLength={160}
                  />
                  <p className="text-sm  pt-2">
                    Appears on your Profile and next to your stories.{" "}
                    {form.bio.length}/160
                  </p>
                </section>
              </section>
              <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <button onClick={() => setModal(false)} className={btn}>
            Cancel
          </button>
          <button
            /* onClick={saveForm} */
            className={`${btn} bg-green-800 text-white ${
              loading ? "opacity-50" : ""
            }`}>
            Save
          </button>
        </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfileModal;
