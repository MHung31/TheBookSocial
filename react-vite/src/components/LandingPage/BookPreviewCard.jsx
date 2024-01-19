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

function BookPreviewCard({ book }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const club = pathname.startsWith("/clubs/");
  let { author, id, length, preview, title, num_comments } = book;
  const favorites = useSelector((state) => state.books.favorite_books);

  const toggleFavorite = () => {
    const book = { book_id: id };
    if (favorites[id]) {
      dispatch(thunkDeleteFavoriteBook(id));
    } else {
      dispatch(thunkAddFavoriteBook(book));
    }
  };
  return (
    <div>
      <NavLink to={`/books/${id}`} className="book-preview">
        <div className="book-preview-content">
          <img src={preview} alt="Preview Not Available" />
          <div
            className="progress-bar"
            style={{
              background: `linear-gradient(90deg, green 0 70%, white 0% 100%)`,
            }}
          ></div>
          <h3 className="preview-title">{title}</h3>
          <h5 className="preview-author">{author}</h5>
          <h5 className="preview-comments-count">
          <i class="fa-sharp fa-regular fa-comment"></i>
            {` ${num_comments}`}
          </h5>
        </div>
      </NavLink>{" "}
      <div onClick={toggleFavorite} className="favorite-star">
        {favorites[id] ? (
          <i class="fa-solid fa-star" style={{ color: "gold" }}></i>
        ) : (
          <i class="fa-regular fa-star"></i>
        )}
      </div>
    </div>
  );
}

export default BookPreviewCard;
