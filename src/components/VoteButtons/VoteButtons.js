import React, { useState } from "react";
import "./VoteButtons.css";

function VoteButtons({ score }) {
  const [vote, setVote] = useState(null);
  const handleVote = (type, event) => {
    event.stopPropagation();
    setVote(type);
  };

  function formatNumber(num) {
    if (!num) return 0;

    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M"; // Converts to millions and adds 'M'
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "k"; // Converts to thousands and adds 'k'
    } else {
      return num.toString(); // Returns the number as is if less than 1,000
    }
  }

  const formattedNumber = formatNumber(score);

  return (
    <div className="vote-buttons">
      <i
        onClick={(e) => handleVote("upvote", e)}
        className={`fa fa-arrow-up ${
          vote === "upvote" ? "like" : "default-upvote"
        }`}
      ></i>
      <span
        className={`post-score ${
          vote === "upvote"
            ? "score-upvoted"
            : vote === "downvote"
            ? "score-downvoted"
            : ""
        }`}
      >
        {formattedNumber}
      </span>
      <i
        onClick={(e) => handleVote("downvote", e)}
        className={`fa fa-arrow-down ${
          vote === "downvote" ? "downvote" : "default-downvote"
        }`}
      ></i>
    </div>
  );
}

export default VoteButtons;
