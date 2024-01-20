import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./AddBookModal.css";
import BookPreviewCardSearch from "./BookPreviewCardSearch";
import { thunkSetAllBooks } from "../../redux/books";


function AddBookModal() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const allBooks = useSelector((state) => state.books.all_books);
  const filteredBooks = Object.values(allBooks).filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    dispatch(thunkSetAllBooks());
  }, [dispatch]);

  return (
    <div className="add-book-modal">
      <div className="search-header">
        <h4>Search Title</h4> <label></label>
        &#x1F50E;&#xFE0E;
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
      </div>
      <div className="searched-books">
        {" "}
        {filteredBooks.map((book) => {
          return <BookPreviewCardSearch book={book} />;
        })}
      </div>
    </div>
  );
}

export default AddBookModal;
