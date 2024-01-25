const GET_REACTIONS = "reactions/get";
const ADD_REACTION = "reactions/add";
const DELETE_REACTION = "reactions/delete";
const RESET_REACTIONS = "reactions/reset";

const deleteReaction = (reactionId) => ({
  type: DELETE_REACTION,
  payload: reactionId,
});

export const thunkDeleteReaction = (reactionId) => async (dispatch) => {
  const response = await fetch(`/api/reactions/${reactionId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(deleteReaction(reactionId));
  }
};

const resetReactions = () => ({
  type: RESET_REACTIONS,
  payload: null,
});

export const thunkResetReactions = () => async (dispatch) => {
  dispatch(resetReactions());
};

const getReactions = (reactions) => ({
  type: GET_REACTIONS,
  payload: reactions,
});

export const thunkGetReactions = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}/reactions`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getReactions(data.reactions));
  }
};

const addReaction = (reaction) => ({
  type: ADD_REACTION,
  payload: reaction,
});

export const thunkAddReaction =
  (commentId, reactionInfo) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reactionInfo),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }
      dispatch(addReaction(data));
      return data;
    }
  };

const initialState = {};

function reactionsReducer(reactionStore = initialState, action) {
  let new_reactions = {};
  switch (action.type) {
    case RESET_REACTIONS:
      return {};
    case GET_REACTIONS:
      action.payload.forEach((reaction) => {
        new_reactions[reaction.id] = reaction;
      });
      return new_reactions;
    case ADD_REACTION:
      new_reactions = { ...reactionStore };
      new_reactions[action.payload.id] = action.payload;
      return new_reactions;
    case DELETE_REACTION:
      new_reactions = { ...reactionStore };
      delete new_reactions[action.payload];
      return new_reactions;
    default:
      return reactionStore;
  }
}

export default reactionsReducer;
