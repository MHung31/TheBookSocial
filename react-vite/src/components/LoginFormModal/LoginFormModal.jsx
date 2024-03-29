import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/all");
    }
  };

  return (
    <div className="login-modal">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>{" "}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxlength="100"
        />
        {errors.email && <p>{errors.email}</p>}
        <label>Password</label>{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          maxlength="100"
        />
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
