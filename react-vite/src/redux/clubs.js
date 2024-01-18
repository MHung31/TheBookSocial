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

const initialState = {
  clubs: {},
};

function clubsReducer(clubs = initialState, action) {
  const new_clubs = {};
  switch (action.type) {
    case GET_CLUBS:
      action.payload.forEach((club) => {
        new_clubs[club.id] = club;
      });
      return new_clubs;
    default:
      return clubs;
  }
}

export default clubsReducer;
