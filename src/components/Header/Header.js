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
        <div className="head-info" onClick={handleClick}>
          <img src="/favicon.png" alt="redlite logo" className="logo" />
          <span>
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
