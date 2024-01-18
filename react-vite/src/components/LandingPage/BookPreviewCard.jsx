import { NavLink, useLocation } from "react-router-dom";
import "./BookPreviewCard.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  thunkAddFavoriteBook,
  thunkDeleteFavoriteBook,
} from "../../redux/books";

function BookPreviewCard({ book }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const club = pathname.startsWith("/clubs/");
  let { author, id, length, preview, title } = book;
  const favorites = useSelector((state) => state.books.favorite_books);
  const [isFavorite, setIsFavorite] = useState(favorites[id]);

  const toggleFavorite = () => {
    const book = { book_id: id };
    if (isFavorite) {
      dispatch(thunkDeleteFavoriteBook(id));
    } else {
      dispatch(thunkAddFavoriteBook(book));
    }
    setIsFavorite(!isFavorite);
  };
  return (
    <div>
      <NavLink to={`/books/${id}`} className="book-preview">
        <div className="book-preview-content">
          <img src={preview} alt="Preview Not Available" />

          <h3 className="preview-title">{title}</h3>
          <h5 className="preview-author">{author}</h5>
          <div className="progress-bar"></div>
        </div>
      </NavLink>{" "}
      <div onClick={toggleFavorite} className="favorite-star">
        {isFavorite ? (
          <i class="fa-solid fa-star" style={{ color: "gold" }}></i>
        ) : (
          <i class="fa-regular fa-star"></i>
        )}
      </div>
    </div>
  );
}

export default BookPreviewCard;
