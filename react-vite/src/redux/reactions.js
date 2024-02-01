const GET_REACTIONS = "reactions/get";
const ADD_REACTION = "reactions/add";
const DELETE_REACTION = "reactions/delete";
const RESET_REACTIONS = "reactions/reset";

const deleteReaction = (payload) => ({
  type: DELETE_REACTION,
  payload: payload,
});

export const thunkDeleteReaction =
  (commentId, reactionId) => async (dispatch) => {
    const response = await fetch(`/api/reactions/${reactionId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }

      dispatch(deleteReaction({ commentId, reactionId }));
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

// export const thunkGetReactions = (commentId) => async (dispatch) => {
//   const response = await fetch(`/api/comments/${commentId}/reactions`);
//   if (response.ok) {
//     const data = await response.json();
//     if (data.errors) {
//       return;
//     }
//     dispatch(getReactions(data.reactions));
//   }
// };

export const thunkGetReactions = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}/reactions`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getReactions(data.reactions));
  }
};

const addReaction = (payload) => ({
  type: ADD_REACTION,
  payload: payload,
});

export const thunkAddReaction =
  (commentId, reactionInfo) => async (dispatch) => {
    let payload = {};
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
      payload.reaction = data;
      payload.commentId = commentId;
      dispatch(addReaction(payload));
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
        if (new_reactions[reaction.comment_id]) {
          new_reactions[reaction.comment_id].push(reaction);
        } else new_reactions[reaction.comment_id] = [reaction];
      });
      return new_reactions;
    case ADD_REACTION:
      new_reactions = { ...reactionStore };
      if (new_reactions[action.payload.commentId]) {
        new_reactions[action.payload.commentId] = [
          ...reactionStore[action.payload.commentId],
        ];
        new_reactions[action.payload.commentId].push(action.payload.reaction);
      } else
        new_reactions[action.payload.commentId] = [action.payload.reaction];
      return new_reactions;
    case DELETE_REACTION:
      new_reactions = { ...reactionStore };
      new_reactions[action.payload.commentId] = [
        ...reactionStore[action.payload.commentId].filter(
          (reaction) => reaction.id !== action.payload.reactionId
        ),
      ];

      return new_reactions;
    default:
      return reactionStore;
  }
}

export default reactionsReducer;
