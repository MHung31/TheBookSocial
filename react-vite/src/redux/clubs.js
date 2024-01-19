const GET_CLUBS = "clubs/session";
const CREATE_CLUB = "clubs/create";
const EDIT_CLUB = "clubs/edit";
const DELETE_CLUB = "clubs/delete";

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
