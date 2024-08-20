import "./App.css";
import { useState } from "react";
import Header from "../Header/Header";
function App() {
  const [searchChange, setSearchChange] = useState("");

  const handleSearchChange = (e) => {
    setSearchChange(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Header handleChange={handleSearchChange} value={searchChange} />
        </div>
      </header>
    </div>
  );
}

export default App;
