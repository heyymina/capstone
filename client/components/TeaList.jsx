import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTeas } from "../api";

const TeaList = ({ searchQuery }) => {
  const [teas, setTeas] = useState([]);
  const [filteredTeas, setFilteredTeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCaffeinatedOnly, setShowCaffeinatedOnly] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const teaData = await getTeas();
        if (!teaData || teaData.length === 0) {
          throw new Error("No teas found.");
        }
        setTeas(teaData);
      } catch (err) {
        console.error("Error fetching teas:", err);
        setError(err.message || "Failed to load teas. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    let updatedTeas = [...teas];

    if (searchQuery.trim() !== "") {
      updatedTeas = updatedTeas.filter((tea) =>
        tea.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showCaffeinatedOnly) {
      updatedTeas = updatedTeas.filter(
        (tea) =>
          tea.caffeineLevel &&
          tea.caffeineLevel.toLowerCase() !== "none"
      );
    }

    setFilteredTeas(updatedTeas);
  }, [teas, searchQuery, showCaffeinatedOnly]);

  if (isLoading) return <h2>Loading teas...</h2>;

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (teas.length === 0) {
    return <h2>No teas found.</h2>;
  }

  function toggleFilter() {
    setShowCaffeinatedOnly((prev) => !prev);
  }

  return (
    <div className="teas">
      {/* Filter Controls */}
      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={showCaffeinatedOnly}
            onChange={toggleFilter}
          />
          &nbsp;Show Caffeinated Teas Only
        </label>
      </div>

      <h2>Explore Our Teas</h2>
      <div className="grid-container">
        {filteredTeas.length > 0 ? (
          filteredTeas.map((tea) => (
            <Link
              className="grid-item"
              key={tea.id}
              to={`/tea/${tea.id}`}
              onClick={() => console.log(`Navigating to tea ID: ${tea.id}`)}
            >
              <div>
                <h3>{tea.name || "Unnamed Tea"}</h3>
                <p><strong>Origin:</strong> {tea.origin || "Unknown"}</p>
                <p><strong>Type:</strong> {tea.type || "N/A"}</p>
                <p><strong>Caffeine:</strong> {tea.caffeineLevel || "Unknown"}</p>
                <img
                  src={tea.imageUrl}
                  alt={tea.name || "Tea"}
                  style={{ maxWidth: "150px", height: "auto" }}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/150x220/eee/333?text=No+Image")
                  }
                />
              </div>
            </Link>
          ))
        ) : (
          <p>No teas available.</p>
        )}
      </div>
    </div>
  );
};

export default TeaList;
