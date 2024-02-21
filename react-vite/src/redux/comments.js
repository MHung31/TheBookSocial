const GET_COMMENTS = "comments/session";
const CREATE_COMMENT = "comments/create";
const EDIT_COMMENT = "comments/edit";
const DELETE_COMMENT = "comments/delete";
const RESET_COMMENTS = "comments/reset";
const DEFINITION = "comments/definition";

const addDefinition = (definition) => ({
  type: DEFINITION,
  payload: definition,
});

export const thunkAddDefinition = (word) => async (dispatch) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    // dispatch(addDefinition(data));
    const { word, phonetic, meanings } = data[0];
    const definitions = meanings.map((meaning) => {
      return {
        partOfSpeech: meaning.partOfSpeech,
        definition: meaning.definitions[0].definition,
      };
    });
    dispatch(addDefinition({ word, phonetic, definitions }));
  }
};

const resetComments = () => ({
  type: RESET_COMMENTS,
  payload: null,
});

export const thunkResetComments = () => async (dispatch) => {
  dispatch(resetComments());
};
const editComment = (commentObj) => ({
  type: EDIT_COMMENT,
  payload: commentObj,
});

export const thunkEditComment = (commentObj, commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentObj),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }

    dispatch(editComment(data));
    return data;
  }
};

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

export const thunkDeleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(deleteComment(commentId));
  }
};

const createComment = (newComment) => ({
  type: CREATE_COMMENT,
  payload: newComment,
});

export const thunkCreateComment = (commentObj, bookId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentObj),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(createComment(data));
    return data;
  }
};

const getComments = (bookComments) => ({
  type: GET_COMMENTS,
  payload: bookComments,
});

export const getBookComments = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}/comments`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getComments(data.comments));
  }
};

const initialState = {};
function commentsReducer(commentStore = initialState, action) {
  let new_comments = {};
  switch (action.type) {
    case GET_COMMENTS:
      action.payload.forEach((comment) => {
        new_comments[comment.id] = comment;
      });
      return new_comments;
    case CREATE_COMMENT:
      new_comments = { ...commentStore };
      new_comments[action.payload.id] = action.payload;
      return new_comments;
    case DELETE_COMMENT:
      new_comments = { ...commentStore };
      delete new_comments[action.payload];
      return new_comments;
    case EDIT_COMMENT:
      new_comments = { ...commentStore };
      new_comments[action.payload.id] = action.payload;
      return new_comments;
    case RESET_COMMENTS:
      return {};
    case DEFINITION:
      return { ...commentStore, definition: action.payload };
    default:
      return commentStore;
  }
}

export default commentsReducer;
