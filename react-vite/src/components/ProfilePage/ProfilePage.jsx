import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfilePage.css";
import { thunkGetProfile, thunkResetProfile } from "../../redux/profile";
import { BarChart } from "./BarChart";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profile);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [friendsToggle, setFriendsToggle] = useState(true);

  const { user, following, followers, reactions } = profile;

  useEffect(() => {
    dispatch(thunkGetProfile(userId));

    return () => dispatch(thunkResetProfile());
  }, [dispatch, userId]);

  const profileClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  useEffect(() => {
    if (Object.values(profile).length) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setAvatar(user.avatar);
    }
  }, [profile]);

  if (!Object.values(profile.user).length) return <div></div>;

  return (
    <div className="profile-page">
      <div className="profile-user-info">
        {user.avatar !== "none" ? (
          <img className="profile-avatar" src={user.avatar} />
        ) : (
          <div className="profile-default">
            {user.first_name[0] + user.last_name[0]}
          </div>
        )}
        <div className="profile-text">
          <div>
            Username: <span>{user.username}</span>
          </div>

          <div>
            Email: <span>{user.email}</span>{" "}
          </div>
          <label>
            First Name:
            <input
              id="signup-first-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              id="signup-first-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
        <button>Add Friend</button>
      </div>
      <div className="profile-bottom">
        <div className="profile-reactions">
          <BarChart reactions={reactions} />
        </div>
        <div className="profile-friends">
          <div>
            <button className={`friends-${friendsToggle}`} onClick={() => setFriendsToggle(true)}>Following</button>
            <button className={`friends-${friendsToggle}`}onClick={() => setFriendsToggle(false)}>Followers</button>
            {friendsToggle ? (
              <>
                {Object.values(following).map((user) => {
                  return (
                    <>
                      <div
                        onClick={() => profileClick(user.id)}
                        className="user-search-results"
                      >
                        {user.avatar !== "none" ? (
                          <img className="search-avatar" src={user.avatar} />
                        ) : (
                          <div className="profile-no-avatar">
                            {user.first_name[0] + user.last_name[0]}
                          </div>
                        )}

                        <div>{user.username}</div>
                      </div>
                    </>
                  );
                })}{" "}
              </>
            ) : (
              <>
                {Object.values(followers).map((user) => {
                  return (
                    <>
                      <div
                        onClick={() => profileClick(user.id)}
                        className="user-search-results"
                      >
                        {user.avatar !== "none" ? (
                          <img className="search-avatar" src={user.avatar} />
                        ) : (
                          <div className="profile-no-avatar">
                            {user.first_name[0] + user.last_name[0]}
                          </div>
                        )}

                        <div>{user.username}</div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
