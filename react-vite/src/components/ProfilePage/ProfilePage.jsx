import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfilePage.css";
import { thunkGetProfile, thunkResetProfile } from "../../redux/profile";
import { BarChart } from "./BarChart";
import {
  thunkGetFollowing,
  thunkAddFriend,
  thunkRemoveFriend,
} from "../../redux/session";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profile);
  const session = useSelector((state) => state.session);
  const sessionFollowing = useSelector((state) => state.session.following);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [friendsToggle, setFriendsToggle] = useState(true);
  const [friends, setFriends] = useState(false);

  const { user, following, followers, reactions } = profile;

  useEffect(() => {
    dispatch(thunkGetProfile(userId));
    dispatch(thunkGetFollowing(session.user.id));
    return () => dispatch(thunkResetProfile());
  }, [dispatch, userId, friends]);



  const profileClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  useEffect(() => {
    if (Object.values(profile).length) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setAvatar(user.avatar);
      if (Number(userId) in sessionFollowing) {
        setFriends(true);
      } else setFriends(false);
    }
  }, [profile]);
  const addFriend = () => {
    dispatch(thunkAddFriend({ user_id: Number(userId) }, session.user));
    setFriends(true);
  };

  const removeFriend = () => {
    dispatch(thunkRemoveFriend(Number(userId), session.user));
    setFriends(false);
  };
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
          <div>
            First Name: <span>{user.first_name}</span>{" "}
          </div>
          <div>
            Last Name: <span>{user.last_name}</span>{" "}
          </div>
        </div>
        {Number(userId) === session.user.id ? (
          <></>
        ) : friends ? (
          <button onClick={removeFriend}>Remove Friend</button>
        ) : (
          <button onClick={addFriend}>Add Friend</button>
        )}
      </div>
      <div className="profile-bottom">
        <div className="profile-reactions">
          <BarChart reactions={reactions} />
        </div>
        <div className="profile-friends">
          <div className="friends-buttons">
            <button
              className={`friends-${friendsToggle}`}
              onClick={() => setFriendsToggle(true)}
            >
              Following
            </button>
            <button
              className={`friends-${!friendsToggle}`}
              onClick={() => setFriendsToggle(false)}
            >
              Followers
            </button>
          </div>
          <div className="friends-list">
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
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
