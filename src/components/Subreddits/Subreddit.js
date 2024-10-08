import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Subreddit.css";
function SubredditList() {
  const [subredditList, setSubredditList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await fetch("https://www.reddit.com/subreddits.json");
        const data = await response.json();
        setSubredditList(data.data.children);
      } catch (error) {
        console.log(`Error fetching subreddits: ${error}`);
      }
    };

    fetchSubreddits();
  }, []);

  const handleSubredditChange = (subredditName) => {
    navigate(`/r/${subredditName}`);
  };
  return (
    <div className="subreddit-list">
      {subredditList.map((subreddit) => (
        <p
          key={subreddit.data.id}
          className="subreddit-button"
          onClick={() => handleSubredditChange(subreddit.data.display_name)}
        >
          r/{subreddit.data.display_name}
        </p>
      ))}
    </div>
  );
}

export default SubredditList;
