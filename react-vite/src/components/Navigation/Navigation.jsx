import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useModal } from "../../context/Modal";

function Navigation() {
  const { setModalContent } = useModal();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  return (
    <ul className="navigation">
      <li>
        {user ? (
          <NavLink id="logo" to="/">
            <i class="fa-solid fa-book-bookmark"></i> TheBookSocial
          </NavLink>
        ) : (
          <NavLink id="logo" to="/">
            <i class="fa-solid fa-book-bookmark"></i> TheBookSocial
          </NavLink>
        )}
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
