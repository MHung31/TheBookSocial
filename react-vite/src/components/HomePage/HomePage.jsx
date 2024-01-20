import "./HomePage.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser) navigate("/all");
  }, [sessionUser]);

  return <div>Homepage</div>;
}

export default HomePage;
