import React, { useState } from "react";
import "./VoteButtons.css";
function VoteButtons() {
  const [vote, setVote] = useState(null);

  const handleVote = (type, event) => {
    event.stopPropagation();
    setVote(type);
  };
  return (
    <div className="vote-buttons">
      <i
        onClick={(e) => handleVote("upvote", e)}
        className={`fa fa-arrow-up ${
          vote === "upvote" ? "like" : "default-upvote"
        }`}
      ></i>
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
