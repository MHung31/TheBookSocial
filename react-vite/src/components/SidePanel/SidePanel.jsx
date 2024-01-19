import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import "./SidePanel.css";
import SideItem from "./SideItem";
// import { publicBoardsThunk, myBoardsThunk } from "../../redux/board";
import { thunkSessionClubs, thunkCreateClub } from "../../redux/clubs";

function SidePanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const clubs = useSelector((state) => state.clubs);
  const [createBoardMenu, setCreateBoardMenu] = useState(false);
  const [title, setTitle] = useState("");
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

  const createClubToggle = () => {
    setCreateBoardMenu(!createBoardMenu);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(thunkCreateClub({ title: title, is_public: false }));
    setCreateBoardMenu(!createBoardMenu);
  };

  return (
    <div className="side-panel-component">
      <ul>
        <h4>
          <i class="fa-solid fa-book-open"></i> <span>Titles</span>
        </h4>
        <NavLink to={`/all`}>All Titles</NavLink>
        <NavLink to={`/favorites`}>Favorites</NavLink>
        <h4>
          <i class="fa-solid fa-users-rectangle"></i>
          <span>Clubs</span>
        </h4>
        {Object.values(clubs).map((club) => (
          <SideItem club={club} />
        ))}
        <div className="create-club" onClick={createClubToggle}>
          Create Club
        </div>
        {createBoardMenu ? (
          <div className="create-club-form">
            <form onSubmit={handleSubmit}>
              <label>Enter Club Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxlength="20"
                minlength="3"
                style={{width:"110px"}}
              />
              <button type="submit" className="club-submit">
                <i class="fa-solid fa-check"></i>
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}
        <div className="panel-footer">{' '}</div>
      </ul>
    </div>
  );
}

export default SidePanel;
