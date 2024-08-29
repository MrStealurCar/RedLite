import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
function Header({ searchValue, handleSearchChange, setFilter }) {
  return (
    <header>
      <div className="headContainer">
        <div className="headInfo">
          <img src="favicon.png" alt="redlite log" className="logo" />
          <span>
            red<span className="highlight">lite</span>
          </span>
        </div>
        <div className="searchWrapper">
          <SearchBar
            searchValue={searchValue}
            onChange={handleSearchChange}
            setFilter={setFilter}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
