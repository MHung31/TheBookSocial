import "./ClubOptionsModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";

function ClubOptions({ clubId }) {
  const dispatch = useDispatch();
  const { id, title, user_id } = useSelector(
    (state) => state.clubs.clubs[clubId]
  );
  // const { id, is_public, background_image, name } = item;
  // const { setModalContent } = useModal();
  // const [boardOptions, setBoardOptions] = useState(true);

  // const deleteBoard = (e) => {
  //   e.preventDefault();
  //   setBoardOptions(false);
  //   setModalContent(<DeleteBoardModal id={id} />);
  // };
  // const [isPublic, setIsPublic] = useState(is_public);
  // const [previewColor, setPreviewColor] = useState(background_image);

  // const updateBoard = async (e) => {
  //   const boardDetails = {
  //     id: id,
  //     name: name,
  //     is_public: isPublic,
  //     background_image: previewColor,
  //   };
  //   dispatch(editBoardThunk(boardDetails, id, currBoardId));
  // };

  // useEffect(() => {
  //   updateBoard();
  // }, [previewColor, isPublic]);

  return (
    <div className="club-modal-options">
      <h2>{title}</h2>
      <h3>Members</h3>
      <button>Add member</button>
      <button>Leave Club</button>
      <button>Delete Club</button>
    </div>
  );
}

export default ClubOptions;
