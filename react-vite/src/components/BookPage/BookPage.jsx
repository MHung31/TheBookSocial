import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetBookDetails } from "../../redux/books";
import "./BookPage.css";
import { getBookComments } from "../../redux/comments";
import ReactionModal from "../ReactionModal";
import { thunkGetReactions, thunkResetReactions } from "../../redux/reactions";

function BookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.book_details);
  const bookComments = useSelector((state) => state.comments);
  if (book.error) return <>Book not found</>;
  let { author, content, id, preview, title } = book;
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userName, setUsername] = useState("");
  const [currComment, setCurrComment] = useState(-1);
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

  const reactionList = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
  };
  const createReaction = (e) => {
    e.preventDefault();
    setModalContent(<ReactionModal commentId={currComment} />);
  };

  const commentMenu = (commentId) => {
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
          <span ref={ulRef} onClick={() => commentMenu(comment.id)}>
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

  if (!book) return <></>;
  return (
    <div className="book-details">
      <p className="book-content">{buildBook}</p>
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
