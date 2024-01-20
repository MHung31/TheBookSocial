import "./ClubOptionsModal.css";

function ClubMemberTile({ member, clubOwner }) {
  const isOwner = clubOwner === member.id;
  return (
    <div className="club-member-tile">
      <div className="club-member-info">
        {member.username}{" "}
        <span>
          {isOwner ? (
            <i class="fa-solid fa-crown" style={{ color: "gold" }}></i>
          ) : (
            <></>
          )}
        </span>
      </div>
      {isOwner ? (
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