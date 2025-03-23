import { useState } from "react";
import { registerUser } from "../api"; // Ensure you have this API function
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    // Form validation
    if (formData.username.length < 3) {
      setNameError("Your username must be at least 3 characters!");
      return;
    }
    if (formData.password.length < 6) {
      setPasswordError("Your password must be at least 6 characters long.");
      return;
    }

    try {
      // Call API to register user
      const result = await registerUser(formData.username, formData.password);

      if (result.error) {
        setError(result.error); // Display API error message
        return;
      }

      console.log("Registration Successful:", result);
      setToken(result.token);
      navigate("/");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="info-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label className="username">
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) => {
              setNameError("");
              setFormData({ ...formData, username: e.target.value });
            }}
          />
          {nameError && <p className="error">{nameError}</p>}
        </label>

        <br />

        <label className="password">
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => {
              setPasswordError("");
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </label>

        <br />

        <button className="submit-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
