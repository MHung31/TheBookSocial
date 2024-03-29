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
const RESET_CLUB_USERS = "clubs/reset-users";
const RESET_CLUB_BOOKS = "clubs/reset-books";

const updateClub = (clubInfo) => ({
  type: EDIT_CLUB,
  payload: clubInfo,
});

export const thunkUpdateClub = (clubInfo, clubId) => async (dispatch) => {
  const response = await fetch(`/api/clubs/${clubId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clubInfo),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }

    dispatch(thunkSessionClubs());
    return data;
  }
};

const deleteClubMember = (memberId) => ({
  type: DELETE_CLUB_MEMBER,
  payload: memberId,
});

export const thunkDeleteClubMember = (memberId, clubId) => async (dispatch) => {
  const response = await fetch(`/api/clubs/${clubId}/members/${memberId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(deleteClubMember(memberId));
    dispatch(thunkSessionClubs());

    return data;
  }
};

const addClubMember = (memberInfo) => ({
  type: ADD_CLUB_MEMBER,
  payload: memberInfo,
});

export const thunkAddClubMember = (memberId, clubId) => async (dispatch) => {
  const response = await fetch(`/api/clubs/${clubId}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(memberId),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(addClubMember(data));
    return data;
  }
};

const getClubMembers = (members) => ({
  type: GET_CLUB_MEMBERS,
  payload: members,
});

export const thunkResetClubsUsers = () => ({
  type: RESET_CLUB_USERS,
  payload: null,
});

export const thunkResetClubsBooks = () => ({
  type: RESET_CLUB_BOOKS,
  payload: null,
});

export const thunkGetClubMembers = (clubId) => async (dispatch) => {
  const response = await fetch(`/api/clubs/${clubId}/members`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getClubMembers(data.members));
  }
};

const deleteClub = (clubId) => ({
  type: DELETE_CLUB,
  payload: clubId,
});

export const thunkDeleteClub = (clubId) => async (dispatch) => {
  const response = await fetch(`/api/clubs/${clubId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(deleteClub(clubId));
  }
};

const removeClubBooks = (book) => ({
  type: DELETE_CLUB_BOOK,
  payload: book,
});

const getClubBooks = (books) => ({
  type: GET_CLUB_BOOKS,
  payload: books,
});

export const thunkDeleteClubBook = (bookId, clubId) => async (dispatch) => {
  const response = await fetch(`/api/clubs/${clubId}/books/${bookId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(removeClubBooks(bookId));
  }
};

export const thunkGetClubBooks = (clubId) => async (dispatch) => {
  const response = await fetch(`/api/clubs/${clubId}/books`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getClubBooks(data.books));
  }
};

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
      return data.errors;
    }
    dispatch(createClub(data));
    return data;
  }
};

const initialState = {
  clubs: {},
  club_books: {},
  club_members: {},
};

function clubsReducer(clubStore = initialState, action) {
  let new_clubs = {};
  switch (action.type) {
    case GET_CLUBS:
      new_clubs = { ...clubStore, clubs: {} };
      action.payload.forEach((club) => {
        new_clubs.clubs[club.id] = club;
      });
      return new_clubs;
    case CREATE_CLUB:
      new_clubs = { ...clubStore, clubs: { ...clubStore.clubs } };
      new_clubs.clubs[action.payload.id] = action.payload;
      return new_clubs;
    case ADD_CLUB_BOOK:
      new_clubs = { ...clubStore, club_books: { ...clubStore.club_books } };
      new_clubs.club_books[action.payload.id] = action.payload;
      return new_clubs;
    case GET_CLUB_BOOKS:
      new_clubs = { ...clubStore, club_books: {} };
      action.payload.forEach((book) => {
        new_clubs.club_books[book.id] = book;
      });
      return new_clubs;
    case DELETE_CLUB_BOOK:
      new_clubs = { ...clubStore, club_books: { ...clubStore.club_books } };
      delete new_clubs.club_books[action.payload];
      return new_clubs;
    case DELETE_CLUB:
      new_clubs = { ...clubStore, clubs: { ...clubStore.clubs } };
      delete new_clubs.clubs[action.payload];
      return new_clubs;
    case GET_CLUB_MEMBERS:
      new_clubs = { ...clubStore, club_members: {} };
      action.payload.forEach((member) => {
        new_clubs.club_members[member.id] = member;
      });
      return new_clubs;
    case RESET_CLUB_USERS:
      new_clubs = { ...clubStore, club_members: {} };
      return new_clubs;
    case RESET_CLUB_BOOKS:
      new_clubs = { ...clubStore, club_books: {} };
      return new_clubs;
    case ADD_CLUB_MEMBER:
      new_clubs = { ...clubStore, club_members: { ...clubStore.club_members } };
      new_clubs.club_members[action.payload.id] = action.payload;
      return new_clubs;
    case DELETE_CLUB_MEMBER:
      new_clubs = {
        ...clubStore,
        club_members: { ...clubStore.club_members },
      };
      delete new_clubs.club_members[action.payload];
      return new_clubs;
    default:
      return clubStore;
  }
}

export default clubsReducer;
