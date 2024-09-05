import React, { useState } from "react";
import "./FilterButton.css";
function FilterButtons({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("hot");
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div>
      <div className="filter-setting">Filter by:</div>
      <div className="button-container">
        <button
          className={`filter-button ${activeFilter === "hot" ? "active" : ""}`}
          onClick={() => handleFilterChange("hot")}
        >
          Hot
        </button>
        <button
          className={`filter-button ${activeFilter === "new" ? "active" : ""}`}
          onClick={() => handleFilterChange("new")}
        >
          New
        </button>
        <button
          className={`filter-button ${activeFilter === "best" ? "active" : ""}`}
          onClick={() => handleFilterChange("best")}
        >
          Best
        </button>
      </div>
    </div>
  );
}

export default FilterButtons;
