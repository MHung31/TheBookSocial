import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetBookDetails } from "../../redux/books";
import "./BookPage.css";
import { getBookComments } from "../../redux/comments";

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

  let buildBook; 
  const commentMenu = (commentId) => {
    if (showComment && commentId === currComment) {
      setShowComment(false);
      return;
    }

    setComment(bookComments[commentId].comment);
    setAvatar(bookComments[commentId].user.avatar);
    setUsername(bookComments[commentId].user.username);
    setCurrComment(commentId);
    setShowComment(true);
  };



  if (Object.values(bookComments).length && book) {
    buildBook = Object.values(bookComments).map((comment) => {
      const position = comment.book_location.split(":");
      let text = content.slice(Number(position[0]), Number(position[1]));
      let commentInsert = <span className="comment">{text}</span>;

      return (
        <>
          {content.slice(0, position[0])}
          <span ref={ulRef} onClick={() => commentMenu(comment.id)}>
            {commentInsert}
          </span>
          {content.slice(position[1])}
        </>
      );
    });
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
        <span className="comment-content">
          <img className="comment-avatar" src={avatar} />
          <div>
            <div
              className="close-comment"
              onClick={() => setShowComment(false)}
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div className="comment-user">{userName}</div>
            <div className="comment-message">{comment}</div>
          </div>
        </span>
      )}
    </div>
  );
}

export default BookPage;
