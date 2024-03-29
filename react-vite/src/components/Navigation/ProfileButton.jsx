import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const demoUser = async () => {
    const demoUser = {
      email: "demo@demo.io",
      password: "password",
    };
    const serverResponse = await dispatch(thunkLogin(demoUser));

    if (serverResponse) {
      dispatch(
        thunkSignup({
          email: "demo@demo.io",
          username: "demouser",
          password: "password",
          first_name: "demo",
          last_name: "user",
        })
      );
    } else {
      navigate("/all");
    }
  };
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  const navigateProfile = () => {
    navigate(`/users/${user.id}`);
    closeMenu();
  };

  return (
    <div>
      {user ? (
        <>
          <button className="profile-logged-in" onClick={toggleMenu}>
            {user.first_name[0] + user.last_name[0]}
          </button>
        </>
      ) : (
        <>
          <button className="login-button" onClick={toggleMenu}>
            Sign in
          </button>
        </>
      )}

      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <h4>Welcome {`${user.username}`}</h4>

              <li>
                <button className="profile-button" onClick={navigateProfile}>
                  My Profile
                </button>
              </li>
              <li>
                <button className="logout" onClick={logout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <div className="login-signup">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />{" "}
              <p onClick={demoUser} id="demo-login">
                Demo Login
              </p>
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
