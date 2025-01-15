const express = require("express");

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  return res.json({ test: "Successful" });
});

app.listen(PORT, () =>
  console.log(`Server Started at http://localhost:${PORT}`)
);
