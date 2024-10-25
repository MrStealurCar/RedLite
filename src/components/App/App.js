import "./App.css";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Feed from "../Feed/Feed";
import SubredditPage from "../SubredditPage/SubredditPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  const [filter, setFilter] = useState("hot");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [vote, setVote] = useState({});
  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    console.log("Search input changed:", e.target.value);

    setSearchInput(newValue);

    if (newValue === "") {
      setSearchResults([]);
    }
  };

  const handleVote = (type, event, postId) => {
    event.stopPropagation();
    setVote((prevVotes) => ({ ...prevVotes, [postId]: type }));
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
      setResults(results);
    };
    fetchData();
  }, [query, filter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput.length > 1) {
        const fetchSubreddits = async () => {
          const response = await fetch(
            `https://www.reddit.com/subreddits/search.json?q=${searchInput}`
          );
          const results = await response.json();
          setSearchResults(results.data.children.map((child) => child.data));
        };
        fetchSubreddits();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Header
              searchValue={searchInput}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              handleSearchChange={handleSearchChange}
              setFilter={setFilter}
              setQuery={setQuery}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Feed
                    results={results}
                    onFilterChange={setFilter}
                    vote={vote}
                    setVote={setVote}
                    handleVote={handleVote}
                  />
                }
              />
              <Route
                path="/r/:subredditName"
                element={
                  <SubredditPage
                    filter={filter}
                    vote={vote}
                    onFilterChange={setFilter}
                    handleVote={handleVote}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
