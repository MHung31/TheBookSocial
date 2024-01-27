const GET_COMMENTS = "comments/session";
const CREATE_COMMENT = "comments/create";
const EDIT_COMMENT = "comments/edit";
const DELETE_COMMENT = "comments/delete";

const createComment = (newComment) => ({
  type: CREATE_COMMENT,
  payload: newComment,
});
const getComments = (bookComments) => ({
  type: GET_COMMENTS,
  payload: bookComments,
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
    default:
      return commentStore;
  }
}

export default commentsReducer;
