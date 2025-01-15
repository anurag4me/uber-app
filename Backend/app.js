require("dotenv").config();
const connectMongoDb = require("./connection");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes")

const PORT = process.env.PORT || 3000;
const app = express();

// mongodb connection
connectMongoDb(process.env.DB_CONNECT)
  .then(() => console.log("Mongodb connected successfully"))
  .catch((err) => console.log("Mongo error", err));

// middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.use("/users", userRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
