const express = require("express");
const postRouter = express.Router();
// Get route for subreddit posts
postRouter.get("/subreddit/:subredditName/:filter", async (req, res) => {
  const { subredditName, filter } = req.params;
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subredditName}/${filter}.json`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch posts" });
  }
});

module.exports = { postRouter };
