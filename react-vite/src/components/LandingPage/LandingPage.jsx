import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import { thunkSetAllBooks, thunkSetFavoriteBooks } from "../../redux/books";
import BookPreviewCard from "./BookPreviewCard";
import SidePanel from "../SidePanel";
import { useLocation } from "react-router-dom";

function LandingPage() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();


  let books = {};
  if (pathname === "/all") {
    books = useSelector((state) => state.books.all_books);
  }

  if (pathname === "/favorites") {
    books = useSelector((state) => state.books.favorite_books);
  }

  if (pathname.startsWith("/clubs/")) {
    const clubId = pathname.split("/")[2];
    // books = useSelector((state) => state.books.club[clubId]);
    books = useSelector((state) => state.books.all_books);

  }
  const bookState = useSelector((state) => state.books);
  const sessionUser = useSelector((state) => state.session.user);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(thunkSetFavoriteBooks());
    dispatch(thunkSetAllBooks());
  }, [dispatch, pathname]);

  // useEffect(() => {
  //   let tempOwnedBoards = {};
  //   let tempSharedBoards = {};
  //   for (let key in myBoards) {
  //     if (sessionUser.id === myBoards[key].user_id) {
  //       tempOwnedBoards[key] = myBoards[key];
  //     } else {
  //       tempSharedBoards[key] = myBoards[key];
  //     }
  //   }
  //   setOwnedBoards(tempOwnedBoards);
  //   setSharedBoards(tempSharedBoards);
  // }, [allBooks]);

  if (!books) return <></>;

  return (

    <div className="Side-Panel">
      <SidePanel />
      <div className="Landing-Page">
        {Object.values(books).map((book) => {
          return <BookPreviewCard book={book} />;
        })}
      </div>
    </div>
  );
}

export default LandingPage;
