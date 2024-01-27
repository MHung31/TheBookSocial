import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetBookDetails } from "../../redux/books";
import "./BookPage.css";
import { getBookComments, thunkCreateComment } from "../../redux/comments";
import ReactionModal from "../ReactionModal";
import { thunkGetReactions, thunkResetReactions } from "../../redux/reactions";
import CreateCommentModal from "../CreateCommentModal";

function BookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.book_details);
  const bookComments = useSelector((state) => state.comments);
  const commentReactions = useSelector((state) => state.reactions);
  if (book.error) return <>Book not found</>;
  let { author, content, id, preview, title } = book;
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userName, setUsername] = useState("");
  const [currComment, setCurrComment] = useState(-1);
  const [seeOriginal, setSeeOriginal] = useState(false);
  const ulRef = useRef();
  //REACTION LEGEND
  //1 - 😍 &#128525;
  //2 - 😎 &#128526;
  //3 - 😂 &#128514;
  //4 - 😓 &#128531;
  //5 - 😒 &#128530;
  //6 - 😱 &#128561;
  //7 - 😡 &#128545;
  //8 - 😭 &#128557;
  //9 - 🤔 &#129300;
  //10 - 🥺 &#129402;
  //11 - 💀 &#128128;
  //12 - 🤦 &#129318;
  //13 - 🙏 &#128591;
  //14 - 🧡 &#129505;
  //15 - 🔥 &#128293;
  //16 - 💤 &#128164;
  //17 - 💯 &#128175;
  //18 - 🏅 &#127941;

  let reactionList = [];

  if (Object.values(commentReactions).length) {
    Object.values(commentReactions).forEach((reaction) => {
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

  const createReaction = (e) => {
    e.preventDefault();
    setModalContent(<ReactionModal commentId={currComment} />);
  };

  const commentMenu = (e, commentId) => {
    e.preventDefault();
    e.stopPropagation();
    if (showComment && commentId === currComment) {
      setShowComment(false);
      dispatch(thunkResetReactions());
      return;
    }
    dispatch(thunkGetReactions(commentId));
    setComment(bookComments[commentId].comment);
    setAvatar(bookComments[commentId].user.avatar);
    setUsername(bookComments[commentId].user.username);
    setCurrComment(commentId);
    setShowComment(true);
  };

  let buildBook;
  if (Object.values(bookComments).length && book) {
    let currPosition = content.length;
    let sortedComments = Object.values(bookComments).sort((a, b) => {
      let posA = Number(a.book_location.split(":")[0]);
      let posB = Number(b.book_location.split(":")[0]);
      if (posA > posB) return -1;
      return b;
    });

    buildBook = sortedComments.map((comment) => {
      const position = comment.book_location.split(":");
      let text = content.slice(Number(position[0]), Number(position[1]));
      let commentInsert = <span className="comment">{text}</span>;
      let postContent = content.slice(position[1], currPosition);
      currPosition = position[0];
      return (
        <>
          <span
            title="Click to see comment"
            ref={ulRef}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              commentMenu(e, comment.id);
            }}
          >
            {commentInsert}
          </span>
          {postContent}
        </>
      );
    });

    if (currPosition !== 0) {
      let lastPart = <>{content.slice(0, currPosition)}</>;
      buildBook.push(lastPart);
    }

    buildBook.reverse();
  } else {
    buildBook = content;
  }

  useEffect(() => {
    dispatch(thunkGetBookDetails(bookId));
    dispatch(getBookComments(bookId));
  }, [dispatch]);

  const addComment = () => {
    const selected = document.getSelection();
    const range = selected.getRangeAt(0);
    const { startOffset, endOffset } = range;
    if (startOffset - endOffset)
      setModalContent(
        <CreateCommentModal
          position={`${startOffset}:${endOffset}`}
          bookId={bookId}
        />
      );
  };

  if (!book) return <></>;
  return (
    <div className="book-details">
      {seeOriginal ? (
        <p
          className="book-content book-original"
          onMouseUp={() => {
            addComment();
            setSeeOriginal(false);
          }}
        >
          {content}
        </p>
      ) : (
        <p className="book-content" onMouseDown={() => setSeeOriginal(true)}>
          {buildBook}
        </p>
      )}
      {showComment && (
        <div className="comment-content">
          <img className="comment-avatar" src={avatar} />
          <div>
            <div
              className="close-comment"
              onClick={() => {
                setShowComment(false);
                dispatch(thunkResetReactions());
              }}
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div className="comment-user">{userName}</div>
            <div className="comment-message">{comment}</div>
            <div className="comment-reactions">
              {reactionComponent}

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookPage;
