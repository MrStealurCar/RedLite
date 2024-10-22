import React from "react";
import "./SearchBar.css";
import searchIcon from "./search-icon.png";

function SearchBar({
  handleSearchChange,
  searchValue,
  searchResults,
  handleResultClick,
}) {
  return (
    <div className="searchContainer">
      <input
        placeholder="Search Subreddits"
        className="searchBar"
        onChange={handleSearchChange}
        value={searchValue}
      />
      <img src={searchIcon} alt="Search icon" className="searchIcon" />
      {searchResults.length > 0 && (
        <div className="searchResults">
          {searchResults.map((subreddit) => (
            <div
              key={subreddit.display_name}
              className="searchResultItem"
              onClick={() => handleResultClick(subreddit.display_name)}
            >
              r/{subreddit.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
