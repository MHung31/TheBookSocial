import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import "./SidePanel.css";
import SideItem from "./SideItem";
// import { publicBoardsThunk, myBoardsThunk } from "../../redux/board";
import { thunkSessionClubs } from "../../redux/clubs";

function SidePanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const clubs = useSelector((state) => state.clubs);
  //   const myBoards = useSelector((state) => state.boards.myBoards);
  //   const publicBoards = useSelector((state) => state.boards.publicBoards);
  //   const [ownedBoards, setOwnedBoards] = useState({});
  //   const [sharedBoards, setSharedBoards] = useState({});
  //   const [ownedBoardsMenu, setOwnedBoardsMenu] = useState(true);
  //   const [sharedBoardsMenu, setSharedBoardsMenu] = useState(false);

  if (!sessionUser) {
    navigate("/");
  }

  useEffect(() => {
    dispatch(thunkSessionClubs());
  }, [dispatch]);

  const createClub = () => {

  }
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
  //   }, [myBoards, publicBoards, id, boards]);

  return (
    <div className="side-panel-component">
      <ul>
        <h4>
          <i class="fa-solid fa-book-open"></i> <span>Titles</span>
        </h4>
        <NavLink to={`/session`}>All Titles</NavLink>
        <NavLink to={`/session/favorites`}>Favorites</NavLink>
        <h4>
          <i class="fa-solid fa-users-rectangle"></i>
          <span>Clubs</span>
        </h4>
        {Object.values(clubs).map((club) => (
          <SideItem club={club} />
        ))}
        <div className="create-club" onClick={createClub}>Create Club</div>
      </ul>
    </div>
  );
}

export default SidePanel;
