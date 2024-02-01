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
  const commentReactions = useSelector((state) => state.reactions);
  const sessionUser = useSelector((state) => state.session.user);
  const [seeOriginal, setSeeOriginal] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [currCommentKey, setCurrCommentKey] = useState("");

  useEffect(() => {
    dispatch(thunkGetBookDetails(bookId));
    dispatch(getBookComments(bookId));
    return () => {
      dispatch(thunkResetBookDetails());
      dispatch(thunkResetComments());
    };
  }, [dispatch]);

  useEffect(() => {
    if (Object.values(book).length && !commentList[currCommentKey]?.length)
      setShowComment(false);
  }, [bookComments]);

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
      } else if (commentList[commentKey][0].user.id === sessionUser.id) {
        commentClass += " user-comment";
      }

      // let commentInsert = <span className={commentClass}>{text}</span>;

      let postContent = book.content.slice(position[1], currPosition);
      currPosition = position[0];
      return (
        <>
          <span
            className={commentClass}
            title="Click to see comment"
            ref={ulRef}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              commentMenu(e, commentKey);
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
    if (startOffset - endOffset)
      setModalContent(
        <CreateCommentModal
          position={`${startOffset}:${endOffset}`}
          bookId={bookId}
        />
      );
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
          {commentList[currCommentKey]?.map((comment) => (
            <CommentView commentInfo={comment} />
          ))}
          <div
            className="close-comment"
            onClick={() => {
              setShowComment(false);
              dispatch(thunkResetReactions());
            }}
          >
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookPage;
