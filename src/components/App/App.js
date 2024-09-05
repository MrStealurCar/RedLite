import "./App.css";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Feed from "../Feed/Feed";
import SubredditPage from "../SubredditPage/SubredditPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [filter, setFilter] = useState("hot");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let response;
      // If query is not empty, fetch data from the search endpoint using query and the filter
      if (query) {
        // Search endpoint
        response = await fetch(
          `https://api.reddit.com/search.json?q=${query}&sort=${filter}`
        );
      } else {
        //Listings endpoint
        response = await fetch(`https://api.reddit.com/${filter}.json`);
      }
      const results = await response.json();
      console.log("results:", results);
      setResults(results);
    };
    fetchData();
  }, [query, filter]);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Header
              searchValue={query}
              handleSearchChange={handleSearchChange}
              setFilter={setFilter}
            />
            <Routes>
              <Route
                path="/"
                element={<Feed results={results} onFilterChange={setFilter} />}
              />
              <Route path="/r/:subredditName" element={<SubredditPage />} />
            </Routes>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
