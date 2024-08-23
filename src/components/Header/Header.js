import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
function Header() {
  return (
    <div className="headContainer">
      <div className="headInfo">
        <img src="favicon.png" alt="redlite log" className="logo" />
        <span>
          red<span className="highlight">lite</span>
        </span>
      </div>
      <div className="searchWrapper">
        <SearchBar />
      </div>
    </div>
  );
}

export default Header;
