import "./ClubOptionsModal.css";
import "./AddUserSearchResults.css";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeleteClubMember } from "../../redux/clubs";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

function ClubMemberTile({ member, clubOwner, clubId }) {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const isOwner = clubOwner === member.id;
  const isGuest = user.id !== clubOwner;

  const deleteMember = (e) => {
    e.stopPropagation();
    dispatch(thunkDeleteClubMember(member.id, clubId));
  };
  return (
    <div
      className="club-member-tile"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/users/${member.id}`);
        closeModal();
      }}
    >
      <div className="club-member-info">
        {isOwner ? (
          <div className="crown">
            <i class="fa-solid fa-crown" style={{ color: "gold" }}></i>
          </div>
        ) : (
          <span className="tile-placeholder"> </span>
        )}
        {member.avatar !== "none" ? (
          <img className="search-avatar" src={member.avatar} />
        ) : (
          <div className="profile-no-avatar">
            {member.first_name[0] + member.last_name[0]}
          </div>
        )}

        {member.username}
      </div>
      {isOwner || isGuest ? (
        <></>
      ) : (
        <div onClick={deleteMember} className="remove-member">
          <i class="fa-solid fa-xmark"></i>
        </div>
      )}
    </div>
  );
}

export default ClubMemberTile;
