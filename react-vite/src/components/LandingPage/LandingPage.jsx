import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import { thunkSetAllBooks, thunkSetFavoriteBooks } from "../../redux/books";
import BookPreviewCard from "./BookPreviewCard";
import SidePanel from "../SidePanel";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useModal } from "../../context/Modal";
import AddBookModal from "./AddBookModal";
import { thunkGetClubBooks } from "../../redux/clubs";

function LandingPage() {
  const { clubId } = useParams();
  const location = useLocation();
  const { setModalContent } = useModal();
  const { pathname } = location;
  const dispatch = useDispatch();
  let isClub = false;

  let books = {};
  if (pathname === "/all") {
    books = useSelector((state) => state.books.all_books);
  }

  if (pathname === "/favorites") {
    books = useSelector((state) => state.books.favorite_books);
  }

  if (pathname.startsWith("/clubs/")) {
    books = useSelector((state) => state.clubs.club_books);
    isClub = true;
  }

  const addBook = () => {
    setModalContent(<AddBookModal />);
  };

  useEffect(() => {
    dispatch(thunkSetFavoriteBooks());
    dispatch(thunkSetAllBooks());
    if (pathname.startsWith("/clubs/")) {
      dispatch(thunkGetClubBooks(clubId));
    }
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

  if (!books)
    return (
      <>
        <SidePanel />
      </>
    );

  return (
    <div className="Side-Panel">
      <SidePanel />
      <div className="Landing-Page">
        {Object.values(books).map((book) => {
          return <BookPreviewCard book={book} />;
        })}
        <>
          {isClub ? (
            <div onClick={addBook} className="add-book">
              <i class="fa-solid fa-book"></i>
              <div>Add book</div>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
    </div>
  );
}

export default LandingPage;
