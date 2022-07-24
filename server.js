const express = require("express");
const app = express();
const aggregationSystemRouter = require("./routes/aggregationSystem.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = 8080;

app.use("/", aggregationSystemRouter);

app.use("*", (req, res) => {
  res.status(500).send("wrong route");
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
