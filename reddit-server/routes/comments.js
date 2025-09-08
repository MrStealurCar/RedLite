const express = require("express");
const commentsRouter = express.Router();

//Route to fetch comments on posts
commentsRouter.get("/:comments", async (req, res) => {
  const comments = req.params.comments;
  try {
    const response = await fetch(
      `https://www.reddit.com/comments/${comments}.json`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Could not fetch comments" });
  }
});

module.exports = { commentsRouter };
