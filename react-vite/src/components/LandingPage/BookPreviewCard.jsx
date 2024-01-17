import { NavLink } from "react-router-dom";
import "./BookPreviewCard.css";

function BookPreviewCard({ book }) {
  let { background_image, name, id } = book;
  return (
    <NavLink
      to={`/books/${id}`}
      className="book-preview"
      style={{ backgroundColor: background_image }}
    >
      {name}
    </NavLink>
  );
}

export default BookPreviewCard;
