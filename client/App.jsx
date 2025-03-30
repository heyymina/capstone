import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "./components/Navigation";
import Account from "./components/Account";
import Register from "./components/Register";
import Login from "./components/Login";
import TeaList from "./components/TeaList";
import TeaDetails from "./components/TeaDetails";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <>
      <Navigation setToken={setToken} token={token} />
      
      <Routes>
        {/* Home/Login */}
        <Route path="/" element={<Login setToken={setToken} token={token} />} />

        {/* Register */}
        <Route path="/register" element={<Register setToken={setToken} />} />

        {/* Account Page */}
        <Route
          path="/account"
          element={<Account setToken={setToken} token={token} />}
        />

        {/* Tea List */}
        <Route path="/teas" element={<TeaList token={token} />} />

        {/* Individual Tea Details */}
        <Route path="/teas/:id" element={<TeaDetails />} />
      </Routes>
    </>
  );
}

export default App;
