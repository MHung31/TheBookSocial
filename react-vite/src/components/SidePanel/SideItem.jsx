import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ClubOptions from "./ClubOptionsModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useModal } from "../../context/Modal";

function SideItem({ club }) {
  const { setModalContent } = useModal();
  const { id, title, user_id } = club;
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.preventDefault();
    setModalContent(<ClubOptions clubId={id} />);
  };
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu, true);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);
  return (
    <li className="side-item">
      <NavLink to={`/clubs/${id}`}>
        {title}{" "}
        <span className="item-ellipsis" onClick={toggleMenu}>
          <i class="fa-solid fa-ellipsis"></i>
        </span>
      </NavLink>
    </li>
  );
}
export default SideItem;
