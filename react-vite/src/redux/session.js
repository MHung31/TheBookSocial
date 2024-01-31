// import { addFollowers, removeFollowers } from "./profile";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const GET_ALL_USERS = "session/allUsers";
const GET_USER_FOLLOWING = "session/following";
const ADD_FRIEND = "session/addFriend";
const REMOVE_FRIEND = "session/removeFriend";

const addFriend = (friend) => ({
  type: ADD_FRIEND,
  payload: friend,
});

const removeFriend = (id) => ({
  type: REMOVE_FRIEND,
  payload: id,
});

export const thunkRemoveFriend = (userId, sessionUser) => async (dispatch) => {
  const response = await fetch(`/api/session/friends/${userId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(removeFriend(userId));
    // dispatch(removeFollowers(sessionUser));
  }
};

export const thunkAddFriend = (userId, sessionUser) => async (dispatch) => {
  const response = await fetch(`/api/session/friends`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userId),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(addFriend(data));
    // dispatch(addFollowers(sessionUser));
    return data;
  }
};

const getFollowing = (following) => ({
  type: GET_USER_FOLLOWING,
  payload: following,
});

export const thunkGetFollowing = (profileId) => async (dispatch) => {
  const friendsResponse = await fetch(`/api/users/${profileId}/friends`);
  if (friendsResponse.ok) {
    const friends = await friendsResponse.json();
    if (friendsResponse.errors) {
      return;
    }
    dispatch(getFollowing(friends.following));
  }
};

const allUsers = (users) => ({
  type: GET_ALL_USERS,
  payload: users,
});

export const thunkGetAllUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(allUsers(data.users));
  }
};

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const thunkAuthenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const thunkLogin = (credentials) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null, all_users: {}, following: {} };

function sessionReducer(state = initialState, action) {
  let new_users = {};
  switch (action.type) {
    case REMOVE_FRIEND:
      new_users = { ...state, following: { ...state.following } };
      delete new_users.following[action.payload];
      return new_users;
    case ADD_FRIEND:
      new_users = { ...state, following: { ...state.following } };
      new_users.following[action.payload.id] = action.payload;
      return new_users;
    case GET_USER_FOLLOWING:
      new_users = { ...state, following: {} };
      action.payload.forEach((user) => {
        new_users.following[user.id] = user;
      });
      return new_users;
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case GET_ALL_USERS:
      new_users = { ...state, all_users: {} };
      action.payload.forEach((user) => {
        new_users.all_users[user.id] = user;
      });
      return new_users;
    default:
      return state;
  }
}

export default sessionReducer;
