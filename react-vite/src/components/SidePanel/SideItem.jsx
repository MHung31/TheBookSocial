import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function SideItem({ club }) {
  const { id, title, user_id } = club;
  const ulRef = useRef();

  return (
    <li className="side-item">
      <NavLink to={`/clubs/${id}`}>{title}</NavLink>
    </li>
  );
}
export default SideItem;
