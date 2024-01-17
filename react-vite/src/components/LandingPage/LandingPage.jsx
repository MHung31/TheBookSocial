import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import { thunkSetAllBooks } from "../../redux/books";
import BookPreviewCard from "./BookPreviewCard";
import SidePanel from "../SidePanel";

function LandingPage() {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books.all_books);
  const sessionUser = useSelector((state) => state.session.user);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(thunkSetAllBooks());
  }, [dispatch]);

  //   useEffect(() => {
  //     let tempOwnedBoards = {};
  //     let tempSharedBoards = {};
  //     for (let key in myBoards) {
  //       if (sessionUser.id === myBoards[key].user_id) {
  //         tempOwnedBoards[key] = myBoards[key];
  //       } else {
  //         tempSharedBoards[key] = myBoards[key];
  //       }
  //     }
  //     setOwnedBoards(tempOwnedBoards);
  //     setSharedBoards(tempSharedBoards);
  //   }, [allBooks);

  if (!allBooks) return <></>

  return (
    <div className="Side-Panel">
      <SidePanel />
      <div className="Landing-Page">
          {Object.values(allBooks).map((book) => {
            return <BookPreviewCard book={book} />;
          })}
      </div>
    </div>
  );
}

export default LandingPage;
