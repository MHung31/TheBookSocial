import "./DeleteConfirmModal.css";
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";

function DeleteConfirmModal({ thunk, message }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const deleteConfirmed = () => {
    dispatch(thunk);
    closeModal();
  };

  return (
    <div className="delete-modal">
      <h2>{message}</h2>
      <div className="delete-buttons-yes-no">
        <button className="delete-button delete-yes" onClick={deleteConfirmed}>
          Confirm
        </button>
        <button className="delete-button delete-no" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
