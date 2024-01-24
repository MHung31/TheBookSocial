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

  if (Object.values(bookComments) && book) {
    Object.values(bookComments).forEach((comment) => {
      const position = comment.book_location.split(":");
      let text = content.slice(Number(position[0]), Number(position[1]));
      let commentInsert = (
        <span className="comment">
          {text}
          <span className="comment-content">
            <img className="comment-avatar" src={comment.user.avatar} />
            <div>
              <div className="comment-user">{comment.user.username}</div>
              <div className="comment-message">{comment.comment}</div>
            </div>
          </span>
        </span>
      );
      content = (
        <>
          {content.slice(0, position[0])}
          {commentInsert}
          {content.slice(position[1])}
        </>
      );
    });
  }

  useEffect(() => {
    dispatch(thunkGetBookDetails(bookId));
    dispatch(getBookComments(bookId));
  }, [dispatch]);

  if (!book) return <></>;
  //   console.log(content);
  return (
    <div className="book-details">
      {/* <div className="book-opener">
        <div className="book-title-author">
          <h1>{title}</h1>
          <h3>{author}</h3>
        </div>
        <div className="book-preview">
          <img src={preview} />
        </div>
      </div> */}
      <p className="book-content">{content}</p>
    </div>
  );
}

export default BookPage;
