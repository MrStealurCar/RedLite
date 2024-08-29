import "./SearchBar.css";
import searchIcon from "./search-icon.png";

function SearchBar({ handleSearchChange, searchValue }) {
  return (
    <div className="searchContainer">
      <input
        placeholder="Search Subreddits"
        className="searchBar"
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
      />
      <img src={searchIcon} alt="Search icon" className="searchIcon" />
    </div>
  );
}
export default SearchBar;
