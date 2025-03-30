import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation({ token, setToken }) {
  const navigate = useNavigate();

  function handleLogout() {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="navbar">
      <img className="main-img" src="/tea-logo.webp" alt="Tea Logo" />

      {token ? (
        <>
          <Link to="/teas">
            <h2>Teas</h2>
          </Link>

          <Link to="/account">
            <h2>Account</h2>
          </Link>

          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link to="/">
            <h2>Log In</h2>
          </Link>

          <Link to="/register">
            <h2>Register</h2>
          </Link>
        </>
      )}
    </div>
  );
}
