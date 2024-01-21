import "./ClubOptionsModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import {
  thunkDeleteClub,
  thunkGetClubMembers,
  thunkResetClubsUsers,
} from "../../redux/clubs";
import DeleteConfirmModal from "../DeleteConfirmModal";
import ClubMemberTile from "./ClubMemberTile";
import { thunkGetAllUsers } from "../../redux/session";
import AddUserSearchResults from "./AddUserSearchResults";

function ClubOptions({ clubId }) {
  const { setModalContent, closeModal } = useModal();
  const dispatch = useDispatch();
  const { id, title, user_id } = useSelector(
    (state) => state.clubs.clubs[clubId]
  );
  const [searchMember, setSearchMember] = useState("");

  const members = useSelector((state) => state.clubs.club_members);
  const sessionUser = useSelector((state) => state.session.user);
  const isOwner = sessionUser.id === user_id;
  const allUsers = useSelector((state) => state.session.all_users);
  let filteredUsers = [];

  if (searchMember.length > 0) {
    filteredUsers = Object.values(allUsers).filter((user) =>
      user.username.toLowerCase().includes(searchMember.toLowerCase())
    );
  }

  const deleteClub = () => {
    setModalContent(
      <DeleteConfirmModal
        thunk={thunkDeleteClub(clubId)}
        message="Permanently delete this club?"
        clubId={clubId}
      />
    );
  };

  useEffect(() => {
    dispatch(thunkGetClubMembers(clubId));
    dispatch(thunkGetAllUsers());
    return () => dispatch(thunkResetClubsUsers());
  }, [dispatch]);

  return (
    <div className="club-modal-options">
      <h2>{title}</h2>
      <div className="club-options-members">
        <h3>Club Members</h3>
        {isOwner ? (
          <div className="club-add-member">
            <h4>Add Member</h4>
            &#x1F50E;&#xFE0E;
            <input
              type="text"
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              required
            />
            {searchMember ? (
              <div className="searched-members">
                {Object.values(filteredUsers).map((user) => (
                  <AddUserSearchResults user={user} />
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="club-current-members">
          {Object.values(members).map((member) => (
            <ClubMemberTile member={member} clubOwner={user_id} />
          ))}
        </div>
      </div>
      <div className="club-options-delete">
        {!isOwner ? (
          <button className="club-options-button delete-yes">Leave Club</button>
        ) : (
          <></>
        )}
        {isOwner ? (
          <button
            className="club-options-button delete-yes"
            onClick={deleteClub}
          >
            Delete Club
          </button>
        ) : (
          <></>
        )}
        <button className="club-options-button delete-no" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ClubOptions;
