import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import booksReducer from "./books";
import clubsReducer from "./clubs";
import commentsReducer from "./comments";
import reactionsReducer from "./reactions";
import profileReducer from "./profile";

const rootReducer = combineReducers({
  session: sessionReducer,
  books: booksReducer,
  clubs: clubsReducer,
  comments: commentsReducer,
  reactions: reactionsReducer,
  profile: profileReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
