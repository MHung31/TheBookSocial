import "./HomePage.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal";
import backgroundImage from "../../../public/background.png";
import { thunkLogin } from "../../redux/session";

function HomePage() {
  const { setModalContent, closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser) navigate("/all");
  }, [sessionUser]);

  const demoUser = async () => {
    const demoUser = {
      email: "demo@aa.io",
      password: "password",
    };
    dispatch(thunkLogin(demoUser));

    navigate("/all");
  };

  return (
    <div className="homepage">
      <div className="homepage-intro">
        <img className="intro-background" src={backgroundImage}></img>
        <div className="intro-content">
          <h1>The Book Social</h1>
          <h3>Read together and socialize at your pace</h3>
          <button
            className="homepage-signup homepage-button"
            onClick={() => setModalContent(<SignupFormModal />)}
          >
            Create a BookSocial account
          </button>
          <button
            className="homepage-login homepage-button"
            onClick={() => setModalContent(<LoginFormModal />)}
          >
            Sign in to your account
          </button>
          <div onClick={demoUser} id="demologin">
            Demo Login
          </div>
        </div>
      </div>
      <div className="homepage-body"></div>
      <div className="homepage-footer"></div>
    </div>
  );
}

export default HomePage;
