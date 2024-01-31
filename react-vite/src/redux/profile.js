const GET_PROFILE = "profile/get";
const RESET_PROFILE = "profile/reset";
const ADD_FOLLOWERS = "profile/addFollowers";
const REMOVE_FOLLOWERS = "profile/addFollowers";

export const addFollowers = (user) => ({

  type: ADD_FOLLOWERS,
  payload: user,
});

export const removeFollowers = (user) => ({
  type: REMOVE_FOLLOWERS,
  payload: user,
});

export const thunkAddFollowers = (user) => async (dispatch) => {

  dispatch(addFollowers(user));
  return;
};

export const thunkRemoveFollowers = (user) => async (dispatch) => {
  console.log("remove followers");
  dispatch(removeFollowers(user));
  return;
};

const getProfile = (profile) => ({
  type: GET_PROFILE,
  payload: profile,
});

export const thunkGetProfile = (profileId) => async (dispatch) => {
  const profile = {};
  const userResponse = await fetch(`/api/users/${profileId}`);
  if (userResponse.ok) {
    const user = await userResponse.json();
    if (user.errors) {
      return;
    }
    profile["user"] = user;
  }

  const friendsResponse = await fetch(`/api/users/${profileId}/friends`);
  if (friendsResponse.ok) {
    const friends = await friendsResponse.json();
    if (friendsResponse.errors) {
      return;
    }
    profile["followers"] = friends.followers;
    profile["following"] = friends.following;
  }

  const reactionsResponse = await fetch(`/api/users/${profileId}/reactions`);
  if (reactionsResponse.ok) {
    const reactions = await reactionsResponse.json();
    if (reactionsResponse.errors) {
      return;
    }
    profile["reactions"] = reactions.reactions;
  }

  dispatch(getProfile(profile));
};

const resetProfile = () => ({
  type: RESET_PROFILE,
  payload: null,
});

export const thunkResetProfile = () => async (dispatch) => {
  dispatch(resetProfile());
};

const initialState = {
  user: {},
  reactions: {},
  following: {},
  followers: {},
};

function profileReducer(profileStore = initialState, action) {
  let new_profile = {};
  switch (action.type) {
    case REMOVE_FOLLOWERS:
      new_profile = {
        ...profileStore,
        followers: { ...profileStore.followers },
      };
      delete new_profile.followers[action.payload.id];
      return new_profile;
    case ADD_FOLLOWERS:
      console.log("-------new added profile");
      new_profile = {
        ...profileStore,
        followers: { ...profileStore.followers },
      };
      console.log("-------new added profile");
      new_profile.followers[action.payload.id] = action.payload;
      console.log("-------new added profile");
      return new_profile;
    case GET_PROFILE:
      new_profile = { ...profileStore };
      new_profile.user = action.payload.user;
      action.payload.following.forEach((user) => {
        new_profile.following[user.id] = user;
      });
      action.payload.followers.forEach((user) => {
        new_profile.followers[user.id] = user;
      });
      new_profile.reactions = action.payload.reactions;
      return new_profile;
    case RESET_PROFILE:
      return {
        user: {},
        reactions: {},
        following: {},
        followers: {},
      };
    default:
      return profileStore;
  }
}

export default profileReducer;
