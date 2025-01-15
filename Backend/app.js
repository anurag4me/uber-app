require("dotenv").config();
const connectMongoDb = require("./connection");
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

// mongodb connection
connectMongoDb(process.env.DB_CONNECT)
  .then(() => console.log("Mongodb connected successfully"))
  .catch((err) => console.log("Mongo error", err));

// middlewares
app.use(cors());

// routes
app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
