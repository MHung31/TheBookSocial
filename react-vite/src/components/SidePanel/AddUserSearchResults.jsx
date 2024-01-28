import "./AddUserSearchResults.css";
import { thunkAddClubMember } from "../../redux/clubs";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
function AddUserSearchResults({ user, clubId }) {
  const dispatch = useDispatch();
  const addUser = () => {
    const memberId = { user_id: user.id };
    dispatch(thunkAddClubMember(memberId, clubId));
  };
  return (
    <div onClick={addUser} className="user-search-results">
      {user.avatar !== "none" ? (
          <img className="search-avatar" src={user.avatar} />
        ) : (
          <div className="profile-no-avatar" >
            {user.first_name[0] + user.last_name[0]}
          </div>
        )}

      <div>{user.username}</div>
    </div>
  );
}

export default AddUserSearchResults;
