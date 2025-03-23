/* 🌍 General Styles */
body {
    font-family: 'Brush Script MT', cursive;
    background-color: rgb(237, 219, 97);
    color: rgb(4, 4, 183);
    text-align: center;
    margin: 0;
    padding: 0;
  }
  
  /* 🍸 Logo / Main Image */
  .main-img {
    padding: 0.5em;
    height: 5em;
    width: 10em;
  }
  
  /* 🔳 Navbar Adjustments */
  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background: rgb(245, 230, 64);
    padding: 1rem;
    font-size: small;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .navbar a {
    text-decoration: none;
    color: rgb(4, 4, 183);
    font-weight: bold;
    transition: color 0.3s;
  }
  
  .navbar a:hover {
    color: darkblue;
  }
  
  /* 🔍 Search Bar */
  .searchBar {
    width: 100%;
    max-width: 400px;
    padding: 8px;
    border-radius: 5px;
    border: 2px solid rgb(4, 4, 183);
    font-size: 1rem;
    outline: none;
  }
  
  /* 🏙 Rooftop Bar Container */
  .bar-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 1em;
  }
  
  /* 🍹 Bar Card */
  .bar-card {
    background: rgb(245, 230, 64);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: rgb(4, 4, 183);
    border-radius: 1em;
    width: 19em;
    padding: 1em;
    margin: 0.5em;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    transition: transform 0.3s ease-in-out;
  }
  
  .bar-card:hover {
    transform: scale(1.05);
  }
  
  .bar-card img {
    display: flex;
    margin: auto;
    justify-content: center;
    padding: 0.5em;
    height: 12em;
    width: 10em;
    border: 0.06em solid black;
    object-fit: cover;
  }
  
  /* ⭐ Reviews Section */
  .review-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }
  
  /* 📝 Review Card */
  .review-card {
    background: white;
    border: 1px solid rgb(4, 4, 183);
    border-radius: 10px;
    width: 240px;
    padding: 1em;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
  }
  
  /* 📝 Review Form */
  .review-form {
    background: rgb(245, 230, 64);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    margin: auto;
  }
  
  .review-form input,
  .review-form textarea {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    border: 2px solid rgb(4, 4, 183);
    border-radius: 5px;
    font-size: 1rem;
  }
  
  /* 🔘 Buttons */
  .button {
    background: rgb(4, 4, 183);
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s ease-in-out;
  }
  
  .button:hover {
    background: darkblue;
  }
  
  /* ❌ Delete Button */
  .delete-button {
    background: red;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 0.9rem;
    border-radius: 5px;
  }
  
  .delete-button:hover {
    background: darkred;
  }
  
  /* 🏠 Account Section */
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }
  
  .user-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 0.5em;
    object-fit: cover;
  }
  
  /* 📱 Responsive Design */
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: center;
    }
  
    .bar-container {
      flex-direction: column;
      align-items: center;
    }
  
    .bar-card {
      width: 90%;
    }
  
    .review-container {
      flex-direction: column;
      align-items: center;
    }
  
    .review-card {
      width: 90%;
    }
  
    .profile-container {
      text-align: center;
    }
  }
  