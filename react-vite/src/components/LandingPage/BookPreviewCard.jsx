import { NavLink, useLocation, useParams } from "react-router-dom";
import "./BookPreviewCard.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  thunkSetAllBooks,
  thunkSetFavoriteBooks,
  thunkAddFavoriteBook,
  thunkDeleteFavoriteBook,
} from "../../redux/books";
import { thunkDeleteClubBook } from "../../redux/clubs";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { useModal } from "../../context/Modal";

function BookPreviewCard({ book }) {
  const { setModalContent } = useModal();
  const { clubId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const isClub = pathname.startsWith("/clubs/");
  let { author, id, length, preview, title, num_comments } = book;
  const favorites = useSelector((state) => state.books.favorite_books);
  const sessionUser = useSelector((state) => state.session.user);
  const club = useSelector((state) => state.clubs.clubs[clubId]);
  let ownsClub = false;
  if (isClub) ownsClub = sessionUser.id === club.user_id;

  const toggleFavorite = () => {
    const book = { book_id: id };
    if (favorites[id]) {
      dispatch(thunkDeleteFavoriteBook(id));
    } else {
      dispatch(thunkAddFavoriteBook(book));
    }
  };

  const removeBook = (e) => {
    setModalContent(
      <DeleteConfirmModal
        thunk={thunkDeleteClubBook(id, clubId)}
        message="Remove book from club?"
      />
    );
  };

  return (
    <div className="preview-card">
      {isClub && ownsClub ? (
        <div className="club-remove-book" onClick={removeBook}>
          <i class="fa-solid fa-circle-xmark"></i>
        </div>
      ) : (
        <></>
      )}
      <NavLink to={`/books/${id}`} className="book-preview">
        <div className="book-preview-content">
          <img src={preview} alt="Preview Not Available" />
          <div
            title="Progress Bar"
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
