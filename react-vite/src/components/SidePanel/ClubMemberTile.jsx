import "./ClubOptionsModal.css";
import "./AddUserSearchResults.css";
import { useSelector } from "react-redux";

function ClubMemberTile({ member, clubOwner }) {
  const user = useSelector((state) => state.session.user);
  const isOwner = clubOwner === member.id;
  const isGuest = user.id !== clubOwner;

  return (
    <div className="club-member-tile">
      <div className="club-member-info">
        {isOwner ? (
          <div className="crown">
            <i class="fa-solid fa-crown" style={{ color: "gold" }}></i>
          </div>
        ) : (
          <span className="tile-placeholder">{' '}</span>
        )}
        <img className="search-avatar" src={member.avatar} />

        {member.username}
      </div>
      {isOwner || isGuest ? (
        <></>
      ) : (
        <div className="remove-member">
          <i class="fa-solid fa-xmark"></i>
        </div>
      )}
    </div>
  );
}

export default ClubMemberTile;
