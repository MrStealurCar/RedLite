const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
import feedRouter from "./routes/feed";
import postRouter from "./routes/posts";
import commentsRouter from "./routes/comments";
app.use(express.json());
app.use(cors());
// Route registers
app.use("/feed", feedRouter);
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
