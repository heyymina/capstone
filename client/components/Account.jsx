import { useEffect, useState } from "react";
import { deleteUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Account({ setToken, token }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails(token) {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await response.json();
        setUser(userData);
        setUsername(userData.username);
        setPassword("");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    if (token) {
      getUserDetails(token);
    }
  }, [token]);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleUpdate() {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        alert("Account updated successfully 🍵");
        setPassword(""); // clear password field after update
      }
    } catch (err) {
      console.error("Error updating account:", err);
    }
  }

  async function handleDelete() {
    try {
      await deleteUser(user.id);
      setToken("");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  }

  if (!token) {
    return <p>You must be logged in to access your tea account 🍂</p>;
  }

  return (
    <div className="info-container">
      <div className="profile">
        <img className="user-img" src="/tea-profile.jpg" alt="Tea Lover" />
      </div>

      <div className="user-info">
        <p>
          <strong>Welcome,</strong> {username}
        </p>

        <label>
          Update username:
          <br />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>

        <br />

        <label>
          New password:
          <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Leave blank to keep current"
          />
        </label>

        <br />

        <button className="update-button" onClick={handleUpdate}>
          Update Account
        </button>

        <br />

        <button className="delete-button" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
