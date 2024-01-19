const GET_CLUBS = "clubs/session";
const CREATE_CLUB = "clubs/create";
const EDIT_CLUB = "clubs/edit";
const DELETE_CLUB = "clubs/delete";
const GET_CLUB_BOOKS = "clubs/books";
const ADD_CLUB_BOOK = "clubs/add-book";
const DELETE_CLUB_BOOK = "clubs/delete-book";
const GET_CLUB_MEMBERS = "clubs/members";
const ADD_CLUB_MEMBER = "clubs/add-member";
const DELETE_CLUB_MEMBER = "clubs/delete-member";

//working on adding books to clubs
//just finished add club book thunk, need to add to reducer
//next verify with get_club books works on the club pages
//then verify adding books works
//then work on deleting books from clubs
//then club members
//then edit club options modal finish

const addClubBook = (book) => ({
  type: ADD_CLUB_BOOK,
  payload: book,
});

export const thunkAddClubBook = (bookId, clubId) => async (dispatch) => {
  const response = await fetch(`/api/clubs/${clubId}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookId),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(addClubBook(data));
  }
};

const getSessionClubs = (sessionClubs) => ({
  type: GET_CLUBS,
  payload: sessionClubs,
});

export const thunkSessionClubs = () => async (dispatch) => {
  const response = await fetch("/api/session/clubs");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getSessionClubs(data.clubs));
  }
};

const createClub = (clubInfo) => ({
  type: CREATE_CLUB,
  payload: clubInfo,
});

export const thunkCreateClub = (clubInfo) => async (dispatch) => {
  const response = await fetch("/api/session/clubs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clubInfo),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(createClub(data));
  }
};

const initialState = {
  clubs: {},
};

function clubsReducer(clubs = initialState, action) {
  let new_clubs = {};
  switch (action.type) {
    case GET_CLUBS:
      action.payload.forEach((club) => {
        new_clubs[club.id] = club;
      });
      return new_clubs;
    case CREATE_CLUB:
      new_clubs = { ...clubs };
      new_clubs[action.payload.id] = action.payload;
      return new_clubs;
    default:
      return clubs;
  }
}

export default clubsReducer;
