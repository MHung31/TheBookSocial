const GET_PROFILE = "profile/get";
const RESET_PROFILE = "profile/reset";

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

  const friendsResponse = await fetch(`/api/session/friends`);
  if (friendsResponse.ok) {
    const friends = await friendsResponse.json();
    if (friendsResponse.errors) {
      return;
    }
    profile["followers"] = friends.followers;
    profile["following"] = friends.following;
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
    case GET_PROFILE:
      new_profile = { ...profileStore };
      new_profile.user = action.payload.user;
      action.payload.following.forEach((user) => {
        new_profile.following[user.id] = user;
      });
      action.payload.followers.forEach((user) => {
        new_profile.followers[user.id] = user;
      });
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
