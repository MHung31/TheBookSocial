const SET_ALL_BOOKS = "books/all";
const SET_FAVORITE_BOOKS = "books/favorites";
const SET_BOOK_DETAILS = "books/details";
const ADD_FAVORITE_BOOK = "/books/favorites/add";
const DELETE_FAVORITE_BOOK = "/books/favorites/delete";
const RESET_BOOK_DETAILS = "books/reset-details";

const resetBookDetails = () => ({
  type: RESET_BOOK_DETAILS,
  payload: null,
});

export const thunkResetBookDetails = () => async (dispatch) => {
  dispatch(resetBookDetails());
};
const setBookDetails = (bookDetails) => ({
  type: SET_BOOK_DETAILS,
  payload: bookDetails,
});

export const thunkGetBookDetails = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setBookDetails(data));
  }
};

const setAllBooks = (allBooks) => ({
  type: SET_ALL_BOOKS,
  payload: allBooks,
});

const setFavoriteBooks = (favBooks) => ({
  type: SET_FAVORITE_BOOKS,
  payload: favBooks,
});

const addFavoriteBook = (book) => ({
  type: ADD_FAVORITE_BOOK,
  payload: book,
});

const deleteFavoriteBook = (book) => ({
  type: DELETE_FAVORITE_BOOK,
  payload: book,
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

export const thunkSetFavoriteBooks = () => async (dispatch) => {
  const response = await fetch("/api/session/favorites");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setFavoriteBooks(data.favorites));
  }
};

export const thunkAddFavoriteBook = (book) => async (dispatch) => {
  const response = await fetch("/api/session/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(addFavoriteBook(data.added));
  }
};

export const thunkDeleteFavoriteBook = (id) => async (dispatch) => {
  const response = await fetch(`/api/session/favorites/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(deleteFavoriteBook(id));
  }
};

const initialState = {
  all_books: {},
  favorite_books: {},
  book_details: {},
};

function booksReducer(books = initialState, action) {
  let new_fav_books = {};
  let new_all_books = {};
  let new_books = {};
  switch (action.type) {
    case SET_ALL_BOOKS:
      action.payload.forEach((book) => {
        new_all_books[book.id] = book;
      });
      new_books = { ...books };
      new_books.all_books = {...new_all_books};
      return new_books;
    case SET_FAVORITE_BOOKS:
      action.payload.forEach((book) => {
        new_fav_books[book.id] = book;
      });
      new_books = { ...books };
      new_books.favorite_books = new_fav_books;
      return new_books;
    case ADD_FAVORITE_BOOK:
      new_books = { ...books, favorite_books: { ...books.favorite_books } };
      new_books.favorite_books[action.payload.id] = action.payload;
      return new_books;
    case DELETE_FAVORITE_BOOK:
      new_books = {
        ...books,
        favorite_books: { ...books.favorite_books },
      };
      delete new_books.favorite_books[action.payload];
      return new_books;
    case SET_BOOK_DETAILS:
      new_books = { ...books };
      new_books.book_details = {};
      new_books.book_details = {...action.payload};
      return new_books;
    case RESET_BOOK_DETAILS:
      new_books = { ...books, book_details: {} };
      return new_books;
    default:
      return books;
  }
}

export default booksReducer;
