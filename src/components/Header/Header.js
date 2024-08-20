import "./Header.css";

function Header({ handleSearchChange, searchChange }) {
  return (
    <div className="header">
      <img src="favicon.png" alt="redlite log" className="logo" />
      <span>
        red<span className="highlight">lite</span>
      </span>
      <input
        className="searchBar"
        onChange={handleSearchChange}
        value={searchChange}
      />
    </div>
  );
}

export default Header;
