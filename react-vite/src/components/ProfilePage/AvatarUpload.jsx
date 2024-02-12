import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AvatarUpload.css";
import {
  thunkUpdateProfileImage,
  thunkDefaultProfileImage,
} from "../../redux/profile";

const UploadPicture = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [image, setImage] = useState(sessionUser.avatar);
  const [preview, setPreview] = useState("");

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", image);
    await dispatch(thunkUpdateProfileImage(formData));
    closeModal();
  };

  const defaultImage = async (e) => {
    await dispatch(
      thunkDefaultProfileImage({ ...sessionUser, avatar: "none" })
    );
    closeModal();
  };
  return (
    <form
      className="upload-avatar-modal"
      onSubmit={uploadImage}
      encType="multipart/form-data"
    >
      <h2>Update Avatar</h2>
      {image !== "none" ? (
        <img
          className="profile-avatar"
          alt={"No Image Available"}
          src={preview || image}
        />
      ) : (
        <div className="profile-default-image">
          {sessionUser.first_name[0] + sessionUser.last_name[0]}
        </div>
      )}
      <div id="preview-text">Preview Only</div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <button type="button" className="avatar-clear" onClick={defaultImage}>
        Default Avatar
      </button>
      <button className="avatar-submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UploadPicture;
