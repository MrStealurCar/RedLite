import React, { useState, useEffect } from "react";
import "./Comments.css";
import VoteButtons from "../VoteButtons/VoteButtons";
function Comments({ postId, handleVote, vote }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://www.reddit.com/comments/${postId}.json`
        );
        const data = await response.json();
        console.log("API Response:", data);
        if (data && Array.isArray(data)) {
          const commentsData = data[1].data.children;
          setComments(commentsData);
          console.log("Comments Data:", commentsData);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  if (!comments || comments.length === 0) {
    return <div className="no-comments">No comments available.</div>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.data.id} className="comment-info">
          <p className="comments">
            <h5>u/{comment.data.author}:</h5>
            {comment.data.body}
            <div className="score">
              <VoteButtons
                score={comment.data.score}
                handleVote={handleVote}
                postId={comment.data.id}
                vote={vote[comment.data.id]}
              />
            </div>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
