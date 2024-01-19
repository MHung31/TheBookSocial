import { NavLink, useLocation } from "react-router-dom";
import "./BookPreviewCard.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  thunkSetAllBooks,
  thunkSetFavoriteBooks,
  thunkAddFavoriteBook,
  thunkDeleteFavoriteBook,
} from "../../redux/books";

function BookPreviewCardSearch({ book }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const club = pathname.startsWith("/clubs/");
  let { author, id, length, preview, title, num_comments } = book;
  const favorites = useSelector((state) => state.books.favorite_books);

  const addBook = () => {
    const book = { book_id: id };
    if (favorites[id]) {
      dispatch(thunkDeleteFavoriteBook(id));
    } else {
      dispatch(thunkAddFavoriteBook(book));
    }
  };
  return (
      <div onClick={addBook} className="book-preview-search">
        <div className="book-preview-content">
          <img src={preview} alt="Preview Not Available" />

          <h3 className="preview-title">{title}</h3>
          <h5 className="preview-author">{author}</h5>
          <h5 className="preview-comments-count">
            <i class="fa-sharp fa-regular fa-comment"></i>
            {` ${num_comments}`}
          </h5>
        </div>
      </div>

  );
}

export default BookPreviewCardSearch;
