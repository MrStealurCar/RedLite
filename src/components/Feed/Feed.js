import React, { useState, useEffect } from "react";
import "./Feed.css";
import SubredditList from "../Subreddits/Subreddit";
import Comments from "../Comments/Comments";
import FilterButtons from "../FilterButtons/FilterButton";
import VoteButtons from "../VoteButtons/VoteButtons";
function Feed({ results, onFilterChange }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState(false);
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

  if (!results || !results.data) {
    return <div className="loading">Loading Posts...</div>;
  }

  const posts = results.data.children;

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  return (
    <div className="feed">
      <div className="filters">
        <FilterButtons onFilterChange={onFilterChange} />
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
              onClick={() => {
                setSelectedPost(post.data);
                setShowComments(false);
              }}
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
                <div className="vote-button">
                  <VoteButtons />
                </div>
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
            <img src={selectedPost.url} alt="Post img" className="post-image" />
          )}
          <div>
            <VoteButtons />
          </div>
          <div className="post-button-container">
            <button
              className="close-button"
              onClick={() => setSelectedPost(null)}
            >
              Close
            </button>

            <button className="comment-button" onClick={toggleComments}>
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
          </div>
          <div>{showComments && <Comments postId={selectedPost.id} />}</div>
        </div>
      )}
    </div>
  );
}

export default Feed;
