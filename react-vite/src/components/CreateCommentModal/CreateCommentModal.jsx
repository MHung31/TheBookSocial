import "./CreateCommentModal.css";
import { thunkCreateComment } from "../../redux/comments";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";

function CreateCommentModal({ position, bookId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [comment, setComment] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const handleSubmit = () => {
    const commentObj = {
      comment: comment,
      visibility: "public",
      book_location: position,
    };
    if (!comment) {
      setPlaceholder("Please enter a comment...");
      return;
    }
    dispatch(thunkCreateComment(commentObj, bookId));
    setComment("")

  };
  return (
    <div className="create-comment">
      {" "}

      <textarea
        autoFocus
        id="input-comment"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        maxlength="250"
        placeholder={placeholder}
      />
      <div className="create-comment-buttons">
        <button
          className="comment-button comment-submit"
          onClick={handleSubmit}
        >
          Submit
        </button>

      </div>
    </div>
  );
}

export default CreateCommentModal;
