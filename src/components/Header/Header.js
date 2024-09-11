import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
function Header({ searchValue, handleSearchChange, setFilter, searchResults }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <header>
      <div className="head-container">
        <div className="head-info">
          <img src="favicon.png" alt="redlite log" className="logo" />
          <span onClick={handleClick} className="title">
            red<span className="highlight">lite</span>
          </span>
        </div>
        <div className="search-wrapper">
          <SearchBar
            searchResults={searchResults}
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
            setFilter={setFilter}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
