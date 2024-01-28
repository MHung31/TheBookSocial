import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import { thunkSetAllBooks, thunkSetFavoriteBooks } from "../../redux/books";
import BookPreviewCard from "./BookPreviewCard";
import SidePanel from "../SidePanel";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import AddBookModal from "./AddBookModal";
import { thunkGetClubBooks, thunkResetClubsBooks } from "../../redux/clubs";

function LandingPage() {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const location = useLocation();
  const { setModalContent } = useModal();
  const { pathname } = location;
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.clubs.clubs);
  const sessionUser = useSelector((state) => state.session.user);
  let isClub = false;
  let ownsClub = false;

  let books = {};

  if (pathname === "/all") {
    books = useSelector((state) => state.books.all_books);
  }

  if (pathname === "/favorites") {
    books = useSelector((state) => state.books.favorite_books);
  }

  if (pathname.startsWith("/clubs/")) {
    if (!clubs[clubId]) {
      navigate("/");
    }
    books = useSelector((state) => state.clubs.club_books);
    isClub = true;
    ownsClub = clubs[clubId]?.user_id === sessionUser?.id;
  }

  const addBook = () => {
    setModalContent(<AddBookModal />);
  };

  useEffect(() => {
    if (!sessionUser) {
      navigate("/");
    } else {
      dispatch(thunkSetAllBooks());
      dispatch(thunkSetFavoriteBooks());

      if (pathname.startsWith("/clubs/")) {
        dispatch(thunkGetClubBooks(clubId));
        return () => dispatch(thunkResetClubsBooks());
      }
    }
  }, [dispatch, pathname]);

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
          {isClub && ownsClub ? (
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
