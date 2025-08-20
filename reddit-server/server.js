const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
