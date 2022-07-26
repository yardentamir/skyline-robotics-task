const express = require("express");
const rootRouter = express.Router();

const addRobots = require("../controllers/addRobots.js");
const statistics = require("../controllers/statistics.js");
const getRobots = require("../controllers/getRobots.js");

const validatorPassingMiddleware = require("../middleware/validatorPassing.js");
const mapPassingMiddleware = require("../middleware/mapPassing.js");

rootRouter.post(
  "/",
  mapPassingMiddleware,
  validatorPassingMiddleware,
  addRobots
);

rootRouter.get("/", mapPassingMiddleware, getRobots); // bonus

rootRouter.get("/statistics", mapPassingMiddleware, statistics);

module.exports = rootRouter;
