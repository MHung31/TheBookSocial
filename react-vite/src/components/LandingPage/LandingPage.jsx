import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
// import { publicBoardsThunk, myBoardsThunk } from "../../redux/board";
import BookPreviewCard from "./BookPreviewCard";
import SidePanel from "../SidePanel";

function LandingPage() {
  const dispatch = useDispatch();
//   const publicBoards = useSelector((state) => state.boards.publicBoards);
//   const boards = useSelector((state) => state.boards);
//   const myBoards = useSelector((state) => state.boards.myBoards);
  const sessionUser = useSelector((state) => state.session.user);
//   const [ownedBoards, setOwnedBoards] = useState({});
//   const [sharedBoards, setSharedBoards] = useState({});
//   const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    // dispatch(publicBoardsThunk());
    // dispatch(myBoardsThunk());
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
//   }, [myBoards, boards]);


  return (
    <div className="Side-Panel">
      <SidePanel />
      <div className="Landing-Page">
        <h4>All Books</h4>
        <div className="landing-page-all">
          {/* {Object.values(allBooks).map((book) => {
            return <BookPreviewCard book={book} />;
          })} */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
