const express = require("express");
const feedRouter = express.Router();

// Get route for main feed
feedRouter.get("/", async (req, res) => {
  const { q, filter = "hot" } = req.query; // Grabs query paramaeters
  try {
    const response = q
      ? // If query is not empty, display queried results with filter applied
        await fetch(`https://api.reddit.com/search.json?q=${q}&sort=${filter}`)
      : // If query is empty, show default feed with the hot filter applied
        await fetch(`https://api.reddit.com/${filter}.json`);

    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feed data" });
  }
});

//Get route when searching for subreddits
feedRouter.get("/:subreddit", async (req, res) => {
  const subreddit = req.params.subreddit;
  try {
    const response = await fetch(
      `https://www.reddit.com/subreddits/search.json?q=${subreddit}`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Could not fetch subreddits" });
  }
});

module.exports = { feedRouter };
