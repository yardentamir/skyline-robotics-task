const express = require("express");
const app = express();
const aggregationSystemRouter = require("./routes/aggregationSystem.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/", aggregationSystemRouter);

app.use("*", (req, res) => {
  res.status(500).send("wrong route");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
