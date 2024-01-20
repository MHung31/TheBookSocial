import "./DeleteConfirmModal.css";
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";

function DeleteConfirmModal({
  thunk,
  message,
  clubId = null,
  memberId = null,
  bookId = null,
}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const deleteConfirmed = () => {
    dispatch(thunk(bookId, clubId));
    closeModal();
  };

  return (
    <div className="delete-modal">
      <h2>{message}</h2>
      <div className="delete-buttons-yes-no">
        <button className="delete-button delete-yes" onClick={deleteConfirmed}>
          Remove
        </button>
        <button className="delete-button delete-no" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
