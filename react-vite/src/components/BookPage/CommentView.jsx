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
  const dispatch = useDispatch();
  const [userCommentMenu, setUserCommentMenu] = useState(false);
  const [comment, setComment] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const navigate = useNavigate();
  const { setModalContent } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const bookReactions = useSelector((state) => state.reactions);

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

  let reactionList = [];

  if (bookReactions[commentInfo.id]?.length) {
    bookReactions[commentInfo.id].forEach((reaction) => {
      if (reactionList[reaction.reaction]) {
        reactionList[reaction.reaction] += 1;
      } else reactionList[reaction.reaction] = 1;
    });
  }
  let reactionComponent = [];

  if (reactionList.length) {
    for (let key in reactionList) {
      switch (key) {
        case "1":
          reactionComponent.push(
            <div className="reaction-display">&#128525;{reactionList[key]}</div>
          );
          break;
        case "2":
          reactionComponent.push(
            <div className="reaction-display">&#128526;{reactionList[key]}</div>
          );
          break;
        case "3":
          reactionComponent.push(
            <div className="reaction-display">&#128514;{reactionList[key]}</div>
          );
          break;
        case "4":
          reactionComponent.push(
            <div className="reaction-display">&#128531;{reactionList[key]}</div>
          );
          break;
        case "5":
          reactionComponent.push(
            <div className="reaction-display">&#128530;{reactionList[key]}</div>
          );
          break;
        case "6":
          reactionComponent.push(
            <div className="reaction-display">&#128561;{reactionList[key]}</div>
          );
          break;
        case "7":
          reactionComponent.push(
            <div className="reaction-display">&#128545;{reactionList[key]}</div>
          );
          break;
        case "8":
          reactionComponent.push(
            <div className="reaction-display">&#128557;{reactionList[key]}</div>
          );
          break;
        case "9":
          reactionComponent.push(
            <div className="reaction-display">&#129300;{reactionList[key]}</div>
          );
          break;
        case "10":
          reactionComponent.push(
            <div className="reaction-display">&#129402;{reactionList[key]}</div>
          );
          break;
        case "11":
          reactionComponent.push(
            <div className="reaction-display">&#128128;{reactionList[key]}</div>
          );
          break;
        case "12":
          reactionComponent.push(
            <div className="reaction-display">&#129318;{reactionList[key]}</div>
          );
          break;
        case "13":
          reactionComponent.push(
            <div className="reaction-display">&#128591;{reactionList[key]}</div>
          );
          break;
        case "14":
          reactionComponent.push(
            <div className="reaction-display">&#129505;{reactionList[key]}</div>
          );
          break;
        case "15":
          reactionComponent.push(
            <div className="reaction-display">&#128293;{reactionList[key]}</div>
          );
          break;
        case "16":
          reactionComponent.push(
            <div className="reaction-display">&#128164;{reactionList[key]}</div>
          );
          break;
        case "17":
          reactionComponent.push(
            <div className="reaction-display">&#128175;{reactionList[key]}</div>
          );
          break;
        case "18":
          reactionComponent.push(
            <div className="reaction-display">&#127941;{reactionList[key]}</div>
          );
          break;
      }
    }
  }
  return (
    <div className="comment-content">
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
            }}
          >
            <i class="fa-solid fa-eraser"></i>
          </div>
        ) : (
          <></>
        )}

        <div className="comment-user">
          {user.username}
          {userCommentMenu && " (you)"}
        </div>

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
        <div className="comment-reactions">{reactionComponent}</div>
      </div>
    </div>
  );
}

export default CommentView;
