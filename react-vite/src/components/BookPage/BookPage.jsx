import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetBookDetails, thunkResetBookDetails } from "../../redux/books";
import "./BookPage.css";
import {
  getBookComments,
  thunkDeleteComment,
  thunkResetComments,
  thunkEditComment,
  thunkAddDefinition,
} from "../../redux/comments";
import ReactionModal from "../ReactionModal";
import { thunkGetReactions, thunkResetReactions } from "../../redux/reactions";
import CreateCommentModal from "../CreateCommentModal";
import DeleteConfirmModal from "../DeleteConfirmModal";
import CommentView from "./CommentView";

function BookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const ulRef = useRef();
  const book = useSelector((state) => state.books.book_details);
  const bookComments = useSelector((state) => state.comments);
  const definition = useSelector((state) => state.comments?.definition);
  const sessionUser = useSelector((state) => state.session.user);
  const [seeOriginal, setSeeOriginal] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [currCommentKey, setCurrCommentKey] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [currMenu, setCurrMenu] = useState("");

  useEffect(() => {
    if (selectedWord) dispatch(thunkAddDefinition(selectedWord));
  }, [selectedWord]);

  useEffect(() => {
    if (
      Object.values(bookComments)?.filter(
        (comment) => comment.book_location === currCommentKey
      ).length
    ) {
      setCurrMenu("view");
    } else setCurrMenu("add");
  }, [bookComments]);

  useEffect(() => {
    dispatch(thunkGetBookDetails(bookId));
    dispatch(getBookComments(bookId));
    dispatch(thunkGetReactions(bookId));
    return () => {
      dispatch(thunkResetBookDetails());
      dispatch(thunkResetComments());
      dispatch(thunkResetReactions());
    };
  }, [dispatch]);

  if (!Object.values(book).length) return <></>;

  const commentList = {};

  if (Object.values(bookComments).length) {
    Object.values(bookComments).forEach((comment) => {
      if (commentList[comment.book_location]) {
        commentList[comment.book_location].push(comment);
      } else {
        commentList[comment.book_location] = [comment];
      }
    });
  }

  const commentMenu = (e, commentKey) => {
    e.preventDefault();
    e.stopPropagation();
    if (showComment && commentKey === currCommentKey) {
      setShowComment(false);
      // dispatch(thunkResetReactions());
      return;
    }
    // dispatch(thunkGetReactions(commentKey));
    setCurrCommentKey(commentKey);
    setShowComment(true);
  };
  let buildBook;
  if (Object.values(commentList).length && Object.values(book).length) {
    let currPosition = book.content.length;
    let sortedCommentKeys = Object.keys(commentList).sort((a, b) => {
      let posA = Number(a.split(":")[0]);
      let posB = Number(b.split(":")[0]);
      if (posA > posB) return -1;
      return b;
    });

    buildBook = sortedCommentKeys.map((commentKey) => {
      const position = commentKey.split(":");
      let text = book.content.slice(Number(position[0]), Number(position[1]));
      let commentClass = "comment";
      if (commentList[commentKey].length > 1) {
        commentClass += " multi-comment";
      } else if (commentList[commentKey][0].user?.id === sessionUser.id) {
        commentClass += " user-comment";
      }

      let postContent = book.content.slice(position[1], currPosition);
      currPosition = position[0];
      return (
        <>
          <span
            className={`${commentClass} comment-${
              currCommentKey === commentKey ? "selected" : "unselected"
            }`}
            title="Click to see comment"
            ref={ulRef}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              commentMenu(e, commentKey);
              setCurrMenu("view");
              setSelectedWord(text);
            }}
          >
            {text}
          </span>
          {postContent}
        </>
      );
    });

    if (currPosition !== 0) {
      let lastPart = <>{book.content.slice(0, currPosition)}</>;
      buildBook.push(lastPart);
    }

    buildBook.reverse();
  } else buildBook = book.content;

  const addComment = () => {
    const selected = document.getSelection();
    const range = selected.getRangeAt(0);
    const { startOffset, endOffset } = range;
    if (range.cloneContents().textContent === " ") return;
    if (startOffset - endOffset) {
      setSelectedWord(range.cloneContents().textContent);
      setCurrMenu("add");
      setCurrCommentKey(`${startOffset}:${endOffset}`);
      setShowComment(true);
    }
  };

  return (
    <div className="book-details">
      {seeOriginal ? (
        <p
          className="book-content book-original"
          onDoubleClick={addComment}
          onMouseMove={() => {
            setSeeOriginal(false);
          }}
        >
          {book.content}
        </p>
      ) : (
        <p className="book-content" onMouseDown={() => setSeeOriginal(true)}>
          {buildBook}
        </p>
      )}
      {showComment && (
        <div className="comment-holder">
          <div className="comment-menu">
            {commentList[currCommentKey] ? (
              <div
                className={`menu-choice new-comment menu-${
                  currMenu === "view" ? "selected" : "not-selected"
                }`}
                onClick={() => setCurrMenu("view")}
              >
                Comments
              </div>
            ) : (
              <></>
            )}
            <div
              className={`menu-choice add-comment menu-${
                currMenu === "add" ? "selected" : "not-selected"
              }`}
              onClick={() => setCurrMenu("add")}
            >
              Add Comment
            </div>
            <div
              className={`menu-choice definition menu-${
                currMenu === "definition" ? "selected" : "not-selected"
              }`}
              onClick={() => setCurrMenu("definition")}
            >
              Definition
            </div>
            <div
              className="menu-choice close-comment"
              onClick={() => {
                setShowComment(false);
                setCurrCommentKey("")
              }}
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          {currMenu === "view" &&
            commentList[currCommentKey]?.map((comment) => (
              <CommentView commentInfo={comment} />
            ))}
          {currMenu === "add" && (
            <>
              <CreateCommentModal position={currCommentKey} bookId={bookId} />
            </>
          )}
          {currMenu === "definition" &&
            (definition !== "none" || !definition ? (
              <div className="definition-content">
                <h3>{definition.word}</h3>
                <div>
                  {definition.definitions?.map((def) => {
                    return (
                      <>
                        <div>{def.partOfSpeech}</div>
                        <div>{def.definition}</div>
                        <br></br>
                      </>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="definition-content">No definition was found</div>
            ))}
        </div>
      )}
    </div>
  );
}

export default BookPage;
