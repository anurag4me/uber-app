require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

// middlewares
app.use(cors());

// routes
app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
