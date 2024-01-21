import "./AddUserSearchResults.css";
import { thunkAddClubMember } from "../../redux/clubs";
import { useSelector, useDispatch } from "react-redux";

function AddUserSearchResults({ user, clubId }) {
  const dispatch = useDispatch();
  const addUser = () => {
    const memberId = { user_id: user.id };
    dispatch(thunkAddClubMember(memberId, clubId));

  };
  return (
    <div onClick={addUser} className="user-search-results">
      <img className="search-avatar" src={user.avatar} />
      <div>{user.username}</div>
    </div>
  );
}

export default AddUserSearchResults;
