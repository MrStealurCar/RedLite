const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const { feedRouter } = require("./routes/feed.js");
const { postRouter } = require("./routes/posts.js");
const { commentsRouter } = require("./routes/comments.js");
app.use(express.json());
app.use(cors());
// Route registers
app.use("/feed", feedRouter);
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.get("/", (req, res) => {
  res.send("Server up and running");
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
