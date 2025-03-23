import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import Bars from "./components/Bars";
import BarDetails from "./components/BarDetails";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <>
      {/* 🏠 Navbar for navigation */}
      <Navigation setToken={setToken} token={token} />

      {/* 🔀 Route Management */}
      <Routes>
        <Route path="/" element={<Bars />} /> 
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/account" element={<Account token={token} />} />
        <Route path="/bars/:id" element={<BarDetails token={token} />} />
      </Routes>
    </>
  );
}

export default App;
