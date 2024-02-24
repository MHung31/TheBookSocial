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

  const demoUser = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/all");
    }
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
      <div className="homepage-body">
        <h1>Explore The Book Social</h1>

        <div className="body-top">
          <div>
            <i
              class="fa-regular fa-pen-to-square"
              style={{ color: "rgb(0, 99, 175)" }}
            ></i>
            <h2>Users can comment directly in the text</h2>
          </div>
          <div>
            <i
              class="fa-regular fa-face-grin-stars"
              style={{ color: "rgb(175, 0, 134)" }}
            ></i>
            <h2>React to the comments you see to show how you feel.</h2>
          </div>
          <div>
            <i
              class="fa-solid fa-chart-column"
              style={{ color: "rgb(73, 175, 0)" }}
            ></i>
            <h2>See your reaction statistics on your profile page</h2>
          </div>
        </div>
        <div className="body-top">
          <div>
            <h2>Make a Book Club</h2>
          </div>
          <i class="fa-solid fa-angles-right"></i>
          <div>
            <h2>Invite friends to join</h2>
          </div>
          <i class="fa-solid fa-angles-right"></i>
          <div>
            <h2>Add books to your club</h2>
          </div>
        </div>
        <div className="body-top">
          <div>
            <i class="fa-solid fa-magnifying-glass"></i>
            <h2>Look up Definitions</h2>
          </div>
          <div>
            <i class="fa-solid fa-star" style={{ color: "gold" }}></i>
            <h2>Add Favorite Books</h2>
          </div>
          <div>
            <i
              class="fa-solid fa-user-group"
              style={{ color: "rgb(214, 193, 147)" }}
            ></i>
            <h2>Follow Friends</h2>
          </div>
        </div>
      </div>

      <div className="homepage-footer">
        <div>Developed by </div>
        <div>
          <a target="_blank" href="https://mhung31.github.io/">
            Matthew Hung
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
