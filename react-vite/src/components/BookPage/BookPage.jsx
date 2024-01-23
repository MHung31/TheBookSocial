import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetBookDetails } from "../../redux/books";
import "./BookPage.css";

function BookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.book_details);
  if (book.error) return <>Book not found</>;
  const { author, content, id, preview, title } = book;

  useEffect(() => {
    dispatch(thunkGetBookDetails(bookId));
  }, [dispatch]);

  if (!book) return <></>;

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
      <pre className="book-content">{content}</pre>
    </div>
  );
}

export default BookPage;
