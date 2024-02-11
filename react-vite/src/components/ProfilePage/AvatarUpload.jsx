import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AvatarUpload.css";

const UploadPicture = () => {
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [image, setImage] = useState(sessionUser.avatar);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    await dispatch(createPost(formData));
    // history.push("/images");
  };
  return (
    <form
      className="upload-avatar-modal"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2>Update Avatar</h2>
      {sessionUser.avatar !== "none" ? (
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
      <button className="avatar-clear">Default Avatar</button>
      <button className="avatar-submit" type="submit">
        Submit
      </button>
      {imageLoading && <p>Loading...</p>}
    </form>
  );
};

export default UploadPicture;
