import { useState } from "react";
import { registerUser } from "../api"; // Ensure this function is implemented
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    // Basic validation
    if (formData.username.length < 3) {
      setNameError("Username must be at least 3 characters long.");
      return;
    }
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    try {
      const result = await registerUser(formData.username, formData.password);

      if (result.error) {
        setError(result.error);
        return;
      }

      setToken(result.token);
      navigate("/");

    } catch (err) {
      setError("Oops! Something went wrong. Please try again.");
    }
  }

  return (
    <div className="info-container">
      <h2>Create Your Tea Account 🍃</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Username:
          <input
            type="text"
            placeholder="e.g. tea_lover88"
            value={formData.username}
            onChange={(e) => {
              setNameError("");
              setFormData({ ...formData, username: e.target.value });
            }}
          />
          {nameError && <p className="error">{nameError}</p>}
        </label>

        <br />

        <label>
          Password:
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={(e) => {
              setPasswordError("");
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </label>

        <br />

        <button type="submit" className="submit-button">
          Join the Tea Club
        </button>
      </form>
    </div>
  );
}
