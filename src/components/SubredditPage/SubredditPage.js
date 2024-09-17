import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SubredditPage.css";
import SubredditList from "../Subreddits/Subreddit";
import Comments from "../Comments/Comments";
import FilterButtons from "../FilterButtons/FilterButton";
import VoteButtons from "../VoteButtons/VoteButtons";
function SubredditPage({ onFilterChange, filter, score }) {
  const { subredditName } = useParams();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://www.reddit.com/r/${subredditName}/${filter}.json`
        );
        const data = await response.json();
        setPosts(data.data.children);
      } catch (error) {
        console.log(`Error loading subreddit ${error}`);
      }
    };

    fetchPosts();
  }, [subredditName, filter]);

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

  useEffect(() => {
    setShowComments(false);
  }, [selectedPost]);

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  return (
    <div className="feed">
      <div className="sub-list">
        <div className="filter-buttons">
          <FilterButtons onFilterChange={onFilterChange} />
        </div>
        <SubredditList />
      </div>
      <div className="posts">
        <h1 className="subreddit-title">r/{subredditName}</h1>
        {posts.map((post) => (
          <div
            key={post.data.id}
            className="post-summary"
            onClick={() => {
              setSelectedPost(post.data);
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
              </span>{" "}
              <div className="score-container">
                <VoteButtons score={post.data.score} />
              </div>
            </div>
          </div>
        ))}
        {selectedPost && (
          <div className="post-detail">
            <h1 className="post-title">{selectedPost.title}</h1>
            {selectedPost.selftext && (
              <p className="post-description">{selectedPost.selftext}</p>
            )}
            {selectedPost.url && (
              <img
                src={selectedPost.url}
                alt="Post img"
                className="post-image"
              />
            )}
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
    </div>
  );
}

export default SubredditPage;
