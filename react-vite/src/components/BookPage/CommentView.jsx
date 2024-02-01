import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetBookDetails, thunkResetBookDetails } from "../../redux/books";
import "./BookPage.css";
import {
  getBookComments,
  thunkDeleteComment,
  thunkResetComments,
  thunkEditComment,
} from "../../redux/comments";
import ReactionModal from "../ReactionModal";
import { thunkGetReactions, thunkResetReactions } from "../../redux/reactions";
import CreateCommentModal from "../CreateCommentModal";
import DeleteConfirmModal from "../DeleteConfirmModal";

function CommentView({ commentInfo }) {
  console.log(commentInfo);
  const dispatch = useDispatch();
  const [userCommentMenu, setUserCommentMenu] = useState(false);
  const [comment, setComment] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const navigate = useNavigate();
  const { setModalContent } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const { user } = commentInfo;

  useEffect(() => {
    user.id === sessionUser.id
      ? setUserCommentMenu(true)
      : setUserCommentMenu(false);
    setComment(commentInfo.comment);
  }, [dispatch, commentInfo.id]);

  const editComment = () => {
    const commentObj = {
      comment: comment,
      visibility: "public",
      flagged: false,
    };
    if (!comment) {
      setPlaceholder("Please enter a comment...");
      return;
    }
    dispatch(thunkEditComment(commentObj, commentInfo.id));
  };

  const createReaction = (e) => {
    e.preventDefault();
    setModalContent(<ReactionModal commentId={commentInfo.id} />);
  };

  return (
    <div className="comment-content">
      {" "}
      <div
        className="add-reaction"
        title="Add Reaction"
        onClick={createReaction}
      >
        <div className="add-emoji">
          <i class="fa-solid fa-plus"></i>
        </div>
        <i class="fa-regular fa-face-smile"></i>
      </div>
      {user.avatar !== "none" ? (
        <img
          onClick={() => navigate(`/users/${user.id}`)}
          className="comment-avatar"
          src={user.avatar}
        />
      ) : (
        <div
          onClick={() => navigate(`/users/${user.id}`)}
          className="comment-no-avatar"
        >
          {user.first_name[0] + user.last_name[0]}
        </div>
      )}
      <div>
        {userCommentMenu ? (
          <div
            className="delete-comment"
            title="Delete Comment"
            onClick={() => {
              setModalContent(
                <DeleteConfirmModal
                  thunk={thunkDeleteComment(commentInfo.id)}
                  message="Delete comment?"
                />
              );
              //   setShowComment(false);
            }}
          >
            <i class="fa-solid fa-eraser"></i>
          </div>
        ) : (
          <></>
        )}

        <div className="comment-user">{user.username}</div>

        {userCommentMenu ? (
          <textarea
            className="comment-message edit-message"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            maxlength="250"
            placeholder={placeholder}
            onBlur={editComment}
            title="Edit Comment"
          />
        ) : (
          <div className="comment-message">{comment}</div>
        )}
        <div className="comment-reactions">{/* {reactionComponent} */}</div>
      </div>
    </div>
  );
}

export default CommentView;
