import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setToken }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.username.length < 1) {
      setNameError("Please enter your username to sip in.");
      return;
    }

    if (formData.password.length < 1) {
      setPasswordError("Don't forget your password — it's the key to your kettle.");
      return;
    }

    try {
      const result = await loginUser(formData);

      if (result.token) {
        setToken(result.token);
        localStorage.setItem("token", result.token);
        setError(null);
        navigate("/"); // Redirect to home or your tea catalog
      } else {
        setError("Hmm... that username or password doesn’t match our teapot.");
      }
    } catch (err) {
      setError("Trouble brewing. Try again with the correct login details.");
    }
  }

  return (
    <div className="info-container">
      <h2>Welcome Back, Tea Friend 🍵</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) => {
              setNameError("");
              setFormData((prev) => ({ ...prev, username: e.target.value }));
            }}
          />
          {nameError && <p className="error">{nameError}</p>}
        </label>

        <br />

        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => {
              setPasswordError("");
              setFormData((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </label>

        <br />

        <button type="submit" className="submit-button">
          Log In
        </button>
      </form>

      <Link to="/register">
        <p>New here? Create an account →</p>
      </Link>
    </div>
  );
}
