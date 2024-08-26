import React, { useState, useEffect } from "react";
import "./Feed.css";

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
    return <div className="loading">Loading...</div>;
  }

  const posts = results.data.children;

  return (
    <div className="feed">
      <div className="filters">
        <button
          className={`filter-button ${activeFilter === "hot" ? "active" : ""}`}
          onClick={() => handleFilterChange("hot")}
        >
          Hot
        </button>
        <button
          className={`filter-button ${activeFilter === "new" ? "active" : ""}`}
          onClick={() => handleFilterChange("new")}
        >
          New
        </button>
        <button
          className={`filter-button ${activeFilter === "best" ? "active" : ""}`}
          onClick={() => handleFilterChange("best")}
        >
          Best
        </button>
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
          <h2 className="post-title">{selectedPost.title}</h2>
          {selectedPost.selftext && (
            <p className="post-description">{selectedPost.selftext}</p>
          )}
          {selectedPost.url && (
            <img
              src={selectedPost.url}
              alt={selectedPost.title}
              className="post-image"
            />
          )}
          <button
            className="close-detail"
            onClick={() => setSelectedPost(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Feed;
