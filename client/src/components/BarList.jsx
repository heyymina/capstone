import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BarList = () => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    axios.get("/api/bars").then((res) => setBars(res.data));
  }, []);

  return (
    <div>
      <h1>Rooftop Bars</h1>
      <ul>
        {bars.map((bar) => (
          <li key={bar.id}>
            <Link to={`/bars/${bar.id}`}>
              <h2>{bar.name}</h2>
              <p>Location: {bar.location}</p>
              <p>Rating: {bar.average_rating || "No ratings yet"}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarList;
