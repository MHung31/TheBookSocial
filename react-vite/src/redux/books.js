const SET_ALL_BOOKS = "books/all";
const SET_FAVORITE_BOOKS = "books/favorites";
const SET_CLUB_BOOKS = "books/clubs";
const SET_BOOK_DETAILS = "books/details";

const setAllBooks = (allBooks) => ({
  type: SET_ALL_BOOKS,
  payload: allBooks,
});

export const thunkSetAllBooks = () => async (dispatch) => {
  const response = await fetch("/api/books");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setAllBooks(data.Books));
  }
};

const initialState = {
  books: {
    all_books: {},
    favorite_books: {},
    club_books: {},
    book_details: {},
  },
};

function booksReducer(books = initialState, action) {
  switch (action.type) {
    case SET_ALL_BOOKS:
      const new_all_books = {};
      action.payload.forEach((book) => {
        new_all_books[book.id] = book;
      });
      return { ...books, all_books: { ...new_all_books } };
    default:
      return books;
  }
}

export default booksReducer;
