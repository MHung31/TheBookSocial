import "./ClubOptionsModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import {
  thunkDeleteClub,
  thunkGetClubMembers,
  thunkResetClubsUsers,
  thunkDeleteClubMember,
  thunkUpdateClub,
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
  const [clubTitle, setClubTitle] = useState(title);

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

  const leaveClub = () => {
    setModalContent(
      <DeleteConfirmModal
        thunk={thunkDeleteClubMember(sessionUser.id, clubId)}
        message="Leave this club?"
      />
    );
  };
  const deleteClub = () => {
    setModalContent(
      <DeleteConfirmModal
        thunk={thunkDeleteClub(clubId)}
        message="Permanently delete this club?"
      />
    );
  };

  useEffect(() => {
    dispatch(thunkGetClubMembers(clubId));
    dispatch(thunkGetAllUsers());
    return () => dispatch(thunkResetClubsUsers());
  }, [dispatch]);

  const updateTitle = (e) => {
    e.preventDefault();
    if (clubTitle.length < 1) {
      setClubTitle(title);
    } else {
      const clubInfo = { title: clubTitle, is_public: false };
      dispatch(thunkUpdateClub(clubInfo, clubId));
    }
  };

  return (
    <div className="club-modal-options">
      {isOwner ? (
        <input
          className="live-club-title"
          value={clubTitle}
          onChange={(e) => setClubTitle(e.target.value)}
          onBlur={updateTitle}
          maxlength="20"
          minlength="1"
          required
        />
      ) : (
        <h2>{title}</h2>
      )}
      <div className="club-options-members">
        <h3>Club Members</h3>
        {isOwner ? (
          <div className="club-add-member">
            <h4>Add Member</h4>
            &#x1F50E;&#xFE0E;
            <input
              id="search-member-input"
              type="text"
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              required
            />
            {searchMember ? (
              <div
                className="searched-members"
                onClick={()=>setSearchMember("")}
              >
                {Object.values(filteredUsers).map((user) => (
                  <AddUserSearchResults user={user} clubId={clubId} />
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
          {Object.values(members)
            .sort((a, b) => a.username.toLowerCase() < b.username.toLowerCase())
            .map((member) => (
              <ClubMemberTile
                member={member}
                clubId={clubId}
                clubOwner={user_id}
              />
            ))}
        </div>
      </div>
      <div className="club-options-delete">
        {!isOwner ? (
          <button
            className="club-options-button delete-yes"
            onClick={leaveClub}
          >
            Leave Club
          </button>
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
