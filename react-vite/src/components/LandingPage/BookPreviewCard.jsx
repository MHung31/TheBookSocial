import { NavLink } from "react-router-dom";
import "./BookPreviewCard.css";

function BookPreviewCard({ book }) {
  let { author, id, length, preview, title } = book;
  return (
    <NavLink to={`/books/${id}`} className="book-preview">
      <div className="book-preview-content">
        <img src={preview} alt="Preview Not Available" />
        <h3 className="preview-title">{title}</h3>
        <h5 className="preview-author">{author}</h5>
        <div className="progress-bar"></div>
      </div>
    </NavLink>
  );
}

export default BookPreviewCard;
