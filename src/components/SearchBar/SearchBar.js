import "./SearchBar.css";
import searchIcon from "./search-icon.png";

function SearchBar({ handleSearchChange, searchChange }) {
  return (
    <div className="searchContainer">
      <input
        placeholder="Search Subreddits"
        className="searchBar"
        onChange={handleSearchChange}
        value={searchChange}
      />
      <img src={searchIcon} alt="Search icon" className="searchIcon" />
    </div>
  );
}

export default SearchBar;
