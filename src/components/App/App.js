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
  const [searchResults, setSearchResults] = useState([]);
  const [vote, setVote] = useState({});
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
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
      console.log("results:", results);
      setResults(results);
    };
    fetchData();
  }, [query, filter]);

  useEffect(() => {
    const fetchSubreddits = async () => {
      const response =
        await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}
`);
      const results = await response.json();
      setSearchResults(results);
    };
    if (query) {
      fetchSubreddits();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Header
              searchValue={query}
              searchResults={searchResults}
              setQuery={setQuery}
              handleSearchChange={handleSearchChange}
              setFilter={setFilter}
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
