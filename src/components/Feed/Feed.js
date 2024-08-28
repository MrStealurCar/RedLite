import React, { useState, useEffect } from "react";
import "./Feed.css";
import SubredditList from "../Subreddits/Subreddit";
function Feed({ results, onFilterChange }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeFilter, setActiveFilter] = useState("hot");

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [selectedPost]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };
  if (!results || !results.data) {
    return <div className="loading">Loading Posts...</div>;
  }

  const posts = results.data.children;

  return (
    <div className="feed">
      <div className="filters">
        <div className="filter-setting">Filter by:</div>
        <div className="button-container">
          <button
            className={`filter-button ${
              activeFilter === "hot" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("hot")}
          >
            Hot
          </button>
          <button
            className={`filter-button ${
              activeFilter === "new" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("new")}
          >
            New
          </button>
          <button
            className={`filter-button ${
              activeFilter === "best" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("best")}
          >
            Best
          </button>
        </div>
        <SubredditList />
      </div>

      <div className="posts">
        {posts.length === 0 ? (
          <div className="no-results">No results found.</div>
        ) : (
          posts.map((post) => (
            <div
              key={post.data.id}
              className="post-summary"
              onClick={() => setSelectedPost(post.data)}
            >
              <h2 className="post-title">{post.data.title}</h2>
              <div className="post-info">
                <span className="post-author">
                  Posted by u/{post.data.author}
                </span>
                <span className="post-subreddit">
                  {" "}
                  in r/{post.data.subreddit}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      {selectedPost && (
        <div className="post-detail">
          <h1 className="post-title">{selectedPost.title}</h1>
          {selectedPost.selftext && (
            <p className="post-description">{selectedPost.selftext}</p>
          )}
          {selectedPost.url && (
            <img
              src={selectedPost.url}
              alt="Subreddit img"
              className="post-image"
            />
          )}
          <div className="button-container">
            <button
              className="close-button"
              onClick={() => setSelectedPost(null)}
            >
              Close
            </button>
            <button className="comment-button">Comments</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
