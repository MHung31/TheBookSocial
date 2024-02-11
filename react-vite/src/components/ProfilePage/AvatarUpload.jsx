import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AvatarUpload.css";
import { thunkUpdateProfile } from "../../redux/profile";

const UploadPicture = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [image, setImage] = useState(sessionUser.avatar);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...sessionUser, avatar: image };
    console.log("form---", formData)
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea

    dispatch(thunkUpdateProfile(formData));
    // history.push("/images");
  };
  return (
    <form
      className="upload-avatar-modal"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2>Update Avatar</h2>
      {image !== "none" ? (
        <img className="profile-avatar" src={sessionUser.avatar} />
      ) : (
        <div className="profile-default-image">
          {sessionUser.first_name[0] + sessionUser.last_name[0]}
        </div>
      )}
      <div id="preview-text">Preview Only</div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button
        type="button"
        className="avatar-clear"
        onClick={() => setImage("none")}
      >
        Default Avatar
      </button>
      <button className="avatar-submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UploadPicture;
